'use client'

import * as React from 'react'
import { createSafeFilename } from '@/lib/utils/filename'

export type DownloadFormat = {
  id: string
  label: string
  quality: string
  ext: string
  type: 'video' | 'audio' | 'image'
  downloadUrl: string
  directUrl?: string
}

type JobState = 'idle' | 'starting' | 'running' | 'ready' | 'failed'

const POLL_INTERVAL_MS = 1000
const MAX_POLL_MS = 15 * 60 * 1000

function formatBytes(bytes: number): string {
  if (!bytes || bytes < 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`
}

/**
 * Drives the two-step max-quality download:
 *   1. POST /api/v1/download      -> starts the extraction job
 *   2. GET  /api/v1/download/status -> polled for real progress
 *   3. GET  fileUrl              -> streams the finished file to the browser
 *
 * Extracting max quality genuinely takes minutes because two streams are
 * downloaded and merged, so the job runs server-side and the UI reports true
 * progress instead of showing an indefinite spinner.
 */
export function useMediaDownload() {
  const [state, setState] = React.useState<JobState>('idle')
  const [progress, setProgress] = React.useState(0)
  const [stage, setStage] = React.useState('')
  const [downloadedBytes, setDownloadedBytes] = React.useState(0)
  const [totalBytes, setTotalBytes] = React.useState(0)
  const [speed, setSpeed] = React.useState(0)
  const [eta, setEta] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null)
  const [readyFilename, setReadyFilename] = React.useState<string | null>(null)
  const [validationInfo, setValidationInfo] = React.useState<{
    container?: string
    videoCodec?: string
    audioCodec?: string
    width?: number
    height?: number
    duration?: number
    validated?: boolean
  } | null>(null)

  const reset = React.useCallback(() => {
    setState('idle')
    setProgress(0)
    setStage('')
    setDownloadedBytes(0)
    setTotalBytes(0)
    setSpeed(0)
    setEta(0)
    setError(null)
    setSuccess(false)
    setDownloadUrl(null)
    setReadyFilename(null)
    setValidationInfo(null)
  }, [])

  const start = React.useCallback(async (format: DownloadFormat, sourceUrl: string, title: string) => {
    setState('starting')
    setProgress(0)
    setStage('Starting extraction')
    setError(null)
    setSuccess(false)
    setDownloadUrl(null)
    setReadyFilename(null)
    setValidationInfo(null)

    try {
      const startRes = await fetch('/api/v1/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: sourceUrl,
          directUrl: format.directUrl,
          ext: format.ext,
          quality: format.quality,
          type: format.type,
          title
        })
      })

      const startData = await startRes.json()
      if (!startRes.ok) {
        throw new Error(startData?.error || 'Could not start the download.')
      }

      const { jobId, statusUrl, fileUrl } = startData
      setState('running')
      setStage('Extracting')

      const deadline = Date.now() + MAX_POLL_MS

      let completedFilename = ''

      // Poll until the job completes, fails, or the deadline passes.
      for (; ;) {
        if (Date.now() > deadline) {
          throw new Error('The download took too long. Please try a lower quality.')
        }

        const statusRes = await fetch(statusUrl, { cache: 'no-store' })
        const statusData = await statusRes.json()

        if (!statusRes.ok) {
          throw new Error(statusData?.error || 'Lost track of the download job.')
        }

        setProgress(Number(statusData.progress) || 0)
        setStage(String(statusData.stage || ''))
        setDownloadedBytes(Number(statusData.downloadedBytes) || 0)
        setTotalBytes(Number(statusData.totalBytes) || 0)
        setSpeed(Number(statusData.speed) || 0)
        setEta(Number(statusData.eta) || 0)

        if (statusData.filename) {
          completedFilename = String(statusData.filename)
        }

        if (statusData.status === 'failed') {
          throw new Error(statusData.error || 'The download failed.')
        }

        if (statusData.status === 'completed') {
          if (statusData.validated) {
            setValidationInfo({
              container: statusData.container,
              videoCodec: statusData.videoCodec,
              audioCodec: statusData.audioCodec,
              width: statusData.width,
              height: statusData.height,
              duration: statusData.duration,
              validated: true
            })
          }
          break
        }

        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
      }

      // Ensure the downloaded file retains its proper title and format extension (.mp4, .mp3, .jpg)
      const ext = (format.ext || 'mp4').toLowerCase().replace(/^\./, '')
      const finalFilename = createSafeFilename(completedFilename || title || 'Media', ext)

      // Target direct filename route so the browser URL path itself ends with .mp4 / .mp3 / .jpg
      const finalDownloadUrl = `/api/v1/download/${encodeURIComponent(finalFilename)}?jobId=${encodeURIComponent(jobId)}`

      setDownloadUrl(finalDownloadUrl)
      setReadyFilename(finalFilename)
      setState('ready')
      setProgress(100)
      setStage('Ready')
      setSuccess(true)

      // Trigger the browser's native save flow after the server has confirmed
      // the file is complete. The visible Save button remains available when
      // a browser blocks programmatic downloads.
      try {
        const link = document.createElement('a')
        link.href = finalDownloadUrl
        link.download = finalFilename
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
          try {
            if (link.parentNode) {
              document.body.removeChild(link)
            }
          } catch (cleanupError) {
            console.warn('Could not clean up the temporary download link.', cleanupError)
          }
        }, 1000)
      } catch (triggerError) {
        console.warn('Automatic download was blocked; use the Save button.', triggerError)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'The download could not be completed.')
      setState('failed')
    }
  }, [])

  return {
    state,
    progress,
    stage,
    downloadedBytes,
    totalBytes,
    speed,
    eta,
    error,
    success,
    downloadUrl,
    readyFilename,
    validationInfo,
    isDownloading: state === 'starting' || state === 'running',
    isReady: state === 'ready',
    start,
    reset,
    formatBytes
  }
}
