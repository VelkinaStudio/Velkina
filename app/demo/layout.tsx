import '../globals.css';
import type { ReactNode } from 'react';
import { Inter, Sora, Instrument_Serif } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin', 'latin-ext'], variable: '--font-sora', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin', 'latin-ext'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
