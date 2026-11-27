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
  'guides/how-to-download-tiktok-photos',
  'guides/how-to-download-instagram-stories',
  'guides/how-to-download-twitter-gifs',
  'guides/how-to-download-facebook-reels',
  'guides/video-quality-formats-explained',
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
  // Homepage: explainer section added 23 Nov 2026.
  '': '2026-11-23',
  // Guides hub: now lists all 15 guides since 23 Nov 2026.
  'guides': '2026-11-23',
  // All 15 guides: first batch published 13 Nov, second batch 18 Nov, third
  // batch 23 Nov — every guide's prose was expanded 23 Nov 2026, so the
  // honest last-modified date for all of them is 23 Nov.
  'guides/how-to-download-instagram-reels': '2026-11-23',
  'guides/how-to-download-tiktok-videos-without-watermark': '2026-11-23',
  'guides/how-to-download-youtube-shorts': '2026-11-23',
  'guides/how-to-download-facebook-videos': '2026-11-23',
  'guides/how-to-save-videos-for-offline-viewing-legally': '2026-11-23',
  'guides/how-to-download-x-twitter-videos': '2026-11-23',
  'guides/how-to-download-pinterest-videos': '2026-11-23',
  'guides/how-to-extract-audio-from-videos': '2026-11-23',
  'guides/how-to-download-videos-on-android': '2026-11-23',
  'guides/how-to-download-videos-safely': '2026-11-23',
  'guides/how-to-download-tiktok-photos': '2026-11-23',
  'guides/how-to-download-instagram-stories': '2026-11-23',
  'guides/how-to-download-twitter-gifs': '2026-11-23',
  'guides/how-to-download-facebook-reels': '2026-11-23',
  'guides/video-quality-formats-explained': '2026-11-23',
  // Info pages expanded 23 Nov 2026.
  'about': '2026-11-23',
  'contact': '2026-11-23',
  'dmca': '2026-11-23',
  'faq': '2026-11-23',
  'help': '2026-11-23',
  'privacy': '2026-11-23',
  'security': '2026-11-23',
  'supported-sites': '2026-11-23',
  'terms': '2026-11-23',
  // All 21 tool pages rewritten with unique prose 23 Nov 2026.
  'audio-extractor': '2026-11-23',
  'facebook-reels': '2026-11-23',
  'facebook-video': '2026-11-23',
  'instagram-photo': '2026-11-23',
  'instagram-reels': '2026-11-23',
  'instagram-stories': '2026-11-23',
  'linkedin-video': '2026-11-23',
  'pinterest-photo': '2026-11-23',
  'pinterest-video': '2026-11-23',
  'reddit-video': '2026-11-23',
  'snapchat-spotlight': '2026-11-23',
  'threads-photo': '2026-11-23',
  'threads-video': '2026-11-23',
  'thumbnail-grabber': '2026-11-23',
  'tiktok-audio': '2026-11-23',
  'tiktok-no-watermark': '2026-11-23',
  'twitter-gif': '2026-11-23',
  'twitter-video': '2026-11-23',
  'youtube-shorts': '2026-11-23',
  'youtube-thumbnail': '2026-11-23',
  'youtube-to-mp3': '2026-11-23',
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
