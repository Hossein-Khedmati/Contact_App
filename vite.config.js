// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // THIS IS THE KEY - Force Vite to resolve these extensions
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    // Add aliases to make imports cleaner
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@context": "/src/context",
    },
  },
  // Ensure build process handles everything
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      extensions: [".js", ".jsx"],
    },
  },
  // Important for Vercel
  base: "./",
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// export default defineConfig({
//   plugins: [react()],
// })
