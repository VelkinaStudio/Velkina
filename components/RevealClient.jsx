'use client';

import { useEffect } from 'react';

export default function RevealClient(){
  useEffect(()=>{
    let io = null;
    let mo = null;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;

    const markIn = (el) => {
      try { el.classList.add('is-in'); } catch {}
    };

    const inViewport = (el) => {
      try {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight || 0;
        const vw = window.innerWidth || document.documentElement.clientWidth || 0;
        // Consider visible if any part intersects viewport with a small top cut
        return r.bottom > vh * 0.08 && r.top < vh * 0.92 && r.right > 0 && r.left < vw;
      } catch { return false; }
    };

    const observeEl = (el) => {
      if (!el || el.classList.contains('is-in')) return;
      if (inViewport(el)) { markIn(el); return; }
      try { io && io.observe(el); } catch {}
    };

    const setup = () => {
      const els = Array.from(document.querySelectorAll('.reveal-on-scroll'));
      if (prefersReduced) {
        els.forEach(markIn);
        return () => {};
      }
      // Robust IO that triggers as soon as element touches viewport
      io = new IntersectionObserver((entries)=>{
        for(const e of entries){
          if(e.isIntersecting){
            markIn(e.target);
            try { io.unobserve(e.target); } catch {}
          }
        }
      }, { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0 });

      els.forEach(observeEl);

      // Watch for dynamically added reveal elements (e.g., route transitions)
      try {
        mo = new MutationObserver((mutations)=>{
          for (const m of mutations) {
            const nodes = Array.from(m.addedNodes || []);
            for (const n of nodes) {
              if (n.nodeType !== 1) continue;
              if (n.classList && n.classList.contains('reveal-on-scroll')) observeEl(n);
              const inner = n.querySelectorAll ? n.querySelectorAll('.reveal-on-scroll') : [];
              inner && inner.forEach(observeEl);
            }
          }
        });
        mo.observe(document.body, { childList: true, subtree: true });
      } catch {}

      return () => {
        try { io && io.disconnect(); } catch {}
        try { mo && mo.disconnect(); } catch {}
      };
    };

    // Wait a frame for layout to settle, then setup. Do two RAFs for safety on fast mounts.
    let cleanup = () => {};
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        cleanup = setup() || (()=>{});
      });
      // store second raf id on cleanup scope
      cleanup.raf2 = raf2;
    });

    return () => {
      try { cancelAnimationFrame(raf1); } catch {}
      try { if (cleanup.raf2) cancelAnimationFrame(cleanup.raf2); } catch {}
      try { cleanup && cleanup(); } catch {}
    };
  },[]);
  return null;
}
