import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const PKG_DIR = path.join(ROOT_DIR, "packages/tiptap3-editor");
const DOCS = ["README.md", "STYLE_GUIDE.md"];
const GITHUB_BASE_URL = "https://github.com/cp949/tiptap3-editor/blob/main/";

DOCS.forEach((filename) => {
  const srcPath = path.join(ROOT_DIR, filename);
  const destPath = path.join(PKG_DIR, filename);

  if (!fs.existsSync(srcPath)) {
    console.warn(`[sync-pkg-docs] Warning: ${filename} not found in root.`);
    return;
  }

  let content = fs.readFileSync(srcPath, "utf8");

  // Relative links to absolute GitHub links
  // Matches links like [Label](apps/playground/...) but not http/https
  content = content.replace(
    /(\[.*?\])\((?!https?:\/\/)(apps\/playground\/.*?)\)/g,
    `$1(${GITHUB_BASE_URL}$2)`,
  );

  fs.writeFileSync(destPath, content);
  console.log(
    `[sync-pkg-docs] Synchronized ${filename} to package with absolute URLs.`,
  );
});
