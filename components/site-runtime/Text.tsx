'use client';

import React from 'react';

import { TextBlock, type TextBlockProps } from '@/components/site-blocks/TextBlock';

export type TextRuntimeProps = TextBlockProps;

export function TextRuntime(props: TextRuntimeProps) {
  return <TextBlock {...props} />;
}
