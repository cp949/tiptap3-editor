import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        /^@tiptap\/.*/, // Don't bundle tiptap core/extensions
        "tailwindcss",
      ],
    },
    cssCodeSplit: false, // Bundle CSS into one file (dist/style.css) if possible, or just let Vite handle it.
    // Actually with lib mode, it usually creates style.css
    emptyOutDir: false, // Prevent clearing dist during watch mode to avoid race conditions with consuming apps
  },
});
