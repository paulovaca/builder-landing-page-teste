import React from 'react';

import {
  borderValueToCss,
  colorValueToCss,
  spacingValueToCss,
} from '@/components/site-blocks/utils';
import type {
  BorderValue,
  ColorValue,
  HeadingSEOConfig,
  SpacingValue,
  VisibilityConfig,
} from '@/lib/site-renderer/types';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingWeight = 'regular' | 'medium' | 'bold';

export type HeadingShadow = 'none' | 'soft' | 'medium';

export interface HeadingBlockProps {
  text: string;
  level: HeadingLevel;
  align: 'left' | 'center' | 'right';
  color: ColorValue;
  maxWidth: string;
  spacingBelow: number;
  uppercase: boolean;
  emphasis: boolean;
  weight: HeadingWeight;
  fontSize: number;
  seo?: HeadingSEOConfig;
  margin: SpacingValue;
  padding: SpacingValue;
  background: ColorValue;
  border: BorderValue;
  borderRadius: number;
  shadow: HeadingShadow;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  id?: string;
  className?: string;
}

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
    typeof fontSize === 'number' && !Number.isNaN(fontSize)
      ? Math.max(
          1,
          Math.min(
            2,
            (baseTypography.lineHeight * resolvedFontSize) / parseInt(baseTypography.fontSize, 10),
          ),
        )
      : baseTypography.lineHeight;

  const headingStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(color),
    textAlign: align,
    fontSize: `${resolvedFontSize}px`,
    lineHeight: resolvedLineHeight,
    maxWidth: maxWidth || '100%',
    fontWeight: WEIGHT_MAP[weight],
    textTransform: uppercase ? 'uppercase' : undefined,
    letterSpacing: uppercase ? '0.05em' : undefined,
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
