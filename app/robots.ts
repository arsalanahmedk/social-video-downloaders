import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /_next/static/ is explicitly allowed so crawlers can fetch the
      // JS/CSS/fonts needed to render pages fully; /api/, the rest of
      // /_next/ and /download/ stay closed.
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/_next/', '/download/']
      },
      // AI search crawlers are explicitly allowed — the "allow ChatGPT
      // Search to crawl your site" step. They are not blocked by the '*'
      // rule, but an explicit allow makes it certain no default-deny
      // affects them, while /api/, /_next/ and /download/ stay closed.
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'anthropic-ai',
          'PerplexityBot',
          'Google-Extended',
          'CCBot'
        ],
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/_next/', '/download/']
      }
    ],
    sitemap: 'https://www.socialvideodownloader.online/sitemap.xml',
    host: 'https://www.socialvideodownloader.online'
  }
}
