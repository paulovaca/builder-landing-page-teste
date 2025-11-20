import React from 'react';

import type { BadgeBlockProps } from '@/lib/site-renderer/types';

import { colorValueToCss, spacingValueToCss } from './utils';

const BORDER_RADIUS_DEFAULT = 999;

export function BadgeBlock({
  text,
  variant,
  textSize,
  background,
  textColor,
  borderRadius,
  padding,
  margin,
  width,
  height,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: BadgeBlockProps) {
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };
  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  const clampedTextSize = Math.max(6, Math.min(200, Number(textSize) || 14));
  const defaultPaddingValue = [
    Math.round(clampedTextSize * 0.35),
    Math.round(clampedTextSize * 0.75),
    Math.round(clampedTextSize * 0.35),
    Math.round(clampedTextSize * 0.75),
  ] as [number, number, number, number];
  const baseBackground = colorValueToCss(background);
  const softBackground =
    variant === 'soft' && typeof background === 'string'
      ? `color-mix(in srgb, ${baseBackground} 18%, transparent)`
      : baseBackground;

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: spacingValueToCss(padding ?? defaultPaddingValue),
    fontSize: `${clampedTextSize}px`,
    fontWeight: 600,
    lineHeight: 1.2,
    color: colorValueToCss(textColor),
    borderRadius: borderRadius ?? BORDER_RADIUS_DEFAULT,
    whiteSpace: 'nowrap',
    border:
      variant === 'outline'
        ? `1px solid ${baseBackground}`
        : variant === 'solid'
          ? '1px solid transparent'
          : '1px solid transparent',
    background:
      variant === 'outline' ? 'transparent' : variant === 'soft' ? softBackground : baseBackground,
  };

  return (
    <div
      ref={innerRef}
      data-block-type="badge"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: spacingValueToCss(margin),
        width: width && width.trim() !== '' ? width : 'auto',
        height: height && height.trim() !== '' ? height : 'auto',
        ...(wrapperStyle ?? {}),
      }}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      <span style={badgeStyle}>{text}</span>
    </div>
  );
}
