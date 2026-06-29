import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { SEED_COMMENTS } from '../conversation.js';

const LANES = 4;
const MAX_FLOAT = 20; // a few per lane, evenly spaced so they never overlap
const MAXLEN = 280;
const truncate = (s) => (s.length > 64 ? s.slice(0, 63).trimEnd() + '…' : s);
const initial = (name) => (name ? name.trim()[0].toUpperCase() : '“');

export default function BriefComments({ brief }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState(null);
  const [openIdx, setOpenIdx] = useState(null); // index into `floating`

  useEffect(() => {
    let ok = true;
    fetch(`/api/comments?brief=${encodeURIComponent(brief)}`)
      .then((r) => r.json())
      .then((d) => ok && Array.isArray(d.comments) && setComments(d.comments))
      .catch(() => {});
    return () => {
      ok = false;
    };
  }, [brief]);

  const submit = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t || status === 'sending') return;
    setStatus('sending');
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief, name: name.trim(), text: t }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) {
          setStatus('pending');
          setText('');
        } else setStatus('error');
      })
      .catch(() => setStatus('error'));
  };

  const floating = useMemo(() => {
    const real = comments.map((c) => ({ text: c.text, name: c.name }));
    const seeds = SEED_COMMENTS.map((t) => ({ text: t, name: null }));
    return [...real, ...seeds].slice(0, MAX_FLOAT);
  }, [comments]);

  const lanes = useMemo(() => {
    const out = Array.from({ length: LANES }, () => []);
    floating.forEach((c, i) => out[i % LANES].push({ ...c, idx: i }));
    return out;
  }, [floating]);

  // Modal browsing: ← / → flip through, Esc closes.
  const len = floating.length;
  useEffect(() => {
    if (openIdx == null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIdx(null);
      else if (e.key === 'ArrowRight') setOpenIdx((i) => (i + 1) % len);
      else if (e.key === 'ArrowLeft') setOpenIdx((i) => (i - 1 + len) % len);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [openIdx, len]);

  const cur = openIdx != null ? floating[openIdx] : null;
  const step = (d) => setOpenIdx((i) => (i + d + len) % len);

  return (
    <section className="convo" aria-label="The conversation">
      <h3 className="convo-h">The conversation</h3>
      <p className="convo-sub">Hover to pause · click any comment to read it in full · add yours below.</p>

      <div className="danmaku">
        {lanes.map((lane, li) => {
          const dur = 34 + li * 6; // seconds; lanes drift at slightly different speeds
          const k = lane.length || 1;
          return (
            <div className="danmaku-lane" key={li}>
              {lane.map((c, ci) => (
                <button
                  className="danmaku-pill"
                  key={c.idx}
                  onClick={() => setOpenIdx(c.idx)}
                  style={{
                    animationDuration: `${dur}s`,
                    animationDelay: `${(-(ci * dur) / k).toFixed(1)}s`,
                  }}
                >
                  <span className="danmaku-ava">{initial(c.name)}</span>
                  <span className="danmaku-txt">{truncate(c.text)}</span>
                </button>
              ))}
            </div>
          );
        })}
      </div>

      <form className="convo-form" onSubmit={submit}>
        <textarea
          className="convo-text"
          placeholder="Share your take on this…"
          value={text}
          maxLength={MAXLEN}
          rows={3}
          onChange={(e) => setText(e.target.value)}
          aria-label="Your comment"
        />
        <div className="convo-row">
          <input
            className="convo-name"
            placeholder="First name (optional)"
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
            aria-label="First name (optional)"
          />
          <span className="convo-count">
            {text.length}/{MAXLEN}
          </span>
          <button className="convo-send" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Posting…' : 'Post'}
          </button>
        </div>
      </form>
      {status === 'pending' && (
        <p className="convo-msg ok">Thank you — your comment is in the queue and will appear once it’s approved.</p>
      )}
      {status === 'error' && <p className="convo-msg err">That didn’t go through. Please try again in a moment.</p>}

      {cur &&
        createPortal(
          <div className="cmodal-back" onClick={() => setOpenIdx(null)}>
            <div className="cmodal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <button className="cmodal-x" onClick={() => setOpenIdx(null)} aria-label="Close">
                ×
              </button>
              <p className="cmodal-eyebrow">From the conversation</p>
              <blockquote className="cmodal-quote">{cur.text}</blockquote>
              <p className="cmodal-attr">— {cur.name ? cur.name : 'Anonymous'}</p>
              <div className="cmodal-nav">
                <button onClick={() => step(-1)} aria-label="Previous comment">
                  ←
                </button>
                <span className="cmodal-count">
                  {openIdx + 1} / {len}
                </span>
                <button onClick={() => step(1)} aria-label="Next comment">
                  →
                </button>
              </div>
              <p className="cmodal-hint">Use ← → to browse</p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
