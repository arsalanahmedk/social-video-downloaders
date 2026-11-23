import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Instagram Stories Downloader | Public Story Highlights',
  description: 'Save public Instagram stories and profile story highlights easily in high resolution MP4 or JPG.',
}

const config: ToolPageConfig = {
  slug: 'instagram-stories',
  guideSlug: 'how-to-download-instagram-stories',
  guideTitle: 'How to Download Instagram Stories',
  title: 'Instagram Stories Downloader',
  headline: 'Instagram Stories Downloader',
  subtitle: 'Save public Instagram stories and story highlights before they expire — video frames as MP4, photo frames as JPG, at the full vertical resolution Instagram serves. Stories vanish after 24 hours unless saved as highlights, so copy the link while the story is still live.',
  badge: 'PUBLIC STORIES ARCHIVE',
  accentColor: '#833ab4',
  targetPlatformId: 'instagram',
  targetPlatformName: 'Instagram',
  sampleUrl: 'https://www.instagram.com/stories/highlights/1234567890/',
  inputPlaceholder: 'Paste public Instagram Story or Highlight link...',
  primaryMediaType: 'video',
  features: [
    { title: 'Public Stories & Highlights', desc: 'Downloads public 24-hour stories and pinned story highlights from public profiles, frame by frame, in the order they appear in the story.' },
    { title: 'Video & Photo Support', desc: 'Automatically handles both portrait video stories and photo snapshots, returning each frame in its own format — MP4 for video frames, JPG for photo frames.' },
    { title: 'No Login Required', desc: 'Fetches public media through server requests without logging into an Instagram account, and never asks for your password or any credentials.' },
    { title: 'High-Res Vertical Format', desc: 'Retains the clean 1080x1920 vertical resolution Instagram serves, so saved stories look sharp on a phone and stay usable in edits.' },
    { title: 'Highlights Have No Deadline', desc: 'Highlights live on the profile indefinitely, so their links are stable and there is no 24-hour rush. Download the frames you need, whenever you need them.' },
    { title: 'Frame-by-Frame Choice', desc: 'Each story frame is listed separately, so you can save the one announcement or tutorial frame you need instead of an entire day’s worth of stories.' }
  ],
  steps: [
    { step: '01', title: 'Copy Story URL', desc: 'Open the story, tap the three-dot menu on the story itself, and choose Copy Link. For a highlight, open the highlight circle on the profile and copy the link from inside it. Do this while the story is live.' },
    { step: '02', title: 'Insert Link', desc: 'Paste the link into the field above and press Download Now. The tool fetches the frames that are currently live and lists each video frame as MP4 and each photo frame as JPG.' },
    { step: '03', title: 'Pick the Frames', desc: 'Download the frames you actually want, one at a time. A story with eight frames gives you eight files — take the ones that matter and skip the rest.' },
    { step: '04', title: 'Save File', desc: 'Download your story video (MP4) or high-res photo (JPG). On iPhone the file lands in Files; on Android in Downloads; on desktop in your browser download folder.' },
    { step: '05', title: 'File by Account and Date', desc: 'Save story frames into a folder named after the account and the date, so an archive of saved stories stays searchable and your own content stays separate from other people’s.' }
  ],
  faqs: [
    { q: 'Can I download stories from private profiles?', a: 'No. Only publicly posted stories and highlights from public profiles are accessible. Private account stories and close-friends stories are visible only to approved viewers, and no legitimate tool can fetch them.' },
    { q: 'Does the account owner know I downloaded their story?', a: 'No notification is sent for downloads. Watching the story from your own account does add you to the viewer list, which the owner can see — downloading itself is not reported.' },
    { q: 'Can I download a story after it expires?', a: 'No. Once the 24 hours pass and the story is not saved as a highlight, it is removed from Instagram’s public pages and cannot be recovered by any tool. Save stories while they are live.' },
    { q: 'Why did the tool return nothing?', a: 'The usual causes, in order: the story expired, the account is private, or the link points to the profile rather than the story. Copy the link from inside the story viewer, not from the profile grid, and try again.' },
    { q: 'Do highlights work the same way?', a: 'Yes, and more reliably. Highlights are permanent, their links are stable, and there is no clock. Open the highlight, copy the link from inside it, and download the frames you need.' },
    { q: 'Why do some story frames have no sound?', a: 'Either the frame was silent, its music was removed for licensing reasons, or the audio track failed to resolve. Check whether the story plays sound inside Instagram first, then try the frame again.' },
    { q: 'Can I download poll results or question answers?', a: 'No. Interactive elements — polls, questions, countdowns, link stickers — live in the account owner’s account, not on the public page. The downloaded file contains the media underneath, not the interactive overlay.' },
    { q: 'Can I repost a downloaded story?', a: 'Only with the poster’s permission. Stories feel casual, but they are still the poster’s content. Keep downloads for personal use unless the creator has said otherwise.' }
  ],
  relatedTools: [
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: '1080p Video' },
    { title: 'Instagram Photo Downloader', href: '/instagram-photo', badge: 'Original Photos' },
    { title: 'Snapchat Spotlight Downloader', href: '/snapchat-spotlight', badge: 'Spotlight Clips' }
  ]
}

export default function InstagramStoriesPage() {
  return <SpecializedToolPage config={config} />
}
