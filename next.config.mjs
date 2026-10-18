/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb'
    },
    // Next.js spawns parallel jest-workers to prerender static pages. On Windows
    // these race on vendor-chunks writes, producing intermittent build failures:
    //   "Cannot find module './chunks/vendor-chunks/next.js'"
    //   "PageNotFoundError: Cannot find module for page: /api/v1/health"
    // Serialising prerendering removes the race at a small build-time cost.
    workerThreads: false,
    cpus: 1
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.instagram.com'
      },
      {
        protocol: 'https',
        hostname: '*.tiktok.com'
      },
      {
        protocol: 'https',
        hostname: '*.youtube.com'
      },
      {
        protocol: 'https',
        hostname: '*.facebook.com'
      },
      {
        protocol: 'https',
        hostname: '*.x.com'
      },
      {
        protocol: 'https',
        hostname: '*.twitter.com'
      },
      {
        protocol: 'https',
        hostname: '*.pinterest.com'
      },
      {
        protocol: 'https',
        hostname: '*.reddit.com'
      },
      {
        protocol: 'https',
        hostname: '*.linkedin.com'
      },
      {
        protocol: 'https',
        hostname: '*.snapchat.com'
      },
      {
        protocol: 'https',
        hostname: '*.threads.net'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}

export default nextConfig