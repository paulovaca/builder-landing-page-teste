import React from 'react';

import type { DividerBlockProps } from '@/lib/site-renderer/types';

import { colorValueToCss, spacingValueToCss } from './utils';

const ALIGN_MAP: Record<DividerBlockProps['alignment'], React.CSSProperties['justifyContent']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export function DividerBlock({
  thickness,
  lineStyle,
  color,
  width,
  height,
  orientation,
  alignment,
  margin,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: DividerBlockProps) {
  const resolvedThickness = Math.max(1, Math.min(10, Number(thickness) || 1));
  const containerWidth =
    width && width.trim() !== ''
      ? width
      : orientation === 'vertical'
        ? `${resolvedThickness}px`
        : '100%';

  const resolvedHeight =
    height && height.trim() !== ''
      ? height
      : orientation === 'vertical'
        ? '80px'
        : `${resolvedThickness}px`;
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

  return (
    <div
      ref={innerRef}
      data-block-type="divider"
      data-orientation={orientation}
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: ALIGN_MAP[alignment] ?? ALIGN_MAP.center,
        margin: spacingValueToCss(margin),
        width: containerWidth,
        height: resolvedHeight,
        ...(wrapperStyle ?? {}),
      }}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'block',
          width: orientation === 'horizontal' ? '100%' : `${resolvedThickness}px`,
          height: orientation === 'vertical' ? '100%' : `${resolvedThickness}px`,
          borderTop:
            orientation === 'horizontal'
              ? lineStyle === 'none'
                ? 'none'
                : `${resolvedThickness}px ${lineStyle} ${colorValueToCss(color)}`
              : 'none',
          borderLeft:
            orientation === 'vertical'
              ? lineStyle === 'none'
                ? 'none'
                : `${resolvedThickness}px ${lineStyle} ${colorValueToCss(color)}`
              : 'none',
          borderRadius: Math.min(resolvedThickness, 8),
          background: 'transparent',
        }}
      />
    </div>
  );
}
