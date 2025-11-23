import React from 'react';

import type { ImageOverlayBlockProps } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';
import styles from './image-overlay-block.module.css';

export type { ImageOverlayBlockProps } from '@/lib/site-renderer/types';

const SHADOW_MAP: Record<ImageOverlayBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

const TEXT_ALIGN_MAP: Record<
  ImageOverlayBlockProps['contentHorizontalAlign'],
  React.CSSProperties['textAlign']
> = {
  'flex-start': 'left',
  center: 'center',
  'flex-end': 'right',
};

export function ImageOverlayBlock({
  imageSrc,
  imageAlt,
  overlayColor,
  overlayOpacity,
  padding,
  margin,
  background,
  border,
  borderRadius,
  shadow,
  minHeight,
  width,
  height,
  contentMaxWidth,
  contentHorizontalAlign,
  contentVerticalAlign,
  visibleOn,
  children,
  innerRef,
  wrapperProps,
  showEmptyState = false,
  id,
  className,
}: ImageOverlayBlockProps) {
  const resolvedOpacity = Math.max(0, Math.min(100, Number(overlayOpacity) || 0)) / 100;
  const resolvedMinHeight = minHeight && minHeight.trim().length > 0 ? minHeight : '320px';
  const hasImage = Boolean(imageSrc && imageSrc.trim().length > 0);

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    minHeight: resolvedMinHeight,
    background: colorValueToCss(background),
    margin: spacingValueToCss(margin),
    borderRadius,
    border: borderValueToCss(border),
    boxShadow: SHADOW_MAP[shadow],
    ...(wrapperStyle ?? {}),
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const overlayStyle: React.CSSProperties = {
    background: colorValueToCss(overlayColor),
    opacity: resolvedOpacity,
  };

  const contentWrapperStyle: React.CSSProperties = {
    padding: spacingValueToCss(padding),
    justifyContent: contentHorizontalAlign,
    alignItems: contentVerticalAlign,
  };

  const contentInnerStyle: React.CSSProperties = {
    maxWidth: contentMaxWidth || '720px',
    width: '100%',
    textAlign: TEXT_ALIGN_MAP[contentHorizontalAlign],
  };

  const combinedClassName =
    [styles.container, wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };

  return (
    <div
      ref={innerRef}
      className={combinedClassName}
      style={containerStyle}
      data-block-type="image-overlay"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      id={sanitizedId}
      {...restWrapperProps}
    >
      <div className={styles.inner}>
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- renderização controlada pelo builder
          <img
            src={imageSrc}
            alt={imageAlt?.trim() || 'Imagem com sobreposição'}
            className={styles.media}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.fallback} aria-label="Área de imagem vazia">
            <span>Envie uma imagem de fundo</span>
          </div>
        )}

        {resolvedOpacity > 0 ? (
          <div className={styles.overlay} style={overlayStyle} aria-hidden />
        ) : null}

        <div className={styles.content} style={contentWrapperStyle}>
          <div className={styles.contentInner} style={contentInnerStyle}>
            {children ||
              (showEmptyState ? (
                <p className={styles.placeholder}>
                  Arraste textos, botões ou outros blocos para sobrepor a imagem.
                </p>
              ) : null)}
          </div>
        </div>
      </div>
    </div>
  );
}
