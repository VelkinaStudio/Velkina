import { Effect } from "postprocessing";
import { Uniform } from "three";

/**
 * PosterizeEffect — quantise colour into N bands (toon/cel look). This is the
 * stylised base the halftone + ink passes sit on; without it, a photoreal
 * render with dots on top still reads as "photo with a filter," not "drawn."
 *
 * Optionally quantise in a gamma-ish space so shadows band gracefully.
 *
 * @typedef {Object} PosterizeOptions
 * @property {number} [levels=5]   Colour bands per channel (3-8 typical).
 * @property {number} [gamma=1.0]  >1 pushes more bands into shadows.
 * @property {number} [blend=1]    0..1 mix with original.
 */

const fragment = /* glsl */ `
uniform float uLevels;
uniform float uGamma;
uniform float uBlend;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 c = inputColor.rgb;
  vec3 g = pow(c, vec3(uGamma));
  vec3 q = floor(g * uLevels + 0.5) / uLevels;
  vec3 outc = pow(q, vec3(1.0 / uGamma));
  outputColor = vec4(mix(c, outc, uBlend), inputColor.a);
}
`;

export class PosterizeEffect extends Effect {
  /** @param {PosterizeOptions} [options] */
  constructor({ levels = 5, gamma = 1.0, blend = 1 } = {}) {
    super("PosterizeEffect", fragment, {
      uniforms: new Map([
        ["uLevels", new Uniform(levels)],
        ["uGamma", new Uniform(gamma)],
        ["uBlend", new Uniform(blend)],
      ]),
    });
  }
  set levels(v) { this.uniforms.get("uLevels").value = v; }
  get levels() { return this.uniforms.get("uLevels").value; }
}
