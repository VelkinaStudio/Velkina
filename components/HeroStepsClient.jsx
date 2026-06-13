"use client";

import { useEffect } from 'react';

export default function HeroStepsClient({steps: stepsProp} = {}) {
  useEffect(() => {
    const el = document.getElementById('vk-hero-steps-text');
    if (!el) return;
    // Instance ownership guard to prevent multiple concurrent loops across remounts
    const instanceId = String(Date.now()) + Math.random().toString(36).slice(2);
    el.dataset.stepsInstance = instanceId;

    // Prefer localized steps passed from the server; fallback to EN
    const steps = (Array.isArray(stepsProp) && stepsProp.length
      ? stepsProp
      : ["Discover", "Design", "Build", "Launch", "Evolve"]).slice();
    let idx = 0;
    let raf = 0;
    let running = false;
    let fadeTimer = 0;
    let initialized = false;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try { console.debug('[HeroSteps] effect start', { stepsPropLen: Array.isArray(stepsProp) ? stepsProp.length : 0, stepsLen: steps.length, reduceMotion }); } catch {}

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
      try { console.debug('[HeroSteps] stopLoop()', { hadRAF: Boolean(raf) }); } catch {}
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
        // If another mounted instance took over the element, stop this loop
        if (el.dataset.stepsInstance !== instanceId) {
          stopLoop();
          return;
        }
        if (document.hidden) {
          last = t; // pause while hidden
        }
        if (t - last >= period) {
          last = t;
          try { console.debug('[HeroSteps] advance step', { from: idx, to: (idx + 1) % steps.length }); } catch {}
          setStep(idx + 1);
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    setStep(0);
    if (!reduceMotion && steps.length > 1) {
      try { console.debug('[HeroSteps] startLoop() initial'); } catch {}
      startLoop();
    }

    const onVisibility = () => {
      try { console.debug('[HeroSteps] visibilitychange', { hidden: document.hidden }); } catch {}
      if (document.hidden) {
        stopLoop();
      } else {
        if (!reduceMotion && steps.length > 1) startLoop();
      }
    };
    const onPageHide = () => { stopLoop(); };
    const onBeforeUnload = () => { stopLoop(); };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      try { console.debug('[HeroSteps] cleanup'); } catch {}
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('beforeunload', onBeforeUnload);
      stopLoop();
      if (fadeTimer) clearTimeout(fadeTimer);
      // Release ownership if still held by this instance
      if (el && el.dataset && el.dataset.stepsInstance === instanceId) {
        try { delete el.dataset.stepsInstance; } catch {}
      }
    };
  }, [stepsProp]);

  return null;
}
