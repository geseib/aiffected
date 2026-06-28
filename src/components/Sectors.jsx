import { Reveal } from './Charts.jsx';

// Illustrative exposure — the share of a sector's *tasks* that current and
// near-term generative AI can meaningfully do. Directional, not a payroll
// forecast: high exposure means more of the work can be automated or heavily
// assisted, which is where the wage-vs-output split shows up first.
const SECTORS = [
  { name: 'Customer support & call centers', exposure: 82 },
  { name: 'Software & data work', exposure: 74 },
  { name: 'Writing, marketing & media', exposure: 71 },
  { name: 'Bookkeeping, admin & back office', exposure: 69 },
  { name: 'Legal & paralegal research', exposure: 58 },
  { name: 'Design & creative production', exposure: 52 },
  { name: 'Finance & analysis', exposure: 50 },
  { name: 'Teaching & training', exposure: 34 },
  { name: 'Healthcare (hands-on care)', exposure: 22 },
  { name: 'Skilled trades & construction', exposure: 14 },
];

const tone = (e) => (e >= 65 ? '#f87171' : e >= 45 ? '#fbbf24' : '#34d399');

export default function Sectors() {
  return (
    <section className="sectors" id="sectors">
      <div className="section-head">
        <p className="eyebrow">Where the jobs are</p>
        <h2>It doesn't land evenly</h2>
        <p className="lede">
          This wave hits cognitive and routine work first — the desks, not the job sites. The more of a
          sector's day is text, code, and predictable decisions, the more exposed it is. The trades and
          hands-on care are, for now, the safe high ground.
        </p>
      </div>

      <Reveal className="sector-list">
        {SECTORS.map((s) => (
          <div className="sector-row" key={s.name}>
            <span className="sector-name">{s.name}</span>
            <div className="sector-bar">
              <div className="sector-fill" style={{ width: `${s.exposure}%`, background: tone(s.exposure) }} />
            </div>
            <span className="sector-pct">{s.exposure}%</span>
          </div>
        ))}
      </Reveal>

      <p className="sectors-foot">
        Share of tasks that today's generative AI can do or heavily assist (illustrative). Exposure is
        not the same as job loss — it's the size of the lever. Whether exposure becomes unemployment or
        just cheaper, faster work depends on the choices in the simulator above.
      </p>
    </section>
  );
}
