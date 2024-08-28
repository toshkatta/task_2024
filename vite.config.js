import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      infrastructure: '/app/infrastructure',
      'ui-kit': '/app/views/ui-kit',
      pages: '/app/views/pages',
    },
  },
})
