import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import React from 'react';

import type {
  BorderValue,
  ColorValue,
  SpacingValue,
  VisibilityConfig,
} from '@/lib/site-renderer/types';
import type { TrackingConfig } from '@/lib/tracking/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

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

export type ButtonShadow = 'none' | 'soft' | 'medium' | 'strong';

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

const BUTTON_SHADOW_MAP: Record<ButtonShadow, string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
  strong: 'var(--shadow-lg)',
};

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
  border: BorderValue;
  shadow: ButtonShadow;
  tracking?: TrackingConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  margin: SpacingValue;
  padding: SpacingValue;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  id?: string;
  className?: string;
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
  border,
  shadow,
  tracking,
  innerRef,
  wrapperProps,
  onClick,
  margin,
  padding,
  width,
  height,
  visibleOn,
  id,
  className,
}: ButtonBlockProps) {
  const backgroundCss = colorValueToCss(background);
  const textColorCss = colorValueToCss(textColor);
  const sizeStyle = SIZE_STYLE_MAP[size] ?? SIZE_STYLE_MAP.md;
  const Icon = resolveIcon(iconName);
  const customBorder = borderValueToCss(border);

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
      border: customBorder !== 'none' ? customBorder : 'none',
      boxShadow: BUTTON_SHADOW_MAP[shadow],
      minHeight: '48px',
    };

    if (variant === 'outline' && customBorder === 'none') {
      return {
        ...base,
        background: 'transparent',
        color: backgroundCss,
        border: `2px solid ${backgroundCss}`,
      };
    }

    if (variant === 'ghost' && customBorder === 'none') {
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

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: width || '100%',
    justifyContent: alignmentToCssValue[alignment] ?? 'center',
    margin: spacingValueToCss(margin),
    padding: spacingValueToCss(padding),
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const combinedStyle = {
    ...containerStyle,
    ...(wrapperStyle ?? {}),
  };
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  const hasLink = Boolean(href && href.trim().length > 0);
  const Tag: 'a' | 'button' = hasLink ? 'a' : 'button';

  return (
    <div
      ref={innerRef}
      style={combinedStyle}
      data-block-type="cta-button"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
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
