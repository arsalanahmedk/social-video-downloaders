import fs from 'fs'
import os from 'os'
import path from 'path'

export type JobStatus = 'queued' | 'running' | 'completed' | 'failed'

export type DownloadJob = {
  id: string
  status: JobStatus
  /** 0-100, best effort. Merges briefly report the merge stage as 99. */
  progress: number
  downloadedBytes: number
  totalBytes: number
  speed: number
  eta: number
  stage: string
  filename: string
  ext: string
  contentType: string
  filePath?: string
  error?: string
  // Validation metadata confirmed by ffprobe
  container?: string
  videoCodec?: string
  audioCodec?: string
  width?: number
  height?: number
  duration?: number
  hasVideo?: boolean
  hasAudio?: boolean
  validated?: boolean
  createdAt: number
  updatedAt: number
}

const TEMP_ROOT = path.join(os.tmpdir(), 'svd_jobs')
/** Completed files are deleted this long after being served. */
const FILE_TTL_MS = 10 * 60 * 1000
/** Abandoned/failed jobs are purged after this. */
const JOB_TTL_MS = 30 * 60 * 1000
const MAX_JOBS = 200

// Survives Next.js dev-server module reloads.
const globalStore = globalThis as unknown as {
  __svdJobs?: Map<string, DownloadJob>
}

const jobs: Map<string, DownloadJob> = (globalStore.__svdJobs ??= new Map())

export function ensureTempRoot(): string {
  if (!fs.existsSync(TEMP_ROOT)) {
    fs.mkdirSync(TEMP_ROOT, { recursive: true })
  }
  return TEMP_ROOT
}

export function createJob(
  init: Pick<DownloadJob, 'id' | 'filename' | 'ext' | 'contentType'>
): DownloadJob {
  const now = Date.now()
  const job: DownloadJob = {
    ...init,
    status: 'queued',
    progress: 0,
    downloadedBytes: 0,
    totalBytes: 0,
    speed: 0,
    eta: 0,
    stage: 'Queued',
    createdAt: now,
    updatedAt: now
  }
  jobs.set(job.id, job)
  purgeExpired()
  return job
}

export function getJob(id: string): DownloadJob | undefined {
  return jobs.get(id)
}

export function updateJob(id: string, patch: Partial<DownloadJob>): void {
  const job = jobs.get(id)
  if (!job) return
  Object.assign(job, patch, { updatedAt: Date.now() })
}

/** Records that the file has been handed to the client so it can be cleaned up. */
export function scheduleFileCleanup(filePath: string): void {
  setTimeout(() => {
    try {
      fs.rmSync(filePath, { force: true })
    } catch {
      // best effort
    }
  }, FILE_TTL_MS).unref?.()
}

function purgeExpired(): void {
  const now = Date.now()

  for (const [id, job] of jobs) {
    const expired = now - job.updatedAt > JOB_TTL_MS
    const servedAndStale = job.status === 'completed' && now - job.updatedAt > FILE_TTL_MS
    if (!expired && !servedAndStale) continue

    if (job.filePath) {
      try {
        fs.rmSync(job.filePath, { force: true })
      } catch {
        // best effort
      }
    }
    jobs.delete(id)
  }

  // Hard cap so a burst of jobs cannot grow the map without bound.
  if (jobs.size > MAX_JOBS) {
    const sorted = [...jobs.values()].sort((a, b) => a.createdAt - b.createdAt)
    for (const job of sorted.slice(0, jobs.size - MAX_JOBS)) {
      if (job.filePath) {
        try {
          fs.rmSync(job.filePath, { force: true })
        } catch {
          // best effort
        }
      }
      jobs.delete(job.id)
    }
  }
}
