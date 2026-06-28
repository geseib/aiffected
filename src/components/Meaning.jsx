import { useState } from 'react';
import Voice from './Voice.jsx';
import { Reveal } from './Charts.jsx';

// Concentric rings of contribution — you at the centre, out to the world.
// For each level: what a job gives you there today, the honest loss if it goes,
// and where the thread could be rewoven.
const RINGS = [
  {
    id: 'self',
    label: 'Yourself',
    color: '#fbbf24',
    today:
      'Work is where you prove you’re capable — earn your own way, get good at something, become someone. “What do you do?” is really asking “who are you?”',
    risk:
      'Take the job away and that question turns cruel. Strip a person down to a deposit from the state and many feel it as: so what am I now?',
    after:
      'The dignity of being good at something never needed a payroll. Craft, training, learning, building things that are yours — the satisfaction was always in doing the thing well, not in being paid for it.',
    voice: 'frankl',
  },
  {
    id: 'family',
    label: 'Your family',
    color: '#fb7185',
    today:
      'You provide. A roof, a meal, a holiday — you earned it, and handing it to the people you love is one of the deepest satisfactions there is.',
    risk:
      'If money simply arrives, the provider’s pride has nowhere to go. “I built this for you” is a story people live by, and a state deposit doesn’t tell it.',
    after:
      'But money was always a stand-in for what your family actually needed from you — time, attention, presence. Those you can give more of, not less. The provider becomes the one who’s there.',
    voice: 'bregman',
  },
  {
    id: 'community',
    label: 'Your community',
    color: '#c084fc',
    today:
      'A workplace is a village: people who count on you, a reason to leave the house, a “we.” Most adult friendships start at work.',
    risk:
      'Lose it and the days lose their shape. Time alone and unstructured is its own poverty — the damage of long unemployment shows up in health, not just mood.',
    after:
      'Belonging has to be rebuilt on purpose — neighbours, teams, clubs, care, congregations, the local. It won’t appear on its own, which is exactly why a society has to fund the places it grows in.',
    voice: 'putnam',
  },
  {
    id: 'country',
    label: 'Your country',
    color: '#60a5fa',
    today:
      'You pay in. Your taxes lay the road, staff the school, hold the line. Being a net contributor is a quiet citizenship — you’re carrying your share.',
    risk:
      'Stop earning and you stop paying income tax. The fear underneath is sharp: am I a taker now, a drain on the people still working?',
    after:
      'When machines and capital make the wealth, they fund the road and the school. The human share shifts from money to presence — showing up, voting, serving, caring. Citizenship you do, not citizenship you bill.',
    voice: 'obama',
  },
  {
    id: 'world',
    label: 'The world',
    color: '#5eead4',
    today:
      'Your work makes the world a little better — a problem solved, a thing built, a person helped. Stretch it over a career and you mattered, a little, at scale.',
    risk:
      'If the machines do it faster and better, that feeling sours into superfluity — Harari’s word — the sense that nothing you do moves the needle.',
    after:
      'Scale was never where the meaning lived anyway. One garden tended, one child raised well, one room made more beautiful — the world improves a corner at a time, and that was always the part no machine could hand you.',
    voice: 'keynes',
  },
];

const RAD = { self: 32, family: 64, community: 96, country: 128, world: 160 };

export default function Meaning() {
  const [sel, setSel] = useState('self');
  const ring = RINGS.find((r) => r.id === sel);

  return (
    <section className="meaning" id="meaning">
      <div className="section-head">
        <p className="eyebrow">The question underneath</p>
        <h2>But would any of it mean anything?</h2>
        <p className="lede">
          Say the machines really do make the wealth, and we really do share it out — rent paid, food on
          the table, nobody destitute. A good outcome. And the question that keeps people up at night is
          still sitting there, unanswered. A job was never only income. It was three quiet promises:{' '}
          <strong>I make something a little better. I provide for the people I love. I pay into the
          world that raised me.</strong> Pull the job and those promises come loose — at every level,
          from yourself out to the world. So: <em>now what?</em>
        </p>
      </div>

      <Reveal className="rings-wrap">
        <div className="rings-figure">
          <svg viewBox="0 0 336 336" className="rings-svg" role="img" aria-label="Concentric rings of contribution, from yourself to the world">
            {RINGS.slice().reverse().map((r) => (
              <g key={r.id}>
                <circle
                  cx="168"
                  cy="168"
                  r={RAD[r.id]}
                  fill="none"
                  stroke={r.color}
                  strokeWidth={sel === r.id ? 5 : 2}
                  opacity={sel === r.id ? 1 : 0.3}
                  className="ring"
                />
                <circle
                  cx="168"
                  cy="168"
                  r={RAD[r.id]}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="20"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSel(r.id)}
                />
              </g>
            ))}
            <circle cx="168" cy="168" r="21" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" />
            <text x="168" y="172" textAnchor="middle" className="rings-you">
              YOU
            </text>
          </svg>
        </div>

        <div className="rings-side">
          <div className="ring-legend">
            {RINGS.map((r) => (
              <button
                key={r.id}
                className={`ring-chip ${sel === r.id ? 'on' : ''}`}
                style={{ '--rc': r.color }}
                aria-pressed={sel === r.id}
                onClick={() => setSel(r.id)}
              >
                <span className="ring-dot" style={{ background: r.color }} />
                {r.label}
              </button>
            ))}
          </div>

          <div className="meaning-panel" style={{ '--rc': ring.color }}>
            <h3 className="meaning-panel-title">{ring.label}</h3>
            <div className="meaning-block today">
              <span>What the job gives you here</span>
              <p>{ring.today}</p>
            </div>
            <div className="meaning-block risk">
              <span>The honest loss</span>
              <p>{ring.risk}</p>
            </div>
            <div className="meaning-block after">
              <span>Where it could come from</span>
              <p>
                {ring.after} <Voice id={ring.voice} />
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="meaning-close">
        <p>
          None of these threads re-weave themselves. <Voice id="arendt" /> The societies that come
          through this won't be the ones that just paid people to exist — they'll be the ones that
          rebuilt the scaffolding of meaning (the care, the craft, the clubs, the civic life) as
          deliberately as the last century built factories. The economic problem may be solvable. This
          one we have to choose to solve.
        </p>
        <p className="meaning-kicker">
          So the real question was never “will there be jobs?” It's the one Keynes left us in 1930: what
          will we do with the freedom — and what will we build so that everyone has a good answer?
        </p>
      </Reveal>
    </section>
  );
}
