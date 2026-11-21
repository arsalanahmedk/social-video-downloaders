import type { MetadataRoute } from 'next'
import { platforms } from '@/lib/platforms/registry'

const SEO_ROUTES = [
  '',
  'about',
  'audio-extractor',
  'contact',
  'dmca',
  'faq',
  'guides',
  'guides/how-to-download-instagram-reels',
  'guides/how-to-download-tiktok-videos-without-watermark',
  'guides/how-to-download-youtube-shorts',
  'guides/how-to-download-facebook-videos',
  'guides/how-to-save-videos-for-offline-viewing-legally',
  'guides/how-to-download-x-twitter-videos',
  'guides/how-to-download-pinterest-videos',
  'guides/how-to-extract-audio-from-videos',
  'guides/how-to-download-videos-on-android',
  'guides/how-to-download-videos-safely',
  'help',
  'how-it-works',
  'privacy',
  'security',
  'supported-sites',
  'terms',
  'facebook-reels',
  'facebook-video',
  'instagram-photo',
  'instagram-reels',
  'instagram-stories',
  'linkedin-video',
  'pinterest-photo',
  'pinterest-video',
  'reddit-video',
  'snapchat-spotlight',
  'threads-photo',
  'threads-video',
  'thumbnail-grabber',
  'tiktok-audio',
  'tiktok-no-watermark',
  'twitter-gif',
  'twitter-video',
  'youtube-shorts',
  'youtube-thumbnail',
  'youtube-to-mp3'
]

// Honest last-modified dates: change a date only when that page's content
// actually changes. A lastmod that moves on every deploy teaches Google to
// discount the sitemap, so these are pinned to real publish/edit dates.
const LASTMOD: Record<string, string> = {
  // Homepage: FAQ section added 18 Nov 2026.
  '': '2026-11-18',
  // First batch of guides, published 13 Nov 2026.
  'guides/how-to-download-instagram-reels': '2026-11-13',
  'guides/how-to-download-tiktok-videos-without-watermark': '2026-11-13',
  'guides/how-to-download-youtube-shorts': '2026-11-13',
  'guides/how-to-download-facebook-videos': '2026-11-13',
  'guides/how-to-save-videos-for-offline-viewing-legally': '2026-11-13',
  // Second batch of guides, published 18 Nov 2026.
  'guides/how-to-download-x-twitter-videos': '2026-11-18',
  'guides/how-to-download-pinterest-videos': '2026-11-18',
  'guides/how-to-extract-audio-from-videos': '2026-11-18',
  'guides/how-to-download-videos-on-android': '2026-11-18',
  'guides/how-to-download-videos-safely': '2026-11-18',
}

// Everything else: content as of the 15 Nov 2026 SEO review.
const DEFAULT_LASTMOD = '2026-11-15'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.socialvideodownloader.online'

  return [
    ...SEO_ROUTES.map((route) => ({
      url: route ? `${baseUrl}/${route}` : baseUrl,
      lastModified: LASTMOD[route] ?? DEFAULT_LASTMOD,
    })),
    ...platforms.map((platform) => ({
      url: `${baseUrl}/${platform.id}`,
      lastModified: DEFAULT_LASTMOD,
    }))
  ]
}
