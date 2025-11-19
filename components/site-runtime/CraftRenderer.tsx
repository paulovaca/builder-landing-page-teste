'use client';

import React from 'react';

import type { SerializedNodesMap } from '@/lib/site-renderer/types';
import { siteRuntimeResolver } from './resolver';

type CraftRendererProps = {
  data: SerializedNodesMap;
  rootId?: string;
};

function renderNode(id: string, nodes: SerializedNodesMap): React.ReactNode {
  const node = nodes[id];
  if (!node) {
    return null;
  }

  const resolvedName = node.type?.resolvedName;
  const resolverMap = siteRuntimeResolver as unknown as Record<
    string,
    React.ComponentType<Record<string, unknown>>
  >;
  const Component = resolvedName ? resolverMap[resolvedName] : null;
  if (!Component) {
    return null;
  }

  const children: React.ReactNode[] = [];
  if (Array.isArray(node.nodes)) {
    node.nodes.forEach((childId) => {
      const child = renderNode(childId, nodes);
      if (child) {
        children.push(child);
      }
    });
  }

  if (node.linkedNodes) {
    Object.values(node.linkedNodes).forEach((childId) => {
      const child = renderNode(childId, nodes);
      if (child) {
        children.push(child);
      }
    });
  }

  return React.createElement(
    Component,
    { ...node.props, key: id },
    children.length > 0 ? children : undefined,
  );
}

export function CraftRenderer({ data, rootId = 'ROOT' }: CraftRendererProps) {
  return <>{renderNode(rootId, data)}</>;
}
