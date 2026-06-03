"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Inked — bold INVERTED-HULL outlines, the real Borderlands / Bendy method.
//
// For each mesh we render a SECOND copy of the geometry that is:
//   • pushed OUTWARD along its vertex normals (position += normal * thickness)
//   • drawn with side: BackSide (so the camera-facing front is culled and only
//     the rim peeking past the real mesh shows)
//   • flat near-black (#23202a) with no lighting
//
// Pushing along normals (not uniform scale) keeps the contour even on torus /
// cone / non-centered geometry where bounding-sphere scaling would balloon.
//
// Thickness is made roughly SCREEN-CONSTANT: the push is multiplied by the
// vertex's clip-space w (view distance) so far objects don't get hairline
// outlines and near ones don't get fat ones. uThickness is in "screen units"
// at the projection scale below.
//
// Usage:
//   <Inked geometry={geo} material={celMat} thickness={3} position={[...]} />
// or wrap a single child mesh:
//   <Inked thickness={3}><mesh geometry={geo} material={celMat} /></Inked>
//
// `thickness` is in approximate pixels of outline at a ~1px reference; 2–5 reads
// as a bold ink line. Set `screenSpace={false}` for a world-constant push.

const OUTLINE_COLOR = new THREE.Color("#23202a");

const outlineVert = /* glsl */ `
uniform float uThickness;      // outline size
uniform float uScreenSpace;    // 1 = roughly constant in pixels, 0 = world units
void main() {
  vec3 n = normalize(normalMatrix * normal); // view-space normal
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vec4 clip = projectionMatrix * mvPos;

  if (uScreenSpace > 0.5) {
    // Push in view space, scaled by clip.w → the on-screen offset stays ~constant
    // regardless of distance. /1000 keeps uThickness in a friendly "px-ish" range.
    float scale = clip.w * (uThickness / 1000.0);
    mvPos.xyz += n * scale;
    gl_Position = projectionMatrix * mvPos;
  } else {
    // world-constant push (thickness in world units / 100)
    mvPos.xyz += n * (uThickness / 100.0);
    gl_Position = projectionMatrix * mvPos;
  }
}
`;

const outlineFrag = /* glsl */ `
uniform vec3 uColor;
void main() { gl_FragColor = vec4(uColor, 1.0); }
`;

export function outlineMaterial(opts?: {
  color?: THREE.ColorRepresentation;
  thickness?: number;
  screenSpace?: boolean;
}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(opts?.color ?? OUTLINE_COLOR) },
      uThickness: { value: opts?.thickness ?? 3 },
      uScreenSpace: { value: opts?.screenSpace === false ? 0 : 1 },
    },
    vertexShader: outlineVert,
    fragmentShader: outlineFrag,
    side: THREE.BackSide,
    // outline must not write over the real mesh from in front; back-face cull +
    // normal depth test handles it. Keep depthWrite so shells occlude correctly.
    depthWrite: true,
    depthTest: true,
  });
}

type InkedProps = {
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material | THREE.Material[];
  thickness?: number;
  outlineColor?: THREE.ColorRepresentation;
  screenSpace?: boolean;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<"group">, "children">;

// The reusable wrapper. Renders the real mesh + an inverted-hull outline shell.
export function Inked({
  geometry,
  material,
  thickness = 3,
  outlineColor,
  screenSpace = true,
  children,
  ...groupProps
}: InkedProps) {
  const outlineMat = useMemo(
    () => outlineMaterial({ color: outlineColor, thickness, screenSpace }),
    [outlineColor, thickness, screenSpace]
  );

  return (
    <group {...groupProps}>
      {/* the lit mesh */}
      {geometry ? <mesh geometry={geometry} material={material} /> : children}
      {/* the inverted-hull ink shell — only renders when geometry is provided */}
      {geometry && (
        <mesh geometry={geometry} material={outlineMat} />
      )}
    </group>
  );
}

// Standalone outline companion — drop next to any mesh sharing its geometry &
// transform. Useful when you can't wrap (e.g. instanced or imported meshes).
export function Outline({
  geometry,
  thickness = 3,
  color,
  screenSpace = true,
  ...props
}: {
  geometry: THREE.BufferGeometry;
  thickness?: number;
  color?: THREE.ColorRepresentation;
  screenSpace?: boolean;
} & Omit<React.ComponentProps<"mesh">, "geometry" | "material">) {
  const mat = useMemo(
    () => outlineMaterial({ color, thickness, screenSpace }),
    [color, thickness, screenSpace]
  );
  return <mesh geometry={geometry} material={mat} {...props} />;
}
