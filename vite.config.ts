import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        /*
         * Split the libraries that never change away from the code that changes
         * on every deploy.
         *
         * With Vite's defaults, React, the router, i18next and the rest shared
         * one 484 KB chunk with application code. Its hash changed on every
         * deploy, so a returning visitor re-downloaded the whole thing to pick
         * up a copy edit — and this site deploys often.
         *
         * Split this way, the vendor chunks keep their hash across deploys and
         * stay in the browser cache. Total bytes on a first visit are the same;
         * a repeat visit after a content change drops to the app chunk alone.
         *
         * Grouped by how they change together rather than one chunk per
         * package: fifty small chunks would cost more in requests than they
         * save in cache hits.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler")) {
            return "vendor-react";
          }
          if (id.includes("react-router") || id.includes("@remix-run")) return "vendor-router";
          if (id.includes("i18next")) return "vendor-i18n";
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
            return "vendor-motion";
          }
          if (id.includes("@radix-ui")) return "vendor-radix";
          // Markdown only renders on article pages; keeping it separate means
          // the rest of the site never pays for it.
          if (id.includes("react-markdown") || id.includes("remark") || id.includes("micromark") ||
              id.includes("mdast") || id.includes("unified") || id.includes("hast")) {
            return "vendor-markdown";
          }
          return "vendor";
        },
      },
    },
  },
}));
