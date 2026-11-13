import type { Metadata } from 'next'
import { GuideLayout } from '../guide-layout'

export const metadata: Metadata = {
  title: 'How to Download YouTube Shorts | SocialVideoDownloader',
  description:
    'Step-by-step guide to downloading YouTube Shorts as MP4 or MP3 on phone and desktop: copy the Short link, paste it into a downloader, pick a format — plus YouTube Premium, offline rules and troubleshooting.',
  alternates: { canonical: '/guides/how-to-download-youtube-shorts' },
}

export default function GuidePage() {
  return (
    <GuideLayout
      title="How to Download YouTube Shorts"
      description="YouTube Shorts are vertical videos under three minutes, and YouTube's own app only lets you save them for offline viewing inside YouTube — not as files you can edit or move. This guide shows how to save a public Short as an MP4 or MP3, when YouTube Premium is the better option, and what the rules actually allow."
      currentSlug="how-to-download-youtube-shorts"
    >
      <p>
        Shorts look simple — a vertical video, a swipe, the next one — but they are ordinary YouTube
        videos underneath, which means the same download options apply. YouTube offers an official
        way to watch offline: YouTube Premium lets you download videos inside the YouTube app, and
        they stay there for as long as your subscription is active. That is the right choice if you
        only want to watch on the train or on a flight. It is not the right choice if you need the
        file itself — to edit a clip into your own video, to keep a backup of a Short you uploaded,
        or to listen to the audio on a device without the YouTube app. For that, you need the MP4
        file, and that is what this guide covers.
      </p>
      <p>
        The rules here are stricter than on some other platforms, so read this part carefully. A
        Short you uploaded yourself is yours to download and reuse however you like. A Short someone
        else made belongs to them, and downloading it for personal offline viewing is a different
        thing from re-uploading it to your own channel. Re-uploading another creator&apos;s Short —
        even with a small edit — is the fastest way to get a copyright strike, and three strikes
        close a channel. Download for yourself, and ask before you reuse.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 1: Copy the Short link</h2>
      <p>
        Open the Short in the YouTube app or on youtube.com. Tap the share button — the curved arrow
        on the right-hand side on mobile — and choose &ldquo;Copy link&rdquo;. The link looks like
        youtube.com/shorts/ followed by an eleven-character video ID. On desktop, you can also copy
        the address from the browser bar while the Short is playing. Be careful with links copied
        from the Shorts shelf on a channel page: they sometimes point to the channel rather than to
        the individual Short, so open the Short first and then copy.
      </p>
      <p>
        If the Short is part of a playlist or a channel trailer, the link may carry extra parameters
        after the video ID, such as a playlist reference. Those are usually harmless, but the cleanest
        link is the short one: youtube.com/shorts/ plus the video ID and nothing else. You can also
        find it by tapping share and then copying from the share sheet rather than from a message
        preview, which sometimes truncates the address.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 2: Paste the link and pick a format</h2>
      <p>
        Paste the link into the downloader on SocialVideoDownloader, or use the dedicated YouTube
        Shorts page. After a few seconds you will see the formats YouTube makes available for that
        Short: usually an MP4 video at 720p or 1080p, and an audio-only MP3 option. Shorts are shot
        vertically, so the file will be tall and narrow — 1080 by 1920 pixels for a full-HD Short —
        which is exactly what you want for editing in a vertical project or posting to another
        short-form platform.
      </p>
      <p>
        Choose MP4 if you want the video, and MP3 if you only need the sound: a song, a spoken-word
        clip, or a sound effect from the Short. MP3 files are a fraction of the size of the video,
        which matters if you are collecting audio references on a phone with limited storage. Do not
        pay for a download, and do not install an app or extension to do this — a browser-based
        downloader should work with no account and no installation. If a site asks for either, close
        it and use a different one.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 3: Save and organise the file</h2>
      <p>
        Download the file and rename it straight away. A useful name includes the creator&apos;s
        channel name and a few words about the content — for example,
        &ldquo;creatorname-how-to-tie-a-tie.mp4&rdquo; — because YouTube&apos;s video IDs mean nothing
        when you are searching your downloads folder a month later. On iPhone, Safari saves to the
        Downloads folder in the Files app; move it to Photos from the share sheet if you want it in
        your camera roll. On Android it goes to Downloads and appears in your notifications. On a
        computer it lands in your browser&apos;s download folder, ready to drop into an editor.
      </p>
      <p>
        Watch the whole file once. Shorts are short, so this takes seconds, and it catches the two
        common problems: a file that stops halfway because the connection dropped, and an audio track
        that is out of sync. If either happens, delete the file and download it again on a stable
        Wi-Fi connection. Keep your own Shorts in a separate folder from other creators&apos; clips,
        and keep a note of where each clip came from — a text file with the original YouTube link next
        to the download is enough, and it will save you an argument later about whether you had
        permission to use it.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">YouTube Premium vs downloading the file</h2>
      <p>
        It is worth comparing the two options honestly. YouTube Premium costs a monthly subscription
        and lets you download videos inside the YouTube app for offline viewing, with no ads, and
        with background play. The downloads are encrypted, they expire if your subscription lapses,
        and you cannot move them to an editor or another device. Downloading the MP4 file gives you
        a normal video file you own and control — you can edit it, back it up, and play it anywhere —
        but it does not support the creator through a subscription, and YouTube&apos;s terms of
        service do not endorse downloading videos outside the app.
      </p>
      <p>
        For your own uploads, there is a third option that is better than both: YouTube Studio lets
        you download your own videos in their original quality, straight from your channel dashboard.
        If you are the creator, use that first — it gives you the exact file you uploaded, with no
        recompression. The downloader in this guide is for the cases YouTube Studio does not cover:
        a Short you want for offline viewing on a device without the app, or a clip you have
        permission to reuse.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">When a Short will not download</h2>
      <p>
        Private and unlisted videos cannot be downloaded through a public link, because the link
        itself is the access control — unlisted videos are only visible to people who have the exact
        link, and private videos only to people the owner chose. Age-restricted videos, and videos
        with certain licensed music, may also be blocked: YouTube restricts those at the source, and
        no downloader can fetch what YouTube does not serve publicly. If the Short was deleted or
        made private after you copied the link, the download will fail, and the link will show an
        error on YouTube itself.
      </p>
      <p>
        A common fixable problem is a copied link that points to the wrong thing — a channel page, a
        playlist, or the YouTube homepage — because the share button was tapped from a preview rather
        than from the playing Short. Open the Short, let it play, and copy the link again. If every
        Short fails at once, check your connection and try mobile data instead of a school or office
        network, which sometimes blocks downloader domains. And remember that YouTube changes its
        systems regularly; a downloader that worked yesterday can need a short while to adapt, so
        waiting an hour before retrying is a reasonable first step.
      </p>
    </GuideLayout>
  )
}
