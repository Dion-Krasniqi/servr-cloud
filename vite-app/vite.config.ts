import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: '.',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8001'
    },
    host: true,
    hmr: {
      clientPort: 443,
    },
  },
})