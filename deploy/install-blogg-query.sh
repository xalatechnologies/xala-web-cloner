#!/usr/bin/env bash
# Install the nginx rewrite that maps /blogg?q= onto a prerendered listing.
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
# (XALA_NGINX_BACKUP_DIR). It restores the snippet file as well as any
# serving-block backup written this run. A map left behind by an earlier run
# is not read: that restored a pre-include config and wiped a live
# /blogg?q= include. If the snippet did not exist before this run, rollback
# deletes it. On `nginx -t` failure both files are put back, `nginx -t` is
# run again, and nginx is not reloaded.
set -euo pipefail

SNIPPET_SRC="${1:-deploy/nginx-blogg-query.conf}"
HELPER="${2:-deploy/nginx-serving-block.py}"
SNIPPET_DST="/etc/nginx/snippets/xala-blogg-query.conf"
INCLUDE='include /etc/nginx/snippets/xala-blogg-query.conf;'

log() { printf '[blogg-query] %s\n' "$*"; }
die() { printf '[blogg-query] %s\n' "$*" >&2; exit 1; }

RUN_BACKUP_DIR=""
SNIPPET_WAS_PRESENT=0

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

restore_snippet() {
  if [ "$SNIPPET_WAS_PRESENT" -eq 1 ]; then
    cp -a "$RUN_BACKUP_DIR/xala-blogg-query.conf" "$SNIPPET_DST"
    log "restored snippet from this run"
  else
    rm -f "$SNIPPET_DST"
    log "removed snippet created by this run"
  fi
}

restore_serving_blocks() {
  # Only the map in $XALA_NGINX_BACKUP_DIR. nginx-serving-block.py restore
  # must not also walk /var/backups/nginx or /tmp/nginx-backups.
  python3 "$HELPER" restore --backup-suffix .bak-blogg-query
}

rollback_this_run() {
  log "rolling back only $RUN_BACKUP_DIR"
  restore_snippet
  restore_serving_blocks
  if nginx -t; then
    log "restored config passed nginx -t; not reloading"
  else
    log "restored config failed nginx -t; not reloading"
  fi
}

[ -f "$SNIPPET_SRC" ] || die "missing snippet $SNIPPET_SRC"
[ -f "$HELPER" ] || die "missing helper $HELPER"
[ "$(id -u)" -eq 0 ] || die "run as root on the VPS"
command -v python3 >/dev/null || die "python3 is required to find the serving block"
command -v nginx >/dev/null || die "nginx is not installed"

prepare_run_backup
backup_snippet

mkdir -p /etc/nginx/snippets
cp "$SNIPPET_SRC" "$SNIPPET_DST"
# $arg_q is nginx's variable. Single quotes keep this shell from expanding it.
# shellcheck disable=SC2016
grep -q 'rewrite ^ /blogg/q/$arg_q/index.html last;' "$SNIPPET_DST" \
  || die "$SNIPPET_DST is missing the \$arg_q rewrite"

python3 "$HELPER" --include "$INCLUDE" install --backup-suffix .bak-blogg-query \
  || die "serving block (root/current) does not have the /blogg?q= include"

if ! nginx -t; then
  log "nginx -t failed — rolling back this run only"
  rollback_this_run
  die "nginx -t failed — restored this run's snippet and serving block; not reloading"
fi

systemctl reload nginx
log "nginx reloaded with /blogg?q= rewrite in the serving block"

python3 "$HELPER" --include "$INCLUDE" check \
  || die "rewrite missing from the serving block after reload"
log "verified: serving block includes $INCLUDE"
