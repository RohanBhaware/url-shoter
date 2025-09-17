import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: "/url-shoter",
  resolve: {
    alias: {
      // react: require.resolve('react'),
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
