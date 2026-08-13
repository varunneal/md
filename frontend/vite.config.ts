import {defineConfig} from "vite";
import {resolve} from "node:path";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "../src/md/static"),
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/client.ts"),
      formats: ["es"],
      fileName: () => "client.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (asset) => asset.name?.endsWith(".css") ? "client.css" : "[name][extname]",
      },
    },
  },
});
