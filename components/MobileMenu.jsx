'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { whatsappHref } from '../lib/contact';

export default function MobileMenu({ locale, nav, common, otherLocales }) {
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
      className="fixed inset-0 z-[100]"
      style={{background: 'var(--vk-bg)'}}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between vk-container h-16">
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
      <nav className="vk-container pt-8 pb-12">
        <ul className="space-y-5 font-heading" style={{fontSize: '2rem', lineHeight: 1.1}}>
          <li><Link href={`/${locale}/work`} onClick={() => setOpen(false)}>{nav.work}</Link></li>
          <li><Link href={`/${locale}/services`} onClick={() => setOpen(false)}>{nav.services}</Link></li>
          <li><Link href={`/${locale}/about`} onClick={() => setOpen(false)}>{nav.about}</Link></li>
          <li><Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>{nav.contact}</Link></li>
        </ul>
        <hr className="vk-rule mt-8 mb-6" />
        <a
          href={whatsappHref(common.whatsappPrefill)}
          target="_blank"
          rel="noopener noreferrer"
          className="vk-btn vk-btn-primary w-full"
        >
          {nav.startProject}
        </a>
        <div className="mt-6 flex items-center gap-4 font-mono text-xs uppercase tracking-widest" style={{color: 'var(--vk-text-muted)'}}>
          <span>{common.languageLabel}:</span>
          <Link href={`/${locale}`} onClick={() => setOpen(false)} style={{color: 'var(--vk-text)'}}>{locale}</Link>
          {otherLocales.map(l => (
            <Link key={l} href={`/${l}`} onClick={() => setOpen(false)}>{l}</Link>
          ))}
        </div>
      </nav>
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
