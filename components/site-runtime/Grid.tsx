'use client';

import React from 'react';

import { GridBlock, type GridBlockProps } from '@/components/site-blocks/GridBlock';

export type GridRuntimeProps = GridBlockProps;

export function GridRuntime(props: GridRuntimeProps) {
  return <GridBlock {...props} />;
}
