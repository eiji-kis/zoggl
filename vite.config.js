import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/zoggl_min.js",
        chunkFileNames: "assets/zoggl_min.js",
        assetFileNames: "assets/[name].[ext]",
        manualChunks: undefined,
      },
    },
  },
});
