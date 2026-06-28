import { Reveal } from './Charts.jsx';

// How societies might re-link income to life when the wage-for-work link frays.
const RESPONSES = [
  {
    name: 'Do nothing',
    icon: '🪦',
    idea: 'Let the market sort it out. Owners of AI keep the gains; displaced workers compete for what remains.',
    result: 'Output booms, wages stagnate, inequality spikes. Historically this is where unrest, populism, and instability come from.',
    tone: 'bad',
  },
  {
    name: 'Reskill & redeploy',
    icon: '🎓',
    idea: 'Pour money into training so displaced workers move into the new roles AI creates.',
    result: 'Works if new work appears fast enough and people can actually reach it. Struggles when displacement outpaces retraining — you can\'t reskill a generation in a quarter.',
    tone: 'mid',
  },
  {
    name: 'Shorter work week',
    icon: '🗓️',
    idea: 'Spread the remaining work across more people — a 4-day, then 3-day week — so productivity buys time instead of pink slips.',
    result: 'Keeps more people employed and shares the productivity dividend as leisure. Needs wages to hold even as hours fall.',
    tone: 'good',
  },
  {
    name: 'Redistribute the windfall',
    icon: '💸',
    idea: 'Tax the AI productivity gains and route them back as a dividend, basic income, or universal services.',
    result: 'Decouples survival from employment. Turns "your job was automated" from a catastrophe into a transition. The central debate: how to fund it without killing the boom.',
    tone: 'good',
  },
  {
    name: 'Public & care work',
    icon: '🤝',
    idea: 'Fund the work markets underpay — care, teaching, climate, community — with the surplus AI creates.',
    result: 'Channels people toward work that\'s hard to automate and badly needed. Requires the political will to pay for it.',
    tone: 'good',
  },
  {
    name: 'Spread the ownership',
    icon: '🪙',
    idea: 'Give the public a stake in the machines — sovereign wealth funds, broad equity, data dividends.',
    result: 'If capital captures the income, let everyone own capital. Changes who the boom belongs to, rather than just taxing it after the fact.',
    tone: 'good',
  },
];

export default function Society() {
  return (
    <section className="society" id="society">
      <div className="section-head">
        <p className="eyebrow">How societies restructure</p>
        <h2>If income stops coming from jobs, where does it come from?</h2>
        <p className="lede">
          For 200 years, "get a job" has been society's answer to "how do I live?" When AI weakens that
          link, the question doesn't disappear — it moves to the level of how we organize everything.
          Every wealthy society will pick some mix of these. The simulator's{' '}
          <em>redistribution</em> lever is really a stand-in for this whole menu.
        </p>
      </div>

      <div className="resp-grid">
        {RESPONSES.map((rsp) => (
          <Reveal key={rsp.name} className={`resp ${rsp.tone}`}>
            <div className="resp-icon">{rsp.icon}</div>
            <h3>{rsp.name}</h3>
            <p className="resp-idea">{rsp.idea}</p>
            <p className="resp-result"><span>→</span> {rsp.result}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="society-note">
        <p>
          None of these is automatic. The same +20% of output can fund a broadly shared golden age or
          pile up behind a handful of owners while everyone else competes for scraps — and the
          technology is identical in both. <strong>The economics sets the stakes; politics picks the
          outcome.</strong>
        </p>
      </Reveal>
    </section>
  );
}
