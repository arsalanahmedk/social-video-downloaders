import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'X / Twitter GIF Downloader | Convert Animated GIFs to MP4 | SocialVideoDownloader',
  description: 'Download animated GIFs from X (Twitter) posts as looping high-definition MP4 videos or GIF files.',
}

const config: ToolPageConfig = {
  slug: 'twitter-gif',
  title: 'X / Twitter GIF Downloader',
  headline: 'X / Twitter GIF Downloader',
  subtitle: 'Convert and save native animated GIFs from X (Twitter) posts into universal, lightweight MP4 videos.',
  badge: 'TWITTER ANIMATED GIF SAVER',
  accentColor: '#0d8bd9',
  targetPlatformId: 'twitter',
  targetPlatformName: 'X / Twitter',
  sampleUrl: 'https://twitter.com/nasa/status/1789012345678901234',
  inputPlaceholder: 'Paste link to tweet containing an animated GIF...',
  primaryMediaType: 'video',
  features: [
    { title: 'True MP4 Video Loop', desc: 'Twitter renders GIFs as MP4 video; we extract the raw high-fidelity loop.' },
    { title: 'Lightweight File Size', desc: 'Optimized compression for easy sharing in Discord, WhatsApp, and Slack.' },
    { title: 'Universal Playback', desc: 'Runs smoothly on any mobile OS, browser, or messaging platform.' },
    { title: 'One-Click Download', desc: 'Instant extraction without waiting for multi-pass video conversions.' }
  ],
  steps: [
    { step: '01', title: 'Copy Tweet Link', desc: 'Tap Share on the tweet containing the GIF and copy the link.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the tweet URL into the field above.' },
    { step: '03', title: 'Download MP4 GIF', desc: 'Save the looping MP4 file directly to your device.' }
  ],
  faqs: [
    { q: 'Why is the downloaded file an MP4 instead of a .gif?', a: 'Twitter encodes all GIFs into optimized H.264 MP4 videos for better performance. Our tool saves this original video stream.' },
    { q: 'Can I upload this to Discord or Slack?', a: 'Yes! The file plays as a looping video or animation seamlessly on modern messaging apps.' }
  ],
  relatedTools: [
    { title: 'Twitter Video Downloader', href: '/twitter-video', badge: '1080p Video' },
    { title: 'Reddit Video Downloader', href: '/reddit-video', badge: 'Reddit Clips' },
    { title: 'Pinterest Video Downloader', href: '/pinterest-video', badge: 'Idea Pins' }
  ]
}

export default function TwitterGifPage() {
  return <SpecializedToolPage config={config} />
}
