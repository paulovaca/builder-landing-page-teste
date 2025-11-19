import React from 'react';

import type { BorderValue, ColorValue, SpacingValue } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

export type CardShadow = 'none' | 'soft' | 'medium' | 'strong';

const SHADOW_MAP: Record<CardShadow, string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
  strong: 'var(--shadow-lg)',
};

export interface CardBlockProps {
  background: ColorValue;
  padding: SpacingValue;
  gap: number;
  borderRadius: number;
  border: BorderValue;
  shadow: CardShadow;
  maxWidth: string;
  alignItems: 'stretch' | 'flex-start' | 'center' | 'flex-end';
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  children?: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  showEmptyState?: boolean;
}

export function CardBlock({
  background,
  padding,
  gap,
  borderRadius,
  border,
  shadow,
  maxWidth,
  alignItems,
  justifyContent,
  children,
  innerRef,
  wrapperProps,
  showEmptyState = false,
}: CardBlockProps) {
  const style: React.CSSProperties = {
    background: colorValueToCss(background),
    padding: spacingValueToCss(padding),
    borderRadius,
    border: borderValueToCss(border),
    boxShadow: SHADOW_MAP[shadow],
    display: 'flex',
    flexDirection: 'column',
    gap: `${gap}px`,
    width: '100%',
    maxWidth: maxWidth || '100%',
    alignItems,
    justifyContent,
    minHeight: '120px',
  };

  return (
    <div ref={innerRef} style={style} data-block-type="card" {...wrapperProps}>
      {children ||
        (showEmptyState ? (
          <p
            style={{
              margin: 0,
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Arraste elementos para dentro deste cartão.
          </p>
        ) : null)}
    </div>
  );
}
