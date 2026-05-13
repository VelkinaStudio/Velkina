'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { CONTACT, whatsappHref, mailHref } from '../lib/contact';

export default function MobileMenu({ locale, nav, common, otherLocales, ledgerPreview = [], workLabels = {}, ctaLabels = {} }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const overlay = open && (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      style={{background: 'var(--vk-bg)'}}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between vk-container h-16 sticky top-0 z-10" style={{background: 'var(--vk-bg)', borderBottom: '1px solid var(--vk-border)'}}>
        <Link href={`/${locale}`} onClick={() => setOpen(false)} className="font-heading text-base tracking-widest" style={{letterSpacing: '0.18em'}}>
          VELKINA
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={nav.close}
          className="inline-flex items-center justify-center"
          style={{width: '44px', height: '44px', color: 'var(--vk-text)'}}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>

      <div className="vk-container pt-10 pb-20 space-y-12">
        {/* Primary nav */}
        <nav>
          <span className="vk-eyebrow">Index · 01</span>
          <ul className="mt-5 space-y-3 font-heading" style={{fontSize: '2.25rem', lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 500}}>
            <li><Link href={`/${locale}/work`} onClick={() => setOpen(false)}>{nav.work} <span className="vk-italic vk-muted" style={{fontSize: '1.25rem'}}>— what we shipped</span></Link></li>
            <li><Link href={`/${locale}/services`} onClick={() => setOpen(false)}>{nav.services} <span className="vk-italic vk-muted" style={{fontSize: '1.25rem'}}>— what we do</span></Link></li>
            <li><Link href={`/${locale}/about`} onClick={() => setOpen(false)}>{nav.about} <span className="vk-italic vk-muted" style={{fontSize: '1.25rem'}}>— who we are</span></Link></li>
            <li><Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>{nav.contact} <span className="vk-italic vk-muted" style={{fontSize: '1.25rem'}}>— get in touch</span></Link></li>
          </ul>
        </nav>

        {/* Recent work */}
        {ledgerPreview.length > 0 && (
          <section>
            <span className="vk-eyebrow">Recent · 02</span>
            <ul className="mt-5 space-y-3 list-none p-0">
              {ledgerPreview.slice(0, 4).map((p, i) => (
                <li key={i} className="flex items-baseline justify-between gap-3 border-b py-3" style={{borderColor: 'var(--vk-border)'}}>
                  <div>
                    {p.slug ? (
                      <Link href={`/${locale}/work/${p.slug}`} onClick={() => setOpen(false)} className="font-medium">
                        {p.client}
                      </Link>
                    ) : (
                      <span className="font-medium">{p.client}</span>
                    )}
                    <span className="vk-italic vk-muted ml-2" style={{fontSize: '0.95rem'}}>{p.kind}</span>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest vk-dim">{p.date}</span>
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/work`} onClick={() => setOpen(false)} className="mt-4 inline-block font-mono text-xs uppercase tracking-widest vk-nav-link">
              {workLabels.viewLive ? 'See all work →' : 'See all work →'}
            </Link>
          </section>
        )}

        {/* Quick contact */}
        <section>
          <span className="vk-eyebrow">Contact · 03</span>
          <div className="mt-5 grid gap-3">
            <a
              href={whatsappHref(common.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-btn vk-btn-primary w-full"
              onClick={() => setOpen(false)}
            >
              {ctaLabels.whatsapp || 'WhatsApp'}
            </a>
            <a
              href={mailHref(common.emailSubject)}
              className="vk-btn vk-btn-secondary w-full"
              onClick={() => setOpen(false)}
            >
              {ctaLabels.email || 'Email'}
            </a>
            <a
              href={CONTACT.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-btn vk-btn-secondary w-full"
              onClick={() => setOpen(false)}
            >
              {ctaLabels.schedule || 'Book a call'}
            </a>
          </div>
        </section>

        {/* Locale switcher + footer info */}
        <section className="pt-8 border-t" style={{borderColor: 'var(--vk-border)'}}>
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest" style={{color: 'var(--vk-text-muted)'}}>
            <span>{common.languageLabel}:</span>
            <Link href={`/${locale}`} onClick={() => setOpen(false)} style={{color: 'var(--vk-text)'}}>{locale}</Link>
            {otherLocales.map(l => (
              <Link key={l} href={`/${l}`} onClick={() => setOpen(false)}>{l}</Link>
            ))}
          </div>
          <div className="mt-6 font-mono text-xs uppercase tracking-widest" style={{color: 'var(--vk-text-dim)'}}>
            <div>{CONTACT.email}</div>
            <div className="mt-1">{CONTACT.phoneDisplay}</div>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={nav.menu}
        aria-expanded={open}
        className="inline-flex items-center justify-center"
        style={{width: '44px', height: '44px', color: 'var(--vk-text)'}}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
