"use client";

import { useMemo, Children, cloneElement, isValidElement } from "react";
import * as THREE from "three";

// Inked — wraps a mesh with a bold INVERTED-HULL outline (the Borderlands /
// Bendy method): a duplicate of the geometry, scaled out along normals, drawn
// with BackSide so only the rim shows behind the real mesh. Crisp, guaranteed-
// visible black ink contour — far more reliable than post-process depth-Sobel.
//
// Usage: <Inked thickness={0.03}><mesh geometry material/></Inked>
// The child must expose a `geometry` prop or be a primitive mesh.

const outlineMat = new THREE.MeshBasicMaterial({
  color: "#23202a",
  side: THREE.BackSide,
});

export function outlineMaterial(color = "#23202a") {
  return new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
}

// Outline shell for a given geometry: scaled slightly larger, backface only.
export function OutlineShell({ geometry, thickness = 0.025, color }: { geometry: THREE.BufferGeometry; thickness?: number; color?: string }) {
  const mat = useMemo(() => (color ? outlineMaterial(color) : outlineMat), [color]);
  // estimate a uniform outward scale from the geometry's bounding sphere
  const scale = useMemo(() => {
    geometry.computeBoundingSphere();
    const r = geometry.boundingSphere?.radius ?? 1;
    return 1 + thickness / Math.max(0.2, r);
  }, [geometry, thickness]);
  return <mesh geometry={geometry} material={mat} scale={scale} />;
}
