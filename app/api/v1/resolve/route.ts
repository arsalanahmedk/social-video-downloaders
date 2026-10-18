import { NextResponse } from 'next/server'
import { validatePublicUrl } from '@/lib/validation/public-url'
import { resolvePublicMedia, MediaExtractionError } from '@/lib/services/resolver'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'INVALID_JSON', message: 'Request body must be valid JSON with a "url" string.' } },
      { status: 400 }
    )
  }

  const rawUrl = typeof body === 'object' && body !== null ? (body as { url?: unknown }).url : undefined
  const validation = validatePublicUrl(rawUrl)

  if (!validation.valid) {
    const statusCode = validation.code === 'INVALID_URL' ? 400 : validation.code === 'UNSUPPORTED_PLATFORM' ? 422 : 403
    return NextResponse.json({ error: validation }, { status: statusCode })
  }

  try {
    const media = await resolvePublicMedia(validation)
    return NextResponse.json({
      success: true,
      media
    })
  } catch (err: unknown) {
    if (err instanceof MediaExtractionError) {
      const status = err.code === 'TIMEOUT' ? 504 : 422
      return NextResponse.json(
        { error: { code: err.code, message: err.message } },
        { status }
      )
    }
    const message = err instanceof Error ? err.message : 'Failed to resolve media stream.'
    return NextResponse.json(
      { error: { code: 'RESOLVE_ERROR', message } },
      { status: 500 }
    )
  }
}