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
uniform float uKuwahara;
uniform float uKuwaRadius;
uniform vec3  uPaper;

// hash + value noise for paper grain (anchored to screen, slow drift)
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p),f=fract(p); float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }

// Kuwahara (4-quadrant min-variance) — flattens fills into brushed gouache
// patches that follow form. radius capped small (perf). The painterly move.
vec3 kuwahara(vec2 uv, vec2 texel, float radius) {
  vec3 mean[4]; float var[4];
  for (int q = 0; q < 4; q++) { mean[q] = vec3(0.0); var[q] = 0.0; }
  vec3 sum[4]; vec3 sum2[4]; float cnt[4];
  for (int q = 0; q < 4; q++) { sum[q]=vec3(0.0); sum2[q]=vec3(0.0); cnt[q]=0.0; }
  int R = int(radius);
  for (int y = -4; y <= 4; y++) {
    for (int x = -4; x <= 4; x++) {
      if (x < -R || x > R || y < -R || y > R) continue;
      vec3 c = texture2D(inputBuffer, uv + vec2(float(x), float(y)) * texel).rgb;
      // assign to quadrant(s)
      int qi = (x <= 0 && y <= 0) ? 0 : (x >= 0 && y <= 0) ? 1 : (x <= 0 && y >= 0) ? 2 : 3;
      sum[qi] += c; sum2[qi] += c*c; cnt[qi] += 1.0;
    }
  }
  float bestVar = 1e9; vec3 outc = texture2D(inputBuffer, uv).rgb;
  for (int q = 0; q < 4; q++) {
    if (cnt[q] < 1.0) continue;
    vec3 m = sum[q] / cnt[q];
    vec3 v = sum2[q] / cnt[q] - m*m;
    float vv = v.r + v.g + v.b;
    if (vv < bestVar) { bestVar = vv; outc = m; }
  }
  return outc;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {
  vec2 texel = 1.0 / resolution.xy;

  // ---- BOLD ink contour (Borderlands): Sobel on LINEAR view-Z, 3 widening radii ----
  float ink = 0.0;
  float tt = floor(uTime * 12.0) / 12.0;
  float zc = getViewZ(readDepth(uv));
  for (int k = 0; k < 3; k++) {
    float w = 1.0 + float(k) * 1.6; // 1.0, 2.6, 4.2 texels = a thick confident line
    float zl = getViewZ(readDepth(uv + vec2(-texel.x * w, 0.0)));
    float zr = getViewZ(readDepth(uv + vec2( texel.x * w, 0.0)));
    float zt = getViewZ(readDepth(uv + vec2(0.0,  texel.y * w)));
    float zb = getViewZ(readDepth(uv + vec2(0.0, -texel.y * w)));
    float grad = abs(zl - zr) + abs(zt - zb);
    float edge = grad / (abs(zc) * 0.5 + 1.0);
    float wob = (vnoise(uv * resolution.xy * 0.5 + tt * 9.0 + float(k)) - 0.5) * 0.4;
    ink = max(ink, smoothstep(uInkThresh * 0.4, uInkThresh * (1.0 + wob), edge));
  }
  ink *= uInk;

  // ---- gouache brush settle: Kuwahara flattens fills into painted patches ----
  vec3 col = inputColor.rgb;
  if (uKuwahara > 0.5) {
    vec3 brushed = kuwahara(uv, texel, uKuwaRadius);
    col = mix(col, brushed, 0.8);
  }

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
        ["uInkThresh", new THREE.Uniform(0.018)],
        ["uKuwahara", new THREE.Uniform(0.0)],
        ["uKuwaRadius", new THREE.Uniform(2.0)],
        ["uChroma", new THREE.Uniform(0.0008)],
        ["uGrain", new THREE.Uniform(0.35)],
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
