# custom —— 站点自定义中心

这里放的都是「你个人」的东西，站点代码不会来这里抢方向盘。改完保存即可，`npm run dev` 会热更新，`npm run build` 后生效。

```text
custom/
├─ site.config.ts     站点名、标题、简介、作者、关键词、导航、配色、功能开关、域名
├─ profile.ts         头像、昵称、简介、社交链接、技术栈、番剧 / 偏好 / 游戏清单、近况
├─ images.ts          品牌图、背景、图标、404 插图、封面裁切焦点、漫画图替换
├─ assets/            放你自己的图片（构建时自动同步到 /custom/）
└─ content/
   ├─ notice.ts       首页公告、节日彩蛋、随机文案
   ├─ projects.ts     Works 页的项目与技术线
   └─ games.ts        Games 页的游戏推荐
```

---

## 1. 改站点名称

`site.config.ts`：

```ts
export const site = {
  name: "星空手账",              // 导航栏、页脚、内页标题后缀
  title: "星空手账 | Anime x Code", // 浏览器标签、默认 SEO 标题
  description: "……",             // 默认分享描述
  author: "你的名字",             // meta author、页脚版权
  keywords: ["…"],
  nav: [ … ]                      // 顶部导航
};
```

`name` 会同时出现在：导航栏品牌、`About | {name}` 这类页面标题、页脚、首页装饰字。改一处就够。

## 2. 换头像 / 换图

**方式 A（推荐，图片集中放）**

1. 把图片丢进 `custom/assets/`，例如 `avatar.webp`。
2. 在 `images.ts` 写文件名（不要写 `/`）：

```ts
export const images = {
  avatar: "avatar.webp",   // → /custom/avatar.webp
  ...
};
```

`npm run dev` / `npm run build` 会自动把 `custom/assets/` 同步到 `public/custom/`，不用手动复制。

**方式 B（直接用已有路径）**

```ts
avatar: "/assets/profile.webp",              // public 下的任意路径
brand: "https://example.com/logo.png",       // 也可以直接外链
```

带 `/` 或 `http` 的值会原样使用。

可换的图片一览：

| 字段 | 位置 | 说明 |
| --- | --- | --- |
| `avatar` | About / 首页头像 | 个人头像 |
| `brand` | 导航栏、唱片机中心 | 品牌小图 |
| `scrollPig` | 右侧滚动条 | 滚动条上的小猪 |
| `heroTitle` | 首页大标题 | 建议用 SVG 字标 |
| `heroWallpaper` | 文章无封面时的兜底 | 同时作为默认分享图 |
| `pageBackground` | 全站背景 | 大图 |
| `favicon` / `appleTouchIcon` | 标签页、iOS 主屏 | 图标 |
| `notFound` | 404 页 | 插图 |

首页的漫画主视觉（`hero-character`、`hero-manga` 等）用 `mangaOverrides`：

```ts
export const mangaOverrides = {
  "hero-character": { src: "my-hero.webp", width: 1920, height: 1080 }
};
```

## 3. 改配色

`site.config.ts` 的 `theme.colors`，留空字符串表示用主题默认值：

```ts
export const theme = {
  browserColor: "#f6fbfa",   // 手机浏览器地址栏颜色
  colors: {
    ink: "#2f3a52",          // 主文字
    inkSoft: "#6b7891",      // 次要文字
    paper: "#fffaf1",        // 纸张底色
    paperSoft: "#fff4df",
    pink: "#f7b7c8",         // 主强调色
    pinkSoft: "#ffe2ea",
    blue: "#9fc8eb",         // 次强调色
    blueSoft: "#dceefa",
    mint: "#b8dbc9",
    lavender: "#c9c2ee"
  }
};
```

改完会以 `html:root { --pink: … }` 的形式覆盖在页面头部，不用碰 CSS 文件。

## 4. 关掉不想用的功能

```ts
export const features = {
  sakuraRain: true,    // 樱花雨
  pigScrollbar: true,  // 小猪滚动条
  live2d: true,        // Live2D 看板娘
  musicPlayer: true    // 音乐播放器
};
```

设为 `false` 后：对应组件不渲染、脚本跳过初始化、右键菜单里的樱花开关也会一起隐藏。Live2D 和音乐都关掉时，右下角的工具面板整体不出现。

## 5. 改个人资料与清单

`profile.ts` 里是 About 页的全部内容：

- `profileIdentity`：显示名、handle、简介、头像、GitHub / B 站
- `profileStatus`：头像下的状态条目
- `profileTech`：技术栈（`key` 决定图标：`unity` / `blender` / `ue5` / `mmd` / `astrbot`）
- `animeFavorites` / `xpFavorites` / `favoriteGames`：三个图墙，`key` 同时是图片名，图在 `public/assets/about/<key>.webp`（`xp` 的是 `xp-<key>.webp`）
- `currentSignals`：近况三栏

## 6. 改公告与项目

- `content/notice.ts`：首页公告的节日、节气、冷知识、随机文案。结构是 `festivals` / `solarTerms2026` / `histories` / `fallbackThemes` / `fallbackActions` / `v50`，照着现有条目加就行。
- `content/projects.ts`：Works 页项目列表与技术线。
- `content/games.ts`：Games 页推荐游戏（记得保留原作者、许可证、仓库链接，页面上会展示）。

## 7. 改域名

`site.config.ts`：

```ts
export const build = {
  siteUrl: "https://your-domain.com"
};
```

部署时也可以用环境变量覆盖，优先级更高：

```bash
SITE_URL=https://your-domain.com npm run build
```

影响 `canonical`、`og:url`、`sitemap-index.xml`、`robots.txt`。**改了这里需要重启 `npm run dev`**，因为它是在 Astro 配置文件里读取的。

## 8. 第三方服务（可选）

```ts
export const services = {
  tencentMapKey: "你的腾讯位置服务 Key"
};
```

首页「本地信号」用它做 IP 定位。Key 有域名白名单，换域名后大概率失效；要么去腾讯位置服务申请自己的 Key，要么留空——留空会跳过定位接口，天气改用公开的 IP 粗定位，页面不会报错。

## 8. 第三方服务（可选）

```ts
export const services = {
  tencentMapKey: "你的腾讯位置服务 Key"
};
```

首页「本地信号」用它做 IP 定位。Key 有域名白名单，换域名后大概率失效；要么去腾讯位置服务申请自己的 Key，要么留空——留空会跳过定位接口，天气改用公开的 IP 粗定位，页面不会报错。

---

## 小提示

- `custom/assets/` 里的文件会全量同步，别放无关的大文件（会一起进 `dist/`）。
- 只想加文章：不用碰这里，直接写 `src/content/blog/*.md`。
- 图片建议 webp，单张控制在 300KB 以内；Cloudflare Pages 单文件上限 25MB。
- 改完跑一次 `npm run build`，能提前发现路径写错（构建会报缺失引用）。
