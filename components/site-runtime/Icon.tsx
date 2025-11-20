'use client';

import React from 'react';

import { IconBlock } from '@/components/site-blocks/IconBlock';
import type { IconBlockProps } from '@/lib/site-renderer/types';

export type IconRuntimeProps = IconBlockProps;

export function IconRuntime(props: IconRuntimeProps) {
  return <IconBlock {...props} />;
}
