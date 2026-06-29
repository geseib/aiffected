import { useEffect, useState } from 'react';
import { POLL } from '../conversation.js';

export default function BriefPoll({ brief, poll }) {
  const cfg = poll || POLL;
  const isSlider = cfg.type === 'slider';
  const [counts, setCounts] = useState(null);
  const [voted, setVoted] = useState(() => {
    try {
      return localStorage.getItem('poll:' + brief);
    } catch {
      return null;
    }
  });
  const [pos, setPos] = useState(Math.floor((cfg.options.length - 1) / 2)); // slider position

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

  // total across the current options only (ignore any orphaned ids)
  const total = counts ? cfg.options.reduce((a, o) => a + (counts[o.id] || 0), 0) : 0;

  if (isSlider) {
    // numeric average over the dated stops; "never" (value null) reported apart
    const numeric = cfg.options.filter((o) => o.value != null);
    const numTotal = counts ? numeric.reduce((a, o) => a + (counts[o.id] || 0), 0) : 0;
    const avg = numTotal
      ? numeric.reduce((a, o) => a + o.value * (counts[o.id] || 0), 0) / numTotal
      : null;
    const never = cfg.options.find((o) => o.value == null);
    const neverN = never && counts ? counts[never.id] || 0 : 0;
    const neverPct = total ? Math.round((neverN / total) * 100) : 0;

    return (
      <div className="poll">
        <h3 className="poll-q">{cfg.question}</h3>
        {!voted ? (
          <div className="pslider-wrap">
            <div className="pslider-value">{cfg.options[pos].label}</div>
            <input
              className="pslider"
              type="range"
              min={0}
              max={cfg.options.length - 1}
              step={1}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={cfg.question}
            />
            <div className="pslider-ticks">
              {cfg.options.map((o) => (
                <span key={o.id}>{o.label}</span>
              ))}
            </div>
            <button className="convo-send pslider-submit" onClick={() => vote(cfg.options[pos].id)}>
              Submit answer
            </button>
          </div>
        ) : (
          <div className="poll-result">
            <p className="poll-avg">
              On average, people say{' '}
              <strong>{avg != null ? `~${avg.toFixed(1)} years` : '—'}</strong>
            </p>
            {neverPct > 0 && <p className="poll-never">…and {neverPct}% say never.</p>}
            <div className="poll-dist">
              {cfg.options.map((o) => {
                const n = counts ? counts[o.id] || 0 : 0;
                const pct = total ? Math.round((n / total) * 100) : 0;
                return (
                  <div className={`poll-dist-row ${voted === o.id ? 'mine' : ''}`} key={o.id}>
                    <span className="poll-dist-label">{o.label}</span>
                    <span className="poll-dist-bar">
                      <span className="poll-dist-fill" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="poll-dist-pct">{pct}%</span>
                  </div>
                );
              })}
            </div>
            <p className="poll-total">
              You said {cfg.options.find((o) => o.id === voted)?.label} · {total.toLocaleString()}{' '}
              {total === 1 ? 'vote' : 'votes'}
            </p>
          </div>
        )}
      </div>
    );
  }

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
