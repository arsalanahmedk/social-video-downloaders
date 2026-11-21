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

// Mock the https layer for the OG-scrape and tikwm fallbacks, which fetch
// pages over https.get. The mock answers by URL: tikwm API calls get a
// canned JSON payload, Facebook pages get canned OG HTML.
const mockHttpsGet = jest.fn()

jest.mock('https', () => {
  const actual = jest.requireActual('https')
  return { ...actual, get: mockHttpsGet }
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { EventEmitter } = require('events')

function mockHttpsResponse(body: string, statusCode = 200): void {
  ;(mockHttpsGet as jest.Mock).mockImplementation(
    (_url: string, _options: unknown, callback: (res: unknown) => void) => {
      const res = new EventEmitter()
      ;(res as any).statusCode = statusCode
      ;(res as any).headers = {}
      const req = new EventEmitter()
      ;(req as any).destroy = jest.fn()
      process.nextTick(() => {
        callback(res)
        res.emit('data', Buffer.from(body))
        res.emit('end')
      })
      return req
    }
  )
}

function mockTikwm(images: string[]): void {
  mockHttpsResponse(
    JSON.stringify({
      code: 0,
      msg: 'success',
      data: {
        title: 'Test photos',
        author: { nickname: 'Tester' },
        images
      }
    })
  )
}

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

describe('resolvePublicMedia - photo posts', () => {
  beforeEach(() => {
    mockExecFile.mockReset()
    mockHttpsGet.mockReset()
  })

  it('uses the real pbs.twimg.com photos for an X photo post, not the tweet card image', async () => {
    mockDumpJson({
      title: 'NASA (@NASA) on X',
      uploader: 'NASA',
      ext: 'jpg',
      vcodec: 'none',
      acodec: 'none',
      url: 'https://jf.x.com/images/post/2102761519985332442.png',
      thumbnail: 'https://jf.x.com/images/post/2102761519985332442.png',
      formats: [
        {
          format_id: '0',
          ext: 'jpg',
          width: 1080,
          height: 1080,
          url: 'https://pbs.twimg.com/media/HS6CdTYWkAAp0e1.jpg?name=orig'
        },
        {
          format_id: '1',
          ext: 'jpg',
          width: 1080,
          height: 720,
          url: 'https://pbs.twimg.com/media/HS6CdTYWkAAp0e2.jpg?name=orig'
        }
      ]
    })

    const media = await resolvePublicMedia(mustValidate('https://x.com/NASA/status/2102761519985332442'))
    expect(media.mediaType).toBe('image')
    expect(media.formats.length).toBe(2)
    for (const format of media.formats) {
      expect(format.type).toBe('image')
      expect(format.directUrl).toContain('pbs.twimg.com/media/')
      expect(format.directUrl).not.toContain('jf.x.com')
    }
  })

  it('falls back to the card image for an X photo post when formats carry no photo', async () => {
    mockDumpJson({
      title: 'NASA (@NASA) on X',
      uploader: 'NASA',
      ext: 'jpg',
      vcodec: 'none',
      acodec: 'none',
      url: 'https://jf.x.com/images/post/2102761519985332442.png',
      thumbnail: 'https://jf.x.com/images/post/2102761519985332442.png',
      formats: []
    })

    const media = await resolvePublicMedia(mustValidate('https://x.com/NASA/status/2102761519985332442'))
    expect(media.mediaType).toBe('image')
    expect(media.formats[0].directUrl).toBe('https://jf.x.com/images/post/2102761519985332442.png')
  })

  it('resolves a TikTok photo post through the tikwm fallback without yt-dlp', async () => {
    mockTikwm([
      'https://p16-common-sign.tiktokcdn-us.com/tos-useast5-i-photomode-tx/aaa~tplv-photomode-image.jpeg?dr=1',
      'https://p16-common-sign.tiktokcdn-us.com/tos-useast5-i-photomode-tx/bbb~tplv-photomode-image.jpeg?dr=1'
    ])

    const media = await resolvePublicMedia(
      mustValidate('https://www.tiktok.com/@nasa.sutherland/photo/7488448100236021038')
    )
    expect(mockExecFile).not.toHaveBeenCalled()
    expect(media.mediaType).toBe('carousel')
    expect(media.author).toBe('Tester')
    expect(media.formats.length).toBe(2)
    expect(media.formats[0].directUrl).toContain('tiktokcdn-us.com')
    expect(media.formats[0].label).toBe('Photo 1 of 2 (Original)')
  })

  it('falls through to yt-dlp when the TikTok photo API has no images', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockHttpsResponse(JSON.stringify({ code: -1, msg: 'fail', data: {} }))
    mockDumpFailure('ERROR: Unsupported URL: https://www.tiktok.com/@nasa.sutherland/photo/7488448100236021038')

    await expect(
      resolvePublicMedia(mustValidate('https://www.tiktok.com/@nasa.sutherland/photo/7488448100236021038'))
    ).rejects.toMatchObject({ code: 'UNAVAILABLE' })
    expect(mockExecFile).toHaveBeenCalled()

    errorSpy.mockRestore()
  })

  it('uses the OG photo for a login-walled Facebook photo post', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockDumpFailure('ERROR: [facebook] 123: This post requires login. Use --cookies.')
    mockHttpsResponse(
      '<html><head>' +
        '<meta property="og:type" content="video.other" />' +
        '<meta property="og:title" content="NASA&#039;s Kennedy Space Center" />' +
        '<meta property="og:image" content="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1434243868366087" />' +
        '</head></html>'
    )

    const media = await resolvePublicMedia(
      mustValidate('https://www.facebook.com/NASAKennedy/posts/pfbid02m1wqLU4pGQVNmwSLzdqchYvaDFN5tVfjDGxaxmT8ekkRR7M1wpnSZT7zYW5v6Rskl')
    )
    expect(media.mediaType).toBe('image')
    expect(media.formats[0].type).toBe('image')
    expect(media.formats[0].directUrl).toContain('lookaside.fbsbx.com')

    errorSpy.mockRestore()
  })

  it('keeps the login error when the OG page is a video post', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockDumpFailure('ERROR: [facebook] 123: This post requires login. Use --cookies.')
    mockHttpsResponse(
      '<html><head>' +
        '<meta property="og:type" content="video.other" />' +
        '<meta property="og:video" content="https://video.fbsbx.com/v/123.mp4" />' +
        '<meta property="og:image" content="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=999" />' +
        '</head></html>'
    )

    await expect(
      resolvePublicMedia(
        mustValidate('https://www.facebook.com/NASAKennedy/posts/pfbid02m1wqLU4pGQVNmwSLzdqchYvaDFN5tVfjDGxaxmT8ekkRR7M1wpnSZT7zYW5v6Rskl')
      )
    ).rejects.toMatchObject({ code: 'UNAVAILABLE', message: expect.stringContaining('login') })

    errorSpy.mockRestore()
  })
})
