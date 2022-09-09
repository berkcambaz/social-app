import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "gzip" }),
    viteCompression({ algorithm: "brotliCompress" })
  ],
  server: {
    host: true,
    proxy: {
      "/api": "http://0.0.0.0:3333"
    }
  }
})
