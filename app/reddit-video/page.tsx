import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Reddit Video Downloader | Merged Audio & HD MP4 | SocialVideoDownloader',
  description: 'Download Reddit videos with synchronized sound in 1080p Full HD MP4. Fixes silent Reddit video issues cleanly.',
}

const config: ToolPageConfig = {
  slug: 'reddit-video',
  title: 'Reddit Video Downloader',
  headline: 'Reddit Video Downloader (With Audio)',
  subtitle: 'Download Reddit videos with crystal clear synchronized sound in 1080p Full HD MP4 without missing audio tracks.',
  badge: 'AUDIO-SYNCED REDDIT MP4',
  accentColor: '#FF4500',
  targetPlatformId: 'reddit',
  targetPlatformName: 'Reddit',
  sampleUrl: 'https://www.reddit.com/r/technology/comments/xyz123/future_of_computing/',
  inputPlaceholder: 'Paste Reddit post or v.redd.it video link...',
  primaryMediaType: 'video',
  features: [
    { title: 'Merged Audio & Video', desc: 'Combines Reddit separate video and audio DASH streams into one complete MP4.' },
    { title: 'Direct v.redd.it Support', desc: 'Accepts both full discussion URLs and short v.redd.it video CDN links.' },
    { title: 'Subreddit Metadata', desc: 'Includes subreddit name and post title in file naming and preview.' },
    { title: '1080p & 720p Options', desc: 'Download in maximum uploaded clarity or data-saving mobile standard.' }
  ],
  steps: [
    { step: '01', title: 'Copy Reddit Post Link', desc: 'Click the Share button beneath the Reddit post and click "Copy Link".' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Insert the URL to inspect video and audio streams.' },
    { step: '03', title: 'Download MP4 With Sound', desc: 'Save the complete video with fully synchronized audio.' }
  ],
  faqs: [
    { q: 'Why do Reddit videos often have no sound when downloaded elsewhere?', a: 'Reddit stores video and audio tracks separately. SocialVideoDownloader multiplexes the audio and video together so sound works everywhere.' },
    { q: 'Can I download videos from private or quarantined subreddits?', a: 'No, only public posts accessible without user authentication can be retrieved.' }
  ],
  relatedTools: [
    { title: 'Twitter Video Downloader', href: '/twitter-video', badge: 'X Videos' },
    { title: 'Universal Audio Extractor', href: '/audio-extractor', badge: 'MP3 Extractor' },
    { title: 'YouTube Shorts Downloader', href: '/youtube-shorts', badge: 'Shorts HD' }
  ]
}

export default function RedditVideoPage() {
  return <SpecializedToolPage config={config} />
}
