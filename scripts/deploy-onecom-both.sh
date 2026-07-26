#!/usr/bin/env bash
# Deploy dist/ to BOTH public_html and www on one.com.
# Use this when you're not sure which folder the live site or File Manager uses —
# deploying to both ensures the site updates no matter which one is served.
# You will be prompted for your SSH password once per folder (twice total).

set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BASE="/customers/6/7/3/xala.no/httpd.private"
cd "$REPO_ROOT"

if [[ ! -d dist ]]; then
  echo "Run 'npm run build' first."
  exit 1
fi

echo "Deploying to BOTH public_html and www..."
echo ""

echo "=== 1/2 Syncing to public_html ==="
rsync -avz --delete -e "ssh -p 22" dist/ xala.no@ssh.xala.no:"${BASE}/public_html/"

echo ""
echo "=== 2/2 Syncing to www ==="
rsync -avz --delete -e "ssh -p 22" dist/ xala.no@ssh.xala.no:"${BASE}/www/"

echo ""
echo "Done. Check the File Manager — the folder that shows updated (today's) dates is the one that was stale. Do a hard refresh (Cmd+Shift+R) on the site."
