import { NextResponse } from 'next/server'
import { platforms } from '@/lib/platforms/registry'

const startTime = Date.now()

export function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000)

  return NextResponse.json({
    status: 'healthy',
    service: 'SocialVideoDownloader API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: `${uptimeSeconds}s`,
    platformsSupported: platforms.length,
    components: {
      urlValidator: 'operational',
      ssrfProtection: 'active',
      mediaResolver: 'operational',
      downloadStreamer: 'operational'
    },
    allowedDomainsCount: platforms.reduce((acc, p) => acc + p.domains.length, 0)
  })
}
