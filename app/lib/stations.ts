// The guided tour: named camera waypoints. Each station has a camera position +
// a lookAt target. Clicking a station (pill or object) flies the camera there.
// Hand-authored so the camera always frames the subject — the StoryPoint model.
// Object positions live here too so placeholders, real meshes, and pills agree.

export interface Station {
  id: string;
  /** camera position */
  cam: [number, number, number];
  /** lookAt target (usually the object) */
  look: [number, number, number];
  /** where the object sits in the room (for placeholder + hit-test) */
  obj: [number, number, number];
  /** pill label key path into copy, or a literal */
  pill: string;
}

// Room is roughly 8 wide x 4 tall x 6 deep, origin at floor center.
export const STATIONS: Station[] = [
  { id: "home",     cam: [0, 2.6, 8.2],   look: [0, 0.6, 0],     obj: [0, 1.1, 0],     pill: "Home" },
  { id: "whatwedo", cam: [-1.6, 2.3, 3.2], look: [-2.1, 1.7, -2.6], obj: [-2.1, 1.7, -2.9], pill: "What we make" },
  { id: "rulesell", cam: [2.2, 1.8, 2.2],  look: [2.6, 1.5, -2.4],  obj: [2.6, 1.5, -2.7],  pill: "RuleSell" },
  { id: "megvax",   cam: [2.6, 1.5, 2.0],  look: [3.0, 1.0, -2.4],  obj: [3.0, 1.0, -2.7],  pill: "MegVax" },
  { id: "bcb",      cam: [3.0, 1.4, 1.9],  look: [3.4, 0.6, -2.4],  obj: [3.4, 0.6, -2.7],  pill: "BCB" },
  { id: "lavinia",  cam: [1.8, 1.2, 2.2],  look: [2.2, 0.55, -2.3], obj: [2.2, 0.55, -2.6], pill: "Lavinia" },
  { id: "ataravci", cam: [1.4, 1.2, 2.2],  look: [1.8, 0.55, -2.3], obj: [1.8, 0.55, -2.6], pill: "Atar Avcı" },
  { id: "tp",       cam: [1.0, 1.2, 2.2],  look: [1.4, 0.55, -2.3], obj: [1.4, 0.55, -2.6], pill: "TP Thermoplast" },
  { id: "omer",     cam: [-2.6, 1.6, 1.2], look: [-2.4, 0.5, -1.0], obj: [-2.4, 0.55, -1.2], pill: "Ömer" },
  { id: "baha",     cam: [2.6, 1.6, 1.2],  look: [2.4, 0.5, -1.0],  obj: [2.4, 0.55, -1.2],  pill: "Baha" },
  { id: "contact",  cam: [-1.6, 1.8, 2.6], look: [-2.8, 1.4, -1.8], obj: [-3.0, 1.4, -2.0],  pill: "Say hi" },
];

// project ids that open the work detail when their station object is tapped
export const PROJECT_STATIONS = ["rulesell", "megvax", "bcb", "lavinia", "ataravci", "tp"];
