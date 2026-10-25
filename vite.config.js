import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // Navegadores de los últimos años: CSS anidado, :has() y módulos ES sin polyfills.
    target: "es2022",
    cssMinify: true,
    // Imágenes pequeñas (íconos) van dentro del CSS; las fotos quedan como archivo.
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        inicio: resolve(import.meta.dirname, "index.html"),
      },
    },
  },
});
