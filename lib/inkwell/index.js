/**
 * @velkina/inkwell — a hand-painted, comic-illustrated render toolkit for the web.
 *
 * Make 3D look like ART, not a render. Halftone dots, comic-print mis-
 * registration, ink outlines, posterised toon bands, and stepped "on-twos"
 * time — the techniques that make Spider-Verse / Arcane look hand-drawn,
 * packaged for three.js + React Three Fiber.
 *
 * Two entry points:
 *   import { HalftoneEffect, ... } from '@velkina/inkwell'          // vanilla three
 *   import { Comic, Halftone, ... } from '@velkina/inkwell/react'   // R3F JSX
 */

export { HalftoneEffect } from "./effects/HalftoneEffect.js";
export { MisregisterEffect } from "./effects/MisregisterEffect.js";
export { PosterizeEffect } from "./effects/PosterizeEffect.js";
export { InkOutlineEffect } from "./effects/InkOutlineEffect.js";
export { ComicEffect } from "./effects/ComicEffect.js";

export { steppedTime, steppedFrame, steppedJitter, makeStepper } from "./core/onTwos.js";

export { createGlossyInkMaterial } from "./materials/GlossyInkMaterial.js";
