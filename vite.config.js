import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor bundles so browsers can cache them independently from app code
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/react-router")) {
            return "vendor-react";
          }
          if (id.includes("/motion/") || id.includes("/framer-motion/")) {
            return "vendor-motion";
          }
          if (id.includes("/lucide-react/")) {
            return "vendor-icons";
          }
        },
      },
    },
    // Raise warning threshold — motion/react is inherently large
    chunkSizeWarningLimit: 600,
    // Only inline very small assets (< 4 kB) — larger assets get their own file + content hash
    assetsInlineLimit: 4096,
  },
});
