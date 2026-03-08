import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/api/data`)
  .then(res => res.json())
  .then(data => console.log(data));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/static': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/logout': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
