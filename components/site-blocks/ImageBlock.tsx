/* eslint-disable @next/next/no-img-element */
import React from 'react';

import type {
  BorderValue,
  ColorValue,
  ImageSEOConfig,
  SpacingValue,
  VisibilityConfig,
} from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

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
  margin: SpacingValue;
  padding: SpacingValue;
  background: ColorValue;
  border: BorderValue;
  visibleOn: VisibilityConfig;
  id?: string;
  className?: string;
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
  margin,
  padding,
  background,
  border,
  visibleOn,
  id,
  className,
}: ImageBlockProps) {
  const hasLink = Boolean(linkHref && linkHref.trim().length > 0);
  const resolvedSrc = src || DEFAULT_IMAGE;

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: alignment,
    width: '100%',
    margin: spacingValueToCss(margin),
    padding: spacingValueToCss(padding),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
    ...(wrapperStyle ?? {}),
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const figureStyle: React.CSSProperties = {
    width: width || '100%',
    maxWidth: '100%',
    height: height === 'auto' ? 'auto' : height,
    borderRadius,
    overflow: 'hidden',
    padding: showFrame ? 'var(--spacing-sm)' : 0,
    background: showFrame ? colorValueToCss(frameColor) : 'transparent',
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

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  return (
    <div
      ref={innerRef}
      style={containerStyle}
      data-block-type="image"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
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
