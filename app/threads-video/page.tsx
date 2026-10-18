import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Threads Video Downloader | Meta Threads Clips & Media | SocialVideoDownloader',
  description: 'Download public videos and clips from Meta Threads posts in 1080p Full HD MP4. Free and fast.',
}

const config: ToolPageConfig = {
  slug: 'threads-video',
  title: 'Threads Video Downloader',
  headline: 'Threads Video Downloader',
  subtitle: 'Save videos and animated clips attached to Meta Threads posts in high-fidelity 1080p MP4 format.',
  badge: 'META THREADS HD EXTRACTOR',
  accentColor: '#ffffff',
  targetPlatformId: 'threads',
  targetPlatformName: 'Threads',
  sampleUrl: 'https://www.threads.net/@zuck/post/CxYz1234567',
  inputPlaceholder: 'Paste Threads post URL (threads.net/@user/post/...)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Full 1080p Resolution', desc: 'Preserves the original video clarity and audio track.' },
    { title: 'threads.net Direct Resolution', desc: 'Accepts all standard web and mobile Threads post links.' },
    { title: 'No Meta Account Required', desc: 'Inspects and downloads public posts without logging in.' },
    { title: 'Instant Mobile Downloads', desc: 'Direct saving on iPhone, iPad, and Android devices.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Tap the share button on the Threads post and select "Copy Link".' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the URL into the input field above.' },
    { step: '03', title: 'Save Video File', desc: 'Download the video directly to your storage.' }
  ],
  faqs: [
    { q: 'Can I download videos from private Threads accounts?', a: 'No, only public posts from public accounts are accessible.' },
    { q: 'Are carousel video posts supported?', a: 'Yes, all video attachments in public Threads posts can be resolved.' }
  ],
  relatedTools: [
    { title: 'Threads Photo Downloader', href: '/threads-photo', badge: 'High-Res JPG' },
    { title: 'Twitter Video Downloader', href: '/twitter-video', badge: 'X Videos' },
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'IG Reels' }
  ]
}

export default function ThreadsVideoPage() {
  return <SpecializedToolPage config={config} />
}
