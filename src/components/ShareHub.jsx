import { useState } from 'react';
import { BRIEFS } from '../briefs.js';

const BASE = import.meta.env.BASE_URL;

export default function ShareHub() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const [copied, setCopied] = useState(null);

  const copy = (url, key) => {
    if (navigator.clipboard) navigator.clipboard.writeText(url);
    setCopied(key);
    setTimeout(() => setCopied((k) => (k === key ? null : k)), 1600);
  };

  const homeUrl = `${origin}${BASE}`;

  return (
    <div className="sharehub">
      <header className="sharehub-head">
        <a className="brief-brand" href={BASE}>
          <span className="brand-mark">ai</span>ffected
        </a>
        <p className="eyebrow">Share kit</p>
        <h1>Everything you can share</h1>
        <p className="sharehub-lede">
          The full page, plus {BRIEFS.length} single-idea briefs — each its own link with a ready-made
          social card, each funnelling back to the full experience. Copy a link and drop it anywhere.
        </p>
      </header>

      {/* the whole thing */}
      <div className="share-card share-card-full">
        <a className="share-thumb" href={`${BASE}`}>
          <img src={`${BASE}og/gdp-up-jobs-down.png`} alt="aiffected" loading="lazy" />
        </a>
        <div className="share-card-body">
          <span className="share-kicker">The full page</span>
          <h3>aiffected — the whole interactive explainer</h3>
          <p>The complete walk-through: the mechanism, the three waves, the simulator, society, meaning and the chorus.</p>
          <div className="share-actions">
            <code>/</code>
            <button className="share-copy" onClick={() => copy(homeUrl, 'home')}>
              {copied === 'home' ? 'Copied ✓' : 'Copy link'}
            </button>
            <a href={`${BASE}`} target="_blank" rel="noopener noreferrer">Open ↗</a>
          </div>
        </div>
      </div>

      <div className="share-grid">
        {BRIEFS.map((b, i) => {
          const shortPath = `/brief${i + 1}`;
          const shortUrl = `${origin}${shortPath}`;
          const briefPath = `${BASE}b/${b.slug}/`;
          return (
            <div className="share-card" key={b.slug}>
              <a className="share-thumb" href={briefPath} target="_blank" rel="noopener noreferrer">
                <img src={`${BASE}og/${b.slug}.png`} alt={b.ogTitle} loading="lazy" />
              </a>
              <div className="share-card-body">
                <span className="share-kicker">{b.eyebrow}</span>
                <h3>{b.ogTitle}</h3>
                <p>{b.ogDesc}</p>
                <div className="share-actions">
                  <code>{shortPath}</code>
                  <button className="share-copy" onClick={() => copy(shortUrl, b.slug)}>
                    {copied === b.slug ? 'Copied ✓' : 'Copy link'}
                  </button>
                  <a href={briefPath} target="_blank" rel="noopener noreferrer">Open ↗</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="sharehub-foot">
        Short links like <code>/brief1</code> work on the deployed site. The “Copy link” buttons grab the
        full URL for wherever you’re posting. Each link unfurls with its own preview image.
      </p>
    </div>
  );
}
