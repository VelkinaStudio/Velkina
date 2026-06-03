"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wire Lenis to GSAP's single ticker so DOM, smooth-scroll, pinning and
// (later) R3F all share ONE rAF loop — the documented fix for scroll jank.
// Per docs/research/r3f-tech-2026-06.md.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function GsapSync() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);
  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        autoRaf: false, // GSAP ticker drives raf instead
      }}
    >
      <GsapSync />
      {children}
    </ReactLenis>
  );
}
