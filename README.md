# aiffected

An interactive explainer about how Generative AI could reshape the economy — and
why an economy can **grow GDP by 10–20% while unemployment climbs from 4% toward
20%**. The site walks a reader from the underlying mechanism, through a hands-on
scenario simulator, into the question that really matters: if we no longer need
everyone to work, how should a society be organized?

## What's inside

- **The mechanism** — why output and employment can come apart, in four steps.
- **The simulator** — preset scenarios (Soft landing, Shared boom, The Great
  Decoupling, Jobless boom…) plus four draggable levers. Every number — GDP,
  unemployment, the wages-vs-capital split, the typical household, social
  stability — comes from one small model in [`src/model.js`](src/model.js).
- **The jobs** — illustrative task-exposure by sector.
- **Society** — the menu of ways societies can re-link income to life
  (reskilling, shorter weeks, redistribution, public ownership…).
- **What to watch** — the three dials that decide which decade we get.

## About the model

`src/model.js` is intentionally **simple and illustrative — not a forecast**. Its
only job is to make one counter-intuitive idea legible: GDP measures *output*,
not *employment*, so the two can decouple. The presets are hand-tuned to land on
recognizable stories; the sector figures are directional. Same inputs always
produce the same outputs.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Deploys on Vercel (`vercel.json`). Built with Vite + React 19, no charting
dependencies — the visuals are hand-rolled SVG.
