#!/usr/bin/env bash
# Deploy dist/ to one.com and remove old files on the server (so the site actually updates).
# Use this if a normal deploy "went through" but the site still shows the old version.
# Usage: bash scripts/deploy-onecom-clean.sh [REMOTE_PATH]
# Default REMOTE_PATH: /customers/6/7/3/xala.no/httpd.private/public_html

set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE_PATH="${1:-/customers/6/7/3/xala.no/httpd.private/public_html}"
cd "$REPO_ROOT"

if [[ ! -d dist ]]; then
  echo "Run 'npm run build' first."
  exit 1
fi

echo "Syncing dist/ to xala.no (old files on server will be removed)..."
echo "Remote: ${REMOTE_PATH}"
echo "You will be prompted for your SSH password."
rsync -avz --delete -e "ssh -p 22" dist/ xala.no@ssh.xala.no:"${REMOTE_PATH}/"
echo "Done. Do a hard refresh (Cmd+Shift+R) or try incognito if the site still looks old."
