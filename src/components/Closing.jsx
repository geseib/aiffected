import { Reveal } from './Charts.jsx';

const DIALS = [
  {
    q: 'Replace, or assist?',
    a: 'If AI makes workers faster, paychecks survive. If it removes the worker, they don\'t. This one dial decides whether the boom is shared or hoarded.',
  },
  {
    q: 'How fast does new work appear?',
    a: 'Every past wave eventually made more jobs than it killed. But "eventually" can be a decade of wreckage — and speed matters as much as direction.',
  },
  {
    q: 'Who owns the machines?',
    a: 'When output detaches from labour, the income flows to whoever owns the AI. A few firms, or the broad public — that\'s a choice, not a law.',
  },
];

export default function Closing() {
  return (
    <section className="closing" id="watch">
      <div className="section-head">
        <p className="eyebrow">What to watch</p>
        <h2>Three dials decide which decade we get</h2>
        <p className="lede">
          The technology is mostly settled. It works, and it's spreading. What's still open is what we do
          about it — so watch these three, in the headlines and in your own job.
        </p>
      </div>

      <div className="dials">
        {DIALS.map((d, i) => (
          <Reveal key={d.q} className="dial">
            <span className="dial-n">{i + 1}</span>
            <h3>{d.q}</h3>
            <p>{d.a}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="closing-final">
        <h2>
          The machines deciding <em>what</em> we can produce is an engineering problem.
          <br />
          Deciding <em>who it's for</em> is the only question that was ever really up to us.
        </h2>
        <a className="hero-cta" href="#simulator">
          ↑ Go back and build a better scenario
        </a>
      </Reveal>

      <footer className="foot">
        <p>
          <strong>aiffected</strong> — an interactive explainer. The model is intentionally simplified to
          make the mechanics visible; it is not a forecast, and the sector figures are illustrative.
          Built to start a conversation, not to end one.
        </p>
      </footer>
    </section>
  );
}
