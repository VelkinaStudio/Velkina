"use client";

import { useEffect, useState } from "react";
import Content from "./Content";

// Orchestrator. Decides between the 3D explorable room and the DOM fallback,
// based on capability + prefers-reduced-motion + a manual toggle. Step 1 ships
// the DOM content as the standalone page; the 3D scene is layered in next.

export default function StudioWorld() {
  // null = undecided (SSR), true = show 3D, false = DOM fallback
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // capability sniff: WebGL + not a tiny/low-memory device
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {}
    setEnabled(webgl && !reduced);
  }, []);

  // Until the 3D scene is wired (next step), always render the DOM content.
  return <Content variant="standalone" />;
}
