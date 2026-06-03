"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Content from "./Content";

// Orchestrator. 3D explorable room when the device can handle it and motion is
// allowed; otherwise the DOM content (which is always rendered for SEO/AT and
// becomes the visible page in fallback). The 3D bundle loads only when chosen.

const WorldScene = dynamic(() => import("./world/WorldScene"), { ssr: false });

export default function StudioWorld() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {}
    const small = window.innerWidth < 480 && navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
    setEnabled(webgl && !reduced && !small);
  }, []);

  // Always render Content: it's the SEO/AT layer + the fallback page.
  // When 3D is on, Content is visually hidden (kept for crawlers) and the room shows.
  return (
    <>
      <Content variant={enabled ? "embedded" : "standalone"} />
      {enabled && <WorldScene />}
    </>
  );
}
