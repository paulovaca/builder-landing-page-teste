import React from 'react';

import type { ColumnsBlockProps } from '@/lib/site-renderer/types';
export type { ColumnsBlockProps } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';
import styles from './columns-block.module.css';

const SHADOW_MAP: Record<ColumnsBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

const COLUMN_ALIGN_MAP: Record<
  ColumnsBlockProps['columnVerticalAlign'],
  React.CSSProperties['justifyContent']
> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

const TWO_COLUMNS_TEMPLATE: Record<ColumnsBlockProps['ratio'], string> = {
  '50-50': 'repeat(2, minmax(0, 1fr))',
  '70-30': 'minmax(0, 2fr) minmax(0, 1fr)',
  '30-70': 'minmax(0, 1fr) minmax(0, 2fr)',
  '33-33-33': 'repeat(2, minmax(0, 1fr))', // fallback when ratio is inconsistent with layout
};

const THREE_COLUMNS_TEMPLATE = 'repeat(3, minmax(0, 1fr))';

const resolveTemplateColumns = (
  layout: ColumnsBlockProps['layout'],
  ratio: ColumnsBlockProps['ratio'],
) => {
  if (layout === 'three') {
    return THREE_COLUMNS_TEMPLATE;
  }

  return TWO_COLUMNS_TEMPLATE[ratio] ?? TWO_COLUMNS_TEMPLATE['50-50'];
};

const ensureColumns = (columns: ColumnsBlockProps['columns']) => {
  if (Array.isArray(columns) && columns.length > 0) {
    return columns;
  }

  return [
    { id: 'column-1', title: 'Coluna 1' },
    { id: 'column-2', title: 'Coluna 2' },
  ];
};

export function ColumnsBlock({
  layout,
  ratio,
  gap,
  mobileBehavior,
  columns,
  columnPadding,
  columnBackground,
  columnBorderRadius,
  columnVerticalAlign,
  padding,
  margin,
  background,
  border,
  borderRadius,
  shadow,
  width,
  height,
  visibleOn,
  children,
  innerRef,
  wrapperProps,
  showEmptyState = false,
  id,
  className,
}: ColumnsBlockProps) {
  const columnCount = layout === 'three' ? 3 : 2;
  const resolvedColumns = ensureColumns(columns);
  const templateColumns = resolveTemplateColumns(layout, ratio);
  const childArray = React.Children.toArray(children);

  const baseStyle: React.CSSProperties = {
    width: width || '100%',
    padding: spacingValueToCss(padding),
    margin: spacingValueToCss(margin),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
  };

  if (height && height !== 'auto') {
    baseStyle.height = height;
    baseStyle.minHeight = height;
  }

  const gridStyle: React.CSSProperties = {
    gap: `${gap}px`,
    gridTemplateColumns: templateColumns,
  };

  const gridCssVars: Record<string, string> = {
    '--column-gap': `${gap}px`,
  };

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const combinedWrapperStyle: React.CSSProperties = {
    ...baseStyle,
    ...(wrapperStyle ?? {}),
  };

  const resolvedClassName =
    [styles.columnsWrapper, wrapperClassName, className?.trim()].filter(Boolean).join(' ') ||
    undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  return (
    <section
      ref={innerRef}
      style={combinedWrapperStyle}
      className={resolvedClassName}
      data-block-type="columns"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      id={sanitizedId}
      {...restWrapperProps}
    >
      <div
        className={styles.columnsGrid}
        style={{ ...gridStyle, ...gridCssVars }}
        data-layout={layout}
        data-ratio={ratio}
        data-mobile-behavior={mobileBehavior}
      >
        {resolvedColumns.map((column, index) => {
          const isVisible = index < columnCount;
          const columnLabel = column.title || `Coluna ${index + 1}`;
          const columnStyle: React.CSSProperties = {
            padding: spacingValueToCss(columnPadding),
            background: colorValueToCss(columnBackground),
            borderRadius: columnBorderRadius,
            justifyContent: COLUMN_ALIGN_MAP[columnVerticalAlign],
          };

          const content = childArray[index] ?? null;

          return (
            <div
              key={`${column.id}-${index}`}
              className={styles.column}
              data-column-id={column.id}
              data-hidden={isVisible ? 'false' : 'true'}
              aria-hidden={isVisible ? undefined : 'true'}
              style={{
                ...columnStyle,
                display: isVisible ? undefined : 'none',
              }}
            >
              {content ||
                (showEmptyState ? (
                  <p className={styles.placeholder}>
                    Arraste blocos para preencher a {columnLabel.toLowerCase()}.
                  </p>
                ) : null)}
            </div>
          );
        })}
      </div>
    </section>
  );
}
