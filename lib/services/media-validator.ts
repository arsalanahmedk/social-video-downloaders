import { execFile } from 'child_process'
import fs from 'fs'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

export type MediaValidationResult = {
  valid: boolean
  container?: string
  videoCodec?: string
  audioCodec?: string
  width?: number
  height?: number
  duration?: number
  size?: number
  hasVideo?: boolean
  hasAudio?: boolean
  reason?: string
}

export type ValidationOptions = {
  expectType?: 'video' | 'audio' | 'image'
  expectExt?: string
  requireAudio?: boolean
}

/** Checks for HTML or JSON error payload inside a file. */
function checkMagicBytes(buffer: Buffer): { isErrorText: boolean; errorSnippet?: string } {
  const head = buffer.slice(0, 512).toString('utf8').trim()
  if (
    head.startsWith('<!DOCTYPE html') ||
    head.startsWith('<html') ||
    head.startsWith('<?xml') ||
    head.includes('<body') ||
    head.startsWith('{"error"') ||
    head.startsWith('{"message"') ||
    head.startsWith('{"status":"error"')
  ) {
    return { isErrorText: true, errorSnippet: head.slice(0, 150) }
  }
  return { isErrorText: false }
}

/**
 * Validates a downloaded media file using magic bytes, size checks, and ffprobe.
 * Never trusts file extensions alone.
 */
export async function validateMediaFile(
  filePath: string,
  options: ValidationOptions = {}
): Promise<MediaValidationResult> {
  if (!fs.existsSync(filePath)) {
    return { valid: false, reason: 'Media file does not exist on disk.' }
  }

  const stat = fs.statSync(filePath)
  if (stat.size < 1024) {
    return { valid: false, reason: `Media file is too small (${stat.size} bytes) or empty.` }
  }

  // Read header bytes to check for HTML/JSON error payloads
  const headerBuf = Buffer.alloc(1024)
  const fd = fs.openSync(filePath, 'r')
  fs.readSync(fd, headerBuf, 0, 1024, 0)
  fs.closeSync(fd)

  const textCheck = checkMagicBytes(headerBuf)
  if (textCheck.isErrorText) {
    return {
      valid: false,
      reason: `Downloaded file contains HTML/JSON error data instead of media: ${textCheck.errorSnippet}`
    }
  }

  // If this is an image file (e.g. thumbnail), check image signatures or probe
  const ext = (options.expectExt || '').toLowerCase()
  if (options.expectType === 'image' || ['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
    // Check JPEG, PNG, WEBP magic numbers
    const isJpeg = headerBuf[0] === 0xff && headerBuf[1] === 0xd8 && headerBuf[2] === 0xff
    const isPng = headerBuf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    const isWebp = headerBuf.slice(0, 4).toString('ascii') === 'RIFF' && headerBuf.slice(8, 12).toString('ascii') === 'WEBP'

    if (!isJpeg && !isPng && !isWebp) {
      return { valid: false, reason: 'File does not have a valid JPEG, PNG, or WebP image signature.' }
    }

    return {
      valid: true,
      container: isJpeg ? 'jpeg' : isPng ? 'png' : 'webp',
      size: stat.size
    }
  }

  // Validate Audio and Video containers with ffprobe
  try {
    const { stdout } = await execFileAsync(
      'ffprobe',
      [
        '-v',
        'error',
        '-print_format',
        'json',
        '-show_format',
        '-show_streams',
        filePath
      ],
      { timeout: 15000, maxBuffer: 5 * 1024 * 1024 }
    )

    const probe = JSON.parse(stdout)
    const format = probe.format || {}
    const streams = Array.isArray(probe.streams) ? probe.streams : []

    const videoStream = streams.find((s: any) => s.codec_type === 'video')
    const audioStream = streams.find((s: any) => s.codec_type === 'audio')

    const hasVideo = !!videoStream
    const hasAudio = !!audioStream
    const container = String(format.format_name || '').split(',')[0]
    const duration = Number(format.duration) || 0
    const videoCodec = videoStream?.codec_name
    const audioCodec = audioStream?.codec_name
    const width = Number(videoStream?.width) || undefined
    const height = Number(videoStream?.height) || undefined

    if (options.expectType === 'video') {
      if (!hasVideo) {
        return {
          valid: false,
          reason: 'Expected a video stream but ffprobe found no video stream in the container.'
        }
      }

      // If user downloaded a video, ensure it has audio unless explicitly silent
      const requireAudio = options.requireAudio !== false
      if (requireAudio && !hasAudio) {
        return {
          valid: false,
          reason: 'Video stream was downloaded but audio stream is missing. Video is silent.'
        }
      }
    }

    if (options.expectType === 'audio') {
      if (!hasAudio) {
        return {
          valid: false,
          reason: 'Expected an audio stream but ffprobe found no audio stream in the file.'
        }
      }
    }

    if (streams.length === 0) {
      return { valid: false, reason: 'ffprobe could not detect any valid media streams in the file.' }
    }

    return {
      valid: true,
      container,
      videoCodec,
      audioCodec,
      width,
      height,
      duration,
      size: stat.size,
      hasVideo,
      hasAudio
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return {
      valid: false,
      reason: `ffprobe media validation failed: ${message.slice(-300)}`
    }
  }
}
