import { platforms, type PlatformConfig } from '@/lib/platforms/registry'
import dns from 'dns/promises'
import net from 'net'

export type PublicUrlResult =
  | {
      valid: true
      url: URL
      cleanedUrl: string
      platform: PlatformConfig
      postId?: string
    }
  | {
      valid: false
      code: 'INVALID_URL' | 'UNSUPPORTED_PLATFORM' | 'PRIVATE_OR_INTERNAL' | 'BLOCKED_SCHEME'
      message: string
    }

// SSRF Protection: Disallow local, loopback, link-local, and private IP blocks
const BLOCKED_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
  /\.local$/i,
  /\.internal$/i,
]

function isBlockedHostname(hostname: string): boolean {
  if (net.isIP(hostname) && !isPublicIp(hostname)) return true
  return BLOCKED_HOST_PATTERNS.some((pattern) => pattern.test(hostname))
}

function isPublicIp(address: string): boolean {
  const normalized = address.toLowerCase()
  if (net.isIPv4(normalized)) {
    const octets = normalized.split('.').map(Number)
    const [a, b] = octets
    return !(
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    )
  }

  if (net.isIPv6(normalized)) {
    return !(
      normalized === '::' ||
      normalized === '::1' ||
      normalized.startsWith('fc') ||
      normalized.startsWith('fd') ||
      normalized.startsWith('fe8') ||
      normalized.startsWith('fe9') ||
      normalized.startsWith('fea') ||
      normalized.startsWith('feb') ||
      normalized.startsWith('ff')
    )
  }

  return false
}

/** Validates URL hosts before server-side network access. */
export async function validatePublicNetworkUrl(value: string, options: { httpsOnly?: boolean } = {}): Promise<{
  valid: true
  url: URL
} | {
  valid: false
  message: string
}> {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return { valid: false, message: 'The network URL is invalid.' }
  }

  if (options.httpsOnly && url.protocol !== 'https:') {
    return { valid: false, message: 'Only HTTPS media URLs are accepted.' }
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { valid: false, message: 'Only HTTP and HTTPS media URLs are accepted.' }
  }

  const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '')
  if (isBlockedHostname(hostname)) {
    return { valid: false, message: 'Internal and private network addresses are forbidden.' }
  }

  if (!net.isIP(hostname)) {
    let addresses: Array<{ address: string }>
    try {
      addresses = await dns.lookup(hostname, { all: true, verbatim: true })
    } catch {
      return { valid: false, message: 'The media host could not be resolved.' }
    }
    if (addresses.length === 0 || addresses.some(({ address }) => !isPublicIp(address))) {
      return { valid: false, message: 'The media host resolves to a private or reserved network address.' }
    }
  }

  return { valid: true, url }
}

export function validatePublicUrl(value: unknown): PublicUrlResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { valid: false, code: 'INVALID_URL', message: 'A public post URL is required.' }
  }

  const raw = value.trim()
  let parsed: URL

  try {
    parsed = new URL(raw)
  } catch {
    // Try auto-prepending https:// if user pasted just domain/path
    try {
      parsed = new URL(`https://${raw}`)
    } catch {
      return { valid: false, code: 'INVALID_URL', message: 'Please enter a valid, complete post URL.' }
    }
  }

  // Scheme verification
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return {
      valid: false,
      code: 'BLOCKED_SCHEME',
      message: 'Only HTTP and HTTPS URLs are accepted.'
    }
  }

  const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/^www\./, '')

  // SSRF checks
  if (isBlockedHostname(hostname)) {
    return {
      valid: false,
      code: 'PRIVATE_OR_INTERNAL',
      message: 'Internal and private IP addresses or network hostnames are forbidden.'
    }
  }

  // Allowlist verification against platform domains or universal public media
  const matchedPlatform = platformsForHostname(hostname) || universalPlatform

  // Clean tracking and telemetry parameters (e.g. utm_*, igsh, si, fbclid, etc.)
  const cleanedUrl = cleanTrackingParams(parsed)
  const postId = extractPostId(cleanedUrl, matchedPlatform.id)

  return {
    valid: true,
    url: cleanedUrl,
    cleanedUrl: cleanedUrl.toString(),
    platform: matchedPlatform,
    postId
  }
}

export const universalPlatform: PlatformConfig = {
  id: 'universal' as any,
  name: 'Universal Media',
  tagline: 'Public Video, Audio & Stream Extractor',
  description: 'Download public videos, reels, clips, and direct media streams with zero watermarks.',
  domains: [],
  media: ['HD Video', 'Audio MP3', 'Direct Stream'],
  accentColor: '#3b82f6',
  accentGradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  badgeText: 'HD Stream',
  status: 'active',
  features: ['Direct CDN extraction', 'Lossless bitrates', 'Zero server storage'],
  sampleUrls: [],
  defaultFormat: 'best-video',
  availableFormats: [
    { id: 'best-video', label: 'Full HD Video (MP4)', quality: '1080p / Best', ext: 'mp4', size: 'Full Stream', type: 'video' },
    { id: 'audio-mp3', label: 'Audio Only (MP3)', quality: '320kbps', ext: 'mp3', size: 'Audio Track', type: 'audio' }
  ],
  faq: [],
  steps: []
}

function platformsForHostname(hostname: string): PlatformConfig | undefined {
  for (const platform of platforms) {
    for (const domain of platform.domains) {
      if (hostname === domain || hostname.endsWith(`.${domain}`)) {
        return platform
      }
    }
  }
  return undefined
}

function cleanTrackingParams(url: URL): URL {
  const clean = new URL(url.toString())
  const trackingKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'igsh',
    'si',
    'fbclid',
    'gclid',
    '_ga',
    'ref',
    'ref_src',
    'feature'
  ]

  for (const key of trackingKeys) {
    clean.searchParams.delete(key)
  }

  return clean
}

function extractPostId(url: URL, platformId: string): string | undefined {
  const pathname = url.pathname
  const segments = pathname.split('/').filter(Boolean)

  switch (platformId) {
    case 'instagram':
      // /reel/C8XYZ1234/ or /p/C8XYZ1234/
      if (segments.length >= 2 && (segments[0] === 'reel' || segments[0] === 'p' || segments[0] === 'reels')) {
        return segments[1]
      }
      return segments[segments.length - 1]
    case 'tiktok':
      // /@user/video/723456789012345
      if (segments.includes('video')) {
        const idx = segments.indexOf('video')
        return segments[idx + 1]
      }
      return segments[segments.length - 1]
    case 'youtube':
      // ?v=dQw4w9WgXcQ or /shorts/xyz or youtu.be/xyz
      const v = url.searchParams.get('v')
      if (v) return v
      if (segments[0] === 'shorts' && segments[1]) return segments[1]
      if (url.hostname.includes('youtu.be') && segments[0]) return segments[0]
      return segments[segments.length - 1]
    case 'twitter':
      // /status/123456789
      if (segments.includes('status')) {
        const idx = segments.indexOf('status')
        return segments[idx + 1]
      }
      return segments[segments.length - 1]
    case 'reddit':
      // /r/subreddit/comments/id/title/
      if (segments.includes('comments')) {
        const idx = segments.indexOf('comments')
        return segments[idx + 1]
      }
      return segments[segments.length - 1]
    default:
      return segments[segments.length - 1] || 'media_post'
  }
}