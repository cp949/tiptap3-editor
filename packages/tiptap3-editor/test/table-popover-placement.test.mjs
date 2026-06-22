import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(
  __dirname,
  "../src/components/editor/TableBubbleMenu.tsx",
);
const source = readFileSync(sourcePath, "utf8");

const contentBlocks = [...source.matchAll(/<Popover\.Content[\s\S]*?>/g)].map(
  ([block]) => block,
);

const failures = [];

if (contentBlocks.length !== 3) {
  failures.push(`expected 3 table popover contents, got ${contentBlocks.length}`);
}

contentBlocks.forEach((block, index) => {
  const label = `Popover.Content #${index + 1}`;

  if (!block.includes('side="top"')) {
    failures.push(`${label} should open above the table bubble menu`);
  }

  if (!block.includes('align="center"')) {
    failures.push(`${label} should align to the trigger center`);
  }

  if (!block.includes("sideOffset={8}")) {
    failures.push(`${label} should keep an 8px gap from the trigger`);
  }

  if (!block.includes("collisionPadding={8}")) {
    failures.push(`${label} should keep viewport collision padding`);
  }

  if (!block.includes("te-z-[10000]")) {
    failures.push(`${label} should render above the bubble menu surface`);
  }
});

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
