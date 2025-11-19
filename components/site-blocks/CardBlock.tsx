import React from 'react';

import type {
  BorderValue,
  ColorValue,
  SpacingValue,
  VisibilityConfig,
} from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

export type CardShadow = 'none' | 'soft' | 'medium' | 'strong';

const SHADOW_MAP: Record<CardShadow, string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
  strong: 'var(--shadow-lg)',
};

export interface CardBlockProps {
  background: ColorValue;
  padding: SpacingValue;
  gap: number;
  borderRadius: number;
  border: BorderValue;
  shadow: CardShadow;
  maxWidth: string;
  alignItems: 'stretch' | 'flex-start' | 'center' | 'flex-end';
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between';
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

export function CardBlock({
  background,
  padding,
  gap,
  borderRadius,
  border,
  shadow,
  maxWidth,
  alignItems,
  justifyContent,
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
}: CardBlockProps) {
  const baseStyle: React.CSSProperties = {
    background: colorValueToCss(background),
    padding: spacingValueToCss(padding),
    borderRadius,
    border: borderValueToCss(border),
    boxShadow: SHADOW_MAP[shadow],
    display: 'flex',
    flexDirection: 'column',
    gap: `${gap}px`,
    width: width || '100%',
    maxWidth: maxWidth || '100%',
    alignItems,
    justifyContent,
    minHeight: '120px',
  };

  if (height && height !== 'auto') {
    baseStyle.height = height;
    baseStyle.minHeight = height;
  }

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const combinedStyle: React.CSSProperties = {
    margin: spacingValueToCss(margin),
    ...baseStyle,
    ...(wrapperStyle ?? {}),
  };
  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  return (
    <div
      ref={innerRef}
      style={combinedStyle}
      data-block-type="card"
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
            Arraste elementos para dentro deste cartão.
          </p>
        ) : null)}
    </div>
  );
}
