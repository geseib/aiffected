import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Mechanism from './components/Mechanism.jsx';
import Simulator from './components/Simulator.jsx';
import Sectors from './components/Sectors.jsx';
import Society from './components/Society.jsx';
import Closing from './components/Closing.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mechanism />
        <Simulator />
        <Sectors />
        <Society />
        <Closing />
      </main>
    </>
  );
}
