'use client';

import React from 'react';

import { IconCardBlock } from '@/components/site-blocks/IconCardBlock';
import type { IconCardBlockProps } from '@/lib/site-renderer/types';

export type IconCardRuntimeProps = IconCardBlockProps;

export function IconCardRuntime(props: IconCardRuntimeProps) {
  return <IconCardBlock {...props} />;
}
