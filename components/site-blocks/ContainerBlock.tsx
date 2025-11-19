import React from 'react';

import type { BorderValue, ColorValue, SpacingValue } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';

export type ContainerDirection = 'row' | 'column';
export type ContainerShadow = 'none' | 'soft' | 'medium';

const SHADOW_MAP: Record<ContainerShadow, string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

export interface ContainerBlockProps {
  background: ColorValue;
  padding: SpacingValue;
  gap: number;
  direction: ContainerDirection;
  wrap: boolean;
  alignHorizontal: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  alignVertical: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  borderRadius: number;
  border: BorderValue;
  maxWidth: string;
  centerContent: boolean;
  shadow: ContainerShadow;
  children?: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  showEmptyState?: boolean;
}

export function ContainerBlock({
  background,
  padding,
  gap,
  direction,
  wrap,
  alignHorizontal,
  alignVertical,
  borderRadius,
  border,
  maxWidth,
  centerContent,
  shadow,
  children,
  innerRef,
  wrapperProps,
  showEmptyState = false,
}: ContainerBlockProps) {
  const style: React.CSSProperties = {
    width: '100%',
    maxWidth: centerContent ? maxWidth || '1200px' : '100%',
    margin: centerContent ? '0 auto' : undefined,
    display: 'flex',
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: `${gap}px`,
    padding: spacingValueToCss(padding),
    background: colorValueToCss(background),
    borderRadius,
    border: borderValueToCss(border),
    boxShadow: SHADOW_MAP[shadow],
    alignItems: alignVertical,
    justifyContent: alignHorizontal,
    minHeight: '80px',
  };

  return (
    <div ref={innerRef} style={style} data-block-type="container" {...wrapperProps}>
      {children ||
        (showEmptyState ? (
          <p
            style={{
              margin: 0,
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Este container aceita qualquer bloco. Arraste componentes para dentro.
          </p>
        ) : null)}
    </div>
  );
}
