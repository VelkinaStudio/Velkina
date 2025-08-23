import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import GlobalClient from '../components/GlobalClient';
import RevealClient from '../components/RevealClient';
import LanguageSwitcher from '../components/LanguageSwitcher';
import tr from '../messages/tr.json';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'Velkina — Yarını Birlikte İnşa Edelim',
  description: 'Velkina; tasarım, yazılım ve büyümeyi tek ekipte birleştiren kıdemli bir yaratıcı mühendislik stüdyosudur. Next.js, edge barındırma ve modern araçlarla yüksek performanslı web siteleri, uygulamalar ve sistemler tasarlar, geliştirir ve ölçeklendirir.',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Velkina — Yarını Birlikte İnşa Edelim',
    description: 'Velkina; tasarım, yazılım ve büyümeyi tek ekipte birleştiren kıdemli bir yaratıcı mühendislik stüdyosudur. Next.js, edge barındırma ve modern araçlarla yüksek performanslı web siteleri, uygulamalar ve sistemler tasarlar, geliştirir ve ölçeklendirir.',
    url: '/',
    siteName: 'Velkina',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velkina — Yarını Birlikte İnşa Edelim',
    description: 'Velkina; tasarım, yazılım ve büyümeyi tek ekipte birleştiren kıdemli bir yaratıcı mühendislik stüdyosudur. Next.js, edge barındırma ve modern araçlarla yüksek performanslı web siteleri, uygulamalar ve sistemler tasarlar, geliştirir ve ölçeklendirir.',
  },
  icons: {
    icon: '/favicon.svg',
  },
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Exo+2:wght@600;700&family=JetBrains+Mono:wght@400;600&display=swap&subset=latin-ext" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Velkina',
          url: baseUrl,
          sameAs: []
        })}} />
      </head>
      <body className="font-body bg-vkbg text-vktext">
        {/* Skip link for accessibility */}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-3 focus:py-2 focus:bg-black/80 focus:text-white focus:rounded-lg">{tr.common?.skipToContent ?? 'İçeriğe geç'}</a>
        {/* Page Transition Overlay */}
        <div id="vk-trans" className="fixed inset-0 z-[9999] pointer-events-none" style={{background: 'radial-gradient(1200px 600px at 80% -10%, rgba(162,89,255,0.35), transparent 60%), radial-gradient(1000px 500px at 10% 120%, rgba(0,255,255,0.25), transparent 60%), linear-gradient(0deg, rgba(13,13,13,1) 0%, rgba(13,13,13,0.6) 100%)', display:'none'}} />

        {/* Navbar */}
        <header data-nav className="fixed top-0 inset-x-0 z-50 transition">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
            <Link href="/" className="font-heading text-lg tracking-wider">VELKINA</Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
              <Link href="/" className="text-white/80 hover:text-vkcyan">{tr.nav.home}</Link>
              <Link href="/services" className="text-white/80 hover:text-vkcyan">{tr.nav.services}</Link>
              <Link href="/use-cases" className="text-white/80 hover:text-vkcyan">{tr.nav.useCases}</Link>
              <Link href="/blog" className="text-white/80 hover:text-vkcyan">{tr.nav.blog}</Link>
              <Link href="/#cta" className="text-white/90 font-mono px-3 py-1.5 rounded-xl bg-vkpink text-black shadow-strong">{tr.nav.startProject}</Link>
              <LanguageSwitcher />
            </nav>
          </div>
        </header>

        <main id="main" className="pt-20 min-h-screen">{children}</main>

        <footer className="max-w-7xl mx-auto px-6 md:px-10 py-14 text-white/70">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="font-heading text-xl tracking-wider text-white">VELKINA</Link>
              <p className="mt-2 max-w-sm">{tr.site.description}</p>
            </div>
            <div>
              <h3 className="font-heading text-white/90 mb-2">{tr.footer.company}</h3>
              <ul className="space-y-1">
                <li><Link href="/about" className="hover:text-vkcyan">{tr.nav.about}</Link></li>
                <li><Link href="/contact" className="hover:text-vkcyan">{tr.nav.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-white/90 mb-2">{tr.footer.quickLinks}</h3>
              <ul className="space-y-1">
                <li><Link href="/" className="hover:text-vkcyan">{tr.nav.home}</Link></li>
                <li><Link href="/services" className="hover:text-vkcyan">{tr.nav.services}</Link></li>
                <li><Link href="/use-cases" className="hover:text-vkcyan">{tr.nav.useCases}</Link></li>
                <li><Link href="/blog" className="hover:text-vkcyan">{tr.nav.blog}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-white/90 mb-2">{tr.footer.getInTouch}</h3>
              <ul className="space-y-1">
                <li><a href="mailto:hello@velkina.com" className="hover:text-vkcyan">hello@velkina.com</a></li>
                <li><a href="/#cta" className="hover:text-vkcyan">{tr.nav.startProject}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-sm flex items-center justify-between">
            <p>© {new Date().getFullYear()} Velkina. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="hover:text-vkcyan">{tr.nav.privacy}</Link>
              <Link href="/terms" className="hover:text-vkcyan">{tr.nav.terms}</Link>
            </div>
          </div>
        </footer>

        {/* External scripts */}
        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/bundled/lenis.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" strategy="afterInteractive" />

        <GlobalClient />
        <RevealClient />
      </body>
    </html>
  );
}
