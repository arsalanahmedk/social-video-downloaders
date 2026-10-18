import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Facebook Video Downloader | Watch Videos & Clips HD | SocialVideoDownloader',
  description: 'Download public Facebook Watch videos, live replays, and video posts in crisp HD 1080p MP4.',
}

const config: ToolPageConfig = {
  slug: 'facebook-video',
  title: 'Facebook Video Downloader',
  headline: 'Facebook Video Downloader',
  subtitle: 'Extract and archive public Facebook Watch broadcasts, community videos, and clips in original HD quality.',
  badge: 'FB WATCH & VIDEO STREAM',
  accentColor: '#0e5a8a',
  targetPlatformId: 'facebook',
  targetPlatformName: 'Facebook',
  sampleUrl: 'https://www.facebook.com/watch/?v=1234567890',
  inputPlaceholder: 'Paste Facebook video URL...',
  primaryMediaType: 'video',
  features: [
    { title: 'Watch & Stream Compatibility', desc: 'Handles long-form public broadcasts and short video posts.' },
    { title: 'Multiple Bitrates', desc: 'Choose between 1080p HD and 720p standard definition.' },
    { title: 'Audio Extraction Option', desc: 'Extract soundtrack directly as an MP3 audio file.' },
    { title: 'No Buffering Throttles', desc: 'Direct CDN file delivery for high-speed downloads.' }
  ],
  steps: [
    { step: '01', title: 'Copy Video Link', desc: 'Click the share button on the Facebook video and copy the link.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Enter the link to inspect available qualities.' },
    { step: '03', title: 'Download Video', desc: 'Choose HD MP4 and save directly to your storage.' }
  ],
  faqs: [
    { q: 'Can I download private Facebook videos?', a: 'No, private videos requiring personal authentication cannot be downloaded.' },
    { q: 'Does this save live videos?', a: 'Yes, after a public live broadcast has completed and is published as a post.' }
  ],
  relatedTools: [
    { title: 'Facebook Reels Downloader', href: '/facebook-reels', badge: 'Reels MP4' },
    { title: 'YouTube Video Downloader', href: '/youtube-shorts', badge: 'YouTube HD' },
    { title: 'Twitter Video Downloader', href: '/twitter-video', badge: 'X Videos' }
  ]
}

export default function FacebookVideoPage() {
  return <SpecializedToolPage config={config} />
}
