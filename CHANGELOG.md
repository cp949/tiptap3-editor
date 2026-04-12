# Changelog

All notable changes to this project will be documented in this file.

## 1.0.6 - 2026-04-12

Fixed the published `@cp949/tiptap3-editor` ESM bundle for modern Next.js clients.

- Externalized library dependencies during the package build so Radix and other direct dependencies are no longer inlined into `dist/index.es.js`.
- Prevented CommonJS interop helpers and runtime `require` shims from leaking into the published ESM output.
- Added a `check:dist-esm` verification step that fails the build if `require`, `createRequire`, or `rolldown/runtime` patterns reappear in `dist`.
