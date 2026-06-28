import { LineChart } from './Charts.jsx';
import { compute, PRESETS } from '../model.js';

export default function Hero() {
  // Use the headline "jobless boom" scenario (wave 1) as the hero illustration.
  const r = compute({ ...PRESETS[1].find((p) => p.id === 'jobless-boom').levers, wave: 1 });

  return (
    <header className="hero" id="top">
      <div className="hero-inner">
        <p className="eyebrow">An interactive explainer about the next decade</p>
        <h1 className="hero-title">
          The economy can grow <em className="up">+20%</em>
          <br />
          while <em className="down">1 in 5</em> people lose their jobs.
        </h1>
        <p className="hero-sub">
          That isn't a contradiction. It's arithmetic. Generative AI is about to pull apart two things
          we've always assumed move together — <strong>how much an economy produces</strong> and{' '}
          <strong>how many people it needs</strong>. This page walks you through how that happens, lets
          you build the scenarios yourself, and asks the question underneath all of it:{' '}
          <em>if we don't need everyone to work, how should a society be organized?</em>
        </p>

        <div className="hero-charts">
          <LineChart series={r.gdpSeries} color="#34d399" yMin={95} yMax={130} label="What we produce" format={(v) => `+${(v - 100).toFixed(0)}%`} />
          <LineChart series={r.unemploymentSeries} color="#f87171" yMin={0} yMax={35} label="People out of work" unit="%" format={(v) => v.toFixed(0)} />
        </div>

        <a className="hero-cta" href="#mechanism">
          Show me how ↓
        </a>
      </div>
      <div className="hero-glow" aria-hidden="true" />
    </header>
  );
}
