import { NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { platforms } from '@/lib/platforms/registry'

export const dynamic = 'force-dynamic'

const execFileAsync = promisify(execFile)
const PYTHON_BIN = process.env.PYTHON_BIN || 'python'
const PROBE_TIMEOUT_MS = 20000

/** Substrings used to match a platform against yt-dlp's extractor list. */
const EXTRACTOR_HINTS: Record<string, string[]> = {
  instagram: ['instagram'],
  tiktok: ['tiktok'],
  youtube: ['youtube'],
  facebook: ['facebook'],
  twitter: ['twitter'],
  pinterest: ['pinterest'],
  reddit: ['reddit'],
  linkedin: ['linkedin'],
  snapchat: ['snapchat'],
  threads: ['threads']
}

type Probe = { ok: boolean; detail: string }

async function probeYtDlpVersion(): Promise<Probe> {
  try {
    const { stdout } = await execFileAsync(PYTHON_BIN, ['-m', 'yt_dlp', '--version'], {
      timeout: PROBE_TIMEOUT_MS
    })
    const version = stdout.trim()
    return { ok: Boolean(version), detail: version || 'installed' }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return { ok: false, detail: `not reachable (${message.slice(0, 80)})` }
  }
}

async function probeFfmpeg(): Promise<Probe> {
  try {
    const { stdout } = await execFileAsync('ffmpeg', ['-version'], { timeout: PROBE_TIMEOUT_MS })
    const first = stdout.split('\n')[0] ?? ''
    const version = first.match(/ffmpeg version (\S+)/)?.[1]
    return { ok: true, detail: version ? `v${version}` : 'installed' }
  } catch {
    return { ok: false, detail: 'not on PATH (required to merge audio + video)' }
  }
}

async function probeExtractors(): Promise<Set<string>> {
  try {
    const { stdout } = await execFileAsync(PYTHON_BIN, ['-m', 'yt_dlp', '--list-extractors'], {
      timeout: PROBE_TIMEOUT_MS,
      maxBuffer: 8 * 1024 * 1024
    })
    return new Set(
      stdout
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    )
  } catch {
    return new Set()
  }
}

/**
 * Reports genuine component health. The previous status page rendered a fixed
 * "Latency: 380ms" and "99.98% uptime" for every platform with no data source
 * behind it, so it always claimed to be fully operational.
 */
export async function GET() {
  const [ytdlp, ffmpeg, extractorNames] = await Promise.all([
    probeYtDlpVersion(),
    probeFfmpeg(),
    probeExtractors()
  ])

  const perPlatform = platforms.map((platform) => {
    const hints = EXTRACTOR_HINTS[platform.id] ?? [platform.id]
    const matched = hints.some((hint) =>
      [...extractorNames].some((name) => name.toLowerCase().includes(hint))
    )

    const operational = ytdlp.ok && matched
    return {
      id: platform.id,
      name: platform.name,
      domain: platform.domains[0] ?? platform.name,
      accentColor: platform.accentColor,
      // Only claim a working pipeline when an extractor actually exists for it.
      operational,
      detail: !ytdlp.ok
        ? 'extractor unavailable'
        : matched
          ? 'extractor available'
          : 'no extractor found'
    }
  })

  const degraded = perPlatform.some((p) => !p.operational)
  const healthy = ytdlp.ok && ffmpeg.ok && !degraded

  return NextResponse.json({
    status: healthy ? 'operational' : degraded || !ytdlp.ok ? 'degraded' : 'partial',
    checkedAt: new Date().toISOString(),
    components: {
      ytDlp: ytdlp,
      ffmpeg,
      extractorRegistryLoaded: extractorNames.size > 0,
      extractorCount: extractorNames.size
    },
    platforms: perPlatform
  })
}
