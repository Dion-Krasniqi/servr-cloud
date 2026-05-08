import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  root: '.',
  plugins: [react(),
            tailwindcss(),
	    {
		name: 'configure-headers',
		configureServer(server) {
			server.middleware.use((_, res, next) => {
				rest.setHeader('Content-Security-Policy',
				"default-src 'self'; img-src 'self' http://localhost:8000 blobl: data:; media-src 'self' http://localhost:8000"
					      )
				next()
			})
		}
	    }
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
