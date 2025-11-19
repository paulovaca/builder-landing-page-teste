import React from 'react';

import type {
  BorderValue,
  ColorValue,
  SpacingValue,
  VisibilityConfig,
} from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

export type TextVariant = 'body' | 'lead' | 'caption';
export type TextWeight = 'regular' | 'medium' | 'semibold';

export interface TextBlockProps {
  text: string;
  variant: TextVariant;
  align: 'left' | 'center' | 'right' | 'justify';
  color: ColorValue;
  maxWidth: string;
  padding: SpacingValue;
  lineHeight: number;
  fontWeight: TextWeight;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  renderContent?: (text: string) => React.ReactNode;
  margin: SpacingValue;
  background: ColorValue;
  border: BorderValue;
  borderRadius: number;
  shadow: 'none' | 'soft';
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  id?: string;
  className?: string;
}

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
  const textStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(color),
    textAlign: align,
    fontSize: TEXT_VARIANT_STYLES[variant].fontSize,
    lineHeight: lineHeight.toString(),
    fontWeight: TEXT_FONT_WEIGHT_MAP[fontWeight],
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
