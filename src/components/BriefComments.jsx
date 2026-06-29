import { useEffect, useMemo, useState } from 'react';
import { SEED_COMMENTS, PALETTE } from '../conversation.js';

const LANES = 3;
const MAX_FLOAT = 30;

export default function BriefComments({ brief }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState(null);

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

  // Real approved comments first, then seeds to keep the band alive, capped.
  const floating = useMemo(() => {
    const real = comments.map((c) => ({ text: c.text, name: c.name, color: c.color || PALETTE[0] }));
    const seeds = SEED_COMMENTS.map((t, i) => ({ text: t, name: null, color: PALETTE[i % PALETTE.length] }));
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
      <p className="convo-sub">Hover to pause and read. Add your take — it joins once it’s approved.</p>

      <div className="danmaku">
        {lanes.map((lane, li) => (
          <div className="danmaku-lane" key={li}>
            {lane.map((c, ci) => (
              <span
                className="danmaku-pill"
                key={ci}
                style={{
                  '--c': c.color,
                  animationDuration: `${16 + (c.text.length % 12)}s`,
                  animationDelay: `${-(ci * 7) - li * 3}s`,
                }}
              >
                {c.text}
                {c.name ? <em className="danmaku-name"> — {c.name}</em> : null}
              </span>
            ))}
          </div>
        ))}
      </div>

      <form className="convo-form" onSubmit={submit}>
        <input
          className="convo-name"
          placeholder="First name (optional)"
          value={name}
          maxLength={40}
          onChange={(e) => setName(e.target.value)}
          aria-label="First name (optional)"
        />
        <input
          className="convo-text"
          placeholder="Add your take…"
          value={text}
          maxLength={280}
          onChange={(e) => setText(e.target.value)}
          aria-label="Your comment"
        />
        <button className="convo-send" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? '…' : 'Post'}
        </button>
      </form>
      {status === 'pending' && (
        <p className="convo-msg ok">Thanks — your comment’s in the queue and will appear once it’s approved.</p>
      )}
      {status === 'error' && <p className="convo-msg err">That didn’t go through. Try again in a moment.</p>}
    </section>
  );
}
