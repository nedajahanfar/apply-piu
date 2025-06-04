import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { ProxyOptions } from 'vite'

// Netlify Functions proxy configuration
const netlifyFunctionsProxy: ProxyOptions = {
  target: 'http://localhost:8888',
  changeOrigin: true,
  rewrite: (path) => path.replace(/^\/.netlify\/functions/, '')
}

export default defineConfig({
  plugins: [react()],
  
  server: {
    proxy: {
      '/.netlify/functions': netlifyFunctionsProxy
    }
  },
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true // Recommended for TS debugging
  }
})