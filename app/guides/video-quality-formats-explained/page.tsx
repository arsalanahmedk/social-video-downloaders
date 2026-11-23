import type { Metadata } from 'next'
import { GuideLayout } from '../guide-layout'

export const metadata: Metadata = {
  title: 'Video Quality and Formats Explained',
  description:
    'What 1080p, 720p and 360p really mean, how MP4, MP3, JPG and M4A differ, and how to pick the right quality and format for every download — phone, editing, or archive. File sizes, bitrate, and the quality traps to avoid.',
  alternates: { canonical: '/guides/video-quality-formats-explained' },
}

export default function GuidePage() {
  return (
    <GuideLayout
      title="Video Quality and Formats Explained"
      description="Every download page offers a list of formats and qualities, and the labels are rarely explained: 1080p, 720p, MP4, MP3, bitrate, container. This guide explains what each choice actually means for the file you get, how big it will be, and which one to pick for watching, editing, or archiving."
      currentSlug="video-quality-formats-explained"
    >
      <p>
        Download pages present you with a menu — 1080p, 720p, 360p, MP4, MP3, sometimes a
        half-dozen variants with cryptic labels — and expect you to choose in seconds. Most people
        click the biggest number and hope for the best, which is usually right but sometimes
        wasteful, and occasionally wrong. The labels describe three different things that get
        mixed together: resolution (how many pixels), container (the file format), and bitrate
        (how much data per second). Understanding the difference takes five minutes and saves
        you from downloading gigabyte files you did not need, or small files that look terrible
        on the screen you actually watch on.
      </p>
      <p>
        The one rule that governs everything in this guide is simple: a download can never be
        better than the source. Platforms compress every upload, and the file you download is the
        compressed version the platform serves to viewers — not the creator&apos;s original. A
        higher quality option gives you more of what the platform kept, never more than the
        platform kept. Keep that in mind and every other choice in this guide falls into place.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Resolution: 1080p, 720p, 480p, and 360p</h2>
      <p>
        Resolution is the size of the picture, measured in pixels. 1080p means 1920 pixels wide
        and 1080 tall for a landscape video, or 1080 wide and 1920 tall for a vertical one — the
        &ldquo;p&rdquo; stands for progressive scan and is a leftover from television, but the
        number is the height in pixels. 720p is 1280 by 720 (or 720 by 1280 vertical), 480p is 854
        by 480, and 360p is 640 by 360. Each step down roughly halves the amount of picture
        detail, and also roughly halves the file size. On a phone screen, held at normal distance,
        most people cannot tell 1080p from 720p. On a television or a monitor, the difference is
        obvious. On a phone, 360p looks soft but watchable; on a television it looks like a
        watercolour.
      </p>
      <p>
        Match the resolution to the screen. Phone-only viewing: 720p is the sweet spot, sharp
        enough and half the size of 1080p. Editing, archiving your own work, or watching on a
        large display: always take 1080p, because every edit, crop, or zoom after the download
        throws away detail, and starting from the largest file gives you the most to work with.
        Scarce data or nearly full storage: 480p or 360p, and accept the softness. There is no
        4K option for social media downloads, because the platforms do not serve social videos
        above 1080p — any site promising 4K from Instagram, TikTok, or X is upscaling the same
        1080p file, which adds size without adding detail.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Containers: MP4, MP3, M4A, and JPG</h2>
      <p>
        The file extension names the container — the wrapper that holds the video or audio — not
        the quality. MP4 is the universal video container: it plays on every phone, computer,
        television, and editor, and it is the default choice for video downloads everywhere. MP3
        is the universal audio container: it plays on every music app, car stereo, and smart
        speaker, and it is the default choice when you only want sound. M4A is audio in an MP4
        wrapper, common on Apple devices, slightly better quality than MP3 at the same size, but
        less universal. JPG is the standard photo format: every image download from a social
        platform arrives as a JPG, because that is what the platforms serve.
      </p>
      <p>
        Inside the container sit the codecs — the actual compression methods for picture and
        sound. The common video codec is H.264, which everything supports; the newer AV1 and VP9
        codecs compress better but are less widely supported and rarely offered for social
        downloads. The common audio codec inside an MP4 is AAC, while an MP3 file uses the MP3
        codec by definition. You almost never need to choose a codec — the downloader picks the
        one the platform served, and changing it means re-encoding, which loses quality. Choose
        the container that fits your purpose (MP4 for video, MP3 for audio, JPG for photos) and
        leave the codec alone.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Bitrate and file size</h2>
      <p>
        Bitrate is how much data the file uses per second, and it is the real determinant of
        quality once resolution is fixed. Two 1080p files can look very different if one uses
        twice the bitrate of the other: the higher-bitrate file keeps more detail in fast
        movement, gradients, and fine textures like hair and foliage, while the lower-bitrate
        file smears them into blocks. Platforms set the bitrate when they compress uploads, and
        the downloader preserves it — so the file size of a download is a useful clue. A minute
        of 1080p video at typical social-media bitrates is 10 to 25 megabytes; if your minute of
        1080p is only 3 megabytes, the platform compressed it hard and it will look soft no
        matter what the label says.
      </p>
      <p>
        For audio, bitrate is measured in kilobits per second: 320 kbps is near-CD quality, 192
        kbps is very good, 128 kbps is fine for speech but flat for music. A minute of 128 kbps
        audio is about one megabyte; at 320 kbps it is about two and a half. The same rule
        applies as for video: extraction cannot improve on the source, so an audio stream
        uploaded at 128 kbps stays at 128 kbps however it is labelled. When a choice is offered,
        take the highest bitrate — it never sounds worse and costs little extra storage — but
        judge the result by listening, not by the number.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Frame rate: 30fps vs 60fps</h2>
      <p>
        Frame rate is how many pictures per second the video contains. Most social video runs at
        30 frames per second, which looks natural for talking, vlogging, and everyday footage.
        Sports, dance, and fast camera work are often uploaded at 60 frames per second, which
        looks noticeably smoother — motion stays sharp instead of blurring. When a downloader
        offers two variants at the same resolution, the larger file is usually the 60fps one. Take
        it when the content moves fast or you plan to slow the footage down in an edit; for
        ordinary talking-head video, 30fps is fine and the file is smaller.
      </p>
      <p>
        Frame rate interacts with resolution in one confusing way: some platforms serve 720p at
        60fps and 1080p at 30fps for the same video. Neither is strictly better. For fast action,
        the 720p60 version often looks better in motion despite the lower resolution, because
        smoothness matters more than sharpness when things move. For a mostly static video — a
        lecture, a slideshow, a talking head — the 1080p30 version wins, because detail matters
        more than smoothness. If you are unsure, download the 1080p version first: it is the
        safer default, and you can always get the other one later.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Choosing for watching, editing, or archiving</h2>
      <p>
        For watching on your phone: 720p MP4, or 480p if data is tight. It looks sharp on a small
        screen, downloads quickly, and a hundred videos fit in a few gigabytes. For watching on a
        television or monitor: 1080p MP4, ideally the highest-bitrate variant, because the big
        screen shows every compression artefact. For editing: 1080p MP4 at the highest bitrate and
        frame rate available, and keep the original download untouched while you edit a copy —
        every export loses a little quality, so starting from the best file matters more than any
        editor setting. For archiving your own work: 1080p MP4 plus the original file from your
        camera or editor if you still have it, because the platform-compressed download is a
        fallback, not a master copy.
      </p>
      <p>
        For audio-only purposes — music, podcasts, lectures, ringtones — MP3 at the highest
        bitrate offered, and do not worry about the video resolution at all. For photos and
        thumbnails: JPG at the largest size offered, because downscaling later is easy and
        upscaling is impossible. And for sharing: match the destination. Messaging apps compress
        everything they receive, so sending a 1080p file through WhatsApp wastes your data for
        no benefit — send 720p, or send the file as a document if the app supports it and
        quality matters.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Quality traps to avoid</h2>
      <p>
        The most common trap is the &ldquo;4K&rdquo; or &ldquo;HD+&rdquo; button. Social
        platforms do not serve these videos above 1080p, so a 4K download is an upscaled 1080p
        file: four times the pixels, none of them new, and a file several times larger for no
        visible gain. The second trap is the &ldquo;enhanced&rdquo; or &ldquo;AI upscaled&rdquo;
        download, which runs the video through a sharpening filter. It can look superficially
        crisper on a thumbnail, but it invents detail that was never there, and it often adds
        halos and artefacts around edges. The third trap is re-encoding: converting an MP4 to a
        different format, or an MP3 to a higher bitrate, always loses quality, because the
        converter throws away information to fit the new format. Download in the format you need
        and convert only once, at the end, if you must.
      </p>
      <p>
        The final trap is judging quality by file size alone. A large file can be large because
        the video is long, noisy, or full of grain — not because it is sharp. And a small file
        can be small because it is short, simple, and clean. Compare files of the same video at
        different qualities, not different videos against each other, and trust your eyes at full
        screen more than any number on the download page.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Frequently asked questions</h2>
      <p>
        <strong>What is the best quality I can download?</strong> 1080p, for every platform this
        site supports. That is the highest resolution the platforms serve for social video, and
        the download matches it exactly.
      </p>
      <p>
        <strong>Why is my 1080p download blurry?</strong> Because the original upload was blurry,
        shaky, or heavily compressed by the platform. The download preserves the platform&apos;s
        version faithfully — including its flaws. Try the highest-bitrate variant if more than
        one is offered.
      </p>
      <p>
        <strong>MP4 or MOV — which should I choose?</strong> MP4, always, for downloads. MOV is
        Apple&apos;s editing container and offers no quality advantage for a file that started
        life as a social video. MP4 plays everywhere; MOV sometimes does not.
      </p>
      <p>
        <strong>How big will my download be?</strong> Roughly: a minute of 1080p video is 10 to
        25 megabytes, 720p is half that, and an MP3 of the same minute is 1 to 2.5 megabytes. A
        photo is usually a few hundred kilobytes. Long videos multiply accordingly — check your
        free storage before downloading an hour of HD.
      </p>
      <p>
        <strong>Can I convert a download to a higher quality later?</strong> No. Conversion only
        ever reduces quality or keeps it the same. Download at the highest quality available
        first time, and keep that file as your master copy.
      </p>
      <p>
        <strong>Does the audio quality differ between MP4 and MP3 downloads?</strong> No. Both
        carry the same audio stream the platform served. The MP3 is simply the audio without the
        picture, in a smaller file. If the MP3 sounds worse than the video, the extraction
        missed the best audio variant — try again.
      </p>
    </GuideLayout>
  )
}
