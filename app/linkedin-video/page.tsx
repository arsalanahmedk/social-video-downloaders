import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'LinkedIn Video Downloader | Professional HD Videos | SocialVideoDownloader',
  description: 'Download public LinkedIn videos, keynote presentations, and business media in 1080p Full HD MP4.',
}

const config: ToolPageConfig = {
  slug: 'linkedin-video',
  title: 'LinkedIn Video Downloader',
  headline: 'LinkedIn Video Downloader',
  subtitle: 'Save professional keynotes, webinar clips, and company announcements from public LinkedIn posts in 1080p HD.',
  badge: 'ENTERPRISE HD VIDEO SAVER',
  accentColor: '#0A66C2',
  targetPlatformId: 'linkedin',
  targetPlatformName: 'LinkedIn',
  sampleUrl: 'https://www.linkedin.com/posts/acme-corp_innovation-tech-activity-7123456789012345678-abcd',
  inputPlaceholder: 'Paste public LinkedIn post URL...',
  primaryMediaType: 'video',
  features: [
    { title: 'Full 1080p Presentation Quality', desc: 'Retains text readability on keynote slides and screen shares.' },
    { title: 'Clean Audio Fidelity', desc: 'Preserves speech clarity for podcasts and webinars.' },
    { title: 'No Account Required', desc: 'Extracts public company and thought-leadership videos anonymously.' },
    { title: 'Fast CDN Downloads', desc: 'Direct file streaming without third-party redirects or delays.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Click the three dots (...) on the LinkedIn post and click "Copy link to post".' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the URL into the field above.' },
    { step: '03', title: 'Download Video MP4', desc: 'Save the presentation video directly to your PC or mobile device.' }
  ],
  faqs: [
    { q: 'Can I download private company internal videos or Learning courses?', a: 'No. SocialVideoDownloader strictly operates on public posts and does not bypass LinkedIn Learning or private company logins.' },
    { q: 'Can I download LinkedIn carousel documents?', a: 'Yes, public slide presentations and carousels are inspected.' }
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
