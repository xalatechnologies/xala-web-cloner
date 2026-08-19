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

# Map /blogg?q= onto the prerendered filtered listing. Failure here must not
# roll back a release that already flipped: the files live at /blogg/q/<query>/
# either way, and a bad nginx edit is restored by the installer.
if [ -f deploy/nginx-blogg-query.conf ]; then
  log "Installing nginx /blogg?q= rewrite (best effort)…"
  scp -q "${SSH_OPTS[@]}" deploy/nginx-blogg-query.conf \
    "${VPS_USER}@${VPS_HOST}:/tmp/xala-blogg-query.conf" || true
  ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" \
    'bash -s -- /tmp/xala-blogg-query.conf' < deploy/install-blogg-query.sh \
    || log "nginx rewrite not applied — /blogg/q/<query>/ is still on disk"
fi

log "Deployed ${RELEASE} → https://${DOMAIN}"
