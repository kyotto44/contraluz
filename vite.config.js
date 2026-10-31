import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // Navegadores de los últimos años: CSS anidado, :has() y módulos ES sin polyfills.
    target: "es2022",
    cssMinify: true,
    // Nada se incrusta como data: la CSP solo permite imágenes del propio sitio.
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        inicio: resolve(import.meta.dirname, "index.html"),
        gracias: resolve(import.meta.dirname, "gracias/index.html"),
      },
    },
  },
});
