Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Push-Location (Join-Path $PSScriptRoot '..')
try {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw 'Node.js 18.17 or newer is required.'
  }

  if (-not (Test-Path 'node_modules')) {
    Write-Host 'Installing dependencies...'
    npm install
  }

  Write-Host 'Starting SocialVault Downloader at http://localhost:3000'
  npm run dev
}
finally {
  Pop-Location
}