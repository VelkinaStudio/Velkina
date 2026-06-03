import { ShaderMaterial, Color, Vector3 } from "three";

/**
 * GlossyInkMaterial — candy-gloss, "bubbly" shading for comic 3D type/shapes.
 *
 * Cheap, dependency-free gloss: cel-banded diffuse + a fresnel rim + a tight
 * specular hotspot, all in one shader. Designed to be run THROUGH the comic
 * post stack (posterize/halftone/ink) — so it stays flat-ish and reads as
 * inked illustration, not a chrome render. Looks great on extruded text and
 * inflated blobs ("bubbly").
 *
 * @typedef {Object} GlossyInkOptions
 * @property {THREE.ColorRepresentation} [color='#ff5a3c']  Base ink colour.
 * @property {THREE.ColorRepresentation} [shade]            Shadow band colour (auto-darkens base if omitted).
 * @property {THREE.ColorRepresentation} [rim='#ffffff']    Fresnel rim colour.
 * @property {number} [bands=3]        Cel diffuse bands.
 * @property {number} [rimPower=2.5]   Fresnel falloff (higher = thinner rim).
 * @property {number} [gloss=0.6]      Specular hotspot strength.
 * @property {[number,number,number]} [lightDir=[0.5,0.8,0.6]]
 */
export function createGlossyInkMaterial(options = {}) {
  const {
    color = "#ff5a3c",
    shade,
    rim = "#ffffff",
    bands = 3,
    rimPower = 2.5,
    gloss = 0.6,
    lightDir = [0.5, 0.8, 0.6],
  } = options;

  const base = new Color(color);
  const shadeCol = shade ? new Color(shade) : base.clone().multiplyScalar(0.55);
  const ld = new Vector3(...lightDir).normalize();

  return new ShaderMaterial({
    uniforms: {
      uBase: { value: base },
      uShade: { value: shadeCol },
      uRim: { value: new Color(rim) },
      uBands: { value: bands },
      uRimPower: { value: rimPower },
      uGloss: { value: gloss },
      uLightDir: { value: ld },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uBase; uniform vec3 uShade; uniform vec3 uRim;
      uniform float uBands; uniform float uRimPower; uniform float uGloss;
      uniform vec3 uLightDir;
      varying vec3 vNormal; varying vec3 vViewDir;
      void main() {
        vec3 N = normalize(vNormal);
        vec3 L = normalize(uLightDir);
        vec3 V = normalize(vViewDir);

        // cel-banded diffuse
        float ndl = max(dot(N, L), 0.0);
        float band = floor(ndl * uBands) / max(uBands - 1.0, 1.0);
        vec3 col = mix(uShade, uBase, clamp(band, 0.0, 1.0));

        // tight gloss hotspot
        vec3 H = normalize(L + V);
        float spec = pow(max(dot(N, H), 0.0), 48.0) * uGloss;
        col += spec;

        // fresnel rim (the "bubbly" wet edge)
        float fres = pow(1.0 - max(dot(N, V), 0.0), uRimPower);
        col = mix(col, uRim, fres * 0.6);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}
