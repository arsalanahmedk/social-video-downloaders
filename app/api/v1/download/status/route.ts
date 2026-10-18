import { NextRequest, NextResponse } from 'next/server'
import { getJob } from '@/lib/services/download-jobs'

export const dynamic = 'force-dynamic'

/** Reports live progress for an in-flight download job. */
export async function GET(request: NextRequest) {
  const jobId = request.nextUrl.searchParams.get('jobId')
  if (!jobId) {
    return NextResponse.json({ error: 'Missing `jobId` parameter.' }, { status: 400 })
  }

  const job = getJob(jobId)
  if (!job) {
    return NextResponse.json({ error: 'Unknown or expired download job.' }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    jobId: job.id,
    status: job.status,
    progress: job.progress,
    stage: job.stage,
    downloadedBytes: job.downloadedBytes,
    totalBytes: job.totalBytes,
    speed: job.speed,
    eta: job.eta,
    filename: job.filename,
    container: job.container,
    videoCodec: job.videoCodec,
    audioCodec: job.audioCodec,
    width: job.width,
    height: job.height,
    duration: job.duration,
    validated: job.validated ?? false,
    error: job.error ?? null
  })
}
