import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Threads Video Downloader | Meta Threads Clips & Media',
  description: 'Download public videos and clips from Meta Threads posts in 1080p Full HD MP4. Free and fast.',
}

const config: ToolPageConfig = {
  slug: 'threads-video',
  title: 'Threads Video Downloader',
  headline: 'Threads Video Downloader',
  subtitle: 'Save videos from public Threads posts as MP4 files with sound, at the resolution Threads serves. Honest note: Threads has no dedicated download extractor, and many Threads posts fail to resolve — read the FAQs before relying on this tool. When a post will not resolve, the Instagram version of the same post usually will.',
  badge: 'META THREADS HD EXTRACTOR',
  accentColor: '#ffffff',
  targetPlatformId: 'threads',
  targetPlatformName: 'Threads',
  sampleUrl: 'https://www.threads.net/@zuck/post/CxYz1234567',
  inputPlaceholder: 'Paste Threads post URL (threads.net/@user/post/...)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Full 1080p Resolution', desc: 'Preserves the original video clarity and audio track, offering the highest resolution Threads serves for that post — usually 1080p for videos recorded on a phone.' },
    { title: 'threads.net Direct Resolution', desc: 'Accepts standard web and mobile Threads post links in the threads.net/@username/post/ID form, resolving each to the post’s media attachments.' },
    { title: 'No Meta Account Required', desc: 'Inspects public posts without logging in, and never asks for your Meta account or password. Only public posts from public accounts can be attempted.' },
    { title: 'Instant Mobile Downloads', desc: 'Direct saving on iPhone, iPad, and Android devices through any modern browser, with the MP4 landing in Downloads or Files.' },
    { title: 'Carousel Attachments', desc: 'Posts with multiple photos and videos list each attachment separately, so you can download one video from a carousel without saving the rest.' },
    { title: 'Audio Included', desc: 'The video file carries the post’s soundtrack — voiceover, music, and ambient sound — in sync with the picture, exactly as Threads serves it.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Open the post on its own page, tap the share button, and select Copy Link. Confirm the link follows the threads.net/@username/post/ID pattern, and that the account is public.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the URL into the input field above and press Download Now. The tool attempts to resolve the post’s media — note that Threads posts often fail here, for the reason explained in the FAQs.' },
    { step: '03', title: 'Check the Results', desc: 'If the video appears, choose a quality and save it. If the page reports no media found, the post could not be resolved — try the Instagram version of the same post, which the same creator usually cross-posts.' },
    { step: '04', title: 'Save Video File', desc: 'Download the video directly to your storage. On iPhone move it from Files to Photos; on Android find it in Downloads; on desktop it lands in your browser download folder.' },
    { step: '05', title: 'Verify Picture and Sound', desc: 'Play the file once through with sound on, before closing the tab. If it is silent or frozen, the post resolved only partially — retry once, then use the Instagram cross-post.' }
  ],
  faqs: [
    { q: 'Can I download videos from private Threads accounts?', a: 'No, only public posts from public accounts are accessible. Private account posts require a logged-in follower’s account, which no legitimate tool can use on your behalf.' },
    { q: 'Are carousel video posts supported?', a: 'Yes, all video attachments in public Threads posts can be resolved, where resolution succeeds. Each video in a carousel is listed separately.' },
    { q: 'Why does this tool so often fail on Threads?', a: 'Honestly, Threads has no dedicated download extractor, and its pages are hard for server-side tools to read. Many posts return no media even when they are public. The tool is offered for the posts it can resolve; it is not reliable for Threads the way it is for YouTube or X. Try the Instagram version of the same post — it usually resolves without trouble.' },
    { q: 'What is the best way to download a Threads video?', a: 'If the same creator cross-posted it to Instagram — most do — download the Instagram version with the Instagram Reels or Instagram Photo tools. If it exists only on Threads, paste the link here and retry once after an hour.' },
    { q: 'Do I need a Threads or Instagram account?', a: 'No. Public posts can be attempted without logging in, and the tool never asks for credentials. Accounts are only needed to see private or friends-only posts, which cannot be downloaded anyway.' },
    { q: 'What quality will the video be?', a: 'The resolution Threads serves for that post — commonly 1080p for phone-recorded video, sometimes 720p. The download matches Threads’ version; nothing can exceed the uploaded source.' },
    { q: 'Can I download a Threads video with captions?', a: 'Captions burned into the video arrive as part of the picture. Optional subtitle files are not offered as a separate download, because Threads does not serve them separately.' },
    { q: 'Is it legal to save a Threads video?', a: 'Saving for private, offline viewing is widely accepted. Republishing, especially without the creator’s permission, is not. Credit the creator, and ask before re-uploading their work anywhere.' }
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
