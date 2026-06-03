"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { Comic, InkOutline } from "@velkina/inkwell/react";
import { steppedTime } from "@velkina/inkwell";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";

/**
 * Spider-Verse comic hero. Built on what's VERIFIED working in /lab/inkwell:
 * lit 3D shapes through the Comic (posterize+halftone) + ink-outline stack on a
 * comic-paper canvas, animated on-twos. We assemble the VELKINA wordmark from
 * extruded letter blocks (robust — no font-file dependency) styled as glossy
 * comic ink. Each letter is its own block so they can bob independently.
 */

// Letter shapes as simple extruded boxes arranged to read VELKINA would be
// fragile; instead we use a bold instanced "title slab" + a real DOM text
// overlay for legibility, and let the 3D carry texture/wow. The 3D layer is a
// cluster of glossy comic shapes (the "ink splash" behind the title).

function InkShapes() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = steppedTime(state.clock.elapsedTime, 12);
    if (group.current) {
      const px = state.pointer?.x ?? 0;
      const py = state.pointer?.y ?? 0;
      group.current.rotation.y = Math.sin(t * 0.5) * 0.25 + px * 0.25;
      group.current.rotation.x = Math.cos(t * 0.4) * 0.12 - py * 0.15;
    }
  });
  const inks = [
    { pos: [-2.2, 0.4, 0], color: "#ff5436", geo: "knot" },
    { pos: [2.0, -0.3, -0.5], color: "#2f6df6", geo: "ico" },
    { pos: [0.2, 1.3, -1], color: "#ffd23f", geo: "sphere" },
    { pos: [0.6, -1.4, 0.4], color: "#1ec98b", geo: "torus" },
  ] as const;
  return (
    <group ref={group}>
      {inks.map((ink, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={ink.pos as any}>
            {ink.geo === "knot" && <torusKnotGeometry args={[0.55, 0.22, 128, 24]} />}
            {ink.geo === "ico" && <icosahedronGeometry args={[0.8, 0]} />}
            {ink.geo === "sphere" && <sphereGeometry args={[0.55, 48, 48]} />}
            {ink.geo === "torus" && <torusGeometry args={[0.5, 0.22, 24, 64]} />}
            <meshStandardMaterial color={ink.color} roughness={0.5} metalness={0.05} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function DeferredComic() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!ready) return null;
  return (
    <EffectComposer>
      <Comic levels={5} scale={1.2} mode="cmyk" dotStrength={0.82} />
      <InkOutline thickness={1.0} threshold={0.13} color="#1a0e08" />
    </EffectComposer>
  );
}

export default function ComicHero({ quality = 1 }: { quality?: number }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 46 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#f4efe3"]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />
      <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#6db1ff" />
      <Suspense fallback={null}>
        {/* TEMP isolation: one centered knot, no Float, no effect */}
        <mesh>
          <torusKnotGeometry args={[1, 0.36, 200, 32]} />
          <meshStandardMaterial color="#ff5436" roughness={0.5} />
        </mesh>
        {/* <InkShapes /> */}
        {/* {quality >= 1 && <DeferredComic />} */}
      </Suspense>
    </Canvas>
  );
}
