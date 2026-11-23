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
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Bitrate and quality: what to expect</h2>
      <p>
        Audio quality is measured in bitrate — kilobits per second — and the number tells you how
        much detail the file keeps. A 320 kbps MP3 is close to CD quality for most ears, 192 kbps
        is very good, and 128 kbps is acceptable for speech but noticeably flat for music. The
        catch is that extraction cannot improve on the source: if the original video&apos;s audio
        was uploaded at 128 kbps, the extracted MP3 will be 128 kbps no matter what the download
        button promises. A site claiming to &ldquo;upgrade&rdquo; audio to 320 kbps is just
        re-encoding the same limited audio into a larger file. When a choice of bitrates is
        offered, pick the highest — it costs a little more storage and never sounds worse — but
        judge the result by listening, not by the label.
      </p>
      <p>
        The container matters less than people think. MP3 is the universal choice: it plays on
        every phone, car stereo, smart speaker, and editor. M4A (AAC) sounds slightly better at
        the same file size and is the native format for Apple devices, while Opus is excellent
        but less widely supported. If your only goal is listening, MP3 is the safe default. If you
        are editing, prefer the highest-quality stream available in whatever container your editor
        accepts, and export to MP3 only at the end, because every re-encode loses a little detail.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Editing and using extracted audio</h2>
      <p>
        An extracted MP3 is an ordinary audio file, and everything that works on a song works on
        it. Trim it in any audio editor — Audacity is free and does the job on desktop, while
        phone editors like Lexis or WaveEditor handle quick cuts on mobile. Fading the first and
        last second avoids the abrupt clicks that make a ringtone sound homemade. If you are
        making a ringtone, keep it under 30 seconds and export at 192 kbps or higher; both iPhone
        and Android accept MP3 ringtones with a little setup, and the file is small enough to send
        to yourself by email or message.
      </p>
      <p>
        For video editing, extracted audio is a reference track, not a licence. Dropping a
        creator&apos;s soundtrack under your own video is exactly the reuse that copyright
        enforcement targets, and automated systems on YouTube, TikTok, and Instagram detect it
        within minutes of upload. Use extracted audio to study a sound, to practise editing, or
        as a placeholder while you work — and replace it with licensed or original audio before
        you publish. The same applies to podcasts: quoting a short clip for commentary is very
        different from republishing the whole episode&apos;s audio, and only the first is
        defensible.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Podcasts, lectures, and long videos</h2>
      <p>
        Long videos are where audio extraction shines. A two-hour lecture as video can be over a
        gigabyte; as audio it is roughly 100 megabytes at 128 kbps, small enough to keep on a phone
        and listen to on a commute. Download on Wi-Fi, because a long extraction over mobile data
        is slow and a dropped connection means starting over. Once saved, most podcast and audio
        apps will play the MP3, remember your position, and let you speed it up — rename the file
        with the lecture title and date so you can find it again, and keep lectures in their own
        folder, separate from music.
      </p>
      <p>
        Very long videos sometimes split into chapters or segments on the platform, and an
        extractor may return the audio in one file or several, depending on how the platform
        serves it. If you get several files, a free tool like MP3Gain or a simple audio editor can
        join them in order — just check the filenames for sequence numbers first. And if the audio
        stops partway through a long file, the download was probably interrupted: delete it and
        download again on a stable connection rather than assuming the original video is broken.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Frequently asked questions</h2>
      <p>
        <strong>Can I extract audio from a video with copyrighted music?</strong> You can extract
        it for private listening, but you may not reuse the music in your own public content. The
        music&apos;s licence belongs to its rights holder, and extraction does not transfer it.
      </p>
      <p>
        <strong>Why is the MP3 quieter than the video?</strong> Some platforms normalise audio
        differently for streaming and download. If the file sounds quiet, raise the volume in your
        editor or player rather than re-downloading — the audio is all there, just at a lower
        level. A free normaliser like MP3Gain can even out the volume without re-encoding.
      </p>
      <p>
        <strong>What if the video has no audio track?</strong> Silent videos — GIFs, muted clips,
        slideshows — have nothing to extract, and the extractor will say so or return an empty
        file. Check whether the original video plays sound on its platform before retrying.
      </p>
      <p>
        <strong>Is MP3 the best format for editing?</strong> For final listening, yes. For editing,
        a lossless format like WAV preserves more detail through multiple edits, but the source
        audio was already compressed when it was uploaded, so converting an extracted MP3 to WAV
        adds nothing. Edit the MP3 directly and export once.
      </p>
      <p>
        <strong>Can I listen offline to extracted podcast audio?</strong> Yes. Save the MP3 to
        your phone and play it in any audio app. It will not appear in your podcast app&apos;s
        subscriptions, because it is a file, not a feed — but most audio apps remember playback
        position for local files too.
      </p>
    </GuideLayout>
  )
}
