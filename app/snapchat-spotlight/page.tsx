import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Snapchat Spotlight Downloader | Vertical HD Video | SocialVideoDownloader',
  description: 'Download public Snapchat Spotlight clips and public stories in full vertical HD 1080p MP4.',
}

const config: ToolPageConfig = {
  slug: 'snapchat-spotlight',
  title: 'Snapchat Spotlight Downloader',
  headline: 'Snapchat Spotlight Downloader',
  subtitle: 'Download public Snapchat Spotlight videos and curated story clips in vertical 1080p HD without app watermarks.',
  badge: 'PUBLIC SPOTLIGHT CLIPS',
  accentColor: '#FFFC00',
  targetPlatformId: 'snapchat',
  targetPlatformName: 'Snapchat',
  sampleUrl: 'https://story.snapchat.com/p/abc123xyz/123456789',
  inputPlaceholder: 'Paste Snapchat Spotlight or Public Story URL...',
  primaryMediaType: 'video',
  features: [
    { title: 'Public Spotlight Video', desc: 'Saves viral public Spotlight clips in full 9:16 vertical resolution.' },
    { title: 'Strict Privacy Compliant', desc: 'SocialVideoDownloader never accesses private snaps, chat media, or friends stories.' },
    { title: 'No Account Linked', desc: 'No Snapchat login or mobile verification needed.' },
    { title: 'High Audio Fidelity', desc: 'Clean stereo sound preservation.' }
  ],
  steps: [
    { step: '01', title: 'Copy Spotlight Link', desc: 'Tap Share on the public Spotlight clip and copy link.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the public link into the input field above.' },
    { step: '03', title: 'Download MP4', desc: 'Save the portrait video directly to your camera roll or PC.' }
  ],
  faqs: [
    { q: 'Can I download private snaps or direct messages?', a: 'Under no circumstances. SocialVideoDownloader only works with publicly indexed Spotlight videos and public stories.' },
    { q: 'Does Snapchat notify the creator?', a: 'No, public Spotlight streams are fetched via public web CDN endpoints.' }
  ],
  relatedTools: [
    { title: 'TikTok No Watermark Video', href: '/tiktok-no-watermark', badge: 'Vertical Video' },
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'Reels HD' },
    { title: 'YouTube Shorts Downloader', href: '/youtube-shorts', badge: 'Shorts 1080p' }
  ]
}

export default function SnapchatSpotlightPage() {
  return <SpecializedToolPage config={config} />
}
