import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: ['es2015', 'safari11'],
    minify: 'esbuild',
    cssTarget: ['safari11']
  },
  esbuild: {
    target: 'es2015'
  }
})