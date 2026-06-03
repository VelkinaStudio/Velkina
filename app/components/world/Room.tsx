"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE, clay, candy, screen } from "./materials";

// The cute clay room shell + furniture, built from rounded primitives (no hard
// edges = bubbly read). All matte clay except a few glossy accents. Static, so
// it renders once under frameloop='demand'. Materials shared by reference.

export default function Room() {
  // shared materials (once)
  const m = useMemo(() => ({
    floor: clay(PALETTE.floor),
    wallA: clay(PALETTE.wallA),
    wallB: clay(PALETTE.wallB),
    rug: clay(PALETTE.rug),
    plinth: clay(PALETTE.cream),
    wood: clay(PALETTE.wood),
    peg: clay("#e9d3bf"),
    cream: clay(PALETTE.cream),
    ink: clay(PALETTE.ink),
    sky: screen("#cfe6ff", 0.5),
    coral: candy(PALETTE.coral),
    plum: clay(PALETTE.plum),
    mint: clay(PALETTE.mint),
  }), []);

  return (
    <group>
      {/* soft rounded plinth the whole room sits on */}
      <RoundedBox args={[8.4, 0.6, 6.4]} radius={0.28} smoothness={4} position={[0, -0.32, -1]} material={m.plinth} />

      {/* floor + rug */}
      <RoundedBox args={[7.6, 0.12, 5.8]} radius={0.1} smoothness={3} position={[0, 0.02, -1]} material={m.floor} />
      <mesh position={[0, 0.09, -0.6]} rotation={[-Math.PI / 2, 0, 0.1]}>
        <circleGeometry args={[1.7, 40]} />
        <meshStandardMaterial color={PALETTE.rug} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.095, -0.6]} rotation={[-Math.PI / 2, 0, 0.1]}>
        <ringGeometry args={[1.1, 1.25, 40]} />
        <meshStandardMaterial color={PALETTE.cream} roughness={0.95} />
      </mesh>

      {/* back + left wall (rounded, soft) */}
      <RoundedBox args={[7.6, 4.2, 0.3]} radius={0.14} smoothness={3} position={[0, 2.0, -3.4]} material={m.wallA} />
      <RoundedBox args={[0.3, 4.2, 5.8]} radius={0.14} smoothness={3} position={[-3.7, 2.0, -1]} material={m.wallB} />

      {/* window on the back-left with a tiny Bosphorus cutout (emissive) */}
      <group position={[-2.7, 2.0, -3.24]}>
        <RoundedBox args={[1.9, 1.4, 0.12]} radius={0.08} smoothness={3} material={m.cream} />
        <mesh position={[0, 0, 0.05]}><planeGeometry args={[1.55, 1.05]} /><primitive object={m.sky} attach="material" /></mesh>
        {/* tiny skyline silhouette */}
        {[-0.5, -0.2, 0.1, 0.45].map((x, i) => (
          <mesh key={i} position={[x, -0.25 + (i % 2) * 0.12, 0.06]}>
            <boxGeometry args={[0.18, 0.5 + (i % 3) * 0.18, 0.02]} />
            <meshStandardMaterial color="#9fb8c9" />
          </mesh>
        ))}
        {/* a tiny round dome (mosque hint) */}
        <mesh position={[0.2, 0.05, 0.06]}><sphereGeometry args={[0.12, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#9fb8c9" /></mesh>
        {/* window cross */}
        <RoundedBox args={[1.6, 0.06, 0.04]} radius={0.02} position={[0, 0, 0.07]} material={m.cream} />
        <RoundedBox args={[0.06, 1.1, 0.04]} radius={0.02} position={[0, 0, 0.07]} material={m.cream} />
      </group>

      {/* pegboard on the back wall (right of window) */}
      <group position={[1.4, 2.0, -3.22]}>
        <RoundedBox args={[2.4, 1.7, 0.1]} radius={0.1} smoothness={3} material={m.peg} />
        {/* peg holes pattern */}
        {Array.from({ length: 5 * 4 }).map((_, i) => (
          <mesh key={i} position={[((i % 5) - 2) * 0.42, (Math.floor(i / 5) - 1.5) * 0.4 + 0.2, 0.06]}>
            <circleGeometry args={[0.025, 8]} />
            <meshStandardMaterial color="#caa98c" />
          </mesh>
        ))}
      </group>

      {/* Ömer's desk (left) */}
      <group position={[-2.4, 0, -1.0]}>
        <RoundedBox args={[1.7, 0.16, 1.0]} radius={0.06} smoothness={3} position={[0, 0.85, 0]} material={m.wood} />
        <RoundedBox args={[0.14, 0.85, 0.14]} radius={0.05} position={[-0.7, 0.42, 0.35]} material={m.wood} />
        <RoundedBox args={[0.14, 0.85, 0.14]} radius={0.05} position={[0.7, 0.42, 0.35]} material={m.wood} />
        {/* laptop */}
        <group position={[0, 0.95, -0.1]} rotation={[0, 0.2, 0]}>
          <RoundedBox args={[0.7, 0.45, 0.04]} radius={0.03} position={[0, 0.22, -0.2]} rotation={[-0.25, 0, 0]} material={m.ink} />
          <mesh position={[0, 0.22, -0.18]} rotation={[-0.25, 0, 0]}><planeGeometry args={[0.6, 0.36]} /><primitive object={screen("#ffd9cf", 1.2)} attach="material" /></mesh>
          <RoundedBox args={[0.7, 0.04, 0.5]} radius={0.02} material={m.ink} />
        </group>
        {/* coffee w/ foam heart */}
        <mesh position={[0.5, 1.0, 0.2]}><cylinderGeometry args={[0.08, 0.07, 0.14, 16]} /><primitive object={m.cream} attach="material" /></mesh>
      </group>

      {/* Baha's desk (right) */}
      <group position={[2.4, 0, -1.0]}>
        <RoundedBox args={[1.7, 0.16, 1.0]} radius={0.06} smoothness={3} position={[0, 0.85, 0]} material={m.wood} />
        <RoundedBox args={[0.14, 0.85, 0.14]} radius={0.05} position={[-0.7, 0.42, 0.35]} material={m.wood} />
        <RoundedBox args={[0.14, 0.85, 0.14]} radius={0.05} position={[0.7, 0.42, 0.35]} material={m.wood} />
        {/* mini server rack */}
        <group position={[-0.2, 0.95, -0.1]}>
          <RoundedBox args={[0.5, 0.6, 0.4]} radius={0.04} position={[0, 0.3, 0]} material={m.ink} />
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[-0.15 + (i % 2) * 0.08, 0.18 + Math.floor(i / 2) * 0.18, 0.21]}>
              <circleGeometry args={[0.018, 8]} />
              <primitive object={screen(i % 2 ? "#4fb892" : "#ffcf3f", 2)} attach="material" />
            </mesh>
          ))}
        </group>
        {/* rubber duck */}
        <group position={[0.45, 0.98, 0.2]}>
          <mesh><sphereGeometry args={[0.09, 16, 16]} /><meshStandardMaterial color="#ffcf3f" roughness={0.35} /></mesh>
          <mesh position={[0, 0.1, 0.02]}><sphereGeometry args={[0.06, 16, 16]} /><meshStandardMaterial color="#ffcf3f" roughness={0.35} /></mesh>
          <mesh position={[0.05, 0.11, 0.06]} rotation={[0, 0, -0.3]}><coneGeometry args={[0.025, 0.06, 8]} /><meshStandardMaterial color="#ff8a3d" /></mesh>
        </group>
      </group>

      {/* the shelf for project objects (back wall, right) */}
      <RoundedBox args={[3.0, 0.12, 0.5]} radius={0.05} smoothness={3} position={[2.4, 1.4, -2.75]} material={m.cream} />
    </group>
  );
}
