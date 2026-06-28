export const WAVES_META = [
  { n: 1, name: 'Cognition', sub: 'Minds' },
  { n: 2, name: 'Robotics', sub: 'Bodies' },
  { n: 3, name: 'Autonomy', sub: 'Itself' },
];

export default function WaveToggle({ wave, setWave, compact = false }) {
  return (
    <div className={`wavetoggle ${compact ? 'compact' : ''}`} role="tablist" aria-label="Wave of automation">
      {WAVES_META.map((w) => (
        <button
          key={w.n}
          role="tab"
          aria-selected={wave === w.n}
          className={`wave-btn w${w.n} ${wave === w.n ? 'on' : ''}`}
          onClick={() => setWave(w.n)}
        >
          <span className="wave-n">Wave {w.n}</span>
          <span className="wave-name">{w.name}</span>
          {!compact && <span className="wave-sub">{w.sub}</span>}
        </button>
      ))}
    </div>
  );
}
