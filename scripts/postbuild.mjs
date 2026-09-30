// Runs after `next build`. GitHub Pages picks a file's content type from its
// extension, and Next exports the share image as an extensionless
// "opengraph-image" file, which link previews (LinkedIn, iMessage) may reject.
// This copies it to og.png and points every page's og:image/twitter:image at it.
import { copyFile, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const SRC = join(OUT, "opengraph-image");
const DEST = join(OUT, "og.png");
const PATTERN = /\/opengraph-image\?[0-9a-f]+/g;

async function htmlFiles(dir) {
  const files = [];
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) files.push(...(await htmlFiles(path)));
    else if (name.endsWith(".html")) files.push(path);
  }
  return files;
}

await copyFile(SRC, DEST);
let rewritten = 0;
for (const file of await htmlFiles(OUT)) {
  const html = await readFile(file, "utf8");
  const next = html.replace(PATTERN, "/og.png");
  if (next !== html) {
    await writeFile(file, next);
    rewritten++;
  }
}
console.log(`postbuild: og.png written; share-image URLs updated in ${rewritten} page(s)`);
