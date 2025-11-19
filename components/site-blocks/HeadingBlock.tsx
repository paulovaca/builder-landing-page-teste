import React from 'react';

import { colorValueToCss } from '@/components/site-blocks/utils';
import type { ColorValue, HeadingSEOConfig } from '@/lib/site-renderer/types';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingWeight = 'regular' | 'medium' | 'bold';

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
  seo?: HeadingSEOConfig;
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
  renderContent,
  innerRef,
  wrapperProps,
}: HeadingBlockViewProps) {
  const typography = LEVEL_STYLES[level] ?? LEVEL_STYLES.h2;

  const headingStyle: React.CSSProperties = {
    margin: 0,
    color: colorValueToCss(color),
    textAlign: align,
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight,
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

  return (
    <div ref={innerRef} data-block-type="heading" {...wrapperProps}>
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
