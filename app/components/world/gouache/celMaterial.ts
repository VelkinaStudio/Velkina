import * as THREE from "three";

// CEL — hard-stepped Borderlands/Bendy cel material. The look lives in the
// MATERIAL (no post-process pass needed). Recipe:
//   1. half-Lambert N·L  → wraps the terminator so backs aren't pure black
//   2. quantize into N HARD bands (floor, crisp edge — NOT soft smoothstep,
//      which is what washed the previous attempt flat once palette-snapped)
//   3. each band multiplies the base color by a fixed, high-contrast tone so
//      shadow reads dark and light reads near-full — bold, flat, snapped
//   4. a HARD fresnel rim light for the graphic silhouette pop
//   5. tiny crisp anti-alias on band edges only (1px) so it isn't jaggy
//
// Returns a MeshStandardMaterial; onBeforeCompile runs in the single geometry
// pass, WebGL2-friendly, no WebGPU. Reuse instances by reference where possible.
//
// Why this reads bold where paintedMaterial.ts washed out: no palette-snap mix
// (that averaged the bands toward muddy mids), bands are quantized by floor with
// large tone gaps (0.40 shadow → 1.0 light), and shadow is tinted toward ink.

export type CelOptions = {
  bands?: number;        // number of hard lighting bands (2–4 is the sweet spot)
  shadowTone?: number;   // darkest band multiplier (lower = more contrast)
  lightTone?: number;    // brightest band multiplier (1.0 = full base color)
  shadowTint?: THREE.ColorRepresentation; // hue the deep shadow leans toward
  rimColor?: THREE.ColorRepresentation;
  rimStrength?: number;  // 0 disables the rim
  rimPower?: number;     // higher = thinner rim
  wrap?: number;         // half-lambert wrap, 0..1 (0.5 = classic half-lambert)
  lightDir?: THREE.Vector3;
};

const DEFAULTS: Required<Omit<CelOptions, "shadowTint" | "rimColor" | "lightDir">> & {
  shadowTint: THREE.Color;
  rimColor: THREE.Color;
  lightDir: THREE.Vector3;
} = {
  bands: 3,
  shadowTone: 0.34,
  lightTone: 1.0,
  shadowTint: new THREE.Color("#2c2238"),
  rimColor: new THREE.Color("#fff2d6"),
  rimStrength: 0.65,
  rimPower: 3.0,
  wrap: 0.38, // tighter wrap → steeper N·L gradient → sharper terminator
  lightDir: new THREE.Vector3(0.55, 0.7, 0.45).normalize(),
};

const HEAD = /* glsl */ `
uniform float uBands;
uniform float uShadowTone;
uniform float uLightTone;
uniform vec3  uShadowTint;
uniform vec3  uRimColor;
uniform float uRimStrength;
uniform float uRimPower;
uniform float uWrap;
uniform vec3  uCelLight;
varying vec3 vCelNormalW;
varying vec3 vCelPosW;
`;

const VERT_DECL = /* glsl */ `
varying vec3 vCelNormalW;
varying vec3 vCelPosW;
`;
const VERT_BODY = /* glsl */ `
  vCelNormalW = normalize(mat3(modelMatrix) * objectNormal);
  vCelPosW = (modelMatrix * vec4(transformed, 1.0)).xyz;
`;

// Inserted just before dithering so it overrides the standard lit color but
// still benefits from tonemapping/colorspace conversion happening after.
const FRAG_BODY = /* glsl */ `
{
  vec3 baseCol = diffuse; // the material's flat color, pre-lighting
  vec3 N = normalize(vCelNormalW);
  vec3 L = normalize(uCelLight);
  vec3 V = normalize(cameraPosition - vCelPosW);

  // half-lambert: (N·L)*wrap + (1-wrap)  →  smoothed, no hard self-black
  float ndl = dot(N, L);
  float lambert = clamp(ndl * uWrap + (1.0 - uWrap), 0.0, 1.0);

  // HARD quantize into uBands DISTINCT bands. Snap lambert to the band centers
  // (0, 1/(steps-1), .. 1) so each band is a single flat value — Borderlands
  // poster look, not a smooth ramp. Edge AA is clamped to a TRUE ~1.2px so the
  // terminator stays crisp even on far/curved surfaces (this is what kept the
  // previous attempt soft — an unclamped fwidth smeared the bands).
  float steps = max(uBands, 1.0);
  float scaled = lambert * steps;          // 0 .. steps
  float idx = floor(scaled);               // which band
  float frac = scaled - idx;               // position within band
  // KNIFE-EDGE terminator: AA spans ~1px of the gradient, hard-capped tight so
  // it never bleeds into a gradient on big smooth surfaces (the blob/sphere are
  // where softness shows — this cap is what keeps the line a line).
  float aa = clamp(fwidth(scaled) * 0.5, 0.0006, 0.02);
  float edge = smoothstep(0.5 - aa, 0.5 + aa, frac);
  // discrete band level 0 .. (steps-1), then normalized → each band is FLAT
  float level = clamp(idx + edge, 0.0, steps);
  float t = level / steps;                 // stepped 0..1, flat per band

  // map the stepped level LINEARLY across the tone range — no smoothing, so the
  // tone is constant within a band. Bold gap (shadowTone..lightTone) = contrast.
  float tone = mix(uShadowTone, uLightTone, t);
  vec3 lit = baseCol * tone;

  // tint the deepest band toward ink so shadows read as drawn shadow, not gray.
  // Hard cut at the first band boundary so the shadow is a flat inked color.
  float shadowMask = 1.0 - step(0.5 / steps, t); // 1 only in the darkest band
  lit = mix(lit, uShadowTint * baseCol, shadowMask * 0.85);

  // HARD fresnel rim — graphic silhouette pop (key Borderlands cue)
  float fres = pow(1.0 - max(dot(N, V), 0.0), uRimPower);
  float rim = smoothstep(0.45, 0.6, fres) * uRimStrength;
  // rim only on the lit side reads more natural than an all-around halo
  rim *= smoothstep(-0.2, 0.3, ndl);
  lit += rim * uRimColor;

  gl_FragColor.rgb = lit;
}
`;

export function celMaterial(color: THREE.ColorRepresentation, opts: CelOptions = {}) {
  const o = { ...DEFAULTS, ...opts } as Required<CelOptions>;
  const shadowTint = opts.shadowTint ? new THREE.Color(opts.shadowTint) : DEFAULTS.shadowTint;
  const rimColor = opts.rimColor ? new THREE.Color(opts.rimColor) : DEFAULTS.rimColor;
  const lightDir = (opts.lightDir ?? DEFAULTS.lightDir).clone().normalize();

  const m = new THREE.MeshStandardMaterial({ color, roughness: 1, metalness: 0 });
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uBands = { value: o.bands };
    shader.uniforms.uShadowTone = { value: o.shadowTone };
    shader.uniforms.uLightTone = { value: o.lightTone };
    shader.uniforms.uShadowTint = { value: shadowTint };
    shader.uniforms.uRimColor = { value: rimColor };
    shader.uniforms.uRimStrength = { value: o.rimStrength };
    shader.uniforms.uRimPower = { value: o.rimPower };
    shader.uniforms.uWrap = { value: o.wrap };
    shader.uniforms.uCelLight = { value: lightDir };

    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\n" + VERT_DECL)
      // beginnormal_vertex defines objectNormal; defaultnormal_vertex follows.
      // worldpos defines worldPosition; we compute our own from `transformed`.
      .replace(
        "#include <worldpos_vertex>",
        "#include <worldpos_vertex>\n" + VERT_BODY
      );

    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\n" + HEAD)
      .replace("#include <dithering_fragment>", FRAG_BODY + "\n#include <dithering_fragment>");

    (m as any).userData.shader = shader;
  };
  m.needsUpdate = true;
  return m;
}
