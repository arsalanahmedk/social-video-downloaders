import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader | MaxRes 4K & HD JPG | SocialVideoDownloader',
  description: 'Download original full-resolution YouTube video and Shorts cover thumbnails in Maximum Resolution (1080p / 4K).',
}

const config: ToolPageConfig = {
  slug: 'youtube-thumbnail',
  title: 'YouTube Thumbnail Downloader',
  headline: 'YouTube Thumbnail Downloader',
  subtitle: 'Retrieve uncompressed MaxResDefault (1920x1080) and HD cover images from any public YouTube video or Short.',
  badge: 'MAXRES THUMBNAIL GRABBER',
  accentColor: '#FF0000',
  targetPlatformId: 'youtube',
  targetPlatformName: 'YouTube',
  sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  inputPlaceholder: 'Paste YouTube video link to extract thumbnail...',
  primaryMediaType: 'image',
  features: [
    { title: 'MaxRes 1080p JPG', desc: 'Fetches the raw 1920x1080 cover uploaded by the channel.' },
    { title: 'Multiple Resolution Options', desc: 'Choose between MaxRes, High Quality (HQ), Standard (SD), and Medium.' },
    { title: 'No Text Watermarks', desc: 'Direct CDN image link without third-party stamps or borders.' },
    { title: 'Instant Preview', desc: 'Inspect the image in full size before downloading.' }
  ],
  steps: [
    { step: '01', title: 'Copy Video Link', desc: 'Copy the YouTube link from your browser or mobile share menu.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Insert the URL to extract all available thumbnail sizes.' },
    { step: '03', title: 'Save MaxRes Cover', desc: 'Click Download Thumbnail to get the highest resolution available.' }
  ],
  faqs: [
    { q: 'What is the highest thumbnail resolution available?', a: 'MaxResDefault offers 1920x1080 resolution if the creator uploaded an HD cover.' },
    { q: 'Can I download thumbnails from YouTube Shorts?', a: 'Yes! YouTube Shorts thumbnails can also be extracted.' }
  ],
  relatedTools: [
    { title: 'YouTube Shorts Downloader', href: '/youtube-shorts', badge: '1080p MP4' },
    { title: 'Universal Thumbnail Grabber', href: '/thumbnail-grabber', badge: 'All Platforms' },
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'Pins JPG' }
  ]
}

export default function YouTubeThumbnailPage() {
  return <SpecializedToolPage config={config} />
}
