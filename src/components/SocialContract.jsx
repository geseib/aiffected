import { useMemo, useState } from 'react';

// ---------------------------------------------------------------------------
// "Draft your social contract" — an interactive board of value-dilemmas that
// AI forces on a society. The reader takes a position on each; every choice
// answers back with an ally voice and a challenge voice, and the whole pattern
// is synthesized into a political-philosophy compass + an archetype + the
// contradictions hiding in the reader's own answers.
//
// Two axes:
//   x:  market (−)  ……  collective (+)     — who owns & steers
//   y:  work-centric (−)  ……  post-work (+) — is income/meaning tied to jobs
// ---------------------------------------------------------------------------

const DILEMMAS = [
  {
    id: 'income',
    axis: 'y',
    eyebrow: 'Income & survival',
    q: 'Should a decent life require having a job?',
    context:
      'Once AI can do much of the work, the link between holding a job and being able to live starts to stretch.',
    options: [
      {
        id: 'earn',
        label: 'You earn your living',
        score: -1,
        ally: 'Earning your keep has held for centuries — it ties reward to contribution and keeps effort meaningful.',
        challenge:
          "If there aren't enough jobs to go around, “earn your living” quietly becomes “go without” for millions who'd work if they could.",
      },
      {
        id: 'mix',
        label: 'A floor — plus more if you work',
        score: 0,
        ally: 'A floor that work builds on keeps both the safety and the incentive: nobody starves, but effort still pays.',
        challenge:
          "It all rides on the dial — set the floor too low and it's no safety net; too high and the reward for working stops mattering.",
      },
      {
        id: 'floor',
        label: 'Everyone gets a floor, job or not',
        score: 1,
        ally: 'Unhook survival from employment and a lost job becomes a transition, not a catastrophe — exactly the shock AI is about to deliver.',
        challenge:
          'A floor for all is enormously expensive, and critics warn it can loosen the link between contribution and reward that makes an economy run.',
      },
    ],
  },
  {
    id: 'meaning',
    axis: 'y',
    eyebrow: 'The point of work',
    q: 'If machines can do the work, what are people for?',
    context:
      "Work isn't only income — it's identity, structure, status, community. AI asks what's left when the tasks are automated.",
    options: [
      {
        id: 'protect',
        label: 'Work is meaning — protect jobs',
        score: -1,
        ally: 'For most people a job is where purpose, routine and dignity come from. Defend that and you defend something money cannot replace.',
        challenge:
          'Protecting jobs can shade into preserving busywork — paying people to do what a machine already does better, just to keep them occupied.',
      },
      {
        id: 'redefine',
        label: 'Shift what counts as work',
        score: 0,
        ally: 'Care, community, art and learning are real work the market underpays. Redirect people there and work expands rather than vanishes.',
        challenge:
          "Someone still has to value and fund that work — calling it important doesn't automatically pay anyone's rent.",
      },
      {
        id: 'liberate',
        label: 'Free people from toil',
        score: 1,
        ally: "Most of history's drudgery was never the point. If machines take it, that's the promise of progress finally paying out as time and freedom.",
        challenge:
          'A life without imposed work sounds great until you ask what replaces the structure, status and belonging that jobs quietly provided.',
      },
    ],
  },
  {
    id: 'net',
    axis: 'y',
    eyebrow: 'The safety net',
    q: 'When a wave of jobs goes — cushion, or springboard?',
    context:
      'You can catch displaced people with security, or launch them toward new work. Money and attention are finite — which comes first?',
    options: [
      {
        id: 'spring',
        label: 'Springboard them back to work',
        score: -1,
        ally: 'Reskilling and new-sector investment treat displacement as temporary and keep people as earners, not dependents.',
        challenge:
          "Retraining assumes the new jobs exist and people can reach them in time — you can't reskill a 50-year-old trucker into an AI specialist overnight, or at scale.",
      },
      {
        id: 'both',
        label: 'Both, in balance',
        score: 0,
        ally: "Catch people and move them — a cushion that doesn't trap, a springboard that doesn't drop anyone. Most successful transitions did both.",
        challenge:
          "“Both” is easy to say and expensive to do; when budgets tighten, one of them always gets cut first.",
      },
      {
        id: 'secure',
        label: 'Cushion — guarantee security first',
        score: 1,
        ally: 'You cannot retrain from a position of panic. Guaranteed security is the floor that makes every other adjustment possible.',
        challenge:
          'A cushion with no springboard risks leaving whole regions on permanent support — secure, but sidelined.',
      },
    ],
  },
  {
    id: 'windfall',
    axis: 'x',
    eyebrow: 'The windfall',
    q: 'Who should the AI windfall belong to?',
    context:
      "AI's gains flow first to whoever owns the models, data and compute. Whether they stay there is a choice, not a law of nature.",
    options: [
      {
        id: 'builders',
        label: 'Those who built and funded it',
        score: -1,
        ally: 'Reward the risk-takers and you keep the engine of investment running — nobody builds the next breakthrough if the upside is confiscated.',
        challenge:
          "When a few firms capture gains built on everyone's data and decades of public research, “they earned it” starts to wobble.",
      },
      {
        id: 'tax',
        label: 'Markets keep it — taxed to share some',
        score: 0,
        ally: 'Let markets allocate, then tax the windfall to fund the commons — the model that built every modern social democracy.',
        challenge:
          'Capital is mobile and good at avoiding tax; the windfall can slip offshore faster than any treasury can catch it.',
      },
      {
        id: 'shared',
        label: 'A shared inheritance for everyone',
        score: 1,
        ally: "Today's AI stands on centuries of collective knowledge and public data — treating its gains as a common inheritance has a real moral claim.",
        challenge:
          "Declaring the gains “everyone's” is easy; doing it without killing the incentive to build the thing in the first place is the hard part.",
      },
    ],
  },
  {
    id: 'steer',
    axis: 'x',
    eyebrow: 'Who steers',
    q: 'Who should steer the transition?',
    context:
      'Someone sets the pace and the rules — or no one does, and the market sets them by default.',
    options: [
      {
        id: 'market',
        label: 'Markets and firms — they move fastest',
        score: -1,
        ally: 'Decentralized markets adapt faster than any committee, finding uses and fixes no central planner could foresee.',
        challenge:
          'Markets optimize for profit, not for whether your town still has work in ten years. Speed is not the same as direction.',
      },
      {
        id: 'guardrails',
        label: 'Light guardrails, mostly markets',
        score: 0,
        ally: 'Set a few rules of the road and let markets run — fast, but not feral.',
        challenge:
          '“Light” guardrails have a way of being written by the very firms they are meant to guard against.',
      },
      {
        id: 'democratic',
        label: 'Democratic institutions must steer',
        score: 1,
        ally: 'A shift this big touches everyone, so everyone should have a say — through elections and public institutions, not only shareholders.',
        challenge:
          'Democratic steering is slow and capturable; by the time policy catches up, the technology has moved three steps on.',
      },
    ],
  },
  {
    id: 'ownership',
    axis: 'x',
    eyebrow: 'Ownership',
    q: 'How concentrated should AI ownership be?',
    context:
      'If output detaches from labour, owning the machines is how you share in the boom. So who owns them matters enormously.',
    options: [
      {
        id: 'winners',
        label: 'Let the winners win',
        score: -1,
        ally: 'Concentration often reflects who built the best thing; breaking that up can punish success and slow the very progress we want.',
        challenge:
          "When a few owners capture an economy-wide windfall, you don't just get inequality — you get political power that's hard to vote against.",
      },
      {
        id: 'watch',
        label: 'Allow it, but watch it closely',
        score: 0,
        ally: 'Antitrust and transparency can keep dominant players honest without dismantling what works.',
        challenge:
          'Watching closely rarely keeps pace with firms that can out-lawyer and out-lobby any regulator.',
      },
      {
        id: 'spread',
        label: 'Spread ownership broadly',
        score: 1,
        ally: 'Sovereign wealth funds, broad equity and data dividends let everyone own a slice of the machines. If capital wins, make everyone a capitalist.',
        challenge:
          'Spreading ownership by fiat is hard to design and easy to botch — get it wrong and you blunt the incentives that make the assets valuable.',
      },
    ],
  },
];

const ARCHETYPES = {
  frontier: {
    name: 'Frontier Capitalism',
    tag: 'Markets lead · work earns',
    body:
      'Minimal intervention. Jobs are how you earn, owners keep the upside, and the market sorts the rest. The most dynamic path on paper — and the one where the GDP-up / jobs-down gap bites hardest if the new work is slow to arrive.',
    thrives: 'Owners, top talent, the highly adaptable',
    squeezed: 'Displaced mid-skill workers with no floor',
    reflect: "If the market doesn't create enough new jobs in time, what's your backup — and who pays for it?",
  },
  private: {
    name: 'Private Abundance',
    tag: 'Markets lead · life beyond work',
    body:
      'Markets make everything cheap and may fund private or charitable safety nets, freeing people from work — but ownership and power stay concentrated. The deep question hangs over it: who pays for the floor when the market keeps the gains?',
    thrives: 'Consumers, AI owners',
    squeezed: 'Anyone wanting a say in how it is run',
    reflect: 'If goods are cheap but income is scarce, abundance for whom?',
  },
  republic: {
    name: 'Full-Employment Republic',
    tag: 'Collective · work stays central',
    body:
      'Public investment, shorter weeks and job guarantees keep everyone contributing. Society stays organized around work — now consciously shared out rather than left to the market. The risk: defending jobs for their own sake, even ones machines do better.',
    thrives: 'Workers, communities, regions',
    squeezed: 'Taxpayers who fund it; raw efficiency',
    reflect: 'Is there dignity in a job a machine could do better — and who gets to decide?',
  },
  commons: {
    name: 'The Commons',
    tag: 'Collective · life beyond work',
    body:
      'Shared ownership of AI funds a universal income or dividend; work becomes something you choose, not something you need. The boldest break with the past — and the one that most has to answer for meaning, funding, and free-riding.',
    thrives: 'Almost everyone gets a baseline',
    squeezed: 'High earners and builders who fund it',
    reflect: 'If no one has to work, what gives a life shape, status and belonging?',
  },
  mix: {
    name: 'The Pragmatic Mix',
    tag: 'A bit of everything',
    body:
      'Some redistribution, some market, work still central but cushioned. Where most real societies will actually land — muddling toward balance rather than committing to any pure model. Coherent enough to govern, blurry enough to disappoint everyone a little.',
    thrives: 'The median household, mostly',
    squeezed: "Whoever's priority lost the compromise",
    reflect: 'Every compromise leaves someone out. In your blend, who?',
  },
};

const TENSIONS = [
  {
    when: (s) => s.income === 'floor' && s.windfall === 'builders',
    title: 'Floor without funding',
    body: "You'd guarantee everyone a floor, yet leave the AI windfall with its owners. The floor has to be paid for — this gap is the central political fight of the whole transition.",
  },
  {
    when: (s) => s.meaning === 'liberate' && s.income === 'earn',
    title: 'Freedom without income',
    body: "You'd free people from work but still tie income to holding a job. If the jobs thin out, that pairing risks leaving people with neither.",
  },
  {
    when: (s) => s.steer === 'democratic' && s.ownership === 'winners',
    title: 'Steering without leverage',
    body: 'You want the public to steer the transition while ownership concentrates. Whoever owns the machines holds the real leverage — steering gets very hard from the outside.',
  },
  {
    when: (s) => s.meaning === 'protect' && s.net === 'secure',
    title: 'Two ideas of dignity',
    body: 'You see dignity in work, but also want security regardless of work. Humane — but when they pull against each other, you will have to decide which one wins.',
  },
  {
    when: (s) => s.steer === 'market' && s.net === 'secure',
    title: 'Hands-off, full cushion',
    body: "You'd let markets run the show yet guarantee a generous cushion. A hands-off state collects less tax — so who funds the cushion you're counting on?",
  },
];

// What a job quietly provides beyond the paycheck. An income floor refunds the
// first line; it leaves the other four open. That gap — boredom, drift, loss of
// purpose and contribution — is the risk a money-only answer can't see.
const LEDGER = [
  { facet: 'A wage', note: 'income to live on', solved: true },
  { facet: 'A shape to the day', note: 'somewhere to be, a reason to get up', solved: false },
  { facet: 'A sense of contributing', note: 'the feeling of mattering to others', solved: false },
  { facet: 'Status & identity', note: '“so… what do you do?”', solved: false },
  { facet: 'A place to belong', note: 'colleagues, a team, a “we”', solved: false },
];

function ledgerVerdict(y) {
  if (y >= 0.34)
    return "Your contract pays the wage — and says nothing about the other four. It's cheap to hand someone an income; it's hard to give them a Monday that matters. Boredom, drift and a slow loss of purpose are risks your society has to take as seriously as poverty. The ones that make this work will have to grow meaning on purpose — through care, craft, community and play — the way earlier ones grew jobs.";
  if (y <= -0.34)
    return 'Your contract guards these fiercely — maybe too fiercely. Keeping work for the structure and standing it brings can trap people in jobs that exist mainly to occupy them, long after the machine could do the task itself.';
  return "You're trying to keep what work gives without forcing the work itself — the hardest needle to thread. Whether a sense of contribution can survive being unhooked from employment is the open question your whole society rests on.";
}

function synthesize(sel) {
  const mean = (axis) => {
    const vals = DILEMMAS.filter((d) => d.axis === axis)
      .map((d) => (sel[d.id] ? d.options.find((o) => o.id === sel[d.id]).score : null))
      .filter((v) => v !== null);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  };
  const x = mean('x');
  const y = mean('y');
  const answered = Object.keys(sel).length;

  let key = 'mix';
  if (Math.abs(x) < 0.34 && Math.abs(y) < 0.34) key = 'mix';
  else if (x < 0 && y < 0) key = 'frontier';
  else if (x < 0 && y >= 0) key = 'private';
  else if (x >= 0 && y < 0) key = 'republic';
  else key = 'commons';

  return { x, y, answered, key, archetype: ARCHETYPES[key], tensions: TENSIONS.filter((t) => t.when(sel)) };
}

function Compass({ x, y, show }) {
  const c = 130;
  const reach = 96;
  const px = c + x * reach;
  const py = c - y * reach;
  return (
    <svg viewBox="0 0 260 260" className="sc-compass" role="img" aria-label="Your position on the social-contract compass">
      <rect x="14" y="14" width="232" height="232" rx="14" className="sc-comp-bg" />
      {/* quadrant tints */}
      <rect x="14" y="14" width="116" height="116" className="sc-quad q-private" />
      <rect x="130" y="14" width="116" height="116" className="sc-quad q-commons" />
      <rect x="14" y="130" width="116" height="116" className="sc-quad q-frontier" />
      <rect x="130" y="130" width="116" height="116" className="sc-quad q-republic" />
      <line x1="130" y1="22" x2="130" y2="238" className="sc-axis" />
      <line x1="22" y1="130" x2="238" y2="130" className="sc-axis" />
      {/* quadrant labels */}
      <text x="26" y="34" className="sc-quad-label">Private Abundance</text>
      <text x="234" y="34" textAnchor="end" className="sc-quad-label">The Commons</text>
      <text x="26" y="232" className="sc-quad-label">Frontier Capitalism</text>
      <text x="234" y="232" textAnchor="end" className="sc-quad-label">Full-Employment</text>
      {/* axis ends */}
      <text x="130" y="252" textAnchor="middle" className="sc-axis-end">Work-centric</text>
      <text x="130" y="11" textAnchor="middle" className="sc-axis-end">Post-work</text>
      <text x="8" y="133" className="sc-axis-end sc-vert">Market</text>
      <text x="252" y="133" textAnchor="end" className="sc-axis-end sc-vert">Collective</text>
      {show && (
        <g className="sc-dot-g" style={{ transform: `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)` }}>
          <circle r="9" className="sc-dot-halo" />
          <circle r="5" className="sc-dot" />
        </g>
      )}
    </svg>
  );
}

export default function SocialContract() {
  const [sel, setSel] = useState({});
  const r = useMemo(() => synthesize(sel), [sel]);
  const total = DILEMMAS.length;

  const pick = (dId, oId) => setSel((s) => ({ ...s, [dId]: oId }));
  const reset = () => setSel({});

  return (
    <div className="sc">
      <div className="sc-grid">
        {/* The board */}
        <div className="sc-board">
          {DILEMMAS.map((d) => {
            const chosen = sel[d.id];
            const opt = chosen && d.options.find((o) => o.id === chosen);
            return (
              <div className={`sc-card ${chosen ? 'answered' : ''}`} key={d.id}>
                <p className="sc-eyebrow">{d.eyebrow}</p>
                <h3 className="sc-q">{d.q}</h3>
                <p className="sc-context">{d.context}</p>
                <div className="sc-opts">
                  {d.options.map((o) => (
                    <button
                      key={o.id}
                      className={`sc-opt ${chosen === o.id ? 'on' : ''}`}
                      aria-pressed={chosen === o.id}
                      onClick={() => pick(d.id, o.id)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                {opt && (
                  <div className="sc-voices" key={opt.id}>
                    <div className="sc-voice ally">
                      <span className="sc-voice-tag">✓ The case for</span>
                      <p>{opt.ally}</p>
                    </div>
                    <div className="sc-voice challenge">
                      <span className="sc-voice-tag">⚡ The pushback</span>
                      <p>{opt.challenge}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* The synthesis */}
        <aside className="sc-aside">
          <div className="sc-panel">
            <div className="sc-panel-head">
              <h3 className="panel-title">The society you're building</h3>
              <span className="sc-count">
                {r.answered}/{total}
              </span>
            </div>

            <Compass x={r.x} y={r.y} show={r.answered > 0} />

            {r.answered < 4 ? (
              <p className="sc-hint">
                Take a position on at least four dilemmas and the shape of your social contract will
                emerge here — along with the contradictions hiding inside it.
              </p>
            ) : (
              <div className="sc-archetype">
                <p className="sc-arch-tag">{r.archetype.tag}</p>
                <h4 className="sc-arch-name">{r.archetype.name}</h4>
                <p className="sc-arch-body">{r.archetype.body}</p>
                <div className="sc-arch-who">
                  <span><strong>Thrives:</strong> {r.archetype.thrives}</span>
                  <span><strong>Squeezed:</strong> {r.archetype.squeezed}</span>
                </div>
              </div>
            )}

            {r.answered >= 4 && (
              <div className="sc-ledger">
                <p className="sc-ledger-head">The human ledger</p>
                <p className="sc-ledger-sub">
                  A paycheck was never the only thing a job paid out. Money can replace one line here —
                  not the rest:
                </p>
                <ul className="sc-ledger-list">
                  {LEDGER.map((l) => (
                    <li key={l.facet} className={l.solved ? 'solved' : 'open'}>
                      <span className="sc-ledger-mark">{l.solved ? 'refunded' : 'open'}</span>
                      <span className="sc-ledger-facet">{l.facet}</span>
                      <span className="sc-ledger-note">{l.note}</span>
                    </li>
                  ))}
                </ul>
                <p className="sc-ledger-verdict">{ledgerVerdict(r.y)}</p>
              </div>
            )}

            {r.tensions.length > 0 && (
              <div className="sc-tensions">
                <p className="sc-tensions-head">⚠ Tensions in your own answers</p>
                {r.tensions.map((t) => (
                  <div className="sc-tension" key={t.title}>
                    <strong>{t.title}.</strong> {t.body}
                  </div>
                ))}
              </div>
            )}

            {r.answered >= 4 && r.tensions.length === 0 && (
              <div className="sc-tensions">
                <p className="sc-tensions-head">✓ A coherent worldview</p>
                <div className="sc-tension">
                  Your choices hang together unusually well. The only test left is whether reality turns
                  out to be as tidy as your model of it.
                </div>
              </div>
            )}

            {r.answered >= 4 && (
              <div className="sc-reflect">
                <span>Sit with this</span>
                <p>{r.archetype.reflect}</p>
              </div>
            )}

            {r.answered > 0 && (
              <button className="sc-reset" onClick={reset}>
                ↺ Start over
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
