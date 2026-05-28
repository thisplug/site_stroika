import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base:
    process.env.GITHUB_ACTIONS === 'true'
      ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'site_stroika'}/`
      : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
