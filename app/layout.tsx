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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=BhuTuka+Expanded+One:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
