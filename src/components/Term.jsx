import { Fragment, useState } from 'react';
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

// --- auto-glossing -------------------------------------------------------
// Build one matcher from every glossary term (and its alt spellings), longest
// phrase first so multi-word terms win over substrings.
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const PHRASES = [];
const PHRASE_TO_ID = {};
for (const [id, t] of Object.entries(TERMS)) {
  for (const phrase of t.match || [t.term]) {
    PHRASES.push(phrase);
    PHRASE_TO_ID[phrase.toLowerCase()] = id;
  }
}
PHRASES.sort((a, b) => b.length - a.length);
const GLOSS_SRC = `\\b(${PHRASES.map(esc).join('|')})\\b`;

// Render a plain string, wrapping the first occurrence of each known glossary
// term in a <Term>. Define a term once; it gets the underline+tooltip wherever
// it appears in copy passed through here.
export function Glossed({ text }) {
  if (!text) return null;
  const re = new RegExp(GLOSS_SRC, 'gi');
  const used = new Set();
  const out = [];
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    const matched = m[0];
    const tid = PHRASE_TO_ID[matched.toLowerCase()];
    if (m.index > last) out.push(text.slice(last, m.index));
    if (tid && !used.has(tid)) {
      used.add(tid);
      out.push(
        <Term id={tid} key={m.index}>
          {matched}
        </Term>
      );
    } else {
      out.push(matched);
    }
    last = m.index + matched.length;
  }
  out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}
