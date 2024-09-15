import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './src/webapp',
  base: './',
  publicDir: './public',
  // dist
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
});
