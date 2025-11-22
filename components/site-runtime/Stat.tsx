'use client';

import React from 'react';

import { StatBlock } from '@/components/site-blocks/StatBlock';
import type { StatBlockProps } from '@/lib/site-renderer/types';

export type StatRuntimeProps = StatBlockProps;

export function StatRuntime(props: StatRuntimeProps) {
  return <StatBlock {...props} />;
}
