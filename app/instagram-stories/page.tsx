import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Instagram Stories Downloader | Public Story Highlights | SocialVideoDownloader',
  description: 'Save public Instagram stories and profile story highlights easily in high resolution MP4 or JPG.',
}

const config: ToolPageConfig = {
  slug: 'instagram-stories',
  title: 'Instagram Stories Downloader',
  headline: 'Instagram Stories Downloader',
  subtitle: 'Archive public Instagram stories and public highlights before they expire after 24 hours.',
  badge: 'PUBLIC STORIES ARCHIVE',
  accentColor: '#833ab4',
  targetPlatformId: 'instagram',
  targetPlatformName: 'Instagram',
  sampleUrl: 'https://www.instagram.com/stories/highlights/1234567890/',
  inputPlaceholder: 'Paste public Instagram Story or Highlight link...',
  primaryMediaType: 'video',
  features: [
    { title: 'Public Stories & Highlights', desc: 'Download public 24-hour stories and pinned story highlights.' },
    { title: 'Video & Photo Support', desc: 'Automatically handles both portrait video stories and photo snapshots.' },
    { title: 'Anonymous Inspection', desc: 'Fetches public media without logging into an Instagram account.' },
    { title: 'High-Res Vertical Format', desc: 'Retains clean 1080x1920 mobile viewport aspect ratio.' }
  ],
  steps: [
    { step: '01', title: 'Copy Story URL', desc: 'Tap the three dots on the public story or highlight and copy link.' },
    { step: '02', title: 'Insert Link', desc: 'Paste the link into SocialVideoDownloader to fetch available story media.' },
    { step: '03', title: 'Save File', desc: 'Download your story video (MP4) or high-res photo (JPG).' }
  ],
  faqs: [
    { q: 'Can I download stories from private profiles?', a: 'No. Only publicly posted stories and highlights from public profiles are accessible.' },
    { q: 'Does the account owner know I downloaded their story?', a: 'No, public streams are resolved through server requests without user account identification.' }
  ],
  relatedTools: [
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: '1080p Video' },
    { title: 'Instagram Photo Downloader', href: '/instagram-photo', badge: 'Original Photos' },
    { title: 'Snapchat Spotlight Downloader', href: '/snapchat-spotlight', badge: 'Spotlight Clips' }
  ]
}

export default function InstagramStoriesPage() {
  return <SpecializedToolPage config={config} />
}
