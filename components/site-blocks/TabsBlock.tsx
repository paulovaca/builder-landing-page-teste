import React from 'react';

import type { TabItemConfig, TabsBlockProps } from '@/lib/site-renderer/types';
export type { TabsBlockProps, TabItemConfig } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';
import styles from './tabs-block.module.css';

const SHADOW_MAP: Record<TabsBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

const FONT_WEIGHT_MAP: Record<TabsBlockProps['tabFontWeight'], number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const FALLBACK_TABS: TabItemConfig[] = [
  { id: 'tab-1', title: 'Primeira aba' },
  { id: 'tab-2', title: 'Segunda aba' },
  { id: 'tab-3', title: 'Terceira aba' },
];

const ensureTabs = (tabs?: TabItemConfig[]) => {
  if (Array.isArray(tabs) && tabs.length > 0) {
    return tabs;
  }
  return FALLBACK_TABS;
};

const resolveActiveId = (tabs: TabItemConfig[], requested?: string) => {
  if (requested && tabs.some((tab) => tab.id === requested)) {
    return requested;
  }
  return tabs[0]?.id;
};

export function TabsBlock({
  tabs,
  activeTabId,
  variant,
  orientation,
  alignTabs,
  tabSpacing,
  tabPadding,
  tabFontFamily,
  tabFontWeight,
  tabTextSize,
  tabTextTransform,
  tabColor,
  tabActiveColor,
  tabBackground,
  tabActiveBackground,
  tabBorderRadius,
  indicatorColor,
  contentBackground,
  contentPadding,
  contentBorderRadius,
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
  onSelectTab,
  showEmptyState = false,
  id,
  className,
}: TabsBlockProps) {
  const resolvedTabs = ensureTabs(tabs);
  const resolvedActiveId = resolveActiveId(resolvedTabs, activeTabId);
  const childArray = React.Children.toArray(children);

  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    padding: spacingValueToCss(padding),
    margin: spacingValueToCss(margin),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
  };

  if (height && height !== 'auto') {
    containerStyle.height = height;
    containerStyle.minHeight = height;
  }

  const shouldStretch = alignTabs === 'stretch';

  const listStyle: React.CSSProperties =
    orientation === 'horizontal'
      ? {
          gap: `${tabSpacing}px`,
          justifyContent:
            alignTabs === 'center' ? 'center' : alignTabs === 'end' ? 'flex-end' : 'flex-start',
        }
      : {
          gap: `${tabSpacing}px`,
          alignItems: shouldStretch ? 'stretch' : 'flex-start',
        };

  const buttonBaseStyle: React.CSSProperties = {
    fontSize: `${tabTextSize}px`,
    fontFamily: tabFontFamily,
    fontWeight: FONT_WEIGHT_MAP[tabFontWeight] ?? 500,
    textTransform: tabTextTransform && tabTextTransform !== 'none' ? tabTextTransform : undefined,
    padding: spacingValueToCss(tabPadding),
    borderRadius: variant === 'pill' ? 999 : tabBorderRadius,
    flexGrow: orientation === 'horizontal' && shouldStretch ? 1 : undefined,
    width: orientation === 'vertical' && shouldStretch ? '100%' : undefined,
  };

  const panelStyle: React.CSSProperties = {
    background: colorValueToCss(contentBackground),
    padding: spacingValueToCss(contentPadding),
    borderRadius: contentBorderRadius,
  };

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const resolvedClassName =
    [styles.tabsWrapper, wrapperClassName, className?.trim()].filter(Boolean).join(' ') ||
    undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;

  const handleSelect = (tabId: string) => {
    if (tabId !== resolvedActiveId) {
      onSelectTab?.(tabId);
    }
  };

  const renderPanelContent = (content: React.ReactNode, tabTitle: string) => {
    if (content) {
      return content;
    }
    if (!showEmptyState) {
      return null;
    }
    return (
      <p className={styles.placeholder}>
        Sem conteúdo nesta aba ainda. Arraste blocos para &quot;{tabTitle}&quot;.
      </p>
    );
  };

  return (
    <section
      ref={innerRef}
      style={{ ...containerStyle, ...(wrapperStyle ?? {}) }}
      className={resolvedClassName}
      data-block-type="tabs"
      data-visible-desktop={visibleOn.desktop ? 'true' : 'false'}
      data-visible-tablet={visibleOn.tablet ? 'true' : 'false'}
      data-visible-mobile={visibleOn.mobile ? 'true' : 'false'}
      id={sanitizedId}
      {...restWrapperProps}
    >
      <div className={styles.tabsContainer} data-orientation={orientation}>
        <div
          className={styles.tabList}
          style={listStyle}
          data-variant={variant}
          data-orientation={orientation}
          role="tablist"
          aria-orientation={orientation}
        >
          {resolvedTabs.map((tab, index) => {
            const isActive = tab.id === resolvedActiveId;
            const buttonStyle: React.CSSProperties = {
              ...buttonBaseStyle,
              color: isActive ? colorValueToCss(tabActiveColor) : colorValueToCss(tabColor),
              background:
                variant === 'line'
                  ? 'transparent'
                  : isActive
                    ? colorValueToCss(tabActiveBackground)
                    : colorValueToCss(tabBackground),
              border:
                variant === 'card'
                  ? `1px solid ${
                      isActive ? colorValueToCss(indicatorColor) : 'var(--color-border)'
                    }`
                  : undefined,
              borderBottom:
                variant === 'line'
                  ? `3px solid ${isActive ? colorValueToCss(indicatorColor) : 'transparent'}`
                  : undefined,
            };

            return (
              <button
                key={tab.id}
                type="button"
                className={styles.tabButton}
                style={buttonStyle}
                data-active={isActive ? 'true' : 'false'}
                data-variant={variant}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => handleSelect(tab.id)}
              >
                {tab.title || `Aba ${index + 1}`}
              </button>
            );
          })}
        </div>

        <div className={styles.tabPanels}>
          {resolvedTabs.map((tab, index) => {
            const isActive = tab.id === resolvedActiveId;
            const content = childArray[index];
            return (
              <div
                key={tab.id}
                id={`tabpanel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                data-active={isActive ? 'true' : 'false'}
                className={styles.tabPanel}
                style={{
                  ...panelStyle,
                  display: isActive ? 'block' : 'none',
                }}
              >
                {renderPanelContent(content, tab.title || `Aba ${index + 1}`)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
