import { useEffect, useMemo, useState } from 'react';
import { compute, leversFor, PRESETS, firstPreset, WAVE_CFG } from '../model.js';
import { LineChart, SplitBar, Gauge, Counter } from './Charts.jsx';
import WaveToggle from './WaveToggle.jsx';
import Voice from './Voice.jsx';

export default function Simulator({ wave, setWave }) {
  const [active, setActive] = useState(firstPreset(wave).id);
  const [levers, setLevers] = useState(firstPreset(wave).levers);

  // Switching wave drops the reader onto that wave's first preset.
  useEffect(() => {
    const p = firstPreset(wave);
    setActive(p.id);
    setLevers(p.levers);
  }, [wave]);

  const r = useMemo(() => compute({ ...levers, wave }), [levers, wave]);
  const cfg = WAVE_CFG[wave];
  const presets = PRESETS[wave];
  const levs = leversFor(wave);

  const choose = (p) => {
    setActive(p.id);
    setLevers(p.levers);
  };
  const drag = (key, val) => {
    setActive(null);
    setLevers((l) => ({ ...l, [key]: Number(val) }));
  };

  const gdpUp = r.gdpGrowth >= 0;
  const isW3 = wave === 3;

  return (
    <section className="sim" id="simulator">
      <div className="sim-inner">
        <header className="sim-head">
          <p className="eyebrow">The simulator</p>
          <h2>Build an economy. Watch who it leaves behind.</h2>
          <p className="lede">
            Pick a wave, pick a scenario, drag the levers. One engine drives every number — output,
            jobs, who pockets the gains, what's left for a typical household. <Voice id="acemoglu" />{' '}
            None of it is fixed. That's the whole point.
          </p>
          <WaveToggle wave={wave} setWave={setWave} />
        </header>

        <div className="preset-row" role="tablist" aria-label="Scenarios">
          {presets.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === p.id}
              className={`preset ${active === p.id ? 'on' : ''}`}
              onClick={() => choose(p)}
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
            {levs.map((lv) => (
              <div className="lever" key={lv.key}>
                <div className="lever-top">
                  <label htmlFor={lv.key}>{lv.label}</label>
                  <output>{levers[lv.key] ?? 50}</output>
                </div>
                <input
                  id={lv.key}
                  type="range"
                  min={0}
                  max={100}
                  value={levers[lv.key] ?? 50}
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
                yMax={cfg.gdpYMax}
                label="GDP (output)"
                format={(v) => `+${(v - 100).toFixed(0)}%`}
              />
              <LineChart
                series={r.unemploymentSeries}
                color="#f87171"
                yMin={0}
                yMax={cfg.unempYMax}
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
              <Gauge
                value={isW3 ? r.leverage : r.stability}
                label={isW3 ? 'Human leverage' : 'Social stability'}
                words={isW3 ? ['Negligible', 'Contested', 'Held'] : undefined}
              />
            </div>

            <p className="verdict">{verdict(r)}</p>
          </div>
        </div>
        <p className="sim-foot">
          Illustrative model — stylized to show the <em>shape</em> of the trade-offs, not to forecast a
          specific year. Same inputs always give the same outputs.
          {isW3 && ' In Wave 3, “unemployment” stops being the real question — watch human leverage instead.'}
        </p>
      </div>
    </section>
  );
}

function verdict(r) {
  const gdp = r.gdpGrowth.toFixed(0);
  const un = r.unemployment.toFixed(0);
  const med = (r.medianIndex - 100).toFixed(0);

  if (r.wave === 3) {
    if (r.leverage < 35)
      return `Output is +${gdp}% — and almost none of it needs you. With human leverage this low, the economy can boom while people become economically optional. The fight is no longer over wages; it's over whether humans stay in the loop at all.`;
    if (r.leverage > 62 && r.medianIndex > 105)
      return `The good ending of Wave 3: +${gdp}% output, autonomy kept under control, and the abundance actually reaching households (${med >= 0 ? '+' : ''}${med}%). Post-scarcity, on purpose — not by accident.`;
    return `+${gdp}% output, ${un}% without a traditional job, household income ${med >= 0 ? '+' : ''}${med}%. Whether this is utopia or obsolescence comes down to who keeps control and who shares the windfall.`;
  }

  if (r.unemployment > 15 && r.gdpGrowth > 10 && r.medianIndex < 95) {
    return `The paradox in full: the economy is +${gdp}% bigger, yet ${un}% can't find work and the typical household is ${Math.abs(med)}% poorer. Growth happened — to someone else.`;
  }
  if (r.stability > 66 && r.gdpGrowth > 8) {
    return `A genuinely good outcome: +${gdp}% output, joblessness held near ${un}%, and the median household shares in the boom (${med >= 0 ? '+' : ''}${med}%). The gains were spread on purpose.`;
  }
  if (r.gdpGrowth > 8 && r.unemployment > 12) {
    return `Output is up +${gdp}%, but ${un}% are out of work. Whether this is a crisis or a transition depends on what the new jobs and the redistribution levers do next.`;
  }
  return `A measured path: +${gdp}% output with unemployment around ${un}%. Modest changes, modestly shared.`;
}
