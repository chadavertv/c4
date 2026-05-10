export function extractYouTubeId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/i,
    /(?:youtu\.be\/)([\w-]{11})/i,
    /(?:youtube\.com\/embed\/)([\w-]{11})/i,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}
