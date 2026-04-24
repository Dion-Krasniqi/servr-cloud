import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  root: '.',
  plugins: [react(),
            tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8001'
    },
    host: true,
    hmr: {
      clientPort: 443,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})