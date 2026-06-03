import * as THREE from "three";

// GOUACHE — PaintedMaterial. The look in the MATERIAL (zero extra passes).
// half-Lambert → posterize into N hard bands (threshold ink-shadow) → a hard
// fresnel rim → light-responsive screentone (dots grow toward light, hatch in
// shadow) → snap to a small gouache palette. Injected via onBeforeCompile so it
// runs in the single geometry pass and works on WebGL2 today (no WebGPU needed).
//
// Returns a MeshStandardMaterial; reuse instances by reference.

const PALETTE = [
  // tight gouache poster set (rgb 0..1), nearest-snapped
  [0.10, 0.09, 0.12], // ink
  [0.18, 0.15, 0.20],
  [0.92, 0.42, 0.30], // coral
  [1.00, 0.55, 0.42], // coral light
  [0.42, 0.29, 0.54], // fig-plum
  [0.55, 0.40, 0.66],
  [0.31, 0.72, 0.58], // chalk-mint
  [0.50, 0.84, 0.70],
  [1.00, 0.81, 0.35], // butter
  [0.96, 0.92, 0.82], // bone
  [0.88, 0.80, 0.68],
  [0.74, 0.62, 0.50], // warm taupe
];

function paletteGLSL() {
  const lines = PALETTE.map((c) => `  pal[${PALETTE.indexOf(c)}] = vec3(${c[0]}, ${c[1]}, ${c[2]});`).join("\n");
  return `
vec3 vk_snapPalette(vec3 col) {
  vec3 pal[${PALETTE.length}];
${lines}
  float best = 1e9; vec3 out_ = col;
  for (int i = 0; i < ${PALETTE.length}; i++) {
    float d = distance(col, pal[i]);
    if (d < best) { best = d; out_ = pal[i]; }
  }
  return out_;
}`;
}

const HEAD = `
uniform float uBands;
uniform float uRimPower;
uniform float uRimStrength;
uniform float uToneCount;
uniform float uToneStrength;
uniform vec3  uPaintLight;
uniform vec2  uResolution;
varying vec3 vVkNormalW;
varying vec3 vVkPos;
${paletteGLSL()}

float vk_dots(vec2 p, float count, float radius) {
  vec2 g = fract(p * count) - 0.5;
  return smoothstep(radius, radius - 0.08, length(g));
}
float vk_hatch(vec2 p, float count, float angle) {
  vec2 r = vec2(p.x * cos(angle) - p.y * sin(angle), p.x * sin(angle) + p.y * cos(angle));
  return smoothstep(0.5, 0.42, abs(fract(r.x * count) - 0.5) * 2.0);
}`;

const VERT_DECL = `
varying vec3 vVkNormalW;
varying vec3 vVkPos;`;
const VERT_BODY = `
  vVkNormalW = normalize(mat3(modelMatrix) * normal);
  vVkPos = (modelMatrix * vec4(position, 1.0)).xyz;`;

export function paintedMaterial(color: string, opts?: { bands?: number; tone?: number }) {
  const m = new THREE.MeshStandardMaterial({ color, roughness: 1, metalness: 0 });
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uBands = { value: opts?.bands ?? 3 };
    shader.uniforms.uRimPower = { value: 3.5 };
    shader.uniforms.uRimStrength = { value: 0.5 };
    shader.uniforms.uToneCount = { value: opts?.tone ?? 90 };
    shader.uniforms.uToneStrength = { value: 0.28 };
    shader.uniforms.uPaintLight = { value: new THREE.Vector3(0.5, 0.8, 0.55).normalize() };
    shader.uniforms.uResolution = { value: new THREE.Vector2(1280, 800) };

    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\n" + VERT_DECL)
      .replace("#include <worldpos_vertex>", "#include <worldpos_vertex>\n" + VERT_BODY);

    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\n" + HEAD)
      // replace the standard output with our painted look
      .replace(
        "#include <dithering_fragment>",
        `#include <dithering_fragment>
        {
          // BORDERLANDS / BENDY cel look: crisp hard bands, high contrast, bold.
          vec3 base = diffuse;
          vec3 N = normalize(vVkNormalW);
          vec3 V = normalize(cameraPosition - vVkPos);
          float ndl = dot(N, normalize(uPaintLight)) * 0.5 + 0.5; // half-lambert

          // 3 hard cel steps with a crisp terminator (smoothstep edges, not floor)
          float s1 = smoothstep(0.34, 0.38, ndl);   // shadow -> mid
          float s2 = smoothstep(0.66, 0.70, ndl);   // mid -> light
          float tone = 0.55 + s1 * 0.28 + s2 * 0.30; // 0.55 (shadow) .. 1.13 (light)
          vec3 lit = base * tone;
          // deepen the core shadow toward the ink color (cartoon contrast)
          lit = mix(lit, lit * vec3(0.62, 0.58, 0.68), (1.0 - s1) * 0.5);

          // hard fresnel rim light — graphic silhouette pop (key Borderlands cue)
          float rim = pow(1.0 - max(dot(N, V), 0.0), uRimPower);
          rim = smoothstep(0.5, 0.7, rim) * uRimStrength;
          lit += rim * vec3(1.0, 0.93, 0.8);

          // faint hand-drawn hatching only in the deepest shadow (texture, subtle)
          vec2 sp = gl_FragCoord.xy / uResolution.yy;
          float hatch = vk_hatch(sp, uToneCount * 0.45, 0.7);
          lit *= 1.0 - hatch * (1.0 - s1) * uToneStrength;

          // snap to the tight palette so colors stay art-directed
          lit = mix(lit, vk_snapPalette(lit), 0.6);
          gl_FragColor.rgb = lit;
        }`
      );
    (m as any).userData.shader = shader;
  };
  m.needsUpdate = true;
  return m;
}
