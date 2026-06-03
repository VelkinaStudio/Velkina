"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { STUDIO } from "@/lib/content";

// Heavy WebGL canvas — client-only, lazy. Never SSR (three touches window).
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

function useCapability() {
  // returns: 'full' | 'lite' | 'static'
  const [cap, setCap] = useState<"full" | "lite" | "static">("static");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as any).connection?.saveData;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const cores = navigator.hardwareConcurrency || 4;
    if (reduce || saveData) {
      setCap("static");
    } else if (mobile || cores <= 4) {
      setCap("lite");
    } else {
      setCap("full");
    }
  }, []);
  return cap;
}

export default function Hero() {
  const cap = useCapability();

  return (
    <section className="vk-hero" aria-label="Velkina">
      {/* WebGL particle wordmark — the signature move */}
      {cap !== "static" && (
        <div className="vk-hero-canvas" aria-hidden="true">
          <HeroCanvas quality={cap === "full" ? 1 : 0.55} />
        </div>
      )}

      {/* Static fallback wordmark (reduced-motion / low-GPU / no-JS). Also the
          accessible text layer that always exists for SEO + screen readers. */}
      <div className={`vk-hero-static ${cap === "static" ? "is-visible" : ""}`} aria-hidden={cap !== "static"}>
        <span className="vk-display">VELKINA</span>
      </div>

      {/* Foreground content frame */}
      <div className="vk-hero-frame vk-container">
        <div className="vk-hero-top">
          <span className="vk-eyebrow">Design + Engineering Studio</span>
          <span className="vk-eyebrow" style={{ color: "var(--vk-muted)" }}>
            IST · BUC — 2026
          </span>
        </div>

        {/* SEO/a11y h1 — visually compact, the canvas carries the visual weight */}
        <h1 className="vk-hero-h1">
          <span className="sr-only">Velkina — </span>
          {STUDIO.tagline}
        </h1>

        <div className="vk-hero-bottom">
          <p className="vk-hero-sub">{STUDIO.oneLiner}</p>
          <div className="vk-hero-scroll vk-mono">
            <span>SCROLL</span>
            <span className="vk-hero-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
