'use client';

import React from 'react';

import { SectionBlock, type SectionBlockProps } from '@/components/site-blocks/SectionBlock';

export type SectionRuntimeProps = SectionBlockProps;

export function SectionRuntime(props: SectionRuntimeProps) {
  return <SectionBlock {...props} />;
}
