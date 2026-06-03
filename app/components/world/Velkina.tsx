"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

// Velkina — the studio personified. A matte-clay marshmallow blob host with big
// low-set eyes that track the cursor, slow breathing, jittered blinks, and a hop
// when you tap it. Matcap gloss (cheap, no env pass). All ref-mutation.

const tmp = new THREE.Vector3();

export default function Velkina({ position = [0, 1.15, 0] as [number, number, number] }) {
  const matcap = useTexture("/studio/matcap-accent.webp");
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const lid = useRef<THREE.Mesh>(null);
  const pupilL = useRef<THREE.Mesh>(null);
  const pupilR = useRef<THREE.Mesh>(null);
  const hop = useRef(0);
  const blink = useRef({ next: 2 + Math.random() * 3, t: 0 });
  const pointer = useThree((s) => s.pointer);
  const invalidate = useThree((s) => s.invalidate);

  const bodyMat = useMemo(() => new THREE.MeshMatcapMaterial({ matcap }), [matcap]);
  const eyeWhite = useMemo(() => new THREE.MeshStandardMaterial({ color: "#fff", roughness: 0.4 }), []);
  const eyeDark = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a2230", roughness: 0.3 }), []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    // breathe: inhale slow, exhale slower; squashed base
    const breathe = 1 + Math.sin(t * 1.1) * 0.03;
    if (body.current) {
      body.current.scale.set(1, breathe * 0.92, 1);
    }
    // eyes track cursor (clamped)
    const ex = THREE.MathUtils.clamp(pointer.x * 0.04, -0.045, 0.045);
    const ey = THREE.MathUtils.clamp(pointer.y * 0.04, -0.03, 0.04);
    if (pupilL.current) { pupilL.current.position.x = -0.13 + ex; pupilL.current.position.y = 0.06 + ey; }
    if (pupilR.current) { pupilR.current.position.x = 0.13 + ex; pupilR.current.position.y = 0.06 + ey; }
    // blink
    const b = blink.current;
    b.t += delta;
    let lidScale = 0;
    if (b.t > b.next) { const p = (b.t - b.next) / 0.12; lidScale = p < 1 ? Math.sin(p * Math.PI) : 0; if (p >= 1) { b.next = b.t + 2 + Math.random() * 4; } }
    if (lid.current) lid.current.scale.y = lidScale;
    // hop decay
    if (hop.current > 0) { hop.current = Math.max(0, hop.current - delta * 3); if (group.current) group.current.position.y = position[1] + Math.sin((1 - hop.current) * Math.PI) * 0.3; }
    invalidate();
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5} floatingRange={[-0.06, 0.06]}>
      <group
        ref={group}
        position={position}
        onClick={(e) => { e.stopPropagation(); hop.current = 1; }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        {/* body */}
        <mesh ref={body} material={bodyMat}>
          <icosahedronGeometry args={[0.4, 5]} />
        </mesh>
        {/* eyes (whites) */}
        <mesh position={[-0.13, 0.06, 0.34]} material={eyeWhite}><sphereGeometry args={[0.1, 20, 20]} /></mesh>
        <mesh position={[0.13, 0.06, 0.34]} material={eyeWhite}><sphereGeometry args={[0.1, 20, 20]} /></mesh>
        {/* pupils */}
        <mesh ref={pupilL} position={[-0.13, 0.06, 0.42]} material={eyeDark}><sphereGeometry args={[0.05, 16, 16]} /></mesh>
        <mesh ref={pupilR} position={[0.13, 0.06, 0.42]} material={eyeDark}><sphereGeometry args={[0.05, 16, 16]} /></mesh>
        {/* blink lid (a flat disc that scales over the eyes) */}
        <mesh ref={lid} position={[0, 0.06, 0.43]} scale={[1, 0, 1]} material={bodyMat}>
          <boxGeometry args={[0.4, 0.22, 0.02]} />
        </mesh>
        {/* tiny stub arms */}
        <mesh position={[-0.36, -0.05, 0.1]} rotation={[0, 0, 0.5]} material={bodyMat}><capsuleGeometry args={[0.05, 0.12, 4, 8]} /></mesh>
        <mesh position={[0.36, -0.05, 0.1]} rotation={[0, 0, -0.5]} material={bodyMat}><capsuleGeometry args={[0.05, 0.12, 4, 8]} /></mesh>
      </group>
    </Float>
  );
}
