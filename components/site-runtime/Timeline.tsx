'use client';

import React from 'react';

import { TimelineBlock } from '@/components/site-blocks/TimelineBlock';
import type { TimelineBlockProps } from '@/lib/site-renderer/types';

export type TimelineRuntimeProps = TimelineBlockProps;

export function TimelineRuntime(props: TimelineRuntimeProps) {
  return <TimelineBlock {...props} />;
}
