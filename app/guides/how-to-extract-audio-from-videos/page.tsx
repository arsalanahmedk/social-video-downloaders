import type { Metadata } from 'next'
import { GuideLayout } from '../guide-layout'

export const metadata: Metadata = {
  title: 'How to Extract Audio from Videos (MP3)',
  description:
    'Step-by-step guide to extracting audio from a public video as an MP3: paste the link, choose MP3, and save the sound on phone or desktop — plus bitrate, uses, and what cannot be extracted.',
  alternates: { canonical: '/guides/how-to-extract-audio-from-videos' },
}

export default function GuidePage() {
  return (
    <GuideLayout
      title="How to Extract Audio from Videos (MP3)"
      description="Sometimes the sound is the part you want — a song, a lecture, a podcast episode, a voiceover in a video. This guide shows how to save just the audio from a public video as an MP3 file, and when you should not."
      currentSlug="how-to-extract-audio-from-videos"
    >
      <p>
        A video file carries two things: pictures and sound. When you only need the sound,
        downloading the whole video wastes storage and data. An MP3 of the audio is a fraction of
        the size — ten minutes of speech is roughly ten megabytes as an MP3, against hundreds of
        megabytes as a 1080p video — and it plays in your phone&apos;s music app, a podcast player,
        a car stereo, or any device with a headphone socket. The audio extractor on
        SocialVideoDownloader takes a public video link and returns just the audio track as an MP3,
        with no install and no account.
      </p>
      <p>
        The rule first, because it decides everything else. Only public videos can be used: a
        private video has no public audio to extract. The audio belongs to the person who made it,
        so extracting a song to listen to yourself is one thing, and re-uploading it as your own is
        another — reposting someone else&apos;s music or voiceover without permission can get your
        own account restricted. Licensed music and DRM-protected content are out of scope, and if
        you plan to reuse the audio anywhere, ask the creator first.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 1: Copy the video link</h2>
      <p>
        Copy the link exactly as you would for a video download. Open the video, tap the share
        button and choose &ldquo;Copy link&rdquo;, or copy the address from the browser bar on
        desktop. The extractor works from the same links the downloader accepts — YouTube,
        Instagram, TikTok, Facebook, X and others — so a link that works for the video will work for
        the audio. Make sure the video is public: a private video, a friends-only post, or a video
        in a private group has no public audio to extract, and that is the platform working as
        intended.
      </p>
      <p>
        If the video is a long one — a lecture, a podcast episode, a livestream recording — the
        whole link is still just the one link, and the extractor will return the whole audio track.
        You can trim it afterwards in your phone&apos;s editor or a free audio app if you only need
        a short part. There is no need to copy a link with a timestamp: timestamps tell the player
        where to start, but the extracted file is the full audio from the beginning.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 2: Paste the link and choose MP3</h2>
      <p>
        Paste the link into the audio extractor at /audio-extractor. After a few seconds you will
        see the audio options, usually an MP3 at one or two bitrates. Pick MP3: it plays on
        practically every device made in the last twenty years, from a phone to a car stereo to a
        smart speaker. Do not pay for the extraction, and do not install an app or extension — a
        browser-based extractor should work with no account and no installation. If a site asks for
        either, close it and use a different one.
      </p>
      <p>
        Save the file and rename it straight away, because the default name is usually the video
        ID or a generic title. A useful name includes the creator and the topic — for example,
        &ldquo;creatorname-history-lecture.mp3&rdquo;. On iPhone, Safari saves to the Downloads
        folder in the Files app; on Android it goes to Downloads and appears in your notifications;
        on a computer it lands in your browser&apos;s download folder, ready to drop into a music
        app or a podcast player.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Why audio-only is smaller, and when it matters</h2>
      <p>
        Video is most of the file size. A ten-minute video at 1080p can be several hundred
        megabytes, while the same ten minutes as an MP3 is roughly ten to fifteen megabytes at 128
        kbps. On a phone with limited storage, or on mobile data, that difference matters. Collecting
        lectures, language lessons or podcast episodes as audio is the obvious use: the picture adds
        nothing, and the files are small enough to keep dozens of them. The same applies to
        interviews and voice notes posted as video — the sound is the content.
      </p>
      <p>
        A note on bitrate, because it decides both size and sound quality. 128 kbps is fine for
        speech — lectures, podcasts, interviews — and it keeps files small. 192 to 256 kbps sounds
        noticeably better for music, and is worth the larger file if you are keeping a song. There is
        no point picking a bitrate higher than the source audio: a video whose audio was uploaded at
        128 kbps will not sound better as a 320 kbps MP3, it will only be a bigger file with the
        same sound. If the extractor offers one bitrate, take it; if it offers two, choose by
        whether the audio is speech or music.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">What people use extracted audio for</h2>
      <p>
        Music is the most common use: a song from a video you like, kept for personal listening on
        a device without the video app. Podcasts and talks are next — episodes posted as video, but
        listened to as audio on a walk or a drive. Lectures and lessons work the same way: language
        practice, revision, or a class recording you want to listen to again without watching the
        screen. A short clip can also become a ringtone or an alarm sound, trimmed in your
        phone&apos;s editor or a free audio app.
      </p>
      <p>
        For your own videos, the extractor is also a quick way to pull the audio track out of a clip
        you uploaded — for example to reuse a voiceover in a new edit, or to keep the audio of a
        call or interview you recorded. And if you make videos yourself, extracting the audio of
        your own uploads is a simple way to check how your voiceover sounds on its own, without
        the pictures distracting you. In every case the same rule applies: keep your own audio
        freely, and ask before you reuse someone else&apos;s.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">When audio cannot be extracted</h2>
      <p>
        Videos with certain licensed music or DRM protection may block extraction: the platform
        restricts those at the source, and no extractor can fetch what the platform does not serve
        publicly. Private videos fail the same way — there is no public link, so there is no public
        audio — and deleted videos are gone entirely. A live stream that is still running cannot be
        extracted yet either: it is a stream, not a file, so wait until the broadcast ends and is
        saved as a regular video, then use that link.
      </p>
      <p>
        If a public video fails, check the link first. Open it in a private browser window: if the
        platform shows the video there without asking you to sign in, the link is good and the
        problem is elsewhere. Re-copy the link from the playing video rather than from a preview,
        and make sure you copied the post with the video rather than a quote post or a playlist. If
        every extraction fails at once, try mobile data instead of a school or office network, which
        sometimes blocks extractor domains, and wait an hour before retrying — platforms change
        their systems regularly, and an extractor that worked yesterday can need a short while to
        adapt.
      </p>
    </GuideLayout>
  )
}
