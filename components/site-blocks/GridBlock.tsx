import React from 'react';

import type { GridBlockProps } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';
import styles from './grid-block.module.css';

const SHADOW_MAP: Record<GridBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

export function GridBlock({
  columnsDesktop,
  columnsTablet,
  columnsMobile,
  gap,
  padding,
  margin,
  background,
  border,
  borderRadius,
  shadow,
  justifyItems,
  alignItems,
  width,
  height,
  visibleOn,
  children,
  innerRef,
  wrapperProps,
  showEmptyState = false,
  id,
  className,
}: GridBlockProps) {
  const gridStyles: React.CSSProperties = {
    background: colorValueToCss(background),
    padding: spacingValueToCss(padding),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
    justifyItems,
    alignItems,
    width: width || '100%',
    minHeight: '80px',
    ['--grid-columns-desktop' as const]: columnsDesktop,
    ['--grid-columns-tablet' as const]: columnsTablet,
    ['--grid-columns-mobile' as const]: columnsMobile,
    ['--grid-gap' as const]: `${gap}px`,
  };

  if (height && height !== 'auto') {
    gridStyles.height = height;
    gridStyles.minHeight = height;
  }

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const combinedStyle: React.CSSProperties = {
    margin: spacingValueToCss(margin),
    ...gridStyles,
    ...(wrapperStyle ?? {}),
  };

  const combinedClassName =
    [styles.grid, wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  return (
    <div
      ref={innerRef}
      style={combinedStyle}
      className={combinedClassName}
      data-block-type="grid"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      id={sanitizedId}
      {...restWrapperProps}
    >
      {children ||
        (showEmptyState ? (
          <p
            style={{
              margin: 0,
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Esta grade aceita blocos. Arraste itens para preencher.
          </p>
        ) : null)}
    </div>
  );
}
