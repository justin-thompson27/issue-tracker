/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In development, Vite forwards these paths to your Express server on port 3000.
    proxy: {
      '/issues': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
