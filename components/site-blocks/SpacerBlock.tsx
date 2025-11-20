import React from 'react';

import type { SpacerBlockProps } from '@/lib/site-renderer/types';

import { spacingValueToCss } from './utils';

const GUIDE_COLOR = 'var(--color-border-strong)';
const GUIDE_INSET = 'var(--space-4)';

export function SpacerBlock({
  size,
  orientation,
  showGuide,
  margin,
  width,
  height,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: SpacerBlockProps) {
  const resolvedSize = Math.max(0, Number(size) || 0);
  const isVertical = orientation === 'vertical';
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const hasCustomWidth = typeof width === 'string' && width.trim() !== '';
  const hasCustomHeight =
    typeof height === 'string' && height.trim() !== '' && height.trim() !== 'auto';

  const resolvedWidth = hasCustomWidth ? width : isVertical ? '100%' : `${resolvedSize}px`;

  const resolvedHeight = hasCustomHeight ? height : isVertical ? `${resolvedSize}px` : 'auto';

  const sanitizedId = (id || wrapperId)?.trim() || undefined;
  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;

  const shouldForceMinHeight =
    showGuide && (resolvedHeight === 'auto' || resolvedHeight === '' || resolvedSize === 0);
  const minHeight = shouldForceMinHeight ? '1px' : undefined;
  const minWidth = !isVertical && !hasCustomWidth ? `${resolvedSize}px` : undefined;

  const guideStyle: React.CSSProperties = isVertical
    ? {
        position: 'absolute',
        left: GUIDE_INSET,
        right: GUIDE_INSET,
        top: '50%',
        borderTop: `1px dashed ${GUIDE_COLOR}`,
        transform: 'translateY(-50%)',
        opacity: 0.6,
        pointerEvents: 'none',
      }
    : {
        position: 'absolute',
        top: GUIDE_INSET,
        bottom: GUIDE_INSET,
        left: '50%',
        borderLeft: `1px dashed ${GUIDE_COLOR}`,
        transform: 'translateX(-50%)',
        opacity: 0.6,
        pointerEvents: 'none',
      };

  return (
    <div
      ref={innerRef}
      data-block-type="spacer"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      style={{
        position: 'relative',
        display: 'block',
        margin: spacingValueToCss(margin),
        width: resolvedWidth,
        height: resolvedHeight,
        minHeight,
        minWidth,
        flexShrink: 0,
        ...(wrapperStyle ?? {}),
      }}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      {showGuide ? <span aria-hidden="true" style={guideStyle} /> : null}
    </div>
  );
}
