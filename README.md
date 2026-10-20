# SocialVideoDownloader (socialvideodownloader.com)

SocialVideoDownloader is a modern, standard web platform for downloading publicly accessible social media media content. It operates exclusively on public streams and complies with internet standards and platform security controls.

## Domain & Project Name

- **Domain:** `socialvideodownloader.com`
- **Project Name:** `SocialVideoDownloader`
- **Brand Mark:** `SVD`

## Features

- **Universal Multi-Platform Downloader:**
  - Real-time platform auto-detection from post URLs.
  - Native clipboard paste integration and one-click sample chips.
  - Media stream inspection with format quality selectors (1080p Full HD, 720p, MP3 Audio, High-Res Cover Images).
  - Direct browser download delivery with attachment headers.
  - Locked viewport zoom and standard 16px mobile input scaling to prevent unexpected auto-zooming.
- **35+ Dedicated Tools & Sub-Pages:**
  - [Instagram Reels Downloader](file:///app/instagram-reels/page.tsx) (`/instagram-reels`)
  - [Instagram Stories Downloader](file:///app/instagram-stories/page.tsx) (`/instagram-stories`)
  - [Instagram Photo Downloader](file:///app/instagram-photo/page.tsx) (`/instagram-photo`)
  - [TikTok No Watermark Downloader](file:///app/tiktok-no-watermark/page.tsx) (`/tiktok-no-watermark`)
  - [TikTok Sound & MP3 Downloader](file:///app/tiktok-audio/page.tsx) (`/tiktok-audio`)
  - [YouTube Shorts Downloader](file:///app/youtube-shorts/page.tsx) (`/youtube-shorts`)
  - [YouTube to MP3 Converter](file:///app/youtube-to-mp3/page.tsx) (`/youtube-to-mp3`)
  - [YouTube Thumbnail Downloader](file:///app/youtube-thumbnail/page.tsx) (`/youtube-thumbnail`)
  - [Facebook Reels Downloader](file:///app/facebook-reels/page.tsx) (`/facebook-reels`)
  - [Facebook Video Downloader](file:///app/facebook-video/page.tsx) (`/facebook-video`)
  - [Twitter Video Downloader](file:///app/twitter-video/page.tsx) (`/twitter-video`)
  - [Twitter GIF Downloader](file:///app/twitter-gif/page.tsx) (`/twitter-gif`)
  - [Pinterest Video Downloader](file:///app/pinterest-video/page.tsx) (`/pinterest-video`)
  - [Pinterest Photo Downloader](file:///app/pinterest-photo/page.tsx) (`/pinterest-photo`)
  - [Reddit Video Downloader](file:///app/reddit-video/page.tsx) (`/reddit-video`)
  - [LinkedIn Video Downloader](file:///app/linkedin-video/page.tsx) (`/linkedin-video`)
  - [Snapchat Spotlight Downloader](file:///app/snapchat-spotlight/page.tsx) (`/snapchat-spotlight`)
  - [Threads Video Downloader](file:///app/threads-video/page.tsx) (`/threads-video`)
  - [Threads Photo Downloader](file:///app/threads-photo/page.tsx) (`/threads-photo`)
  - [Universal Audio Extractor](file:///app/audio-extractor/page.tsx) (`/audio-extractor`)
  - [Universal Thumbnail Grabber](file:///app/thumbnail-grabber/page.tsx) (`/thumbnail-grabber`)
  - Platform hubs: `/instagram`, `/tiktok`, `/youtube`, `/facebook`, `/twitter`, `/pinterest`, `/reddit`, `/linkedin`, `/snapchat`, `/threads`
  - Portal & legal suite: `/how-it-works`, `/about`, `/help`, `/faq`, `/supported-sites`, `/status`, `/api-docs`, `/contact`, `/privacy`, `/terms`, `/dmca`, `/security`
- **Security & SSRF Guardrails:**
  - Strict hostname allowlist validation.
  - Blocks internal loopbacks, private subnets (`10.0.0.0/8`, `192.168.0.0/16`, `172.16.0.0/12`, `127.0.0.1`), and untrusted protocols.
  - Strips URL telemetry and ad tracking parameters.
  - Ephemeral processing with zero persistent logging of user media.

## Run Locally

Requirements: Node.js 18.17+ and npm 9+.

From PowerShell:

```powershell
.\scripts\start-project.ps1
```

Or run standard commands:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Vercel Frontend + Render API

The downloader requires Python, `yt-dlp`, and `ffmpeg`, so the API should run on a Docker-capable Render Web Service. The repository includes [`Dockerfile`](./Dockerfile) and [`.dockerignore`](./.dockerignore) for that service.

On Render, create a Docker Web Service from this repository and set:

```text
PYTHON_BIN=python3
YT_DLP_TIMEOUT_MS=60000
API_ALLOWED_ORIGINS=https://social-video-downloaders.vercel.app
```

Set the Render health check path to `/api/v1/health`. After deployment, configure this Vercel environment variable and redeploy the frontend:

```text
NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com
```

For a custom frontend domain, include both the Vercel URL and custom domain in `API_ALLOWED_ORIGINS`, separated by commas. Keep `NEXT_PUBLIC_API_URL` free of a trailing slash.

## API Surface

- `GET /api/v1/health` - Health check status, uptime, and active security components.
- `GET /api/v1/platforms` - Returns the centralized platform registry and metadata.
- `POST /api/v1/resolve` - Validates public URLs against the allowlist and extracts available stream formats.
- `GET /api/v1/download` - Streams and delivers downloadable media with proper attachment headers.