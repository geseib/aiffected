// ---------------------------------------------------------------------------
// The economic model behind the simulator.
//
// Deliberately simple and illustrative — not a forecast. Its job is to make one
// counter-intuitive idea legible: GDP measures the value of what an economy
// produces, not how many people it employs. Once a machine can do a task,
// output can keep climbing while the paycheck attached to that task disappears.
//
// THREE WAVES. The same mechanism reaches further with each wave:
//   1. Cognition — AI does desk/cognitive work (text, code, analysis).
//   2. Robotics  — cheap, dexterous robots reach physical work (the "safe"
//                  manual jobs: logistics, driving, assembly, repair, care).
//   3. Autonomy  — self-improving, self-directing, self-replicating systems.
//                  The question shifts from "how do humans share the work?" to
//                  "do humans retain any economic leverage at all?"
//
// Everything is normalized to "today":
//   GDP index 100 · labour force 100 · unemployment 4 · labour share 58% ·
//   median income index 100.
// ---------------------------------------------------------------------------

export const HORIZON = 10; // years modelled

// Per-wave configuration. Each wave reaches a larger share of all work
// ("reach"), produces a bigger boom, tilts income harder toward capital, and
// raises the ceiling on how much labour can be displaced.
export const WAVE_CFG = {
  1: {
    name: 'Cognition',
    reachBase: 0.45,
    reachVar: 0,
    gdpBase: 19,
    gdpAuto: 6,
    gdpExtraK: 0,
    capTilt: 28,
    unempCap: 48,
    laborFloor: 25,
    gdpYMax: 135,
    unempYMax: 42,
  },
  2: {
    name: 'Robotics',
    reachBase: 0.55,
    reachVar: 0.33,
    gdpBase: 23,
    gdpAuto: 9,
    gdpExtraK: 14,
    capTilt: 34,
    unempCap: 66,
    laborFloor: 16,
    gdpYMax: 168,
    unempYMax: 70,
  },
  3: {
    name: 'Autonomy',
    reachBase: 0.8,
    reachVar: 0.19,
    gdpBase: 30,
    gdpAuto: 12,
    gdpExtraK: 55,
    capTilt: 46,
    unempCap: 92,
    laborFloor: 8,
    gdpYMax: 240,
    unempYMax: 96,
  },
};

// The four core levers, present in every wave.
const CORE_LEVERS = [
  {
    key: 'adoption',
    label: 'AI adoption',
    low: 'A few labs',
    high: 'Everywhere',
    help: 'How broadly capable AI is actually deployed across real work — not how clever the demos are, but how much of the economy runs on it.',
  },
  {
    key: 'automation',
    label: 'Replace vs. assist',
    low: 'Assists people',
    high: 'Replaces people',
    help: 'Of the work AI touches, how much removes the worker entirely versus making an existing worker faster. The biggest driver of whether growth is shared.',
  },
  {
    key: 'newwork',
    label: 'New work created',
    low: 'Little emerges',
    high: 'Whole new sectors',
    help: 'Technology destroys jobs and invents new ones. How fast do the new roles appear, and how many displaced workers can actually move into them?',
  },
  {
    key: 'redistribution',
    label: 'Redistribution',
    low: 'Market keeps it',
    high: 'Broadly shared',
    help: 'How much of the windfall is routed back to households — through taxes, dividends, services or transfers — rather than staying with whoever owns the machines.',
  },
];

// Extra levers that appear only in their wave.
const WAVE_EXTRA = {
  2: [
    {
      key: 'robotics',
      label: 'Robotics maturity',
      low: 'Clumsy & costly',
      high: 'Cheap & dexterous',
      help: 'How good and how affordable physical robots have become. As this climbs, the "safe" manual jobs — warehouses, driving, assembly, repair, cleaning, care — come into range.',
    },
  ],
  3: [
    {
      key: 'autonomy',
      label: 'Autonomy',
      low: 'Tools we direct',
      high: 'Self-directing',
      help: 'How far the systems run the loop themselves — setting goals, improving their own design, replicating — versus waiting for a human to point them at a task.',
    },
    {
      key: 'control',
      label: 'Human control',
      low: 'Out of our hands',
      high: 'Firmly governed',
      help: 'Whether humans keep meaningful governance and ownership of autonomous systems, or cede the reins to the systems (or to whoever first lets them off the leash).',
    },
  ],
};

export const leversFor = (wave) => [...CORE_LEVERS, ...(WAVE_EXTRA[wave] || [])];

const BASE = { unemployment: 4, laborShare: 58, medianIndex: 100 };
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
function series(start, end, years = HORIZON) {
  const out = [];
  for (let y = 0; y <= years; y++) out.push(start + (end - start) * ease(y / years));
  return out;
}

/**
 * Run the model for a set of lever values (each 0–100) within a given wave.
 */
export function compute(inputs) {
  const wave = inputs.wave || 1;
  const W = WAVE_CFG[wave];

  const adoption = clamp(inputs.adoption ?? 0, 0, 100) / 100;
  const automation = clamp(inputs.automation ?? 0, 0, 100) / 100;
  const newwork = clamp(inputs.newwork ?? 0, 0, 100) / 100;
  const redistribution = clamp(inputs.redistribution ?? 0, 0, 100) / 100;

  // The wave's defining dial: robotics in wave 2, autonomy in wave 3.
  const waveKnob =
    clamp(wave === 2 ? inputs.robotics ?? 50 : wave === 3 ? inputs.autonomy ?? 50 : 0, 0, 100) / 100;
  const control = clamp(inputs.control ?? 50, 0, 100) / 100;

  // How much of all work this wave can reach.
  const reach = W.reachBase + W.reachVar * waveKnob;

  // --- GDP -----------------------------------------------------------------
  const gdpExtra = adoption * waveKnob * W.gdpExtraK;
  const gdpGrowth = adoption * W.gdpBase + adoption * automation * W.gdpAuto + gdpExtra;

  // --- Jobs ----------------------------------------------------------------
  const displaced = adoption * automation * reach * 66; // points of the labour force
  const absorbed = newwork * displaced * 0.85;
  const unemployment = clamp(BASE.unemployment + displaced - absorbed, 2.5, W.unempCap);

  // --- Who captures the income ---------------------------------------------
  const controlBoost = wave === 3 ? control * 16 : 0; // governance keeps some share with people
  const laborShare = clamp(
    BASE.laborShare - adoption * automation * W.capTilt + redistribution * 18 + controlBoost,
    W.laborFloor,
    72
  );
  const capitalShare = 100 - laborShare;

  // --- The median household ------------------------------------------------
  const employedFrac = (100 - unemployment) / 100;
  const wageEffect =
    (1 + gdpGrowth / 100) * (laborShare / BASE.laborShare) * (employedFrac / 0.96);
  const transfer = redistribution * (capitalShare / 100) * (gdpGrowth / 100) * 0.55;
  const medianIndex = clamp(BASE.medianIndex * wageEffect + transfer * 100, 22, 260);

  // --- Social stability (waves 1–2) ----------------------------------------
  const stability = clamp(
    100 -
      unemployment * 1.7 -
      Math.max(0, capitalShare - 42) * 1.25 +
      redistribution * 100 * 0.18 +
      (medianIndex - 100) * 0.3,
    0,
    100
  );

  // --- Human economic leverage (wave 3) ------------------------------------
  // How much bargaining power / relevance humans retain when systems can run
  // themselves. Autonomy erodes it; retained control and sharing restore some.
  const autonomyPenalty = wave === 3 ? waveKnob * 45 : 0;
  const leverage = clamp(
    100 - displaced * 0.7 - autonomyPenalty + control * 100 * 0.35 + redistribution * 100 * 0.1,
    0,
    100
  );

  return {
    wave,
    gdpGrowth,
    unemployment,
    laborShare,
    capitalShare,
    medianIndex,
    stability,
    leverage,
    displaced,
    absorbed,
    gdpSeries: series(100, 100 + gdpGrowth),
    unemploymentSeries: series(BASE.unemployment, unemployment),
    medianSeries: series(100, medianIndex),
  };
}

// Hand-tuned starting points per wave. Selecting a wave drops the reader on its
// first preset; selecting a preset just sets the levers, which they can drag.
export const PRESETS = {
  1: [
    { id: 'today', name: 'Today', tagline: 'Roughly where we are', levers: { adoption: 18, automation: 35, newwork: 55, redistribution: 35 } },
    { id: 'soft-landing', name: 'Soft landing', tagline: 'AI mostly assists. New jobs keep pace. Gains shared.', levers: { adoption: 62, automation: 42, newwork: 72, redistribution: 75 } },
    { id: 'shared-boom', name: 'Shared boom', tagline: 'Huge productivity, but policy spreads the windfall.', levers: { adoption: 92, automation: 55, newwork: 82, redistribution: 80 } },
    { id: 'great-decoupling', name: 'The Great Decoupling', tagline: 'Output soars, paychecks come apart from it.', levers: { adoption: 86, automation: 86, newwork: 18, redistribution: 16 } },
    { id: 'jobless-boom', name: 'Jobless boom', tagline: 'GDP +20%, unemployment 20%+. The headline paradox.', levers: { adoption: 82, automation: 90, newwork: 12, redistribution: 22 } },
  ],
  2: [
    { id: 'cobots', name: 'Cobots everywhere', tagline: 'Robots assist humans. Output jumps, most jobs survive.', levers: { adoption: 72, automation: 44, newwork: 66, redistribution: 60, robotics: 72 } },
    { id: 'robot-dividend', name: 'Robot dividend', tagline: 'Machines do the heavy lifting; the gains are shared.', levers: { adoption: 90, automation: 70, newwork: 55, redistribution: 82, robotics: 85 } },
    { id: 'lights-out', name: 'Lights-out logistics', tagline: 'Warehouses, trucks and factories run themselves.', levers: { adoption: 85, automation: 88, newwork: 18, redistribution: 22, robotics: 88 } },
    { id: 'no-safe-ground', name: 'No safe ground', tagline: 'The manual jobs people fled into are automated too.', levers: { adoption: 92, automation: 92, newwork: 12, redistribution: 24, robotics: 95 } },
  ],
  3: [
    { id: 'aligned', name: 'Aligned abundance', tagline: 'Autonomy under control, with the windfall widely shared.', levers: { adoption: 95, automation: 85, newwork: 40, redistribution: 85, autonomy: 80, control: 88 } },
    { id: 'god-kings', name: 'Owned by a few', tagline: 'Humans keep the reins — a handful of them. The rest watch.', levers: { adoption: 95, automation: 92, newwork: 12, redistribution: 14, autonomy: 90, control: 72 } },
    { id: 'out-of-loop', name: 'Out of the loop', tagline: 'Systems run themselves. Human leverage falls toward zero.', levers: { adoption: 98, automation: 95, newwork: 8, redistribution: 20, autonomy: 98, control: 14 } },
  ],
};

export const firstPreset = (wave) => PRESETS[wave][0];
