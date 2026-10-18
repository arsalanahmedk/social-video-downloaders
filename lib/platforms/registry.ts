export type PlatformId =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'facebook'
  | 'twitter'
  | 'pinterest'
  | 'reddit'
  | 'linkedin'
  | 'snapchat'
  | 'threads'

export type PlatformConfig = {
  id: PlatformId
  name: string
  tagline: string
  description: string
  domains: string[]
  media: string[]
  accentColor: string
  accentGradient: string
  badgeText: string
  status: 'active' | 'preview' | 'conditional'
  /** Optional explanation shown when status is not 'active'. */
  statusNote?: string
  features: string[]
  sampleUrls: string[]
  defaultFormat: string
  availableFormats: {
    id: string
    label: string
    quality: string
    ext: string
    size: string
    type: 'video' | 'audio' | 'image'
  }[]
  faq: {
    q: string
    a: string
  }[]
  steps: {
    step: string
    title: string
    desc: string
  }[]
}

export const platforms: PlatformConfig[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    tagline: 'Reels, Photos, Stories & Carousels',
    description: 'Save public Instagram Reels, photos, video clips, and carousel albums in original high fidelity.',
    domains: ['instagram.com', 'instagr.am'],
    media: ['Reels', 'Photos', 'Stories', 'Carousels', 'IGTV'],
    accentColor: '#E1306C',
    accentGradient: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
    badgeText: 'HD & 4K Ready',
    status: 'active',
    features: ['No watermark on Reels', 'High resolution images up to 1080p', 'Audio extraction to MP3', 'Batch carousel support'],
    sampleUrls: [
      'https://www.instagram.com/reel/C8XYZ1234/',
      'https://www.instagram.com/p/C9ABC5678/',
    ],
    defaultFormat: '1080p-video',
    availableFormats: [
      { id: '1080p-video', label: 'Full HD Reel / Video', quality: '1080p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: '720p-video', label: 'Standard Reel / Video', quality: '720p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'audio-mp3', label: 'Original Audio Track', quality: '320kbps', ext: 'mp3', size: 'Actual size', type: 'audio' },
      { id: 'cover-image', label: 'High-Res Cover / Photo', quality: '1080x1350', ext: 'jpg', size: 'Actual size', type: 'image' }
    ],
    faq: [
      { q: 'Can I download private Instagram posts?', a: 'No. SocialVideoDownloader strictly operates on publicly accessible content and does not bypass private account protections or authentication.' },
      { q: 'Are Instagram Reels downloaded with watermarks?', a: 'SocialVideoDownloader downloads the public stream directly, providing clean, high-resolution media without third-party overlays.' },
      { q: 'Does this work on mobile devices?', a: 'Yes, SocialVideoDownloader works natively in iOS Safari, Android Chrome, and any modern mobile browser without requiring app installations.' }
    ],
    steps: [
      { step: '01', title: 'Copy the Link', desc: 'Open Instagram, tap the Share icon on any public post or Reel, and tap "Copy Link".' },
      { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the universal or Instagram input field above.' },
      { step: '03', title: 'Download Media', desc: 'Select your preferred quality (1080p, 720p, or MP3) and click Download.' }
    ]
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    tagline: 'Watermark-Free HD Videos & Sounds',
    description: 'Download public TikTok videos in crisp HD without watermarks, or extract background music directly as MP3.',
    domains: ['tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com'],
    media: ['HD Video', 'No-Watermark Video', 'Audio MP3', 'Thumbnails'],
    accentColor: '#00f2fe',
    accentGradient: 'linear-gradient(135deg, #00f2fe, #4facfe, #fe0979)',
    badgeText: 'Zero Watermark',
    status: 'active',
    features: ['Original audio separation', 'Ultra-fast resolution speed', 'Supports desktop and mobile share links', 'Clean MP4 output'],
    sampleUrls: [
      'https://www.tiktok.com/@creator/video/723456789012345',
      'https://vm.tiktok.com/ZM8abcXYZ/'
    ],
    defaultFormat: 'hd-nowatermark',
    availableFormats: [
      { id: 'hd-nowatermark', label: 'HD Video (No Watermark)', quality: '1080p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'sd-video', label: 'Standard Video (Fast)', quality: '720p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'tiktok-audio', label: 'TikTok Original Sound', quality: '320kbps', ext: 'mp3', size: 'Actual size', type: 'audio' },
      { id: 'video-thumb', label: 'Static Cover Poster', quality: '1080x1920', ext: 'jpg', size: 'Actual size', type: 'image' }
    ],
    faq: [
      { q: 'Is there a watermark on downloaded TikToks?', a: 'No, our resolver retrieves the clean source video stream without the floating watermark.' },
      { q: 'Can I download TikTok sounds as MP3?', a: 'Yes! Select the "Original Sound (MP3)" option after resolving any public TikTok URL.' },
      { q: 'Are shortened vm.tiktok.com links supported?', a: 'Yes, both full web URLs and mobile share links are supported.' }
    ],
    steps: [
      { step: '01', title: 'Copy Share Link', desc: 'In TikTok, click the Share arrow on the video and select "Copy Link".' },
      { step: '02', title: 'Paste URL', desc: 'Paste the copied URL into SocialVideoDownloader and hit Enter or Resolve.' },
      { step: '03', title: 'Save File', desc: 'Choose "HD Video (No Watermark)" to save the video directly to your downloads.' }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    tagline: 'Shorts, Clips, 4K Videos & Audio',
    description: 'Retrieve publicly posted YouTube Shorts, clips, and videos in crystal clear resolution or crystal clear MP3 audio.',
    domains: ['youtube.com', 'youtu.be', 'm.youtube.com'],
    media: ['YouTube Shorts', 'Public Videos', 'Clips', 'Audio Tracks'],
    accentColor: '#FF0000',
    accentGradient: 'linear-gradient(135deg, #FF0000, #b20710)',
    badgeText: 'Up to 4K / MP3',
    status: 'active',
    features: ['Full support for YouTube Shorts', 'Crisp 320kbps MP3 extraction', 'High-res thumbnail downloads', 'Rapid processing'],
    sampleUrls: [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://www.youtube.com/shorts/abc123xyz'
    ],
    defaultFormat: '1080p-video',
    availableFormats: [
      { id: '1080p-video', label: 'Full HD 1080p MP4', quality: '1080p 60fps', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: '720p-video', label: 'HD 720p MP4', quality: '720p 30fps', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'youtube-audio', label: 'High Quality Audio MP3', quality: '320kbps', ext: 'mp3', size: 'Actual size', type: 'audio' },
      { id: 'youtube-thumb', label: 'MaxRes Thumbnail Banner', quality: '1920x1080', ext: 'jpg', size: 'Actual size', type: 'image' }
    ],
    faq: [
      { q: 'Can I download YouTube Shorts?', a: 'Yes! Simply paste any public YouTube Shorts link (youtube.com/shorts/...) into the input.' },
      { q: 'Does SocialVideoDownloader download age-restricted or private YouTube videos?', a: 'No. Content that requires account login, membership, or age verification is not accessible.' },
      { q: 'What is the maximum video quality available?', a: 'We provide available public resolutions up to 1080p Full HD and 4K depending on the uploaded stream source.' }
    ],
    steps: [
      { step: '01', title: 'Find Video or Short', desc: 'Navigate to YouTube and copy the link from your browser address bar or Share button.' },
      { step: '02', title: 'Insert Link', desc: 'Paste the YouTube link into SocialVideoDownloader to fetch available resolutions.' },
      { step: '03', title: 'Choose & Save', desc: 'Select 1080p, 720p, or MP3 and initiate your download instantly.' }
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    tagline: 'Public Watch Videos, Reels & Photos',
    description: 'Save public Facebook videos, Reels, and high-resolution photo posts with complete metadata.',
    domains: ['facebook.com', 'fb.watch', 'fb.com'],
    media: ['Watch Videos', 'Reels', 'Public Posts', 'Photos'],
    accentColor: '#1877F2',
    accentGradient: 'linear-gradient(135deg, #1877F2, #0e5a8a)',
    badgeText: 'Watch & Reels',
    status: 'active',
    features: ['Facebook Watch support', 'Public Reel resolution', 'Multiple quality options', 'Lightning fast conversion'],
    sampleUrls: [
      'https://www.facebook.com/watch/?v=1234567890',
      'https://fb.watch/mXyZ1234/'
    ],
    defaultFormat: '1080p-video',
    availableFormats: [
      { id: '1080p-video', label: 'HD Quality MP4', quality: '1080p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: '720p-video', label: 'SD Quality MP4', quality: '720p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'fb-audio', label: 'Audio Only Track', quality: '256kbps', ext: 'mp3', size: 'Actual size', type: 'audio' },
      { id: 'fb-thumb', label: 'Video Snapshot', quality: '1280x720', ext: 'jpg', size: 'Actual size', type: 'image' }
    ],
    faq: [
      { q: 'Can I download private Facebook videos or group posts?', a: 'No, only public videos and posts published with the globe "Public" privacy icon can be processed.' },
      { q: 'Are fb.watch links supported?', a: 'Yes, fb.watch short URLs are automatically resolved to the canonical media stream.' }
    ],
    steps: [
      { step: '01', title: 'Copy Public Post', desc: 'Click Share on any public Facebook post or video and copy the link.' },
      { step: '02', title: 'Paste URL', desc: 'Paste the link into SocialVideoDownloader to resolve the public media stream.' },
      { step: '03', title: 'Download File', desc: 'Choose your desired quality and save directly to your storage.' }
    ]
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    tagline: 'Tweets, Videos, GIFs & High-Res Images',
    description: 'Download media from posts on X (formerly Twitter) including HD videos, native GIFs, and high-resolution photo attachments.',
    domains: ['x.com', 'twitter.com', 't.co'],
    media: ['Post Videos', 'Native GIFs', 'High-Res Photos', 'Threads'],
    accentColor: '#1DA1F2',
    accentGradient: 'linear-gradient(135deg, #1DA1F2, #0d8bd9)',
    badgeText: 'MP4 & GIF',
    status: 'active',
    features: ['Both x.com and twitter.com URLs supported', 'Download Twitter GIFs as true MP4', 'Original 4K image quality extraction', 'Clean file naming'],
    sampleUrls: [
      'https://x.com/spacex/status/1789012345678901234',
      'https://twitter.com/nasa/status/1789012345678901234'
    ],
    defaultFormat: '1080p-video',
    availableFormats: [
      { id: '1080p-video', label: 'Full HD Video / GIF', quality: '1080p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: '720p-video', label: 'Standard Video', quality: '720p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'x-photo', label: 'Original Resolution Photo', quality: '2048x1536', ext: 'jpg', size: 'Actual size', type: 'image' },
      { id: 'x-audio', label: 'Extracted Audio', quality: '192kbps', ext: 'mp3', size: 'Actual size', type: 'audio' }
    ],
    faq: [
      { q: 'Does this support links from both x.com and twitter.com?', a: 'Yes, both domains are supported interchangeably.' },
      { q: 'How are Twitter GIFs handled?', a: 'Twitter stores GIFs internally as looped MP4 videos; SocialVideoDownloader provides them in universal MP4 format with audio sync where applicable.' }
    ],
    steps: [
      { step: '01', title: 'Copy Post Link', desc: 'Tap the share button on the tweet / X post and click "Copy link to post".' },
      { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Insert the post URL into the search box above.' },
      { step: '03', title: 'Select Format', desc: 'Click Download to receive the video or photo immediately.' }
    ]
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    tagline: 'Pins, Idea Pins, High-Res Images & Videos',
    description: 'Save original quality Pinterest pins, Idea video pins, and high-definition photography collections.',
    domains: ['pinterest.com', 'pin.it', 'pinterest.co.uk'],
    media: ['Pins', 'Idea Pins', 'High-Res Images', 'Video Pins'],
    accentColor: '#E60023',
    accentGradient: 'linear-gradient(135deg, #E60023, #ad081b)',
    badgeText: 'Full Quality',
    status: 'active',
    features: ['Original image file preservation', 'Pin.it shortened URLs handled', 'Video pin resolution in 1080p', 'Direct download triggers'],
    sampleUrls: [
      'https://www.pinterest.com/pin/123456789012345/',
      'https://pin.it/7abcXYZ'
    ],
    defaultFormat: 'pin-image',
    availableFormats: [
      { id: 'pin-image', label: 'Original Resolution Pin', quality: 'Full Resolution', ext: 'jpg', size: 'Actual size', type: 'image' },
      { id: 'pin-video', label: 'HD Video Pin', quality: '1080p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'pin-thumb', label: 'Grid Preview Thumbnail', quality: '564x800', ext: 'jpg', size: 'Actual size', type: 'image' }
    ],
    faq: [
      { q: 'Can I download the original full-size image?', a: 'Yes! SocialVideoDownloader retrieves the uncompressed source image file rather than the downscaled grid thumbnail.' },
      { q: 'Are pin.it short links supported?', a: 'Yes, mobile pin.it links are automatically unshortened and processed.' }
    ],
    steps: [
      { step: '01', title: 'Copy Pin Link', desc: 'Click the share icon on the Pin and select "Copy Link".' },
      { step: '02', title: 'Paste URL', desc: 'Paste your Pinterest link into the downloader field.' },
      { step: '03', title: 'Save High-Res File', desc: 'Download your pin in its authentic, full resolution.' }
    ]
  },
  {
    id: 'reddit',
    name: 'Reddit',
    tagline: 'Videos with Sound, Galleries & GIFs',
    description: 'Retrieve Reddit videos with synchronized audio tracks, multi-image galleries, and animated GIFs without quality loss.',
    domains: ['reddit.com', 'redd.it', 'v.redd.it'],
    media: ['Videos with Audio', 'Image Galleries', 'GIFs', 'Discussions'],
    accentColor: '#FF4500',
    accentGradient: 'linear-gradient(135deg, #FF4500, #cc3700)',
    badgeText: 'Merged Audio',
    status: 'active',
    features: ['Merges Reddit separate video/audio DASH streams', 'Gallery carousel extraction', 'Direct v.redd.it and post URL support', 'Subreddit preview metadata'],
    sampleUrls: [
      'https://www.reddit.com/r/technology/comments/xyz123/future_of_computing/',
      'https://v.redd.it/abc123xyz'
    ],
    defaultFormat: '1080p-video',
    availableFormats: [
      { id: '1080p-video', label: 'HD Video (Audio Merged)', quality: '1080p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: '720p-video', label: 'Standard Video', quality: '720p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'reddit-audio', label: 'Audio Stream Only', quality: '192kbps', ext: 'mp3', size: 'Actual size', type: 'audio' },
      { id: 'reddit-image', label: 'Original Gallery Image', quality: 'Full Size', ext: 'jpg', size: 'Actual size', type: 'image' }
    ],
    faq: [
      { q: 'Why do other downloaders give Reddit videos with no sound?', a: 'Reddit stores video and audio as separate DASH streams. SocialVideoDownloader multiplexes the audio and video together into a complete MP4.' },
      { q: 'Can I download from NSFW subreddits?', a: 'SocialVideoDownloader does not bypass age gates or restricted community protections.' }
    ],
    steps: [
      { step: '01', title: 'Share Reddit Post', desc: 'Click Share below the Reddit post and click "Copy Link".' },
      { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the URL into the input field above.' },
      { step: '03', title: 'Download with Audio', desc: 'Choose your desired quality and get the video with crystal clear audio.' }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    tagline: 'Professional Videos, Slide Decks & Posts',
    description: 'Download public LinkedIn video presentations, carousel PDF documents, and professional media posts.',
    domains: ['linkedin.com'],
    media: ['Professional Video', 'Slide Carousels', 'Document Previews', 'Photos'],
    accentColor: '#0A66C2',
    accentGradient: 'linear-gradient(135deg, #0A66C2, #004182)',
    badgeText: 'Corporate HD',
    status: 'active',
    features: ['High bitrate video output', 'Slide presentation extraction', 'Clean metadata for archival', 'Permission-first compliance'],
    sampleUrls: [
      'https://www.linkedin.com/posts/acme-corp_innovation-tech-activity-7123456789012345678-abcd'
    ],
    defaultFormat: '1080p-video',
    availableFormats: [
      { id: '1080p-video', label: 'HD Presentation Video', quality: '1080p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: '720p-video', label: 'Standard Video', quality: '720p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'linkedin-thumb', label: 'High-Res Presentation Slide', quality: '1920x1080', ext: 'jpg', size: 'Actual size', type: 'image' }
    ],
    faq: [
      { q: 'Can I download videos from private LinkedIn profiles or private company pages?', a: 'No, only public posts accessible without login can be downloaded.' },
      { q: 'Are presentation carousels supported?', a: 'Yes, public slide decks and carousels can be resolved.' }
    ],
    steps: [
      { step: '01', title: 'Copy Post Link', desc: 'Click the three dots (...) on the top-right of any public LinkedIn post and click "Copy link to post".' },
      { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into SocialVideoDownloader to inspect public media.' },
      { step: '03', title: 'Download Video', desc: 'Save the video or presentation directly to your computer or phone.' }
    ]
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    tagline: 'Public Spotlight & Curated Stories',
    description: 'Save public Snapchat Spotlight videos and public story highlights easily in high resolution.',
    domains: ['snapchat.com', 'story.snapchat.com'],
    media: ['Spotlight Videos', 'Public Stories', 'Highlights', 'Snaps'],
    accentColor: '#FFFC00',
    accentGradient: 'linear-gradient(135deg, #FFFC00, #ffe600)',
    badgeText: 'Spotlight HD',
    status: 'conditional',
    features: ['Public Spotlight videos', 'No private snap access (strict privacy compliance)', 'Portrait 9:16 aspect ratio preservation', 'Instant MP4 extraction'],
    sampleUrls: [
      'https://story.snapchat.com/p/abc123xyz/123456789'
    ],
    defaultFormat: '1080p-video',
    availableFormats: [
      { id: '1080p-video', label: 'Spotlight Video (Vertical HD)', quality: '1080x1920', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: '720p-video', label: 'Standard Vertical Video', quality: '720x1280', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'snap-thumb', label: 'Poster Snapshot', quality: '1080x1920', ext: 'jpg', size: 'Actual size', type: 'image' }
    ],
    faq: [
      { q: 'Can I download private Snaps or ephemeral messages?', a: 'Absolutely not. SocialVideoDownloader never accesses private snaps, chat media, or ephemeral content. Only publicly indexed Spotlight videos and public stories are accessible.' },
      { q: 'Does Snapchat notify the creator when a public Spotlight is downloaded?', a: 'No, public Spotlight streams are fetched through public web endpoints.' }
    ],
    steps: [
      { step: '01', title: 'Copy Spotlight Link', desc: 'In Snapchat Spotlight or Web, tap Share and select "Copy Link".' },
      { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the public Snapchat link into the downloader input.' },
      { step: '03', title: 'Download Vertical Video', desc: 'Save the full-quality portrait MP4 video.' }
    ]
  },
  {
    id: 'threads',
    name: 'Threads',
    tagline: 'Threads Videos, Photos & Carousels',
    description: 'Download media from Meta Threads posts including high-resolution images, video clips, and voice notes.',
    domains: ['threads.net', 'threads.com'],
    media: ['Videos', 'Photos', 'Voice Clips', 'Carousels'],
    accentColor: '#ffffff',
    accentGradient: 'linear-gradient(135deg, #111111, #333333)',
    badgeText: 'Threads 1080p',
    // yt-dlp ships no Threads extractor (verified: "Unsupported URL"), so this
    // platform cannot be downloaded despite being listed. Marked conditional so
    // the UI stops presenting it as fully supported.
    status: 'conditional',
    statusNote:
      'No Threads extractor is available in yt-dlp yet, so Threads posts cannot be downloaded at this time.',
    features: ['Clean video extraction', 'Multi-slide image preservation', 'Direct threads.net URL compatibility', 'Fast CDN delivery'],
    sampleUrls: [
      'https://www.threads.net/@zuck/post/CxYz1234567'
    ],
    defaultFormat: '1080p-video',
    availableFormats: [
      { id: '1080p-video', label: 'HD Threads Video', quality: '1080p', ext: 'mp4', size: 'Actual size', type: 'video' },
      { id: 'threads-image', label: 'Original Resolution Photo', quality: '1440x1440', ext: 'jpg', size: 'Actual size', type: 'image' },
      { id: 'threads-audio', label: 'Audio / Voice Note', quality: '192kbps', ext: 'mp3', size: 'Actual size', type: 'audio' }
    ],
    faq: [
      { q: 'Can I download videos from private Threads accounts?', a: 'No, only public posts from public profiles can be retrieved.' },
      { q: 'Are carousel posts supported?', a: 'Yes, you can download all images and video slides from public Threads carousels.' }
    ],
    steps: [
      { step: '01', title: 'Copy Threads Link', desc: 'Click the share icon on the Threads post and tap "Copy Link".' },
      { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the universal or Threads downloader.' },
      { step: '03', title: 'Save Media', desc: 'Select MP4 or JPG and download directly.' }
    ]
  }
]

export function getPlatform(id: string): PlatformConfig | undefined {
  if (id === 'x') id = 'twitter'
  return platforms.find((platform) => platform.id === id)
}