import { useState } from 'react';
import { TERMS } from '../glossary.js';

// Inline glossed term: dotted underline, plain-language definition on hover (and
// on tap, where there's no hover).
export default function Term({ id, children }) {
  const [open, setOpen] = useState(false);
  const t = TERMS[id];
  if (!t) return children;
  return (
    <span className="term-wrap">
      <button
        className={`term ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {children || t.term}
      </button>
      <span className="term-pop" role="tooltip">
        {t.def}
      </span>
    </span>
  );
}
