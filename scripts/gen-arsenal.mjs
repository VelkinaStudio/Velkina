// Generate the "arsenal" — one iconic weapon/character-card visual per project,
// in one cohesive art direction. Gemini image model. Output → public/arsenal/.
import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync } from "node:fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const OUT = "public/arsenal";
mkdirSync(OUT, { recursive: true });

// Shared art direction so all six read as one set (a game roster).
const STYLE =
  "Flat vector illustration, bold clean shapes, thick confident outlines, " +
  "limited warm palette: warm off-white #FAF7F2 background, near-black ink #14110F, " +
  "one coral accent #FF5436, a touch of warm yellow #FFD23F. Centered single hero " +
  "object, lots of negative space, subtle grain. Premium editorial poster feel, " +
  "NOT 3D, NOT photoreal, NO text, NO letters, NO words anywhere in the image. " +
  "Square composition, iconic and instantly readable as a game character/weapon select tile.";

const SUBJECTS = {
  rulesell:
    "a glowing marketplace stall / exchange counter rendered as a sleek game item — " +
    "stacked config cartridges or chips changing hands, a small star marking it as the flagship",
  megvax:
    "an automation engine / control gauge as a weapon — a dial-and-targeting reticle watching " +
    "campaign signals, arrows pulsing, a sense of speed and reaction",
  bcb:
    "a storefront / shopping cart reimagined as a clean mechanical tool — a shop module with a " +
    "gear, conveyor of product boxes, e-commerce energy",
  lavinia:
    "a QR menu tile as an artifact — a stylized menu card with a glowing QR sigil and a small fork/spoon, " +
    "multilingual sparkle, restaurant warmth",
  ataravci:
    "a law/justice emblem as a shield-weapon — balanced scales fused with a fast website/cloud arrow, " +
    "credibility and speed",
  "tp-thermoplast":
    "an industrial export device — a data-pipeline conduit feeding a clean catalog, pipes and packets, " +
    "B2B precision",
};

async function gen(id, subject) {
  const prompt = `${subject}. ${STYLE}`;
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });
  const parts = res.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) {
    console.error(`✗ ${id}: no image returned`, JSON.stringify(parts).slice(0, 200));
    return false;
  }
  writeFileSync(`${OUT}/${id}.png`, Buffer.from(img.inlineData.data, "base64"));
  console.log(`✓ ${id}.png`);
  return true;
}

for (const [id, subject] of Object.entries(SUBJECTS)) {
  try {
    await gen(id, subject);
  } catch (e) {
    console.error(`✗ ${id}:`, e.message);
  }
}
console.log("done");
