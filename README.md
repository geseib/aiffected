# aiffected

An interactive editorial explainer about how Generative AI could remake the
economy — grow GDP by **10–20%** while unemployment climbs from **4% toward
20%** — and what that means for jobs, income, meaning, and how societies are
organized. Plus a set of shareable single-idea **briefs** with polls and live
comments.

**Live:** https://aiffected.seibtribe.us · A personal essay by **George Seib**.

Built with Vite + React 19, hand-rolled SVG visuals (no chart libraries),
Vercel serverless functions, and MongoDB. Dark editorial design.

## What's inside

**The full page** walks through:

- **The mechanism** — why output and employment can come apart (GDP measures
  output, not jobs), in four steps.
- **Three waves** — Cognition (now), Robotics (this decade), Autonomy (the
  discontinuity). The same mechanism reaching further each time.
- **The simulator** — pick a wave, pick a scenario, drag the levers; one model
  drives GDP, unemployment, the wages-vs-capital split, the typical household,
  and (in Wave 3) "human leverage."
- **The jobs** — illustrative task-exposure by sector, per wave.
- **Is this alarmism?** — the strongest objection (we've survived every prior
  wave) steelmanned against why this time might differ.
- **Society** — "draft your social contract": value-dilemmas, a political-
  philosophy compass, and the "human ledger" of what a job pays out beyond a wage.
- **Now what?** — purpose and contribution after work, as concentric rings.
- **The chorus** — 20 real thinkers (builders, economists, critics, civic voices)
  woven in as inline quotes with sources, each bold claim paired with a credible
  counter-view.

**Eight briefs** (`/brief1` … `/brief8`, also `/<slug>`) are bite-sized,
single-concept versions with their own social cards, a per-topic poll, and a
live comment overlay — each linking back to the relevant section. The
**share kit** at `/share/` lists everything with copy-able links.

## Develop

```bash
npm install
npm run dev      # local dev server (no /api backend)
npm run build    # production build (regenerates briefs + redirects, then builds)
npm run preview  # preview the production build
```

To exercise the polls/comments backend locally, use `vercel dev` (so the `/api`
functions run) with a `.env.local` — `npm run dev` alone has no API and the
features degrade gracefully.

### Adding a brief

1. Add an entry to `src/briefs.js` (slug, title, dek, `kind`, voice, deep-link,
   cta, question, `poll`, `seeds`, OG title/description).
2. `npm run briefs` — regenerates `b/<slug>/index.html` and the `/briefN`
   redirects in `vercel.json`.
3. `npm run og` — regenerates the share image (`public/og/<slug>.png`); requires
   a running `npm run preview` and Playwright. Commit the PNG.

## Backend: polls & comments (MongoDB)

Serverless functions in `/api` back a per-brief poll and a moderated comment
feed. New comments are **pre-moderated** — hidden until approved at `/admin`
(token-gated). Data lives in two collections: `polls` (one doc per brief with
`$inc` vote counters) and `comments` (`pending` → `approved`).

Set these as environment variables in Vercel (and `.env.local` for `vercel dev`
— see `.env.example`; never commit secrets):

| Var | Required | Purpose |
|-----|----------|---------|
| `MONGODB_URI` | yes | MongoDB connection string |
| `MONGODB_DB` | no | database name (default `aiffected`) |
| `ADMIN_TOKEN` | yes | password for the `/admin` moderation page |
| `IP_SALT` | no | salt for hashing commenter IPs (rate-limit) |

## Deploy

Deploys on Vercel (`vercel.json`). The Vite `base` is `/` on Vercel and
`/aiffected/` elsewhere. Absolute URLs for social cards default to
`https://aiffected.seibtribe.us` (set in `scripts/gen-briefs.mjs` and
`index.html`); change them and run `npm run briefs` if the domain changes.

## Note on the model and quotes

The economic model (`src/model.js`) is **illustrative, not a forecast** — it
exists to make the *shape* of the trade-offs legible. Thinker quotes shown in
quotation marks are verbatim from the linked sources; the few summaries are
explicitly labeled "paraphrase" with a link to the original. Sector figures are
directional.

See `CLAUDE.md` for the full architecture and developer notes.
