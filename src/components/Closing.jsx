import { Reveal } from './Charts.jsx';

const DIALS = [
  {
    q: 'How much replaces vs. assists?',
    a: 'If AI mostly makes workers faster, paychecks survive. If it removes the worker, they don\'t. This single dial decides whether the boom is shared or hoarded.',
  },
  {
    q: 'How fast does new work appear?',
    a: 'Every past wave eventually created more jobs than it destroyed — but "eventually" can be a decade of pain. Speed matters as much as direction.',
  },
  {
    q: 'Who owns the machines?',
    a: 'When output detaches from labour, income flows to whoever owns the AI. Whether that\'s a few firms or the broad public is a choice, not a law of nature.',
  },
];

export default function Closing() {
  return (
    <section className="closing" id="watch">
      <div className="section-head">
        <p className="eyebrow">What to watch</p>
        <h2>Three dials decide which decade we get</h2>
        <p className="lede">
          The technology is mostly settled — it works and it's spreading. What's still open is how we
          respond. Watch these three, in the news and in your own workplace.
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
