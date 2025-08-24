'use client';
import { useEffect } from 'react';

export default function GlobalClient(){
  useEffect(()=>{
    const cleanups = [];
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const body = document.body || null;
    const isLight = prefersReduced || (body && body.dataset && body.dataset.anim === 'light');

    // Lenis smooth scroll (cancel on unmount)
    try {
      if(!isLight){
        let rafId = 0;
        const lenis = new window.Lenis({ smoothWheel: true, lerp: 0.08 });
        const loop = (t) => { lenis.raf(t); rafId = requestAnimationFrame(loop); };
        rafId = requestAnimationFrame(loop);
        cleanups.push(()=>{ try{ cancelAnimationFrame(rafId); }catch(_){} try{ lenis?.destroy?.(); }catch(_){} });
      }
    } catch(e){}

    // Navbar solid state on scroll
    const nav = document.querySelector('[data-nav]');
    const onScroll = () => { if(nav) nav.classList.toggle('is-solid', window.scrollY > 12); };
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanups.push(()=> window.removeEventListener('scroll', onScroll));
    onScroll();

    // Active link highlight based on pathname
    const path = (location.pathname || '/');
    document.querySelectorAll('nav a').forEach(a=>{
      const href = a.getAttribute('href') || '';
      if(href === path || (href && href !== '/' && path.startsWith(href))){
        a.classList.add('active');
      }
    });

    // CTA destinations (localized via body data-*)
    try {
      const email = 'hello@velkina.com';
      const body = document.body || null;
      const prefill = (body && body.dataset && body.dataset.whatsappPrefill) || "Hi Velkina! I'd like to discuss a project.";
      const pre = encodeURIComponent(prefill);
      const wa = (window.VELK_CONTACT?.whatsapp || '').replace(/[^0-9]/g,'');
      const schedule = window.VELK_CONTACT?.schedule || 'https://calendly.com/velkina/intro-call';
      const waHref = wa ? `https://wa.me/${wa}?text=${pre}` : '/#contact';
      document.querySelectorAll('[data-cta="whatsapp"]').forEach(a=>a.setAttribute('href', waHref));
      const subj = encodeURIComponent((body && body.dataset && body.dataset.emailSubject) || 'Project Inquiry');
      document.querySelectorAll('[data-cta="email"]').forEach(a=>a.setAttribute('href', `mailto:${email}?subject=${subj}`));
      document.querySelectorAll('[data-cta="schedule"]').forEach(a=>a.setAttribute('href', schedule));
    } catch(e){}

    // Page transition overlay for same-origin nav
    const transEl = document.getElementById('vk-trans');
    if(transEl && !isLight){
      transEl.style.display = 'none';
      const onClick = (e) => {
        const a = e.target.closest('a'); if(!a) return;
        const href = a.getAttribute('href');
        if(!href || href.startsWith('#') || a.target==='_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button!==0) return;
        const url = new URL(href, location.href); if(url.origin!==location.origin) return;
        // allow same-page anchor without overlay
        if(url.pathname === location.pathname && url.hash) return;
        e.preventDefault();
        transEl.style.display='block';
        const go = () => { location.href = url.href; };
        try{
          if(prefersReduced || !window.gsap){ go(); return; }
          window.gsap.registerPlugin(window.ScrollTrigger);
          window.gsap.fromTo(transEl,{y:'-100%'},{y:0,duration:.6,ease:'power3.inOut',onComplete:go});
        }catch(err){ go(); }
      };
      document.addEventListener('click', onClick, { passive: false });
      cleanups.push(()=> document.removeEventListener('click', onClick));
    }

    // Simple reveal animations when GSAP available
    try{
      if(!isLight && window.gsap){
        document.querySelectorAll('article, section h1, section p, input, button').forEach(el=>{
          window.gsap.from(el,{ opacity:0, y:20, duration:.5, ease:'power3.out', stagger:.03 });
        });
      }
    }catch(e){}

    // Global ticker a11y: Space toggles pause; support multiple tickers; pause on tab hidden; buttons to toggle
    try{
      const tickers = Array.from(document.querySelectorAll('[data-ticker]'));
      const getToggleFor = (el) => {
        try { return el.parentElement?.querySelector('[data-ticker-toggle]') || null; } catch { return null; }
      };
      const renderToggleIcon = (btn, paused) => {
        if(!btn) return;
        if(paused){
          // Show Play icon when paused
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4.5 h-4.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 5.75l10.5 6.25-10.5 6.25V5.75z"/></svg>';
        } else {
          // Show Pause icon when playing
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4.5 h-4.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8 5h2v14H8zM14 5h2v14h-2z"/></svg>';
        }
      };
      const syncToggle = (el) => {
        const btn = getToggleFor(el);
        if(!btn) return;
        const paused = el.getAttribute('data-paused') === 'true';
        const body = document.body || null;
        const play = (body && body.dataset && body.dataset.carouselPlay) || 'Play carousel';
        const pause = (body && body.dataset && body.dataset.carouselPause) || 'Pause carousel';
        btn.setAttribute('aria-pressed', paused ? 'true' : 'false');
        btn.setAttribute('aria-label', paused ? play : pause);
        renderToggleIcon(btn, paused);
      };
      const setPaused = (el, isPaused) => {
        el.setAttribute('data-paused', isPaused ? 'true' : 'false');
        // Also set play state inline for maximum compatibility on the ticker element itself
        try { el.style.animationPlayState = isPaused ? 'paused' : 'running'; } catch(_){}
        syncToggle(el);
      };

      tickers.forEach((el)=>{
        // Ensure focusability for keyboard users
        if(!el.hasAttribute('tabindex')){ try{ el.tabIndex = 0; }catch(_){} }

        // Respect reduced motion: start paused
        if(prefersReduced){ setPaused(el, true); }

        const onKey = (e)=>{
          if(e.code==='Space'){
            e.preventDefault();
            const next = el.getAttribute('data-paused') !== 'true' ;
            setPaused(el, next);
            // mark that user explicitly toggled
            if(next){ el.setAttribute('data-paused-user','true'); }
            else { el.removeAttribute('data-paused-user'); }
          }
        };
        el.addEventListener('keydown', onKey);
        cleanups.push(()=> el.removeEventListener('keydown', onKey));

        // Hook up explicit toggle button inside same container
        const btn = getToggleFor(el);
        if(btn){
          const onClick = (e)=>{
            e.preventDefault();
            const next = el.getAttribute('data-paused') !== 'true';
            setPaused(el, next);
            if(next){ el.setAttribute('data-paused-user','true'); }
            else { el.removeAttribute('data-paused-user'); }
          };
          btn.addEventListener('click', onClick);
          cleanups.push(()=> btn.removeEventListener('click', onClick));
          // Initial sync
          syncToggle(el);
        }
      });

      const onVis = () => {
        const hidden = document.hidden;
        tickers.forEach(el => {
          if(hidden){
            // auto-pause without touching user flag
            el.setAttribute('data-paused-auto','true');
            setPaused(el, true);
          } else {
            // resume only if user hasn't paused and reduced-motion not requested
            el.removeAttribute('data-paused-auto');
            const userPaused = el.getAttribute('data-paused-user') === 'true';
            if(!userPaused && !prefersReduced){ setPaused(el, false); }
            else { syncToggle(el); }
          }
        });
      };
      document.addEventListener('visibilitychange', onVis, { passive: true });
      cleanups.push(()=> document.removeEventListener('visibilitychange', onVis));
    }catch(e){}

    return () => { cleanups.forEach(fn=>{ try{ fn(); }catch(_){} }); };
  },[]);
  return null;
}
