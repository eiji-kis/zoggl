import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/zoggl_min.js',
        chunkFileNames: 'assets/zoggl_min.js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: undefined,
      },
    },
  },
});
