import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landing Page Teste',
  description: 'Landing page gerada automaticamente pelo Next.js Visual Builder.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
