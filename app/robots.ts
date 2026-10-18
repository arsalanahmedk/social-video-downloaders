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
    sitemap: 'https://socialvideodownloader.com/sitemap.xml',
    host: 'https://socialvideodownloader.com'
  }
}
