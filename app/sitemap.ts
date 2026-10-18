import type { MetadataRoute } from 'next'
import { platforms } from '@/lib/platforms/registry'

const SEO_ROUTES = [
  '',
  'about',
  'audio-extractor',
  'contact',
  'dmca',
  'faq',
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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://socialvideodownloader.com'
  const now = new Date()

  return [
    ...SEO_ROUTES.map((route) => ({
      url: route ? `${baseUrl}/${route}` : baseUrl,
      lastModified: now,
      changeFrequency: route === '' ? 'daily' as const : 'monthly' as const,
      priority: route === '' ? 1 : 0.7
    })),
    ...platforms.map((platform) => ({
      url: `${baseUrl}/${platform.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  ]
}
