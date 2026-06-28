import { Reveal } from './Charts.jsx';
import WaveToggle from './WaveToggle.jsx';
import Voice from './Voice.jsx';

// Illustrative task-exposure by sector, per wave: the share of a sector's tasks
// that AI (wave 1), robotics (wave 2) and autonomous systems (wave 3) can
// meaningfully do. Directional, not a payroll forecast. Kept in a fixed order —
// cognitive work first, physical work second — so switching waves visibly grows
// the physical bars rather than re-sorting them away.
const SECTORS = [
  { name: 'Customer support & call centers', kind: 'mind', e: [82, 88, 97] },
  { name: 'Software & data work', kind: 'mind', e: [74, 80, 96] },
  { name: 'Writing, marketing & media', kind: 'mind', e: [71, 78, 95] },
  { name: 'Bookkeeping, admin & back office', kind: 'mind', e: [69, 82, 97] },
  { name: 'Finance & analysis', kind: 'mind', e: [50, 64, 93] },
  { name: 'Legal & paralegal research', kind: 'mind', e: [58, 66, 92] },
  { name: 'Design & creative production', kind: 'mind', e: [52, 60, 90] },
  { name: 'Warehouse & logistics', kind: 'body', e: [28, 84, 96] },
  { name: 'Driving & delivery', kind: 'body', e: [20, 80, 95] },
  { name: 'Manufacturing & assembly', kind: 'body', e: [32, 83, 96] },
  { name: 'Electronics & machine repair', kind: 'body', e: [18, 72, 92] },
  { name: 'Cleaning & facilities', kind: 'body', e: [16, 74, 94] },
  { name: 'Skilled trades & construction', kind: 'body', e: [14, 56, 88] },
  { name: 'Healthcare (hands-on care)', kind: 'body', e: [22, 48, 86] },
];

const tone = (e) => (e >= 65 ? '#f87171' : e >= 45 ? '#fbbf24' : '#34d399');

const COPY = {
  1: {
    h: 'It starts with desk work',
    p: 'Wave 1 hits cognitive and routine work first — the desks, not the job sites. The more of a sector’s day is text, code and predictable decisions, the more exposed it is. The trades and hands-on care look like safe high ground.',
  },
  2: {
    h: 'Then the safe ground floods',
    p: 'Wave 2 is robotics. Watch the bottom half of this chart: warehouses, driving, assembly, repair, cleaning — the manual jobs people fled into for safety — surge into the danger zone. The high ground was only ever temporary.',
  },
  3: {
    h: 'Then almost nothing is out of range',
    p: 'Wave 3 is autonomy. Exposure approaches the ceiling almost everywhere at once. The question stops being which jobs are safe and becomes whether “a job” is still how most people get a claim on what the economy produces.',
  },
};

export default function Sectors({ wave, setWave }) {
  const copy = COPY[wave];
  return (
    <section className="sectors" id="sectors">
      <div className="section-head">
        <p className="eyebrow">Where the jobs are</p>
        <h2>{copy.h}</h2>
        <p className="lede">{copy.p}</p>
        <WaveToggle wave={wave} setWave={setWave} compact />
      </div>

      <Reveal className="sector-list">
        {SECTORS.map((s) => {
          const v = s.e[wave - 1];
          return (
            <div className="sector-row" key={s.name}>
              <span className="sector-name">
                <i className={`sector-kind ${s.kind}`} aria-hidden="true" />
                {s.name}
              </span>
              <div className="sector-bar">
                <div className="sector-fill" style={{ width: `${v}%`, background: tone(v) }} />
              </div>
              <span className="sector-pct">{v}%</span>
            </div>
          );
        })}
      </Reveal>

      <p className="sectors-foot">
        <span className="sector-legend"><i className="sector-kind mind" /> cognitive&nbsp;work</span>
        <span className="sector-legend"><i className="sector-kind body" /> physical&nbsp;work</span>
        &nbsp;· Share of tasks each wave can do or heavily assist (illustrative). <Voice id="frey" />{' '}
        Exposure isn't job loss — it's the size of the lever. What it becomes is set in the simulator above.
      </p>
    </section>
  );
}
