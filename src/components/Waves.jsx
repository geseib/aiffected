import { Reveal } from './Charts.jsx';
import Voice from './Voice.jsx';

const WAVES = [
  {
    n: 1,
    cls: 'w1',
    name: 'Cognition',
    when: 'Here now',
    what: 'Minds',
    body:
      'The work that happens at a desk: writing, code, analysis, images, support. The knowledge economy — for decades the safe, well-paid high ground — is first in range.',
    line: 'Output climbs in the office while headcount quietly falls.',
    voice: 'andreessen',
  },
  {
    n: 2,
    cls: 'w2',
    name: 'Robotics',
    when: 'This decade',
    what: 'Bodies',
    body:
      'Cheap, dexterous robots that can see, grip and move reach physical work: warehouses, delivery, assembly, electronics repair, cleaning — eventually hands-on care. The manual jobs people fled into for safety stop being safe.',
    line: 'The escape route from Wave 1 closes.',
  },
  {
    n: 3,
    cls: 'w3',
    name: 'Autonomy',
    when: 'The discontinuity',
    what: 'Itself',
    body:
      'Systems that set their own goals, improve their own design and replicate — running the whole loop with barely a human in it. This is different in kind, not degree.',
    line: 'The question flips: not “how do we share the work?” but “do we stay in the loop at all?”',
    voice: 'harari',
  },
];

export default function Waves() {
  return (
    <section className="waves" id="waves">
      <div className="section-head">
        <p className="eyebrow">Three waves</p>
        <h2>It doesn't arrive all at once. It arrives in waves.</h2>
        <p className="lede">
          Everything above is <strong>Wave 1</strong> — AI coming for desk work. It doesn't stop there.
          Each wave stacks on the last, dragging more of the economy across the line where output no
          longer needs a worker. Switch between them in the simulator and watch the floor drop.
        </p>
      </div>

      <div className="waves-row">
        {WAVES.map((w) => (
          <Reveal key={w.n} className={`wave-card ${w.cls}`}>
            <div className="wave-card-top">
              <span className="wave-card-n">Wave {w.n}</span>
              <span className="wave-card-when">{w.when}</span>
            </div>
            <h3>{w.name}</h3>
            <p className="wave-card-what">Automating: {w.what}</p>
            <p className="wave-card-body">{w.body}</p>
            <p className="wave-card-line">
              {w.line} {w.voice && <Voice id={w.voice} />}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="waves-foot">
        <p>
          Each wave grows GDP faster than the last and reaches further into the workforce. The first is
          underway. The second is being built in robotics labs right now. The third is the one nobody can
          yet price — <strong>so try pricing it yourself.</strong>
        </p>
      </Reveal>
    </section>
  );
}
