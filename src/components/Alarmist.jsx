import { useState } from 'react';
import Voice from './Voice.jsx';
import { Glossed } from './Term.jsx';
import { Reveal } from './Charts.jsx';

const STANCES = [
  {
    id: 'adapt',
    label: 'It’s alarmist — we’ll adapt, like always',
    resp: 'Historically, the smart bet — the doom-criers have been wrong for two centuries. But notice what history actually promises: that the jobs return eventually, somewhere, for someone. It says nothing about whether they return fast enough for you, in your town, at your old wage. The optimists are usually right about the destination and silent about the journey.',
  },
  {
    id: 'different',
    label: 'This time really is different',
    resp: 'Maybe. The scope and speed are genuinely new — cognition and bodies at once, in years rather than generations. But “this time is different” has been wrong every single time someone said it. The strongest version of your case isn’t “the jobs won’t come” — it’s “they might not come fast enough, land on the same people, or pay as well.”',
  },
  {
    id: 'unsure',
    label: 'Honestly, I’m not sure',
    resp: 'That’s the honest answer — nobody knows, including the experts on both sides of this page. Which is the whole point: when you can’t know, you plan for the bad version while hoping for the good. The cost of preparing and being wrong is small. The cost of not preparing and being right is a lost generation.',
  },
];

const OPTIMIST = [
  'No fixed “lump of labour.” There’s no set amount of work to go around — human wants are endless, so new needs keep inventing new jobs.',
  'Most of today’s jobs are new. Roughly 60% of the work people do now is in occupations that didn’t exist in 1940.',
  'Automation often grows the work. After the ATM, the number of bank tellers rose, not fell — cheaper branches meant more of them.',
  'The scary numbers are contested. Measured task-by-task, the OECD put high-risk jobs near 9%, not Frey & Osborne’s 47%.',
  'AI is a tool, too. It makes people more productive — and more productive workers are usually in higher demand, not lower.',
];

const SKEPTIC = [
  'Speed. Past shifts took generations; the farmer’s grandchildren got the new jobs. This one is unfolding in years — cold comfort mid-career.',
  'Scope. Every earlier machine replaced a task and pushed people up to higher ground. AI plus robotics is climbing toward the high ground itself.',
  'The new rung may automate too. If the jobs AI creates are also things AI can do, the escalator never stops.',
  'Distribution, not just totals. Even if the job count recovers, who gets the new work — where, and at what pay — is where the crisis lives.',
  'It only has to be different once. “This time is different” was wrong for 200 years — but its sceptics only have to be right a single time.',
];

export default function Alarmist() {
  const [s, setS] = useState(null);
  const stance = STANCES.find((x) => x.id === s);
  return (
    <section className="alarmist" id="alarmist">
      <div className="section-head">
        <p className="eyebrow">The strongest objection</p>
        <h2>Hold on — is this just alarmism?</h2>
        <p className="lede">
          Every technological revolution destroyed jobs and created new ones nobody saw coming. In 1900,
          40% of Americans worked on farms; today it’s under 2% — and we didn’t end up with 38%
          unemployment. We got jobs no one back then could have named. <Voice id="autor" /> So won’t AI do
          the same? It’s the best argument against everything on this page — so let’s take it seriously.
        </p>
      </div>

      <Reveal className="alarmist-q">
        <h3>So — which is it?</h3>
        <div className="alarmist-opts">
          {STANCES.map((x) => (
            <button key={x.id} className={`alarmist-opt ${s === x.id ? 'on' : ''}`} aria-pressed={s === x.id} onClick={() => setS(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
        {stance && (
          <div className="alarmist-resp" key={stance.id}>
            <p>{stance.resp}</p>
          </div>
        )}
      </Reveal>

      <div className="alarmist-cols">
        <Reveal className="alarmist-col yes">
          <h4>The case that it’s not alarmist</h4>
          <ul>
            {OPTIMIST.map((o, i) => (
              <li key={i}>
                <Glossed text={o} />
              </li>
            ))}
          </ul>
          <p className="alarmist-voices">
            <Voice id="bessen" /> <Voice id="oecd" />
          </p>
        </Reveal>
        <Reveal className="alarmist-col no">
          <h4>Why this time might be different</h4>
          <ul>
            {SKEPTIC.map((o, i) => (
              <li key={i}>
                <Glossed text={o} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="alarmist-close">
        <p>
          The honest answer: <strong>nobody knows.</strong> The new jobs might come — they always have.
          But “might” is doing a lot of work, and history can’t promise you the timing, the distribution
          or the pay. So the grown-up move isn’t to pick a side. It’s to{' '}
          <strong>plan for the version where the new work doesn’t arrive fast enough — while hoping it
          does.</strong>
        </p>
      </Reveal>
    </section>
  );
}
