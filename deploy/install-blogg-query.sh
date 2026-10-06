#!/usr/bin/env bash
# Install the nginx rewrite that maps /blogg?q= onto a prerendered listing,
# and (unless the vhost already has a /fonts/ location) the /fonts/ cache.
#
# The include MUST land in the server block whose `root` is the `current`
# release — that is the TLS/site block that serves files. The first
# `server_name xala.no` is often the :80 redirect; inserting there is a
# no-op and GET /blogg?q=gebyr stays the unfiltered listing.
#
# Exits 1 if that serving block does not contain the rewrite after install.
# A no-op (no serving block, or include only in the redirect block) is a
# failure, not success.
#
# Backups are written outside sites-enabled / conf.d (see the helper). A
# sibling .bak-blogg-query is loaded by nginx and was treated as a serving
# block, which is why Deploy #102 failed after a successful live rewrite.
#
# Rollback uses a directory created for THIS invocation only
# (XALA_NGINX_BACKUP_DIR). It restores the snippet files as well as the
# first serving-block backup written this run. A map left behind by an
# earlier run is not read. If a snippet did not exist before this run,
# rollback deletes it. Any failure after a snippet is copied rolls the run
# back. On `nginx -t` failure both files are put back, `nginx -t` is run
# again, and nginx is not reloaded.
#
# Fonts: before anything is copied, `nginx -T` is scanned for a /fonts/
# location outside this repo's snippets. A hit skips the fonts snippet and
# its include, logs WARNING plus the matching lines, and the blogg install
# still exits 0.
set -euo pipefail

SNIPPET_SRC="${1:-deploy/nginx-blogg-query.conf}"
HELPER="${2:-deploy/nginx-serving-block.py}"
# deploy.sh scp's the fonts file here and does not pass a third ssh argument.
FONTS_SRC="${3:-/tmp/xala-fonts-cache.conf}"
SNIPPET_DST="/etc/nginx/snippets/xala-blogg-query.conf"
FONTS_DST="/etc/nginx/snippets/xala-fonts-cache.conf"
INCLUDE='include /etc/nginx/snippets/xala-blogg-query.conf;'
FONTS_INCLUDE='include /etc/nginx/snippets/xala-fonts-cache.conf;'
BACKUP_KEEP=5

log() { printf '[blogg-query] %s\n' "$*"; }
warn() { printf '[blogg-query] WARNING: %s\n' "$*" >&2; }
die() { printf '[blogg-query] %s\n' "$*" >&2; exit 1; }

RUN_BACKUP_DIR=""
SNIPPET_WAS_PRESENT=0
FONTS_WAS_PRESENT=0
FONTS_SKIP=0
FONTS_TOUCHED=0
CLEANUP_ON_EXIT=0
ROLLBACK_DONE=0
RELOADED=0

prepare_run_backup() {
  local parent stamp
  stamp="$(date -u +%Y%m%dT%H%M%SZ)-$$"
  if [ -d /var/backups ] && [ -w /var/backups ]; then
    parent="/var/backups"
  else
    parent="/tmp"
  fi
  RUN_BACKUP_DIR="$(mktemp -d "${parent}/nginx-blogg-query-${stamp}-XXXXXX")"
  # The helper writes and restores serving-block backups only inside this
  # directory when the variable is set. Do not unset it before restore.
  export XALA_NGINX_BACKUP_DIR="$RUN_BACKUP_DIR"
  log "this run's backups: $RUN_BACKUP_DIR"
}

backup_snippet() {
  if [ -e "$SNIPPET_DST" ]; then
    cp -a "$SNIPPET_DST" "$RUN_BACKUP_DIR/xala-blogg-query.conf"
    SNIPPET_WAS_PRESENT=1
    log "backed up existing snippet to $RUN_BACKUP_DIR/xala-blogg-query.conf"
  else
    SNIPPET_WAS_PRESENT=0
    : > "$RUN_BACKUP_DIR/snippet-was-absent"
    log "snippet was absent; rollback will delete it"
  fi
}

backup_fonts_snippet() {
  if [ -e "$FONTS_DST" ]; then
    cp -a "$FONTS_DST" "$RUN_BACKUP_DIR/xala-fonts-cache.conf"
    FONTS_WAS_PRESENT=1
    log "backed up existing fonts snippet"
  else
    FONTS_WAS_PRESENT=0
    : > "$RUN_BACKUP_DIR/fonts-snippet-was-absent"
    log "fonts snippet was absent; rollback will delete it"
  fi
}

restore_snippet() {
  if [ "$SNIPPET_WAS_PRESENT" -eq 1 ]; then
    cp -a "$RUN_BACKUP_DIR/xala-blogg-query.conf" "$SNIPPET_DST"
    log "restored blogg snippet from this run"
  else
    rm -f "$SNIPPET_DST"
    log "removed blogg snippet created by this run"
  fi
  if [ "$FONTS_TOUCHED" -eq 0 ]; then
    return 0
  fi
  if [ "$FONTS_WAS_PRESENT" -eq 1 ]; then
    cp -a "$RUN_BACKUP_DIR/xala-fonts-cache.conf" "$FONTS_DST"
    log "restored fonts snippet from this run"
  else
    rm -f "$FONTS_DST"
    log "removed fonts snippet created by this run"
  fi
}

restore_serving_blocks() {
  # Only the map in $XALA_NGINX_BACKUP_DIR. The helper restores the first
  # backup of each file, which is the pre-run bytes.
  python3 "$HELPER" restore --backup-suffix .bak-blogg-query
}

prune_run_backups() {
  local parent="/var/backups"
  [ -d "$parent" ] || return 0
  [ -n "$RUN_BACKUP_DIR" ] || return 0
  local -a dirs=()
  local line d kept=0
  local -A keep=()
  while IFS= read -r line; do
    [ -n "$line" ] || continue
    dirs+=("$line")
  done < <(find "$parent" -maxdepth 1 -mindepth 1 -type d -name 'nginx-blogg-query-*' -printf '%T@ %p\n' | sort -nr | cut -d' ' -f2-)
  for d in "${dirs[@]}"; do
    if [ "$kept" -lt "$BACKUP_KEEP" ]; then
      keep["$d"]=1
      kept=$((kept + 1))
    fi
  done
  keep["$RUN_BACKUP_DIR"]=1
  for d in "${dirs[@]}"; do
    if [ -z "${keep[$d]:-}" ]; then
      rm -rf "$d"
      log "pruned old backup dir $d"
    fi
  done
}

rollback_this_run() {
  [ "$ROLLBACK_DONE" -eq 1 ] && return 0
  ROLLBACK_DONE=1
  CLEANUP_ON_EXIT=0
  trap - ERR
  log "rolling back only $RUN_BACKUP_DIR"
  restore_snippet
  restore_serving_blocks
  if [ "$RELOADED" -eq 1 ] && nginx -t; then
    systemctl reload nginx
    log "reloaded the restored config"
    prune_run_backups
    return 0
  fi
  if nginx -t; then
    log "restored config passed nginx -t; not reloading"
  else
    log "restored config failed nginx -t; not reloading"
  fi
  prune_run_backups
}

on_exit() {
  local rc=$?
  trap - EXIT ERR
  if [ "$CLEANUP_ON_EXIT" -eq 1 ]; then
    log "exiting after a failed install — rolling back this run"
    rollback_this_run || true
  fi
  exit "$rc"
}

on_err() {
  local rc=$?
  trap - ERR
  if [ "$CLEANUP_ON_EXIT" -eq 1 ]; then
    log "command failed — rolling back this run"
    rollback_this_run || true
  fi
  exit "$rc"
}

trap on_exit EXIT
trap on_err ERR

# Plain prefix, exact match, ^~, or a regex location whose pattern contains
# /fonts. Lines that come from our own snippet files are ignored so a later
# deploy does not treat the block it installed last time as a conflict.
fonts_locations_outside_ours() {
  awk '
    /^# configuration file / {
      file = $0
      sub(/^# configuration file /, "", file)
      sub(/:$/, "", file)
      skip = (file ~ /\/xala-fonts-cache\.conf$/ || file ~ /\/xala-blogg-query\.conf$/)
      next
    }
    skip { next }
    $0 ~ /^[[:space:]]*location[[:space:]]+((\^~|=)[[:space:]]+)?\/fonts\/?[[:space:]]*\{/ {
      print
      next
    }
    $0 ~ /^[[:space:]]*location[[:space:]]+~\*?[[:space:]]+[^#{]*\/fonts\/?/ {
      print
      next
    }
  '
}

[ -f "$SNIPPET_SRC" ] || die "missing snippet $SNIPPET_SRC"
[ -f "$HELPER" ] || die "missing helper $HELPER"
[ "$(id -u)" -eq 0 ] || die "run as root on the VPS"
command -v python3 >/dev/null || die "python3 is required to find the serving block"
command -v nginx >/dev/null || die "nginx is not installed"

# A dangling include (snippet not on disk yet) makes `nginx -T` fail after it
# has already printed the files. Keep that dump so the /fonts/ scan still runs.
NGINX_T_RC=0
NGINX_DUMP="$(nginx -T 2>&1)" || NGINX_T_RC=$?
if [ "$NGINX_T_RC" -ne 0 ] && [ -z "$NGINX_DUMP" ]; then
  die "nginx -T failed before any change — nothing was installed"
fi
if [ "$NGINX_T_RC" -ne 0 ]; then
  log "nginx -T exited ${NGINX_T_RC} before any change; scanning the dump anyway"
fi
FONTS_HITS="$(printf '%s\n' "$NGINX_DUMP" | fonts_locations_outside_ours || true)"
if [ -n "$FONTS_HITS" ]; then
  FONTS_SKIP=1
  warn "existing /fonts/ location found outside xala-fonts-cache.conf"
  warn "skipping fonts snippet $FONTS_DST and its include; blogg install continues"
  warn "matching nginx -T lines follow"
  while IFS= read -r hit; do
    [ -n "$hit" ] || continue
    warn "$hit"
  done <<< "$FONTS_HITS"
else
  [ -f "$FONTS_SRC" ] || die "missing fonts snippet $FONTS_SRC"
fi

prepare_run_backup
backup_snippet
if [ "$FONTS_SKIP" -eq 0 ]; then
  backup_fonts_snippet
  FONTS_TOUCHED=1
fi
CLEANUP_ON_EXIT=1

mkdir -p /etc/nginx/snippets
cp "$SNIPPET_SRC" "$SNIPPET_DST"
# $arg_q is nginx's variable. Single quotes keep this shell from expanding it.
# shellcheck disable=SC2016
grep -q 'rewrite ^ /blogg/q/$arg_q/index.html last;' "$SNIPPET_DST" \
  || die "$SNIPPET_DST is missing the \$arg_q rewrite"

if [ "$FONTS_SKIP" -eq 0 ]; then
  cp "$FONTS_SRC" "$FONTS_DST"
fi

python3 "$HELPER" --include "$INCLUDE" install --backup-suffix .bak-blogg-query \
  || die "serving block (root/current) does not have the /blogg?q= include"

if [ "$FONTS_SKIP" -eq 0 ]; then
  python3 "$HELPER" --include "$FONTS_INCLUDE" install --backup-suffix .bak-blogg-query \
    || die "serving block (root/current) does not have the /fonts/ cache include"
fi

if ! nginx -t; then
  log "nginx -t failed — rolling back this run only"
  rollback_this_run
  die "nginx -t failed — restored this run's snippets and serving block; not reloading"
fi

systemctl reload nginx
RELOADED=1
log "nginx reloaded with /blogg?q= rewrite in the serving block"

python3 "$HELPER" --include "$INCLUDE" check \
  || die "rewrite missing from the serving block after reload"
if [ "$FONTS_SKIP" -eq 0 ]; then
  python3 "$HELPER" --include "$FONTS_INCLUDE" check \
    || die "fonts cache include missing from the serving block after reload"
  log "verified: serving block includes $FONTS_INCLUDE"
else
  log "fonts cache snippet skipped because a /fonts/ location already exists"
fi
CLEANUP_ON_EXIT=0
prune_run_backups
log "verified: serving block includes $INCLUDE"
