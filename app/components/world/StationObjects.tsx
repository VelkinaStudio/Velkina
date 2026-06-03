"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { STATIONS } from "@/app/lib/stations";
import { PALETTE, candy, clay } from "./materials";

// Clickable interactables at each station. Glossy candy shapes — distinct per
// project — that hover-bob, scale on hover, and fly the camera + open the panel
// on click. Pure ref-mutation animation. (Distinct hand-modeled shapes can come
// later; these rounded candy forms already read cute and glossy.)

const SHAPES: Record<string, { color: string; kind: "gem" | "panel" | "bag" | "tent" | "house" | "spool" | "icon" }> = {
  rulesell: { color: PALETTE.coral, kind: "gem" },
  megvax:   { color: PALETTE.mint, kind: "panel" },
  bcb:      { color: PALETTE.butter, kind: "bag" },
  lavinia:  { color: PALETTE.rose, kind: "tent" },
  ataravci: { color: PALETTE.sky, kind: "house" },
  tp:       { color: PALETTE.mint, kind: "spool" },
  whatwedo: { color: PALETTE.plum, kind: "icon" },
  omer:     { color: PALETTE.coral, kind: "icon" },
  baha:     { color: PALETTE.plum, kind: "icon" },
  contact:  { color: PALETTE.mint, kind: "icon" },
};

function Shape({ kind, mat }: { kind: string; mat: THREE.Material }) {
  switch (kind) {
    case "gem": return <mesh material={mat}><octahedronGeometry args={[0.26, 0]} /></mesh>;
    case "panel": return <RoundedBox args={[0.42, 0.3, 0.12]} radius={0.04} material={mat} />;
    case "bag": return <RoundedBox args={[0.3, 0.34, 0.18]} radius={0.08} material={mat} />;
    case "tent": return <mesh material={mat} rotation={[0.2, 0, 0]}><coneGeometry args={[0.24, 0.34, 4]} /></mesh>;
    case "house": return <RoundedBox args={[0.3, 0.32, 0.26]} radius={0.05} material={mat} />;
    case "spool": return <mesh material={mat} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.18, 0.18, 0.22, 20]} /></mesh>;
    default: return <mesh material={mat}><sphereGeometry args={[0.22, 24, 24]} /></mesh>;
  }
}

function Obj({ id, pos, onPick }: { id: string; pos: [number, number, number]; onPick: (id: string) => void }) {
  const ref = useRef<THREE.Group>(null);
  const hov = useRef(false);
  const spec = SHAPES[id] || { color: "#999", kind: "icon" };
  const mat = useRef<THREE.Material>(spec.kind === "icon" ? clay(spec.color) : candy(spec.color));

  useFrame(({ clock, invalidate }) => {
    const g = ref.current;
    if (!g) return;
    const prevY = g.position.y;
    g.position.y = pos[1] + Math.sin(clock.elapsedTime * 1.4 + pos[0] * 2) * 0.035;
    g.rotation.y += 0.004;
    const target = hov.current ? 1.18 : 1;
    g.scale.x += (target - g.scale.x) * 0.18;
    g.scale.y = g.scale.z = g.scale.x;
    // keep rendering while it animates (demand loop)
    if (Math.abs(g.position.y - prevY) > 0.0001 || Math.abs(target - g.scale.x) > 0.001) invalidate?.();
  });

  return (
    <group
      ref={ref}
      position={pos}
      onClick={(e) => { e.stopPropagation(); onPick(id); }}
      onPointerOver={(e) => { e.stopPropagation(); hov.current = true; document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { hov.current = false; document.body.style.cursor = "auto"; }}
    >
      <Shape kind={spec.kind} mat={mat.current} />
    </group>
  );
}

export default function StationObjects({ onPick }: { onPick: (id: string) => void }) {
  return (
    <group>
      {STATIONS.filter((s) => s.id !== "home").map((s) => (
        <Obj key={s.id} id={s.id} pos={s.obj} onPick={onPick} />
      ))}
    </group>
  );
}
