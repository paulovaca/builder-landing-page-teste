import React, { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

import type { IconBlockProps } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

type LucideIconComponent = React.ComponentType<LucideProps>;

const ICON_SHADOW_MAP: Record<IconBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
  strong: 'var(--shadow-lg)',
};

const ALIGNMENT_MAP: Record<IconBlockProps['alignment'], React.CSSProperties['justifyContent']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const ICON_SIZE_DEFINITIONS: Record<
  IconBlockProps['size'],
  { label: string; size: number }
> = {
  sm: { label: 'Pequeno (24px)', size: 24 },
  md: { label: 'Médio (32px)', size: 32 },
  lg: { label: 'Grande (48px)', size: 48 },
  xl: { label: 'Gigante (64px)', size: 64 },
} as const;

const resolveIconComponent = (iconName: string): LucideIconComponent => {
  const component = LucideIcons[iconName as keyof typeof LucideIcons];
  if (component) {
    return component as LucideIconComponent;
  }
  return LucideIcons.Star as LucideIconComponent;
};

export function IconBlock({
  iconName,
  size,
  color,
  alignment,
  background,
  border,
  borderRadius,
  shadow,
  margin,
  padding,
  width,
  height,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: IconBlockProps) {
  const resolvedSize = ICON_SIZE_DEFINITIONS[size]?.size ?? ICON_SIZE_DEFINITIONS.md.size;
  const iconColor = colorValueToCss(color);
  const iconElement = useMemo(() => {
    const Component = resolveIconComponent(iconName || 'Star');
    return React.createElement(Component, { size: resolvedSize });
  }, [iconName, resolvedSize]);

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: ALIGNMENT_MAP[alignment] ?? ALIGNMENT_MAP.center,
    margin: spacingValueToCss(margin),
    padding: spacingValueToCss(padding),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: ICON_SHADOW_MAP[shadow],
    width: width || '100%',
    ...(wrapperStyle ?? {}),
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const iconWrapperStyle: React.CSSProperties = {
    color: iconColor,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${resolvedSize}px`,
    height: `${resolvedSize}px`,
    lineHeight: 1,
  };

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };

  return (
    <div
      ref={innerRef}
      data-block-type="icon"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      style={containerStyle}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      <span style={iconWrapperStyle} aria-hidden="true">
        {iconElement}
      </span>
    </div>
  );
}
