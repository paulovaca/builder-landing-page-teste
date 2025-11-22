'use client';

import React from 'react';

import { CalloutBlock } from '@/components/site-blocks/CalloutBlock';
import type { CalloutBlockProps } from '@/lib/site-renderer/types';

export type CalloutRuntimeProps = CalloutBlockProps;

export function CalloutRuntime(props: CalloutRuntimeProps) {
  return <CalloutBlock {...props} />;
}
