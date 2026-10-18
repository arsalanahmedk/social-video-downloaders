import { validatePublicNetworkUrl, validatePublicUrl, universalPlatform } from '@/lib/validation/public-url'

describe('validatePublicUrl - SSRF protection', () => {
  it('rejects loopback and private hosts', () => {
    for (const host of [
      'http://localhost:8080/x',
      'http://127.0.0.1/x',
      'http://10.0.0.5/x',
      'http://172.16.5.5/x',
      'http://192.168.1.1/admin',
      'http://169.254.169.254/latest/meta-data',
      'http://[::1]/x',
      'http://[fc00::1]/x',
      'http://[fe80::1]/x'
    ]) {
      const result = validatePublicUrl(host)
      expect(result.valid).toBe(false)
      if (!result.valid) {
        expect(result.code).toBe('PRIVATE_OR_INTERNAL')
      }
    }
  })

  it('rejects non-http schemes', () => {
    for (const url of ['file:///etc/passwd', 'javascript:alert(1)', 'data:text/html,x']) {
      const result = validatePublicUrl(url)
      expect(result.valid).toBe(false)
      if (!result.valid) {
        expect(result.code).toBe('BLOCKED_SCHEME')
      }
    }
  })

  it('rejects empty and non-string input', () => {
    expect(validatePublicUrl('').valid).toBe(false)
    expect(validatePublicUrl(undefined).valid).toBe(false)
    expect(validatePublicUrl(123).valid).toBe(false)
  })
})

describe('validatePublicNetworkUrl - server-side fetch protection', () => {
  it('rejects private literal addresses and non-HTTPS direct media URLs', async () => {
    await expect(validatePublicNetworkUrl('https://127.0.0.1/file.mp4')).resolves.toMatchObject({ valid: false })
    await expect(validatePublicNetworkUrl('https://[::1]/file.mp4')).resolves.toMatchObject({ valid: false })
    await expect(
      validatePublicNetworkUrl('http://example.com/file.mp4', { httpsOnly: true })
    ).resolves.toMatchObject({ valid: false })
  })
})

describe('validatePublicUrl - platform detection and post id', () => {
  it('detects YouTube and extracts the video id', () => {
    const result = validatePublicUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    expect(result.valid).toBe(true)
    if (result.valid) {
      expect(result.platform.id).toBe('youtube')
      expect(result.postId).toBe('dQw4w9WgXcQ')
    }
  })

  it('detects an Instagram reel id', () => {
    const result = validatePublicUrl('https://www.instagram.com/reel/C8XYZ1234abcdef/')
    expect(result.valid).toBe(true)
    if (result.valid) {
      expect(result.platform.id).toBe('instagram')
      expect(result.postId).toBe('C8XYZ1234abcdef')
    }
  })

  it('detects a TikTok video id', () => {
    const result = validatePublicUrl('https://www.tiktok.com/@user/video/7234567890123456789')
    expect(result.valid).toBe(true)
    if (result.valid) {
      expect(result.platform.id).toBe('tiktok')
      expect(result.postId).toBe('7234567890123456789')
    }
  })

  it('strips tracking parameters from the cleaned url', () => {
    const result = validatePublicUrl('https://www.instagram.com/p/ABC123/?utm_source=x&igsh=abc')
    expect(result.valid).toBe(true)
    if (result.valid) {
      expect(result.cleanedUrl).not.toContain('utm_source')
      expect(result.cleanedUrl).not.toContain('igsh')
    }
  })

  it('falls back to the universal platform for unknown hosts', () => {
    const result = validatePublicUrl('https://example.com/some/video')
    expect(result.valid).toBe(true)
    if (result.valid) {
      expect(result.platform.id).toBe(universalPlatform.id)
    }
  })
})
