// Generate per-brief social share images (1200x630) by screenshotting each
// brief's OG layout. Requires Playwright + a running preview server.
//
//   npm run build && npm run preview -- --port 4173 &
//   PREVIEW_URL=http://localhost:4173/aiffected node scripts/gen-og.mjs
//
// PNGs are written to public/og/<slug>.png and committed (Vercel's build can't
// run a browser, so they ship as static assets).
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { BRIEFS } from '../src/briefs.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '..', 'public', 'og');
mkdirSync(outDir, { recursive: true });

const ORIGIN = (process.env.PREVIEW_URL || 'http://localhost:4173/aiffected').replace(/\/$/, '');
const exe = process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium';

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
for (const b of BRIEFS) {
  await page.goto(`${ORIGIN}/b/${b.slug}/?og=1`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: resolve(outDir, `${b.slug}.png`), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`og: ${b.slug}.png`);
}
await browser.close();
