import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { SEED_COMMENTS } from '../conversation.js';

const LANES = 4;
const MAX_FLOAT = 12; // a few per lane, evenly spaced so they never overlap
const MAXLEN = 280;
const truncate = (s) => (s.length > 64 ? s.slice(0, 63).trimEnd() + '…' : s);
const initial = (name) => (name ? name.trim()[0].toUpperCase() : '“');

export default function BriefComments({ brief }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(null); // a comment being read in the modal

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

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
    floating.forEach((c, i) => out[i % LANES].push(c));
    return out;
  }, [floating]);

  return (
    <section className="convo" aria-label="The conversation">
      <h3 className="convo-h">The conversation</h3>
      <p className="convo-sub">Hover to pause · click any comment to read it in full · add yours below.</p>

      <div className="danmaku">
        {lanes.map((lane, li) => {
          const dur = 30 + li * 5; // seconds; lanes drift at slightly different speeds
          const k = lane.length || 1;
          return (
            <div className="danmaku-lane" key={li}>
              {lane.map((c, ci) => (
                <button
                  className="danmaku-pill"
                  key={ci}
                  onClick={() => setOpen(c)}
                  style={{ animationDuration: `${dur}s`, animationDelay: `${(-(ci * dur) / k).toFixed(1)}s` }}
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

      {open &&
        createPortal(
          <div className="cmodal-back" onClick={() => setOpen(null)}>
            <div className="cmodal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <button className="cmodal-x" onClick={() => setOpen(null)} aria-label="Close">
                ×
              </button>
              <p className="cmodal-eyebrow">From the conversation</p>
              <blockquote className="cmodal-quote">{open.text}</blockquote>
              <p className="cmodal-attr">— {open.name ? open.name : 'Anonymous'}</p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
