"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { GouacheEffect } from "./gouache/GouachePost";
import CameraRig from "./CameraRig";
import Room from "./Room";
import SceneLighting from "./SceneLighting";
import StationObjects from "./StationObjects";
import Velkina from "./Velkina";
import { Pixl, Sifir } from "./Critters";
import Dock from "./Dock";
import { STATIONS, PROJECT_STATIONS } from "@/app/lib/stations";

// The explorable scene shell. frameloop='demand' (room is static; animation
// drives invalidate). DPR capped + adaptively lowered via PerformanceMonitor.
// Navigation: click object / dock pill / arrow keys / Esc. No free orbit.

export default function WorldScene({
  reduced,
  onOpenProject,
}: {
  reduced?: boolean;
  onOpenProject?: (id: string) => void;
}) {
  const [station, setStation] = useState("home");
  const [dpr, setDpr] = useState(1.5);

  const go = useCallback((id: string) => {
    setStation(id);
    // a project object both flies there AND opens the panel after settle
  }, []);

  const onSettled = useCallback((id: string) => {
    if (PROJECT_STATIONS.includes(id)) onOpenProject?.(id);
  }, [onOpenProject]);

  // keyboard nav: arrows = next/prev station, Esc = home
  useEffect(() => {
    const order = STATIONS.map((s) => s.id);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStation("home");
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setStation((cur) => order[Math.min(order.indexOf(cur) + 1, order.length - 1)]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setStation((cur) => order[Math.max(order.indexOf(cur) - 1, 0)]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Canvas
        frameloop="demand"
        dpr={dpr}
        camera={{ position: [0, 2.6, 8.2], fov: 42 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onPointerMissed={() => setStation("home")}
        style={{ position: "fixed", inset: 0 }}
      >
        <color attach="background" args={["#fbeee6"]} />
        <PerformanceMonitor
          flipflops={3}
          onChange={({ factor }) => setDpr(Math.round((0.75 + 1.0 * factor) * 10) / 10)}
          onFallback={() => setDpr(1)}
        />
        <AdaptiveEvents />
        <CameraRig target={station} reduced={reduced} onSettled={onSettled} />
        <Suspense fallback={null}>
          <SceneLighting />
          <Room />
          <StationObjects onPick={go} />
          <Velkina position={[0, 1.15, -0.4]} />
          <Pixl position={[0.3, 0.2, 0.3]} />
          <Sifir position={[-3.0, 0.1, -2.3]} />
        </Suspense>
        <EffectComposer enableNormalPass={false}>
          <GouacheEffect />
        </EffectComposer>
      </Canvas>
      <Dock active={station} onPick={go} />
    </>
  );
}
