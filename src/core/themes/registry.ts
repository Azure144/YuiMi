// 独立站点只保留 Fuyukawa Kagari 一套主题，并直接承接根路由。
// 保留 getThemePath / getCanonicalPath 的签名，页面与组件无需感知单主题实现。
export type ThemeId = "fuyukawa-kagari";

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
