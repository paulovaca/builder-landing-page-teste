import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

import type { TimelineBlockProps, TimelineItem } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

const SHADOW_MAP: Record<TimelineBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
};

const FONT_WEIGHT_MAP: Record<TimelineBlockProps['titleFontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const DESCRIPTION_WEIGHT_MAP: Record<TimelineBlockProps['descriptionFontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const DATE_WEIGHT_MAP: Record<TimelineBlockProps['dateFontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const resolveIconComponent = (iconName?: string): React.ComponentType<LucideProps> | null => {
  if (!iconName) return null;
  const Component = LucideIcons[iconName as keyof typeof LucideIcons];
  if (Component) return Component as React.ComponentType<LucideProps>;
  return LucideIcons.Clock as React.ComponentType<LucideProps>;
};

const normalizeFont = (font?: string) => {
  const value = (font || '').trim();
  if (!value) return 'var(--font-family-sans)';
  return value;
};

const clamp = (value: number, min: number, max: number, fallback: number) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
};

export function TimelineBlock({
  items,
  orientation,
  showIcons,
  lineColor,
  markerColor,
  background,
  itemBackground,
  itemBorder,
  itemBorderRadius,
  itemPadding,
  itemGap,
  contentGap,
  titleColor,
  descriptionColor,
  dateColor,
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
  dateFontFamily,
  dateFontWeight,
  dateSize,
  dateLineHeight,
  dateLetterSpacing,
  dateTransform,
  shadow,
  padding,
  margin,
  width,
  height,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: TimelineBlockProps) {
  const resolvedItems = Array.isArray(items) && items.length > 0 ? items : [];
  const isVertical = orientation === 'vertical';
  const containerGap = Math.max(0, itemGap);
  const resolvedTitleFont = normalizeFont(titleFontFamily);
  const resolvedDescriptionFont = normalizeFont(descriptionFontFamily);
  const resolvedDateFont = normalizeFont(dateFontFamily);
  const resolvedTitleSize = clamp(titleSize, 12, 48, 18);
  const resolvedDescSize = clamp(descriptionSize, 10, 28, 15);
  const resolvedDateSize = clamp(dateSize, 10, 24, 13);
  const resolvedTitleLineHeight = clamp(titleLineHeight, 1, 2, 1.3);
  const resolvedDescLineHeight = clamp(descriptionLineHeight, 1, 2.2, 1.5);
  const resolvedDateLineHeight = clamp(dateLineHeight, 1, 2.2, 1.3);
  const resolvedTitleLetterSpacing = Number.isFinite(titleLetterSpacing) ? titleLetterSpacing : 0;
  const resolvedDescLetterSpacing = Number.isFinite(descriptionLetterSpacing)
    ? descriptionLetterSpacing
    : 0;
  const resolvedDateLetterSpacing = Number.isFinite(dateLetterSpacing) ? dateLetterSpacing : 0;

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    gap: `${containerGap}px`,
    padding: spacingValueToCss(padding),
    margin: spacingValueToCss(margin),
    background: colorValueToCss(background),
    width: width || '100%',
    boxSizing: 'border-box',
    minHeight: '80px',
    position: 'relative',
    overflow: 'visible',
    ...(wrapperStyle ?? {}),
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const lineStyle: React.CSSProperties = isVertical
    ? {
        position: 'absolute',
        left: '10px',
        top: 0,
        bottom: 0,
        width: '2px',
        background: colorValueToCss(lineColor),
        pointerEvents: 'none',
      }
    : {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '12px',
        height: '2px',
        background: colorValueToCss(lineColor),
        pointerEvents: 'none',
      };

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };

  const renderItem = (item: TimelineItem, index: number) => {
    const IconComponent = resolveIconComponent(item.iconName);
    const markerStyle: React.CSSProperties = {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: colorValueToCss(markerColor),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text-inverse)',
      flexShrink: 0,
    };

    const cardStyle: React.CSSProperties = {
      position: 'relative',
      background: colorValueToCss(itemBackground),
      border: borderValueToCss(itemBorder),
      borderRadius: itemBorderRadius,
      padding: spacingValueToCss(itemPadding),
      boxShadow: SHADOW_MAP[shadow],
      minWidth: isVertical ? 'auto' : '220px',
    };

    const titleStyle: React.CSSProperties = {
      margin: 0,
      color: colorValueToCss(titleColor),
      fontFamily: resolvedTitleFont,
      fontWeight: FONT_WEIGHT_MAP[titleFontWeight] ?? 600,
      fontSize: `${resolvedTitleSize}px`,
      lineHeight: resolvedTitleLineHeight.toString(),
      letterSpacing: `${resolvedTitleLetterSpacing}px`,
      textTransform: titleTransform ?? 'none',
    };

    const descStyle: React.CSSProperties = {
      margin: 0,
      color: colorValueToCss(descriptionColor),
      fontFamily: resolvedDescriptionFont,
      fontWeight: DESCRIPTION_WEIGHT_MAP[descriptionFontWeight] ?? 400,
      fontSize: `${resolvedDescSize}px`,
      lineHeight: resolvedDescLineHeight.toString(),
      letterSpacing: `${resolvedDescLetterSpacing}px`,
      textTransform: descriptionTransform ?? 'none',
    };

    const dateStyle: React.CSSProperties = {
      margin: 0,
      color: colorValueToCss(dateColor),
      fontFamily: resolvedDateFont,
      fontWeight: DATE_WEIGHT_MAP[dateFontWeight] ?? 500,
      fontSize: `${resolvedDateSize}px`,
      lineHeight: resolvedDateLineHeight.toString(),
      letterSpacing: `${resolvedDateLetterSpacing}px`,
      textTransform: dateTransform ?? 'none',
    };

    const rowStyle: React.CSSProperties = isVertical
      ? { display: 'grid', gridTemplateColumns: '40px 1fr', gap: `${contentGap}px` }
      : {
          display: 'flex',
          flexDirection: 'column',
          gap: `${contentGap}px`,
          position: 'relative',
          minWidth: '220px',
        };

    const markerWrapper: React.CSSProperties = isVertical
      ? {
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginTop: '4px',
        }
      : { position: 'relative', display: 'flex', alignItems: 'center', gap: `${contentGap}px` };

    return (
      <div key={item.id || index} style={rowStyle}>
        <div style={markerWrapper}>
          <div style={markerStyle}>
            {showIcons && IconComponent ? <IconComponent size={12} /> : null}
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${contentGap}px` }}>
            {item.date ? <p style={dateStyle}>{item.date}</p> : null}
            {item.title ? <h3 style={titleStyle}>{item.title}</h3> : null}
            {item.description ? <p style={descStyle}>{item.description}</p> : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={innerRef}
      data-block-type="timeline"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      style={containerStyle}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      <div style={{ position: 'relative', flex: 1 }}>
        <span style={lineStyle} aria-hidden />
        <div
          style={{
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            gap: `${containerGap}px`,
          }}
        >
          {resolvedItems.map(renderItem)}
        </div>
      </div>
    </div>
  );
}
