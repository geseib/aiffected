import { useMemo, useState } from 'react';
import { compute } from '../model.js';
import { Counter, LineChart } from './Charts.jsx';
import Voice from './Voice.jsx';
import { briefBySlug } from '../briefs.js';

const BASE = import.meta.env.BASE_URL;

function renderTitle(parts) {
  return parts.map((p, i) =>
    typeof p === 'string' ? (
      <span key={i}>{p}</span>
    ) : (
      <em key={i} className={`brief-em ${p.tone}`}>
        {p.em}
      </em>
    )
  );
}

// ---- single-concept visuals, reusing the site's primitives ----

function Paradox() {
  const [v, setV] = useState(80);
  const r = useMemo(() => compute({ adoption: v, automation: v, newwork: 15, redistribution: 20, wave: 1 }), [v]);
  return (
    <div className="brief-paradox">
      <div className="brief-stats">
        <div className="hstat">
          <Counter className="hstat-num up" value={r.gdpGrowth} format={(x) => `+${x.toFixed(0)}%`} />
          <span className="hstat-cap">GDP</span>
        </div>
        <div className="hstat">
          <Counter className="hstat-num down" value={r.unemployment} format={(x) => `${x.toFixed(0)}%`} />
          <span className="hstat-cap">out of work</span>
        </div>
      </div>
      <div className="charts-row">
        <LineChart series={r.gdpSeries} color="#34d399" yMin={95} yMax={135} label="What we produce" format={(x) => `+${(x - 100).toFixed(0)}%`} />
        <LineChart series={r.unemploymentSeries} color="#f87171" yMin={0} yMax={40} label="People out of work" unit="%" format={(x) => x.toFixed(0)} />
      </div>
      <div className="brief-slider">
        <span>Less AI</span>
        <input type="range" min="20" max="100" value={v} onChange={(e) => setV(+e.target.value)} aria-label="How much AI" />
        <span>More AI</span>
      </div>
    </div>
  );
}

const LEDGER = [
  { f: 'A wage', n: 'income to live on', s: true },
  { f: 'A shape to the day', n: 'a reason to get up', s: false },
  { f: 'A sense of contributing', n: 'mattering to others', s: false },
  { f: 'Status & identity', n: '“what do you do?”', s: false },
  { f: 'A place to belong', n: 'colleagues, a “we”', s: false },
];

function Ledger() {
  return (
    <ul className="sc-ledger-list brief-ledger">
      {LEDGER.map((l) => (
        <li key={l.f} className={l.s ? 'solved' : 'open'}>
          <span className="sc-ledger-mark">{l.s ? 'refunded' : 'open'}</span>
          <span className="sc-ledger-facet">{l.f}</span>
          <span className="sc-ledger-note">{l.n}</span>
        </li>
      ))}
    </ul>
  );
}

const RING_C = ['#fbbf24', '#fb7185', '#c084fc', '#60a5fa', '#5eead4'];
const RING_R = [32, 64, 96, 128, 160];
const RING_L = ['Yourself', 'Family', 'Community', 'Country', 'World'];

function Rings() {
  return (
    <div className="brief-rings">
      <svg viewBox="0 0 336 336" role="img" aria-label="Concentric rings of contribution, from yourself to the world">
        {RING_R.slice().reverse().map((r, i) => {
          const idx = RING_R.length - 1 - i;
          return <circle key={r} cx="168" cy="168" r={r} fill="none" stroke={RING_C[idx]} strokeWidth="3" opacity="0.85" />;
        })}
        <circle cx="168" cy="168" r="21" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" />
        <text x="168" y="172" textAnchor="middle" className="rings-you">
          YOU
        </text>
      </svg>
      <div className="brief-rings-legend">
        {RING_L.map((l, i) => (
          <span key={l}>
            <i style={{ background: RING_C[i] }} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function Visual({ kind }) {
  if (kind === 'paradox') return <Paradox />;
  if (kind === 'ledger') return <Ledger />;
  if (kind === 'rings') return <Rings />;
  return null;
}

export default function Brief({ slug, og = false }) {
  const b = briefBySlug(slug);
  if (!b) return <div className="brief"><p>Brief not found.</p></div>;
  return (
    <div className={`brief ${og ? 'brief-og' : ''}`}>
      <a className="brief-brand" href={BASE}>
        <span className="brand-mark">ai</span>ffected
      </a>
      <div className="brief-body">
        <p className="eyebrow">{b.eyebrow}</p>
        <h1 className="brief-title">{renderTitle(b.title)}</h1>
        <p className="brief-dek">
          {b.dek} {!og && b.voice && <Voice id={b.voice} />}
        </p>
        <div className="brief-visual">
          <Visual kind={b.kind} />
        </div>
        {!og && (
          <a className="brief-cta hero-cta" href={`${BASE}#${b.deep}`}>
            {b.cta}
          </a>
        )}
      </div>
      {!og && (
        <p className="brief-foot">
          One idea from{' '}
          <a href={BASE}>
            <span className="brand-mark">ai</span>ffected
          </a>{' '}
          — an interactive explainer on how GenAI could remake work, income and society.
        </p>
      )}
      {og && (
        <span className="brief-og-brand">
          <span className="brand-mark">ai</span>ffected
        </span>
      )}
    </div>
  );
}
