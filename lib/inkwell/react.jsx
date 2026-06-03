import { forwardRef, useMemo, useLayoutEffect } from "react";
import { HalftoneEffect } from "./effects/HalftoneEffect.js";
import { MisregisterEffect } from "./effects/MisregisterEffect.js";
import { PosterizeEffect } from "./effects/PosterizeEffect.js";
import { InkOutlineEffect } from "./effects/InkOutlineEffect.js";
import { ComicEffect } from "./effects/ComicEffect.js";

/**
 * React (R3F + @react-three/postprocessing) wrappers. Each returns a primitive
 * so it slots into <EffectComposer> like any other effect:
 *
 *   <EffectComposer>
 *     <Comic />            // the full preset (recommended)
 *     // — or compose your own —
 *     <Posterize levels={5} />
 *     <Halftone scale={1.4} mode="cmyk" />
 *     <InkOutline thickness={1} />
 *     <Misregister strength={1.6} />
 *   </EffectComposer>
 */

function useEffect_(Ctor, options, deps) {
  const effect = useMemo(() => new Ctor(options), deps); // eslint-disable-line
  useLayoutEffect(() => () => effect.dispose?.(), [effect]);
  return effect;
}

export const Halftone = forwardRef(function Halftone(props, ref) {
  const effect = useEffect_(HalftoneEffect, props, [props.scale, props.mode, props.blending]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});

export const Misregister = forwardRef(function Misregister(props, ref) {
  const effect = useEffect_(MisregisterEffect, props, [props.strength, props.falloff]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});

export const Posterize = forwardRef(function Posterize(props, ref) {
  const effect = useEffect_(PosterizeEffect, props, [props.levels, props.gamma]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});

export const InkOutline = forwardRef(function InkOutline(props, ref) {
  const effect = useEffect_(InkOutlineEffect, props, [props.thickness, props.threshold]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});

/**
 * <Comic> — the full hand-painted preset as ONE combined effect (posterize →
 * halftone in a single fragment pass: faster, and avoids pass-merge subtleties).
 * Add <InkOutline/> and/or <Misregister/> alongside it for outlines + mis-print.
 *
 * @param {object} props
 * @param {number} [props.levels=5]      Posterize bands.
 * @param {number} [props.scale=1.4]     Halftone dot size.
 * @param {'cmyk'|'mono'} [props.mode='cmyk']
 * @param {number} [props.dotStrength=0.9]
 */
export const Comic = forwardRef(function Comic(props, ref) {
  const effect = useEffect_(ComicEffect, props, [props.levels, props.scale, props.mode, props.dotStrength]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
