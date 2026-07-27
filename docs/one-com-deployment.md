# One.com Deployment (xala.no)

This document describes how to deploy the Xala website to **one.com** hosting using SSH/SFTP or FTP, and how to use the automated PowerShell deployment script.

---

## Connection details

### SSH & SFTP (recommended)

Use SFTP for secure, encrypted uploads.

| Setting   | Value      |
|----------|------------|
| **Host** | `ssh.xala.no` |
| **Username** | `xala.no` |
| **Port** | `22` |

**Password:** You receive it by email from one.com. In the One.com control panel, use **“Send”** to get an email that lets you create or change the SSH/SFTP password.

---

### FTP (fallback)

FTP is not encrypted. Prefer SFTP when possible.

| Setting   | Value      |
|----------|------------|
| **Host** | `ftp.xala.no` |
| **Username** | `xala.no` |
| **Port** | `21` |

**Password:** Same as for SSH/SFTP — use **“Send”** in the One.com FTP section to receive the email for creating/changing the FTP password.

---

## Remote web root

On one.com, the website root folder **may not be** `public_html`. If you see:

```text
scp: realpath public_html/: No such file
scp: upload "public_html/": path canonicalization failed
```

then the folder name is different. **Find the correct path** by listing your home directory:

```bash
ssh xala.no@ssh.xala.no "pwd && ls -la"
```

Enter your SSH password when prompted. For xala.no the home is `httpd.private` and the web folders are **`public_html`** and **`www`** — use the full path in the deploy command below.

**One.com web root:** One.com’s SSH docs say the web space is at **`/www`** (absolute path). Deploy with:

```bash
scp -r -P 22 dist/. xala.no@ssh.xala.no:/customers/6/7/3/xala.no/httpd.private/public_html/
```

Alternatively, to deploy to **www** use `.../httpd.private/www/` in the path. To list the remote directory to see your account’s folder names:

```bash
ssh xala.no@ssh.xala.no "pwd && ls -la"
```

---

## Automated deployment (PowerShell)

### Prerequisites

1. **Windows** with PowerShell 5.1 or PowerShell Core (pwsh).
2. **OpenSSH client** (built-in on Windows 10/11):  
   Settings → Apps → Optional features → “Open SSH Client”. Or install from [OpenSSH](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse).
3. **Node.js** and **npm** (for `npm run build`).
4. **SSH key** (recommended) or use password when the script prompts.

### SSH key (passwordless deploy)

1. Generate a key (if you don’t have one):
   ```powershell
   ssh-keygen -t ed25519 -C "xala-deploy" -f "$env:USERPROFILE\.ssh\xala_no_deploy"
   ```
2. Copy the **public** key to one.com:
   - One.com control panel → **SSH & SFTP** → add your public key (`xala_no_deploy.pub` content),  
   **or**
   - One.com may provide a way to paste the key in the same place where you enable SSH/SFTP.
3. When running the script, set the key path (see script usage below).

### Script location and usage

Run from the **repository root** (where `package.json` and `scripts/` are):

```powershell
# Build and deploy (will prompt for SFTP password if no key)
.\scripts\Deploy-To-OneCom.ps1

# Deploy only (skip build; use existing dist/)
.\scripts\Deploy-To-OneCom.ps1 -SkipBuild

# Use a specific SSH key
.\scripts\Deploy-To-OneCom.ps1 -SshKeyPath "$env:USERPROFILE\.ssh\xala_no_deploy"

# Custom remote path (if your web root is not public_html)
.\scripts\Deploy-To-OneCom.ps1 -RemotePath "www"
```

The script:

1. Builds the site with `npm run build` (unless `-SkipBuild`).
2. Uploads the contents of `dist/` to the remote path via SFTP (using OpenSSH `sftp` or `scp`).

On one.com the web root is usually the absolute path **`/www`** — use `-RemotePath /www` (or the path you see when you run `ssh xala.no@ssh.xala.no "pwd && ls -la"`).

---

## Manual deployment

1. **Build locally:**
   ```bash
   npm run build
   ```
2. **Upload** the contents of the `dist/` folder. For xala.no the web root is one of **`public_html`** or **`www`** (use full path):
   ```bash
   scp -r -P 22 dist/. xala.no@ssh.xala.no:/customers/6/7/3/xala.no/httpd.private/public_html/
   ```
   Or use `www` instead of `public_html` in the path if that's where your site is served from.
   Or use an SFTP client (FileZilla, WinSCP) or FTP with the details above.

The repository includes `public/.htaccess`; Vite copies it into `dist/`, so HTTPS, redirects, and SPA routing are applied on one.com.

---

## Site not updating after deploy?

1. **Browser cache** — Do a hard refresh: **Ctrl+Shift+R** (Windows/Linux) or **Cmd+Shift+R** (Mac). Or open the site in a private/incognito window.
2. **Wrong folder** — Your domain may be served from **www** while you uploaded to **public_html** (or the opposite). In the One.com control panel, check which folder the domain uses, then upload to that folder. Try deploying to the other path if needed:
   - `.../httpd.private/public_html/`
   - `.../httpd.private/www/`
3. **Clean deploy** — Old hashed JS/CSS files can leave the server showing an old `index.html`. Use a sync that removes obsolete files. From the repo root:
   ```bash
   rsync -avz --delete -e "ssh -p 22" dist/ xala.no@ssh.xala.no:/customers/6/7/3/xala.no/httpd.private/public_html/
   ```
   (Replace `public_html` with `www` if that is your web root.) You will be prompted for your SSH password.
4. **File Manager shows old dates** — If in One.com File Manager the files still show an old date after you deployed, deploy to **both** folders: run `bash scripts/deploy-onecom-both.sh` (you’ll be prompted for your SSH password twice).
5. **Host cache** — If one.com has a “Clear cache” or “Purge cache” option in the control panel, try that.

---

## Security notes

- Do **not** commit passwords or private keys to the repository.
- Use **SFTP** instead of FTP when possible.
- Use an **SSH key** for deployments to avoid typing passwords and to limit exposure.

---

## Email (contact form)

The contact form has no backend: submitting it opens a `mailto:info@xala.no` link with the message pre-filled, so the visitor's own mail client sends it. There is no SMTP or Supabase Edge Function involved.

This is separate from SSH/SFTP/FTP; no changes here are needed for deployment.
