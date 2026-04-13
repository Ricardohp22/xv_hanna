import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const clientPort = Number(process.env.VITE_CLIENT_PORT) || 5173

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: clientPort,
  },
})
