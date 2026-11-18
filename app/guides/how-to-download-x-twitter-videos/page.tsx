import type { Metadata } from 'next'
import { GuideLayout } from '../guide-layout'

export const metadata: Metadata = {
  title: 'How to Download X (Twitter) Videos',
  description:
    'Step-by-step guide to downloading public X (Twitter) videos as MP4 on phone and desktop: copy the post link, paste it into a downloader, pick a quality — plus GIFs, protected accounts and troubleshooting.',
  alternates: { canonical: '/guides/how-to-download-x-twitter-videos' },
}

export default function GuidePage() {
  return (
    <GuideLayout
      title="How to Download X (Twitter) Videos"
      description="X is built around short posts, and video is a big part of it — sports clips, news moments, creator edits. Bookmarking a post saves it inside X, not as a file. This guide shows how to save a public X video as an MP4, how GIFs differ, and where the limits are."
      currentSlug="how-to-download-x-twitter-videos"
    >
      <p>
        X — still widely called Twitter — runs on short posts, and a large share of them carry
        video: a goal from last night&apos;s match, a news clip, a funny edit, a trailer. The X app
        lets you bookmark a post or like it, but a bookmark is not a file. It lives inside X, it
        disappears if the post is deleted, and you cannot edit it or watch it on a plane without a
        connection. To keep the video itself — to edit a clip into your own video, to watch it
        offline, or to save a copy of a video you posted — you need the MP4 file, and that is what
        this guide covers.
      </p>
      <p>
        The rule first, because it decides everything else. A video posted by a public account can
        be downloaded for personal offline use. A video from a protected account cannot — and should
        not — be fetched through a public link, because the account owner chose exactly who may see
        it. The same applies to clips you do not have the rights to: saving a clip for yourself is
        one thing, reposting it as your own is another, and re-uploading someone else&apos;s video
        can get your own account restricted. Download for yourself, and ask before you reuse.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 1: Copy the post link</h2>
      <p>
        Open the post that contains the video. In the X app, tap the share icon — the arrow pointing
        up out of a box on iPhone, or the share arrow on Android — and choose &ldquo;Copy
        link&rdquo;. The link looks like x.com/username/status/ followed by a long number. On
        desktop, open the post and copy the address from the browser bar while the video is playing.
        Be careful with links copied from a timeline preview or from an embedded post on another
        website: they sometimes point at the wrong thing, so open the post itself first and then
        copy.
      </p>
      <p>
        A video post&apos;s link is the same as any other post link; there is nothing special about
        it. If the post is a quote post, make sure you copy the link of the post that actually
        contains the video, not the post quoting it. The video lives in the original post, and a
        link to the quote will not give the downloader the video to fetch. The same applies to a
        video inside a thread: copy the link of the individual post with the video, not the first
        post of the thread.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 2: Paste the link and pick a quality</h2>
      <p>
        Paste the link into the downloader on SocialVideoDownloader, or use the dedicated X video
        page at /twitter-video. After a few seconds you will see the MP4 options X makes available
        for that clip — usually a few resolutions, from a small file around 480p up to 720p or
        1080p if the original was uploaded in high quality. Pick the one that fits what you need:
        the highest quality for editing, a smaller one if you are short on storage or on mobile
        data.
      </p>
      <p>
        X videos are usually short, so even the high-quality file is not huge — a 30-second clip at
        720p is typically a few megabytes. That makes them easy to keep, but it also means a file
        much larger than expected is worth a second look: check that the extension is .mp4 and the
        size is in the range you expect before you open it. Do not pay for a download, and do not
        install an app or extension to do this — a browser-based downloader should work with no
        account and no installation. If a site asks for either, close it and use a different one.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 3: Save the file on phone or desktop</h2>
      <p>
        Download the file and rename it straight away. A useful name includes the poster&apos;s
        handle and a few words about the clip — for example,
        &ldquo;handle-goal-celebration.mp4&rdquo; — because X&apos;s post numbers mean nothing when
        you are searching your downloads folder a month later. On iPhone, Safari saves to the
        Downloads folder in the Files app; open the share sheet and choose &ldquo;Save
        Video&rdquo; to move it into Photos. On Android it goes to Downloads and appears in your
        notifications. On a computer it lands in your browser&apos;s download folder, ready to drop
        into an editor.
      </p>
      <p>
        Watch the whole file once. X clips are short, so this takes seconds, and it catches the two
        common problems: a file that stops halfway because the connection dropped, and an audio
        track that is out of sync. If either happens, delete the file and download it again on a
        stable Wi-Fi connection. Keep a note of the original post link next to the file if you plan
        to credit the creator later — a small text file with the link is enough, and it will save
        you an argument about where the clip came from.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Videos, GIFs and live broadcasts</h2>
      <p>
        Not everything that moves on X is a video file. X also has GIFs — short looping animations
        that are technically video files on X&apos;s servers, served in MP4 format. The
        downloader&apos;s X page handles both: a GIF post will usually offer an MP4 download, which
        you can keep as a small video or convert to a GIF later if you need the looping format.
        Some tools offer a GIF option directly, and the /twitter-gif page is there for that. Video
        replies and quote posts with video work the same way — if the post is public and the media
        is a video, the link gives you the file.
      </p>
      <p>
        What you will not get is a video from a Space or a live broadcast that is still running.
        Those are streams, not files, and they can only be downloaded once the broadcast ends and X
        saves it as a regular video post. If you are trying to save a live broadcast, wait until it
        finishes, open the saved post, and copy that link instead. The same applies to a video that
        is still being processed after upload — X shows it, but the file is not ready to fetch yet,
        so give it a few minutes and try again.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">When a video will not download</h2>
      <p>
        Protected accounts are the most common reason. If an account is protected, only its approved
        followers can see its posts, and a public downloader cannot fetch them — that is the account
        working as intended, not a bug. Deleted posts fail the same way: once the post is gone, the
        video is gone with it. Login-walled posts — ones X only shows after you sign in — may also
        fail, because the downloader cannot sign in as you, and it should not ask for your login
        details. Never give your X password to a downloader site.
      </p>
      <p>
        If a public post fails, check the link first. Open it in a private browser window: if X
        shows the video there without asking you to sign in, the link is good and the problem is
        elsewhere. If the post is a quote post, copy the original post&apos;s link instead. If every
        X video fails at once, try mobile data instead of a school or office network, which
        sometimes blocks downloader domains, and wait an hour before retrying — X changes its
        systems regularly, and a downloader that worked yesterday can need a short while to adapt.
      </p>
    </GuideLayout>
  )
}
