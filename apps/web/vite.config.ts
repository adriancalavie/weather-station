import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  build: {
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       "react-vendor": ["react", "react-dom"],
    //     },
    //   },
    // },
  },
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      quoteStyle: "double",
      semicolons: true,
      target: "react",
    }),
    react(),
    mkcert({
      source: "coding",
    }),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
