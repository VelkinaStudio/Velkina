"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { Comic, InkOutline } from "@velkina/inkwell/react";
import { createGlossyInkMaterial, steppedTime } from "@velkina/inkwell";
import { useMemo, useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";

/**
 * The Spider-Verse hero wordmark: glossy candy-comic 3D "VELKINA", lit, rendered
 * through Inkwell's comic stack (toon bands + Ben-Day dots + ink outline) on a
 * comic-paper canvas, animated ON TWOS so it reads hand-drawn, and springing
 * toward the cursor (alive-under-the-pointer). This replaces the particle gimmick.
 */

function Wordmark({ text = "VELKINA" }: { text?: string }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2());
  const current = useRef(new THREE.Vector2());

  const mat = useMemo(
    () => createGlossyInkMaterial({
      color: "#ff5436", shade: "#c23218", rim: "#fff3cf",
      bands: 4, rimPower: 2.2, gloss: 0.85, lightDir: [0.4, 0.7, 0.8],
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    const t = steppedTime(clock.elapsedTime, 12); // on twos
    target.current.set(pointer.x, pointer.y);
    // spring the rotation toward the cursor (smooth follow, stepped wobble)
    current.current.lerp(target.current, 0.08);
    if (group.current) {
      group.current.rotation.y = current.current.x * 0.4 + Math.sin(t * 0.7) * 0.05;
      group.current.rotation.x = -current.current.y * 0.3 + Math.cos(t * 0.6) * 0.03;
      group.current.position.y = Math.sin(t * 1.1) * 0.06; // gentle on-twos bob
    }
  });

  return (
    <group ref={group}>
      <Center>
        <Text3D
          font="/fonts/archivo-black.json"
          size={1.4}
          height={0.55}
          curveSegments={6}
          bevelEnabled
          bevelThickness={0.1}
          bevelSize={0.06}
          bevelSegments={3}
          letterSpacing={-0.06}
          material={mat}
        >
          {text}
        </Text3D>
      </Center>
    </group>
  );
}

function DeferredComic() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!ready) return null;
  return (
    <EffectComposer>
      <Comic levels={5} scale={1.25} mode="cmyk" dotStrength={0.8} />
    </EffectComposer>
  );
}

export default function ComicWordmark({ withPost = true }: { withPost?: boolean }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <directionalLight position={[-4, -1, 2]} intensity={0.45} color="#7fb4ff" />
      <Suspense fallback={null}>
        <Wordmark />
        {withPost && <DeferredComic />}
      </Suspense>
    </Canvas>
  );
}
