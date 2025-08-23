'use client';

import { useEffect } from 'react';

export default function CountUpClient(){
  useEffect(()=>{
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(document.querySelectorAll('.vk-countup'));
    if(!els.length) return;

    const started = new WeakSet();

    const animate = (el)=>{
      if(started.has(el)) return;
      started.add(el);
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const from = parseFloat(el.getAttribute('data-from') || '0');
      const to = parseFloat(el.getAttribute('data-to') || el.textContent || '0');
      const duration = Math.max(300, parseInt(el.getAttribute('data-duration') || '1200', 10));

      if(prefersReduced){
        el.textContent = to.toFixed(decimals);
        return;
      }

      let start = 0;
      let rafId = 0;
      const step = (ts)=>{
        if(!start) start = ts;
        const t = Math.min(1, (ts - start) / duration);
        const val = from + (to - from) * t;
        el.textContent = val.toFixed(decimals);
        if(t < 1){ rafId = requestAnimationFrame(step); }
      };
      rafId = requestAnimationFrame(step);

      const cleanup = () => { if(rafId) cancelAnimationFrame(rafId); };
      // Clean up if node removed
      const mo = new MutationObserver((muts)=>{
        for(const m of muts){
          if(Array.from(m.removedNodes).includes(el)){
            cleanup(); mo.disconnect(); break;
          }
        }
      });
      try{ mo.observe(document.body, { childList: true, subtree: true }); }catch(_){}
    };

    const io = new IntersectionObserver((entries)=>{
      for(const e of entries){ if(e.isIntersecting){ animate(e.target); io.unobserve(e.target); } }
    }, { threshold: 0.4 });

    els.forEach(el=>{
      // Initialize with starting value to avoid layout jump
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const from = parseFloat(el.getAttribute('data-from') || '0');
      if(!prefersReduced){ el.textContent = from.toFixed(decimals); }
      else {
        const to = parseFloat(el.getAttribute('data-to') || el.textContent || '0');
        el.textContent = to.toFixed(decimals);
      }
      io.observe(el);
    });

    return () => io.disconnect();
  },[]);
  return null;
}
