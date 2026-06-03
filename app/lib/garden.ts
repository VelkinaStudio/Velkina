// The garden path — ordered waypoints with composed camera shots. Scroll is the
// playhead; the camera dollies along these, settling into each composed frame.
// Each waypoint encodes the art-directed angle (the camera IS the art direction):
// elevation + fov + framing change per area to tell you you've entered a new zone.

export interface Waypoint {
  id: string;
  label: { en: string; tr: string };
  /** camera position */
  cam: [number, number, number];
  /** look-at target */
  look: [number, number, number];
  /** field of view for this shot */
  fov: number;
  /** the studio content this beat carries */
  carries?: string;
  /** project id if this beat opens a project */
  project?: string;
}

// Garden laid out along +X as you scroll, winding in Z. Golden-hour terrace.
export const GARDEN: Waypoint[] = [
  {
    id: "gate",
    label: { en: "Welcome", tr: "Hoş geldin" },
    cam: [-7.5, 0.6, 4.2], look: [-6.2, 1.4, 0.5], fov: 52, // low hero up-tilt
  },
  {
    id: "shed",
    label: { en: "What we make", tr: "Ne yapıyoruz" },
    cam: [-3.6, 1.5, 3.6], look: [-4.2, 1.2, -0.8], fov: 40, // eye-level documentary
  },
  {
    id: "patch",
    label: { en: "Runs itself", tr: "Kendi çalışır" },
    cam: [0.0, 4.6, 2.4], look: [0.0, 0.2, -1.2], fov: 36, // HIGH top-down triptych
    carries: "the self-tending products",
  },
  {
    id: "rulesell", label: { en: "RuleSell", tr: "RuleSell" },
    cam: [-1.4, 4.0, 1.4], look: [-1.4, 0.2, -1.0], fov: 34, project: "rulesell",
  },
  {
    id: "megvax", label: { en: "MegVax", tr: "MegVax" },
    cam: [0.0, 4.0, 1.4], look: [0.0, 0.2, -1.0], fov: 34, project: "megvax",
  },
  {
    id: "bcb", label: { en: "BCB", tr: "BCB" },
    cam: [1.4, 4.0, 1.4], look: [1.4, 0.2, -1.0], fov: 34, project: "bcb",
  },
  {
    id: "greenhouse",
    label: { en: "Raised by hand", tr: "Elle yetiştirildi" },
    cam: [4.0, 1.3, 3.4], look: [5.4, 1.2, -0.6], fov: 32, // push through glass, compressed
    carries: "the client work",
  },
  {
    id: "lavinia", label: { en: "Lavinia", tr: "Lavinia" },
    cam: [4.8, 1.4, 1.2], look: [5.4, 1.2, -0.6], fov: 30, project: "lavinia",
  },
  {
    id: "ataravci", label: { en: "Atar Avcı", tr: "Atar Avcı" },
    cam: [5.4, 1.4, 1.2], look: [5.8, 1.2, -0.6], fov: 30, project: "ataravci",
  },
  {
    id: "tp", label: { en: "TP Thermoplast", tr: "TP Thermoplast" },
    cam: [6.0, 1.4, 1.2], look: [6.4, 1.2, -0.6], fov: 30, project: "tp",
  },
  {
    id: "benches",
    label: { en: "The two of us", tr: "Biz iki kişiyiz" },
    cam: [8.4, 1.8, 3.0], look: [9.2, 1.0, -0.4], fov: 45, // dutch-tilt over a leaf two-shot
    carries: "Ömer & Baha",
  },
  {
    id: "fountain",
    label: { en: "Say hi", tr: "Merhaba de" },
    cam: [11.5, 0.6, 3.6], look: [12.6, 1.2, -0.6], fov: 55, // low wide exhale to skyline
    carries: "contact",
  },
];

// the project beats (top-down patch + greenhouse) that open a detail on arrival
export const GARDEN_PROJECTS = ["rulesell", "megvax", "bcb", "lavinia", "ataravci", "tp"];

// a tiny dutch tilt (radians) for the benches beat — camera roll for art direction
export const TILT: Record<string, number> = { benches: 0.09, patch: 0, greenhouse: 0.02 };
