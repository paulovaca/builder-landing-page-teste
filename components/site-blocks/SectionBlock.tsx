import React from 'react';

import type { SectionBlockProps, SectionWidthOption } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';
import styles from './section-block.module.css';

export type {
  SectionBlockProps,
  SectionContentAlign,
  SectionPaddingPreset,
  SectionWidthOption,
} from '@/lib/site-renderer/types';

const CONTENT_WIDTH_MAP: Record<SectionWidthOption, string> = {
  narrow: '720px',
  medium: '960px',
  wide: '1200px',
  full: '100%',
};

const SHADOW_MAP: Record<SectionBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

export function SectionBlock({
  contentWidth,
  padding,
  background,
  backgroundImage,
  overlayColor,
  overlayOpacity,
  alignContent,
  margin,
  border,
  borderRadius,
  shadow,
  width,
  height,
  visibleOn,
  children,
  innerRef,
  wrapperProps,
  showEmptyState = false,
  id,
  className,
  paddingPreset,
}: SectionBlockProps) {
  const sectionStyle: React.CSSProperties = {
    position: 'relative',
    width: width || '100%',
    minHeight: '160px',
    padding: spacingValueToCss(padding),
    margin: spacingValueToCss(margin),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
    overflow: 'hidden',
    backgroundSize: backgroundImage ? 'cover' : undefined,
    backgroundPosition: backgroundImage ? 'center' : undefined,
    backgroundRepeat: backgroundImage ? 'no-repeat' : undefined,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
  };

  if (height && height !== 'auto') {
    sectionStyle.height = height;
    sectionStyle.minHeight = height;
  }

  const contentStyle: React.CSSProperties = {
    maxWidth: CONTENT_WIDTH_MAP[contentWidth],
    marginLeft: alignContent === 'center' ? 'auto' : alignContent === 'end' ? 'auto' : undefined,
    marginRight: alignContent === 'center' ? 'auto' : alignContent === 'start' ? 'auto' : undefined,
    textAlign: alignContent === 'center' ? 'center' : alignContent === 'end' ? 'right' : 'left',
    alignItems:
      alignContent === 'center' ? 'center' : alignContent === 'end' ? 'flex-end' : 'flex-start',
  };

  if (alignContent === 'end') {
    contentStyle.marginLeft = 'auto';
    contentStyle.marginRight = '0';
  } else if (alignContent === 'start') {
    contentStyle.marginLeft = '0';
    contentStyle.marginRight = 'auto';
  }

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const combinedStyle: React.CSSProperties = {
    ...sectionStyle,
    ...(wrapperStyle ?? {}),
  };

  const combinedClassName =
    [styles.section, wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  const showOverlay = Boolean(backgroundImage) && overlayOpacity > 0;
  const overlayStyle: React.CSSProperties = {
    background: colorValueToCss(overlayColor),
    opacity: Math.max(0, Math.min(overlayOpacity, 100)) / 100,
    borderRadius: borderRadius || undefined,
  };

  return (
    <section
      ref={innerRef}
      style={combinedStyle}
      className={combinedClassName}
      data-block-type="section"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      data-padding-preset={paddingPreset}
      id={sanitizedId}
      {...restWrapperProps}
    >
      {showOverlay ? <div aria-hidden className={styles.overlay} style={overlayStyle} /> : null}

      <div className={styles.content} style={contentStyle}>
        {children ||
          (showEmptyState ? (
            <p
              style={{
                margin: 0,
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              Esta seção aceita qualquer bloco. Arraste componentes para dentro.
            </p>
          ) : null)}
      </div>
    </section>
  );
}
