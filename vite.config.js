import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-lottie': 'react-lottie/dist/react-lottie.js'
    },
    assetsInclude: ['**/*.ttf'],
  }
});