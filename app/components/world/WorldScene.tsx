"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { GouacheEffect } from "./gouache/GouachePost";
import SceneLighting from "./SceneLighting";
import Garden from "./Garden";
import GardenCamera from "./GardenCamera";
import Velkina from "./Velkina";
import { Pixl, Sifir } from "./Critters";
import { GARDEN, GARDEN_PROJECTS } from "@/app/lib/garden";

// The painted garden you travel by scroll. The camera dollies along the garden
// path, settling into each composed shot. GOUACHE render passes applied. A tall
// invisible scroll spacer drives the playhead; a label shows the current area.

export default function WorldScene({
  reduced,
  onOpenProject,
}: {
  reduced?: boolean;
  onOpenProject?: (id: string) => void;
}) {
  const [dpr, setDpr] = useState(1.5);
  const [areaLabel, setAreaLabel] = useState(GARDEN[0].label);

  const onArrive = useCallback((id: string) => {
    const wp = GARDEN.find((w) => w.id === id);
    if (wp) setAreaLabel(wp.label);
    if (GARDEN_PROJECTS.includes(id)) onOpenProject?.(id);
  }, [onOpenProject]);

  return (
    <>
      {/* tall scroll spacer: gives the page height so scroll drives the playhead */}
      <div style={{ height: `${GARDEN.length * 100}vh` }} aria-hidden />

      <Canvas
        frameloop="demand"
        dpr={dpr}
        camera={{ position: GARDEN[0].cam, fov: GARDEN[0].fov }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ position: "fixed", inset: 0 }}
      >
        <color attach="background" args={["#f3e3c8"]} />
        <PerformanceMonitor
          flipflops={3}
          onChange={({ factor }) => setDpr(Math.round((0.75 + 1.0 * factor) * 10) / 10)}
          onFallback={() => setDpr(1)}
        />
        <AdaptiveEvents />
        <GardenCamera reduced={reduced} onArrive={onArrive} />
        <Suspense fallback={null}>
          <SceneLighting />
          <Garden />
          <Velkina position={[-6.1, 1.9, 0.5]} />
          <Pixl position={[0.2, 0.5, 0.4]} />
          <Sifir position={[-3.0, 0.5, -0.3]} />
        </Suspense>
        <EffectComposer enableNormalPass={false}>
          <GouacheEffect />
        </EffectComposer>
      </Canvas>

      {/* the current-area caption, bottom-left — quiet, lets the image lead */}
      <div className="vk-area" aria-live="polite">
        <span className="vk-area-label">{areaLabel.en}</span>
      </div>
      <div className="vk-scrollhint" aria-hidden>scroll to walk the garden ↓</div>
    </>
  );
}
