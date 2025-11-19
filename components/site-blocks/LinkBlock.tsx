import { ArrowUpRight } from 'lucide-react';
import React from 'react';

import type { LinkSEOConfig } from '@/lib/site-renderer/types';
import type { TrackingConfig } from '@/lib/tracking/types';

export type LinkVariant = 'accent' | 'muted' | 'primary';
export type LinkUnderline = 'always' | 'hover' | 'none';
export type LinkSize = 'sm' | 'md';

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

  const containerStyle: React.CSSProperties = {
    width: '100%',
    textAlign: alignment,
  };

  return (
    <div ref={innerRef} style={containerStyle} data-block-type="link" {...wrapperProps}>
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
