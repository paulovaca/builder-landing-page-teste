'use client';

import { CraftRenderer } from '@/components/site-runtime/CraftRenderer';
import nodes from './page-data';

export default function Page() {
  return <CraftRenderer data={nodes} />;
}
