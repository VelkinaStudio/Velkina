"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { steppedTime } from "@velkina/inkwell";

// A miniature, ink-outline studio room — built dense and enclosed so it reads as
// a PLACE, not objects on a plane. Two desks, glowing CMYK screens, a window onto
// a nocturnal Bosphorus, a VELKINA whiteboard, plants, books, mugs, a desk lamp,
// posters, cable clutter. Low-poly on purpose so the ink outline + halftone read
// as a drawing. Animated ON TWOS so it breathes like a comic.

const INK = "#0b0b0c";
const SCREEN_C = "#00aeef";
const SCREEN_M = "#ec008c";
const SCREEN_Y = "#fff200";
const WALL_BACK = "#2e4a44"; // lit teal, reads as enclosure
const WALL_SIDE = "#26403a";
const FLOOR = "#3a3026"; // warm wood
const RUG = "#5c2b2b";
const DESK = "#6a5235";
const BOSPH = "#2a5170";
const AMBER = "#f2a65a";

function B({ a, p, c, r, e = 0 }: any) {
  return (
    <mesh position={p} rotation={r}>
      <boxGeometry args={a} />
      <meshStandardMaterial color={c} emissive={e ? c : "#000"} emissiveIntensity={e} roughness={0.85} />
    </mesh>
  );
}

function Monitor({ position, rotation, glow, onClick }: any) {
  const ref = useRef<THREE.Group>(null);
  return (
    <group
      position={position}
      rotation={rotation}
      ref={ref}
      onClick={onClick}
      onPointerOver={() => { document.body.style.cursor = onClick ? "pointer" : "auto"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      <mesh><boxGeometry args={[1.05, 0.66, 0.07]} /><meshStandardMaterial color={INK} roughness={0.5} /></mesh>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.92, 0.54]} />
        <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={1.9} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.46, 0]}><boxGeometry args={[0.12, 0.3, 0.08]} /><meshStandardMaterial color={INK} /></mesh>
      <mesh position={[0, -0.62, 0.05]}><boxGeometry args={[0.3, 0.04, 0.2]} /><meshStandardMaterial color={INK} /></mesh>
    </group>
  );
}

export default function StudioRoom({
  onTwos = true,
  onProject,
}: {
  onTwos?: boolean;
  onProject?: (id: string) => void;
}) {
  const root = useRef<THREE.Group>(null);
  const plant1 = useRef<THREE.Group>(null);
  const plant2 = useRef<THREE.Group>(null);
  const creature = useRef<THREE.Mesh>(null);
  const lamp = useRef<THREE.PointLight>(null);

  useFrame(({ clock, pointer }) => {
    const raw = clock.elapsedTime;
    const t = onTwos ? steppedTime(raw, 12) : raw;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, pointer.x * 0.12, 0.06);
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -pointer.y * 0.04, 0.06);
      root.current.position.y = Math.sin(t * 0.6) * 0.03;
    }
    if (plant1.current) plant1.current.rotation.z = Math.sin(t * 1.1) * 0.06;
    if (plant2.current) plant2.current.rotation.z = Math.cos(t * 0.9) * 0.05;
    if (creature.current) creature.current.position.y = -1.36 + Math.abs(Math.sin(t * 2.4)) * 0.14;
    if (lamp.current) lamp.current.intensity = 4.5 + Math.sin(t * 5) * 0.4; // flickering desk lamp
  });

  return (
    <group ref={root}>
      {/* ===== shell: floor, two walls, baseboards (enclosure) ===== */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.4, 6.4]} />
        <meshStandardMaterial color={FLOOR} roughness={0.95} />
      </mesh>
      {/* rug */}
      <mesh position={[0, -1.49, -0.4]} rotation={[-Math.PI / 2, 0, 0.1]}>
        <planeGeometry args={[3.2, 2.2]} />
        <meshStandardMaterial color={RUG} roughness={1} />
      </mesh>
      <mesh position={[0, 0.1, -3]}>
        <planeGeometry args={[6.4, 3.2]} />
        <meshStandardMaterial color={WALL_BACK} roughness={0.95} />
      </mesh>
      <mesh position={[-3.2, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6.4, 3.2]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.95} />
      </mesh>
      {/* baseboards / cornice to define the edges in ink */}
      <B a={[6.4, 0.12, 0.08]} p={[0, -1.42, -2.96]} c={INK} />
      <B a={[0.08, 0.12, 6.4]} p={[-3.16, -1.42, 0]} c={INK} />

      {/* ===== window onto nocturnal Bosphorus (left wall) ===== */}
      <group position={[-3.14, 0.45, -0.2]} rotation={[0, Math.PI / 2, 0]}>
        <mesh><planeGeometry args={[2.6, 1.6]} /><meshStandardMaterial color={BOSPH} emissive={BOSPH} emissiveIntensity={0.6} toneMapped={false} /></mesh>
        {Array.from({ length: 22 }).map((_, i) => (
          <mesh key={i} position={[((i * 53) % 11) * 0.22 - 1.1, ((i * 37) % 6) * 0.16 - 0.4, 0.02]}>
            <circleGeometry args={[0.022, 6]} />
            <meshStandardMaterial color={i % 3 ? SCREEN_Y : AMBER} emissive={i % 3 ? SCREEN_Y : AMBER} emissiveIntensity={2.2} toneMapped={false} />
          </mesh>
        ))}
        {/* window cross-frame */}
        <B a={[2.6, 0.06, 0.04]} p={[0, 0, 0.03]} c={INK} />
        <B a={[0.06, 1.6, 0.04]} p={[0, 0, 0.03]} c={INK} />
        <B a={[2.7, 0.09, 0.05]} p={[0, 0.83, 0.02]} c={INK} />
        <B a={[2.7, 0.09, 0.05]} p={[0, -0.83, 0.02]} c={INK} />
      </group>

      {/* ===== whiteboard = the about (back wall) ===== */}
      <group position={[1.5, 0.62, -2.93]}>
        <B a={[2.3, 1.25, 0.05]} p={[0, 0, 0]} c="#ece6d6" />
        <B a={[2.4, 0.08, 0.06]} p={[0, 0.66, 0.01]} c={INK} />
        <B a={[2.4, 0.08, 0.06]} p={[0, -0.66, 0.01]} c={INK} />
        {/* scribbles */}
        <B a={[1.4, 0.05, 0.01]} p={[-0.3, 0.28, 0.04]} c={SCREEN_M} e={0.3} />
        <B a={[0.9, 0.05, 0.01]} p={[-0.55, 0.05, 0.04]} c={INK} />
        <B a={[1.1, 0.05, 0.01]} p={[-0.4, -0.2, 0.04]} c={SCREEN_C} e={0.3} />
      </group>

      {/* posters on back wall */}
      <B a={[0.7, 0.95, 0.03]} p={[-2.2, 0.5, -2.92]} c={SCREEN_C} e={0.25} r={[0, 0, 0.04]} />
      <B a={[0.6, 0.8, 0.03]} p={[-1.45, 0.4, -2.92]} c={SCREEN_Y} e={0.2} r={[0, 0, -0.05]} />

      {/* ===== desk 1 (Ömer, cyan) ===== */}
      <group position={[-1.25, -1.02, -1.4]}>
        <B a={[1.8, 0.1, 1.05]} p={[0, 0, 0]} c={DESK} />
        <B a={[0.1, 0.9, 0.1]} p={[-0.8, -0.48, 0.42]} c={INK} />
        <B a={[0.1, 0.9, 0.1]} p={[0.8, -0.48, 0.42]} c={INK} />
        <Monitor position={[-0.1, 0.52, -0.25]} rotation={[0, 0.18, 0]} glow={SCREEN_C} onClick={() => onProject?.("rulesell")} />
        {/* keyboard, mug, books */}
        <B a={[0.6, 0.04, 0.22]} p={[0, 0.07, 0.18]} c={INK} />
        <mesh position={[0.55, 0.13, 0.12]}><cylinderGeometry args={[0.08, 0.08, 0.16, 10]} /><meshStandardMaterial color={SCREEN_M} /></mesh>
        <B a={[0.5, 0.3, 0.14]} p={[0.62, 0.2, -0.28]} c="#3a5a8a" r={[0, 0.3, 0.08]} />
      </group>

      {/* ===== desk 2 (Baha, magenta) ===== */}
      <group position={[1.35, -1.02, -1.05]}>
        <B a={[1.8, 0.1, 1.05]} p={[0, 0, 0]} c={DESK} />
        <B a={[0.1, 0.9, 0.1]} p={[-0.8, -0.48, 0.42]} c={INK} />
        <B a={[0.1, 0.9, 0.1]} p={[0.8, -0.48, 0.42]} c={INK} />
        <Monitor position={[0.05, 0.52, -0.25]} rotation={[0, -0.24, 0]} glow={SCREEN_M} onClick={() => onProject?.("megvax")} />
        <B a={[0.6, 0.04, 0.22]} p={[0, 0.07, 0.18]} c={INK} />
        {/* desk lamp */}
        <group position={[-0.7, 0.06, -0.1]}>
          <mesh><cylinderGeometry args={[0.12, 0.14, 0.05, 12]} /><meshStandardMaterial color={INK} /></mesh>
          <B a={[0.04, 0.5, 0.04]} p={[0, 0.28, 0]} c={INK} r={[0, 0, 0.3]} />
          <mesh position={[0.16, 0.52, 0]}><coneGeometry args={[0.14, 0.18, 12]} /><meshStandardMaterial color={INK} emissive={AMBER} emissiveIntensity={0.6} /></mesh>
        </group>
        <pointLight ref={lamp} position={[0.0, 0.7, 0]} intensity={4.5} distance={2.6} color={AMBER} />
      </group>

      {/* a small floating screen = a third project (bcb) */}
      <group position={[2.3, -0.5, -1.9]} onClick={() => onProject?.("bcb")}>
        <Monitor position={[0, 0, 0]} rotation={[0, -0.6, 0]} glow={SCREEN_Y} onClick={() => onProject?.("bcb")} />
      </group>

      {/* ===== plants ===== */}
      <group ref={plant1} position={[-2.55, -1.0, -1.4]}>
        <mesh><cylinderGeometry args={[0.2, 0.24, 0.42, 8]} /><meshStandardMaterial color={DESK} /></mesh>
        <mesh position={[0, 0.5, 0]}><icosahedronGeometry args={[0.36, 0]} /><meshStandardMaterial color="#2f5d3a" roughness={1} /></mesh>
        <mesh position={[0.12, 0.62, 0.08]}><icosahedronGeometry args={[0.2, 0]} /><meshStandardMaterial color="#3a6e45" roughness={1} /></mesh>
      </group>
      <group ref={plant2} position={[2.7, -1.0, -0.4]}>
        <mesh><cylinderGeometry args={[0.15, 0.19, 0.34, 8]} /><meshStandardMaterial color={DESK} /></mesh>
        <mesh position={[0, 0.4, 0]}><icosahedronGeometry args={[0.28, 0]} /><meshStandardMaterial color="#356b42" roughness={1} /></mesh>
      </group>

      {/* book stack on the floor */}
      <group position={[-2.3, -1.36, -0.2]}>
        <B a={[0.5, 0.08, 0.36]} p={[0, 0, 0]} c="#8a3b3b" />
        <B a={[0.46, 0.08, 0.34]} p={[0.02, 0.08, 0.01]} c="#3a5a8a" />
        <B a={[0.48, 0.08, 0.32]} p={[-0.01, 0.16, -0.01]} c="#caa53b" />
      </group>

      {/* ===== the little ink cursor-creature on the floor ===== */}
      <mesh ref={creature} position={[0.2, -1.36, 0.5]}>
        <sphereGeometry args={[0.17, 12, 12]} />
        <meshStandardMaterial color={INK} emissive="#2be08a" emissiveIntensity={0.35} />
      </mesh>
      {/* its little eyes */}
      <mesh position={[0.27, -1.32, 0.64]}><sphereGeometry args={[0.03, 8, 8]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.6} /></mesh>

      {/* ===== lighting: screens + warm fill keep it cozy and enclosed ===== */}
      <ambientLight intensity={0.5} />
      <pointLight position={[-1.25, 0.4, -0.9]} intensity={6} distance={4.5} color={SCREEN_C} />
      <pointLight position={[1.35, 0.4, -0.7]} intensity={6} distance={4.5} color={SCREEN_M} />
      <pointLight position={[-2.6, 0.7, -0.2]} intensity={4.5} distance={6} color={BOSPH} />
      <directionalLight position={[3, 5, 3]} intensity={0.7} color="#fff3e0" />
      <hemisphereLight args={["#3a5a55", "#1a1410", 0.5]} />
    </group>
  );
}
