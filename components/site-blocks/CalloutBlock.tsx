import React, { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

import type { CalloutBlockProps } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

const SHADOW_MAP: Record<CalloutBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
};

const FONT_WEIGHT_MAP: Record<CalloutBlockProps['titleFontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const TONE_PRESETS: Record<
  CalloutBlockProps['tone'],
  { background: string; accent: string; icon: string }
> = {
  info: {
    background: 'var(--color-info-soft)',
    accent: 'var(--color-info)',
    icon: 'var(--color-info)',
  },
  success: {
    background: 'var(--color-success-soft)',
    accent: 'var(--color-success)',
    icon: 'var(--color-success)',
  },
  warning: {
    background: 'var(--color-warning-soft)',
    accent: 'var(--color-warning)',
    icon: 'var(--color-warning)',
  },
  danger: {
    background: 'var(--color-danger-soft)',
    accent: 'var(--color-danger)',
    icon: 'var(--color-danger)',
  },
};

const ALIGN_MAP: Record<CalloutBlockProps['textAlign'], React.CSSProperties['alignItems']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  justify: 'stretch',
};

const clamp = (value: number, min: number, max: number, fallback: number) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
};

const resolveIconComponent = (iconName: string): React.ComponentType<LucideProps> => {
  const Component = LucideIcons[iconName as keyof typeof LucideIcons];
  if (Component) {
    return Component as React.ComponentType<LucideProps>;
  }
  return LucideIcons.Info as React.ComponentType<LucideProps>;
};

export function CalloutBlock({
  tone,
  title,
  description,
  showIcon,
  iconName,
  iconColor,
  iconSize,
  background,
  titleColor,
  descriptionColor,
  textAlign,
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
  showAccent,
  accentColor,
  accentWidth,
  contentGap,
  textGap,
  padding,
  margin,
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
}: CalloutBlockProps) {
  const tonePreset = TONE_PRESETS[tone] ?? TONE_PRESETS.info;
  const resolvedIconSize = clamp(Number(iconSize), 12, 120, 28);
  const resolvedContentGap = Number.isFinite(contentGap) ? Math.max(0, contentGap) : 12;
  const resolvedTextGap = Number.isFinite(textGap) ? Math.max(0, textGap) : 8;
  const alignItems = ALIGN_MAP[textAlign] ?? 'flex-start';

  const iconElement = useMemo(() => {
    const Component = resolveIconComponent(iconName || 'Info');
    return React.createElement(Component, { size: resolvedIconSize, 'aria-hidden': true });
  }, [iconName, resolvedIconSize]);

  const resolvedTitleSize = clamp(titleSize, 12, 42, 18);
  const resolvedDescriptionSize = clamp(descriptionSize, 10, 30, 15);
  const resolvedTitleLineHeight = clamp(titleLineHeight, 1, 2, 1.3);
  const resolvedDescriptionLineHeight = clamp(descriptionLineHeight, 1, 2.4, 1.5);
  const resolvedTitleSpacing = Number.isFinite(titleLetterSpacing) ? titleLetterSpacing : 0;
  const resolvedDescriptionSpacing = Number.isFinite(descriptionLetterSpacing)
    ? descriptionLetterSpacing
    : 0;
  const resolvedTitleFont = titleFontFamily?.trim() || 'var(--font-family-sans)';
  const resolvedDescriptionFont = descriptionFontFamily?.trim() || 'var(--font-family-sans)';

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const resolvedAccentColor = colorValueToCss(accentColor || tonePreset.accent);
  const resolvedIconColor = colorValueToCss(iconColor || tonePreset.icon);
  const resolvedBackground = colorValueToCss(background || tonePreset.background);
  const resolvedTitleColor = colorValueToCss(titleColor || 'var(--color-text-primary)');
  const resolvedDescriptionColor = colorValueToCss(
    descriptionColor || 'var(--color-text-secondary)',
  );

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems,
    gap: `${resolvedContentGap}px`,
    padding: spacingValueToCss(padding),
    margin: spacingValueToCss(margin),
    background: resolvedBackground,
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
    width: width || '100%',
    boxSizing: 'border-box',
    textAlign,
    minHeight: '64px',
    ...(wrapperStyle ?? {}),
  };

  if (showAccent) {
    containerStyle.borderLeft = `${Math.max(1, accentWidth)}px solid ${resolvedAccentColor}`;
  }

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const iconWrapperStyle: React.CSSProperties = {
    color: resolvedIconColor,
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
    alignItems: alignItems === 'stretch' ? 'flex-start' : alignItems,
    width: '100%',
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    color: resolvedTitleColor,
    fontFamily: resolvedTitleFont,
    fontWeight: FONT_WEIGHT_MAP[titleFontWeight] ?? 600,
    fontSize: `${resolvedTitleSize}px`,
    lineHeight: resolvedTitleLineHeight.toString(),
    letterSpacing: `${resolvedTitleSpacing}px`,
    textTransform: titleTransform ?? 'none',
  };

  const descriptionStyle: React.CSSProperties = {
    margin: 0,
    color: resolvedDescriptionColor,
    fontFamily: resolvedDescriptionFont,
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
      data-block-type="callout"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      style={containerStyle}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      {showIcon ? <span style={iconWrapperStyle}>{iconElement}</span> : null}

      <div style={textContainerStyle}>
        {title ? <h3 style={titleStyle}>{title}</h3> : null}
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>
    </div>
  );
}
