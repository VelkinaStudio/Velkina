// Convert a TTF to three.js typeface.json via opentype.js.
// Canonical facetype conversion: scale everything to a 1000-unit em, flip Y.
// Usage: node scripts/ttf2typeface.mjs <in.ttf> <out.json>
import opentype from "opentype.js";
import { readFileSync, writeFileSync } from "node:fs";

const [inPath, outPath] = process.argv.slice(2);
if (!inPath || !outPath) { console.error("usage: ttf2typeface.mjs in.ttf out.json"); process.exit(1); }

const buf = readFileSync(inPath);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const RES = 1000;
const upm = font.unitsPerEm || 1000;
const s = RES / upm;             // scale font units -> 1000 em
const r = (n) => Math.round(n * s * 100) / 100;

const result = {
  glyphs: {},
  familyName: (font.names.fontFamily && font.names.fontFamily.en) || "Font",
  ascender: r(font.ascender),
  descender: r(font.descender),
  underlinePosition: -100,
  underlineThickness: 50,
  boundingBox: {
    yMin: r(font.tables.head.yMin), xMin: r(font.tables.head.xMin),
    yMax: r(font.tables.head.yMax), xMax: r(font.tables.head.xMax),
  },
  resolution: RES,
  original_font_information: font.tables.name,
};

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?&'-—:/()".split("");
for (const ch of chars) {
  const g = font.charToGlyph(ch);
  if (!g) continue;
  // getPath in FONT UNITS (size = unitsPerEm, origin 0,0), then we scale to 1000.
  const p = g.getPath(0, 0, upm);
  let o = "";
  for (const c of p.commands) {
    // three.js facetype: q <cpx cpy> <x y>  (control first, end last);
    //                     b <cp1x cp1y> <cp2x cp2y> <x y>
    if (c.type === "M") o += `m ${r(c.x)} ${r(-c.y)} `;
    else if (c.type === "L") o += `l ${r(c.x)} ${r(-c.y)} `;
    else if (c.type === "Q") o += `q ${r(c.x1)} ${r(-c.y1)} ${r(c.x)} ${r(-c.y)} `;
    else if (c.type === "C") o += `b ${r(c.x1)} ${r(-c.y1)} ${r(c.x2)} ${r(-c.y2)} ${r(c.x)} ${r(-c.y)} `;
    else if (c.type === "Z") o += "z ";
  }
  result.glyphs[ch] = { ha: r(g.advanceWidth), x_min: r(g.xMin || 0), x_max: r(g.xMax || g.advanceWidth), o: o.trim() };
}

writeFileSync(outPath, JSON.stringify(result));
console.log("wrote", outPath, "| glyphs:", Object.keys(result.glyphs).length, "| em:", upm, "-> 1000");
