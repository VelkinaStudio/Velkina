"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Comic, Misregister } from "@velkina/inkwell/react";
import StudioRoom from "./StudioRoom";

// The hero: the miniature studio rendered THROUGH inkwell. The knob values flow
// straight into the Comic (halftone/posterize) + Misregister (chroma) effects,
// so dragging a control re-renders the whole room live — the studio IS the
// engine's demo. Refs let the parent push values without re-mounting the canvas.

export interface KnobValues {
  dotScale: number;   // Comic dot cell size  (DOT SIZE)
  levels: number;     // Comic posterize bands (POSTERIZE)
  chroma: number;     // Misregister strength  (CHROMA)
  onTwos: boolean;    // stepped 12fps cadence (ON-TWOS)
  mode: "cmyk" | "mono";
}

export default function StudioScene({ knobs, onProject }: { knobs: KnobValues; onProject?: (id: string) => void }) {
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={dpr}
      camera={{ position: [2.5, 1.9, 4.0], fov: 38 }}
      onCreated={({ camera }) => camera.lookAt(0.1, -0.35, -1.4)}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#0b0b0c"]} />
      <StudioRoom onTwos={knobs.onTwos} onProject={onProject} />
      <EffectComposer>
        <Comic levels={knobs.levels} scale={knobs.dotScale} mode={knobs.mode} dotStrength={0.85} />
        <Misregister strength={knobs.chroma} falloff={1.4} />
      </EffectComposer>
    </Canvas>
  );
}
