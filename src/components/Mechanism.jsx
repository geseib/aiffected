import { Reveal } from './Charts.jsx';

const STEPS = [
  {
    n: '01',
    title: 'GDP counts output, not people',
    body:
      "Gross Domestic Product is the value of everything produced — goods, services, software, answers. It has never measured how many humans were involved. A factory that makes the same cars with a tenth of the workers produces the same GDP. The paycheck disappears; the output doesn't.",
  },
  {
    n: '02',
    title: 'A task is where the wage and the work meet',
    body:
      'Most jobs are bundles of tasks. For two centuries, doing a task and paying a person were the same act — the only way to get the task done was to hire someone. Automation quietly breaks that link, one task at a time, until enough of a job is gone that the role is gone.',
  },
  {
    n: '03',
    title: 'AI automates cognition, not just muscle',
    body:
      'Earlier machines replaced physical labour and pushed people up into thinking work. Generative AI reaches into that thinking work itself — drafting, coding, analyzing, supporting, designing. There is no obvious higher rung to climb to, and the same model that does one office task can do thousands.',
  },
  {
    n: '04',
    title: 'So output and employment come apart',
    body:
      'Put it together: production keeps rising because the machines are cheap and tireless, while the wages that used to ride along with that production simply stop being paid. GDP up, jobs down — not despite each other, but through the very same mechanism.',
  },
];

export default function Mechanism() {
  return (
    <section className="mech" id="mechanism">
      <div className="section-head">
        <p className="eyebrow">The mechanism</p>
        <h2>How does an economy grow while shedding workers?</h2>
        <p className="lede">
          The instinct is that a booming economy must be hiring. That instinct comes from a world where
          output could only grow by adding human effort. Four steps break that assumption.
        </p>
      </div>

      <div className="steps">
        {STEPS.map((s) => (
          <Reveal key={s.n} className="step">
            <div className="step-n">{s.n}</div>
            <div className="step-body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="task-demo">
        <h3 className="task-demo-title">One job, task by task</h3>
        <p className="task-demo-sub">
          A role disappears gradually, not all at once. Each automated task keeps producing value —
          it just stops producing a paycheck.
        </p>
        <div className="tasks">
          {TASK_TILES.map((t) => (
            <div key={t.label} className={`task ${t.auto ? 'auto' : ''}`}>
              <span className="task-icon">{t.auto ? '🤖' : '🧑'}</span>
              <span className="task-label">{t.label}</span>
              <span className="task-state">{t.auto ? 'automated' : 'still human'}</span>
            </div>
          ))}
        </div>
        <p className="task-demo-foot">
          Output is unchanged or higher. The wage bill for this role has fallen by two-thirds — and GDP
          never noticed.
        </p>
      </Reveal>
    </section>
  );
}

const TASK_TILES = [
  { label: 'Draft the report', auto: true },
  { label: 'Answer routine tickets', auto: true },
  { label: 'Write boilerplate code', auto: true },
  { label: 'Summarize the meeting', auto: true },
  { label: 'Handle the hard exception', auto: false },
  { label: 'Own the relationship', auto: false },
];
