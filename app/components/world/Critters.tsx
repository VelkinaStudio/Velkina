"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { candy, clay, PALETTE } from "./materials";

// Pixl — the glossy candy ladybug helper. Scuttles a little, antennae lag behind
// (secondary motion), huge eyes. Cheap, alive, funny. Tap → tips over + rights.
export function Pixl({ position = [0.4, 0.18, 0.4] as [number, number, number] }) {
  const g = useRef<THREE.Group>(null);
  const antL = useRef<THREE.Group>(null);
  const antR = useRef<THREE.Group>(null);
  const tip = useRef(0);
  const invalidate = useThree((s) => s.invalidate);
  const shell = useMemo(() => candy(PALETTE.coral), []);
  const spot = useMemo(() => clay(PALETTE.ink), []);
  const eye = useMemo(() => new THREE.MeshStandardMaterial({ color: "#fff", roughness: 0.3 }), []);
  const pup = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a2230" }), []);
  const prev = useRef(0);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    if (g.current) {
      // little scuttle along x near the rug
      g.current.position.x = position[0] + Math.sin(t * 0.6) * 0.5;
      g.current.rotation.y = Math.cos(t * 0.6) > 0 ? 0.4 : -0.4;
      // tip-over decay
      if (tip.current > 0) { tip.current = Math.max(0, tip.current - delta * 2); g.current.rotation.z = Math.sin(tip.current * Math.PI) * 1.4; }
    }
    // antennae lag (secondary motion)
    const sway = Math.sin(t * 2.2) * 0.2;
    if (antL.current) antL.current.rotation.z = 0.4 + sway;
    if (antR.current) antR.current.rotation.z = -0.4 + sway * 0.8;
    invalidate();
  });

  return (
    <group ref={g} position={position} scale={0.6}
      onClick={(e) => { e.stopPropagation(); tip.current = 1; }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}>
      <mesh material={shell}><sphereGeometry args={[0.22, 24, 18]} /></mesh>
      {/* spots */}
      <mesh position={[0.08, 0.12, 0.1]} material={spot}><sphereGeometry args={[0.04, 10, 10]} /></mesh>
      <mesh position={[-0.1, 0.1, 0.05]} material={spot}><sphereGeometry args={[0.035, 10, 10]} /></mesh>
      {/* head + eyes */}
      <mesh position={[0, 0.05, 0.2]} material={spot}><sphereGeometry args={[0.12, 18, 18]} /></mesh>
      <mesh position={[-0.05, 0.1, 0.28]} material={eye}><sphereGeometry args={[0.045, 12, 12]} /></mesh>
      <mesh position={[0.05, 0.1, 0.28]} material={eye}><sphereGeometry args={[0.045, 12, 12]} /></mesh>
      <mesh position={[-0.05, 0.1, 0.31]} material={pup}><sphereGeometry args={[0.022, 10, 10]} /></mesh>
      <mesh position={[0.05, 0.1, 0.31]} material={pup}><sphereGeometry args={[0.022, 10, 10]} /></mesh>
      {/* antennae */}
      <group ref={antL} position={[-0.05, 0.16, 0.26]}><mesh position={[0, 0.08, 0]} material={spot}><capsuleGeometry args={[0.012, 0.14, 4, 6]} /></mesh><mesh position={[0, 0.17, 0]} material={shell}><sphereGeometry args={[0.03, 10, 10]} /></mesh></group>
      <group ref={antR} position={[0.05, 0.16, 0.26]}><mesh position={[0, 0.08, 0]} material={spot}><capsuleGeometry args={[0.012, 0.14, 4, 6]} /></mesh><mesh position={[0, 0.17, 0]} material={shell}><sphereGeometry args={[0.03, 10, 10]} /></mesh></group>
    </group>
  );
}

// Sıfır — the desk plant that's quietly alive. Sways, blinks leaf-eyes rarely.
export function Sifir({ position = [-3.2, 0.1, -2.4] as [number, number, number] }) {
  const leaves = useRef<THREE.Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const pot = useMemo(() => clay(PALETTE.coralDeep), []);
  const leaf = useMemo(() => clay(PALETTE.mint), []);
  const eye = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a2230" }), []);
  useFrame(({ clock }) => {
    if (leaves.current) leaves.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.05;
    invalidate();
  });
  return (
    <group position={position} scale={0.9}>
      <mesh material={pot}><cylinderGeometry args={[0.2, 0.24, 0.34, 16]} /></mesh>
      <group ref={leaves} position={[0, 0.3, 0]}>
        <mesh position={[-0.14, 0.18, 0]} rotation={[0, 0, 0.4]} material={leaf}><sphereGeometry args={[0.2, 16, 12]} /></mesh>
        <mesh position={[0.14, 0.2, 0]} rotation={[0, 0, -0.4]} material={leaf}><sphereGeometry args={[0.22, 16, 12]} /></mesh>
        {/* barely-there leaf eyes */}
        <mesh position={[-0.14, 0.2, 0.16]} material={eye}><sphereGeometry args={[0.018, 8, 8]} /></mesh>
        <mesh position={[0.14, 0.22, 0.18]} material={eye}><sphereGeometry args={[0.018, 8, 8]} /></mesh>
      </group>
    </group>
  );
}
