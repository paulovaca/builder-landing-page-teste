'use client';

import React from 'react';

import { ContainerBlock, type ContainerBlockProps } from '@/components/site-blocks/ContainerBlock';

export type ContainerRuntimeProps = ContainerBlockProps;

export function ContainerRuntime(props: ContainerRuntimeProps) {
  return <ContainerBlock {...props} />;
}
