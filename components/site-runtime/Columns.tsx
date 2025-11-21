'use client';

import React from 'react';

import { ColumnsBlock, type ColumnsBlockProps } from '@/components/site-blocks/ColumnsBlock';

export type ColumnsRuntimeProps = ColumnsBlockProps;

export function ColumnsRuntime(props: ColumnsRuntimeProps) {
  return <ColumnsBlock {...props} />;
}
