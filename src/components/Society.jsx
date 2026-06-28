import { Reveal } from './Charts.jsx';
import SocialContract from './SocialContract.jsx';
import Voice from './Voice.jsx';

export default function Society() {
  return (
    <section className="society" id="society">
      <div className="section-head">
        <p className="eyebrow">How societies restructure</p>
        <h2>If income stops coming from jobs, where does it come from?</h2>
        <p className="lede">
          For two centuries, "get a job" was society's answer to "how do I live?" AI is fraying that
          link <Voice id="piketty" /> — and the question doesn't vanish, it just climbs to the level of
          how we organize everything. There's no neutral answer, so don't look for one.{' '}
          <strong>Take a position.</strong> Decide each dilemma below; every choice argues back, your
          answers name the society you'd build, and the panel tallies what your model fixes and what it
          quietly leaves open — because a paycheck was never the only thing a job paid out.{' '}
          <Voice id="sinek" />
        </p>
      </div>

      <SocialContract />

      <Reveal className="society-note">
        <p>
          None of this is automatic. The same +20% of output can fund a broadly shared golden age or
          pile up behind a few owners while everyone else fights for scraps — same technology, either
          way. <strong>The economics sets the stakes; politics picks the outcome.</strong>{' '}
          <Voice id="obama" /> <Voice id="bregman" /> Which is to say: this was never really a question
          about machines.
        </p>
      </Reveal>
    </section>
  );
}
