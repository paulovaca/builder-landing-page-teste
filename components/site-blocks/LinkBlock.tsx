import { ArrowUpRight } from 'lucide-react';
import React from 'react';

import {
  borderValueToCss,
  colorValueToCss,
  spacingValueToCss,
} from '@/components/site-blocks/utils';
import type {
  BorderValue,
  ColorValue,
  LinkSEOConfig,
  SpacingValue,
  VisibilityConfig,
} from '@/lib/site-renderer/types';
import type { TrackingConfig } from '@/lib/tracking/types';

export type LinkVariant = 'accent' | 'muted' | 'primary';
export type LinkUnderline = 'always' | 'hover' | 'none';
export type LinkSize = 'sm' | 'md';
export type LinkShadow = 'none' | 'soft' | 'strong';

export const LINK_VARIANT_STYLES: Record<LinkVariant, React.CSSProperties> = {
  accent: { color: 'var(--color-accent)' },
  muted: { color: 'var(--color-text-secondary)' },
  primary: { color: 'var(--color-text-primary)' },
};

export const LINK_UNDERLINE_MAP: Record<LinkUnderline, string> = {
  always: 'underline',
  hover: 'none',
  none: 'none',
};

export const LINK_HOVER_DECORATION: Record<LinkUnderline, string | undefined> = {
  always: 'underline',
  hover: 'underline',
  none: undefined,
};

export const LINK_SIZE_STYLE: Record<LinkSize, React.CSSProperties> = {
  sm: { fontSize: '14px', gap: 'var(--spacing-xs)' },
  md: { fontSize: '16px', gap: 'var(--spacing-sm)' },
};

const LINK_SHADOW_MAP: Record<LinkShadow, string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  strong: 'var(--shadow-md)',
};

export interface LinkBlockProps {
  label: string;
  href: string;
  openInNewTab: boolean;
  variant: LinkVariant;
  underline: LinkUnderline;
  showIcon: boolean;
  size: LinkSize;
  alignment: 'left' | 'center' | 'right';
  iconSize: number;
  tracking?: TrackingConfig;
  seo?: LinkSEOConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  margin: SpacingValue;
  padding: SpacingValue;
  background: ColorValue;
  border: BorderValue;
  borderRadius: number;
  shadow: LinkShadow;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  id?: string;
  className?: string;
}

export function LinkBlock({
  label,
  href,
  openInNewTab,
  variant,
  underline,
  showIcon,
  size,
  alignment,
  iconSize,
  tracking,
  innerRef,
  wrapperProps,
  onClick,
  margin,
  padding,
  background,
  border,
  borderRadius,
  shadow,
  width,
  height,
  visibleOn,
  id,
  className,
}: LinkBlockProps) {
  const hasLink = Boolean(href && href.trim().length > 0);

  const linkStyle: React.CSSProperties = {
    ...LINK_VARIANT_STYLES[variant],
    ...LINK_SIZE_STYLE[size],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: LINK_UNDERLINE_MAP[underline],
    fontWeight: 500,
    transition: 'color var(--transition-base)',
    cursor: hasLink ? 'pointer' : 'default',
  };

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    textAlign: alignment,
    margin: spacingValueToCss(margin),
    padding: spacingValueToCss(padding),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: LINK_SHADOW_MAP[shadow],
    display: 'block',
    ...(wrapperStyle ?? {}),
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  return (
    <div
      ref={innerRef}
      style={containerStyle}
      data-block-type="link"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      <a
        href={hasLink ? href : undefined}
        target={hasLink && openInNewTab ? '_blank' : undefined}
        rel={hasLink && openInNewTab ? 'noopener noreferrer' : undefined}
        style={linkStyle}
        onClick={onClick}
        id={tracking?.customId || undefined}
        className={tracking?.customClass}
        data-tracking-event={tracking?.event.name || undefined}
        onMouseEnter={(event) => {
          const decoration = LINK_HOVER_DECORATION[underline];
          if (decoration) {
            event.currentTarget.style.textDecoration = decoration;
          }
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.textDecoration = LINK_UNDERLINE_MAP[underline];
        }}
      >
        <span>{label}</span>
        {showIcon && <ArrowUpRight size={iconSize} />}
      </a>
    </div>
  );
}
