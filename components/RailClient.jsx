'use client';

import { useEffect } from 'react';

export default function RailClient(){
  useEffect(()=>{
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const rails = Array.from(document.querySelectorAll('[data-rail]'));
    const cleanups = [];

    rails.forEach((wrap)=>{
      const id = wrap.getAttribute('data-rail') || '';
      const auto = wrap.getAttribute('data-auto') !== 'false';
      const intervalMs = Math.max(1800, parseInt(wrap.getAttribute('data-interval') || '3200', 10));
      const track = wrap.querySelector('[role="list"]');
      // Scrollable container (overflow-x-auto) — if missing, fall back to track parent or wrapper
      const scroller = wrap.querySelector('[data-rail-scroller]')
        || wrap.querySelector('.overflow-x-auto')
        || (track ? track.parentElement : null)
        || wrap;
      if(!track || !scroller) return;

      // Arrow buttons
      const leftBtn = wrap.querySelector(`[data-rail-left="${id}"]`) || document.querySelector(`[data-rail-left="${id}"]`);
      const rightBtn = wrap.querySelector(`[data-rail-right="${id}"]`) || document.querySelector(`[data-rail-right="${id}"]`);

      const getStep = () => {
        try { return Math.max(200, Math.floor((scroller.clientWidth || 800) * 0.85)); } catch { return 300; }
      };

      const scrollByStep = (dir) => {
        try {
          scroller.scrollBy({ left: dir * getStep(), behavior: 'smooth' });
        } catch {}
      };

      const onLeft = (e) => { e.preventDefault(); if(leftBtn && leftBtn.hasAttribute('disabled')) return; scrollByStep(-1); };
      const onRight = (e) => { e.preventDefault(); if(rightBtn && rightBtn.hasAttribute('disabled')) return; scrollByStep(1); };

      const updateButtons = () => {
        try {
          const maxScroll = scroller.scrollWidth - scroller.clientWidth - 2;
          const atStart = scroller.scrollLeft <= 8;
          const atEnd = scroller.scrollLeft >= maxScroll - 8;
          if(leftBtn){ leftBtn.toggleAttribute('disabled', atStart); leftBtn.setAttribute('aria-disabled', String(atStart)); }
          if(rightBtn){ rightBtn.toggleAttribute('disabled', atEnd); rightBtn.setAttribute('aria-disabled', String(atEnd)); }
        } catch {}
      };

      leftBtn && leftBtn.addEventListener('click', onLeft);
      rightBtn && rightBtn.addEventListener('click', onRight);

      cleanups.push(()=>{
        leftBtn && leftBtn.removeEventListener('click', onLeft);
        rightBtn && rightBtn.removeEventListener('click', onRight);
      });

      // Auto-scroll (bounce between ends)
      let timer = 0; let dir = 1; let paused = false;
      const setPaused = (p) => { paused = !!p; };

      const onEnter = () => setPaused(true);
      const onLeave = () => setPaused(false);

      wrap.addEventListener('mouseenter', onEnter);
      wrap.addEventListener('mouseleave', onLeave);
      wrap.addEventListener('focusin', onEnter);
      wrap.addEventListener('focusout', onLeave);

      cleanups.push(()=>{
        wrap.removeEventListener('mouseenter', onEnter);
        wrap.removeEventListener('mouseleave', onLeave);
        wrap.removeEventListener('focusin', onEnter);
        wrap.removeEventListener('focusout', onLeave);
      });

      // Keyboard support: ArrowLeft / ArrowRight scrolls the rail
      const onKey = (e) => {
        if(e.key === 'ArrowLeft') { e.preventDefault(); scrollByStep(-1); }
        if(e.key === 'ArrowRight') { e.preventDefault(); scrollByStep(1); }
      };
      wrap.addEventListener('keydown', onKey);
      cleanups.push(()=> wrap.removeEventListener('keydown', onKey));

      const onScroll = () => updateButtons();
      scroller.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(()=> scroller.removeEventListener('scroll', onScroll));

      updateButtons();
      const onResize = () => updateButtons();
      window.addEventListener('resize', onResize, { passive: true });
      cleanups.push(()=> window.removeEventListener('resize', onResize));

      const tick = () => {
        if(!auto || prefersReduced) return;
        if(!paused){
          try {
            const maxScroll = scroller.scrollWidth - scroller.clientWidth - 2;
            const atEnd = scroller.scrollLeft >= maxScroll - 8;
            const atStart = scroller.scrollLeft <= 8;
            if(atEnd) dir = -1;
            else if(atStart) dir = 1;
            scroller.scrollBy({ left: dir * getStep(), behavior: 'smooth' });
          } catch {}
        }
        timer = window.setTimeout(tick, intervalMs);
      };

      if(auto && !prefersReduced){ timer = window.setTimeout(tick, intervalMs); }
      cleanups.push(()=>{ if(timer) window.clearTimeout(timer); });
    });

    return () => cleanups.forEach(fn=>{ try{ fn(); }catch{} });
  },[]);
  return null;
}
