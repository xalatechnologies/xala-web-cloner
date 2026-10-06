#!/usr/bin/env bash
# Sandbox for deploy/install-blogg-query.sh.
#
# Re-run from the repo root (or anywhere):
#   bash deploy/test-install-blogg-query.sh
#
# Uses nginx 1.24 with a private /etc/nginx (user namespace + bind mounts) and
# a docroot whose path contains `current`. Nothing here talks to the VPS.
#
# Optional:
#   INSTALLER=path  HELPER=path  SNIPPET=path
#
# Cases:
#   A  First install of the snippet. The serving block already has the
#      /blogg?q= include. A stale backup from an earlier run does not.
#      A broken snippet fails nginx -t. Rollback must not restore that stale
#      backup (it would wipe the include) and must delete the new snippet.
#   B  The snippet and the include are already in place. A broken replacement
#      fails nginx -t. Rollback must put the previous snippet back, leave the
#      include, re-run nginx -t, and not reload.
#   Font headers, when the snippet defines location ^~ /fonts/.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INSTALLER="${INSTALLER:-$ROOT/deploy/install-blogg-query.sh}"
HELPER="${HELPER:-$ROOT/deploy/nginx-serving-block.py}"
SNIPPET="${SNIPPET:-$ROOT/deploy/nginx-blogg-query.conf}"
export INSTALLER HELPER SNIPPET

if [ "${XALA_SANDBOX_INNER:-}" != 1 ]; then
  exec unshare --user --map-root-user --mount \
    env XALA_SANDBOX_INNER=1 bash "$0"
fi

[ "$(id -u)" -eq 0 ] || { echo "sandbox is not root (id=$(id))" >&2; exit 1; }
command -v nginx >/dev/null || { echo "nginx is required" >&2; exit 1; }
command -v python3 >/dev/null || { echo "python3 is required" >&2; exit 1; }
command -v curl >/dev/null || { echo "curl is required" >&2; exit 1; }

PORT=8797
FAILURES=0
BASE=""
SYSLOG=""
TLOG=""
BROKEN=""

log() { printf '\n== %s\n' "$*"; }

check() {
  local desc=$1 actual=$2 expected=$3
  if [ "$actual" = "$expected" ]; then
    printf 'PASS  %s (got %s)\n' "$desc" "$actual"
  else
    printf 'FAIL  %s (expected %s, got %s)\n' "$desc" "$expected" "$actual"
    FAILURES=$((FAILURES + 1))
  fi
}

stop_nginx() {
  if [ -f /run/nginx.pid ] && kill -0 "$(cat /run/nginx.pid)" 2>/dev/null; then
    /usr/sbin/nginx -s stop >/dev/null 2>&1 || true
    sleep 0.1
  fi
  rm -f /run/nginx.pid
  rm -rf /tmp/nginx-backups
}

cleanup() {
  stop_nginx || true
}
trap cleanup EXIT

setup_namespace() {
  BASE="$(mktemp -d /tmp/xala-nginx-sandbox-XXXXXX)"
  SYSLOG="$BASE/systemctl.log"
  TLOG="$BASE/nginx-t.log"
  BROKEN="$BASE/broken.conf"
  : >"$SYSLOG"
  : >"$TLOG"

  mkdir -p \
    "$BASE/etc-nginx/snippets" \
    "$BASE/etc-nginx/sites-enabled" \
    "$BASE/etc-nginx/conf.d" \
    "$BASE/var-lib-nginx/body" \
    "$BASE/var-lib-nginx/proxy" \
    "$BASE/var-lib-nginx/fastcgi" \
    "$BASE/var-lib-nginx/uwsgi" \
    "$BASE/var-lib-nginx/scgi" \
    "$BASE/var-log-nginx" \
    "$BASE/var-backups" \
    "$BASE/run" \
    "$BASE/www/xala/current/fonts" \
    "$BASE/bin"

  cp /etc/nginx/mime.types "$BASE/etc-nginx/mime.types"
  cp "$ROOT/public/fonts/inter-400-latin.woff2" "$BASE/www/xala/current/fonts/"
  cp "$ROOT/public/fonts/fonts.css" "$BASE/www/xala/current/fonts/"
  printf 'ok\n' >"$BASE/www/xala/current/index.html"

  cat >"$BASE/bin/nginx" <<'EOF'
#!/bin/sh
if [ "$1" = "-t" ]; then
  printf '%s\n' "-t" >> "${XALA_NGINX_T_LOG:?}"
fi
exec /usr/sbin/nginx "$@"
EOF
  cat >"$BASE/bin/systemctl" <<'EOF'
#!/bin/sh
printf '%s\n' "$*" >> "${XALA_SYSTEMCTL_LOG:?}"
if [ "$1" = "reload" ] && [ "$2" = "nginx" ]; then
  if [ -f /run/nginx.pid ] && kill -0 "$(cat /run/nginx.pid)" 2>/dev/null; then
    /usr/sbin/nginx -s reload
  else
    /usr/sbin/nginx
  fi
  exit 0
fi
echo "unexpected systemctl: $*" >&2
exit 1
EOF
  chmod 755 "$BASE/bin/nginx" "$BASE/bin/systemctl"

  mount --bind "$BASE/etc-nginx" /etc/nginx
  mount --bind "$BASE/var-lib-nginx" /var/lib/nginx
  mount --bind "$BASE/var-log-nginx" /var/log/nginx
  mount --bind "$BASE/var-backups" /var/backups
  mount --bind "$BASE/run" /run
  mkdir -p /var/www
  mount --bind "$BASE/www" /var/www

  cat > /etc/nginx/nginx.conf <<'EOF'
user root;
worker_processes 1;
error_log /var/log/nginx/error.log info;
pid /run/nginx.pid;
events { worker_connections 32; }
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    access_log /var/log/nginx/access.log;
    client_body_temp_path /var/lib/nginx/body;
    proxy_temp_path /var/lib/nginx/proxy;
    fastcgi_temp_path /var/lib/nginx/fastcgi;
    uwsgi_temp_path /var/lib/nginx/uwsgi;
    scgi_temp_path /var/lib/nginx/scgi;
    include /etc/nginx/sites-enabled/*;
}
EOF

  cat >"$BROKEN" <<'EOF'
# Deliberately invalid. The rewrite line is what the installer greps for,
# so it reaches `nginx -t` instead of rejecting the snippet early.
location = /blogg {
    rewrite ^ /blogg/q/$arg_q/index.html last;
    this_is_not_valid;
}
EOF

  export PATH="$BASE/bin:${PATH}"
  export XALA_NGINX_T_LOG="$TLOG"
  export XALA_SYSTEMCTL_LOG="$SYSLOG"
}

write_vhost() {
  local mode=$1
  local include_line=""
  if [ "$mode" = "with-include" ]; then
    include_line="    include /etc/nginx/snippets/xala-blogg-query.conf;"
  fi
  cat > /etc/nginx/sites-enabled/xala.no.conf <<EOF
server {
    listen 127.0.0.1:8798;
    server_name xala.no www.xala.no;
    return 301 https://\$host\$request_uri;
}

server {
    listen 127.0.0.1:${PORT};
    server_name xala.no www.xala.no;
    root /var/www/xala/current;
${include_line}
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    expires epoch;
    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF
}

reset_case() {
  stop_nginx
  rm -rf /etc/nginx/snippets /var/backups/nginx /tmp/nginx-backups
  rm -rf /var/backups/nginx-blogg-query-*
  mkdir -p /etc/nginx/snippets /var/backups/nginx
  : >"$SYSLOG"
  : >"$TLOG"
}

include_state() {
  if grep -q 'include /etc/nginx/snippets/xala-blogg-query.conf;' /etc/nginx/sites-enabled/xala.no.conf; then
    printf 'yes'
  else
    printf 'no'
  fi
}

snippet_state() {
  if [ -f /etc/nginx/snippets/xala-blogg-query.conf ]; then
    printf 'yes'
  else
    printf 'no'
  fi
}

reload_state() {
  if [ -s "$SYSLOG" ]; then
    printf 'yes'
  else
    printf 'no'
  fi
}

run_installer() {
  local src=$1
  local log=$2
  : >"$SYSLOG"
  : >"$TLOG"
  set +e
  bash "$INSTALLER" "$src" "$HELPER" >"$log" 2>&1
  local rc=$?
  set -e
  printf '%s' "$rc"
}

echo "installer: $INSTALLER"
echo "helper:    $HELPER"
echo "snippet:   $SNIPPET"
nginx -v

setup_namespace

# ---------------------------------------------------------------------------
# Case A — stale backup must not wipe an include this run did not add.
# ---------------------------------------------------------------------------
log "CASE A: first-install, stale backup would wipe the existing include"
reset_case
write_vhost with-include
# Snippet is absent: this invocation creates it.
rm -f /etc/nginx/snippets/xala-blogg-query.conf
# Earlier run's backup is the serving block without the include.
write_vhost without-include
cp /etc/nginx/sites-enabled/xala.no.conf /var/backups/nginx/xala.no.conf.bak-blogg-query
# Put the include back. The stale map still points at the pre-include copy.
write_vhost with-include
printf '%s\t%s\n' \
  "/etc/nginx/sites-enabled/xala.no.conf" \
  "/var/backups/nginx/xala.no.conf.bak-blogg-query" \
  > /var/backups/nginx/blogg-query-backup.map
PRE_A="$(cksum /etc/nginx/sites-enabled/xala.no.conf)"
echo "pre-run include=$(include_state) snippet=$(snippet_state)"
echo "stale backup include=$(grep -c 'xala-blogg-query.conf' /var/backups/nginx/xala.no.conf.bak-blogg-query || true)"
A_LOG="$BASE/case-a.log"
A_RC="$(run_installer "$BROKEN" "$A_LOG")"
echo "----- installer output (case A) -----"
cat "$A_LOG"
echo "----- end installer output (case A) -----"
echo "post-run include=$(include_state) snippet=$(snippet_state) reload=$(reload_state) nginx_t_calls=$(wc -l <"$TLOG" | tr -d ' ') exit=${A_RC}"
POST_A="$(cksum /etc/nginx/sites-enabled/xala.no.conf)"
check "case A exit status" "$A_RC" "1"
check "case A include still present" "$(include_state)" "yes"
check "case A new snippet removed" "$(snippet_state)" "no"
check "case A serving block unchanged" "$POST_A" "$PRE_A"
check "case A did not reload" "$(reload_state)" "no"
check "case A re-ran nginx -t" "$(wc -l <"$TLOG" | tr -d ' ')" "2"

# ---------------------------------------------------------------------------
# Case B — broken snippet must not stay included or on disk.
# ---------------------------------------------------------------------------
log "CASE B: broken snippet must be rolled back, not left included"
reset_case
write_vhost with-include
cp "$SNIPPET" /etc/nginx/snippets/xala-blogg-query.conf
GOOD_SUM="$(cksum /etc/nginx/snippets/xala-blogg-query.conf)"
echo "pre-run include=$(include_state) snippet=$(snippet_state)"
echo "----- pre-run nginx -t (case B) -----"
nginx -t
echo "----- end pre-run nginx -t (case B) -----"
: >"$TLOG"
B_LOG="$BASE/case-b.log"
B_RC="$(run_installer "$BROKEN" "$B_LOG")"
echo "----- installer output (case B) -----"
cat "$B_LOG"
echo "----- end installer output (case B) -----"
echo "post-run include=$(include_state) snippet=$(snippet_state) reload=$(reload_state) nginx_t_calls=$(wc -l <"$TLOG" | tr -d ' ') exit=${B_RC}"
if [ -f /etc/nginx/snippets/xala-blogg-query.conf ]; then
  POST_B="$(cksum /etc/nginx/snippets/xala-blogg-query.conf)"
  if grep -q 'this_is_not_valid' /etc/nginx/snippets/xala-blogg-query.conf; then
    BROKEN_LEFT="yes"
  else
    BROKEN_LEFT="no"
  fi
else
  POST_B="missing"
  BROKEN_LEFT="absent"
fi
check "case B exit status" "$B_RC" "1"
check "case B include still present" "$(include_state)" "yes"
check "case B snippet matches pre-run" "$POST_B" "$GOOD_SUM"
check "case B broken snippet not in place" "$BROKEN_LEFT" "no"
check "case B did not reload" "$(reload_state)" "no"
check "case B re-ran nginx -t" "$(wc -l <"$TLOG" | tr -d ' ')" "2"
echo "----- nginx -t after case B rollback -----"
set +e
nginx -t
B_T=$?
set -e
echo "----- end nginx -t after case B rollback (exit ${B_T}) -----"
check "case B restored config passes nginx -t" "$B_T" "0"

# ---------------------------------------------------------------------------
# Case C — snippet did not exist, this run added the include, a stale backup
# from another directory must not replace the pre-run serving block.
# ---------------------------------------------------------------------------
log "CASE C: absent snippet — remove it and the include this run added"
reset_case
write_vhost without-include
printf '\n# pre-run-marker\n' >> /etc/nginx/sites-enabled/xala.no.conf
mkdir -p /tmp/nginx-backups
write_vhost without-include
printf '\n# stale-marker\n' >> /etc/nginx/sites-enabled/xala.no.conf
cp /etc/nginx/sites-enabled/xala.no.conf /tmp/nginx-backups/xala.no.conf.bak-blogg-query
write_vhost without-include
printf '\n# pre-run-marker\n' >> /etc/nginx/sites-enabled/xala.no.conf
printf '%s\t%s\n' \
  "/etc/nginx/sites-enabled/xala.no.conf" \
  "/tmp/nginx-backups/xala.no.conf.bak-blogg-query" \
  > /tmp/nginx-backups/blogg-query-backup.map
rm -f /etc/nginx/snippets/xala-blogg-query.conf
PRE_C="$(cksum /etc/nginx/sites-enabled/xala.no.conf)"
echo "pre-run include=$(include_state) snippet=$(snippet_state)"
C_LOG="$BASE/case-c.log"
C_RC="$(run_installer "$BROKEN" "$C_LOG")"
echo "----- installer output (case C) -----"
cat "$C_LOG"
echo "----- end installer output (case C) -----"
POST_C="$(cksum /etc/nginx/sites-enabled/xala.no.conf)"
if grep -q 'pre-run-marker' /etc/nginx/sites-enabled/xala.no.conf; then MARKER="pre-run"; else MARKER="missing"; fi
if grep -q 'stale-marker' /etc/nginx/sites-enabled/xala.no.conf; then STALE_APPLIED="yes"; else STALE_APPLIED="no"; fi
echo "post-run include=$(include_state) snippet=$(snippet_state) marker=${MARKER} stale_applied=${STALE_APPLIED} reload=$(reload_state) nginx_t_calls=$(wc -l <"$TLOG" | tr -d ' ') exit=${C_RC}"
check "case C exit status" "$C_RC" "1"
check "case C include removed" "$(include_state)" "no"
check "case C new snippet removed" "$(snippet_state)" "no"
check "case C serving block matches pre-run" "$POST_C" "$PRE_C"
check "case C kept pre-run marker" "$MARKER" "pre-run"
check "case C did not apply stale backup" "$STALE_APPLIED" "no"
check "case C did not reload" "$(reload_state)" "no"
check "case C re-ran nginx -t" "$(wc -l <"$TLOG" | tr -d ' ')" "2"
echo "----- nginx -t after case C rollback -----"
set +e
nginx -t
C_T=$?
set -e
echo "----- end nginx -t after case C rollback (exit ${C_T}) -----"
check "case C restored config passes nginx -t" "$C_T" "0"

# ---------------------------------------------------------------------------
# Font cache headers. Skipped until the snippet grows the location.
# ---------------------------------------------------------------------------
log "FONT: sandbox curl -I of a real woff2"
if ! grep -q 'location \^~ /fonts/' "$SNIPPET"; then
  echo "SKIP  font header proof: snippet has no location ^~ /fonts/ yet"
else
  reset_case
  write_vhost without-include
  echo "----- nginx -t before font install -----"
  nginx
  nginx -t
  echo "----- end nginx -t before font install -----"
  F_LOG="$BASE/font.log"
  F_RC="$(run_installer "$SNIPPET" "$F_LOG")"
  echo "----- installer output (font) -----"
  cat "$F_LOG"
  echo "----- end installer output (font) -----"
  echo "----- nginx -t after font install -----"
  set +e
  nginx -t
  F_T=$?
  set -e
  echo "----- end nginx -t after font install (exit ${F_T}) -----"
  # Reload returns once the signal is sent. Wait until the new worker
  # answers, otherwise curl can still see the pre-install expires epoch.
  FONT_HDR=""
  attempt=1
  while [ "$attempt" -le 20 ]; do
    FONT_HDR="$(curl -sI "http://127.0.0.1:${PORT}/fonts/inter-400-latin.woff2" || true)"
    if printf '%s\n' "$FONT_HDR" | grep -qi 'max-age=604800'; then
      break
    fi
    attempt=$((attempt + 1))
    sleep 0.1
  done
  echo "----- curl -I /fonts/inter-400-latin.woff2 (attempt ${attempt}) -----"
  printf '%s\n' "$FONT_HDR"
  echo "----- end curl font -----"
  echo "----- curl -I /fonts/fonts.css -----"
  CSS_HDR="$(curl -sI "http://127.0.0.1:${PORT}/fonts/fonts.css")"
  printf '%s\n' "$CSS_HDR"
  echo "----- end curl css -----"
  echo "----- curl -I /index.html (server expires, for contrast) -----"
  curl -sI "http://127.0.0.1:${PORT}/index.html"
  echo "----- end curl index -----"
  check "font install exit status" "$F_RC" "0"
  check "font nginx -t" "$F_T" "0"
  if printf '%s\n' "$FONT_HDR" | grep -q '200 OK'; then FONT_OK="yes"; else FONT_OK="no"; fi
  if printf '%s\n' "$FONT_HDR" | grep -qi 'Content-Type: font/woff2'; then FONT_TYPE="yes"; else FONT_TYPE="no"; fi
  if printf '%s\n' "$FONT_HDR" | grep -qi 'Cache-Control: public, max-age=604800'; then FONT_CC="yes"; else FONT_CC="no"; fi
  if printf '%s\n' "$FONT_HDR" | grep -qi 'X-Content-Type-Options: nosniff'; then FONT_NOSNIFF="yes"; else FONT_NOSNIFF="no"; fi
  if printf '%s\n' "$FONT_HDR" | grep -qi 'Strict-Transport-Security: max-age=31536000; includeSubDomains'; then FONT_HSTS="yes"; else FONT_HSTS="no"; fi
  if printf '%s\n' "$FONT_HDR" | grep -qi 'immutable'; then FONT_IMM="yes"; else FONT_IMM="no"; fi
  if printf '%s\n' "$FONT_HDR" | grep -qi 'no-cache'; then FONT_NC="yes"; else FONT_NC="no"; fi
  if printf '%s\n' "$CSS_HDR" | grep -qi 'Content-Type: text/css'; then CSS_TYPE="yes"; else CSS_TYPE="no"; fi
  check "font HTTP 200" "$FONT_OK" "yes"
  check "font Content-Type" "$FONT_TYPE" "yes"
  check "font Cache-Control 7 days" "$FONT_CC" "yes"
  check "font nosniff" "$FONT_NOSNIFF" "yes"
  check "font HSTS" "$FONT_HSTS" "yes"
  check "font not immutable" "$FONT_IMM" "no"
  check "font not no-cache" "$FONT_NC" "no"
  check "fonts.css Content-Type" "$CSS_TYPE" "yes"
fi

log "summary"
echo "failures=${FAILURES}"
if [ "$FAILURES" -ne 0 ]; then
  echo "SANDBOX FAIL"
  exit 1
fi
echo "SANDBOX PASS"
