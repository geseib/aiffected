import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminModerate from './components/AdminModerate.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminModerate />
  </StrictMode>
);
