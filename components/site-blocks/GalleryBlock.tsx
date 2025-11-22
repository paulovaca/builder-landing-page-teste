import React from 'react';

import type { GalleryBlockProps, GalleryImageItem } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';
import styles from './gallery-block.module.css';

const SHADOW_MAP: Record<GalleryBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

const clampColumns = (value?: number) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 3;
  return Math.min(6, Math.max(2, Math.round(numeric)));
};

const sanitizeImages = (images?: GalleryImageItem[]) =>
  Array.isArray(images)
    ? images.filter((image) => typeof image?.src === 'string' && image.src.trim().length > 0)
    : [];

export function GalleryBlock({
  images,
  columns,
  gap,
  borderRadius,
  hoverEffect,
  openInModal,
  background,
  padding,
  margin,
  border,
  shadow,
  width,
  height,
  visibleOn,
  innerRef,
  wrapperProps,
  onImageClick,
  id,
  className,
}: GalleryBlockProps) {
  const resolvedColumns = clampColumns(columns);
  const resolvedGap = Number.isFinite(Number(gap)) ? Math.max(0, Number(gap)) : 16;
  const resolvedImages = sanitizeImages(images);
  const isClickable = openInModal && typeof onImageClick === 'function';

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    margin: spacingValueToCss(margin),
    padding: spacingValueToCss(padding),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
    width: width || '100%',
    ...(wrapperStyle ?? {}),
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const gridStyle: React.CSSProperties = {
    ['--gallery-columns-desktop' as string]: resolvedColumns,
    ['--gallery-columns-tablet' as string]: Math.min(resolvedColumns, 3),
    ['--gallery-columns-mobile' as string]: Math.min(resolvedColumns, 2),
    ['--gallery-gap' as string]: `${resolvedGap}px`,
    ['--gallery-radius' as string]: `${borderRadius}px`,
  };

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };

  return (
    <div
      ref={innerRef}
      style={containerStyle}
      data-block-type="image-gallery"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      <div className={styles.gallery} style={gridStyle} data-hover-effect={hoverEffect}>
        {resolvedImages.length > 0 ? (
          resolvedImages.map((image, index) => {
            const key = image.id || `gallery-image-${index}`;
            const alt = image.alt?.trim() || 'Imagem da galeria';

            return (
              <figure key={key} className={styles.item}>
                {isClickable ? (
                  <button
                    type="button"
                    className={styles.imageButton}
                    aria-label={`Abrir ${alt}`}
                    onClick={() => onImageClick?.(image, index)}
                  >
                    <div className={styles.imageFrame}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- renderiza imagem customizada */}
                      <img src={image.src} alt={alt} className={styles.image} loading="lazy" />
                      <span className={styles.hoverOverlay} aria-hidden />
                    </div>
                  </button>
                ) : (
                  <div className={styles.imageButton} data-disabled="true">
                    <div className={styles.imageFrame}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- renderiza imagem customizada */}
                      <img src={image.src} alt={alt} className={styles.image} loading="lazy" />
                      <span className={styles.hoverOverlay} aria-hidden />
                    </div>
                  </div>
                )}

                {image.caption ? (
                  <figcaption className={styles.caption}>{image.caption}</figcaption>
                ) : null}
              </figure>
            );
          })
        ) : (
          <div className={styles.emptyState}>Envie imagens para montar sua galeria.</div>
        )}
      </div>
    </div>
  );
}
