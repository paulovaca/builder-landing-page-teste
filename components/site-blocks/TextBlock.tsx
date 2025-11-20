import React from 'react';

import type {
  TextAlignOption,
  TextBlockProps as TextBlockPropsType,
  TextTransformOption,
  TextWeightOption,
} from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

export type TextBlockProps = TextBlockPropsType;
export type TextVariant = TextBlockProps['variant'];
export type TextWeight = TextWeightOption;

const TEXT_SHADOW_MAP: Record<TextBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
};

export const TEXT_VARIANT_STYLES: Record<TextVariant, { fontSize: string }> = {
  body: { fontSize: '16px' },
  lead: { fontSize: '20px' },
  caption: { fontSize: '14px' },
};

export const TEXT_FONT_WEIGHT_MAP: Record<TextWeight, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export function TextBlock({
  text,
  variant,
  align,
  color,
  maxWidth,
  padding,
  lineHeight,
  fontWeight,
  textSize,
  fontFamily,
  letterSpacing,
  textTransform,
  innerRef,
  wrapperProps,
  renderContent,
  margin,
  background,
  border,
  borderRadius,
  shadow,
  width,
  height,
  visibleOn,
  id,
  className,
}: TextBlockProps) {
  const resolvedFontSize =
    typeof textSize === 'number' && !Number.isNaN(textSize)
      ? Math.max(10, Math.min(120, textSize))
      : parseInt(TEXT_VARIANT_STYLES[variant].fontSize, 10);
  const resolvedFontFamily = fontFamily?.trim() || 'var(--font-family-sans)';
  const resolvedLetterSpacing =
    typeof letterSpacing === 'number' && Number.isFinite(letterSpacing)
      ? `${letterSpacing}px`
      : '0px';
  const resolvedTransform: TextTransformOption = textTransform ?? ('none' as TextTransformOption);

  const textStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(color),
    textAlign: align as TextAlignOption,
    fontSize: `${resolvedFontSize}px`,
    lineHeight: lineHeight.toString(),
    fontWeight: TEXT_FONT_WEIGHT_MAP[fontWeight],
    fontFamily: resolvedFontFamily,
    letterSpacing: resolvedLetterSpacing,
    textTransform: resolvedTransform,
    maxWidth: maxWidth || '100%',
  };

  const content = renderContent ? renderContent(text) : text;

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    margin: spacingValueToCss(margin),
    padding: spacingValueToCss(padding),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: TEXT_SHADOW_MAP[shadow],
    width: width || '100%',
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
      data-block-type="text"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      style={containerStyle}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      <p style={textStyle}>{content}</p>
    </div>
  );
}
