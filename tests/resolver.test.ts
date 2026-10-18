import { validatePublicUrl } from '@/lib/validation/public-url'

// Mock the child_process layer so the test exercises the real resolver logic
// without shelling out to python/yt-dlp.
//
// The real execFile defines a `util.promisify.custom` symbol that resolves to
// `{ stdout, stderr }`. The mock must reproduce it, otherwise promisify falls
// back to the standard single-value convention and `const { stdout } = ...`
// destructures undefined.
const mockExecFile = jest.fn()

jest.mock('child_process', () => {
  const { promisify } = require('util')
  const custom: symbol = promisify.custom

  const execFile: (...args: unknown[]) => unknown = (...args: unknown[]) => mockExecFile(...args)
  ;(execFile as unknown as Record<symbol, unknown>)[custom] = (
    bin: string,
    args: string[],
    options: unknown
  ) =>
    new Promise((resolve, reject) => {
      mockExecFile(bin, args, options, (err: Error | null, stdout: string, stderr: string) => {
        if (err) reject(err)
        else resolve({ stdout, stderr })
      })
    })

  return { execFile, spawn: jest.fn() }
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolvePublicMedia, MediaExtractionError } = require('@/lib/services/resolver')

type ExecCallback = (error: Error | null, stdout?: string, stderr?: string) => void

/** Makes the mocked execFile succeed with the given yt-dlp JSON payload. */
function mockDumpJson(payload: Record<string, unknown>) {
  mockExecFile.mockImplementation(
    (_bin: string, _args: string[], _options: unknown, callback: ExecCallback) => {
      callback(null, JSON.stringify(payload), '')
    }
  )
}

/** Makes the mocked execFile fail, as a timeout or missing binary would. */
function mockDumpFailure(message: string) {
  mockExecFile.mockImplementation(
    (_bin: string, _args: string[], _options: unknown, callback: ExecCallback) => {
      callback(new Error(message), '', 'stderr output')
    }
  )
}

function mustValidate(url: string) {
  const validation = validatePublicUrl(url)
  if (!validation.valid) throw new Error(`expected a valid url: ${url}`)
  return validation
}

describe('resolvePublicMedia - real metadata path', () => {
  beforeEach(() => {
    mockExecFile.mockReset()
  })

  it('returns real yt-dlp metadata when extraction succeeds', async () => {
    mockDumpJson({
      title: 'Rick Astley - Never Gonna Give You Up',
      uploader: 'Rick Astley',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxres.jpg',
      duration: 213,
      width: 3840,
      height: 2160,
      url: 'https://example.com/stream.mp4',
      ext: 'mp4',
      vcodec: 'avc1',
      acodec: 'mp4a'
    })

    const media = await resolvePublicMedia(mustValidate('https://www.youtube.com/watch?v=dQw4w9WgXcQ'))

    // The core regression: before the fix these were hardcoded placeholders.
    expect(media.title).toBe('Rick Astley - Never Gonna Give You Up')
    expect(media.author).toBe('Rick Astley')
    expect(media.mediaType).toBe('video')
    expect(media.duration).toBe('3:33')
    expect(media.formats.length).toBeGreaterThan(0)
    expect(media.formats[0].downloadUrl).toContain('/api/v1/download?')
  })

  it('derives a vertical aspect ratio from real dimensions', async () => {
    mockDumpJson({
      title: 'A vertical clip',
      uploader: 'Someone',
      width: 1080,
      height: 1920,
      ext: 'mp4',
      vcodec: 'avc1',
      acodec: 'none'
    })

    const media = await resolvePublicMedia(mustValidate('https://www.instagram.com/reel/C8XYZ1234abcdef/'))
    expect(media.aspectRatio).toBe('9:16')
  })

  it('derives a 4:5 portrait aspect ratio for Instagram posts', async () => {
    mockDumpJson({
      title: 'A portrait post',
      uploader: 'Someone',
      width: 1080,
      height: 1350,
      ext: 'jpg',
      vcodec: 'none',
      acodec: 'none'
    })

    const media = await resolvePublicMedia(mustValidate('https://www.instagram.com/p/ABC123XYZ/'))
    expect(media.aspectRatio).toBe('4:5')
    expect(media.mediaType).toBe('image')
  })

  it('uses the platform fallback aspect ratio when real dimensions are missing', async () => {
    // Real metadata, but no width/height -> must fall back to the platform ratio.
    mockDumpJson({
      title: 'No dimensions here',
      uploader: 'Someone',
      ext: 'mp4',
      vcodec: 'avc1',
      acodec: 'none'
    })

    const media = await resolvePublicMedia(mustValidate('https://www.instagram.com/reel/C8XYZ1234abcdef/'))
    // Pre-fix this was always the seeded '16:9' because the fallback was dead code.
    expect(media.aspectRatio).toBe('9:16')
    expect(media.title).toBe('No dimensions here')
  })

  it('throws instead of inventing metadata when extraction fails', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockDumpFailure('ERROR: [instagram] xyz: Post unavailable')

    const validation = mustValidate('https://www.instagram.com/reel/C8XYZ1234abcdef/')

    // Previously this silently returned fabricated data such as
    // title "Instagram Reel #..." with author "@creator_spotlight".
    await expect(resolvePublicMedia(validation)).rejects.toBeInstanceOf(MediaExtractionError)

    errorSpy.mockRestore()
  })

  it('reports a timeout distinctly so the API can return 504', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const timeoutError: NodeJS.ErrnoException = new Error('spawn timed out')
    timeoutError.code = 'ETIMEDOUT'
    mockExecFile.mockImplementation(
      (_bin: string, _args: string[], _options: unknown, callback: ExecCallback) => {
        callback(timeoutError, '', '')
      }
    )

    const validation = mustValidate('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    await expect(resolvePublicMedia(validation)).rejects.toMatchObject({ code: 'TIMEOUT' })

    errorSpy.mockRestore()
  })

  it('classifies an audio-only extraction as audio, not video', async () => {
    mockDumpJson({
      title: 'Original sound',
      uploader: 'Someone',
      ext: 'm4a',
      vcodec: 'none',
      acodec: 'mp4a'
    })

    const media = await resolvePublicMedia(mustValidate('https://www.tiktok.com/@user/video/7234567890123456789'))
    expect(media.mediaType).toBe('audio')
  })

  it('passes a generous timeout to yt-dlp', async () => {
    mockDumpJson({ title: 'ok', uploader: 'u' })

    await resolvePublicMedia(mustValidate('https://www.youtube.com/watch?v=dQw4w9WgXcQ'))

    const options = mockExecFile.mock.calls[0][2] as { timeout?: number }
    // Real extraction measured ~14.7s; the old 12s cap silently killed it.
    expect(options.timeout).toBeGreaterThanOrEqual(30000)
  })
})
