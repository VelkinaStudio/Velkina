import {GoogleGenAI} from '@google/genai';
import {writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const MODEL = 'gemini-3.1-flash-image-preview';
const OUT_DIR = resolve(process.cwd(), 'public/people');
mkdirSync(OUT_DIR, {recursive: true});

const PEOPLE = [
  {
    id: 'selin-polat',
    prompt: 'Professional editorial headshot of a Mediterranean woman in her mid-40s, warm genuine smile, business-casual cream linen blazer, soft natural side window light, neutral warm beige background. Dark wavy shoulder-length hair, dark eyes. Slight 3/4 angle. Photorealistic, magazine portrait quality, shallow depth of field, focus on her eyes. No text, no logos, no jewelry on hands. Square crop.'
  },
  {
    id: 'mehmet-atar',
    prompt: 'Professional editorial headshot of a Turkish man in his early 50s, salt-and-pepper hair neatly combed, trimmed beard, charcoal-grey wool suit with white shirt and minimal dark tie, warm confident half-smile, neutral muted dark background. Soft Rembrandt lighting from upper left. Photorealistic magazine portrait, shallow depth of field, focus on his eyes. Slight 3/4 angle. No text, no logos. Square crop.'
  },
  {
    id: 'bogdan-ionescu',
    prompt: 'Professional editorial headshot of an Eastern European man in his mid-40s, short brown hair, clean-shaven, wearing a navy quarter-zip pullover over a white shirt. Warm friendly expression. Background suggests a clean industrial office space, slightly out of focus. Soft natural daylight from a window. Photorealistic, sharp focus on his eyes, shallow depth of field. Slight 3/4 angle. No text, no logos. Square crop.'
  },
  {
    id: 'aylin-kaya',
    prompt: 'Professional editorial headshot of a Turkish woman in her early 30s, long straight dark hair, warm hazel eyes, wearing an elegant sand-colored knit sweater. Confident soft smile. Background is a warm cream studio with subtle texture. Soft natural light. Photorealistic, magazine quality, shallow depth of field, focus on her eyes. Square crop. No text, no logos.'
  },
  {
    id: 'mert-sezer',
    prompt: 'Professional editorial headshot of a man in his early 40s, modern short hairstyle, trimmed beard, dark frame glasses, wearing a black merino crewneck. Calm thoughtful expression with a slight smile. Background is a clean dark grey studio. Soft directional lighting from the right. Photorealistic, magazine quality, shallow depth of field, focus on his eyes. Square crop. No text, no logos.'
  },
  {
    id: 'elena-popescu',
    prompt: 'Professional editorial headshot of an Eastern European woman in her mid-30s, shoulder-length light brown hair, warm green eyes, wearing a deep burgundy blouse. Confident warm smile. Background is a warm dark studio with subtle dusty pink tone. Soft natural directional light from upper left. Photorealistic, magazine quality, shallow depth of field, focus on her eyes. Square crop. No text, no logos.'
  }
];

async function generateOne(person) {
  const outPath = resolve(OUT_DIR, `${person.id}.jpg`);
  if (existsSync(outPath) && !process.argv.includes('--force')) {
    console.log(`  SKIP ${person.id} (exists)`);
    return {id: person.id, skipped: true};
  }
  console.log(`  GEN  ${person.id}...`);
  const t0 = Date.now();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: person.prompt
  });
  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  const image = parts.find(p => p.inlineData && p.inlineData.mimeType?.startsWith('image/'));
  if (!image) {
    const text = parts.find(p => p.text)?.text || '(no text)';
    console.error(`  FAIL ${person.id}: no image. Text returned: ${text.slice(0, 200)}`);
    return {id: person.id, error: 'no-image', text};
  }
  const buf = Buffer.from(image.inlineData.data, 'base64');
  writeFileSync(outPath, buf);
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`  OK   ${person.id} -> ${outPath} (${(buf.length / 1024).toFixed(0)} KB, ${dt}s)`);
  return {id: person.id, ok: true, bytes: buf.length};
}

(async () => {
  console.log(`Generating ${PEOPLE.length} people photos via ${MODEL}`);
  console.log(`Output: ${OUT_DIR}\n`);
  const results = [];
  for (const p of PEOPLE) {
    try {
      results.push(await generateOne(p));
    } catch (err) {
      console.error(`  FAIL ${p.id}: ${err.message}`);
      results.push({id: p.id, error: err.message});
    }
    // Small delay to be polite to the API
    await new Promise(r => setTimeout(r, 600));
  }
  console.log('\nSummary:');
  for (const r of results) {
    if (r.ok) console.log(`  ✓ ${r.id} (${(r.bytes / 1024).toFixed(0)} KB)`);
    else if (r.skipped) console.log(`  · ${r.id} (skipped)`);
    else console.log(`  ✗ ${r.id} (${r.error})`);
  }
  const failed = results.filter(r => r.error).length;
  process.exit(failed ? 1 : 0);
})();
