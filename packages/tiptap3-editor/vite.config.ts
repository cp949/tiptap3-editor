import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
) as {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const externalPackages = new Set([
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
]);

const isExternal = (id: string) =>
  [...externalPackages].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

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
      // Keep the published library output as pure ESM.
      // Radix ships mixed CJS/ESM entrypoints, and bundling those graphs can
      // introduce CommonJS interop helpers or runtime require shims.
      external: isExternal,
    },
    cssCodeSplit: false, // Bundle CSS into one file (dist/style.css) if possible, or just let Vite handle it.
    // Actually with lib mode, it usually creates style.css
    emptyOutDir: false, // Prevent clearing dist during watch mode to avoid race conditions with consuming apps
  },
});
