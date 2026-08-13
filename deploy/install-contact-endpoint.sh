#!/usr/bin/env bash
# Install (or update) the contact/job-application endpoint on the VPS.
#
# The site is static; this is the one moving part behind it. It exists because
# the forms need somewhere same-origin to POST to, and because the Resend API
# key cannot live in a browser bundle.
#
# Idempotent: safe to re-run to ship a new version of the service.
#
#   ./deploy/install-contact-endpoint.sh            # install / update
#   ./deploy/install-contact-endpoint.sh --status   # is it healthy?
set -euo pipefail

VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:-72.61.23.56}"
PORT="${CONTACT_PORT:-8110}"
SSH_OPTS=(-o BatchMode=yes -o ConnectTimeout=15)

log() { printf '\033[0;34m[contact]\033[0m %s\n' "$*"; }
die() { printf '\033[0;31m[contact] %s\033[0m\n' "$*" >&2; exit 1; }

if [ "${1:-}" = "--status" ]; then
  ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" \
    "systemctl is-active xala-contact.service; curl -sS --max-time 5 http://127.0.0.1:${PORT}/health || true"
  exit 0
fi

[ -f server/contact-endpoint.mjs ] || die "run from the project root."

log "Shipping the service…"
ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" 'mkdir -p /opt/xala-contact'
scp -q "${SSH_OPTS[@]}" server/contact-endpoint.mjs "${VPS_USER}@${VPS_HOST}:/opt/xala-contact/contact-endpoint.mjs"

log "Configuring unit + environment…"
ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" PORT="${PORT}" 'bash -s' <<'REMOTE'
set -euo pipefail
PORT="${PORT:-8110}"

# The Resend key is shared with the agent fleet rather than duplicated: one key,
# one place to rotate it.
KEY=$(grep -oE "^RESEND_API_KEY=.*" /etc/xaheen-agent-fleet.env | cut -d= -f2- || true)
[ -n "$KEY" ] || { echo "RESEND_API_KEY not found in /etc/xaheen-agent-fleet.env" >&2; exit 1; }

if [ ! -f /etc/xala-contact.env ]; then
  cat > /etc/xala-contact.env <<EOF
CONTACT_PORT=${PORT}
RESEND_API_KEY=${KEY}
# Until xala.no is verified in Resend, mail is sent from the verified
# digilist.no domain with reply_to set to the enquirer. Flip this line once
# the DNS records for xala.no are live.
CONTACT_MAIL_FROM=Xala Technologies <noreply@digilist.no>
CONTACT_MAIL_TO=info@xala.no
EOF
  chmod 600 /etc/xala-contact.env
fi

cat > /etc/systemd/system/xala-contact.service <<EOF
[Unit]
Description=xala.no contact + job application endpoint (delivers via Resend)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
EnvironmentFile=/etc/xala-contact.env
ExecStart=/usr/bin/node /opt/xala-contact/contact-endpoint.mjs
Restart=always
RestartSec=3
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable xala-contact.service >/dev/null 2>&1 || true
systemctl restart xala-contact.service
sleep 2
systemctl is-active --quiet xala-contact.service || { journalctl -u xala-contact -n 20 --no-pager; exit 1; }
curl -sS --max-time 5 "http://127.0.0.1:${PORT}/health" || { echo "health check failed" >&2; exit 1; }
echo
REMOTE

log "Verifying through nginx…"
code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 https://xala.no/api/health || true)
[ "$code" = "200" ] || die "https://xala.no/api/health returned ${code} — is the nginx /api/ proxy in place?"

log "Endpoint healthy."
