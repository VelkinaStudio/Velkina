import {GoogleGenAI} from '@google/genai';
import {writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {resolve} from 'node:path';

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const MODEL = 'gemini-3.1-flash-image-preview';
const OUT_DIR = resolve(process.cwd(), 'public/food');
mkdirSync(OUT_DIR, {recursive: true});

const STYLE = 'Top-down food photography, natural daylight, warm cream linen tablecloth, shallow depth of field, restaurant-magazine quality, photorealistic, no text, no logos, no hands, no cutlery in frame unless specified. Centered composition. Square crop.';

const DISHES = [
  {id: 'burrata',  prompt: `${STYLE} A burrata salad on a rustic terracotta plate: a whole creamy burrata in the center, heirloom tomato slices in red and yellow around it, fresh basil leaves, drizzled with green basil oil, scattered sourdough crumbs.`},
  {id: 'tartare',  prompt: `${STYLE} Beef tartare on a slate plate: a neat round of hand-chopped raw beef tenderloin topped with a smoked egg yolk, surrounded by tiny capers, finely diced shallots, and grilled focaccia toasts on the side.`},
  {id: 'octopus',  prompt: `${STYLE} Charred octopus on a smooth dark ceramic plate: tentacles with grill marks resting on a swirl of white bean purée, drizzled with vivid red paprika oil, a single lemon wedge on the side, microgreen garnish.`},
  {id: 'risotto',  prompt: `${STYLE} Truffle risotto in a wide white shallow bowl: creamy carnaroli rice with grated parmigiano cheese on top, fresh black summer truffle shavings, a few sage leaves, a small piece of melted sage butter.`},
  {id: 'lamb',     prompt: `${STYLE} Two rosemary-crusted lamb chops on a dark warm wooden board: bone-in chops with pink medium-rare interior, charred grilled leeks alongside, baby spinach leaves, glossy rosemary jus pooled around the meat.`},
  {id: 'seabass',  prompt: `${STYLE} Whole roasted sea bass on a long oval plate: golden-brown skin with crisp salt crust partially cracked open, surrounded by fennel slices, soft new potatoes, lemon wedges, drizzled with citrus oil and scattered with capers.`},
  {id: 'mushroom', prompt: `${STYLE} Wild mushroom tagliatelle pasta in a wide pasta bowl: hand-rolled fresh egg tagliatelle entangled with sautéed porcini and chanterelle mushrooms, garlic confit cloves, fresh thyme and parsley, glistening with olive oil.`},
  {id: 'tiramisu', prompt: `${STYLE} A single elegant slice of tiramisu on a white square plate: distinct layers of espresso-soaked savoiardi and creamy mascarpone, dusted with a fine layer of cocoa powder on top, a few coffee beans as garnish.`},
  {id: 'pana',     prompt: `${STYLE} Vanilla panna cotta in a small ceramic ramekin: silky white pudding topped with vibrant red raspberry coulis and a sprinkle of golden almond crumble, a few fresh raspberries on the side.`},
  {id: 'spritz',   prompt: `${STYLE} A tall coupe glass of Aperol spritz at a marble bar surface: glowing orange aperitif with bubbles, a slice of blood orange floating, ice cubes, condensation on the glass. Warm afternoon side light.`},
  {id: 'wine',     prompt: `${STYLE} A single wide-bowled red wine glass on a warm wooden table: filled halfway with deep ruby red wine, side light catching the surface. A blurred linen-bound wine list behind, out of focus.`},
  {id: 'water',    prompt: `${STYLE} A green glass bottle of sparkling mineral water on a marble surface, an empty highball glass beside it with a single lime wedge, condensation droplets on the bottle, soft daylight.`}
];

async function generateOne(d) {
  const outPath = resolve(OUT_DIR, `${d.id}.jpg`);
  if (existsSync(outPath) && !process.argv.includes('--force')) {
    console.log(`  SKIP ${d.id}`);
    return {id: d.id, skipped: true};
  }
  console.log(`  GEN  ${d.id}...`);
  const t0 = Date.now();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: d.prompt
  });
  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  const image = parts.find(p => p.inlineData && p.inlineData.mimeType?.startsWith('image/'));
  if (!image) {
    const text = parts.find(p => p.text)?.text || '(no text)';
    console.error(`  FAIL ${d.id}: ${text.slice(0, 200)}`);
    return {id: d.id, error: 'no-image'};
  }
  const buf = Buffer.from(image.inlineData.data, 'base64');
  writeFileSync(outPath, buf);
  console.log(`  OK   ${d.id} (${(buf.length / 1024).toFixed(0)} KB, ${((Date.now() - t0) / 1000).toFixed(1)}s)`);
  return {id: d.id, ok: true, bytes: buf.length};
}

(async () => {
  console.log(`Generating ${DISHES.length} food photos via ${MODEL}\nOutput: ${OUT_DIR}\n`);
  const results = [];
  for (const d of DISHES) {
    try {
      results.push(await generateOne(d));
    } catch (err) {
      console.error(`  FAIL ${d.id}: ${err.message}`);
      results.push({id: d.id, error: err.message});
    }
    await new Promise(r => setTimeout(r, 500));
  }
  const failed = results.filter(r => r.error).length;
  console.log(`\nDone. Generated: ${results.filter(r => r.ok).length} · Skipped: ${results.filter(r => r.skipped).length} · Failed: ${failed}`);
  process.exit(failed ? 1 : 0);
})();
