/* eslint-disable @next/next/no-img-element */
import React from 'react';

import type { ColorValue, ImageSEOConfig } from '@/lib/site-renderer/types';

import { colorValueToCss } from './utils';

export type ImageObjectFit = 'cover' | 'contain' | 'fill' | 'scale-down';
export type ImageShadow = 'none' | 'soft' | 'medium';

const SHADOW_MAP: Record<ImageShadow, string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

export const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80';

export interface ImageBlockProps {
  src: string;
  alt: string;
  caption: string;
  showCaption: boolean;
  width: string;
  height: string;
  objectFit: ImageObjectFit;
  alignment: 'flex-start' | 'center' | 'flex-end';
  borderRadius: number;
  showFrame: boolean;
  frameColor: ColorValue;
  shadow: ImageShadow;
  linkHref?: string;
  openInNewTab: boolean;
  seo?: ImageSEOConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function ImageBlock({
  src,
  alt,
  caption,
  showCaption,
  width,
  height,
  objectFit,
  alignment,
  borderRadius,
  showFrame,
  frameColor,
  shadow,
  linkHref,
  openInNewTab,
  innerRef,
  wrapperProps,
}: ImageBlockProps) {
  const hasLink = Boolean(linkHref && linkHref.trim().length > 0);
  const resolvedSrc = src || DEFAULT_IMAGE;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: alignment,
    width: '100%',
  };

  const figureStyle: React.CSSProperties = {
    width: width || '100%',
    maxWidth: '100%',
    height: height === 'auto' ? 'auto' : height,
    borderRadius,
    overflow: 'hidden',
    padding: showFrame ? 'var(--spacing-sm)' : 0,
    background: showFrame ? colorValueToCss(frameColor) : 'transparent',
    boxShadow: SHADOW_MAP[shadow],
  };

  const imageElement = (
    <figure style={figureStyle}>
      <img
        src={resolvedSrc}
        alt={alt || 'Imagem ilustrativa'}
        style={{
          display: 'block',
          width: '100%',
          height: height === 'auto' ? 'auto' : '100%',
          objectFit,
          borderRadius: showFrame ? `calc(${borderRadius}px - 8px)` : borderRadius,
        }}
        loading="lazy"
      />
      {showCaption && (
        <figcaption
          style={{
            marginTop: 'var(--spacing-sm)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
          }}
        >
          {caption || 'Adicione uma legenda para contextualizar a imagem.'}
        </figcaption>
      )}
    </figure>
  );

  return (
    <div ref={innerRef} style={containerStyle} data-block-type="image" {...wrapperProps}>
      {hasLink ? (
        <a
          href={linkHref}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
          style={{ textDecoration: 'none' }}
        >
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
    </div>
  );
}
