import { defineConfig } from "vite";
import { resolve } from "path";

// `vite build` (used by `npm run build` / `npm run dev`) keeps the existing
// library-mode bundling so the Go binary's go:embed snapshot of static/app.js
// keeps working. `vite` (used by `npm run dev:serve`) ignores `build.lib` and
// boots a regular dev server that picks up index.html at the project root.
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/app.js"),
      formats: ["iife"],
      name: "TracewayApp",
      fileName: () => "app.js",
    },
    outDir: resolve(__dirname, "../static"),
    emptyOutDir: false,
  },
  server: {
    port: 5180,
    strictPort: true,
    proxy: {
      // Forward demo test endpoints (/api/test-error, /api/test-success, etc.)
      // to the Go demo router. The SDK posts to an absolute URL on :8082 so
      // it bypasses this proxy entirely; only relative /api/* calls from the
      // page hit it.
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
