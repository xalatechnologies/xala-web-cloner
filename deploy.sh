#!/usr/bin/env bash
# Deploy xala.no to the VPS as an atomic release.
#
#   build → rsync into releases/rel-<ts> → flip the `current` symlink
#
# The symlink flip is the point: nginx serves `current`, and `ln -sfn` replaces
# it in one syscall. Rsyncing straight into the served directory would leave the
# site half-old and half-new for the length of the transfer, and a failed
# transfer would leave it broken with no way back. Here a failed build or rsync
# never touches what is live, and rolling back is re-pointing the symlink at the
# previous release.
#
# Used by .github/workflows/deploy.yml AND by hand, so CI and local deploys
# cannot drift.
#
# Usage: ./deploy.sh
set -euo pipefail

VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:-72.61.23.56}"
DOMAIN="${DOMAIN:-xala.no}"
BASE_DIR="/home/root/domains/${DOMAIN}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"

SSH_OPTS=(-o BatchMode=yes -o ConnectTimeout=15)

log() { printf '\033[0;34m[deploy]\033[0m %s\n' "$*"; }
die() { printf '\033[0;31m[deploy] %s\033[0m\n' "$*" >&2; exit 1; }

[ -f package.json ] || die "package.json not found — run from the project root."

log "Building (vite build + blog prerender)…"
if [ ! -d node_modules ]; then
  log "Installing dependencies…"
  pnpm install --frozen-lockfile
fi
pnpm build

[ -d dist ] || die "build produced no dist/ directory."
[ -f dist/index.html ] || die "dist/index.html missing — the build did not complete."

# The prerender step is what makes the blog readable without JavaScript. If it
# silently did nothing, the deploy would "succeed" and ship a blog that no
# answer engine can read — the exact failure this pipeline exists to prevent.
if [ -d src/content/blog ] && ls src/content/blog/*.md >/dev/null 2>&1; then
  [ -f dist/blogg/index.html ] || die "dist/blogg/index.html missing — the prerender step did not run."
  [ -f dist/sitemap.xml ] || die "dist/sitemap.xml missing — the prerender step did not run."
fi

# Every URL the sitemap advertises must have a file behind it. A route the
# prerender misses still renders in a browser but answers 404 to every crawler
# that follows the sitemap — which is how all 17 case studies shipped.
node scripts/verify-dist.mjs || die "dist/ does not serve every URL in its own sitemap."

RELEASE="rel-$(date -u +%Y%m%d-%H%M%S)"
RELEASE_DIR="${BASE_DIR}/releases/${RELEASE}"

log "Creating ${RELEASE_DIR} on ${VPS_HOST}…"
ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" "mkdir -p '${RELEASE_DIR}'"

log "Uploading dist/ …"
rsync -az --delete -e "ssh ${SSH_OPTS[*]}" dist/ "${VPS_USER}@${VPS_HOST}:${RELEASE_DIR}/"

# Carry the older releases' hashed assets into this one before the flip.
#
# The symlink makes the *switch* atomic, but it does not make it seamless: only
# `current` is under nginx's root, so the instant it moves, every chunk filename
# the previous build handed out stops resolving. A tab that was open across the
# flip still holds that build's index.html, and its next code-split route asks
# for a file that is now only inside a release directory nobody serves.
#
# That is how a reader on xala.no clicked from the homepage to /caser and got a
# 404 on `assets/CaserPage-BJrlDSWZ.js` — the deploy had landed while they were
# reading. Copying the old files forward is safe precisely because the names are
# content hashes: same name means same bytes, so nothing can shadow anything.
# `-n` keeps it that way by never letting an older file overwrite a new one.
#
# This buys the retention window, not forever — a tab older than KEEP_RELEASES
# deploys still finds nothing, which is what lazyRoute() in src/lib/lazy-route.ts
# is there to survive.
#
# `.assets-native` is what keeps this bounded. Copying every asset out of each
# older release would compound: the release before this one already carries its
# own predecessors, so a plain copy would union every asset the site has ever
# built and grow without limit. Each release therefore records the files its own
# build produced, and only those are carried, which caps a release at its own
# assets plus KEEP_RELEASES-1 generations. Releases made before this existed have
# no list and hold nothing but their own output, so copying all of theirs is the
# same thing.
log "Carrying forward hashed assets from previous releases…"
ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" bash -s <<EOF
set -euo pipefail
cd '${BASE_DIR}/releases'
mkdir -p '${RELEASE_DIR}/assets'
ls -1 '${RELEASE_DIR}/assets' > '${RELEASE_DIR}/.assets-native'
carried=0
for old in \$(ls -1dt rel-*/ 2>/dev/null); do
  [ "\${old%/}" = '${RELEASE}' ] && continue
  [ -d "\${old}assets" ] || continue
  if [ -f "\${old}.assets-native" ]; then
    names="\${old}.assets-native"
  else
    ls -1 "\${old}assets" > /tmp/xala-assets-all.\$\$
    names=/tmp/xala-assets-all.\$\$
  fi
  while IFS= read -r f; do
    [ -n "\$f" ] || continue
    [ -e "${RELEASE_DIR}/assets/\$f" ] && continue
    cp -a "\${old}assets/\$f" "${RELEASE_DIR}/assets/\$f" 2>/dev/null || true
    carried=\$((carried + 1))
  done < "\$names"
  rm -f /tmp/xala-assets-all.\$\$
done
echo "[deploy] carried \${carried} asset(s) forward from previous releases"
EOF

log "Flipping the current symlink…"
ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" bash -s <<EOF
set -euo pipefail
ln -sfn '${RELEASE_DIR}' '${BASE_DIR}/current.tmp'
mv -Tf '${BASE_DIR}/current.tmp' '${BASE_DIR}/current'
# Keep a few releases so a rollback is a symlink flip, not a rebuild.
cd '${BASE_DIR}/releases'
ls -1dt rel-* 2>/dev/null | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf
echo "[deploy] live release: \$(readlink '${BASE_DIR}/current')"
EOF

# GET /blogg?q=gebyr is the unfiltered listing unless this rewrite is in the
# server block that has `root` / `current`. Artifacts under /blogg/q/ are not
# enough. A no-op install must fail the deploy.
[ -f deploy/nginx-blogg-query.conf ] || die "missing deploy/nginx-blogg-query.conf"
[ -f deploy/nginx-serving-block.py ] || die "missing deploy/nginx-serving-block.py"
[ -f deploy/install-blogg-query.sh ] || die "missing deploy/install-blogg-query.sh"

log "Installing nginx /blogg?q= rewrite in the serving block…"
scp -q "${SSH_OPTS[@]}" deploy/nginx-blogg-query.conf \
  "${VPS_USER}@${VPS_HOST}:/tmp/xala-blogg-query.conf" \
  || die "could not upload deploy/nginx-blogg-query.conf"
scp -q "${SSH_OPTS[@]}" deploy/nginx-serving-block.py \
  "${VPS_USER}@${VPS_HOST}:/tmp/nginx-serving-block.py" \
  || die "could not upload deploy/nginx-serving-block.py"
ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" \
  'bash -s -- /tmp/xala-blogg-query.conf /tmp/nginx-serving-block.py' \
  < deploy/install-blogg-query.sh \
  || die "nginx /blogg?q= rewrite is not in the serving block — GET /blogg?q=gebyr would still be the full listing"

log "Deployed ${RELEASE} → https://${DOMAIN}"
