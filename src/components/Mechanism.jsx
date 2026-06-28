import { Reveal } from './Charts.jsx';
import Voice from './Voice.jsx';
import Term from './Term.jsx';

const STEPS = [
  {
    n: '01',
    title: 'GDP counts output, not people',
    body:
      'GDP measures what gets made — cars, code, answers — and never how many people made it. A factory that builds the same cars with a tenth of the workers posts the same GDP. The output stays. The paychecks vanish.',
  },
  {
    n: '02',
    title: 'A job is just a bundle of tasks',
    body:
      'For two centuries, doing a task and paying a person were the same act — the only way to get it done was to hire someone. Automation cuts that link one task at a time, until enough of a job is gone that the job is gone too.',
  },
  {
    n: '03',
    title: 'This time it comes for the thinking',
    body:
      'Every earlier machine replaced muscle and pushed people up into knowledge work. Generative AI comes for the knowledge work itself — drafting, coding, analyzing, advising. There is no higher rung left to climb to, and the model that does one white-collar task can do a million.',
    voice: 'keynes',
  },
  {
    n: '04',
    title: 'So output and jobs come apart',
    body:
      'Put it together. Production keeps rising because the machines are cheap, fast and tireless. The wages that used to ride along with it simply stop. GDP up, jobs down — not in spite of each other, but by the very same move.',
  },
];

export default function Mechanism() {
  return (
    <section className="mech" id="mechanism">
      <div className="section-head">
        <p className="eyebrow">The mechanism</p>
        <h2>How does an economy grow while shedding workers?</h2>
        <p className="lede">
          A booming economy hires — that's the instinct, and it comes from a world where the only way to
          make more was to employ more. <Voice id="brynjolfsson" /> AI breaks that rule — economists
          call the result <Term id="decoupling">the great decoupling</Term>. Here's how, in four steps.
        </p>
        <p className="voice-hint">
          <b>❝</b> The chips scattered through this page are real arguments — from economists, builders
          and critics. Hover or tap to read them; every link goes to the source.
        </p>
      </div>

      <div className="steps">
        {STEPS.map((s) => (
          <Reveal key={s.n} className="step">
            <div className="step-n">{s.n}</div>
            <div className="step-body">
              <h3>{s.title}</h3>
              <p>
                {s.body} {s.voice && <Voice id={s.voice} />}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="task-demo">
        <h3 className="task-demo-title">One job, task by task</h3>
        <p className="task-demo-sub">
          A role doesn't vanish overnight. It hollows out — each automated task still produces value, it
          just stops producing a paycheck. <Voice id="graeber" />
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
          Same output, or more. The wage bill for this job just fell by two-thirds — and GDP never
          flinched.
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
