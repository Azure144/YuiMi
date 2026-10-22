/**
 * 站点主配置 —— 名称、副标题、导航、配色、功能开关都集中在这里。
 * 改完保存，`npm run dev` 会热更新，`npm run build` 生效。
 */

/** 站点名称与 SEO 信息（会用在页面标题、OG 卡片、JSON-LD、页脚） */
export const site = {
  /** 站点名，显示在导航栏、页脚、og:site_name */
  name: "Yuimi Lab",
  /** 浏览器标签标题；内页会自动拼成「页面名 | 站点名」 */
  title: "Yuimi Lab | Anime x Code",
  /** 一句话简介，用于首页与默认分享描述 */
  description: "一个混合二次元审美与技术开发记录的个人博客。",
  /** 作者署名，用于 meta author / 版权信息 */
  author: "喝益胃 / Yuimi-chaya",
  /** SEO 关键词 */
  keywords: ["喝益胃", "Yuimi-chaya", "Yuimi Lab", "个人博客", "二次元", "技术开发", "Astro"],
  /**
   * 顶部导航。href 用根路径，不要带 /themes 前缀。
   * icon 取 tabler 图标名，可用值见 custom 说明。
   */
  nav: [
    { href: "/", label: "HOME", icon: "tabler:home-heart", hint: "front page" },
    { href: "/blog/", label: "BLOG", icon: "tabler:book-2", hint: "notes" },
    { href: "/games/", label: "GAME", icon: "tabler:device-gamepad-2", hint: "playroom" },
    { href: "/projects/", label: "WORKS", icon: "tabler:code", hint: "projects" },
    { href: "/about/", label: "ME", icon: "tabler:user-heart", hint: "profile" }
  ]
};

/** 文章分类的中文名，键必须和文章 frontmatter 里的 category 对应 */
export const categoryLabel: Record<string, string> = {
  tech: "技术开发",
  anime: "二次元",
  life: "日常记录"
};

/**
 * 功能开关。关掉某个功能时，对应组件不会渲染，脚本也会跳过初始化。
 * 想彻底删掉某个依赖（比如不再用 Live2D），关开关即可，不必改代码。
 */
export const features = {
  /** 樱花雨背景动效 */
  sakuraRain: true,
  /** 右侧小猪滚动条 */
  pigScrollbar: true,
  /** Live2D 看板娘（依赖 jsDelivr 上的 live2d-widgets） */
  live2d: true,
  /** 右下角音乐播放器（读取 public/music/manifest.json） */
  musicPlayer: true
};

/** 配色。留空字符串表示沿用主题默认值 */
export const theme = {
  /** 浏览器地址栏 / 移动端顶部的主题色 */
  browserColor: "#f6fbfa",
  colors: {
    ink: "",
    inkSoft: "",
    paper: "",
    paperSoft: "",
    pink: "",
    pinkSoft: "",
    blue: "",
    blueSoft: "",
    mint: "",
    lavender: ""
  }
};

/** 音乐播放器上的文案 */
export const radio = {
  title: "Yuimi Radio",
  /** 播放器副标题，例如歌单名 */
  meta: "Yuimi playlist",
  /** 没有读取到歌曲时显示的占位曲名 */
  placeholder: "lofi sakura loop"
};

/**
 * 第三方服务（可选）。
 * 腾讯位置服务的 Key 有域名白名单，换域名后如需精确定位，
 * 去 https://lbs.qq.com/ 申请一个自己的 Key 填进来；留空则跳过定位，
 * 天气会退回到按 IP 粗定位的公开接口。
 */
export const services = {
  tencentMapKey: "PDHBZ-Q6QAT-W7NXN-VIUTJ-PPEUV-C5F3P"
};

/** 构建相关 */
export const build = {
  /**
   * 线上域名。也可以不改这里，在部署时用环境变量 SITE_URL 覆盖。
   * 会影响 canonical、og:url、sitemap 与 robots.txt。
   */
  siteUrl: "https://fuyukawa-kagari.pages.dev"
};
