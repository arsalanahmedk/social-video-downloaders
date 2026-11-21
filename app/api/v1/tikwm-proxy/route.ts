import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * tikwm proxy — fetches the tikwm API for a TikTok URL from THIS deployment's
 * network instead of the caller's.
 *
 * Why it exists: the API backend runs on Render, whose datacenter egress IP
 * tikwm answers with HTTP 403 (empty body) — plain requests and even
 * Chrome-impersonated ones. This same Next.js app also runs on Vercel (the
 * public site, socialvideodownloader.online), whose egress IPs tikwm may
 * not block. The backend calls this route (on the public domain) as a
 * fallback for TikTok photo posts when its own tikwm requests fail.
 *
 * Only TikTok URLs are accepted. The upstream status and body are passed
 * through unchanged so the caller can read tikwm's own code/data shape.
 */
export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get('url')
  if (!target) {
    return NextResponse.json(
      { error: { code: 'MISSING_URL', message: 'Query parameter "url" is required.' } },
      { status: 400 }
    )
  }

  let parsed: URL
  try {
    parsed = new URL(target)
  } catch {
    return NextResponse.json(
      { error: { code: 'INVALID_URL', message: 'The "url" parameter must be a valid URL.' } },
      { status: 400 }
    )
  }

  if (!/(^|\.)tiktok\.com$/.test(parsed.hostname)) {
    return NextResponse.json(
      { error: { code: 'NOT_TIKTOK', message: 'Only tiktok.com URLs are accepted.' } },
      { status: 400 }
    )
  }

  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(target)}`
  try {
    const upstream = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SocialVideoDownloader/1.0)',
        Accept: 'application/json'
      },
      signal: AbortSignal.timeout(15000)
    })
    const body = await upstream.text()
    return new NextResponse(body, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          code: 'TIKWM_UPSTREAM_ERROR',
          message: err instanceof Error ? err.message : 'Could not reach tikwm.'
        }
      },
      { status: 502 }
    )
  }
}
