import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    mkcert({
      source: "coding",
    }),
    tsPaths(),
    tailwindcss(),
  ],
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
});
