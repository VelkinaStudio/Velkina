// Physics feel parameters — the single source of truth for the toy.
// Derived from the design canon. To tune the "float vs juice" feel, change
// CARD.frictionAir FIRST, then restitution. Heavier cards = more pride.

export const CARD = {
  // heavy & deliberate so cards thud and settle and copy stays readable
  density: 0.004,
  friction: 0.2,
  frictionAir: 0.012, // tune this first; band 0.008–0.015. Never below ~0.005.
  restitution: 0.45,
  chamfer: 14, // rounded corners on the body
};

// Flagship cards multiply their base density so the proudest work literally
// resists the throw (weight = pride). Combined with per-project `mass`.
export const FLAGSHIP_DENSITY_MULT = 1.9;

export const WALL = {
  restitution: 0.3,
  friction: 0.3,
  thickness: 200, // thick off-screen walls so fast throws can't tunnel out
};

export const MOUSE = {
  // tight, glued-to-cursor drag; release throws with accumulated velocity (free)
  stiffness: 0.9,
  damping: 0.15,
};

export const ENGINE = {
  gravityY: 1, // standard downward pull
  fixedDelta: 1000 / 60, // stable throw feel
  fixedDeltaSlow: 1000 / 30, // weak-device fallback
  enableSleeping: true, // settled cards stop burning CPU
};

export const RENDER = {
  // DPR cap — the single biggest silent fps killer if uncapped on mobile
  maxPixelRatio: 2,
  background: "transparent",
};

// staggered "drop" entrance: ms between each card entering the world
export const DROP_STAGGER_MS = 110;
