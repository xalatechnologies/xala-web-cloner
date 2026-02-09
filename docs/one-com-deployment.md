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

On one.com, the website files are usually placed in one of:

- `public_html`
- `www`
- `web`

Check in the One.com file manager or your hosting package description. The PowerShell script uses **`public_html`** by default; you can change it via the script parameter or the documented variable.

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

---

## Manual deployment

1. **Build locally:**
   ```bash
   npm run build
   ```
2. **Upload** the contents of the `dist/` folder to your one.com web root using:
   - An SFTP client (e.g. FileZilla, WinSCP) with the SSH/SFTP details above, or  
   - FTP with the FTP host/username/port above.

The repository includes `public/.htaccess`; Vite copies it into `dist/`, so HTTPS, redirects, and SPA routing are applied on one.com.

---

## Security notes

- Do **not** commit passwords or private keys to the repository.
- Use **SFTP** instead of FTP when possible.
- Use an **SSH key** for deployments to avoid typing passwords and to limit exposure.

---

## Email (contact form)

Contact form emails are sent via **One.com SMTP** in the Supabase Edge Function `contact-notification`:

- **Host:** `send.one.com` (port 587)  
- **User:** `website@xala.no`  
- **Password:** Stored in Supabase secrets as `SMTP_PASSWORD`

This is separate from SSH/SFTP/FTP; no changes here are needed for deployment.
