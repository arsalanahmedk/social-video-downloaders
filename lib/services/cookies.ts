import fs from 'fs'
import os from 'os'
import path from 'path'

/**
 * Returns yt-dlp `--cookies <file>` args when account cookies are configured.
 *
 * Some platforms (TikTok, LinkedIn, Snapchat, Reddit) block anonymous
 * requests from datacenter IPs or require a signed-in session. The fix is to
 * run yt-dlp with the user's own browser cookies for those domains.
 *
 * Two ways to configure (file wins over base64):
 * - YT_DLP_COOKIES_FILE: path to a Netscape-format cookies.txt file.
 *   On Render, upload the file as a Secret File and point this at it.
 * - YT_DLP_COOKIES_B64: base64 of the same cookies.txt content. The file is
 *   decoded once per process into the OS temp dir with 0600 permissions.
 *
 * SECURITY: never commit a cookies file to the repo — it is a live login
 * session. The file only ever lives on the server (secret file / env var),
 * and only ever contains cookies for the blocked domains, never YouTube.
 */
let decodedPath: string | null = null

export function cookiesArgs(): string[] {
  const file = process.env.YT_DLP_COOKIES_FILE
  if (file && fs.existsSync(file)) {
    return ['--cookies', file]
  }

  const b64 = process.env.YT_DLP_COOKIES_B64
  if (b64) {
    try {
      if (!decodedPath) {
        const p = path.join(os.tmpdir(), 'yt-dlp-cookies.txt')
        fs.writeFileSync(p, Buffer.from(b64, 'base64').toString('utf-8'), { mode: 0o600 })
        decodedPath = p
      }
      return ['--cookies', decodedPath]
    } catch {
      return []
    }
  }

  return []
}
