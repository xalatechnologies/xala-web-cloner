#!/usr/bin/env bash
# Deploy dist/ to one.com via SCP.
# Usage: bash scripts/deploy-onecom.sh [REMOTE_PATH]
#   REMOTE_PATH: remote folder (default: /www). Try /www first; if it fails, run list-onecom-remote.sh to see the correct path.
# You will be prompted for the SSH password.

set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# Default: full path to public_html on xala.no (from "ssh ... pwd && ls -la")
REMOTE_PATH="${1:-/customers/6/7/3/xala.no/httpd.private/public_html}"
cd "$REPO_ROOT"

if [[ ! -d dist ]]; then
  echo "Run 'npm run build' first."
  exit 1
fi

echo "Uploading dist/ to xala.no@ssh.xala.no:${REMOTE_PATH}/"
echo "You will be prompted for your SSH password."
scp -r -P 22 dist/. xala.no@ssh.xala.no:"${REMOTE_PATH}/"
echo "Done."
