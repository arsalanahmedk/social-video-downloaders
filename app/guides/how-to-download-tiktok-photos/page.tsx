import type { Metadata } from 'next'
import { GuideLayout } from '../guide-layout'

export const metadata: Metadata = {
  title: 'How to Download TikTok Photo Posts',
  description:
    'Save the images from a public TikTok photo post or carousel as JPG files on iPhone, Android and desktop: copy the photo link, paste it into the downloader, and download every slide. Includes what to do when a carousel only partly loads.',
  alternates: { canonical: '/guides/how-to-download-tiktok-photos' },
}

export default function GuidePage() {
  return (
    <GuideLayout
      title="How to Download TikTok Photo Posts"
      description="Not everything on TikTok is a video. Photo posts — carousels of still images, often set to music — are a large share of what creators publish, and they download far more reliably than TikTok videos. This guide shows how to save every image from a public photo post as a JPG file, on your phone or computer."
      currentSlug="how-to-download-tiktok-photos"
    >
      <p>
        TikTok started as a video app, but photo posts have become one of its most popular formats.
        A creator uploads several still images, TikTok plays them as a swipeable carousel with a
        soundtrack, and viewers tap through them like a slideshow. Travel photographers post
        location sets, artists post process shots, and businesses post product ranges — all in a
        format that looks like a video in the feed but is really a stack of photographs. Because
        the images are stills, they are also the part of TikTok that downloads most reliably: a
        photo post is fetched through a different route from a video, one that TikTok does not
        block in the same way, so photo links usually resolve on the first try while video links
        often fail.
      </p>
      <p>
        Before you start, the same rule applies as everywhere else: only download photo posts that
        are public, and only use the images in ways the creator would accept. A photo post from a
        private account cannot be downloaded, and downloading someone&apos;s photographs does not
        give you the right to republish them. Photographers in particular make their living from
        these images, so keep them for personal reference unless you have permission to do more.
        If you want to feature a creator&apos;s photos publicly, ask them and credit them — most
        are glad to be asked.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 1: Copy the photo post link</h2>
      <p>
        Open TikTok and find the photo post. You can tell it is a photo post rather than a video
        because it shows a photo icon, the images advance when you swipe, and there is usually a
        row of dots or a counter like &ldquo;1/6&rdquo; showing how many slides there are. Tap the
        share arrow on the right-hand side, then tap &ldquo;Copy link&rdquo;. The link looks like
        tiktok.com/@username/photo/ followed by a long number — the word &ldquo;photo&rdquo; in the
        address is how you know you have the right kind of link. If the link says
        &ldquo;video&rdquo; instead, you are looking at a video post, and the steps in our TikTok
        video guide apply instead.
      </p>
      <p>
        You can also copy the link from a desktop browser: open the photo post on tiktok.com and
        copy the address from the address bar. This is often the most reliable method, because the
        desktop page gives you the full link rather than a shortened one. Links copied from a
        direct message, a comment, or a shared chat sometimes point to a different page than the
        post itself, so if a link fails, go back to the post and copy it directly. And make sure
        the post is public: if you can only see it because you follow a private account, no
        legitimate downloader will be able to fetch it.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 2: Paste the link and pick the images</h2>
      <p>
        Go to SocialVideoDownloader and paste the copied link into the box at the top of the
        homepage, then press the download or extract button. After a few seconds the tool lists
        the images it found in the post — usually one entry per slide in the carousel, each as a
        JPG file at the resolution TikTok serves. A six-slide carousel gives you six images. The
        list may also include a slideshow-style video version of the post, which TikTok generates
        automatically; if you only want the still photographs, ignore the video entry and choose
        the JPG files.
      </p>
      <p>
        Download the slides you actually want. You can usually download them one at a time, which
        is worth doing when a carousel has ten slides and you only need three of them — it saves
        time and storage. The images arrive at TikTok&apos;s full display resolution, typically
        1080 pixels on the long side, which is sharp on a phone and good enough for reference
        boards, wallpapers, and design work. If an image looks soft, it was probably uploaded
        soft: TikTok compresses uploads, and no downloader can restore detail that was removed
        before the post went up.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Step 3: Save the files and keep them organised</h2>
      <p>
        On iPhone, Safari saves each JPG to the Downloads folder in the Files app. Open Files, tap
        the image, tap the share button, and choose &ldquo;Save Image&rdquo; to move it into
        Photos, where it appears in your camera roll. On Android, Chrome saves to the Downloads
        folder and shows a notification; your gallery app will usually find the images on its own,
        and if it does not, move them into the Pictures folder with your file manager. On desktop,
        the files land in your browser&apos;s download folder. Rename them immediately — a set
        called &ldquo;tokyo-street-1.jpg&rdquo; through &ldquo;tokyo-street-6.jpg&rdquo; stays
        useful, while six files named after long strings of numbers becomes a puzzle within a
        week.
      </p>
      <p>
        Keep each carousel together. Save all the slides from one post in a single folder named
        after the creator and the subject, so the set stays in order and you can tell at a glance
        which images belong together. If you plan to use the images as reference for a project,
        keep a note of the source link in the same folder — a small text file with the post URL
        and the creator&apos;s username is enough. That note is your credit trail, and it answers
        the two questions you will ask later: where did this come from, and may I use it.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Photo posts vs videos: why photos work better here</h2>
      <p>
        The difference in reliability comes down to how TikTok serves the two formats. TikTok
        video streams are protected by systems that aggressively reject requests from cloud server
        addresses — the addresses web-based downloaders run on — so video links frequently return
        errors even when the same video plays fine in your browser. Photo posts are served through
        a simpler image pipeline that does not apply the same blocking, so the same downloader, on
        the same server, resolves photo links consistently. This is a property of TikTok&apos;s
        infrastructure, not of any particular tool, and it is why a photo post that downloads in
        seconds can sit next to a video post that fails repeatedly.
      </p>
      <p>
        There is one more difference worth knowing: a photo post sometimes includes a short video
        version that TikTok builds from the slides, complete with the soundtrack. That video
        version is subject to the same blocking as any other TikTok video, so if the JPG images
        resolve but the video entry fails, that is expected — take the images, which are the real
        content of the post anyway. And if a photo post fails entirely, check the basics first:
        the post may have been deleted, the account may have gone private, or the link may point
        to a different post than you intended. Open the link in a private browser window: if
        TikTok shows the post there, the link is public and valid, and trying again later is
        worthwhile.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Quality, slideshows, and music</h2>
      <p>
        The JPG files you download are the images TikTok displays, at display resolution — sharp
        on screens, good for wallpapers and reference, but not the full resolution of the
        photographer&apos;s camera. TikTok compresses every upload, so a photo that started as a
        24-megapixel camera file arrives as a compressed image of a few hundred kilobytes. That is
        plenty for a phone background or a mood board, and not enough for a large print. If you
        need print quality, find the creator&apos;s own portfolio or shop — the TikTok post
        usually links to it — and get the original there.
      </p>
      <p>
        The music on a photo post does not come with the images. TikTok plays a soundtrack over
        the slideshow, but the JPG files are silent by design. If the sound matters to you, the
        slideshow video version carries it, where that version resolves — or use the audio
        extraction option on the video entry if one is offered. Remember that the music is
        licensed to the creator&apos;s post, not to you, so reusing the soundtrack in your own
        public content can trigger the same copyright checks as any other borrowed audio. For
        private reference, none of that matters: save the images, enjoy the music in the app, and
        keep the two separate.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6">Frequently asked questions</h2>
      <p>
        <strong>Can I download all the slides in a carousel at once?</strong> The downloader lists
        each slide separately, so you download them one at a time. There is no single combined
        file, because each slide is a separate image on TikTok&apos;s servers. Downloading them
        into one folder keeps the set together.
      </p>
      <p>
        <strong>Why did only some slides download?</strong> Large carousels sometimes resolve
        partially when TikTok&apos;s image servers are slow. Wait a few minutes and try the link
        again — the missing slides usually appear on a second attempt. If the same slides keep
        failing, they may have been removed from the post by the creator.
      </p>
      <p>
        <strong>Can I download photo posts from a private account?</strong> No. Private
        accounts&apos; posts are not publicly accessible, and no legitimate tool can fetch them.
        Ask the creator to share the images with you directly.
      </p>
      <p>
        <strong>Are the images watermarked?</strong> The JPG files themselves carry no TikTok
        watermark. If the creator added their own username or logo into the image when they
        edited it, that is part of the photograph and stays in the file, as it should.
      </p>
      <p>
        <strong>Can I use downloaded photos on my own website or shop?</strong> Only with the
        creator&apos;s permission. Photographs are copyrighted work, and commercial use without
        permission — including product listings, advertisements, and website headers — is
        infringement even with credit. Ask first, get the answer in writing, and pay if they ask.
      </p>
      <p>
        <strong>What is the difference between a photo post and a slideshow video?</strong> A
        photo post is a set of still images you swipe through. TikTok also generates a video
        version that plays the images as a slideshow with music. The images are the reliable
        download; the video version is subject to the same blocking as other TikTok videos.
      </p>
      <p>
        <strong>Can I download the music from a photo post?</strong> Not with the images. The
        soundtrack lives on the slideshow video version, where that version resolves. If the
        video version fails — which happens often for the same blocking reasons as other TikTok
        videos — the music cannot be downloaded here, though you can still hear it in the app.
      </p>
    </GuideLayout>
  )
}
