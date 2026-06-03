"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { clay, candy, PALETTE } from "./materials";

// The painted terrace garden, built procedurally. Laid out along +X: gate (-7),
// shed (-4), vegetable patch (0), greenhouse (+5.5), benches (+9), fountain (+12).
// Materials route through GOUACHE (clay/candy). Foliage is instanced. Static, so
// it renders under the demand loop; only windmills/sprinklers animate.

const G = {
  coral: "#d8593e", plum: "#6b4a8a", mint: "#5bbf95", butter: "#e8b94a",
  bone: "#efe2c8", soil: "#6b4a35", wood: "#a86b43", woodDark: "#7a4c2e",
  leaf: "#4e8c52", leafDk: "#3a6e42", stone: "#cdbfa8", coralLt: "#ff8a6a",
};

function Leaf({ p, s = 1, c = G.leaf }: any) {
  return <mesh position={p} scale={s} rotation={[Math.random() * 0.4, Math.random() * 6, Math.random() * 0.4]}>
    <sphereGeometry args={[0.3, 8, 6]} /><primitive object={clay(c)} attach="material" /></mesh>;
}

// a spinning windmill/sprinkler (the visible autonomy)
function Windmill({ position }: { position: [number, number, number] }) {
  const v = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (v.current) v.current.rotation.z += dt * 1.5; });
  const mat = useMemo(() => clay(G.bone), []);
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} material={clay(G.woodDark)}><cylinderGeometry args={[0.025, 0.025, 0.8, 6]} /></mesh>
      <group ref={v} position={[0, 0.8, 0.05]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]} position={[0.12, 0, 0]} material={mat}>
            <boxGeometry args={[0.22, 0.06, 0.01]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function RaisedBed({ x, crop, count = 18 }: { x: number; crop: string; count?: number }) {
  const cropMat = useMemo(() => clay(crop), [crop]);
  return (
    <group position={[x, 0, -1.2]}>
      {/* wooden frame */}
      <RoundedBox args={[1.5, 0.4, 1.5]} radius={0.05} position={[0, 0.2, 0]} material={clay(G.wood)} />
      <RoundedBox args={[1.3, 0.1, 1.3]} radius={0.03} position={[0, 0.42, 0]} material={clay(G.soil)} />
      {/* crops as instanced-ish rounded veg */}
      {Array.from({ length: count }).map((_, i) => {
        const cx = ((i % 4) - 1.5) * 0.32, cz = (Math.floor(i / 4) - 1.5) * 0.32;
        return <mesh key={i} position={[cx, 0.55, cz]} material={cropMat}><sphereGeometry args={[0.12, 10, 8]} /></mesh>;
      })}
      <Windmill position={[0.6, 0.45, 0.6]} />
    </group>
  );
}

export default function Garden() {
  const stoneMat = useMemo(() => clay(G.stone), []);
  const grassMat = useMemo(() => clay(G.leafDk), []);

  return (
    <group>
      {/* ground: a long grassy terrace */}
      <mesh position={[2.5, -0.05, -1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 9]} />
        <meshStandardMaterial color={G.leafDk} roughness={1} />
      </mesh>
      {/* winding stone path (segments of rounded slabs along +X) */}
      {Array.from({ length: 22 }).map((_, i) => {
        const x = -7.5 + i * 0.95;
        const z = 1.0 + Math.sin(i * 0.5) * 0.5;
        return <RoundedBox key={i} args={[0.8, 0.06, 0.7]} radius={0.06} position={[x, 0.02, z]} rotation={[0, i * 0.1, 0]} material={stoneMat} />;
      })}

      {/* far back wall + a painted Istanbul skyline plane (golden) */}
      <mesh position={[2.5, 1.6, -4]}><planeGeometry args={[26, 4]} /><meshStandardMaterial color={G.butter} roughness={1} /></mesh>
      {/* simple skyline silhouettes */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={i} position={[-6 + i * 1.1, 0.6 + ((i * 7) % 4) * 0.18, -3.95]}>
          <boxGeometry args={[0.5, 1.0 + ((i * 5) % 5) * 0.25, 0.02]} />
          <meshStandardMaterial color={G.coral} roughness={1} />
        </mesh>
      ))}

      {/* ===== GATE (-7) ===== */}
      <group position={[-7, 0, 0.5]}>
        <RoundedBox args={[0.25, 1.7, 0.25]} radius={0.08} position={[-0.9, 0.85, 0]} material={clay(G.coral)} />
        <RoundedBox args={[0.25, 1.7, 0.25]} radius={0.08} position={[0.9, 0.85, 0]} material={clay(G.coral)} />
        {/* half-open gate leaf */}
        <group position={[0.78, 0.7, 0]} rotation={[0, -0.6, 0]}>
          <RoundedBox args={[1.4, 1.2, 0.08]} radius={0.04} position={[0.7, 0, 0]} material={clay(G.wood)} />
        </group>
        {/* hanging Velkina sign */}
        <RoundedBox args={[0.9, 0.4, 0.05]} radius={0.06} position={[0, 1.5, 0.1]} material={candy(G.butter)} />
      </group>
      {/* a big foreground poppy near the gate (the bokeh flower) */}
      <group position={[-7.6, 0.5, 2.0]}>
        <mesh position={[0, 0.3, 0]} material={clay("#2e5a35")}><cylinderGeometry args={[0.03, 0.03, 0.6, 6]} /></mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[Math.cos(i * 1.25) * 0.18, 0.62, Math.sin(i * 1.25) * 0.18]} rotation={[0.5, i * 1.25, 0]} material={candy(G.coral)}>
            <sphereGeometry args={[0.16, 8, 6]} />
          </mesh>
        ))}
        <mesh position={[0, 0.64, 0]} material={clay("#2a2230")}><sphereGeometry args={[0.08, 8, 8]} /></mesh>
      </group>

      {/* ===== TOOLSHED (-4) ===== */}
      <group position={[-4, 0, -1.2]}>
        <RoundedBox args={[1.8, 1.6, 1.0]} radius={0.08} position={[0, 0.8, 0]} material={clay(G.plum)} />
        <mesh position={[0, 1.7, 0.1]} rotation={[-0.4, 0, 0]} material={clay(G.woodDark)}><boxGeometry args={[2.0, 0.08, 1.2]} /></mesh>
        {/* door */}
        <RoundedBox args={[0.7, 1.2, 0.06]} radius={0.04} position={[0, 0.65, 0.52]} material={clay(G.mint)} />
        {/* chalkboard leaning */}
        <RoundedBox args={[1.0, 0.8, 0.05]} radius={0.04} position={[1.1, 0.5, 0.4]} rotation={[0, -0.4, 0.05]} material={clay("#2e3b33")} />
      </group>

      {/* ===== VEGETABLE PATCH (0) — three self-tending beds ===== */}
      <RaisedBed x={-1.4} crop={G.coral} />
      <RaisedBed x={0} crop={G.butter} />
      <RaisedBed x={1.4} crop={G.plum} />
      {/* wheelbarrow on the path */}
      <group position={[2.2, 0.2, 0.6]} rotation={[0, -0.4, 0]}>
        <RoundedBox args={[0.7, 0.3, 0.5]} radius={0.06} position={[0, 0.25, 0]} material={clay(G.coral)} />
        <mesh position={[0.35, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} material={clay(G.woodDark)}><cylinderGeometry args={[0.16, 0.16, 0.08, 12]} /></mesh>
      </group>

      {/* ===== GREENHOUSE (+5.5) ===== */}
      <group position={[5.5, 0, -1.0]}>
        {/* frosted glass shell (transmission-ish via candy + low opacity feel) */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[2.6, 2.2, 2.0]} />
          <meshStandardMaterial color="#cfe6dd" transparent opacity={0.22} roughness={0.4} />
        </mesh>
        {/* frame ribs */}
        {[[-1.3, 0, 0], [1.3, 0, 0]].map((p, i) => <RoundedBox key={i} args={[0.08, 2.2, 0.08]} radius={0.03} position={[p[0], 1.1, 1.0]} material={clay(G.plum)} />)}
        <mesh position={[0, 2.3, 0]} rotation={[0, 0, 0]} material={clay(G.plum)}><boxGeometry args={[2.6, 0.08, 0.08]} /></mesh>
        {/* central bench + 3 specimen plants */}
        <RoundedBox args={[2.0, 0.1, 0.6]} radius={0.04} position={[0, 0.7, 0]} material={clay(G.wood)} />
        {[-0.6, 0, 0.6].map((x, i) => (
          <group key={i} position={[x, 0.85, 0]}>
            <mesh material={clay([G.coral, G.mint, G.butter][i])}><cylinderGeometry args={[0.14, 0.16, 0.22, 12]} /></mesh>
            <Leaf p={[0, 0.3, 0]} s={0.6} c={G.leaf} />
            <Leaf p={[0.1, 0.32, 0.05]} s={0.5} c={G.leafDk} />
          </group>
        ))}
        {/* grow light */}
        <pointLight position={[0, 2.0, 0]} intensity={3} distance={4} color="#ffd9a0" />
      </group>

      {/* ===== FIG TREE + TWO BENCHES (+9) ===== */}
      <group position={[9, 0, -0.6]}>
        {/* trunk + canopy */}
        <mesh position={[0, 1.3, 0]} material={clay(G.woodDark)}><cylinderGeometry args={[0.18, 0.26, 2.6, 8]} /></mesh>
        {Array.from({ length: 10 }).map((_, i) => (
          <Leaf key={i} p={[Math.cos(i) * 1.1, 2.6 + Math.sin(i * 2) * 0.4, Math.sin(i) * 1.0]} s={1.4} c={i % 2 ? G.leaf : G.leafDk} />
        ))}
        {/* Ömer's design bench (left) */}
        <group position={[-1.4, 0, 0.4]}>
          <RoundedBox args={[1.2, 0.1, 0.7]} radius={0.04} position={[0, 0.7, 0]} material={clay(G.wood)} />
          <mesh position={[-0.3, 0.78, 0]} material={candy(G.coral)}><cylinderGeometry args={[0.18, 0.18, 0.04, 16]} /></mesh>{/* palette */}
          {[0, 1, 2].map((i) => <mesh key={i} position={[0.1 + i * 0.08, 0.8, 0.1]} rotation={[0, 0, 0.3]} material={clay([G.coral, G.mint, G.butter][i])}><cylinderGeometry args={[0.012, 0.012, 0.25, 6]} /></mesh>)}
        </group>
        {/* Baha's ops bench (right) */}
        <group position={[1.4, 0, 0.4]}>
          <RoundedBox args={[1.2, 0.1, 0.7]} radius={0.04} position={[0, 0.7, 0]} material={clay(G.wood)} />
          <mesh position={[-0.2, 0.85, 0]} rotation={[0, 0, Math.PI / 2]} material={candy(G.butter)}><cylinderGeometry args={[0.05, 0.05, 0.3, 10]} /></mesh>{/* pipe */}
          <mesh position={[0.2, 0.85, 0]} material={candy(G.plum)}><torusGeometry args={[0.12, 0.04, 8, 16]} /></mesh>{/* valve wheel */}
        </group>
      </group>

      {/* ===== FOUNTAIN / BACK GATE (+12) ===== */}
      <group position={[12, 0, -0.6]}>
        <mesh position={[0, 0.25, 0]} material={clay(G.mint)}><cylinderGeometry args={[0.7, 0.8, 0.5, 20]} /></mesh>
        <mesh position={[0, 0.5, 0]} material={candy("#bfe6dd")}><cylinderGeometry args={[0.6, 0.6, 0.05, 20]} /></mesh>{/* water */}
        {/* tipped watering can */}
        <group position={[0.3, 0.9, 0]} rotation={[0, 0, -0.7]}>
          <mesh material={candy(G.coral)}><capsuleGeometry args={[0.18, 0.22, 6, 12]} /></mesh>
          <mesh position={[0.25, 0.1, 0]} rotation={[0, 0, 0.4]} material={candy(G.coral)}><cylinderGeometry args={[0.04, 0.06, 0.3, 8]} /></mesh>
        </group>
        {/* back gate arch */}
        <mesh position={[0, 1.4, -1]} material={clay(G.coral)}><torusGeometry args={[0.8, 0.12, 8, 16, Math.PI]} /></mesh>
      </group>

      {/* lighting: golden hour key + warm fill */}
      <ambientLight intensity={0.45} color="#ffe9c8" />
      <directionalLight position={[-6, 4, 5]} intensity={1.3} color="#ffd28a" />
      <hemisphereLight args={["#ffe9c8", "#5a6e45", 0.5]} />
    </group>
  );
}
