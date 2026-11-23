import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'LinkedIn Video Downloader | Professional HD Videos',
  description: 'Download public LinkedIn videos, keynote presentations, and business media in 1080p Full HD MP4.',
}

const config: ToolPageConfig = {
  slug: 'linkedin-video',
  title: 'LinkedIn Video Downloader',
  headline: 'LinkedIn Video Downloader',
  subtitle: 'An honest page about downloading LinkedIn videos. LinkedIn places most of its video behind a login wall, so most LinkedIn posts cannot be downloaded by any web tool — including this one. A small number of fully public posts resolve; the rest return an error, and the FAQs below explain exactly why, and what actually works instead.',
  badge: 'ENTERPRISE HD VIDEO SAVER',
  accentColor: '#0A66C2',
  targetPlatformId: 'linkedin',
  targetPlatformName: 'LinkedIn',
  sampleUrl: 'https://www.linkedin.com/posts/acme-corp_innovation-tech-activity-7123456789012345678-abcd',
  inputPlaceholder: 'Paste public LinkedIn post URL...',
  primaryMediaType: 'video',
  features: [
    { title: 'Public Posts Attempted', desc: 'Fully public LinkedIn posts — those visible to anyone without logging in — are attempted. The tool returns the video file LinkedIn serves for that post, up to 1080p, with the audio track included.' },
    { title: 'Presentation Quality', desc: 'Where a video resolves, the full 1080p file is returned, so keynote slides, screen shares, and on-screen text stay readable — important for talks and demos, where the words are the point.' },
    { title: 'Clean Audio Fidelity', desc: 'Speech is preserved clearly in the downloaded MP4, which matters for podcasts, webinars, and recorded talks where the audio carries the whole message.' },
    { title: 'No Account Requested', desc: 'The tool never asks for your LinkedIn login. Any download tool that asks for your LinkedIn password is a phishing risk — never hand over credentials to a third-party downloader.' },
    { title: 'Honest About the Login Wall', desc: 'Most LinkedIn posts require a login to view, and those cannot be downloaded by any legitimate web tool. This page says so plainly instead of promising a feature that does not work.' },
    { title: 'Carousels and Documents', desc: 'Public slide presentations and document carousels attached to public posts are inspected the same way as videos, and their images are listed where they resolve.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Click the three dots (...) on the LinkedIn post and choose Copy Link to Post. Open the link in a private browser window: if it asks you to log in, the post is login-walled and cannot be downloaded.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the URL into the field above and press Download Now. The tool checks whether the post is publicly reachable without a login.' },
    { step: '03', title: 'Check the Result', desc: 'If the video resolves, choose a quality and save it. If the page reports the post could not be resolved, the post is behind LinkedIn’s login wall — see the FAQ for the workarounds that actually work.' },
    { step: '04', title: 'Download Video MP4', desc: 'Save the presentation video directly to your PC or mobile device. Rename it with the speaker, event, and topic, because LinkedIn’s default filenames are strings of numbers.' },
    { step: '05', title: 'If It Is Login-Walled', desc: 'Save the post inside LinkedIn, ask the poster for the file or a shareable link, or check whether the same talk is published on YouTube or the speaker’s site — most keynotes are, and those download reliably.' }
  ],
  faqs: [
    { q: 'Why does LinkedIn almost always fail?', a: 'Honestly, LinkedIn places most video behind a login wall. Posts that require a login cannot be viewed — or downloaded — by any server-side tool, because the tool has no account and no permission to log in as you. Only the small number of fully public posts resolve. This is a limitation of LinkedIn, not a bug in the tool.' },
    { q: 'Can I download private company internal videos or Learning courses?', a: 'No. SocialVideoDownloader strictly operates on public posts and does not bypass LinkedIn Learning or private company logins. Learning courses are paid content, and accessing them without a licence is piracy.' },
    { q: 'Can I download LinkedIn carousel documents?', a: 'Yes, public slide presentations and carousels are inspected. Where they resolve, their slide images are listed for download. Login-walled carousels cannot be reached, for the same reason as videos.' },
    { q: 'What if the video is on a company page?', a: 'Company page posts follow the same rule: fully public posts may resolve, login-walled ones will not. Large companies often publish the same video on YouTube, where it downloads reliably.' },
    { q: 'Is there a legitimate way to save a LinkedIn video?', a: 'Yes. LinkedIn lets you save a post inside the platform for later viewing, and most creators will share the file or a link if you ask. For your own posts, download the original from your post’s edit screen or from your own upload.' },
    { q: 'Should I enter my LinkedIn password into a download tool?', a: 'Never. A tool that asks for your LinkedIn password can read your messages, contacts, and private content, and LinkedIn will flag the login as suspicious. No legitimate downloader needs your credentials.' },
    { q: 'Can I use a downloaded talk in my own presentation?', a: 'Only with the speaker’s permission. Talks are copyrighted, and showing someone else’s keynote as your own — or even re-uploading it — needs their agreement. A short clip with attribution for commentary is usually fine; a full re-upload is not.' },
    { q: 'Why is the video low quality when it does download?', a: 'LinkedIn compresses video heavily, and the tool returns LinkedIn’s version faithfully. For presentation-quality copies, ask the speaker for the original file or find the talk on YouTube, where higher resolutions are usually available.' }
  ],
  relatedTools: [
    { title: 'YouTube to MP3 Converter', href: '/youtube-to-mp3', badge: 'Podcast Audio' },
    { title: 'Twitter Video Downloader', href: '/twitter-video', badge: 'Tech Tweets' },
    { title: 'Facebook Video Downloader', href: '/facebook-video', badge: 'Watch Streams' }
  ]
}

export default function LinkedInVideoPage() {
  return <SpecializedToolPage config={config} />
}
