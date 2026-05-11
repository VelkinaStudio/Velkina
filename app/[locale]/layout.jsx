import '../globals.css';
import Link from 'next/link';
import Script from 'next/script';
import {NextIntlClientProvider} from 'next-intl';
import GlobalClient from '../../components/GlobalClient';
import RevealClient from '../../components/RevealClient';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import MobileNavClient from '../../components/MobileNavClient';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';
import ro from '../../messages/ro.json';
import { Inter, Sora } from 'next/font/google';

const DICTS = { en, tr, ro };
const OG_LOCALES = { en: 'en_US', tr: 'tr_TR', ro: 'ro_RO' };
import {CONTACT, telHref, mailHref, whatsappHref} from '../../lib/contact';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin', 'latin-ext'], variable: '--font-sora' });

export async function generateMetadata({params}) {
  const {locale} = params;
  const dict = DICTS[locale] || en;
  const ogLocale = OG_LOCALES[locale] || 'en_US';
  const altLocales = Object.values(OG_LOCALES).filter(l => l !== ogLocale);
  return {
    title: dict.site.title,
    description: dict.site.description,
    metadataBase: new URL(baseUrl),
    manifest: '/site.webmanifest',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        tr: '/tr',
        ro: '/ro'
      }
    },
    openGraph: {
      title: dict.site.title,
      description: dict.site.description,
      url: `/${locale}`,
      siteName: dict.site.name,
      type: 'website',
      locale: ogLocale,
      alternateLocale: altLocales
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.site.title,
      description: dict.site.description
    },
    icons: { icon: '/favicon.svg' }
  };
}

// Pre-render all three locales for static export
export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'tr'}, {locale: 'ro'}];
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0D0D0D',
};

export default function LocaleLayout({children, params}) {
  const {locale} = params;
  // Using explicit messages & locale; no next-intl server APIs to keep static rendering
  const messages = DICTS[locale] || en;
  const t = messages.nav;

  return (
    <html lang={locale} className={`${inter.variable} ${sora.variable}`}>
      <head />
      <body
        className="font-body bg-vkbg text-vktext min-h-screen flex flex-col"
        data-carousel-play={messages.common?.carouselPlay ?? 'Play carousel'}
        data-carousel-pause={messages.common?.carouselPause ?? 'Pause carousel'}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-3 focus:py-2 focus:bg-black/80 focus:text-white focus:rounded-lg">{messages.common?.skipToContent ?? 'Skip to content'}</a>
        <div id="vk-trans" className="fixed inset-0 z-[9999] pointer-events-none" style={{background: 'radial-gradient(1200px 600px at 80% -10%, rgba(162,89,255,0.35), transparent 60%), radial-gradient(1000px 500px at 10% 120%, rgba(0,255,255,0.25), transparent 60%), linear-gradient(0deg, rgba(13,13,13,1) 0%, rgba(13,13,13,0.6) 100%)', display:'none'}} />

        <header data-nav className="fixed top-0 inset-x-0 z-50 transition">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
            <Link href={`/${locale}`} className="font-heading text-lg tracking-wider">VELKINA</Link>
            <div className="flex items-center gap-3">
              {/* Mobile: hamburger opens drawer */}
              <MobileNavClient locale={locale} labels={t} startProjectLabel={messages.home?.startProjectShort} />
              {/* Desktop navigation */}
              <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
                <Link href={`/${locale}`} className="text-white/80 hover:text-vkcyan">{t.home ?? 'Home'}</Link>
                <Link href={`/${locale}/services`} className="text-white/80 hover:text-vkcyan">{t.services}</Link>
                <Link href={`/${locale}/use-cases`} className="text-white/80 hover:text-vkcyan">{t.useCases}</Link>
                <Link href={`/${locale}/customer-agent`} className="text-white/80 hover:text-vkcyan">{t.customerAgent}</Link>
                {/* Blog hidden from public nav until real posts exist — route still alive at /[locale]/blog */}
                {/* <Link href={`/${locale}/blog`} className="text-white/80 hover:text-vkcyan">{t.blog}</Link> */}
                <Link href={`/${locale}/#cta`} className="text-white/90 font-mono px-3 py-1.5 rounded-xl bg-vkpink text-black shadow-strong">{t.startProject}</Link>
                <LanguageSwitcher locale={locale} />
              </nav>
            </div>
          </div>
        </header>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <main id="main" className="pt-20 flex-1">{children}</main>
        </NextIntlClientProvider>

        <footer className="max-w-7xl mx-auto px-6 md:px-10 py-14 text-white/70">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href={`/${locale}`} className="font-heading text-xl tracking-wider text-white">VELKINA</Link>
              <p className="mt-2 max-w-sm">{messages.site?.description}</p>
            </div>
            <div>
              <h3 className="font-heading text-white/90 mb-2">{messages.footer?.company ?? 'Company'}</h3>
              <ul className="space-y-1">
                <li><Link href={`/${locale}/about`} className="hover:text-vkcyan">{messages.nav?.about ?? 'About'}</Link></li>
                <li><Link href={`/${locale}/contact`} className="hover:text-vkcyan">{messages.nav?.contact ?? 'Contact'}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-white/90 mb-2">{messages.footer?.quickLinks ?? 'Quick Links'}</h3>
              <ul className="space-y-1">
                <li><Link href={`/${locale}`} className="hover:text-vkcyan">{messages.nav?.home ?? 'Home'}</Link></li>
                <li><Link href={`/${locale}/services`} className="hover:text-vkcyan">{messages.nav?.services}</Link></li>
                <li><Link href={`/${locale}/use-cases`} className="hover:text-vkcyan">{messages.nav?.useCases}</Link></li>
                {/* Blog hidden from footer until real posts exist — route still alive */}
                {/* <li><Link href={`/${locale}/blog`} className="hover:text-vkcyan">{messages.nav?.blog}</Link></li> */}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-white/90 mb-2">{messages.footer?.getInTouch ?? 'Get in touch'}</h3>
              <ul className="space-y-1">
                <li><a href={mailHref(messages.common?.emailSubject)} className="hover:text-vkcyan">{CONTACT.email}</a></li>
                <li><a href={telHref} className="hover:text-vkcyan">{CONTACT.phoneDisplay}</a></li>
                <li><a href={whatsappHref(messages.common?.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="hover:text-vkcyan">{messages.contact?.whatsapp ?? 'WhatsApp'}</a></li>
                <li><a href={CONTACT.scheduleUrl} target="_blank" rel="noopener noreferrer" className="hover:text-vkcyan">{messages.contact?.schedule ?? 'Schedule a call'}</a></li>
                <li><Link href={`/${locale}/#cta`} className="hover:text-vkcyan">{messages.home?.startProjectShort ?? 'Start project — Quick contact'}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-sm flex items-center justify-between">
            <p>© {new Date().getFullYear()} Velkina. {messages.footer?.rightsReserved ?? 'All rights reserved.'}</p>
            <div className="flex items-center gap-3">
              <Link href={`/${locale}/privacy`} className="hover:text-vkcyan">{messages.nav?.privacy ?? 'Privacy'}</Link>
              <Link href={`/${locale}/terms`} className="hover:text-vkcyan">{messages.nav?.terms ?? 'Terms'}</Link>
            </div>
          </div>
        </footer>

        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/bundled/lenis.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/69d6cffc443eaa1c3cea1d2c/1jlnhosg4';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />

        <GlobalClient />
        <RevealClient />
      </body>
    </html>
  );
}
