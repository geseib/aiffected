import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Small, dependency-free SVG chart primitives. Everything animates by letting
// CSS transition the geometry between renders.
// ---------------------------------------------------------------------------

const linePath = (values, w, h, pad, yMin, yMax) => {
  const n = values.length;
  const x = (i) => pad + (i / (n - 1)) * (w - pad * 2);
  const y = (v) => h - pad - ((v - yMin) / (yMax - yMin)) * (h - pad * 2);
  return {
    d: values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' '),
    area:
      values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ') +
      ` L ${x(n - 1).toFixed(1)} ${h - pad} L ${x(0).toFixed(1)} ${h - pad} Z`,
    lastX: x(n - 1),
    lastY: y(values[n - 1]),
  };
};

export function LineChart({ series, color, yMin, yMax, label, unit = '', format }) {
  const w = 320;
  const h = 150;
  const pad = 18;
  const { d, area, lastX, lastY } = linePath(series, w, h, pad, yMin, yMax);
  const last = series[series.length - 1];
  const fmt = format || ((v) => v.toFixed(0));
  const id = `grad-${color.replace('#', '')}`;

  return (
    <div className="chart">
      <div className="chart-head">
        <span className="chart-label">{label}</span>
        <span className="chart-value" style={{ color }}>
          {fmt(last)}
          {unit}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="chart-svg" preserveAspectRatio="none" role="img" aria-label={`${label}: ${fmt(last)}${unit}`}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* baseline grid */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={pad} x2={w - pad} y1={pad + g * (h - pad * 2)} y2={pad + g * (h - pad * 2)} className="chart-grid" />
        ))}
        <path d={area} fill={`url(#${id})`} className="chart-area" />
        <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="chart-line" />
        <circle cx={lastX} cy={lastY} r="4.5" fill={color} className="chart-dot" />
      </svg>
    </div>
  );
}

// A single horizontal bar split between two parties (e.g. labour vs capital).
export function SplitBar({ left, leftLabel, leftColor, rightLabel, rightColor }) {
  const right = 100 - left;
  return (
    <div className="splitbar">
      <div className="splitbar-track">
        <div className="splitbar-seg" style={{ width: `${left}%`, background: leftColor }}>
          {left > 14 && <span>{left.toFixed(0)}%</span>}
        </div>
        <div className="splitbar-seg" style={{ width: `${right}%`, background: rightColor }}>
          {right > 14 && <span>{right.toFixed(0)}%</span>}
        </div>
      </div>
      <div className="splitbar-legend">
        <span><i style={{ background: leftColor }} />{leftLabel}</span>
        <span><i style={{ background: rightColor }} />{rightLabel}</span>
      </div>
    </div>
  );
}

// Half-circle gauge for the stability index.
export function Gauge({ value, label, words = ['Fragile', 'Strained', 'Stable'] }) {
  const r = 70;
  const cx = 90;
  const cy = 90;
  const a = Math.PI * (1 - value / 100); // value 0 -> left, 100 -> right
  const x = cx + r * Math.cos(a);
  const y = cy - r * Math.sin(a);
  const big = value > 50 ? 1 : 0;
  const tone = value > 66 ? '#34d399' : value > 38 ? '#fbbf24' : '#f87171';
  const word = value > 66 ? words[2] : value > 38 ? words[1] : words[0];
  return (
    <div className="gauge">
      <svg viewBox="0 0 180 110" aria-label={`${label}: ${word}`}>
        <path d={`M 20 90 A ${r} ${r} 0 0 1 160 90`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" />
        <path d={`M 20 90 A ${r} ${r} 0 ${big} 1 ${x.toFixed(1)} ${y.toFixed(1)}`} fill="none" stroke={tone} strokeWidth="12" strokeLinecap="round" className="gauge-arc" />
      </svg>
      <div className="gauge-readout">
        <strong style={{ color: tone }}>{word}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

// Number that eases toward its target whenever the target changes.
export function Counter({ value, format, className }) {
  const [shown, setShown] = useState(value);
  const ref = useRef(value);
  const raf = useRef(0);
  useEffect(() => {
    const from = ref.current;
    const to = value;
    const start = performance.now();
    const dur = 500;
    cancelAnimationFrame(raf.current);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = t * t * (3 - 2 * t);
      const v = from + (to - from) * e;
      setShown(v);
      ref.current = v;
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else ref.current = to;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);
  const fmt = format || ((v) => v.toFixed(0));
  return <span className={className}>{fmt(shown)}</span>;
}

// Reveal-on-scroll wrapper.
export function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`}>
      {children}
    </div>
  );
}
