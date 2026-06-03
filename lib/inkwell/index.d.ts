import { Effect } from "postprocessing";
import { ColorRepresentation } from "three";

// ── Effects ──────────────────────────────────────────────────────────────

export interface HalftoneOptions {
  scale?: number;
  mode?: "cmyk" | "mono";
  angle?: number;
  color?: ColorRepresentation;
  background?: ColorRepresentation;
  blending?: number;
}
export class HalftoneEffect extends Effect {
  constructor(options?: HalftoneOptions);
  scale: number;
  blend: number;
}

export interface MisregisterOptions {
  strength?: number;
  focus?: [number, number];
  falloff?: number;
  redBlueOnly?: number;
}
export class MisregisterEffect extends Effect {
  constructor(options?: MisregisterOptions);
  strength: number;
}

export interface PosterizeOptions {
  levels?: number;
  gamma?: number;
  blend?: number;
}
export class PosterizeEffect extends Effect {
  constructor(options?: PosterizeOptions);
  levels: number;
}

export interface InkOutlineOptions {
  color?: ColorRepresentation;
  thickness?: number;
  depthEdge?: number;
  lumaEdge?: number;
  threshold?: number;
  jitter?: number;
}
export class InkOutlineEffect extends Effect {
  constructor(options?: InkOutlineOptions);
  thickness: number;
}

export interface ComicOptions {
  levels?: number;
  scale?: number;
  mode?: "cmyk" | "mono";
  dotStrength?: number;
}
export class ComicEffect extends Effect {
  constructor(options?: ComicOptions);
  scale: number;
}

export interface GlossyInkOptions {
  color?: ColorRepresentation;
  shade?: ColorRepresentation;
  rim?: ColorRepresentation;
  bands?: number;
  rimPower?: number;
  gloss?: number;
  lightDir?: [number, number, number];
}
export function createGlossyInkMaterial(options?: GlossyInkOptions): import("three").ShaderMaterial;

// ── on-twos time ─────────────────────────────────────────────────────────

export function steppedTime(t: number, fps?: number): number;
export function steppedFrame(t: number, fps?: number): number;
export function steppedJitter(
  t: number,
  fps?: number,
  seed?: number
): { t: number; frame: number; wobble: number };
export function makeStepper(fps?: number): (elapsed: number) => number;
