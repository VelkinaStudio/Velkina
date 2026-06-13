'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileNavClient({ locale, labels, startProjectLabel }){
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(()=>{ setOpen(false); }, [pathname]);

  // Lock scroll when open
  useEffect(()=>{
    const body = document.body;
    if(!body) return;
    if(open){ body.style.overflow = 'hidden'; }
    else { body.style.overflow = ''; }
    return ()=>{ body.style.overflow = ''; };
  }, [open]);

  const links = [
    { href: `/${locale}`, label: labels?.home ?? 'Home' },
    { href: `/${locale}/services`, label: labels?.services ?? 'Services' },
    { href: `/${locale}/use-cases`, label: labels?.useCases ?? 'Use Cases' },
    { href: `/${locale}/customer-agent`, label: labels?.customerAgent ?? 'Customer Agent' },
    { href: `/${locale}/blog`, label: labels?.blog ?? 'Blog' },
  ];

  return (
    <div className="md:hidden">
      {/* Toggle button */}
      <button
        aria-label="Open menu"
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="vk-mobile-menu"
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
        onClick={()=> setOpen(true)}
      >
        {/* Hamburger icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
          <button aria-label="Close menu" className="absolute inset-0 bg-black/60" onClick={()=> setOpen(false)} />
          <div
            id="vk-mobile-menu"
            className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-vkbg border-l border-white/10 shadow-strong p-5 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading tracking-wider">VELKINA</span>
              <button aria-label="Close menu" onClick={()=> setOpen(false)} className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18"/></svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto" aria-label="Mobile">
              <ul className="space-y-1">
                {links.map((l)=> (
                  <li key={l.href}>
                    <Link href={l.href} className="block px-3 py-2 rounded-lg text-white/90 hover:text-vkcyan hover:bg-white/5">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href={`/${locale}/#cta`} className="inline-flex items-center px-4 py-2 rounded-xl bg-vkpink text-black shadow-strong font-mono">
                    {startProjectLabel ?? 'Start project'}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">Language</span>
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
