import React from 'react';

import type { AccordionBlockProps, AccordionItemConfig } from '@/lib/site-renderer/types';
export type { AccordionBlockProps, AccordionItemConfig } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';
import styles from './accordion-block.module.css';
import { ArrowDown, ChevronDown, Plus } from 'lucide-react';

const SHADOW_MAP: Record<AccordionBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

const FONT_WEIGHT_MAP: Record<AccordionBlockProps['headerFontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const ICON_MAP: Record<AccordionBlockProps['iconType'], typeof ChevronDown> = {
  chevron: ChevronDown,
  plus: Plus,
  arrow: ArrowDown,
};

const FALLBACK_ITEMS: AccordionItemConfig[] = [
  { id: 'accordion-1', title: 'Primeiro item' },
  { id: 'accordion-2', title: 'Segundo item' },
  { id: 'accordion-3', title: 'Terceiro item' },
];

const ensureItems = (items?: AccordionItemConfig[]) => {
  if (Array.isArray(items) && items.length > 0) {
    return items;
  }
  return FALLBACK_ITEMS;
};

const resolveOpenItems = (
  items: AccordionItemConfig[],
  requested: AccordionBlockProps['openItems'] | undefined,
  allowMultiple: AccordionBlockProps['allowMultipleOpen'] = true,
) => {
  const validRequested = Array.isArray(requested)
    ? requested.filter((id) => items.some((item) => item.id === id))
    : [];

  if (validRequested.length > 0) {
    return allowMultiple ? validRequested : [validRequested[0]];
  }

  if (requested === undefined) {
    const firstId = items[0]?.id;
    return firstId ? [firstId] : [];
  }

  return [];
};

export function AccordionBlock({
  items,
  openItems,
  allowMultipleOpen,
  iconType,
  itemGap,
  headerBackground,
  headerTextColor,
  headerFontFamily,
  headerFontWeight,
  headerTextSize,
  headerLineHeight,
  headerLetterSpacing,
  headerTextTransform,
  headerTextAlign,
  headerPadding,
  itemBorderRadius,
  contentBackground,
  contentTextColor,
  contentPadding,
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
  onToggleItem,
  showEmptyState = false,
  id,
  className,
}: AccordionBlockProps) {
  const resolvedItems = ensureItems(items);
  const resolvedOpenItems = resolveOpenItems(resolvedItems, openItems, allowMultipleOpen);
  const childArray = React.Children.toArray(children);
  const gapValue = typeof itemGap === 'number' ? itemGap : 12;
  const itemRadius = typeof itemBorderRadius === 'number' ? itemBorderRadius : 12;
  const lineHeightValue = typeof headerLineHeight === 'number' ? headerLineHeight : 1.4;
  const letterSpacingValue = typeof headerLetterSpacing === 'number' ? headerLetterSpacing : 0;

  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    padding: spacingValueToCss(padding),
    margin: spacingValueToCss(margin),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
    ['--accordion-gap' as string]: `${gapValue}px`,
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const headerStyle: React.CSSProperties = {
    background: colorValueToCss(headerBackground),
    color: colorValueToCss(headerTextColor),
    padding: spacingValueToCss(headerPadding),
    fontFamily: headerFontFamily,
    fontWeight: FONT_WEIGHT_MAP[headerFontWeight] ?? 500,
    fontSize: `${headerTextSize}px`,
    lineHeight: lineHeightValue,
    letterSpacing: `${letterSpacingValue}px`,
    textTransform:
      headerTextTransform && headerTextTransform !== 'none' ? headerTextTransform : undefined,
    textAlign: headerTextAlign,
  };

  const contentStyle: React.CSSProperties = {
    background: colorValueToCss(contentBackground),
    color: colorValueToCss(contentTextColor),
    padding: spacingValueToCss(contentPadding),
  };

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const resolvedClassName =
    [styles.accordionWrapper, wrapperClassName, className?.trim()].filter(Boolean).join(' ') ||
    undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  const visibleConfig = visibleOn ?? { desktop: true, tablet: true, mobile: true };
  const IconComponent = ICON_MAP[iconType] ?? ChevronDown;

  const handleToggle = (itemId: string, shouldOpen: boolean) => {
    onToggleItem?.(itemId, shouldOpen);
  };

  return (
    <section
      ref={innerRef}
      style={{ ...containerStyle, ...(wrapperStyle ?? {}) }}
      className={resolvedClassName}
      data-block-type="accordion"
      data-visible-desktop={visibleConfig.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleConfig.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleConfig.mobile ? 'true' : 'false'}
      id={sanitizedId}
      {...restWrapperProps}
    >
      <div className={styles.accordion}>
        {resolvedItems.map((item, index) => {
          const isOpen = resolvedOpenItems.includes(item.id);
          const contentId = `accordion-content-${item.id}`;
          const headingId = `accordion-header-${item.id}`;
          const content = childArray[index];
          const titleLabel = item.title || `Item ${index + 1}`;

          return (
            <div
              key={`${item.id}-${index}`}
              className={styles.item}
              data-open={isOpen ? 'true' : 'false'}
              style={{ borderRadius: itemRadius }}
            >
              <button
                type="button"
                className={styles.header}
                style={headerStyle}
                aria-expanded={isOpen}
                aria-controls={contentId}
                id={headingId}
                onClick={() => handleToggle(item.id, !isOpen)}
              >
                <span className={styles.title}>{titleLabel}</span>
                <span className={styles.icon} data-open={isOpen ? 'true' : 'false'}>
                  <IconComponent size={18} />
                </span>
              </button>

              <div
                className={styles.content}
                id={contentId}
                role="region"
                aria-labelledby={headingId}
                hidden={!isOpen}
                data-open={isOpen ? 'true' : 'false'}
              >
                <div className={styles.contentInner} style={contentStyle}>
                  {content ||
                    (showEmptyState ? (
                      <p className={styles.placeholder}>
                        Sem conteúdo neste item ainda. Arraste blocos para &quot;{titleLabel}
                        &quot;.
                      </p>
                    ) : null)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
