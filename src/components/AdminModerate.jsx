import { useEffect, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

export default function AdminModerate() {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('adminToken') || '';
    } catch {
      return '';
    }
  });
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState('pending');
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const load = (tk = token, status = tab) => {
    setBusy(true);
    setErr('');
    fetch(`/api/moderate?status=${status}`, { headers: { 'x-admin-token': tk } })
      .then((r) => {
        if (r.status === 401) throw new Error('Wrong token');
        return r.json();
      })
      .then((d) => {
        setItems(d.comments || []);
        setAuthed(true);
        try {
          localStorage.setItem('adminToken', tk);
        } catch {}
      })
      .catch((e) => {
        setErr(e.message || 'Failed');
        setAuthed(false);
      })
      .finally(() => setBusy(false));
  };

  useEffect(() => {
    if (token) load(token, tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const act = (id, action) => {
    setItems((xs) => xs.filter((x) => x._id !== id));
    fetch('/api/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id, action }),
    }).catch(() => load());
  };

  if (!authed) {
    return (
      <div className="admin">
        <a className="brief-brand" href={BASE}>
          <span className="brand-mark">ai</span>ffected
        </a>
        <h1 className="admin-h">Moderation</h1>
        <p className="admin-sub">Enter your admin token to review the comment queue.</p>
        <form
          className="admin-login"
          onSubmit={(e) => {
            e.preventDefault();
            load(token, 'pending');
          }}
        >
          <input
            type="password"
            placeholder="Admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            aria-label="Admin token"
          />
          <button type="submit" disabled={busy}>
            {busy ? '…' : 'Unlock'}
          </button>
        </form>
        {err && <p className="convo-msg err">{err}</p>}
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-top">
        <a className="brief-brand" href={BASE}>
          <span className="brand-mark">ai</span>ffected
        </a>
        <button
          className="admin-logout"
          onClick={() => {
            try {
              localStorage.removeItem('adminToken');
            } catch {}
            setAuthed(false);
            setToken('');
          }}
        >
          Lock
        </button>
      </div>
      <h1 className="admin-h">Moderation</h1>

      <div className="admin-tabs">
        {['pending', 'approved', 'rejected'].map((t) => (
          <button key={t} className={`admin-tab ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
        <button className="admin-refresh" onClick={() => load()} disabled={busy}>
          ↻ Refresh
        </button>
      </div>

      {err && <p className="convo-msg err">{err}</p>}
      {!busy && items.length === 0 && <p className="admin-empty">Nothing here.</p>}

      <div className="admin-list">
        {items.map((c) => (
          <div className="admin-item" key={c._id}>
            <div className="admin-item-meta">
              <span className="admin-brief">{c.brief}</span>
              <span className="admin-name">{c.name || 'Anonymous'}</span>
              <span className="admin-time">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
            <p className="admin-text">{c.text}</p>
            <div className="admin-actions">
              {tab !== 'approved' && (
                <button className="admin-approve" onClick={() => act(c._id, 'approve')}>
                  ✓ Approve
                </button>
              )}
              {tab !== 'rejected' && (
                <button className="admin-reject" onClick={() => act(c._id, 'reject')}>
                  ✕ Reject
                </button>
              )}
              <button className="admin-delete" onClick={() => act(c._id, 'delete')}>
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
