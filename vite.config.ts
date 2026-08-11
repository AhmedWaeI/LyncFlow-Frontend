import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // The shell proxies this prefix to this application. Keeping it unique
  // prevents this Vite app's scripts and styles from colliding with the shell.
  // base: '/auth-static/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3001,
    strictPort: true,
  },
  preview: {
    port: 3001,
    strictPort: true,
  },
})
