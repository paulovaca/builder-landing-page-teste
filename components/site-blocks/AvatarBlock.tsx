import React from 'react';

import type {
  AvatarBlockProps,
  AvatarSizeOption,
  TextTransformOption,
  TextWeightOption,
} from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';
import styles from './avatar-block.module.css';

const SIZE_MAP: Record<AvatarSizeOption, string> = {
  sm: 'var(--space-9)', // 40px
  md: 'var(--space-12)', // 64px
  lg: 'calc(var(--space-13) + var(--space-4))', // 92px
  xl: 'calc(var(--space-13) + var(--space-8))', // 112px
};

const FONT_WEIGHT_MAP: Record<TextWeightOption, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const sanitizeDimension = (value?: string) => {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === 'auto') {
    return undefined;
  }
  return trimmed;
};

const clampFontSize = (value?: number) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 20;
  return Math.min(96, Math.max(10, numeric));
};

const buildInitials = (value?: string, fallback?: string) => {
  const source = value?.trim() || fallback?.trim();
  if (!source) return 'AA';

  const parts = source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  if (parts.length > 0) {
    return parts.slice(0, 3);
  }

  return 'AA';
};

export function AvatarBlock({
  src,
  alt,
  initials,
  size,
  background,
  textColor,
  fontFamily,
  fontWeight,
  fontSize,
  letterSpacing,
  textTransform,
  showBorder,
  border,
  padding,
  margin,
  width,
  height,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: AvatarBlockProps) {
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };
  const customSize = sanitizeDimension(width) ?? sanitizeDimension(height);
  const resolvedSize = customSize ?? SIZE_MAP[size] ?? SIZE_MAP.md;
  const resolvedFontSize = clampFontSize(fontSize);
  const resolvedInitials = buildInitials(initials, alt);
  const ringBorder = showBorder ? borderValueToCss(border) : 'none';
  const resolvedLetterSpacing =
    typeof letterSpacing === 'number' && Number.isFinite(letterSpacing)
      ? `${letterSpacing}px`
      : '0px';
  const resolvedFontFamily = fontFamily?.trim() || 'var(--font-family-sans)';
  const resolvedTextTransform: TextTransformOption = textTransform ?? 'uppercase';

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const combinedClassName =
    [styles.avatar, wrapperClassName, className?.trim()].filter(Boolean).join(' ') || styles.avatar;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;
  const ariaLabel = alt?.trim() || 'Avatar';
  const hasImage = Boolean(src?.trim());
  const containerRole = hasImage ? undefined : 'img';
  const containerAriaLabel = hasImage ? undefined : ariaLabel;

  const avatarStyle: React.CSSProperties = {
    margin: spacingValueToCss(margin),
    ['--avatar-size' as string]: resolvedSize,
    ['--avatar-bg' as string]: colorValueToCss(background),
    ['--avatar-text' as string]: colorValueToCss(textColor),
    ['--avatar-font' as string]: `${resolvedFontSize}px`,
    ['--avatar-font-family' as string]: resolvedFontFamily,
    ['--avatar-font-weight' as string]: FONT_WEIGHT_MAP[fontWeight] ?? FONT_WEIGHT_MAP.regular,
    ['--avatar-letter-spacing' as string]: resolvedLetterSpacing,
    ['--avatar-text-transform' as string]: resolvedTextTransform,
    ['--avatar-padding' as string]: spacingValueToCss(padding),
    ...(wrapperStyle ?? {}),
  };

  return (
    <div
      ref={innerRef}
      data-block-type="avatar"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      id={sanitizedId}
      className={combinedClassName}
      style={avatarStyle}
      role={containerRole}
      aria-label={containerAriaLabel}
      {...restWrapperProps}
    >
      {hasImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- imagem controlada pelo usuário
        <img
          src={src}
          alt={alt?.trim() || 'Foto de perfil'}
          className={styles.image}
          loading="lazy"
        />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {resolvedInitials}
        </span>
      )}

      {ringBorder !== 'none' ? (
        <span className={styles.ring} aria-hidden="true" style={{ border: ringBorder }} />
      ) : null}
    </div>
  );
}
