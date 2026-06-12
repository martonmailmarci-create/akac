import sharp from "sharp";
import { readdir, rename } from "fs/promises";
import { join } from "path";

const dir = "c:\\Users\\marto\\Desktop\\AKAC STUDIO\\Akac Studio 3\\akac-studio\\public\\project2";
const MAX_PX = 2800; // covers full-width at 4K/2x DPR

const files = (await readdir(dir)).filter(f => f.endsWith(".jpg") || f.endsWith(".jpeg"));

for (const file of files) {
  const src = join(dir, file);
  const tmp = join(dir, `__tmp__${file}`);

  const meta = await sharp(src).metadata();
  const before = (await import("fs")).statSync(src).size;
  console.log(`${file}: ${meta.width}x${meta.height} (${Math.round(before/1024)}KB)`);

  await sharp(src)
    .resize({ width: MAX_PX, height: MAX_PX, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(tmp);

  await rename(tmp, src);
  const after = (await import("fs")).statSync(src).size;
  console.log(`  ✓ → ${Math.round(after/1024)}KB  (${Math.round((1-after/before)*100)}% smaller)`);
}

console.log("Done.");
