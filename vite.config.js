import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset paths relative so the built app also works from any static host or folder.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5173, open: false },
});
