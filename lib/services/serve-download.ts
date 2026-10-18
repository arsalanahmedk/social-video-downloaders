import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import { Readable } from 'stream'
import { getJob, scheduleFileCleanup } from './download-jobs'
import { createSafeFilename } from '@/lib/utils/filename'

const MIME_BY_EXT: Record<string, string> = {
  mp4: 'video/mp4',
  m4v: 'video/mp4',
  webm: 'video/webm',
  mkv: 'video/x-matroska',
  mov: 'video/quicktime',
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  opus: 'audio/opus',
  ogg: 'audio/ogg',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif'
}

export async function serveDownloadFile(
  request: NextRequest,
  routeFilename?: string
): Promise<NextResponse> {
  const jobId = request.nextUrl.searchParams.get('jobId')
  if (!jobId) {
    return NextResponse.json({ error: 'Missing `jobId` parameter.' }, { status: 400 })
  }

  const job = getJob(jobId)
  if (!job) {
    return NextResponse.json({ error: 'Unknown or expired download job.' }, { status: 404 })
  }

  if (job.status === 'failed') {
    return NextResponse.json({ error: job.error || 'The download failed.' }, { status: 502 })
  }

  if (job.status !== 'completed' || !job.filePath) {
    return NextResponse.json(
      { error: 'The download is not ready yet.', status: job.status, progress: job.progress },
      { status: 409 }
    )
  }

  if (!fs.existsSync(job.filePath)) {
    return NextResponse.json({ error: 'The prepared file is no longer available.' }, { status: 410 })
  }

  const stat = fs.statSync(job.filePath)
  if (stat.size < 1024) {
    return NextResponse.json({ error: 'Media file is empty or corrupted.' }, { status: 502 })
  }

  // Verify that the file does NOT begin with HTML or JSON error text (Requirement 10)
  const headerBuf = Buffer.alloc(512)
  const fd = fs.openSync(job.filePath, 'r')
  fs.readSync(fd, headerBuf, 0, 512, 0)
  fs.closeSync(fd)

  const headStr = headerBuf.toString('utf8').trim()
  if (
    headStr.startsWith('<!DOCTYPE html') ||
    headStr.startsWith('<html') ||
    headStr.startsWith('<?xml') ||
    headStr.startsWith('{"error"') ||
    headStr.startsWith('{"message"')
  ) {
    return NextResponse.json(
      { error: 'Media file corrupted: source returned HTML/JSON error data instead of media.' },
      { status: 502 }
    )
  }

  const nodeStream = fs.createReadStream(job.filePath)

  // Free the temp file once the response finishes streaming.
  nodeStream.on('close', () => scheduleFileCleanup(job.filePath as string))

  const ext = (job.ext || 'mp4').toLowerCase().replace(/^\./, '')
  let candidateFilename =
    routeFilename ||
    request.nextUrl.searchParams.get('filename') ||
    job.filename ||
    `Media.${ext}`

  try {
    candidateFilename = decodeURIComponent(candidateFilename)
  } catch {
    // keep as is
  }

  // Generate safe ASCII filename with guaranteed extension
  const safeFilename = createSafeFilename(candidateFilename, ext)
  const contentDisposition = `attachment; filename="${safeFilename}"`

  const contentType =
    MIME_BY_EXT[ext] || job.contentType || 'video/mp4'

  return new NextResponse(Readable.toWeb(nodeStream) as any, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': contentDisposition,
      'Content-Length': stat.size.toString(),
      'Accept-Ranges': 'bytes',
      // DO NOT use no-store; Chrome and Edge fail to name streaming downloads under no-store
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  })
}
