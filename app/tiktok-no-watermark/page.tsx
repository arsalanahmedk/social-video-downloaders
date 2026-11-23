import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'TikTok Downloader Without Watermark | HD MP4',
  description: 'Download public TikTok videos in full 1080p HD without the floating watermark. Clean, fast, and free.',
}

const config: ToolPageConfig = {
  slug: 'tiktok-no-watermark',
  guideSlug: 'how-to-download-tiktok-videos-without-watermark',
  guideTitle: 'How to Download TikTok Videos Without Watermark',
  title: 'TikTok Downloader Without Watermark',
  headline: 'TikTok Video Downloader Without Watermark',
  subtitle: 'An honest page about downloading TikTok videos. TikTok video downloads frequently fail from this site, because TikTok blocks requests from cloud server addresses — and this service runs on a cloud server. TikTok PHOTO posts, by contrast, download reliably, through a proxy. Read the FAQs before relying on this page for videos, and use the photo-post tool when the post is a photo carousel.',
  badge: 'ZERO WATERMARK TIKTOK',
  accentColor: '#00f2fe',
  targetPlatformId: 'tiktok',
  targetPlatformName: 'TikTok',
  sampleUrl: 'https://www.tiktok.com/@creator/video/723456789012345',
  inputPlaceholder: 'Paste TikTok video link (tiktok.com or vm.tiktok.com)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Clean Video Source', desc: 'When a TikTok video resolves, the tool retrieves the video file itself — before TikTok’s app applies the bouncing watermark — so the saved file carries no floating username or logo overlay.' },
    { title: 'Original 1080p Quality', desc: 'Resolved videos arrive at the full 1080p resolution and frame rate TikTok serves, with the soundtrack included, exactly as the creator uploaded it.' },
    { title: 'Short Link Compatibility', desc: 'Supports standard desktop URLs, mobile share links, and vm.tiktok.com short links, following each to the real video page before attempting to fetch the video.' },
    { title: 'Photo Posts Work Reliably', desc: 'TikTok photo carousels resolve through a dedicated proxy and download as a set of JPG images — see the TikTok photos guide and the related tools below. If the post is photos, use that path instead.' },
    { title: 'Honest About Video Failures', desc: 'TikTok blocks requests from cloud server addresses, so video downloads fail often. This page says so plainly, explains why, and lists the workarounds that actually work instead of promising a feature that does not.' },
    { title: 'No App or Extension', desc: 'SocialVideoDownloader is 100% web-based and runs in any browser. No app install, no browser extension, and no account are needed to attempt a download.' }
  ],
  steps: [
    { step: '01', title: 'Copy TikTok Share Link', desc: 'Open TikTok, tap the Share arrow on the video, and tap Copy Link. Check whether the post is a video or a photo carousel — photo carousels download reliably, videos often do not.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the field above and tap Download Now. The tool attempts to fetch the video from TikTok’s servers.' },
    { step: '03', title: 'Check the Result', desc: 'If the video resolves, select HD Video (No Watermark) and save the clean file. If it fails, read the FAQ below — the cause is usually TikTok blocking the server’s address.' },
    { step: '04', title: 'Download No-Watermark MP4', desc: 'Select "HD Video (No Watermark)" to save the clean video file. On a phone it lands in Downloads; on desktop in your browser download folder.' },
    { step: '05', title: 'If Video Fails, Try the Fallbacks', desc: 'Retry once after an hour, try the TikTok app’s own Save Video option for your own posts, or use your phone’s screen recording for personal viewing. For photo posts, use the TikTok photos path — it works reliably.' }
  ],
  faqs: [
    { q: 'Why do TikTok video downloads keep failing?', a: 'Honestly, TikTok blocks requests from cloud server addresses, and this service runs on a cloud server. The request is refused before any video is served, so the download fails no matter how many times you retry in the same hour. Some videos resolve, most do not. TikTok photo posts are different — they route through a dedicated proxy and download reliably.' },
    { q: 'Is it really completely watermark-free?', a: 'When a video resolves, yes — the tool queries the direct video stream before the overlay is applied by the mobile app, so the saved file carries no floating watermark. The watermarked version is what TikTok’s own Save Video button produces; the clean stream is the same video without the overlay.' },
    { q: 'Do I need to install an app or extension?', a: 'No, SocialVideoDownloader is 100% web-based and runs in any browser. No app, no extension, and no account are needed.' },
    { q: 'Can I download my own TikTok videos without a watermark?', a: 'Yes — if you still have the original file on your phone, that is the cleanest copy of all, with no watermark and no compression. TikTok’s own Save Video button adds a watermark, so keep your originals in your camera roll or a backup folder.' },
    { q: 'What about TikTok photo posts?', a: 'TikTok photo carousels download reliably through a dedicated proxy, as a set of JPG images — one file per photo. Paste the photo post link here, or read the TikTok photos guide, and download the slides you want.' },
    { q: 'Why does the same link work sometimes and fail other times?', a: 'TikTok’s blocking is inconsistent. A video may resolve once and fail the next hour, depending on which server answers and how aggressively TikTok is filtering at that moment. Retrying after an hour sometimes works; retrying ten times in a row does not help.' },
    { q: 'Can I download private TikTok videos?', a: 'No. Private videos, friends-only videos, and drafts are not publicly accessible, and no legitimate tool can fetch them. Only public videos can be attempted.' },
    { q: 'Can I repost a downloaded TikTok video?', a: 'Only with the creator’s permission. Removing the watermark does not remove the creator’s rights, and re-uploading someone else’s video as your own can trigger copyright claims. Credit the creator and link the original, or use TikTok’s own repost and duet features.' }
  ],
  relatedTools: [
    { title: 'TikTok Audio & Sound Extractor', href: '/tiktok-audio', badge: 'MP3 Sounds' },
    { title: 'YouTube Shorts Downloader', href: '/youtube-shorts', badge: 'Shorts 1080p' },
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'Reels MP4' }
  ]
}

export default function TikTokNoWatermarkPage() {
  return <SpecializedToolPage config={config} />
}
