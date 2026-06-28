import { VOICES } from '../voices.js';
import { useVoices } from './VoicesContext.jsx';

// Inline citation chip. Sits at the end of a claim like a footnote; hover blooms
// a preview, click opens the full quote + source. If the voice has a credible
// counter, a ⇄ icon follows it — hover for the counterpoint's quote + source.
export default function Voice({ id }) {
  const { open } = useVoices();
  const v = VOICES[id];
  if (!v) return null;
  const c = v.counter ? VOICES[v.counter] : null;

  return (
    <span className="voice-outer">
      <span className="voice-wrap">
        <button
          className={`voice-chip camp-${v.camp}`}
          onClick={() => open(id)}
          aria-label={`Read a quote from ${v.name}`}
        >
          <span className="voice-mark">❝</span>
          {v.short}
        </button>
        <span className="voice-pop" role="tooltip" aria-hidden="true">
          <span className="voice-pop-name">{v.name}</span>
          <span className={`voice-pop-quote ${v.verbatim === false ? 'para' : ''}`}>{v.preview}</span>
          <span className="voice-pop-hint">
            {v.verbatim === false ? 'paraphrase · click for source ↗' : 'click to read & source ↗'}
          </span>
        </span>
      </span>

      {c && (
        <span className="voice-counter">
          <button
            className={`voice-counter-btn camp-${c.camp}`}
            onClick={() => open(v.counter)}
            aria-label={`Counterpoint from ${c.name}`}
            title={`Counterpoint: ${c.name}`}
          >
            ⇄
          </button>
          <span className="voice-counter-pop" role="tooltip">
            <span className="vc-label">⇄ Counterpoint</span>
            <span className="vc-name">{c.name}</span>
            <span className="vc-role">{c.role}</span>
            <span className={`vc-quote ${c.verbatim === false ? 'para' : ''}`}>{c.preview}</span>
            <a className="vc-source" href={c.source.url} target="_blank" rel="noopener noreferrer">
              {c.source.label} ↗
            </a>
          </span>
        </span>
      )}
    </span>
  );
}
