"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Inked } from "../components/world/gouache/Inked";
import { celMaterial } from "../components/world/gouache/celMaterial";

// /celtest — isolated shader lab for the Borderlands/Bendy inked-cartoon look.
// Inverted-hull outlines (Inked.tsx) + hard cel material (celMaterial.ts).
// Not wired to the garden; safe to iterate freely here.

// Light comes from upper-LEFT-front so every shape gets a clear lit side and a
// clear shadow side — a near-top light flattens the cel terminator (that was
// part of why box/cone read flat in the first pass).
const LIGHT_DIR = new THREE.Vector3(-0.55, 0.72, 0.45).normalize();

function Scene() {
  // geometries built once; shared by lit mesh + outline shell so they match
  const geos = useMemo(
    () => ({
      sphere: new THREE.SphereGeometry(1, 48, 32),
      box: new THREE.BoxGeometry(1.6, 1.6, 1.6, 4, 4, 4), // rounded-ish via bevel below
      torus: new THREE.TorusGeometry(0.9, 0.36, 24, 64),
      cone: new THREE.ConeGeometry(0.95, 1.8, 32),
      blobBody: new THREE.CapsuleGeometry(0.55, 0.7, 12, 24),
      blobHead: new THREE.SphereGeometry(0.55, 32, 24),
      ground: new THREE.PlaneGeometry(40, 40),
    }),
    []
  );

  // cel materials per shape — bold flat colors, shared light dir
  const mats = useMemo(
    () => ({
      coral: celMaterial("#ff5a3c", { bands: 3, lightDir: LIGHT_DIR }),
      teal: celMaterial("#2f9c83", { bands: 3, lightDir: LIGHT_DIR }),
      butter: celMaterial("#ffc24a", { bands: 3, lightDir: LIGHT_DIR }),
      plum: celMaterial("#8a5fb0", { bands: 3, lightDir: LIGHT_DIR }),
      // bone is light → needs a darker shadow floor or its bands read as a gradient
      bone: celMaterial("#f0e6d2", { bands: 3, shadowTone: 0.5, lightDir: LIGHT_DIR }),
      // ground: flatter, 2 bands so it doesn't fight the shapes
      ground: celMaterial("#e9d3a8", {
        bands: 2,
        shadowTone: 0.7,
        rimStrength: 0,
        lightDir: LIGHT_DIR,
      }),
    }),
    []
  );

  return (
    <>
      <directionalLight position={[-5.5, 7.2, 4.5]} intensity={2.2} />
      <ambientLight intensity={0.55} />

      {/* ground — outline kept thin so it doesn't frame the whole plane */}
      <mesh
        geometry={geos.ground}
        material={mats.ground}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.0, 0]}
      />

      {/* sphere */}
      <Inked geometry={geos.sphere} material={mats.coral} thickness={3.2} position={[-3.0, 0, 0.2]} />

      {/* box — rotated so a LIT face and a SHADOW face both show (cel split) */}
      <Inked geometry={geos.box} material={mats.teal} thickness={3.2} position={[-1.1, -0.2, 0]} rotation={[0, 0.7, 0]} />

      {/* torus — tilted to read its tube banding + inner-hole outline */}
      <Inked geometry={geos.torus} material={mats.butter} thickness={3.0} position={[1.3, 0.1, 0]} rotation={[1.15, 0.35, 0]} />

      {/* cone — tipped toward camera so its curved face shows the terminator */}
      <Inked geometry={geos.cone} material={mats.plum} thickness={3.2} position={[3.3, -0.1, 0.1]} rotation={[0.18, 0, 0.12]} />

      {/* little "character" blob: capsule body + sphere head, both inked */}
      <group position={[0.0, -0.1, 2.7]}>
        <Inked geometry={geos.blobBody} material={mats.bone} thickness={3.4} />
        <Inked geometry={geos.blobHead} material={mats.bone} thickness={3.4} position={[0, 0.85, 0]} />
      </group>

      <OrbitControls target={[0, -0.1, 0.6]} />
    </>
  );
}

export default function CelTestPage() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#f3e3c8" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.7, 6.4], fov: 46 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#f3e3c8"]} />
        <Scene />
      </Canvas>
      {/* Faint paper/ink grain — sells "drawn". A fixed SVG fractal-noise layer
          at low opacity with multiply blend. Pointer-events off so orbit works.
          Cheap (no extra GL pass) and reliable across the whole frame. */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          mixBlendMode: "multiply",
          opacity: 0.12,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8," +
            encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>` +
                `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>` +
                `<feColorMatrix type='saturate' values='0'/></filter>` +
                `<rect width='100%' height='100%' filter='url(#n)'/></svg>`
            ) +
            "\")",
          backgroundSize: "160px 160px",
        }}
      />

      <div
        style={{
          position: "fixed",
          left: 16,
          bottom: 14,
          font: "13px ui-monospace, monospace",
          color: "#3a2f4a",
          opacity: 0.7,
        }}
      >
        /celtest — inverted-hull outlines + hard cel material (drag to orbit)
      </div>
    </div>
  );
}
