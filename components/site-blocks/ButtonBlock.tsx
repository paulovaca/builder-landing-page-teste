import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import React from 'react';

import type { ColorValue } from '@/lib/site-renderer/types';
import type { TrackingConfig } from '@/lib/tracking/types';

import { colorValueToCss } from './utils';

export type IconName = keyof typeof LucideIcons;

export const VARIANT_OPTIONS = [
  { value: 'solid', label: 'Preenchido' },
  { value: 'outline', label: 'Contornado' },
  { value: 'ghost', label: 'Texto destacado' },
] as const;

export const SIZE_OPTIONS = [
  { value: 'sm', label: 'Pequeno' },
  { value: 'md', label: 'Médio' },
  { value: 'lg', label: 'Grande' },
] as const;

export type ButtonVariant = (typeof VARIANT_OPTIONS)[number]['value'];
export type ButtonSize = (typeof SIZE_OPTIONS)[number]['value'];

const alignmentToCssValue: Record<
  'left' | 'center' | 'right',
  React.CSSProperties['justifyContent']
> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const SIZE_STYLE_MAP: Record<ButtonSize, { fontSize: string; paddingY: number }> = {
  sm: { fontSize: '14px', paddingY: 10 },
  md: { fontSize: '16px', paddingY: 14 },
  lg: { fontSize: '18px', paddingY: 18 },
};

const resolveIcon = (name: IconName): React.ComponentType<LucideProps> =>
  (LucideIcons[name] ?? LucideIcons.ArrowRight) as React.ComponentType<LucideProps>;

export interface ButtonBlockProps {
  label: string;
  href: string;
  openInNewTab: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  alignment: 'left' | 'center' | 'right';
  borderRadius: number;
  background: ColorValue;
  textColor: ColorValue;
  showIcon: boolean;
  iconName: IconName;
  showShadow: boolean;
  tracking?: TrackingConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export function ButtonBlock({
  label,
  href,
  openInNewTab,
  variant,
  size,
  fullWidth,
  alignment,
  borderRadius,
  background,
  textColor,
  showIcon,
  iconName,
  showShadow,
  tracking,
  innerRef,
  wrapperProps,
  onClick,
}: ButtonBlockProps) {
  const backgroundCss = colorValueToCss(background);
  const textColorCss = colorValueToCss(textColor);
  const sizeStyle = SIZE_STYLE_MAP[size] ?? SIZE_STYLE_MAP.md;
  const Icon = resolveIcon(iconName);

  const buttonStyle: React.CSSProperties = (() => {
    const base: React.CSSProperties = {
      borderRadius,
      padding: `${sizeStyle.paddingY}px ${sizeStyle.paddingY * 2}px`,
      fontSize: sizeStyle.fontSize,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-3)',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'var(--transition-base)',
      width: fullWidth ? '100%' : 'auto',
      border: 'none',
      boxShadow: showShadow ? 'var(--shadow-md)' : 'none',
      minHeight: '48px',
    };

    if (variant === 'outline') {
      return {
        ...base,
        background: 'transparent',
        color: backgroundCss,
        border: `2px solid ${backgroundCss}`,
      };
    }

    if (variant === 'ghost') {
      return {
        ...base,
        background: 'rgba(13, 153, 255, 0.08)',
        color: backgroundCss,
        border: `1px dashed ${backgroundCss}`,
      };
    }

    return {
      ...base,
      background: backgroundCss,
      color: textColorCss,
    };
  })();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    justifyContent: alignmentToCssValue[alignment] ?? 'center',
  };

  const hasLink = Boolean(href && href.trim().length > 0);
  const Tag: 'a' | 'button' = hasLink ? 'a' : 'button';

  return (
    <div ref={innerRef} style={containerStyle} data-block-type="cta-button" {...wrapperProps}>
      <Tag
        id={tracking?.customId || undefined}
        className={tracking?.customClass || undefined}
        href={hasLink ? href : undefined}
        target={hasLink && openInNewTab ? '_blank' : undefined}
        rel={hasLink && openInNewTab ? 'noopener noreferrer' : undefined}
        type={hasLink ? undefined : 'button'}
        style={buttonStyle}
        onClick={onClick}
        data-tracking-event={tracking?.event.name || undefined}
      >
        <span>{label}</span>
        {showIcon && <Icon size={20} />}
      </Tag>
    </div>
  );
}
