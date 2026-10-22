/**
 * 把 custom/assets/ 里的图片同步到 public/custom/，
 * 这样 custom/*.ts 里可以直接用文件名引用（构建期路径为 /custom/<文件名>）。
 *
 * 会清掉 public/custom/ 里已不在 custom/assets/ 的旧文件，避免残留。
 */
import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = join(root, "custom", "assets");
const target = join(root, "public", "custom");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile() && entry.name !== ".gitkeep") files.push(full);
  }
  return files;
}

await rm(target, { recursive: true, force: true });

if (!existsSync(source)) {
  console.log("[custom] custom/assets 不存在，跳过同步。");
  process.exit(0);
}

const files = await walk(source);
if (!files.length) {
  console.log("[custom] custom/assets 为空，未复制任何文件。");
  process.exit(0);
}

for (const file of files) {
  const dest = join(target, relative(source, file));
  await mkdir(join(dest, ".."), { recursive: true });
  await cp(file, dest);
}

const total = (await Promise.all(files.map(async (file) => (await stat(file)).size))).reduce((a, b) => a + b, 0);
console.log(`[custom] 已同步 ${files.length} 个自定义素材到 public/custom/（${(total / 1024).toFixed(1)} KB）`);
