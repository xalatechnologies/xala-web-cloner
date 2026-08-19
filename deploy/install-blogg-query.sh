#!/usr/bin/env bash
# Install the nginx rewrite that maps /blogg?q= onto a prerendered listing.
#
# Idempotent. Safe to re-run. Does not fail a deploy if the live server block
# cannot be found — the filtered files are still on disk at /blogg/q/<query>/.
set -euo pipefail

SNIPPET_SRC="${1:-deploy/nginx-blogg-query.conf}"
SNIPPET_DST="/etc/nginx/snippets/xala-blogg-query.conf"
INCLUDE='include /etc/nginx/snippets/xala-blogg-query.conf;'

log() { printf '[blogg-query] %s\n' "$*"; }
warn() { printf '[blogg-query] %s\n' "$*" >&2; }

[ -f "$SNIPPET_SRC" ] || { warn "missing $SNIPPET_SRC"; exit 1; }
[ "$(id -u)" -eq 0 ] || { warn "run as root on the VPS"; exit 1; }

mkdir -p /etc/nginx/snippets
cp "$SNIPPET_SRC" "$SNIPPET_DST"

if grep -Rql 'xala-blogg-query.conf' /etc/nginx/sites-enabled /etc/nginx/conf.d /etc/nginx/sites-available 2>/dev/null; then
  log "server block already includes the snippet"
else
  CONF=""
  for dir in /etc/nginx/sites-enabled /etc/nginx/conf.d /etc/nginx/sites-available; do
    [ -d "$dir" ] || continue
    match=$(grep -l 'server_name.*xala\.no' "$dir"/* 2>/dev/null | head -n 1 || true)
    if [ -n "$match" ]; then
      CONF="$match"
      break
    fi
  done

  if [ -z "$CONF" ]; then
    warn "could not find a server_name xala.no block — copy $SNIPPET_DST in by hand"
    exit 0
  fi

  log "adding include to ${CONF}"
  cp "$CONF" "${CONF}.bak-blogg-query"
  python3 - "$CONF" "$INCLUDE" <<'PY'
import sys
path, include = sys.argv[1], sys.argv[2]
text = open(path, encoding="utf-8").read()
if include in text:
    raise SystemExit(0)
needle = "server_name"
idx = text.find(needle)
if idx < 0:
    raise SystemExit("no server_name in " + path)
# Insert the include on its own line after the server_name directive.
end = text.find(";", idx)
if end < 0:
    raise SystemExit("unterminated server_name in " + path)
updated = text[: end + 1] + "\n    " + include + text[end + 1 :]
open(path, "w", encoding="utf-8").write(updated)
PY
fi

if nginx -t; then
  systemctl reload nginx
  log "nginx reloaded with /blogg?q= rewrite"
else
  warn "nginx -t failed — restoring any backup and leaving the live config alone"
  for bak in /etc/nginx/sites-enabled/*.bak-blogg-query /etc/nginx/conf.d/*.bak-blogg-query /etc/nginx/sites-available/*.bak-blogg-query; do
    [ -f "$bak" ] || continue
    mv "$bak" "${bak%.bak-blogg-query}"
  done
  exit 1
fi
