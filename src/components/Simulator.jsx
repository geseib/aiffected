import { useMemo, useState } from 'react';
import { compute, LEVERS, PRESETS, DEFAULT_PRESET } from '../model.js';
import { LineChart, SplitBar, Gauge, Counter } from './Charts.jsx';

const presetLevers = (id) => PRESETS.find((p) => p.id === id).levers;

export default function Simulator() {
  const [active, setActive] = useState(DEFAULT_PRESET);
  const [levers, setLevers] = useState(presetLevers(DEFAULT_PRESET));

  const r = useMemo(() => compute(levers), [levers]);

  const choose = (id) => {
    setActive(id);
    setLevers(presetLevers(id));
  };
  const drag = (key, val) => {
    setActive(null); // now it's a custom mix
    setLevers((l) => ({ ...l, [key]: Number(val) }));
  };

  const gdpUp = r.gdpGrowth >= 0;

  return (
    <section className="sim" id="simulator">
      <div className="sim-inner">
        <header className="sim-head">
          <p className="eyebrow">The simulator</p>
          <h2>Build an economy. Watch who it leaves behind.</h2>
          <p className="lede">
            Pick a scenario, then drag the levers. The same engine drives every number — output, jobs,
            who pockets the gains, and what's left for a typical household. Notice how easily the green
            line and the red line pull apart.
          </p>
        </header>

        <div className="preset-row" role="tablist" aria-label="Scenarios">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === p.id}
              className={`preset ${active === p.id ? 'on' : ''}`}
              onClick={() => choose(p.id)}
            >
              <span className="preset-name">{p.name}</span>
              <span className="preset-tag">{p.tagline}</span>
            </button>
          ))}
        </div>

        <div className="sim-grid">
          {/* Controls */}
          <div className="panel controls">
            <h3 className="panel-title">The levers</h3>
            {LEVERS.map((lv) => (
              <div className="lever" key={lv.key}>
                <div className="lever-top">
                  <label htmlFor={lv.key}>{lv.label}</label>
                  <output>{levers[lv.key]}</output>
                </div>
                <input
                  id={lv.key}
                  type="range"
                  min={lv.min}
                  max={lv.max}
                  value={levers[lv.key]}
                  onChange={(e) => drag(lv.key, e.target.value)}
                />
                <div className="lever-ends">
                  <span>{lv.low}</span>
                  <span>{lv.high}</span>
                </div>
                <p className="lever-help">{lv.help}</p>
              </div>
            ))}
          </div>

          {/* Headline outcome */}
          <div className="panel outcome">
            <h3 className="panel-title">In 10 years, this economy is…</h3>
            <div className="headline-stats">
              <div className="hstat">
                <Counter className="hstat-num up" value={r.gdpGrowth} format={(v) => `${gdpUp ? '+' : ''}${v.toFixed(0)}%`} />
                <span className="hstat-cap">GDP {gdpUp ? 'larger' : 'smaller'}</span>
              </div>
              <div className="hstat">
                <Counter className="hstat-num down" value={r.unemployment} format={(v) => `${v.toFixed(0)}%`} />
                <span className="hstat-cap">out of work</span>
              </div>
              <div className="hstat">
                <Counter
                  className={`hstat-num ${r.medianIndex >= 100 ? 'up' : 'down'}`}
                  value={r.medianIndex}
                  format={(v) => `${v >= 100 ? '+' : ''}${(v - 100).toFixed(0)}%`}
                />
                <span className="hstat-cap">typical household income</span>
              </div>
            </div>

            <div className="charts-row">
              <LineChart
                series={r.gdpSeries}
                color="#34d399"
                yMin={95}
                yMax={135}
                label="GDP (output)"
                format={(v) => `+${(v - 100).toFixed(0)}%`}
              />
              <LineChart
                series={r.unemploymentSeries}
                color="#f87171"
                yMin={0}
                yMax={40}
                label="Unemployment"
                unit="%"
                format={(v) => v.toFixed(0)}
              />
            </div>

            <div className="dist">
              <div className="dist-block">
                <h4>Who captures the new income?</h4>
                <SplitBar
                  left={r.laborShare}
                  leftLabel="Wages (workers)"
                  leftColor="#60a5fa"
                  rightLabel="Capital (owners)"
                  rightColor="#c084fc"
                />
              </div>
              <Gauge value={r.stability} label="Social stability" />
            </div>

            <p className="verdict">{verdict(r)}</p>
          </div>
        </div>
        <p className="sim-foot">
          Illustrative model — stylized to show the <em>shape</em> of the trade-offs, not to forecast a
          specific year. Same inputs always give the same outputs; drag things to extremes and the
          mechanics still hold.
        </p>
      </div>
    </section>
  );
}

function verdict(r) {
  const gdp = r.gdpGrowth.toFixed(0);
  const un = r.unemployment.toFixed(0);
  const med = (r.medianIndex - 100).toFixed(0);
  if (r.unemployment > 15 && r.gdpGrowth > 10 && r.medianIndex < 95) {
    return `The paradox in full: the economy is +${gdp}% bigger, yet ${un}% can't find work and the typical household is ${Math.abs(med)}% poorer. Growth happened — to someone else.`;
  }
  if (r.stability > 66 && r.gdpGrowth > 8) {
    return `A genuinely good outcome: +${gdp}% output, joblessness held near ${un}%, and the median household shares in the boom (${med >= 0 ? '+' : ''}${med}%). The gains were spread on purpose.`;
  }
  if (r.gdpGrowth > 8 && r.unemployment > 12) {
    return `Output is up +${gdp}%, but ${un}% are out of work. Whether this is a crisis or a transition depends entirely on what the new jobs and the redistribution levers do next.`;
  }
  return `A measured path: +${gdp}% output with unemployment around ${un}%. Modest changes, modestly shared.`;
}
