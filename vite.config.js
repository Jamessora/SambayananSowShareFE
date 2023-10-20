import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Read environment variables
const apiBaseUrl = process.env.NODE_ENV === 'production' ?
  process.env.VITE_API_BASE_URL :
  process.env.VITE_API_BASE_URL_LOCAL;
  
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiBaseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})