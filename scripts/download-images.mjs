// Downloads every Unsplash / Pexels photo referenced in the code/content into public/images,
// so the site serves its own copies instead of hot-linking.
// Usage: node scripts/download-images.mjs [extra-photo-ids...]
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "images");
const WIDTH = 2400;
const QUALITY = 82;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx?|json)$/.test(name)) files.push(p);
  }
  return files;
}

const ids = new Set(process.argv.slice(2));
for (const file of [...walk(path.join(ROOT, "src")), ...walk(path.join(ROOT, "content"))]) {
  for (const m of readFileSync(file, "utf8").matchAll(/photo-\d+-[0-9a-f]+|pexels-\d+/g)) ids.add(m[0]);
}

await mkdir(OUT, { recursive: true });
let downloaded = 0;
for (const id of ids) {
  const dest = path.join(OUT, `${id}.jpg`);
  if (existsSync(dest)) continue;
  const pexels = id.match(/^pexels-(\d+)$/)?.[1];
  const res = await fetch(
    pexels
      ? `https://images.pexels.com/photos/${pexels}/pexels-photo-${pexels}.jpeg?auto=compress&cs=tinysrgb&w=${WIDTH}`
      : `https://images.unsplash.com/${id}?w=${WIDTH}&q=${QUALITY}&fm=jpg&fit=max`,
  );
  if (!res.ok) {
    console.warn(`skip ${id}: HTTP ${res.status}`);
    continue;
  }
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  downloaded++;
}
console.log(`${ids.size} photos referenced, ${downloaded} downloaded to public/images`);
