import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/playlists': {
        target: 'http://localhost:3001', // Your backend server
        changeOrigin: true      },
      '/api/songs': {
        target: 'http://localhost:3001', // Proxy for songs
        changeOrigin: true      }
    }
  }
});
