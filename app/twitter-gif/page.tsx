import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'X / Twitter GIF Downloader | Convert Animated GIFs to MP4',
  description: 'Download animated GIFs from X (Twitter) posts as looping high-definition MP4 videos or GIF files.',
}

const config: ToolPageConfig = {
  slug: 'twitter-gif',
  guideSlug: 'how-to-download-twitter-gifs',
  guideTitle: 'How to Download X (Twitter) GIFs',
  title: 'X / Twitter GIF Downloader',
  headline: 'X / Twitter GIF Downloader',
  subtitle: 'Save the animated GIF from any public post on X as a small looping MP4 video — the format X actually stores GIFs in. It plays and loops in Discord, Slack, WhatsApp, Telegram, and every browser, at a tenth the size of a real GIF file, with no account and no app.',
  badge: 'TWITTER ANIMATED GIF SAVER',
  accentColor: '#0d8bd9',
  targetPlatformId: 'twitter',
  targetPlatformName: 'X / Twitter',
  sampleUrl: 'https://twitter.com/nasa/status/1789012345678901234',
  inputPlaceholder: 'Paste link to tweet containing an animated GIF...',
  primaryMediaType: 'video',
  features: [
    { title: 'True MP4 Video Loop', desc: 'X renders every GIF as an H.264 MP4 video, and this tool extracts that raw loop at full fidelity — the original file, not a screen recording or a recompressed copy.' },
    { title: 'Lightweight File Size', desc: 'MP4 compression makes these files tiny — usually under two megabytes for a few seconds — so they send instantly in Discord, WhatsApp, and Slack without hitting size limits.' },
    { title: 'Universal Playback', desc: 'Runs smoothly on any mobile OS, browser, or messaging platform. The MP4 loops automatically in messaging apps, and repeats in any video player set to repeat.' },
    { title: 'Silent By Design', desc: 'GIFs on X never have sound, and the downloaded MP4 faithfully carries no audio track. If a post has a video with sound as well, that video downloads as a separate file.' },
    { title: 'One-Click Download', desc: 'Instant extraction with no conversion wait, no queue, and no multi-pass processing. Paste the post link, pick the MP4, and save it.' },
    { title: 'Convertible to Real GIF', desc: 'Keep the MP4 as your master copy and convert it to a .gif only when a destination demands that format. Free tools like Ezgif and most video editors export GIFs from MP4 in seconds.' }
  ],
  steps: [
    { step: '01', title: 'Copy Tweet Link', desc: 'Open the post containing the GIF, tap Share, and copy the link. Make sure you copy the link of the post that actually contains the GIF — in a thread, that may be several posts down.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the post URL into the field above and press Download Now. The tool resolves the post and lists its media, including the GIF as an MP4 video file.' },
    { step: '03', title: 'Pick the MP4', desc: 'Choose the video variant labelled as the GIF or looping video. It is usually 480p or 720p, silent, and a few seconds long — exactly as X serves it.' },
    { step: '04', title: 'Download MP4 GIF', desc: 'Save the looping MP4 file directly to your device. On a phone it lands in Downloads; on desktop in your browser download folder.' },
    { step: '05', title: 'Name It and File It', desc: 'Rename the file descriptively — “cat-typing-reaction.mp4” beats a string of numbers — and keep reaction GIFs in a folder by theme so they stay findable.' }
  ],
  faqs: [
    { q: 'Why is the downloaded file an MP4 instead of a .gif?', a: 'Twitter encodes all GIFs into optimized H.264 MP4 videos for better performance. Our tool saves this original video stream. It looks and loops exactly like the GIF in your timeline, in every modern app, at a fraction of the size.' },
    { q: 'Can I upload this to Discord or Slack?', a: 'Yes! The file plays as a looping video or animation seamlessly on modern messaging apps. Discord, Slack, WhatsApp, and Telegram all loop short MP4s automatically, exactly as they do with GIFs.' },
    { q: 'Can I get a real .gif file instead?', a: 'Yes, by converting the MP4. Free tools like Ezgif and CloudConvert accept an MP4 and return a GIF, with controls for size and frame rate. Expect the GIF to be five to ten times larger than the MP4, and lower quality, because GIF supports only 256 colours per frame.' },
    { q: 'Why is the GIF silent?', a: 'GIFs on X are silent by design — the format X uses for them has no audio track at all. If the post also has a video with sound, that video is a separate attachment and downloads separately.' },
    { q: 'Why is my GIF blurry?', a: 'It was probably uploaded blurry, or it is a many-times-recompressed copy passed from post to post. Each re-upload loses detail. Find the earliest post of the same GIF and download from there for the cleanest version available.' },
    { q: 'Can I download GIFs from protected accounts?', a: 'No. Protected posts are not public, and their media cannot be downloaded by any legitimate tool.' },
    { q: 'Will the MP4 loop in PowerPoint or Google Slides?', a: 'Yes. Both accept MP4 video, and a short clip plays inside a slide like an embedded GIF. Insert it as a video and set it to play automatically for the looping effect during a presentation.' },
    { q: 'Can I use a downloaded GIF in my own posts?', a: 'For personal chats and reactions, yes — that is how GIFs are meant to be used. For public posts or commercial content, get the creator’s permission or use a GIF from a licensed library.' }
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
