import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Reddit Video Downloader | Merged Audio & HD MP4',
  description: 'Download Reddit videos with synchronized sound in 1080p Full HD MP4. Fixes silent Reddit video issues cleanly.',
}

const config: ToolPageConfig = {
  slug: 'reddit-video',
  title: 'Reddit Video Downloader',
  headline: 'Reddit Video Downloader (With Audio)',
  subtitle: 'Download Reddit videos as one complete MP4 file with the sound merged in. Reddit stores video and audio as separate streams, which is why so many Reddit downloads arrive silent — this tool joins the two streams together before saving. Honest note: downloads from Reddit are unreliable right now because Reddit blocks requests from cloud server addresses; see the FAQs for what to do when a download fails.',
  badge: 'AUDIO-SYNCED REDDIT MP4',
  accentColor: '#FF4500',
  targetPlatformId: 'reddit',
  targetPlatformName: 'Reddit',
  sampleUrl: 'https://www.reddit.com/r/technology/comments/xyz123/future_of_computing/',
  inputPlaceholder: 'Paste Reddit post or v.redd.it video link...',
  primaryMediaType: 'video',
  features: [
    { title: 'Merged Audio & Video', desc: 'Combines Reddit’s separate video and audio DASH streams into one complete MP4, so the file plays with sound in every player, instead of arriving as a silent video with a useless audio track alongside it.' },
    { title: 'Direct v.redd.it Support', desc: 'Accepts both full discussion URLs and short v.redd.it video CDN links, resolving each to the same video and audio streams before merging.' },
    { title: 'Subreddit Metadata', desc: 'Includes the subreddit name and post title in file naming and preview, so a saved clip stays identifiable in your folder weeks later.' },
    { title: '1080p & 720p Options', desc: 'Download in maximum uploaded clarity or data-saving mobile standard. Most Reddit videos are 720p or 1080p; the tool offers what the post actually carries.' },
    { title: 'GIF and Crosspost Handling', desc: 'GIFs hosted on Reddit and videos crossposted from other subreddits resolve to their original post, so you can download the source rather than a copy of a copy.' },
    { title: 'Audio-Only Option', desc: 'When only the sound matters — a speech, an interview, a piece of advice — the audio-only option saves a small MP3 instead of the whole video file.' }
  ],
  steps: [
    { step: '01', title: 'Copy Reddit Post Link', desc: 'Click the Share button beneath the Reddit post and select Copy Link, or copy the link from the address bar while the post is open on its own page. A v.redd.it link from the video player works too.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Insert the URL to inspect the video and audio streams. The tool checks whether both streams are reachable from the server before offering the download.' },
    { step: '03', title: 'Pick With-Sound MP4', desc: 'Choose the merged MP4 with audio, or the audio-only option. The merged file carries the picture and sound in sync, exactly as the post plays in the Reddit app.' },
    { step: '04', title: 'Download MP4 With Sound', desc: 'Save the complete video with fully synchronized audio. If the download arrives silent or fails outright, read the FAQ below — the cause is usually Reddit blocking the server’s address.' },
    { step: '05', title: 'Verify the Sound', desc: 'Play the first few seconds of the saved file with sound on, before you close the tab. If it is silent, the audio stream was blocked or missing; retry once, then try the audio-only option.' }
  ],
  faqs: [
    { q: 'Why do Reddit videos often have no sound when downloaded elsewhere?', a: 'Reddit stores video and audio tracks separately. SocialVideoDownloader multiplexes the audio and video together so sound works everywhere. If the audio stream itself was blocked or the post has no audio, the merged file still has no sound.' },
    { q: 'Can I download videos from private or quarantined subreddits?', a: 'No, only public posts accessible without user authentication can be retrieved. Private, quarantined, and NSFW-gated content requires a logged-in account.' },
    { q: 'Why does my Reddit download keep failing?', a: 'Honestly, Reddit now blocks most requests from cloud server addresses, and this service runs on a cloud server. Some posts resolve on the first try, some never do. Retry once, try the v.redd.it link directly if you have it, and if it still fails, screen-record the post from your own device — for personal use — rather than retrying endlessly.' },
    { q: 'Does this work for old.reddit.com links?', a: 'Yes. old.reddit.com links resolve to the same post, so paste whichever form of link you copied.' },
    { q: 'What about videos hosted on Imgur or Streamable?', a: 'Those are not Reddit-hosted videos. The tool attempts the original host where possible, but external hosts have their own restrictions. Try the source link on the host’s own page, or use the audio-extractor and thumbnail tools for what is reachable.' },
    { q: 'Can I download a GIF posted on Reddit?', a: 'Yes, when the GIF is hosted on Reddit itself. It downloads as an MP4 video loop, like GIFs on other platforms. GIFs hosted on external sites may not resolve.' },
    { q: 'Why is the video only 720p when I expected 1080p?', a: 'The tool offers the resolutions Reddit actually serves for that post. Many Reddit videos were uploaded at 720p or lower, and nothing can exceed the uploaded source.' },
    { q: 'Can I download the whole subreddit or a user’s history?', a: 'No. The tool downloads one post at a time, from a link you paste. Bulk downloads are not supported, and scraping a subreddit violates Reddit’s rules.' }
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
