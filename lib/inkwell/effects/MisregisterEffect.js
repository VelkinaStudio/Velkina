import { Effect, EffectAttribute, BlendFunction } from "postprocessing";
import { Uniform, Vector2 } from "three";

/**
 * MisregisterEffect — comic-print RGB misregistration ("chromatic aberration"),
 * the way Spider-Verse uses it: a RADIAL offset from a focal point that grows
 * toward the edges, standing in for depth-of-field with a print-misalignment
 * feel. Not a uniform full-frame split (that reads as a cheap glitch).
 *
 * @typedef {Object} MisregisterOptions
 * @property {number} [strength=1.6]   Max channel offset in pixels at the edge.
 * @property {[number,number]} [focus=[0.5,0.5]]  Focal point in UV (no offset here).
 * @property {number} [falloff=1.4]    Higher = offset concentrated near edges.
 * @property {number} [redBlueOnly=1]  1 = split R/B (classic), 0 = also nudge G.
 */

const fragment = /* glsl */ `
uniform float uStrength;
uniform vec2  uFocus;
uniform float uFalloff;
uniform float uRedBlueOnly;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 dir = uv - uFocus;
  float dist = length(dir);
  // radial amount, 0 at focus -> max at edges
  float amt = pow(clamp(dist * 2.0, 0.0, 1.0), uFalloff) * uStrength;
  vec2 off = (dist > 1e-5 ? normalize(dir) : vec2(0.0)) * amt / resolution;

  float r = texture2D(inputBuffer, uv + off).r;
  float g = mix(
    texture2D(inputBuffer, uv).g,
    texture2D(inputBuffer, uv + off * 0.35).g,
    1.0 - uRedBlueOnly
  );
  float b = texture2D(inputBuffer, uv - off).b;

  outputColor = vec4(r, g, b, inputColor.a);
}
`;

export class MisregisterEffect extends Effect {
  /** @param {MisregisterOptions} [options] */
  constructor({ strength = 1.6, focus = [0.5, 0.5], falloff = 1.4, redBlueOnly = 1 } = {}) {
    super("MisregisterEffect", fragment, {
      // Samples inputBuffer at offset coords => must declare CONVOLUTION.
      // CONVOLUTION effects replace the frame, so blend as SRC.
      attributes: EffectAttribute.CONVOLUTION,
      blendFunction: BlendFunction.SRC,
      uniforms: new Map([
        ["uStrength", new Uniform(strength)],
        ["uFocus", new Uniform(new Vector2(focus[0], focus[1]))],
        ["uFalloff", new Uniform(falloff)],
        ["uRedBlueOnly", new Uniform(redBlueOnly)],
      ]),
    });
  }

  set strength(v) { this.uniforms.get("uStrength").value = v; }
  get strength() { return this.uniforms.get("uStrength").value; }
}
