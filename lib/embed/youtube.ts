const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

export type YouTubeEmbedOptions = {
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  origin?: string;
  /**
   * Enables or disables the minimal YouTube UI.
   * Defaults to true to mirror the Craft.js builder expectations.
   */
  modestBranding?: boolean;
  /**
   * Related videos behaviour. Defaults to 0 to keep focus on the same channel.
   */
  rel?: 0 | 1;
};

export function extractYouTubeVideoId(candidate: string): string | null {
  if (!candidate) return null;

  const trimmed = candidate.trim();

  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(YOUTUBE_ID_REGEX);
  return match?.[1] ?? null;
}

export function getYouTubeEmbedUrl(
  candidate: string,
  {
    autoPlay = false,
    controls = true,
    loop = false,
    origin,
    modestBranding = true,
    rel = 0,
  }: YouTubeEmbedOptions = {},
): string | null {
  const videoId = extractYouTubeVideoId(candidate);
  if (!videoId) {
    return null;
  }

  const params = new URLSearchParams();
  params.set('autoplay', autoPlay ? '1' : '0');
  params.set('controls', controls ? '1' : '0');
  params.set('loop', loop ? '1' : '0');
  params.set('playlist', videoId);
  params.set('rel', String(rel));

  if (modestBranding) {
    params.set('modestbranding', '1');
  }

  if (origin) {
    params.set('origin', origin);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
