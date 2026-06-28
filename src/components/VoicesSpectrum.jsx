import { VOICES, VOICE_ORDER, CAMPS, SPECTRUM_ENDS } from '../voices.js';
import { useVoices } from './VoicesContext.jsx';
import { Reveal } from './Charts.jsx';

export default function VoicesSpectrum() {
  const { open } = useVoices();
  return (
    <section className="voices" id="voices">
      <div className="section-head">
        <p className="eyebrow">The chorus</p>
        <h2>The argument is already happening</h2>
        <p className="lede">
          None of this is settled. The smartest people alive disagree — loudly — about whether this ends
          in abundance or wreckage, and about who gets to decide. Here's the spread, from the builders
          who say the technology delivers to the economists and critics who say it's a political choice.
          Tap any of them. Then go read the source.
        </p>
      </div>

      <Reveal className="spectrum">
        <div className="spectrum-bar">
          <span className="spectrum-end left">{SPECTRUM_ENDS[0]}</span>
          <span className="spectrum-end right">{SPECTRUM_ENDS[1]}</span>
          <div className="spectrum-track">
            {VOICE_ORDER.map((id) => (
              <span
                key={id}
                className={`spectrum-dot camp-${VOICES[id].camp}`}
                style={{ left: `${VOICES[id].pos}%` }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <div className="voice-cards">
          {VOICE_ORDER.map((id) => {
            const v = VOICES[id];
            return (
              <button key={id} className={`voice-card camp-${v.camp}`} onClick={() => open(id)}>
                <span className="voice-card-mono">{v.monogram}</span>
                <span className="voice-card-body">
                  <span className="voice-card-name">{v.name}</span>
                  <span className="voice-card-role">{v.role}</span>
                  <span className="voice-card-quote">{v.preview}</span>
                </span>
                <span className="voice-card-camp">{CAMPS[v.camp].label}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <p className="voices-foot">
        Quotes are drawn from the linked works and public interviews — follow each link to read them in
        full and in context. A chorus, not a verdict: the disagreement is the point.
      </p>
    </section>
  );
}
