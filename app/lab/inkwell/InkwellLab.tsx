"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useRef, useState } from "react";
import { Halftone, Posterize, InkOutline, Misregister } from "@velkina/inkwell/react";
import { steppedTime } from "@velkina/inkwell";

function Knot() {
  const ref = useRef<any>(null);
  useFrame(({ clock }) => {
    const t = steppedTime(clock.elapsedTime, 12); // on twos
    if (ref.current) {
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.y = t * 0.8;
    }
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.36, 220, 32]} />
      <meshStandardMaterial color="#e84d3c" roughness={0.55} metalness={0.05} />
    </mesh>
  );
}

const PASSES = ["none", "posterize", "ink", "halftone", "misregister", "comic"] as const;
type Pass = (typeof PASSES)[number];

export default function InkwellLab() {
  const [pass, setPass] = useState<Pass>("comic");

  return (
    <div style={{ position: "fixed", inset: 0, background: "#f3efe6" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 2]} intensity={1.3} />
        <color attach="background" args={["#f3efe6"]} />
        <Knot />
        <EffectComposer>
          {pass === "posterize" ? <Posterize levels={5} /> : <></>}
          {pass === "ink" ? <InkOutline thickness={1.2} threshold={0.14} /> : <></>}
          {pass === "halftone" ? <Halftone scale={1.4} mode="cmyk" /> : <></>}
          {pass === "misregister" ? <Misregister strength={2.5} /> : <></>}
          {pass === "comic" ? (
            <>
              <Posterize levels={5} />
              <Halftone scale={1.4} mode="cmyk" blending={0.85} />
            </>
          ) : (
            <></>
          )}
        </EffectComposer>
      </Canvas>

      <div
        style={{
          position: "fixed", bottom: 20, left: 20, display: "flex", gap: 8, flexWrap: "wrap",
          fontFamily: "monospace", fontSize: 13,
        }}
      >
        {PASSES.map((p) => (
          <button
            key={p}
            onClick={() => setPass(p)}
            style={{
              padding: "6px 12px", borderRadius: 6, cursor: "pointer",
              border: "1px solid #0a0a0a",
              background: pass === p ? "#0a0a0a" : "transparent",
              color: pass === p ? "#fff" : "#0a0a0a",
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
