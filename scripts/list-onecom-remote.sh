#!/usr/bin/env bash
# Lists the remote one.com directory so you can see the correct web root path.
# Run from repo root:  bash scripts/list-onecom-remote.sh
# You will be prompted for the SSH password.

set -e
echo "Connecting to xala.no@ssh.xala.no (port 22)..."
echo "You will be prompted for your SSH/SFTP password."
echo ""
ssh xala.no@ssh.xala.no -p 22 "echo '--- Home directory ---' && pwd && echo '' && echo '--- Contents ---' && ls -la"
