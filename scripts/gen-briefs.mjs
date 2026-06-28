// Generate one static HTML file per brief, with social-card meta baked in so
// scrapers (which don't run JS) see the right title/description/image.
// Run: npm run briefs   (also runs automatically before build)
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { BRIEFS } from '../src/briefs.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Set SITE_URL to your production origin so og:image/og:url are absolute.
const SITE = (process.env.SITE_URL || 'https://aiffected.vercel.app').replace(/\/$/, '');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const tpl = (b) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(b.ogTitle)} — aiffected</title>
    <meta name="description" content="${esc(b.ogDesc)}" />
    <link rel="canonical" href="${SITE}/b/${b.slug}/" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="aiffected" />
    <meta property="og:title" content="${esc(b.ogTitle)}" />
    <meta property="og:description" content="${esc(b.ogDesc)}" />
    <meta property="og:url" content="${SITE}/b/${b.slug}/" />
    <meta property="og:image" content="${SITE}/og/${b.slug}.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(b.ogTitle)}" />
    <meta name="twitter:description" content="${esc(b.ogDesc)}" />
    <meta name="twitter:image" content="${SITE}/og/${b.slug}.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script>window.__BRIEF_SLUG__ = ${JSON.stringify(b.slug)};</script>
    <script type="module" src="/src/brief.jsx"></script>
  </body>
</html>
`;

for (const b of BRIEFS) {
  const dir = resolve(root, 'b', b.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), tpl(b));
}
console.log(`generated ${BRIEFS.length} brief pages (SITE_URL=${SITE})`);
