import { Reveal } from './Charts.jsx';
import SocialContract from './SocialContract.jsx';

export default function Society() {
  return (
    <section className="society" id="society">
      <div className="section-head">
        <p className="eyebrow">How societies restructure</p>
        <h2>If income stops coming from jobs, where does it come from?</h2>
        <p className="lede">
          For 200 years, "get a job" has been society's answer to "how do I live?" When AI weakens that
          link, the question doesn't disappear — it moves up to the level of how we organize everything.
          There's no neutral answer, so don't look for one here. <strong>Take a position instead.</strong>{' '}
          Decide each dilemma below; every choice will argue back, your pattern of answers will name the
          society you'd actually build — and it will tally what your model fixes and what it quietly
          leaves open, because a paycheck was never the only thing a job paid out.
        </p>
      </div>

      <SocialContract />

      <Reveal className="society-note">
        <p>
          None of these is automatic. The same +20% of output can fund a broadly shared golden age or
          pile up behind a handful of owners while everyone else competes for scraps — and the
          technology is identical in both. <strong>The economics sets the stakes; politics picks the
          outcome.</strong> Which is to say: this was never really a question about machines.
        </p>
      </Reveal>
    </section>
  );
}
