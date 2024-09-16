import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ['**/*'],
      },
      manifest: {
        'name': 'RPN電卓',
        'short_name': 'RPN電卓',
        'theme_color': '#d8721c',
        'background_color': '#282c34',
        'display': 'standalone',
        'orientation': 'portrait',
        'scope': '/',
        'start_url': '/',
        'icons': [
          {
            'src': 'images/icons/icon-72x72.png',
            'sizes': '72x72',
            'type': 'image/png',
            'purpose': 'any maskable',
          },
          {
            'src': 'images/icons/icon-96x96.png',
            'sizes': '96x96',
            'type': 'image/png',
            'purpose': 'any maskable',
          },
          {
            'src': 'images/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png',
            'purpose': 'any maskable',
          },
          {
            'src': 'images/icons/icon-144x144.png',
            'sizes': '144x144',
            'type': 'image/png',
            'purpose': 'any maskable',
          },
          {
            'src': 'images/icons/icon-152x152.png',
            'sizes': '152x152',
            'type': 'image/png',
            'purpose': 'any maskable',
          },
          {
            'src': 'images/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png',
            'purpose': 'any maskable',
          },
          {
            'src': 'images/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png',
            'purpose': 'any maskable',
          },
          {
            'src': 'images/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png',
            'purpose': 'any maskable',
          },
        ],
      },
    }),
  ],
  root: './src/webapp',
  base: './',
  publicDir: './public',
  // dist
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
});
