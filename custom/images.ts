/**
 * 图片清单 —— 站点的品牌图、头像、背景、图标都从这里取。
 *
 * 写法有两种：
 *   1. 绝对/远程路径："/assets/pig-brand.webp"、"https://example.com/a.png"
 *   2. 只写文件名："avatar.webp" → 自动解析成 /custom/avatar.webp
 *
 * 第二种最省事：把图片丢进 custom/assets/，这里写文件名即可。
 * 构建前会自动把 custom/assets/ 同步到 public/custom/。
 */

const CUSTOM_PREFIX = "/custom/";

/** 把「文件名」解析成可直接放进 src 的路径 */
export function resolveImage(value: string | undefined, fallback: string): string {
  const raw = (value ?? "").trim();
  if (!raw) return fallback;
  if (/^(https?:)?\/\//.test(raw) || raw.startsWith("/")) return raw;
  return `${CUSTOM_PREFIX}${raw.replace(/^\.?\//, "")}`;
}

export const images = {
  /** 头像（About / 首页 / 弹窗备用） */
  avatar: "/assets/profile.webp",
  /** 品牌小图（导航栏、唱片机中心） */
  brand: "/assets/pig-brand.webp",
  /** 滚动条上的小猪 */
  scrollPig: "/assets/mini-pig-scroll.webp",
  /** 首页大标题的 SVG 字标 */
  heroTitle: "/assets/hero-title.svg",
  /** Hero 区默认壁纸（文章无封面时的兜底） */
  heroWallpaper: "/assets/hero-wallpaper.webp",
  /** 页面背景大图 */
  pageBackground: "/assets/fuyukawa-kagari-bg.webp",
  /** 站点图标 */
  favicon: "/assets/pig-favicon.png",
  /** iOS 添加到主屏时的图标 */
  appleTouchIcon: "/assets/pig-apple-touch.png"
};

/**
 * 封面裁切焦点。键是封面路径，值是 object-position。
 * 想让某张封面在列表里更居中，在这里调即可。
 */
export const coverFocus: Record<string, string> = {
  "/blog-covers/cover-08.webp": "50% 30%"
};

/**
 * 漫画图替换。默认用 public/assets/manga/ 下的同名 webp。
 * 换成自己的图时，把文件放进 custom/assets/，再在这里写：
 *   "hero-character": { src: "my-hero.webp", width: 1920, height: 1080 }
 * width/height 省略时会沿用原图尺寸（建议填，避免布局抖动）。
 */
export const mangaOverrides: Record<string, { src: string; width?: number; height?: number }> = {};
