"use client";

import { Environment, ContactShadows } from "@react-three/drei";

// Scene-wide lighting from the design's glossy recipe: ONE soft HDRI (makes
// clearcoat highlights look expensive) + ONE warm key + faint ambient, and ONE
// frozen contact shadow (frames=1 renders once = big perf win, room is static).

export default function SceneLighting() {
  return (
    <>
      <Environment preset="apartment" environmentIntensity={0.55} />
      <ambientLight intensity={0.28} />
      <directionalLight color={0xfff0dd} intensity={1.0} position={[3, 5, 4]} />
      <ContactShadows
        position={[0, 0.1, -0.8]}
        opacity={0.42}
        scale={12}
        blur={2.6}
        far={5}
        resolution={256}
        color="#3a2f4a"
        frames={1}
      />
    </>
  );
}
