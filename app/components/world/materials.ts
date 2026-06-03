import * as THREE from "three";

// Shared materials — declared ONCE at module scope and reused by reference
// (perf rule: never per-object instantiation). Two families from the design:
// matte clay (room) + glossy candy (hero objects). Matcaps for mascots are
// loaded in the components that need them (texture loader).

export const PALETTE = {
  coral: "#ff6a4d",
  coralDeep: "#e8503a",
  plum: "#6b4a8a",
  mint: "#4fb892",
  cream: "#f5ecd8",
  butter: "#ffcf3f",
  rose: "#ff9aa2",
  sky: "#8aa0d6",
  wood: "#c89b6a",
  wallA: "#f3e3d6",
  wallB: "#ecd9c8",
  floor: "#e7d4c2",
  rug: "#ff9aa2",
  ink: "#2a2230",
};

import { celMaterial } from "./gouache/celMaterial";

// Borderlands/Bendy CEL look for everything (verified in /celtest). Hard flat
// bands, crisp terminator, ink-tinted shadow, fresnel rim. Outlines are added
// separately via the inverted-hull <Inked>/<Outline> system.
export function clay(color: string) {
  return celMaterial(color, { bands: 3 });
}
export function waxClay(color: string) {
  return celMaterial(color, { bands: 3 });
}
export function candy(color: string) {
  return celMaterial(color, { bands: 3, rimStrength: 0.8 });
}
// emissive screen
export function screen(color: string, intensity = 1.6) {
  return new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color), emissiveIntensity: intensity, toneMapped: false });
}

// module-scope temps (no allocation in frame loops)
export const tmpV = new THREE.Vector3();
export const tmpV2 = new THREE.Vector3();
