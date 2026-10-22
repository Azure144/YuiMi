/**
 * 构建后自检：扫描 dist 里的 HTML / CSS，确认所有站内资源引用都能落地。
 * 换图、换封面、改导航之后最容易出现「路径写错但构建成功」，
 * 这一步会在 npm run build 末尾直接报错，避免上线才发现 404。
 */
import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const ignoredPrefixes = ["/pagefind/", "//", "http://", "https://", "mailto:", "tel:", "#", "data:"];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const exists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split("#")[0].split("?")[0]);
  const target = join(dist, clean.replace(/^\/+/, ""));
  if (existsSync(target)) {
    return stat(target).then((info) => info.isDirectory() ? existsSync(join(target, "index.html")) : true);
  }
  return Promise.resolve(false);
};

const files = await walk(dist);
const missing = new Map();

const record = (url, from) => {
  if (!url || ignoredPrefixes.some((prefix) => url.startsWith(prefix))) return;
  if (!url.startsWith("/")) return;
  if (!missing.has(url)) missing.set(url, new Set());
  missing.get(url).add(from.replace(dist, ""));
};

for (const file of files) {
  const ext = extname(file);
  if (![".html", ".css"].includes(ext)) continue;
  const content = await readFile(file, "utf8");

  if (ext === ".html") {
    for (const match of content.matchAll(/(?:src|href)="(\/[^"]*)"/g)) record(match[1], file);
    for (const match of content.matchAll(/srcset="([^"]+)"/g)) {
      for (const part of match[1].split(",")) record(part.trim().split(/\s+/)[0], file);
    }
  } else {
    for (const match of content.matchAll(/url\(["']?(\/[^"')]+)["']?\)/g)) record(match[1], file);
  }
}

const broken = [];
for (const [url, sources] of missing) {
  if (!(await exists(url))) broken.push([url, [...sources].slice(0, 2)]);
}

if (broken.length) {
  console.error(`\n[check-assets] 发现 ${broken.length} 个引用指向不存在的文件：`);
  for (const [url, sources] of broken.slice(0, 30)) {
    console.error(`  ${url}  ←  ${sources.join(", ")}`);
  }
  if (broken.length > 30) console.error(`  ...还有 ${broken.length - 30} 条`);
  console.error("[check-assets] 请检查 custom/images.ts、文章封面或 public/ 下的文件。\n");
  process.exit(1);
}

console.log(`[check-assets] ${files.length} 个产物文件，站内引用全部有效。`);
