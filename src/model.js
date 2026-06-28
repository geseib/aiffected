// ---------------------------------------------------------------------------
// The economic model behind the simulator.
//
// This is a deliberately *simple, illustrative* model — not a forecast. Its job
// is to make one counter-intuitive idea legible: GDP measures the value of what
// an economy produces, not how many people it employs. Once a machine can do a
// task, output can keep climbing while the paycheck attached to that task
// disappears. The numbers here are stylized to show the *shape* of that story,
// not to predict any particular year.
//
// Everything is normalized to "today":
//   GDP index .............. 100  (we report growth as a % above this)
//   Labour force ........... 100 people
//   Unemployment ........... 4 people out of work
//   Labour share of income . 58%  (roughly the long-run US figure)
//   Median income index .... 100
// ---------------------------------------------------------------------------

export const HORIZON = 10; // years modelled

// Four levers the user can move. Each is 0–100.
export const LEVERS = [
  {
    key: 'adoption',
    label: 'AI adoption',
    min: 0,
    max: 100,
    low: 'A few labs',
    high: 'Everywhere',
    help: 'How broadly capable AI is actually deployed across real work — not how clever the demos are, but how much of the economy runs on it.',
  },
  {
    key: 'automation',
    label: 'Replace vs. assist',
    min: 0,
    max: 100,
    low: 'Assists people',
    high: 'Replaces people',
    help: 'Of the work AI touches, how much removes the worker entirely versus making an existing worker faster. This is the single biggest driver of whether growth is shared.',
  },
  {
    key: 'newwork',
    label: 'New work created',
    min: 0,
    max: 100,
    low: 'Little emerges',
    high: 'Whole new sectors',
    help: 'History says technology destroys jobs and invents new ones. How fast do the new roles appear, and how many displaced workers can move into them?',
  },
  {
    key: 'redistribution',
    label: 'Redistribution',
    min: 0,
    max: 100,
    low: 'Market keeps it',
    high: 'Broadly shared',
    help: 'How much of the AI windfall is routed back to households — through taxes, dividends, services, or direct transfers — rather than staying with whoever owns the machines.',
  },
];

const BASE = {
  unemployment: 4,
  laborShare: 58,
  medianIndex: 100,
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// S-curve easing so trajectories accelerate then settle, instead of moving in a
// straight line. t in [0,1].
const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

function series(start, end, years = HORIZON) {
  const out = [];
  for (let y = 0; y <= years; y++) out.push(start + (end - start) * ease(y / years));
  return out;
}

/**
 * Run the model for a set of lever values (each 0–100).
 * Returns the headline numbers plus year-by-year trajectories.
 */
export function compute(inputs) {
  const adoption = clamp(inputs.adoption, 0, 100) / 100;
  const automation = clamp(inputs.automation, 0, 100) / 100;
  const newwork = clamp(inputs.newwork, 0, 100) / 100;
  const redistribution = clamp(inputs.redistribution, 0, 100) / 100;

  // --- GDP -----------------------------------------------------------------
  // Output rises as AI spreads. Pure assistance lifts output some; replacement
  // adds an extra slug of machine output on top. Both routes grow GDP.
  const gdpGrowth = adoption * 19 + adoption * automation * 6; // % above today

  // --- Jobs ----------------------------------------------------------------
  // Displacement scales with how much AI is deployed AND how much of that is
  // replacement rather than assistance. New work absorbs most, but not all, of
  // the displaced.
  const displaced = adoption * automation * 30; // points of the labour force
  const absorbed = newwork * displaced * 0.85;
  const unemployment = clamp(BASE.unemployment + displaced - absorbed, 2.5, 48);

  // --- Who captures the income ---------------------------------------------
  // Replacement pushes income from wages toward whoever owns the AI/capital.
  // Redistribution pushes it back.
  const laborShare = clamp(
    BASE.laborShare - adoption * automation * 28 + redistribution * 18,
    25,
    72
  );
  const capitalShare = 100 - laborShare;

  // --- The median household ------------------------------------------------
  // Your slice = (bigger pie) x (labour's share of it) x (do you have a job) +
  // whatever redistribution tops it back up. This is where "GDP up, life worse"
  // becomes visible.
  const employedFrac = (100 - unemployment) / 100;
  const wageEffect =
    (1 + gdpGrowth / 100) * (laborShare / BASE.laborShare) * (employedFrac / 0.96);
  const transfer = redistribution * (capitalShare / 100) * (gdpGrowth / 100) * 0.55;
  const medianIndex = clamp(BASE.medianIndex * wageEffect + transfer * 100, 35, 200);

  // --- Social stability ----------------------------------------------------
  // A soft composite: high joblessness and concentration erode it; a healthy
  // median and active redistribution shore it up.
  const stability = clamp(
    100 -
      unemployment * 1.7 -
      Math.max(0, capitalShare - 42) * 1.25 +
      redistribution * 100 * 0.18 +
      (medianIndex - 100) * 0.3,
    0,
    100
  );

  return {
    gdpGrowth,
    unemployment,
    laborShare,
    capitalShare,
    medianIndex,
    stability,
    displaced,
    absorbed,
    // trajectories over the horizon
    gdpSeries: series(100, 100 + gdpGrowth),
    unemploymentSeries: series(BASE.unemployment, unemployment),
    medianSeries: series(100, medianIndex),
  };
}

// Hand-tuned starting points that each tell a recognizable story. Selecting one
// just sets the four levers; the user can then drag from there.
export const PRESETS = [
  {
    id: 'today',
    name: 'Today',
    tagline: 'Roughly where we are',
    levers: { adoption: 18, automation: 35, newwork: 55, redistribution: 35 },
  },
  {
    id: 'soft-landing',
    name: 'Soft landing',
    tagline: 'AI mostly assists. New jobs keep pace. Gains are shared.',
    levers: { adoption: 62, automation: 42, newwork: 72, redistribution: 75 },
  },
  {
    id: 'shared-boom',
    name: 'Shared boom',
    tagline: 'Huge productivity, but policy spreads the windfall.',
    levers: { adoption: 92, automation: 55, newwork: 82, redistribution: 80 },
  },
  {
    id: 'great-decoupling',
    name: 'The Great Decoupling',
    tagline: 'Output soars, paychecks come apart from it.',
    levers: { adoption: 86, automation: 86, newwork: 18, redistribution: 16 },
  },
  {
    id: 'jobless-boom',
    name: 'Jobless boom',
    tagline: 'GDP +20%, unemployment 20%+. The headline paradox.',
    levers: { adoption: 82, automation: 90, newwork: 12, redistribution: 22 },
  },
];

export const DEFAULT_PRESET = 'jobless-boom';
