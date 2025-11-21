import type { Metadata } from 'next';
import { CraftRenderer } from '@/components/site-runtime/CraftRenderer';
import nodes from './page-data';

export const metadata: Metadata = {
  title: 'Landing Page - Sempre fazendo o melhor',
  description:
    'Meu teste de LP - Espéro que de tudo certo estamos trabalhando para isso. Meu teste de LP - Espéro que de tudo certo estamos trabalhando para isso.',
  keywords: ['teste', 'deploy', 'landing page'],
  icons: [
    {
      rel: 'icon',
      url: 'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/07e4dda0-0849-4629-bcd4-e3a172b185bf.jpg',
    },
  ],
  openGraph: {
    title: 'Landing Page - Sempre fazendo o melhor',
    description:
      'Meu teste de LP - Espéro que de tudo certo estamos trabalhando para isso. Meu teste de LP - Espéro que de tudo certo estamos trabalhando para isso.',
    images: [
      {
        url: 'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/07e4dda0-0849-4629-bcd4-e3a172b185bf.jpg',
      },
      {
        url: 'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/ea82a7af-692b-416d-a310-2c9a0be5e07d.gif',
      },
    ],
  },
  twitter: {
    title: 'Landing Page - Sempre fazendo o melhor',
    description:
      'Meu teste de LP - Espéro que de tudo certo estamos trabalhando para isso. Meu teste de LP - Espéro que de tudo certo estamos trabalhando para isso.',
    card: 'summary_large_image',
    images: [
      'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/07e4dda0-0849-4629-bcd4-e3a172b185bf.jpg',
    ],
  },
  other: {
    'og:logo':
      'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/ea82a7af-692b-416d-a310-2c9a0be5e07d.gif',
  },
};

export default function Page() {
  return <CraftRenderer data={nodes} />;
}
