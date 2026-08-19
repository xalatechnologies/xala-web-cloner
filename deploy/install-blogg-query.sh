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
set -euo pipefail

SNIPPET_SRC="${1:-deploy/nginx-blogg-query.conf}"
HELPER="${2:-deploy/nginx-serving-block.py}"
SNIPPET_DST="/etc/nginx/snippets/xala-blogg-query.conf"
INCLUDE='include /etc/nginx/snippets/xala-blogg-query.conf;'

log() { printf '[blogg-query] %s\n' "$*"; }
die() { printf '[blogg-query] %s\n' "$*" >&2; exit 1; }

restore_backups() {
  for bak in /etc/nginx/sites-enabled/*.bak-blogg-query /etc/nginx/conf.d/*.bak-blogg-query /etc/nginx/sites-available/*.bak-blogg-query /etc/nginx/nginx.conf.bak-blogg-query; do
    [ -f "$bak" ] || continue
    mv "$bak" "${bak%.bak-blogg-query}"
  done
}

[ -f "$SNIPPET_SRC" ] || die "missing snippet $SNIPPET_SRC"
[ -f "$HELPER" ] || die "missing helper $HELPER"
[ "$(id -u)" -eq 0 ] || die "run as root on the VPS"
command -v python3 >/dev/null || die "python3 is required to find the serving block"
command -v nginx >/dev/null || die "nginx is not installed"

mkdir -p /etc/nginx/snippets
cp "$SNIPPET_SRC" "$SNIPPET_DST"
grep -q 'rewrite ^ /blogg/q/$arg_q/index.html last;' "$SNIPPET_DST" \
  || die "$SNIPPET_DST is missing the \$arg_q rewrite"

python3 "$HELPER" --include "$INCLUDE" install --backup-suffix .bak-blogg-query \
  || die "serving block (root/current) does not have the /blogg?q= include"

if ! nginx -t; then
  restore_backups
  die "nginx -t failed — restored the previous serving-block config"
fi

systemctl reload nginx
log "nginx reloaded with /blogg?q= rewrite in the serving block"

python3 "$HELPER" --include "$INCLUDE" check \
  || die "rewrite missing from the serving block after reload"
log "verified: serving block includes $INCLUDE"
