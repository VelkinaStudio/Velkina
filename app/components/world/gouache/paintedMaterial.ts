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
          vec3 base = diffuse;
          vec3 N = normalize(vVkNormalW);
          vec3 V = normalize(cameraPosition - vVkPos);
          float ndl = dot(N, normalize(uPaintLight)) * 0.5 + 0.5; // half-lambert
          // posterize into hard bands (threshold ink-shadow)
          float band = floor(ndl * uBands) / max(1.0, uBands - 1.0);
          band = clamp(band, 0.0, 1.0);
          // base painted color: darker in shadow bands, toward ink
          vec3 lit = mix(base * 0.45, base * 1.08, band);
          // hard fresnel rim — graphic silhouette pop
          float rim = pow(1.0 - max(dot(N, V), 0.0), uRimPower);
          rim = step(0.55, rim) * uRimStrength;
          lit += rim * vec3(1.0, 0.95, 0.85);
          // light-responsive screentone: dots in light, hatch in shadow
          vec2 sp = gl_FragCoord.xy / uResolution.yy;
          float dots = vk_dots(sp, uToneCount, 0.18 + band * 0.18);   // bigger toward light
          float hatch = vk_hatch(sp, uToneCount * 0.5, 0.78);
          float toneLight = dots * step(0.55, band);                  // dots only in lit band
          float toneShadow = hatch * step(band, 0.45);                // hatch only in shadow band
          lit *= 1.0 - toneShadow * uToneStrength;                    // hatch darkens shadow
          lit += toneLight * uToneStrength * 0.35 * vec3(1.0,0.96,0.9); // dots lighten light
          // snap to gouache palette
          lit = vk_snapPalette(lit);
          gl_FragColor.rgb = lit;
        }`
      );
    (m as any).userData.shader = shader;
  };
  m.needsUpdate = true;
  return m;
}
