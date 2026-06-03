"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Signature move: the word "VELKINA" rendered as a field of particles that
 * forms the letters, scatters on cursor velocity, and reforms. GLSL points
 * (robust, 60fps-friendly) — the WebGPU/TSL compute path is the upgrade.
 *
 * Technique: sample the word onto an offscreen 2D canvas, read the alpha
 * channel, and place a particle at each lit pixel. Each particle lerps back
 * to its home position; the cursor pushes nearby particles by velocity.
 */

const vertexShader = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  varying float vScale;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);
    vScale = aScale;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vScale;
  void main() {
    // soft round point
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d);
    // a few particles glow with the voltage accent
    vec3 col = mix(uColor, uAccent, step(0.82, vScale));
    gl_FragColor = vec4(col, alpha * 0.95);
  }
`;

function sampleWord(word: string, density: number) {
  const canvas = document.createElement("canvas");
  const w = 1400;
  const h = 360;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // heavy grotesque-ish
  ctx.font = `900 ${Math.floor(h * 0.78)}px Archivo, system-ui, sans-serif`;
  ctx.fillText(word, w / 2, h / 2 + 6);

  const img = ctx.getImageData(0, 0, w, h).data;
  const positions: number[] = [];
  const scales: number[] = [];
  const step = Math.max(2, Math.floor(7 - density)); // smaller step = more particles
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const a = img[(y * w + x) * 4]; // red channel == brightness
      if (a > 128) {
        // map pixel space to world space, centered
        const px = (x / w - 0.5) * 14;
        const py = -(y / h - 0.5) * 3.6;
        const pz = (Math.random() - 0.5) * 0.25;
        positions.push(px, py, pz);
        scales.push(0.6 + Math.random() * 0.8);
      }
    }
  }
  return { positions: new Float32Array(positions), scales: new Float32Array(scales) };
}

export default function ParticleText({
  word = "VELKINA",
  quality = 1,
}: {
  word?: string;
  quality?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, pointer } = useThree();
  const [ready, setReady] = useState(false);

  // home positions + live positions
  const data = useRef<{
    home: Float32Array;
    live: Float32Array;
    vel: Float32Array;
    scales: Float32Array;
    count: number;
  } | null>(null);

  const prevPointer = useRef(new THREE.Vector2());
  const pointerVel = useRef(new THREE.Vector2());

  // build geometry after fonts load (so Archivo is measured, not fallback)
  useEffect(() => {
    let cancelled = false;
    const build = () => {
      const density = quality >= 1 ? 4.2 : quality >= 0.6 ? 3.2 : 2.4;
      const { positions, scales } = sampleWord(word, density);
      if (cancelled) return;
      const count = positions.length / 3;
      data.current = {
        home: positions,
        live: Float32Array.from(positions).map((v) => v + (Math.random() - 0.5) * 6),
        vel: new Float32Array(positions.length),
        scales,
        count,
      };
      setReady(true);
    };
    // wait for the display font so glyph shapes are correct
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(() => setTimeout(build, 0));
    } else {
      build();
    }
    return () => {
      cancelled = true;
    };
  }, [word, quality]);

  const geometry = useMemo(() => {
    if (!data.current) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.current.live, 3));
    g.setAttribute("aScale", new THREE.BufferAttribute(data.current.scales, 1));
    return g;
  }, [ready]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uSize: { value: 22 },
          uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
          uColor: { value: new THREE.Color("#EDEAE3") },
          uAccent: { value: new THREE.Color("#C6F24E") },
        },
      }),
    []
  );

  useFrame((state, delta) => {
    const d = data.current;
    if (!d || !geometry) return;
    const dt = Math.min(delta, 0.05);

    // Responsive fit: the wordmark spans ~14.5 world units. Scale the group so
    // it occupies ~86% of the visible viewport width (never upscaled past 1).
    const WORD_WIDTH = 14.5;
    const fit = Math.min(1, (viewport.width * 0.86) / WORD_WIDTH);
    if (pointsRef.current) pointsRef.current.scale.setScalar(fit);

    // pointer velocity in world space, divided by fit so interaction stays
    // aligned to the (scaled) glyph positions.
    const px = (pointer.x * (viewport.width / 2)) / fit;
    const py = (pointer.y * (viewport.height / 2)) / fit;
    pointerVel.current.set(px - prevPointer.current.x, py - prevPointer.current.y);
    prevPointer.current.set(px, py);
    const speed = pointerVel.current.length();

    const pos = geometry.attributes.position.array as Float32Array;
    const home = d.home;
    const vel = d.vel;
    const reform = 4.2; // spring back
    const friction = 0.86;

    for (let i = 0; i < d.count; i++) {
      const ix = i * 3;
      const hx = home[ix], hy = home[ix + 1], hz = home[ix + 2];
      let x = pos[ix], y = pos[ix + 1], z = pos[ix + 2];

      // cursor push by velocity (only when moving)
      if (speed > 0.02) {
        const dx = x - px;
        const dy = y - py;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 4.0) {
          const f = (1.0 - dist2 / 4.0) * speed * 9.0;
          const inv = 1 / (Math.sqrt(dist2) + 0.001);
          vel[ix] += dx * inv * f * dt;
          vel[ix + 1] += dy * inv * f * dt;
          vel[ix + 2] += (Math.random() - 0.5) * f * dt;
        }
      }

      // spring home
      vel[ix] += (hx - x) * reform * dt;
      vel[ix + 1] += (hy - y) * reform * dt;
      vel[ix + 2] += (hz - z) * reform * dt;
      vel[ix] *= friction;
      vel[ix + 1] *= friction;
      vel[ix + 2] *= friction;

      pos[ix] = x + vel[ix];
      pos[ix + 1] = y + vel[ix + 1];
      pos[ix + 2] = z + vel[ix + 2];
    }
    geometry.attributes.position.needsUpdate = true;

    // gentle breathing rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
    }
  });

  if (!geometry) return null;
  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
