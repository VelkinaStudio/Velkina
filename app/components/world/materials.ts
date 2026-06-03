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

// matte clay (play-doh): metalness 0, roughness 0.75, no clearcoat
export function clay(color: string) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.78, metalness: 0 });
}
// waxy clay (hero clay): a hair of clearcoat
export function waxClay(color: string) {
  return new THREE.MeshPhysicalMaterial({ color, roughness: 0.7, metalness: 0, clearcoat: 0.3, clearcoatRoughness: 0.6 });
}
// glossy candy (project objects, accents): the clearcoat shell move
export function candy(color: string) {
  return new THREE.MeshPhysicalMaterial({ color, roughness: 0.18, metalness: 0, clearcoat: 1.0, clearcoatRoughness: 0.18, ior: 1.4 });
}
// emissive screen
export function screen(color: string, intensity = 1.6) {
  return new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color), emissiveIntensity: intensity, toneMapped: false });
}

// module-scope temps (no allocation in frame loops)
export const tmpV = new THREE.Vector3();
export const tmpV2 = new THREE.Vector3();
