import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "src/main.tsx",
        sw: "src/constant/sw.ts",
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "sw") return "sw.js";
          return "[name].[hash].js";
        },
      },
    },
  },
});
