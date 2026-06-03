"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STATIONS } from "@/app/lib/stations";

// Step-3 placeholders: a box per station object + a floor/walls, so navigation
// can be perfected before any pretty models. Hover highlights, click flies there.
// Pure ref-mutation animation (a gentle hover bob) — no setState in frame.

const COLORS: Record<string, string> = {
  whatwedo: "#6b4a8a", rulesell: "#ff6a4d", megvax: "#4fb892", bcb: "#ffcf3f",
  lavinia: "#ff9aa2", ataravci: "#8aa0d6", tp: "#7fd6b0", omer: "#ff6a4d", baha: "#6b4a8a", contact: "#4fb892",
};

function Marker({ id, pos, onPick, hovered, setHover }: any) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = pos[1] + Math.sin(clock.elapsedTime * 1.5 + pos[0]) * 0.04;
    const s = hovered ? 1.15 : 1;
    ref.current.scale.x += (s - ref.current.scale.x) * 0.2;
    ref.current.scale.y = ref.current.scale.z = ref.current.scale.x;
  });
  return (
    <mesh
      ref={ref}
      position={pos}
      onClick={(e) => { e.stopPropagation(); onPick(id); }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(id); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(null); document.body.style.cursor = "auto"; }}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={COLORS[id] || "#999"} roughness={0.6} metalness={0} />
    </mesh>
  );
}

export default function PlaceholderRoom({ onPick }: { onPick: (id: string) => void }) {
  const hover = useRef<string | null>(null);
  const setHover = (id: string | null) => { hover.current = id; };
  return (
    <group>
      {/* floor */}
      <mesh position={[0, -0.02, -1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#efe2d6" roughness={1} />
      </mesh>
      {/* back + side wall */}
      <mesh position={[0, 1.6, -3]}><planeGeometry args={[9, 4]} /><meshStandardMaterial color="#f6ebe0" roughness={1} /></mesh>
      <mesh position={[-4, 1.6, -1]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[7, 4]} /><meshStandardMaterial color="#f0e2d4" roughness={1} /></mesh>
      {/* station markers (skip home) */}
      {STATIONS.filter((s) => s.id !== "home").map((s) => (
        <Marker key={s.id} id={s.id} pos={s.obj} onPick={onPick}
          hovered={hover.current === s.id} setHover={setHover} />
      ))}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.0} color="#fff0dd" />
    </group>
  );
}
