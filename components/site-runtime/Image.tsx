'use client';

import React from 'react';

import { ImageBlock, type ImageBlockProps } from '@/components/site-blocks/ImageBlock';

export type ImageRuntimeProps = ImageBlockProps;

export function ImageRuntime(props: ImageRuntimeProps) {
  return <ImageBlock {...props} />;
}
