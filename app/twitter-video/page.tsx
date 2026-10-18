import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'X / Twitter Video Downloader | Download Tweets in HD MP4 | SocialVideoDownloader',
  description: 'Download video clips from X (Twitter) posts in 1080p, 720p, or extract MP3 audio. Fast, free, and secure.',
}

const config: ToolPageConfig = {
  slug: 'twitter-video',
  title: 'X / Twitter Video Downloader',
  headline: 'X / Twitter Video Downloader',
  subtitle: 'Save videos attached to public posts on X (formerly Twitter) in original high definition MP4.',
  badge: 'X / TWITTER HD EXTRACTOR',
  accentColor: '#1DA1F2',
  targetPlatformId: 'twitter',
  targetPlatformName: 'X / Twitter',
  sampleUrl: 'https://x.com/spacex/status/1789012345678901234',
  inputPlaceholder: 'Paste post link (x.com or twitter.com)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Both x.com & twitter.com', desc: 'Seamlessly works with both legacy and new domain formats.' },
    { title: 'Full HD Quality', desc: 'Extracts the highest bitrate MP4 variant published to the tweet.' },
    { title: 'Audio Extraction', desc: 'Convert video tweets directly into audio MP3 files.' },
    { title: 'Clean File Naming', desc: 'Files are neatly named with tweet author and post ID.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Click the share icon on the tweet and select "Copy link to post".' },
    { step: '02', title: 'Paste in Downloader', desc: 'Paste the link into SocialVideoDownloader to resolve the video stream.' },
    { step: '03', title: 'Download MP4', desc: 'Select Full HD or standard quality to begin downloading.' }
  ],
  faqs: [
    { q: 'Does this work on tweets from protected accounts?', a: 'No, only public tweets can be resolved and downloaded.' },
    { q: 'How are multi-video threads handled?', a: 'Paste the specific post URL containing the video you want to save.' }
  ],
  relatedTools: [
    { title: 'Twitter GIF Downloader', href: '/twitter-gif', badge: 'GIF to MP4' },
    { title: 'Reddit Video Downloader', href: '/reddit-video', badge: 'Reddit Clips' },
    { title: 'Threads Video Downloader', href: '/threads-video', badge: 'Meta Threads' }
  ]
}

export default function TwitterVideoPage() {
  return <SpecializedToolPage config={config} />
}
