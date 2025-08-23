"use client";

import { useEffect } from 'react';

export default function HeroStepsClient() {
  useEffect(() => {
    const el = document.getElementById('vk-hero-steps-text');
    if (!el) return;

    const steps = ["Discover", "Design", "Build", "Launch", "Evolve"];
    let idx = 0;
    let raf = 0;
    let running = false;
    let fadeTimer = 0;
    let initialized = false;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // prepare fade transition
    if (!reduceMotion) {
      el.style.willChange = 'opacity';
      el.style.transition = 'opacity 320ms ease';
      el.style.opacity = '1';
    }

    const setStep = (i) => {
      idx = (i + steps.length) % steps.length;
      const label = steps[idx];
      const apply = () => {
        el.textContent = label;
        el.setAttribute('data-step', String(idx));
        try {
          window.dispatchEvent(new CustomEvent('vk-hero-step', { detail: { index: idx, label } }));
        } catch {}
      };
      // First render is immediate to avoid initial flicker/hydration mismatch
      if (!initialized) {
        apply();
        initialized = true;
        return;
      }
      if (reduceMotion) {
        apply();
        return;
      }
      // fade out -> swap -> fade in
      try { el.style.opacity = '0'; } catch {}
      if (fadeTimer) clearTimeout(fadeTimer);
      fadeTimer = window.setTimeout(() => {
        apply();
        try { el.style.opacity = '1'; } catch {}
      }, 150);
    };

    // Helpers to start/stop rotation safely
    const stopLoop = () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      running = false;
    };

    // Visibility-aware interval using rAF fallback for better timing in background tabs
    const startLoop = () => {
      if (running) return; // guard: do not start twice
      running = true;
      const period = reduceMotion ? 6000 : 3800;
      let last = performance.now();
      const tick = (t) => {
        if (document.hidden) {
          last = t; // pause while hidden
        }
        if (t - last >= period) {
          last = t;
          setStep(idx + 1);
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    setStep(0);
    if (!reduceMotion) startLoop();

    const onVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        if (!reduceMotion) startLoop();
      }
    };
    const onPageHide = () => { stopLoop(); };
    const onBeforeUnload = () => { stopLoop(); };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('beforeunload', onBeforeUnload);
      stopLoop();
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, []);

  return null;
}
