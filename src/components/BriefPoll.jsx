import { useEffect, useState } from 'react';
import { POLL } from '../conversation.js';

export default function BriefPoll({ brief, poll }) {
  const cfg = poll || POLL; // fall back to the shared default if a brief has none
  const [counts, setCounts] = useState(null);
  const [voted, setVoted] = useState(() => {
    try {
      return localStorage.getItem('poll:' + brief);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let ok = true;
    fetch(`/api/poll?brief=${encodeURIComponent(brief)}`)
      .then((r) => r.json())
      .then((d) => ok && d.counts && setCounts(d.counts))
      .catch(() => {});
    return () => {
      ok = false;
    };
  }, [brief]);

  const vote = (opt) => {
    if (voted) return;
    setVoted(opt);
    try {
      localStorage.setItem('poll:' + brief, opt);
    } catch {}
    setCounts((c) => ({ ...(c || {}), [opt]: ((c && c[opt]) || 0) + 1 })); // optimistic
    fetch('/api/poll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief, option: opt }),
    })
      .then((r) => r.json())
      .then((d) => d.counts && setCounts(d.counts))
      .catch(() => {});
  };

  // Sum only the current options' counts (ignore any orphaned ids from an
  // earlier version of this poll) so the total and the percentages agree.
  const total = counts ? cfg.options.reduce((a, o) => a + (counts[o.id] || 0), 0) : 0;

  return (
    <div className="poll">
      <h3 className="poll-q">{cfg.question}</h3>
      <div className="poll-opts">
        {cfg.options.map((o) => {
          const n = counts ? counts[o.id] || 0 : 0;
          const pct = total ? Math.round((n / total) * 100) : 0;
          return (
            <button
              key={o.id}
              className={`poll-opt ${voted ? 'done' : ''} ${voted === o.id ? 'mine' : ''}`}
              onClick={() => vote(o.id)}
              disabled={!!voted}
            >
              <span className="poll-fill" style={{ width: voted ? `${pct}%` : '0%' }} />
              <span className="poll-label">{o.label}</span>
              {voted && <span className="poll-pct">{pct}%</span>}
            </button>
          );
        })}
      </div>
      <p className="poll-total">
        {voted ? `${total.toLocaleString()} ${total === 1 ? 'vote' : 'votes'} so far` : 'Cast your vote'}
      </p>
    </div>
  );
}
