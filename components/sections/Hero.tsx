"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Heavy WebGL canvas — client-only, lazy. Never SSR (three touches window).
// Comic glossy wordmark when the GPU can handle it; a designed 2D comic title
// otherwise (and as the always-present accessible/SEO layer).
const ComicWordmark = dynamic(() => import("@/components/three/ComicWordmark"), {
  ssr: false,
  loading: () => null,
});

function useCapability() {
  const [cap, setCap] = useState<"full" | "lite" | "static">("static");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as any).connection?.saveData;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const cores = navigator.hardwareConcurrency || 4;
    if (reduce || saveData) setCap("static");
    else if (mobile || cores <= 4) setCap("lite");
    else setCap("full");
  }, []);
  return cap;
}

export default function Hero() {
  const cap = useCapability();

  return (
    <section className="vk-hero vk-hero--comic" aria-label="Velkina">
      {/* Comic panel frame */}
      <div className="vk-hero-panel">
        {/* Designed 2D comic title — ALWAYS the visible base layer (beautiful on
            its own, never blank). The WebGL wordmark overlays it as enhancement. */}
        <div className="vk-hero-title is-front">
          <span className="vk-hero-kicker vk-mono">Velkina — a two-person studio</span>
          <h1 className="vk-hero-name" aria-label="Velkina">
            {"VELKINA".split("").map((c, i) => (
              <span key={i} className="vk-hero-letter" style={{ ["--i" as any]: i }}>
                {c}
              </span>
            ))}
          </h1>
        </div>

        {/* WebGL glossy comic wordmark — enhancement layer on capable GPUs.
            Its canvas is transparent so the 2D title + paper show through if it
            can't draw. */}
        {cap === "full" && (
          <div className="vk-hero-canvas" aria-hidden="true">
            <ComicWordmark withPost />
          </div>
        )}

        {/* Hand-lettered caption — the human hook (Austen/Gambino-flavoured wit) */}
        <div className="vk-hero-caption">
          <p className="vk-hero-line">
            We make software, brands &amp; the occasional game —
            <em> and the tools we make them with.</em>
          </p>
          <p className="vk-hero-sub vk-mono">Ömer &amp; Baha · İstanbul ↔ Bucharest</p>
        </div>

        <div className="vk-hero-corner vk-mono" aria-hidden="true">EST. 2024 · ISSUE 01</div>
        <a href="#work" className="vk-hero-scroll vk-mono" aria-label="Scroll to work">
          <span>READ ON</span>
          <span className="vk-hero-scroll-arrow">↓</span>
        </a>
      </div>
    </section>
  );
}
