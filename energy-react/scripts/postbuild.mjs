import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function ensureNoJekyll() {
  const outDir = join(process.cwd(), "out");
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, ".nojekyll"), "");
  console.log("✔ Created out/.nojekyll for GitHub Pages");
}

ensureNoJekyll().catch((error) => {
  console.error("✖ Failed to create out/.nojekyll", error);
  process.exitCode = 1;
});
