"use client";

import { useEffect, useRef } from "react";

// Lightweight scroll-reveal via IntersectionObserver (no GSAP dependency for
// the common case — keeps the bundle lean and respects reduced-motion via CSS).
//
// Hardened against three real failure modes that left sections blank in prod:
//   1. Lenis smooth-scroll + a strict negative rootMargin meant tall sections
//      (the Work grid is ~2360px) never crossed the 15% threshold, so they
//      stayed at opacity:0. Threshold is now 0 with a gentle bottom margin.
//   2. Content already in view on first paint never got an observer callback
//      in some browsers — we now reveal immediately if it starts intersecting.
//   3. If the observer never fires at all (no JS scroll, reduced env, prerender
//      hydration race), a one-shot fallback reveals after 1.2s so the page can
//      never be permanently blank.
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  as?: any;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      if (delay) setTimeout(() => el.classList.add("is-in"), delay);
      else el.classList.add("is-in");
    };

    // Already on screen at mount → reveal now (above-the-fold content).
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    // Safety net: never let a section stay invisible if the observer misfires.
    const fallback = setTimeout(reveal, 1200);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={`vk-reveal ${className}`}>
      {children}
    </Tag>
  );
}
