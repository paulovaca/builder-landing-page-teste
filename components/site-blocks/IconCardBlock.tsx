import React, { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

import type { IconCardBlockProps } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

const SHADOW_MAP: Record<IconCardBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

const FONT_WEIGHT_MAP: Record<IconCardBlockProps['titleFontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const ALIGN_TO_FLEX: Record<IconCardBlockProps['textAlign'], React.CSSProperties['alignItems']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  justify: 'stretch',
};

const clampNumber = (value: number, min: number, max: number, fallback: number) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
};

const resolveIconComponent = (iconName: string): React.ComponentType<LucideProps> => {
  const Component = LucideIcons[iconName as keyof typeof LucideIcons];
  if (Component) {
    return Component as React.ComponentType<LucideProps>;
  }
  return LucideIcons.Star as React.ComponentType<LucideProps>;
};

export function IconCardBlock({
  iconName,
  iconSize,
  iconColor,
  iconPosition,
  contentGap,
  textGap,
  title,
  description,
  titleColor,
  descriptionColor,
  titleFontFamily,
  titleFontWeight,
  titleSize,
  titleLineHeight,
  titleLetterSpacing,
  titleTransform,
  descriptionFontFamily,
  descriptionFontWeight,
  descriptionSize,
  descriptionLineHeight,
  descriptionLetterSpacing,
  descriptionTransform,
  textAlign,
  padding,
  margin,
  background,
  border,
  borderRadius,
  shadow,
  width,
  height,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: IconCardBlockProps) {
  const resolvedIconSize = clampNumber(Number(iconSize), 12, 160, 32);
  const resolvedContentGap = Number.isFinite(contentGap) ? Math.max(0, contentGap) : 12;
  const resolvedTextGap = Number.isFinite(textGap) ? Math.max(0, textGap) : 8;
  const textHorizontalAlign = ALIGN_TO_FLEX[textAlign] ?? 'flex-start';

  const iconElement = useMemo(() => {
    const Component = resolveIconComponent(iconName || 'Star');
    return React.createElement(Component, { size: resolvedIconSize, 'aria-hidden': true });
  }, [iconName, resolvedIconSize]);

  const resolvedTitleSize = clampNumber(titleSize, 12, 48, 20);
  const resolvedDescriptionSize = clampNumber(descriptionSize, 10, 28, 15);
  const resolvedTitleLineHeight = clampNumber(titleLineHeight, 1, 2, 1.3);
  const resolvedDescriptionLineHeight = clampNumber(descriptionLineHeight, 1, 2.4, 1.5);
  const resolvedTitleSpacing = Number.isFinite(titleLetterSpacing) ? titleLetterSpacing : 0;
  const resolvedDescriptionSpacing = Number.isFinite(descriptionLetterSpacing)
    ? descriptionLetterSpacing
    : 0;

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: iconPosition === 'left' ? 'row' : 'column',
    alignItems: iconPosition === 'left' ? 'flex-start' : textHorizontalAlign,
    gap: `${resolvedContentGap}px`,
    padding: spacingValueToCss(padding),
    margin: spacingValueToCss(margin),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
    width: width || '100%',
    boxSizing: 'border-box',
    textAlign,
    minHeight: '80px',
    ...(wrapperStyle ?? {}),
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const iconWrapperStyle: React.CSSProperties = {
    color: colorValueToCss(iconColor),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${resolvedIconSize}px`,
    height: `${resolvedIconSize}px`,
    lineHeight: 1,
    flexShrink: 0,
  };

  const textContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: `${resolvedTextGap}px`,
    alignItems: textHorizontalAlign === 'stretch' ? 'flex-start' : textHorizontalAlign,
    textAlign,
    flex: 1,
    width: '100%',
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(titleColor),
    fontFamily: titleFontFamily?.trim() || 'var(--font-family-sans)',
    fontWeight: FONT_WEIGHT_MAP[titleFontWeight] ?? 600,
    fontSize: `${resolvedTitleSize}px`,
    lineHeight: resolvedTitleLineHeight.toString(),
    letterSpacing: `${resolvedTitleSpacing}px`,
    textTransform: titleTransform ?? 'none',
  };

  const descriptionStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(descriptionColor),
    fontFamily: descriptionFontFamily?.trim() || 'var(--font-family-sans)',
    fontWeight: FONT_WEIGHT_MAP[descriptionFontWeight] ?? 400,
    fontSize: `${resolvedDescriptionSize}px`,
    lineHeight: resolvedDescriptionLineHeight.toString(),
    letterSpacing: `${resolvedDescriptionSpacing}px`,
    textTransform: descriptionTransform ?? 'none',
  };

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };

  return (
    <div
      ref={innerRef}
      data-block-type="icon-card"
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

      <div style={textContainerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>
    </div>
  );
}
