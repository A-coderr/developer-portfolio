import { writeFile } from "node:fs/promises";
import sharp from "sharp";

// Reuse the Next ImageResponse artwork instead of maintaining a second AK mark.
// Run against the local preview after changing src/app/icon.tsx or the palette.
const origin = process.argv[2] ?? "http://localhost:3010";
const response = await fetch(new URL("/icon", origin));
if (!response.ok) throw new Error(`Icon request failed: ${response.status}`);
const source = Buffer.from(await response.arrayBuffer());
const sizes = [16, 32, 48, 256];
const images = await Promise.all(
  sizes.map((size) => sharp(source).resize(size, size).png().toBuffer()),
);
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (const [index, size] of sizes.entries()) {
  const entry = 6 + index * 16;
  directory[entry] = size === 256 ? 0 : size;
  directory[entry + 1] = directory[entry];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(images[index].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += images[index].length;
}
await writeFile(new URL("../src/app/favicon.ico", import.meta.url), Buffer.concat([directory, ...images]));
console.log("Regenerated favicon.ico from /icon at 16, 32, 48 and 256px.");
