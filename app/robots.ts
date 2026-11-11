import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/download/']
      }
    ],
    sitemap: 'https://www.socialvideodownloader.online/sitemap.xml',
    host: 'https://www.socialvideodownloader.online'
  }
}
