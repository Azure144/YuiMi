import { images, resolveImage } from "@custom/images";

// 站点级图片（品牌图、头像、背景、图标）由 custom/images.ts 统一管理；
// 下面 kagariAsset() 只负责主题内置素材（漫画页、关于页插画等）。
const themeRoot = "";

export function kagariAsset(path: string) {
  return `${themeRoot}/assets/${path.replace(/^\/+/, "")}`;
}

export const kagariAssets = {
  favicon: resolveImage(images.favicon, "/assets/pig-favicon.png"),
  appleTouchIcon: resolveImage(images.appleTouchIcon, "/assets/pig-apple-touch.png"),
  brand: resolveImage(images.brand, "/assets/pig-brand.webp"),
  scrollPig: resolveImage(images.scrollPig, "/assets/mini-pig-scroll.webp"),
  heroTitle: resolveImage(images.heroTitle, "/assets/hero-title.svg"),
  profile: resolveImage(images.avatar, "/assets/profile.webp"),
  heroWallpaper: resolveImage(images.heroWallpaper, "/assets/hero-wallpaper.webp"),
  pageBackground: resolveImage(images.pageBackground, "/assets/fuyukawa-kagari-bg.webp"),
  notFound: resolveImage(images.notFound, "/assets/legacy/404.webp"),
  musicManifest: `${themeRoot}/music/manifest.json`
} as const;
