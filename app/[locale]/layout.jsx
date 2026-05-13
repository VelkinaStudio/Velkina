import '../globals.css';
import Link from 'next/link';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';
import ro from '../../messages/ro.json';
import { Inter, Sora, Instrument_Serif } from 'next/font/google';
import { CONTACT, whatsappHref, mailHref } from '../../lib/contact';
import MobileMenu from '../../components/MobileMenu';

const DICTS = { en, tr, ro };
const OG_LOCALES = { en: 'en_US', tr: 'tr_TR', ro: 'ro_RO' };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin', 'latin-ext'], variable: '--font-sora', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin', 'latin-ext'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

export async function generateMetadata({ params }) {
  const { locale } = params;
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
      languages: { en: '/en', tr: '/tr', ro: '/ro' }
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

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }, { locale: 'ro' }];
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A0A0B'
};

function NavLink({ href, children }) {
  return (
    <Link href={href} className="vk-nav-link">
      {children}
    </Link>
  );
}

export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  const messages = DICTS[locale] || en;
  const nav = messages.nav;
  const footer = messages.footer;
  const common = messages.common;
  const otherLocales = ['en', 'tr', 'ro'].filter(l => l !== locale);

  return (
    <html lang={locale} className={`${inter.variable} ${sora.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-3 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg">
          {common.skipToContent}
        </a>

        <header className="vk-header">
          <div className="vk-container flex items-center justify-between h-16">
            <Link href={`/${locale}`} className="font-heading text-base tracking-widest" style={{letterSpacing: '0.18em'}}>
              VELKINA
            </Link>
            <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
              <NavLink href={`/${locale}/work`}>{nav.work}</NavLink>
              <NavLink href={`/${locale}/services`}>{nav.services}</NavLink>
              <NavLink href={`/${locale}/about`}>{nav.about}</NavLink>
              <NavLink href={`/${locale}/contact`}>{nav.contact}</NavLink>
              <div className="flex items-center gap-2 pl-3 ml-1 border-l" style={{borderColor: 'var(--vk-border)'}}>
                {otherLocales.map(l => (
                  <Link key={l} href={`/${l}`} className="vk-nav-link font-mono text-xs uppercase tracking-widest">{l}</Link>
                ))}
              </div>
              <a
                href={whatsappHref(common.whatsappPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="vk-btn vk-btn-primary"
                style={{minHeight: '40px', padding: '0 1rem', fontSize: '0.875rem'}}
              >
                {nav.startProject}
              </a>
            </nav>
            <div className="md:hidden">
              <MobileMenu locale={locale} nav={nav} common={common} otherLocales={otherLocales} />
            </div>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="vk-footer mt-24">
          <div className="vk-container py-14">
            <div className="grid gap-10 md:grid-cols-4">
              <div className="md:col-span-1">
                <Link href={`/${locale}`} className="font-heading text-base tracking-widest" style={{letterSpacing: '0.18em'}}>
                  VELKINA
                </Link>
                <p className="mt-3 text-sm" style={{color: 'var(--vk-text-muted)', maxWidth: '14rem'}}>
                  {footer.tagline}
                </p>
              </div>
              <div>
                <h3 className="vk-label">{footer.columns.studio}</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href={`/${locale}/about`} className="vk-nav-link">{footer.links.about}</Link></li>
                  <li><Link href={`/${locale}/services`} className="vk-nav-link">{footer.links.services}</Link></li>
                  <li><Link href={`/${locale}/work`} className="vk-nav-link">{footer.links.work}</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="vk-label">{footer.columns.contact}</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href={whatsappHref(common.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="vk-nav-link">{footer.links.whatsapp}</a></li>
                  <li><a href={mailHref(common.emailSubject)} className="vk-nav-link">{footer.links.writeUs}</a></li>
                  <li><a href={CONTACT.scheduleUrl} target="_blank" rel="noopener noreferrer" className="vk-nav-link">{footer.links.schedule}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="vk-label">{footer.columns.legal}</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href={`/${locale}/privacy`} className="vk-nav-link">{footer.links.privacy}</Link></li>
                  <li><Link href={`/${locale}/terms`} className="vk-nav-link">{footer.links.terms}</Link></li>
                </ul>
              </div>
            </div>
            <hr className="vk-rule mt-10" />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs" style={{color: 'var(--vk-text-dim)'}}>
              <p>© {new Date().getFullYear()} Velkina. {footer.rights}</p>
              <div className="flex items-center gap-3 font-mono uppercase tracking-widest">
                {['en', 'tr', 'ro'].map(l => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    className={l === locale ? '' : 'vk-nav-link'}
                    style={{color: l === locale ? 'var(--vk-text)' : undefined}}
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
