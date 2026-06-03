"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState, Suspense } from "react";
import ParticleText from "./ParticleText";

/**
 * Hero WebGL canvas. Perf governors per the research playbook:
 * - DPR clamped [1,2]
 * - PerformanceMonitor downgrades quality if fps drops
 * - AdaptiveDpr lowers resolution under load
 * - mobile / reduced-motion get a lighter particle density (quality prop)
 */
export default function HeroCanvas({ quality = 1 }: { quality?: number }) {
  const [q, setQ] = useState(quality);

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <PerformanceMonitor
        onDecline={() => setQ((v) => Math.max(0.4, v - 0.3))}
        onIncline={() => setQ((v) => Math.min(quality, v + 0.2))}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <ParticleText word="VELKINA" quality={q} />
        </Suspense>
        {/* Bloom on the additive lime particles — desktop/full-cap only so
            mobile + low-GPU stay fast. Makes the wordmark read as a live signal. */}
        {quality >= 1 && (
          <EffectComposer enableNormalPass={false}>
            <Bloom
              intensity={0.7}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.4}
              mipmapBlur
              radius={0.6}
            />
            {/* Inkwell comic passes re-integrate once verified in isolation
                (examples/local harness). Bloom-only keeps the hero solid. */}
          </EffectComposer>
        )}
      </PerformanceMonitor>
    </Canvas>
  );
}
