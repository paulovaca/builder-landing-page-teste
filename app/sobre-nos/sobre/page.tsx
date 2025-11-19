import type { Metadata } from 'next';
import { CraftRenderer } from '@/components/site-runtime/CraftRenderer';
import nodes from './page-data';

export const metadata: Metadata = {
  title: 'sobre',
  description: 'Conteúdo criado com Landing Page Teste',
  openGraph: {
    title: 'sobre',
    description: 'Conteúdo criado com Landing Page Teste',
  },
  twitter: {
    title: 'sobre',
    description: 'Conteúdo criado com Landing Page Teste',
    card: 'summary',
  },
};

export default function Page() {
  return <CraftRenderer data={nodes} />;
}
