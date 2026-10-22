// 独立站点只保留 Fuyukawa Kagari 一套主题，并直接承接根路由。
// 保留原有导出签名，页面与组件可以继续用 getThemePath / getCanonicalPath 生成链接。
export const THEME_STORAGE_KEY = "yuimi-theme-id-v2";
export const DEFAULT_THEME_ID = "fuyukawa-kagari";

export const themes = [
  {
    id: "fuyukawa-kagari",
    label: "Fuyukawa Kagari",
    description: "Fuyukawa Kagari 二次元手账主题",
    routePrefix: ""
  }
] as const;

export type ThemeId = (typeof themes)[number]["id"];

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && themes.some((theme) => theme.id === value);
}

export function getTheme(themeId: ThemeId) {
  return themes.find((theme) => theme.id === themeId) ?? themes[0];
}

function withLeadingSlash(pathname: string) {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getCanonicalPath(pathname: string) {
  return withLeadingSlash(pathname);
}

export function getThemePath(_themeId: ThemeId, pathname: string) {
  return getCanonicalPath(pathname);
}
