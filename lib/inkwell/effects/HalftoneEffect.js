import { Effect } from "postprocessing";
import { Uniform, Color, Vector2 } from "three";

/**
 * HalftoneEffect — Ben-Day / CMYK halftone dots in screen space.
 *
 * Correctness notes (from the research spec, spiderverse-render-2026-06.md):
 *  - Dot radius scales with sqrt(coverage), because perceived ink is dot AREA
 *    (π r²), not radius. Using coverage directly makes shadows look too light.
 *  - Edge antialiasing uses fwidth() so dots stay crisp and shimmer-free when
 *    the camera moves (resolution-independent).
 *  - Four channel grids rotated at the classic print angles (C 15°, M 75°,
 *    Y 0°, K 45°) minimise Moiré and give the authentic 4-colour-print look.
 *
 * Modes:
 *  - 'cmyk'  : full 4-colour subtractive halftone (default, most "printed").
 *  - 'mono'  : single rotated grid, dots tinted `color` over `background`.
 *
 * @typedef {Object} HalftoneOptions
 * @property {number} [scale=1.4]      Dot cell size in pixels-ish (bigger = chunkier).
 * @property {'cmyk'|'mono'} [mode='cmyk']
 * @property {number} [angle=0.26]     Base grid rotation (radians) for mono mode.
 * @property {THREE.ColorRepresentation} [color='#111111']   Dot ink colour (mono).
 * @property {THREE.ColorRepresentation} [background='#ffffff'] Paper colour (mono).
 * @property {number} [blending=1]     0..1 mix between original and halftone.
 */

const fragment = /* glsl */ `
uniform float uScale;
uniform float uAngle;
uniform vec3  uColor;
uniform vec3  uBackground;
uniform float uBlend;
uniform int   uMode; // 0 = cmyk, 1 = mono

// rotate a 2D point
vec2 rot2(vec2 p, float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c) * p;
}

// one halftone channel: returns ink coverage 0..1 at this fragment for a grid
// rotated by 'angle', given target ink 'value' (0 = none, 1 = full).
float halftoneChannel(vec2 fragPx, float cell, float angle, float value) {
  vec2 p = rot2(fragPx, angle) / cell;
  vec2 cellCenter = floor(p) + 0.5;
  vec2 nearest = rot2(cellCenter * cell, -angle);
  float d = distance(rot2(fragPx, 0.0), rot2(nearest, 0.0)); // dist in px to dot center
  // radius from coverage: area-correct (sqrt), clamped to the cell.
  float r = sqrt(clamp(value, 0.0, 1.0)) * (cell * 0.5);
  float aa = fwidth(d) + 1e-4;
  // inside the dot => ink. smoothstep gives resolution-independent AA edge.
  return 1.0 - smoothstep(r - aa, r + aa, d);
}

vec3 rgb2cmyk_k(vec3 c) {
  float k = 1.0 - max(max(c.r, c.g), c.b);
  return vec3(k); // we only need K separately; CMY derived below
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 fragPx = uv * resolution; // screen-space pixel coords
  float cell = max(2.0, uScale * 3.0);

  vec3 src = inputColor.rgb;
  vec3 result;

  if (uMode == 1) {
    // MONO: luminance drives a single rotated grid of uColor dots on paper.
    float lum = dot(src, vec3(0.299, 0.587, 0.114));
    float ink = halftoneChannel(fragPx, cell, uAngle, 1.0 - lum);
    result = mix(uBackground, uColor, ink);
  } else {
    // CMYK: convert, lay each channel on its own rotated grid, subtract from white.
    float k = 1.0 - max(max(src.r, src.g), src.b);
    float invK = max(1e-4, 1.0 - k);
    float c = (1.0 - src.r - k) / invK;
    float m = (1.0 - src.g - k) / invK;
    float y = (1.0 - src.b - k) / invK;

    float dc = halftoneChannel(fragPx, cell, 0.2618, clamp(c, 0.0, 1.0)); // 15°
    float dm = halftoneChannel(fragPx, cell, 1.3090, clamp(m, 0.0, 1.0)); // 75°
    float dy = halftoneChannel(fragPx, cell, 0.0,    clamp(y, 0.0, 1.0)); // 0°
    float dk = halftoneChannel(fragPx, cell, 0.7854, clamp(k, 0.0, 1.0)); // 45°

    // subtractive: start white, remove each ink's ABSORBED channel.
    // (cyan ink looks cyan because it removes RED, etc. — subtract the
    //  absorbed channel, not the ink's apparent colour. This was the bug
    //  that turned red objects teal.)
    vec3 col = vec3(1.0);
    col -= vec3(1.0, 0.0, 0.0) * dc * 0.92; // cyan ink absorbs RED
    col -= vec3(0.0, 1.0, 0.0) * dm * 0.92; // magenta ink absorbs GREEN
    col -= vec3(0.0, 0.0, 1.0) * dy * 0.92; // yellow ink absorbs BLUE
    col -= vec3(1.0) * dk * 0.95;           // key (black) removes all
    result = clamp(col, 0.0, 1.0);
  }

  outputColor = vec4(mix(src, result, uBlend), inputColor.a);
}
`;

export class HalftoneEffect extends Effect {
  /** @param {HalftoneOptions} [options] */
  constructor({
    scale = 1.4,
    mode = "cmyk",
    angle = 0.26,
    color = "#111111",
    background = "#ffffff",
    blending = 1,
  } = {}) {
    super("HalftoneEffect", fragment, {
      uniforms: new Map([
        ["uScale", new Uniform(scale)],
        ["uAngle", new Uniform(angle)],
        ["uColor", new Uniform(new Color(color))],
        ["uBackground", new Uniform(new Color(background))],
        ["uBlend", new Uniform(blending)],
        ["uMode", new Uniform(mode === "mono" ? 1 : 0)],
      ]),
    });
  }

  set scale(v) { this.uniforms.get("uScale").value = v; }
  get scale() { return this.uniforms.get("uScale").value; }
  set blend(v) { this.uniforms.get("uBlend").value = v; }
  get blend() { return this.uniforms.get("uBlend").value; }
}
