import { VOICES } from '../voices.js';
import { useVoices } from './VoicesContext.jsx';

// Inline citation chip. Sits at the end of a claim like a footnote; hover blooms
// a preview, click opens the full quote + source.
export default function Voice({ id }) {
  const { open } = useVoices();
  const v = VOICES[id];
  if (!v) return null;
  return (
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
        <span className="voice-pop-quote">{v.preview}</span>
        <span className="voice-pop-hint">click to read &amp; source ↗</span>
      </span>
    </span>
  );
}
