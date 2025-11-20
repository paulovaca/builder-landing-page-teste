import React from 'react';

import {
  borderValueToCss,
  colorValueToCss,
  spacingValueToCss,
} from '@/components/site-blocks/utils';
import type {
  HeadingBlockProps as BaseHeadingBlockProps,
  TextTransformOption,
  TextWeightOption,
} from '@/lib/site-renderer/types';

export interface HeadingBlockProps extends BaseHeadingBlockProps {
  uppercase?: boolean;
  emphasis?: boolean;
}

export type HeadingLevel = HeadingBlockProps['level'];
export type HeadingWeight = TextWeightOption;
export type HeadingShadow = 'none' | 'soft' | 'medium';

const LEVEL_STYLES: Record<HeadingLevel, { fontSize: string; lineHeight: number }> = {
  h1: { fontSize: '48px', lineHeight: 1.1 },
  h2: { fontSize: '36px', lineHeight: 1.2 },
  h3: { fontSize: '30px', lineHeight: 1.25 },
  h4: { fontSize: '24px', lineHeight: 1.3 },
  h5: { fontSize: '20px', lineHeight: 1.35 },
  h6: { fontSize: '18px', lineHeight: 1.4 },
};

const WEIGHT_MAP: Record<HeadingWeight, number> = {
  regular: 500,
  medium: 600,
  semibold: 600,
  bold: 700,
};

const HEADING_SHADOW_MAP: Record<HeadingShadow, string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

export type HeadingBlockRenderContent = (text: string) => React.ReactNode;

export type HeadingBlockViewProps = HeadingBlockProps & {
  renderContent?: HeadingBlockRenderContent;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
};

export function HeadingBlock({
  text,
  level,
  align,
  color,
  maxWidth,
  spacingBelow,
  uppercase,
  emphasis,
  weight,
  fontSize,
  fontFamily,
  lineHeight,
  letterSpacing,
  textTransform,
  renderContent,
  innerRef,
  wrapperProps,
  margin,
  padding,
  background,
  border,
  borderRadius,
  shadow,
  width,
  height,
  visibleOn,
  id,
  className,
}: HeadingBlockViewProps) {
  const baseTypography = LEVEL_STYLES[level] ?? LEVEL_STYLES.h2;
  const resolvedFontSize =
    typeof fontSize === 'number' && !Number.isNaN(fontSize)
      ? Math.max(14, Math.min(160, fontSize))
      : parseInt(baseTypography.fontSize, 10);
  const resolvedLineHeight =
    typeof lineHeight === 'number' && Number.isFinite(lineHeight)
      ? Math.max(1, Math.min(2.4, lineHeight))
      : baseTypography.lineHeight;

  const resolvedFontFamily = fontFamily?.trim() || 'var(--font-family-sans)';
  const resolvedLetterSpacing =
    typeof letterSpacing === 'number' && Number.isFinite(letterSpacing)
      ? `${letterSpacing}px`
      : '0px';
  const resolvedTransform: TextTransformOption =
    textTransform ?? (uppercase ? 'uppercase' : ('none' as TextTransformOption));

  const headingStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(color),
    textAlign: align,
    fontSize: `${resolvedFontSize}px`,
    lineHeight: resolvedLineHeight,
    fontFamily: resolvedFontFamily,
    letterSpacing: resolvedLetterSpacing,
    maxWidth: maxWidth || '100%',
    fontWeight: WEIGHT_MAP[weight],
    textTransform: resolvedTransform,
    marginBottom: `${spacingBelow}px`,
    position: 'relative',
    display: 'inline-block',
  };

  const renderHeadingContent = () => {
    if (renderContent) {
      return renderContent(text);
    }
    return text;
  };

  const tagName: HeadingLevel = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(level) ? level : 'h2';

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
    boxShadow: HEADING_SHADOW_MAP[shadow],
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
      data-block-type="heading"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      style={containerStyle}
      id={sanitizedId}
      className={combinedClassName}
      {...restWrapperProps}
    >
      {React.createElement(
        tagName,
        { style: { textAlign: align } },
        <span style={headingStyle}>
          {renderHeadingContent()}
          {emphasis && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                bottom: '-6px',
                width: '40%',
                height: '8px',
                background: 'var(--color-accent-soft)',
                borderRadius: 'var(--radius-full)',
              }}
            />
          )}
        </span>,
      )}
    </div>
  );
}
