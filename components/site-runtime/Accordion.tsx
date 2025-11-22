'use client';

import React from 'react';

import {
  AccordionBlock,
  type AccordionBlockProps,
  type AccordionItemConfig,
} from '@/components/site-blocks/AccordionBlock';

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

const computeNextOpen = (
  current: string[],
  itemId: string,
  shouldOpen: boolean,
  allowMultiple: boolean,
  items: AccordionItemConfig[],
) => {
  const validCurrent = resolveOpenItems(items, current, allowMultiple);

  if (shouldOpen) {
    return allowMultiple ? Array.from(new Set([...validCurrent, itemId])) : [itemId];
  }

  const next = allowMultiple ? validCurrent.filter((id) => id !== itemId) : [];
  return resolveOpenItems(items, next, allowMultiple);
};

export type AccordionRuntimeProps = AccordionBlockProps;

export function AccordionRuntime(props: AccordionRuntimeProps) {
  const items = ensureItems(props.items);
  const [openItems, setOpenItems] = React.useState<string[]>(() =>
    resolveOpenItems(items, props.openItems, props.allowMultipleOpen),
  );

  React.useEffect(() => {
    setOpenItems(resolveOpenItems(items, props.openItems, props.allowMultipleOpen));
  }, [props.openItems, props.allowMultipleOpen, items]);

  const handleToggle = (itemId: string, shouldOpen: boolean) => {
    setOpenItems((current) =>
      computeNextOpen(current, itemId, shouldOpen, props.allowMultipleOpen, items),
    );
  };

  return (
    <AccordionBlock {...props} items={items} openItems={openItems} onToggleItem={handleToggle} />
  );
}
