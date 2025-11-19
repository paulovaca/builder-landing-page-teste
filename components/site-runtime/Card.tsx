'use client';

import React from 'react';

import { CardBlock, type CardBlockProps } from '@/components/site-blocks/CardBlock';

export type CardRuntimeProps = CardBlockProps;

export function CardRuntime(props: CardRuntimeProps) {
  return <CardBlock {...props} />;
}
