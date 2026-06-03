import { Effect, EffectAttribute, BlendFunction } from "postprocessing";
import { Uniform, Color } from "three";

/**
 * InkOutlineEffect — comic ink outlines via a Sobel edge detector run over
 * scene depth (silhouettes + big depth discontinuities) and luminance
 * (interior contrast edges). Lines get a noise-warped sampling offset so they
 * read as hand-inked rather than a clean post filter.
 *
 * This is the single-pass, depth+luma variant: robust and dependency-free.
 * For interior crease lines (folds on a smooth surface) the fuller technique
 * also Sobels a normal buffer — documented in the README as the upgrade path;
 * not required for the silhouette-ink look most scenes want.
 *
 * Requires the DEPTH buffer (we declare DEPTH attribute so postprocessing wires
 * `depthBuffer` + `readDepth` for us).
 *
 * @typedef {Object} InkOutlineOptions
 * @property {THREE.ColorRepresentation} [color='#0a0a0a']  Ink colour.
 * @property {number} [thickness=1.0]   Edge sampling radius in pixels.
 * @property {number} [depthEdge=0.6]   Weight of depth-based silhouette edges.
 * @property {number} [lumaEdge=0.35]   Weight of luminance interior edges.
 * @property {number} [threshold=0.18]  Edge strength cutoff (lower = more lines).
 * @property {number} [jitter=0.6]      Hand-drawn wobble of the sample grid (px).
 */

const fragment = /* glsl */ `
uniform vec3  uColor;
uniform float uThickness;
uniform float uDepthEdge;
uniform float uLumaEdge;
uniform float uThreshold;
uniform float uJitter;

float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

// cheap value noise for line "boil"
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float readDepthAt(vec2 uv) {
  return readDepth(texture2D(depthBuffer, uv).r);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 texel = 1.0 / resolution;
  // hand-inked jitter: nudge the sampling origin by per-fragment noise
  vec2 j = (vec2(hash(uv * resolution), hash(uv * resolution + 7.0)) - 0.5) * uJitter * texel;
  vec2 o = texel * uThickness;

  // Sobel over depth (silhouettes) and luma (interior edges)
  float dC = readDepthAt(uv + j);
  float dTL = readDepthAt(uv + j + vec2(-o.x,  o.y));
  float dT  = readDepthAt(uv + j + vec2( 0.0,  o.y));
  float dTR = readDepthAt(uv + j + vec2( o.x,  o.y));
  float dL  = readDepthAt(uv + j + vec2(-o.x,  0.0));
  float dR  = readDepthAt(uv + j + vec2( o.x,  0.0));
  float dBL = readDepthAt(uv + j + vec2(-o.x, -o.y));
  float dB  = readDepthAt(uv + j + vec2( 0.0, -o.y));
  float dBR = readDepthAt(uv + j + vec2( o.x, -o.y));

  float gxD = (dTL + 2.0*dL + dBL) - (dTR + 2.0*dR + dBR);
  float gyD = (dTL + 2.0*dT + dTR) - (dBL + 2.0*dB + dBR);
  float depthSobel = length(vec2(gxD, gyD));

  float lC  = luma(texture2D(inputBuffer, uv + j).rgb);
  float lL  = luma(texture2D(inputBuffer, uv + j + vec2(-o.x, 0.0)).rgb);
  float lR  = luma(texture2D(inputBuffer, uv + j + vec2( o.x, 0.0)).rgb);
  float lT  = luma(texture2D(inputBuffer, uv + j + vec2(0.0,  o.y)).rgb);
  float lB  = luma(texture2D(inputBuffer, uv + j + vec2(0.0, -o.y)).rgb);
  float lumaSobel = abs(lL - lR) + abs(lT - lB);

  float edge = depthSobel * uDepthEdge * 40.0 + lumaSobel * uLumaEdge;
  float ink = smoothstep(uThreshold, uThreshold + 0.08, edge);

  outputColor = vec4(mix(inputColor.rgb, uColor, ink), inputColor.a);
}
`;

export class InkOutlineEffect extends Effect {
  /** @param {InkOutlineOptions} [options] */
  constructor({
    color = "#0a0a0a",
    thickness = 1.0,
    depthEdge = 0.6,
    lumaEdge = 0.35,
    threshold = 0.18,
    jitter = 0.6,
  } = {}) {
    super("InkOutlineEffect", fragment, {
      // reads depth buffer (DEPTH) AND samples neighbouring texels (CONVOLUTION)
      attributes: EffectAttribute.DEPTH | EffectAttribute.CONVOLUTION,
      blendFunction: BlendFunction.SRC,
      uniforms: new Map([
        ["uColor", new Uniform(new Color(color))],
        ["uThickness", new Uniform(thickness)],
        ["uDepthEdge", new Uniform(depthEdge)],
        ["uLumaEdge", new Uniform(lumaEdge)],
        ["uThreshold", new Uniform(threshold)],
        ["uJitter", new Uniform(jitter)],
      ]),
    });
  }
  set thickness(v) { this.uniforms.get("uThickness").value = v; }
  get thickness() { return this.uniforms.get("uThickness").value; }
}
