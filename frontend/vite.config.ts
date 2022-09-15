import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "gzip" }),
    viteCompression({ algorithm: "brotliCompress" }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      injectRegister: "inline",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"]
      },
      manifest: {
        name: "Chernolink",
        short_name: "Chernolink",
        start_url: ".",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any maskable"
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable"
          }
        ],
      }
    })
  ],
  server: {
    host: true,
    proxy: {
      "/api": "http://0.0.0.0:3333"
    }
  }
})
