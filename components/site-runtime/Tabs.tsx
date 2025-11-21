'use client';

import React from 'react';

import { TabsBlock, type TabsBlockProps } from '@/components/site-blocks/TabsBlock';

const FALLBACK_TABS = [
  { id: 'tab-hero', title: 'Primeira aba' },
  { id: 'tab-features', title: 'Segunda aba' },
  { id: 'tab-extra', title: 'Terceira aba' },
];

const ensureTabs = (tabs?: TabsBlockProps['tabs']) =>
  Array.isArray(tabs) && tabs.length > 0 ? tabs : FALLBACK_TABS;

const resolveActive = (tabs: TabsBlockProps['tabs'], desired?: string) => {
  if (desired && tabs.some((tab) => tab.id === desired)) {
    return desired;
  }
  return tabs[0]?.id;
};

export type TabsRuntimeProps = TabsBlockProps;

export function TabsRuntime(props: TabsRuntimeProps) {
  const tabItems = ensureTabs(props.tabs);
  const [current, setCurrent] = React.useState<string | undefined>(() =>
    resolveActive(tabItems, props.activeTabId),
  );

  React.useEffect(() => {
    setCurrent(resolveActive(tabItems, props.activeTabId));
  }, [props.activeTabId, tabItems]);

  return (
    <TabsBlock
      {...props}
      tabs={tabItems}
      activeTabId={current}
      onSelectTab={(tabId) => setCurrent(tabId)}
    />
  );
}
