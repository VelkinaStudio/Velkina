import '../globals.css';
import Link from 'next/link';
import Script from 'next/script';
import {NextIntlClientProvider} from 'next-intl';
import GlobalClient from '../../components/GlobalClient';
import RevealClient from '../../components/RevealClient';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({params}) {
  const {locale} = params;
  const dict = locale === 'en' ? en : tr;
  return {
    title: dict.site.title,
    description: dict.site.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        tr: '/tr'
      }
    },
    openGraph: {
      title: dict.site.title,
      description: dict.site.description,
      url: `/${locale}`,
      siteName: dict.site.name,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.site.title,
      description: dict.site.description
    },
    icons: { icon: '/favicon.svg' }
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0D0D0D',
};

export default function LocaleLayout({children, params}) {
  const {locale} = params;
  const messages = locale === 'en' ? en : tr;
  const t = messages.nav;

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Rajdhani:wght@600;700&family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: messages.site.name,
          url: baseUrl,
          sameAs: []
        })}} />
      </head>
      <body className="font-body bg-vkbg text-vktext">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-3 focus:py-2 focus:bg-black/80 focus:text-white focus:rounded-lg">Skip to content</a>
        <div id="vk-trans" className="fixed inset-0 z-[9999] pointer-events-none" style={{background: 'radial-gradient(1200px 600px at 80% -10%, rgba(162,89,255,0.35), transparent 60%), radial-gradient(1000px 500px at 10% 120%, rgba(0,255,255,0.25), transparent 60%), linear-gradient(0deg, rgba(13,13,13,1) 0%, rgba(13,13,13,0.6) 100%)', display:'none'}} />

        <header data-nav className="fixed top-0 inset-x-0 z-50 transition">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
            <Link href={`/${locale}`} className="font-heading text-lg tracking-wider">VELKINA</Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
              <Link href={`/${locale}/#why`} className="text-white/80 hover:text-vkcyan">{t.why}</Link>
              <Link href={`/${locale}/services`} className="text-white/80 hover:text-vkcyan">{t.services}</Link>
              <Link href={`/${locale}/use-cases`} className="text-white/80 hover:text-vkcyan">{t.useCases}</Link>
              <Link href={`/${locale}/blog`} className="text-white/80 hover:text-vkcyan">{t.blog}</Link>
              <Link href={`/${locale}/#stack`} className="text-white/80 hover:text-vkcyan">{t.tech}</Link>
              <Link href={`/${locale}/#cta`} className="text-white/90 font-mono px-3 py-1.5 rounded-xl bg-vkpink text-black shadow-strong">{t.startProject}</Link>
              <LanguageSwitcher locale={locale} />
            </nav>
          </div>
        </header>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <main id="main" className="pt-20 min-h-screen">{children}</main>
        </NextIntlClientProvider>

        <footer className="max-w-7xl mx-auto px-6 md:px-10 py-10 text-white/70">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Velkina. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/#cta`} className="hover:text-vkcyan underline underline-offset-4">Contact</Link>
            </div>
          </div>
        </footer>

        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/bundled/lenis.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" strategy="afterInteractive" />

        <GlobalClient />
        <RevealClient />
      </body>
    </html>
  );
}
