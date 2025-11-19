import React from 'react';

import type { ColorValue, SpacingValue } from '@/lib/site-renderer/types';

import { colorValueToCss, spacingValueToCss } from './utils';

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
}

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
}: TextBlockProps) {
  const style: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(color),
    textAlign: align,
    fontSize: TEXT_VARIANT_STYLES[variant].fontSize,
    lineHeight: lineHeight.toString(),
    fontWeight: TEXT_FONT_WEIGHT_MAP[fontWeight],
    maxWidth: maxWidth || '100%',
    padding: spacingValueToCss(padding),
  };

  const content = renderContent ? renderContent(text) : text;

  return (
    <div ref={innerRef} data-block-type="text" {...wrapperProps}>
      <p style={style}>{content}</p>
    </div>
  );
}
