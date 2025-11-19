import type { Metadata } from 'next';
import { CraftRenderer } from '@/components/site-runtime/CraftRenderer';
import nodes from './page-data';

export const metadata: Metadata = {
  title: 'O que vc sabe sobre nós, tem muira coisa',
  description:
    'O que vc sabe sobre nós, tem muira coisa, O que vc sabe sobre nós, tem muira coisa O que vc sabe sobre nós, tem muira coisa',
  icons: [
    {
      rel: 'icon',
      url: 'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/ea82a7af-692b-416d-a310-2c9a0be5e07d.gif',
    },
  ],
  openGraph: {
    title: 'O que vc sabe sobre nós, tem muira coisa',
    description:
      'O que vc sabe sobre nós, tem muira coisa, O que vc sabe sobre nós, tem muira coisa O que vc sabe sobre nós, tem muira coisa',
    images: [
      {
        url: 'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/e7497646-1fee-4ff2-83ff-8fb359e29cc0.png',
      },
      {
        url: 'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/07e4dda0-0849-4629-bcd4-e3a172b185bf.jpg',
      },
    ],
  },
  twitter: {
    title: 'O que vc sabe sobre nós, tem muira coisa',
    description:
      'O que vc sabe sobre nós, tem muira coisa, O que vc sabe sobre nós, tem muira coisa O que vc sabe sobre nós, tem muira coisa',
    card: 'summary_large_image',
    images: [
      'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/e7497646-1fee-4ff2-83ff-8fb359e29cc0.png',
    ],
  },
  other: {
    'og:logo':
      'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/07e4dda0-0849-4629-bcd4-e3a172b185bf.jpg',
  },
};

export default function Page() {
  return <CraftRenderer data={nodes} />;
}
