import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Facebook Video Downloader | Watch Videos & Clips HD',
  description: 'Download public Facebook Watch videos, live replays, and video posts in crisp HD 1080p MP4.',
}

const config: ToolPageConfig = {
  slug: 'facebook-video',
  guideSlug: 'how-to-download-facebook-videos',
  guideTitle: 'How to Download Facebook Videos',
  title: 'Facebook Video Downloader',
  headline: 'Facebook Video Downloader',
  subtitle: 'Save public Facebook Watch broadcasts, long community videos, and clips as MP4 files in the quality Facebook serves — up to Full HD 1080p — with the soundtrack included, or extract the audio alone as MP3. No account, no app, no payment.',
  badge: 'FB WATCH & VIDEO STREAM',
  accentColor: '#0e5a8a',
  targetPlatformId: 'facebook',
  targetPlatformName: 'Facebook',
  sampleUrl: 'https://www.facebook.com/watch/?v=1234567890',
  inputPlaceholder: 'Paste Facebook video URL...',
  primaryMediaType: 'video',
  features: [
    { title: 'Watch & Stream Compatibility', desc: 'Handles long-form public broadcasts, show episodes, and short video posts alike, in landscape and vertical formats, from public pages and public groups.' },
    { title: 'Multiple Bitrates', desc: 'Choose between 1080p HD, 720p standard, and smaller data-saver qualities, so a two-hour broadcast does not have to eat a gigabyte of storage when you only need to hear it.' },
    { title: 'Audio Extraction Option', desc: 'Extract the soundtrack directly as an MP3 audio file — ideal for talks, lectures, sermons, and interviews where the words matter more than the picture.' },
    { title: 'No Buffering Throttles', desc: 'Delivers the file as a direct stream from Facebook’s content servers, without third-party redirects, queues, or speed caps.' },
    { title: 'fb.watch Links Supported', desc: 'Accepts fb.watch short links, full watch-page links, and mobile m.facebook.com links, following each redirect to the real video page automatically.' },
    { title: 'Live Replays Included', desc: 'Downloads the published replay of a public live broadcast once it has finished and been posted. A broadcast still in progress has no finished file to download yet.' }
  ],
  steps: [
    { step: '01', title: 'Copy Video Link', desc: 'Open the video so it plays on its own page, click the share button, and copy the link. A link copied from the feed sometimes points to the feed itself rather than the video.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Enter the link in the field above and press Download Now. The tool inspects the public page and lists the available qualities and the audio option.' },
    { step: '03', title: 'Pick a Quality', desc: 'Choose 1080p HD for editing or big screens, 720p for phone viewing, or a smaller quality for long videos on a slow connection. Check the file size before a very long download.' },
    { step: '04', title: 'Download Video', desc: 'Choose HD MP4 and save directly to your storage. On a phone the file lands in Downloads; on desktop it lands in your browser download folder.' },
    { step: '05', title: 'Verify Long Downloads', desc: 'Play the first and last minute of a long video before you rely on it. Long downloads are the most likely to be cut short by a connection drop, and a truncated file looks complete until you reach the missing end.' }
  ],
  faqs: [
    { q: 'Can I download private Facebook videos?', a: 'No, private videos requiring personal authentication cannot be downloaded. Friends-only videos, private-group videos, and anything behind a login wall are not publicly accessible, and no legitimate tool can fetch them.' },
    { q: 'Does this save live videos?', a: 'Yes, after a public live broadcast has completed and is published as a post. While a broadcast is still live there is no finished file to download, so wait for the replay to appear.' },
    { q: 'What about videos in private groups?', a: 'They cannot be downloaded. Even if you are a member, the downloader has no account and no membership, so it sees a login wall. Ask a group admin or the poster to share the file with you directly.' },
    { q: 'Do fb.watch short links work?', a: 'Yes. fb.watch links redirect to the real video page, and the tool follows the redirect automatically. Paste the short link exactly as copied from the Facebook app or a message.' },
    { q: 'Why is my download so large?', a: 'Long videos at 1080p are large — a two-hour broadcast can pass one gigabyte. Pick 720p or 480p for phone viewing, or use the MP3 option when only the audio matters, and download on Wi-Fi.' },
    { q: 'Can I download Facebook stories?', a: 'Rarely. Stories expire after 24 hours and are usually visible only to friends, so most story links fail. Ask the poster for the original file instead.' },
    { q: 'Will the creator know I downloaded their video?', a: 'No. Facebook does not notify creators about downloads through web tools. Viewing the video in the app counts only as an anonymous view.' },
    { q: 'Can I repost a downloaded Facebook video?', a: 'Only with the creator’s permission. Downloading does not give you publishing rights, and Facebook’s systems detect re-uploaded content. Share the original post instead, which credits the creator automatically.' }
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
