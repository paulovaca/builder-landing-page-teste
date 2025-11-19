import type { Metadata } from 'next';
import { CraftRenderer } from '@/components/site-runtime/CraftRenderer';
import nodes from './page-data';

export const metadata: Metadata = {
  title: 'A melhor que a porimeira aaaaa',
  description:
    'aaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa',
  keywords: ['cara', 'tonto', 'boi'],
  icons: [
    {
      rel: 'icon',
      url: 'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/ea82a7af-692b-416d-a310-2c9a0be5e07d.gif',
    },
  ],
  openGraph: {
    title: 'A melhor que a porimeira aaaaa',
    description:
      'aaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa',
    images: [
      {
        url: 'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/e7497646-1fee-4ff2-83ff-8fb359e29cc0.png',
      },
      {
        url: 'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/0c684c85-8430-4938-a673-9644765a3985.jpg',
      },
    ],
  },
  twitter: {
    title: 'A melhor que a porimeira aaaaa',
    description:
      'aaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa',
    card: 'summary_large_image',
    images: [
      'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/e7497646-1fee-4ff2-83ff-8fb359e29cc0.png',
    ],
  },
  other: {
    'og:logo':
      'https://pub-da297c2772894ddb803d91c4dbd610ad.r2.dev/cmhuwrvln0000txygnhcylbgg/0c684c85-8430-4938-a673-9644765a3985.jpg',
  },
};

export default function Page() {
  return <CraftRenderer data={nodes} />;
}
