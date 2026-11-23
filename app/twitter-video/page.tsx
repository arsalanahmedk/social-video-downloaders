import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'X / Twitter Video Downloader | Download Tweets in HD MP4',
  description: 'Download video clips from X (Twitter) posts in 1080p, 720p, or extract MP3 audio. Fast, free, and secure.',
}

const config: ToolPageConfig = {
  slug: 'twitter-video',
  guideSlug: 'how-to-download-x-twitter-videos',
  guideTitle: 'How to Download X (Twitter) Videos',
  title: 'X / Twitter Video Downloader',
  headline: 'X / Twitter Video Downloader',
  subtitle: 'Save videos attached to public posts on X (formerly Twitter) as MP4 files in the highest resolution X serves, or extract the audio alone as MP3. Paste an x.com or twitter.com link — no account, no app, no payment — and keep the clip with its soundtrack intact.',
  badge: 'X / TWITTER HD EXTRACTOR',
  accentColor: '#1DA1F2',
  targetPlatformId: 'twitter',
  targetPlatformName: 'X / Twitter',
  sampleUrl: 'https://x.com/spacex/status/1789012345678901234',
  inputPlaceholder: 'Paste post link (x.com or twitter.com)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Both x.com & twitter.com', desc: 'Works seamlessly with the new x.com domain, legacy twitter.com links, and mobile share links, resolving each to the same post before fetching its media.' },
    { title: 'Full HD Quality', desc: 'Extracts the highest-bitrate MP4 variant published with the post, up to 1080p where the creator uploaded in full HD, with smaller variants listed alongside for slow connections.' },
    { title: 'Audio Extraction', desc: 'Convert a video post directly into an MP3 audio file — handy for speeches, interviews, and Spaces recordings where the words matter more than the picture.' },
    { title: 'Photos Included', desc: 'Posts carrying photos list them as downloadable JPG files too, so a post with a video and photos gives you every item, not just the first one.' },
    { title: 'Clean File Naming', desc: 'Files are named with the post author and post ID, so a download stays identifiable in your folder instead of arriving as an anonymous string of characters.' },
    { title: 'No Login Required', desc: 'Only public posts can be resolved, and public posts need no account. Protected accounts, deleted posts, and login-walled content are out of reach, by design.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Open the post, tap or click the share icon, and select Copy Link to Post. On desktop you can also copy the link from the address bar while the post is open on its own page.' },
    { step: '02', title: 'Paste in Downloader', desc: 'Paste the link into the field above and press Download Now. The tool resolves the post and lists the video variants, photos, and audio options it found.' },
    { step: '03', title: 'Pick a Quality', desc: 'Choose the highest variant for editing or big screens, a smaller one for phone viewing, or the MP3 option for audio only. GIFs in the post appear as looping MP4 files.' },
    { step: '04', title: 'Download MP4', desc: 'Select Full HD or standard quality to begin downloading. The file saves to your Downloads folder on desktop, or to Files/Downloads on a phone.' },
    { step: '05', title: 'Check the Right Post', desc: 'In threads and quote posts, confirm you copied the link of the post that actually contains the video. A link to the first post in a thread returns only that post’s media.' }
  ],
  faqs: [
    { q: 'Does this work on tweets from protected accounts?', a: 'No, only public tweets can be resolved and downloaded. Protected accounts’ posts are visible only to approved followers, and no legitimate tool can access them.' },
    { q: 'How are multi-video threads handled?', a: 'Paste the specific post URL containing the video you want to save. Each post downloads separately, so work through a thread one post at a time and name the files as you go.' },
    { q: 'Why did my GIF download as an MP4?', a: 'X stores every GIF as a short, looping, silent MP4 video. The file you downloaded is the original — it loops in messaging apps and browsers exactly like the GIF did. Convert it to a .gif in an editor only if a destination requires that format.' },
    { q: 'What quality options are offered?', a: 'The variants X serves for that video — commonly 1280x720, 640x360, and 480x270, sometimes 1920x1080. The download matches the platform’s version exactly; no tool can exceed what X serves.' },
    { q: 'Can I download a live broadcast or Space?', a: 'Not while it is live — no finished file exists yet. If the broadcast is published as a replay, or a Space recording is posted publicly, the replay downloads like any other video.' },
    { q: 'Why does a video download without sound?', a: 'Either the post’s video has no audio track, or the audio variant failed to resolve. GIFs are always silent. Try the MP3 option separately, and re-download on a stable connection before assuming the file is broken.' },
    { q: 'Can I repost a downloaded video?', a: 'Only with the creator’s permission. Reposting someone else’s video as your own violates X’s rules and copyright law. Retweet the original post instead — it credits the creator automatically.' },
    { q: 'Do x.com and twitter.com links both work?', a: 'Yes. Both domains, plus mobile share links, resolve to the same post. Paste whichever form of link you copied.' }
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
