import { getYouTubeEmbedUrl } from '../lib/youtube';

export function YoutubeEmbed({ url, title }: { url?: string; title: string }) {
  const embedUrl = url ? getYouTubeEmbedUrl(url) : null;

  if (!embedUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/25 p-6 text-center text-sm text-zinc-500">
        Paste a YouTube link to preview the embedded guide video here.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="aspect-video">
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
