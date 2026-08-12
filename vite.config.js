import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // A leading dot matches the domain and every subdomain, so this covers any
    // ngrok tunnel. Free ngrok hands out a new hostname on each restart, and
    // pinning one means editing this file every session.
    allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.io'],
  },
})
