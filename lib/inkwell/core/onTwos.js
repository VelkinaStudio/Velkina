/**
 * on-twos — stepped/quantised time, the way 2D animation "holds" frames.
 *
 * Hand-drawn animation is often shot "on twos" (a new drawing every 2nd frame
 * ≈ 12fps) for characters, while camera moves stay smooth (on ones, 60fps).
 * Spider-Verse made this a signature: characters step, the world flows. No
 * published web library exposes this as a primitive — so here it is.
 *
 * These are framework-agnostic pure functions plus a tiny R3F hook. Drive your
 * CHARACTER/object animation from `steppedTime`, and your camera/particles from
 * raw elapsed time. The contrast is the whole effect.
 */

/**
 * Quantise a continuous time value to a frame grid.
 * @param {number} t    Elapsed seconds (continuous).
 * @param {number} fps  Target hold rate (12 = "on twos" @24, 8 = "on threes").
 * @returns {number} The held time — constant within each 1/fps window.
 */
export function steppedTime(t, fps = 12) {
  return Math.floor(t * fps) / fps;
}

/**
 * Like steppedTime but returns the integer frame index — handy for swapping
 * sprite frames or pose indices.
 * @param {number} t
 * @param {number} fps
 * @returns {number}
 */
export function steppedFrame(t, fps = 12) {
  return Math.floor(t * fps);
}

/**
 * A jittered step: holds on the frame grid but adds a tiny, deterministic
 * positional wobble per held frame, mimicking the "boiling" of hand-inked
 * lines. Returns { t, wobble } where wobble ∈ [-1,1].
 * @param {number} t
 * @param {number} fps
 * @param {number} [seed=0]
 */
export function steppedJitter(t, fps = 12, seed = 0) {
  const frame = Math.floor(t * fps);
  // cheap deterministic hash → wobble per frame
  const h = Math.sin((frame + seed) * 12.9898) * 43758.5453;
  const wobble = (h - Math.floor(h)) * 2 - 1;
  return { t: frame / fps, frame, wobble };
}

/**
 * R3F hook: returns a getter for stepped time, recomputed each frame.
 * Usage:
 *   const getStep = useOnTwos(12)
 *   useFrame(() => { mesh.rotation.y = getStep() * 0.5 })  // steps
 *   useFrame((s) => { cam.position.x = Math.sin(s.clock.elapsedTime) }) // smooth
 *
 * Implemented without importing R3F so the package has zero hard runtime deps;
 * pass the clock's elapsedTime in if you prefer the pure function above.
 * @param {number} [fps=12]
 * @returns {(elapsed:number)=>number}
 */
export function makeStepper(fps = 12) {
  return (elapsed) => steppedTime(elapsed, fps);
}
