import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On Vercel we serve from the domain root; on GitHub Pages / preview we serve
// from a project subpath that matches the repo name.
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/aiffected/',
});
