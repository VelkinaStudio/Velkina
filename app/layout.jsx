import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0D0D0D',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="font-body bg-vkbg text-vktext min-h-screen flex flex-col">
        <main id="main" className="flex-1">{children}</main>
      </body>
    </html>
  );
}
