import { useState } from 'react';
import { VoicesProvider } from './components/VoicesContext.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Mechanism from './components/Mechanism.jsx';
import Waves from './components/Waves.jsx';
import Simulator from './components/Simulator.jsx';
import Sectors from './components/Sectors.jsx';
import Society from './components/Society.jsx';
import VoicesSpectrum from './components/VoicesSpectrum.jsx';
import Closing from './components/Closing.jsx';

export default function App() {
  // The wave (1 cognition, 2 robotics, 3 autonomy) is shared between the
  // simulator and the sector chart so they tell one continuous story.
  const [wave, setWave] = useState(1);

  return (
    <VoicesProvider>
      <Nav />
      <main>
        <Hero />
        <Mechanism />
        <Waves />
        <Simulator wave={wave} setWave={setWave} />
        <Sectors wave={wave} setWave={setWave} />
        <Society />
        <VoicesSpectrum />
        <Closing />
      </main>
    </VoicesProvider>
  );
}
