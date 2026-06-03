import { Effect } from "postprocessing";
import { Uniform } from "three";

/**
 * ComicEffect — the full hand-painted look in ONE fragment pass:
 * posterize (toon bands) → CMYK/mono halftone, composited in the right order.
 *
 * Doing it in a single effect (rather than chaining Posterize + Halftone as two
 * EffectPass children) is both faster (one fullscreen pass) and avoids any
 * pass-merge/blend subtleties — it's the recommended way to ship the preset.
 * For per-pass art-direction, the standalone effects are still exported.
 *
 * @typedef {Object} ComicOptions
 * @property {number} [levels=5]    Posterize colour bands.
 * @property {number} [scale=1.4]   Halftone dot cell size.
 * @property {'cmyk'|'mono'} [mode='cmyk']
 * @property {number} [dotStrength=0.9]  How strongly dots replace the flat colour.
 * @property {THREE.ColorRepresentation} [color] mono ink (mono mode)
 */

const fragment = /* glsl */ `
uniform float uLevels;
uniform float uScale;
uniform int   uMode;
uniform float uDotStrength;

vec2 rot2c(vec2 p, float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c)*p; }

float dotChannel(vec2 fragPx, float cell, float angle, float value){
  vec2 p = rot2c(fragPx, angle) / cell;
  vec2 cc = floor(p) + 0.5;
  vec2 nearest = rot2c(cc * cell, -angle);
  float d = distance(fragPx, nearest);
  float r = sqrt(clamp(value,0.0,1.0)) * (cell*0.5);
  float aa = fwidth(d) + 1e-4;
  return 1.0 - smoothstep(r-aa, r+aa, d);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
  vec3 src = clamp(inputColor.rgb, 0.0, 1.0);

  // 1) posterize → toon bands
  vec3 toon = floor(src * uLevels + 0.5) / uLevels;

  // 2) halftone on the toon-banded colour
  vec2 fragPx = uv * resolution;
  float cell = max(2.0, uScale * 3.0);
  vec3 printed;

  if (uMode == 1) {
    float lum = dot(toon, vec3(0.299,0.587,0.114));
    float ink = dotChannel(fragPx, cell, 0.26, 1.0 - lum);
    printed = mix(vec3(1.0), toon, ink); // dark dots build the form on paper
  } else {
    float k = 1.0 - max(max(toon.r,toon.g),toon.b);
    vec3 cmy = clamp((1.0 - toon - k) / max(1.0 - k, 1e-5), 0.0, 1.0);
    float c  = dotChannel(fragPx, cell, 0.2618, cmy.r);
    float m  = dotChannel(fragPx, cell, 1.3090, cmy.g);
    float y  = dotChannel(fragPx, cell, 0.0,    cmy.b);
    float kk = dotChannel(fragPx, cell, 0.7854, k);
    printed = vec3(1.0 - c, 1.0 - m, 1.0 - y) * (1.0 - kk);
  }

  vec3 outc = mix(toon, printed, uDotStrength);
  outputColor = vec4(outc, inputColor.a);
}
`;

export class ComicEffect extends Effect {
  /** @param {ComicOptions} [options] */
  constructor({ levels = 5, scale = 1.4, mode = "cmyk", dotStrength = 0.9 } = {}) {
    super("ComicEffect", fragment, {
      uniforms: new Map([
        ["uLevels", new Uniform(levels)],
        ["uScale", new Uniform(scale)],
        ["uMode", new Uniform(mode === "mono" ? 1 : 0)],
        ["uDotStrength", new Uniform(dotStrength)],
      ]),
    });
  }
  set scale(v){ this.uniforms.get("uScale").value = v; }
  get scale(){ return this.uniforms.get("uScale").value; }
}
