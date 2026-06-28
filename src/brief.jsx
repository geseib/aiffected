import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { VoicesProvider } from './components/VoicesContext.jsx';
import Brief from './components/Brief.jsx';
import './styles.css';

const slug = window.__BRIEF_SLUG__;
const og = new URLSearchParams(window.location.search).has('og');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VoicesProvider>
      <Brief slug={slug} og={og} />
    </VoicesProvider>
  </StrictMode>
);
