import { useMemo, useState } from 'react';
import { compute } from '../model.js';
import { Counter, LineChart, SplitBar, Gauge } from './Charts.jsx';
import Voice from './Voice.jsx';
import { Glossed } from './Term.jsx';
import BriefPoll from './BriefPoll.jsx';
import BriefComments from './BriefComments.jsx';
import { briefBySlug } from '../briefs.js';
import { AUTHOR, AUTHOR_NOTE } from '../author.js';

function Byline() {
  return AUTHOR.linkedin ? (
    <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer">
      {AUTHOR.name}
    </a>
  ) : (
    <span>{AUTHOR.name}</span>
  );
}

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

function Decoupling() {
  const w = 360;
  const h = 180;
  const pad = 22;
  const prod = [100, 104, 110, 118, 128, 138, 147, 154, 159, 162, 164];
  const pay = [100, 101, 102, 103, 104, 105, 106, 107, 107, 108, 108];
  const yMin = 95;
  const yMax = 170;
  const X = (i) => pad + (i / (prod.length - 1)) * (w - pad * 2);
  const Y = (v) => h - pad - ((v - yMin) / (yMax - yMin)) * (h - pad * 2);
  const path = (a) => a.map((v, i) => `${i ? 'L' : 'M'} ${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  return (
    <div className="brief-decoupling">
      <svg viewBox={`0 0 ${w} ${h}`} className="brief-dual" preserveAspectRatio="none" role="img" aria-label="Productivity rising while pay stays flat">
        <path d={path(prod)} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
        <path d={path(pay)} fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={X(prod.length - 1)} cy={Y(prod[prod.length - 1])} r="4.5" fill="#34d399" />
        <circle cx={X(pay.length - 1)} cy={Y(pay[pay.length - 1])} r="4.5" fill="#f87171" />
      </svg>
      <div className="brief-dual-legend">
        <span><i style={{ background: '#34d399' }} />Output per worker <strong>+64%</strong></span>
        <span><i style={{ background: '#f87171' }} />Typical pay <strong>+8%</strong></span>
      </div>
    </div>
  );
}

const BSECT = [
  { n: 'Warehouse & logistics', e: [28, 84] },
  { n: 'Driving & delivery', e: [20, 80] },
  { n: 'Assembly & manufacturing', e: [32, 83] },
  { n: 'Cleaning & facilities', e: [16, 74] },
  { n: 'Skilled trades', e: [14, 56] },
  { n: 'Hands-on care', e: [22, 48] },
];

function SectorsMini() {
  const [w, setW] = useState(1);
  const tone = (e) => (e >= 65 ? '#f87171' : e >= 45 ? '#fbbf24' : '#34d399');
  return (
    <div className="brief-sectorsmini">
      <div className="wavetoggle compact">
        <button className={`wave-btn w1 ${w === 1 ? 'on' : ''}`} onClick={() => setW(1)}>
          <span className="wave-n">Wave 1</span>
          <span className="wave-name">Cognition</span>
        </button>
        <button className={`wave-btn w2 ${w === 2 ? 'on' : ''}`} onClick={() => setW(2)}>
          <span className="wave-n">Wave 2</span>
          <span className="wave-name">Robotics</span>
        </button>
      </div>
      <div className="sector-list">
        {BSECT.map((s) => {
          const v = s.e[w - 1];
          return (
            <div className="sector-row" key={s.n}>
              <span className="sector-name">{s.n}</span>
              <div className="sector-bar">
                <div className="sector-fill" style={{ width: `${v}%`, background: tone(v) }} />
              </div>
              <span className="sector-pct">{v}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SplitMini() {
  const [r, setR] = useState(20);
  const res = useMemo(() => compute({ adoption: 85, automation: 85, newwork: 15, redistribution: r, wave: 1 }), [r]);
  return (
    <div className="brief-split">
      <SplitBar left={res.laborShare} leftLabel="Wages (workers)" leftColor="#60a5fa" rightLabel="Capital (owners)" rightColor="#c084fc" />
      <div className="brief-slider">
        <span>Market keeps it</span>
        <input type="range" min="0" max="100" value={r} onChange={(e) => setR(+e.target.value)} aria-label="Redistribution" />
        <span>Broadly shared</span>
      </div>
    </div>
  );
}

function GaugeMini() {
  const [a, setA] = useState(85);
  const res = useMemo(() => compute({ adoption: 95, automation: 90, newwork: 15, redistribution: 25, autonomy: a, control: 30, wave: 3 }), [a]);
  return (
    <div className="brief-gaugemini">
      <Gauge value={res.leverage} label="Human leverage" words={['Negligible', 'Contested', 'Held']} />
      <div className="brief-slider">
        <span>Tools we direct</span>
        <input type="range" min="0" max="100" value={a} onChange={(e) => setA(+e.target.value)} aria-label="Autonomy" />
        <span>Self-directing</span>
      </div>
    </div>
  );
}

function DebateMini() {
  return (
    <div className="brief-debate">
      <div className="brief-debate-card no">
        <span className="brief-debate-tag">The alarm</span>
        <strong>47%</strong>
        <span>of US jobs “at risk” — Frey &amp; Osborne</span>
      </div>
      <div className="brief-debate-vs">vs</div>
      <div className="brief-debate-card yes">
        <span className="brief-debate-tag">The rebuttal</span>
        <strong>~9%</strong>
        <span>at high risk, measured task-by-task — OECD</span>
      </div>
    </div>
  );
}

function Visual({ kind }) {
  if (kind === 'paradox') return <Paradox />;
  if (kind === 'ledger') return <Ledger />;
  if (kind === 'rings') return <Rings />;
  if (kind === 'decoupling') return <Decoupling />;
  if (kind === 'sectors') return <SectorsMini />;
  if (kind === 'split') return <SplitMini />;
  if (kind === 'gauge') return <GaugeMini />;
  if (kind === 'debate') return <DebateMini />;
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
          {og ? b.dek : <Glossed text={b.dek} />} {!og && b.voice && <Voice id={b.voice} />}
        </p>
        <div className="brief-visual">
          <Visual kind={b.kind} />
        </div>
        {!og && b.question && (
          <div className="brief-question">
            <span className="brief-q-label">⇄ Crying wolf?</span>
            <p>
              <Glossed text={b.question} />
            </p>
          </div>
        )}
        {!og && <BriefPoll brief={b.slug} poll={b.poll} />}
        {!og && (
          <span className="brief-cta-wrap">
            <a className="brief-cta hero-cta" href={`${BASE}#${b.deep}`}>
              {b.cta}
            </a>
            <span className="brief-cta-note" role="tooltip">
              “{AUTHOR_NOTE}”
              <span className="brief-cta-sign">— {AUTHOR.first}</span>
            </span>
          </span>
        )}
      </div>
      {!og && <BriefComments brief={b.slug} seeds={b.seeds} />}
      {!og && (
        <p className="brief-foot">
          One idea from{' '}
          <a href={BASE}>
            <span className="brand-mark">ai</span>ffected
          </a>{' '}
          — a personal essay by <Byline /> on how GenAI could remake work, income and society.
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
