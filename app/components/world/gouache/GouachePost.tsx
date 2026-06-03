"use client";

import { forwardRef, useMemo } from "react";
import { Effect, EffectAttribute } from "postprocessing";
import * as THREE from "three";

// GOUACHE fullscreen finish — ONE merged pass (perf): ink edges (Sobel on depth)
// + a light gouache settle (small Kuwahara-ish softening) + riso paper grain +
// 2-plate chromatic misregistration. Reads depth (EffectAttribute.DEPTH).
// Kept to one pass so the rich look costs one fullscreen draw, not five.

const frag = /* glsl */ `
uniform float uInk;
uniform float uInkThresh;
uniform float uChroma;
uniform float uGrain;
uniform float uTime;
uniform vec3  uPaper;

// hash + value noise for paper grain (anchored to screen, slow drift)
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p),f=fract(p); float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }

float lin(float z){ return z; } // depth already linearish via readDepth

void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {
  vec2 texel = 1.0 / resolution.xy;

  // ---- ink edges: Sobel on LINEAR view-Z, two radii (thick wobbly contour) ----
  float ink = 0.0;
  float tt = floor(uTime * 12.0) / 12.0;
  for (int k = 0; k < 2; k++) {
    float w = (k == 0) ? 1.0 : 2.4; // inner + outer ring = a thicker, soft line
    float zc = getViewZ(readDepth(uv));
    float zl = getViewZ(readDepth(uv + vec2(-texel.x * w, 0.0)));
    float zr = getViewZ(readDepth(uv + vec2( texel.x * w, 0.0)));
    float zt = getViewZ(readDepth(uv + vec2(0.0,  texel.y * w)));
    float zb = getViewZ(readDepth(uv + vec2(0.0, -texel.y * w)));
    float grad = abs(zl - zr) + abs(zt - zb);
    float edge = grad / (abs(zc) * 0.5 + 1.0);
    float wob = (vnoise(uv * resolution.xy * 0.5 + tt * 9.0 + float(k)) - 0.5) * 0.5;
    ink = max(ink, smoothstep(uInkThresh * 0.5, uInkThresh * (1.2 + wob), edge));
  }
  ink *= uInk;

  // ---- base color (a tiny gouache settle, light so screentone survives) ----
  vec3 col = inputColor.rgb;
  vec3 s1 = texture2D(inputBuffer, uv + texel*vec2(1.0,1.0)).rgb;
  vec3 s2 = texture2D(inputBuffer, uv + texel*vec2(-1.0,1.0)).rgb;
  vec3 s3 = texture2D(inputBuffer, uv + texel*vec2(1.0,-1.0)).rgb;
  vec3 s4 = texture2D(inputBuffer, uv + texel*vec2(-1.0,-1.0)).rgb;
  vec3 soft = (col*3.0 + s1 + s2 + s3 + s4) / 7.0;
  col = mix(col, soft, 0.3);

  // ---- 2-plate chromatic misregistration (riso, X only) ----
  if (uChroma > 0.0) {
    float r = texture2D(inputBuffer, uv + vec2(uChroma, 0.0)).r;
    float b = texture2D(inputBuffer, uv - vec2(uChroma, 0.0)).b;
    col.r = mix(col.r, r, 0.6);
    col.b = mix(col.b, b, 0.6);
  }

  // ---- apply ink (dark plum contour, not pure black — gouache) ----
  vec3 inkColor = vec3(0.16, 0.13, 0.18);
  col = mix(col, inkColor, ink);

  // ---- paper grain granulation (anchored, slow drift) ----
  float g = vnoise(uv * resolution.xy * 0.5 + vec2(uTime*2.0, 0.0));
  col = mix(col, col * mix(0.85, 1.05, g), uGrain);
  col = mix(col, uPaper, (1.0 - g) * uGrain * 0.06); // pigment settles toward paper in valleys

  outputColor = vec4(col, inputColor.a);
}
`;

class GouacheEffectImpl extends Effect {
  constructor() {
    super("GouacheEffect", frag, {
      attributes: EffectAttribute.DEPTH,
      uniforms: new Map<string, THREE.Uniform>([
        ["uInk", new THREE.Uniform(1.0)],
        ["uInkThresh", new THREE.Uniform(0.025)],
        ["uChroma", new THREE.Uniform(0.0012)],
        ["uGrain", new THREE.Uniform(0.5)],
        ["uTime", new THREE.Uniform(0)],
        ["uPaper", new THREE.Uniform(new THREE.Color("#f6ecdf"))],
      ]),
    });
  }
  update(_r: any, _i: any, dt: number) {
    const u = (this as any).uniforms.get("uTime");
    if (u) u.value += dt;
  }
}

export const GouacheEffect = forwardRef<GouacheEffectImpl>((_props, ref) => {
  const effect = useMemo(() => new GouacheEffectImpl(), []);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
GouacheEffect.displayName = "GouacheEffect";
