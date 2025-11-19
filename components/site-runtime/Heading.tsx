'use client';

import React from 'react';

import { HeadingBlock, type HeadingBlockProps } from '@/components/site-blocks/HeadingBlock';

export type HeadingRuntimeProps = HeadingBlockProps;

export function HeadingRuntime(props: HeadingRuntimeProps) {
  return <HeadingBlock {...props} />;
}
