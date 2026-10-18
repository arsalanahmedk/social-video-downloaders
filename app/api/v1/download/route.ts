import { NextRequest, NextResponse } from 'next/server'
import { validatePublicNetworkUrl, validatePublicUrl } from '@/lib/validation/public-url'
import { startDownloadJob } from '@/lib/services/media-downloader'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

/** Starts a max-quality extraction job. Returns immediately with a job id. */
export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  const record = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>
  const targetUrl = typeof record.url === 'string' ? record.url : ''
  const directUrl = typeof record.directUrl === 'string' ? record.directUrl : ''
  const requestedType = typeof record.type === 'string' ? record.type : 'video'
  const type = (['video', 'audio', 'image'].includes(requestedType) ? requestedType : 'video') as
    | 'video'
    | 'audio'
    | 'image'
  const requestedExt = (typeof record.ext === 'string' ? record.ext : (type === 'image' ? 'jpg' : 'mp4'))
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '')
  const title = typeof record.title === 'string' ? record.title : 'Media'
  const quality = typeof record.quality === 'string' ? record.quality : ''

  if (!targetUrl) {
    return NextResponse.json({ error: 'A target `url` is required.' }, { status: 400 })
  }

  // SSRF guard. The previous implementation shelled out to yt-dlp against any
  // caller-supplied URL with no validation at all.
  const validation = validatePublicUrl(targetUrl)
  if (!validation.valid) {
    return NextResponse.json({ error: `Blocked request: ${validation.message}` }, { status: 403 })
  }
  const networkValidation = await validatePublicNetworkUrl(validation.cleanedUrl)
  if (!networkValidation.valid) {
    return NextResponse.json({ error: `Blocked request: ${networkValidation.message}` }, { status: 403 })
  }

  if (directUrl) {
    const directValidation = await validatePublicNetworkUrl(directUrl, { httpsOnly: true })
    if (!directValidation.valid) {
      return NextResponse.json({ error: `Blocked direct media URL: ${directValidation.message}` }, { status: 403 })
    }
  }

  const job = await startDownloadJob({
    targetUrl: validation.cleanedUrl,
    directUrl: directUrl || undefined,
    requestedExt: requestedExt || (type === 'image' ? 'jpg' : 'mp4'),
    title,
    type,
    quality
  })

  return NextResponse.json(
    {
      success: true,
      jobId: job.id,
      status: job.status,
      statusUrl: `/api/v1/download/status?jobId=${job.id}`,
      fileUrl: `/api/v1/download?jobId=${job.id}`
    },
    { status: 202 }
  )
}

import { serveDownloadFile } from '@/lib/services/serve-download'

/** Streams a completed job's file to the client. */
export async function GET(request: NextRequest) {
  return serveDownloadFile(request)
}
