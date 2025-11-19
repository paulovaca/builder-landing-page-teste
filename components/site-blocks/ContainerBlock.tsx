import React from 'react';

import type {
  BorderValue,
  ColorValue,
  SpacingValue,
  VisibilityConfig,
} from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, isZeroSpacingValue, spacingValueToCss } from './utils';

export type ContainerDirection = 'row' | 'column';
export type ContainerShadow = 'none' | 'soft' | 'medium';

const SHADOW_MAP: Record<ContainerShadow, string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

export interface ContainerBlockProps {
  background: ColorValue;
  padding: SpacingValue;
  gap: number;
  direction: ContainerDirection;
  wrap: boolean;
  alignHorizontal: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  alignVertical: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  borderRadius: number;
  border: BorderValue;
  maxWidth: string;
  centerContent: boolean;
  shadow: ContainerShadow;
  children?: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  showEmptyState?: boolean;
  margin: SpacingValue;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  id?: string;
  className?: string;
}

export function ContainerBlock({
  background,
  padding,
  gap,
  direction,
  wrap,
  alignHorizontal,
  alignVertical,
  borderRadius,
  border,
  maxWidth,
  centerContent,
  shadow,
  children,
  innerRef,
  wrapperProps,
  showEmptyState = false,
  margin,
  width,
  height,
  visibleOn,
  id,
  className,
}: ContainerBlockProps) {
  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    maxWidth: centerContent ? maxWidth || '1200px' : '100%',
    display: 'flex',
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: `${gap}px`,
    padding: spacingValueToCss(padding),
    background: colorValueToCss(background),
    borderRadius,
    border: borderValueToCss(border),
    boxShadow: SHADOW_MAP[shadow],
    alignItems: alignVertical,
    justifyContent: alignHorizontal,
    minHeight: '80px',
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const computedMargin =
    centerContent && isZeroSpacingValue(margin) ? '0 auto' : spacingValueToCss(margin);

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const combinedStyle: React.CSSProperties = {
    margin: computedMargin,
    ...containerStyle,
    ...(wrapperStyle ?? {}),
  };

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  return (
    <div
      ref={innerRef}
      style={combinedStyle}
      data-block-type="container"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      id={sanitizedId}
      className={combinedClassName}
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
            Este container aceita qualquer bloco. Arraste componentes para dentro.
          </p>
        ) : null)}
    </div>
  );
}
