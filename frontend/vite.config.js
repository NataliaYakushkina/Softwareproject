import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Service Worker aktualisiert sich automatisch bei jedem neuen Deploy
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'Haushalthelfer',
        short_name: 'Haushalthelfer',
        description:
          'Den Haushalt gemeinsam organisieren — Aufgaben, Einkaufsliste und Putzplan an einem Ort.',
        lang: 'de',
        start_url: '/',
        display: 'standalone',
        background_color: '#f8fafc',
        theme_color: '#0d9488',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      // Service Worker auch beim "npm run dev" aktivieren (zum Testen)
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    port: 5173,
    // Erlaubt Zugriff von anderen Geraeten im Netzwerk (z. B. zum Testen)
    host: true,
  },
})
