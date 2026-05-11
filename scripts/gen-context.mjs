import {GoogleGenAI} from '@google/genai';
import {writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {resolve} from 'node:path';

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const MODEL = 'gemini-3.1-flash-image-preview';
const OUT_DIR = resolve(process.cwd(), 'public/context');
mkdirSync(OUT_DIR, {recursive: true});

const SHOTS = [
  {id: 'lavinia-interior',    prompt: 'Editorial interior photograph of a small Mediterranean bistro at golden hour: warm cream walls, wooden bistro tables with linen napkins, woven rattan chairs, a single fresh flower vase on each table, soft window light, slightly out-of-focus pedestrians walking past the window. Photorealistic, magazine-quality, cinematic warm tones, no text, no people in frame. 16:9 landscape.'},
  {id: 'anatolia-hotel',      prompt: 'Editorial interior photograph of a boutique hotel lobby in Istanbul, terracotta tones with deep navy accents, vintage Persian rug, leather lounge chairs around a marble coffee table, brass reading lamp, large arched window overlooking the Bosphorus at dusk in the background slightly blurred. Photorealistic, magazine-quality, warm cinematic light, no text, no people. 16:9 landscape.'},
  {id: 'tp-factory',          prompt: 'Editorial industrial photograph of a clean modern plastics manufacturing facility: stainless steel injection-molding machines, neutral grey concrete floor with subtle gloss, controlled overhead lighting, neat bins of natural translucent plastic pellets in the foreground out of focus. Photorealistic, magazine-quality, no people, no text, no logos. 16:9 landscape.'},
  {id: 'drsevim-clinic',      prompt: 'Editorial interior photograph of an upscale aesthetic clinic treatment room: warm cream walls, single white treatment chair with light beige linen draped over, a small olive wood side table with rolled hand towels, a curved arch window letting in soft natural daylight, minimal abstract art on the wall. Photorealistic, magazine-quality, warm tones, calm, no people, no text. 16:9 landscape.'},
  {id: 'clown3d-studio',      prompt: 'Editorial photograph of a creative 3D design studio workspace: large dark wood desk with two large color-calibrated monitors showing abstract gradient 3D renders, a Wacom tablet, a small ceramic plant pot with monstera leaves, a coffee cup, exposed brick wall in background slightly out of focus, warm task-light. Photorealistic, no people, no text on screens, no logos. 16:9 landscape.'},
  {id: 'novahealth-office',   prompt: 'Editorial interior photograph of a healthcare technology company office: large open workspace, blonde wood desks, soft sage-green accent wall, an oversized whiteboard with non-readable abstract diagrams blurred slightly, plants, large floor-to-ceiling window with warm late-afternoon sun streaming in. No people in frame, photorealistic, magazine-quality, no text or logos. 16:9 landscape.'}
];

async function generateOne(s) {
  const outPath = resolve(OUT_DIR, `${s.id}.jpg`);
  if (existsSync(outPath) && !process.argv.includes('--force')) {
    console.log(`  SKIP ${s.id}`);
    return {id: s.id, skipped: true};
  }
  console.log(`  GEN  ${s.id}...`);
  const t0 = Date.now();
  const response = await ai.models.generateContent({model: MODEL, contents: s.prompt});
  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  const image = parts.find(p => p.inlineData && p.inlineData.mimeType?.startsWith('image/'));
  if (!image) {
    const text = parts.find(p => p.text)?.text || '(none)';
    console.error(`  FAIL ${s.id}: ${text.slice(0, 200)}`);
    return {id: s.id, error: 'no-image'};
  }
  const buf = Buffer.from(image.inlineData.data, 'base64');
  writeFileSync(outPath, buf);
  console.log(`  OK   ${s.id} (${(buf.length / 1024).toFixed(0)} KB, ${((Date.now() - t0) / 1000).toFixed(1)}s)`);
  return {id: s.id, ok: true};
}

(async () => {
  console.log(`Generating ${SHOTS.length} context photos\n`);
  for (const s of SHOTS) {
    try { await generateOne(s); }
    catch (err) { console.error(`  FAIL ${s.id}: ${err.message}`); }
    await new Promise(r => setTimeout(r, 500));
  }
})();
