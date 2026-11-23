import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Snapchat Spotlight Downloader | Vertical HD Video',
  description: 'Download public Snapchat Spotlight clips and public stories in full vertical HD 1080p MP4.',
}

const config: ToolPageConfig = {
  slug: 'snapchat-spotlight',
  title: 'Snapchat Spotlight Downloader',
  headline: 'Snapchat Spotlight Downloader',
  subtitle: 'An honest page about downloading Snapchat Spotlight clips. Spotlight videos are public by definition — they are the short vertical clips anyone can watch without being friends with the creator — but downloads from Snapchat time out frequently because Snapchat’s servers do not respond reliably to requests from cloud servers. This tool attempts public Spotlight links; when it times out, the FAQs below explain the alternatives. Private snaps, chat media, and friends’ stories are never accessible, to anyone.',
  badge: 'PUBLIC SPOTLIGHT CLIPS',
  accentColor: '#FFFC00',
  targetPlatformId: 'snapchat',
  targetPlatformName: 'Snapchat',
  sampleUrl: 'https://story.snapchat.com/p/abc123xyz/123456789',
  inputPlaceholder: 'Paste Snapchat Spotlight or Public Story URL...',
  primaryMediaType: 'video',
  features: [
    { title: 'Public Spotlight Video', desc: 'Attempts public Spotlight clips in full 9:16 vertical resolution, with the soundtrack included, returning the MP4 Snapchat serves for that clip.' },
    { title: 'Strict Privacy Compliant', desc: 'SocialVideoDownloader never accesses private snaps, chat media, or friends’ stories. Those are private by design, and any tool claiming to download them is either lying or wants your Snapchat password — never hand that over.' },
    { title: 'No Account Linked', desc: 'No Snapchat login or mobile verification is requested. Public Spotlight clips need no account to watch, and none is needed to attempt a download.' },
    { title: 'High Audio Fidelity', desc: 'Where a download succeeds, the clean stereo sound is preserved in the MP4, in sync with the picture, exactly as Snapchat serves it.' },
    { title: 'Honest About Timeouts', desc: 'Snapchat’s servers time out frequently on requests from cloud addresses. A failed download here is usually Snapchat’s server not responding, not a problem with your link — the FAQs explain what to do next.' },
    { title: 'Public Stories Attempted', desc: 'Links to public stories — the ones visible to everyone, not just friends — are attempted the same way as Spotlight clips, with the same timeout caveat.' }
  ],
  steps: [
    { step: '01', title: 'Copy Spotlight Link', desc: 'Open the Spotlight clip, tap Share, and copy the link. Check that the clip plays for anyone — a Spotlight clip shared in a private chat may still be public, but a friend’s private story never is.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the public link into the input field above and press Download Now. The tool requests the clip from Snapchat’s servers and waits for a response.' },
    { step: '03', title: 'Wait for the Response', desc: 'Snapchat’s servers are slow to answer server-side requests. Give the page time to finish instead of pressing download repeatedly — repeated requests do not make Snapchat answer faster.' },
    { step: '04', title: 'Download MP4', desc: 'If the clip resolves, save the portrait video directly to your camera roll or PC. If it times out, read the FAQ below before retrying.' },
    { step: '05', title: 'If It Times Out', desc: 'Retry once after an hour, try the clip’s story.snapchat.com link rather than a shortened share link, and if it still fails, screen-record the clip from your own phone for personal use — that is the reliable fallback for Snapchat content.' }
  ],
  faqs: [
    { q: 'Can I download private snaps or direct messages?', a: 'Under no circumstances. SocialVideoDownloader only works with publicly indexed Spotlight videos and public stories. Private snaps, chats, and friends-only stories are encrypted and private by design, and no legitimate tool can access them.' },
    { q: 'Does Snapchat notify the creator?', a: 'No notification is sent for downloads through web tools. Watching a Spotlight clip in the app counts only as an anonymous view.' },
    { q: 'Why does Snapchat keep timing out?', a: 'Honestly, Snapchat’s servers do not respond reliably to requests from cloud server addresses, and this service runs on a cloud server. The request simply times out with no answer. Some clips resolve on the first try, some never do. Retry once after an hour, and use screen recording on your own phone as the fallback for personal use.' },
    { q: 'What is the difference between Spotlight and a Story?', a: 'Spotlight clips are public short videos anyone can watch, like TikTok. Stories are the 24-hour posts on a profile, visible to friends or to everyone depending on the account’s privacy setting. Only public stories can be attempted; friends-only stories cannot.' },
    { q: 'Can I download a Spotlight clip that has already been deleted?', a: 'No. Deleted clips are removed from Snapchat’s servers and cannot be recovered by any tool.' },
    { q: 'Can I download a clip with its music?', a: 'Where a download succeeds, the soundtrack is included in the MP4. Some licensed music is stripped from downloads for rights reasons, and the file may then arrive with reduced or missing audio.' },
    { q: 'Is screen recording allowed?', a: 'For personal, offline viewing, screen recording a public clip you can already watch is widely accepted. Snapchat does notify the other person for screenshots of private snaps and chats — that notification does not apply to public Spotlight clips, but it is another reason never to record private content.' },
    { q: 'Can I repost a downloaded Spotlight clip?', a: 'Only with the creator’s permission. Downloading does not give you publishing rights, and re-uploading can trigger copyright claims. Share the original Spotlight link instead, which credits the creator.' }
  ],
  relatedTools: [
    { title: 'TikTok No Watermark Video', href: '/tiktok-no-watermark', badge: 'Vertical Video' },
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'Reels HD' },
    { title: 'YouTube Shorts Downloader', href: '/youtube-shorts', badge: 'Shorts 1080p' }
  ]
}

export default function SnapchatSpotlightPage() {
  return <SpecializedToolPage config={config} />
}
