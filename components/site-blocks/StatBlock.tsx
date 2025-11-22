import React from 'react';

import type { StatBlockProps } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

const SHADOW_MAP: Record<StatBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
};

const FONT_WEIGHT_MAP: Record<StatBlockProps['numberFontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const LABEL_WEIGHT_MAP: Record<StatBlockProps['labelFontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const ALIGN_MAP: Record<StatBlockProps['textAlign'], React.CSSProperties['alignItems']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const clamp = (value: number, min: number, max: number, fallback: number) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
};

export function StatBlock({
  value,
  suffix,
  label,
  numberColor,
  labelColor,
  numberFontFamily,
  numberFontWeight,
  numberSize,
  numberLineHeight,
  numberLetterSpacing,
  numberTransform,
  labelFontFamily,
  labelFontWeight,
  labelSize,
  labelLineHeight,
  labelLetterSpacing,
  labelTransform,
  gap,
  padding,
  margin,
  background,
  border,
  borderRadius,
  shadow,
  textAlign,
  width,
  height,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: StatBlockProps) {
  const resolvedNumberSize = clamp(numberSize, 16, 96, 42);
  const resolvedLabelSize = clamp(labelSize, 10, 36, 16);
  const resolvedNumberLineHeight = clamp(numberLineHeight, 1, 2, 1.1);
  const resolvedLabelLineHeight = clamp(labelLineHeight, 1, 2.4, 1.4);
  const resolvedNumberSpacing = Number.isFinite(numberLetterSpacing) ? numberLetterSpacing : 0;
  const resolvedLabelSpacing = Number.isFinite(labelLetterSpacing) ? labelLetterSpacing : 0;
  const alignItems = ALIGN_MAP[textAlign] ?? 'flex-start';
  const resolvedNumberFontFamily = numberFontFamily?.trim() || 'var(--font-family-sans)';
  const resolvedLabelFontFamily = labelFontFamily?.trim() || 'var(--font-family-sans)';

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems,
    gap: `${Math.max(0, gap)}px`,
    padding: spacingValueToCss(padding),
    margin: spacingValueToCss(margin),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
    width: width || '100%',
    boxSizing: 'border-box',
    textAlign,
    minHeight: '60px',
    ...(wrapperStyle ?? {}),
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const numberRowStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: suffix ? '6px' : undefined,
  };

  const numberStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(numberColor),
    fontFamily: resolvedNumberFontFamily,
    fontWeight: FONT_WEIGHT_MAP[numberFontWeight] ?? 700,
    fontSize: `${resolvedNumberSize}px`,
    lineHeight: resolvedNumberLineHeight.toString(),
    letterSpacing: `${resolvedNumberSpacing}px`,
    textTransform: numberTransform ?? 'none',
  };

  const suffixStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(numberColor),
    fontFamily: resolvedNumberFontFamily,
    fontWeight: FONT_WEIGHT_MAP[numberFontWeight] ?? 700,
    fontSize: `${Math.max(10, resolvedNumberSize * 0.6)}px`,
    lineHeight: resolvedNumberLineHeight.toString(),
    letterSpacing: `${resolvedNumberSpacing}px`,
    textTransform: numberTransform ?? 'none',
  };

  const labelStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(labelColor),
    fontFamily: resolvedLabelFontFamily,
    fontWeight: LABEL_WEIGHT_MAP[labelFontWeight] ?? 500,
    fontSize: `${resolvedLabelSize}px`,
    lineHeight: resolvedLabelLineHeight.toString(),
    letterSpacing: `${resolvedLabelSpacing}px`,
    textTransform: labelTransform ?? 'none',
  };

  const combinedClassName =
    [wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };

  return (
    <div
      ref={innerRef}
      data-block-type="stat"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      style={containerStyle}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      <div style={numberRowStyle}>
        <p style={numberStyle}>{value}</p>
        {suffix ? <p style={suffixStyle}>{suffix}</p> : null}
      </div>
      {label ? <p style={labelStyle}>{label}</p> : null}
    </div>
  );
}
