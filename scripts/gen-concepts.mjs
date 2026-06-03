// Generate a hero mockup image for each of the 5 bold portfolio concepts.
import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const OUT = "docs/concepts";
mkdirSync(OUT, { recursive: true });

const concepts = JSON.parse(readFileSync(process.env.HOME ? process.env.HOME + "/.claude/tmp/concepts.json" : "C:/Users/nalba/.claude/tmp/concepts.json", "utf8"));

const RATIO = " The image is a wide 16:9 desktop website hero screenshot, landscape orientation, full-bleed, no browser chrome, no mockup frame.";

for (let i = 0; i < concepts.length; i++) {
  const c = concepts[i];
  const slug = String(i + 1) + "-" + c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const prompt = c.imagePrompt + RATIO;
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
    });
    const parts = res.candidates?.[0]?.content?.parts || [];
    const img = parts.find((p) => p.inlineData?.data);
    if (!img) { console.error("✗ " + slug + ": no image"); continue; }
    writeFileSync(`${OUT}/${slug}.png`, Buffer.from(img.inlineData.data, "base64"));
    console.log("✓ " + slug + ".png");
  } catch (e) {
    console.error("✗ " + slug + ":", e.message);
  }
}
console.log("done");
