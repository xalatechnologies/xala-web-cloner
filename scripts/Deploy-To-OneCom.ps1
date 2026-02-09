<#
.SYNOPSIS
    Builds the Xala website and deploys it to one.com via SFTP/SCP (ssh.xala.no).

.DESCRIPTION
    Runs npm run build, then uploads the contents of dist/ to the one.com web root
    using OpenSSH scp. Uses SSH/SFTP credentials for xala.no (Host: ssh.xala.no,
    Username: xala.no, Port: 22). See docs/one-com-deployment.md for details.

.PARAMETER SkipBuild
    Skip running npm run build; only upload existing dist/ folder.

.PARAMETER SshKeyPath
    Full path to SSH private key for passwordless login. If not set, scp will prompt for password.

.PARAMETER RemotePath
    Remote directory on one.com (e.g. public_html or www). Default: public_html.

.EXAMPLE
    .\Deploy-To-OneCom.ps1
    Build and deploy (prompts for password if no key).

.EXAMPLE
    .\Deploy-To-OneCom.ps1 -SkipBuild
    Deploy existing dist only.

.EXAMPLE
    .\Deploy-To-OneCom.ps1 -SshKeyPath "$env:USERPROFILE\.ssh\xala_no_deploy"
    Deploy using SSH key.
#>

[CmdletBinding()]
param(
    [switch]$SkipBuild,
    [string]$SshKeyPath = "",
    [string]$RemotePath = "/customers/6/7/3/xala.no/httpd.private/public_html"
)

# One.com SSH/SFTP connection (see docs/one-com-deployment.md)
$SftpHost = "ssh.xala.no"
$SftpUser = "xala.no"
$SftpPort = 22

$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot | Split-Path -Parent
$DistPath = Join-Path $ProjectRoot "dist"

# Ensure we're in project root and dist exists
if (-not (Test-Path (Join-Path $ProjectRoot "package.json"))) {
    Write-Error "Project root not found (package.json missing). Run this script from repo root or scripts folder."
}
if (-not $SkipBuild -and -not (Test-Path $DistPath)) {
    # Will be created by build
}
if ($SkipBuild -and -not (Test-Path $DistPath)) {
    Write-Error "dist/ not found. Run without -SkipBuild first to create a build."
}

# Step 1: Build
if (-not $SkipBuild) {
    Write-Host "Building project (npm run build)..." -ForegroundColor Cyan
    Push-Location $ProjectRoot
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) { throw "npm run build failed with exit code $LASTEXITCODE" }
    } finally {
        Pop-Location
    }
    Write-Host "Build completed." -ForegroundColor Green
} else {
    Write-Host "Skipping build (using existing dist/)." -ForegroundColor Yellow
}

# Step 2: Upload via scp (OpenSSH)
# Copy contents of dist/ into remote RemotePath (xala.no: public_html or www).
# Using "dist/." so scp copies directory contents, not the folder itself.
$DistSource = (Join-Path $DistPath ".") -replace "\\", "/"
$ScpArgs = @(
    "-r",
    "-P", $SftpPort,
    $DistSource,
    "${SftpUser}@${SftpHost}:${RemotePath}/"
)
if ($SshKeyPath -and (Test-Path $SshKeyPath)) {
    $ScpArgs = @("-i", (Resolve-Path $SshKeyPath).Path) + $ScpArgs
}

Write-Host "Uploading dist/ to ${SftpUser}@${SftpHost}:${RemotePath}/ ..." -ForegroundColor Cyan
& scp @ScpArgs
if ($LASTEXITCODE -ne 0) {
    Write-Error "scp upload failed. Check SSH key, password, and remote path (see docs/one-com-deployment.md)."
}

Write-Host "Deployment finished successfully." -ForegroundColor Green
