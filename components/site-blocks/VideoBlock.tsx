import React, { useMemo } from 'react';

import type { ColorValue } from '@/lib/site-renderer/types';
import type { TrackingConfig } from '@/lib/tracking/types';

import { colorValueToCss } from './utils';
import { getYouTubeEmbedUrl } from '@/lib/embed/youtube';

export type VideoShadow = 'none' | 'soft';

const SHADOW_MAP: Record<VideoShadow, string> = {
  none: 'none',
  soft: 'var(--shadow-md)',
};

export const DEFAULT_VIDEO_URL = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';
export const DEFAULT_POSTER =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80';

const isYouTubeUrl = (url: string) => /youtube\.com|youtu\.be/.test(url);
const isVimeoUrl = (url: string) => /vimeo\.com/.test(url);

const buildEmbedUrl = (
  url: string,
  config: { autoPlay: boolean; controls: boolean; loop: boolean },
) => {
  if (isYouTubeUrl(url)) {
    const embed = getYouTubeEmbedUrl(url, {
      autoPlay: config.autoPlay,
      controls: config.controls,
      loop: config.loop,
    });
    if (embed) {
      return embed;
    }
  }

  if (isVimeoUrl(url)) {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    const videoId = match?.[1];
    if (!videoId) return url;

    const params = new URLSearchParams();
    params.set('autoplay', config.autoPlay ? '1' : '0');
    params.set('controls', config.controls ? '1' : '0');
    params.set('loop', config.loop ? '1' : '0');

    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  }

  return url;
};

export interface VideoBlockProps {
  url: string;
  title: string;
  poster?: string;
  width: string;
  height: string;
  borderRadius: number;
  autoPlay: boolean;
  controls: boolean;
  loop: boolean;
  muted: boolean;
  showPlayIndicator: boolean;
  shadow: VideoShadow;
  background: ColorValue;
  tracking?: TrackingConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  onPlay?: () => void;
  onEnded?: () => void;
}

export function VideoBlock({
  url,
  title,
  poster,
  width,
  height,
  borderRadius,
  autoPlay,
  controls,
  loop,
  muted,
  showPlayIndicator,
  shadow,
  background,
  innerRef,
  wrapperProps,
  onPlay,
  onEnded,
}: VideoBlockProps) {
  const resolvedUrl = url || DEFAULT_VIDEO_URL;
  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    height,
    maxWidth: '100%',
    borderRadius,
    overflow: 'hidden',
    boxShadow: SHADOW_MAP[shadow],
    background: colorValueToCss(background),
    position: 'relative',
  };

  const isEmbed = isYouTubeUrl(resolvedUrl) || isVimeoUrl(resolvedUrl);
  const embedUrl = useMemo(
    () =>
      buildEmbedUrl(resolvedUrl, {
        autoPlay,
        controls,
        loop,
      }),
    [resolvedUrl, autoPlay, controls, loop],
  );

  return (
    <div
      ref={innerRef}
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      data-block-type="video"
      {...wrapperProps}
    >
      <div style={containerStyle}>
        {isEmbed ? (
          <iframe
            src={embedUrl}
            title={title}
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          />
        ) : (
          <video
            src={resolvedUrl}
            poster={poster || DEFAULT_POSTER}
            controls={controls}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
            onPlay={onPlay}
            onEnded={onEnded}
          />
        )}

        {showPlayIndicator && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1))',
              color: 'var(--color-text-inverse)',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Prévia do vídeo (clique para configurar)
          </div>
        )}
      </div>
    </div>
  );
}
