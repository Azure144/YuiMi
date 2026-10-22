/**
 * 个人信息 —— 头像、昵称、社交链接、技术栈、兴趣清单都在这里。
 * 头像图片建议放到 custom/assets/ 下，然后把 avatar 写成文件名。
 */

export const profileIdentity = {
  /** 显示名，用在 About 页标题、作者署名、页脚 */
  displayName: "喝益胃",
  /** 英文名 / handle */
  handle: "Yuimi-chaya",
  /** 站点名（About 页副标题里用） */
  siteName: "Yuimi Lab",
  /** 一句话自我介绍 */
  bio: "二次元技术宅 / 兴趣驱动型折腾人，喜欢研究有意思的小东西，也喜欢把开发记录做得清透一点。",
  /** 头像：可写 /assets/profile.webp 这样的绝对路径，也可只写文件名（从 custom/assets/ 取） */
  avatar: "/assets/profile.webp",
  github: "https://github.com/Yuimi-chaya",
  bilibili: "https://space.bilibili.com/494350222"
} as const;

/** About 页头像下方的状态列表 */
export const profileStatus = [
  "正在学习 UE5",
  "在折腾 AstrBot / MMD / 小游戏",
  "喜欢把技术做得有点可爱"
] as const;

/**
 * 技术栈。key 决定图标：unity / blender / ue5 / mmd / astrbot。
 * 想加新条目，需要在 src/theme/pages/AboutPage.astro 的 techPresentation 里补一个图标。
 */
export const profileTech = [
  { key: "unity", name: "Unity3D", note: "游戏逻辑 / 互动实验" },
  { key: "blender", name: "Blender", note: "建模 / 场景 / 小道具" },
  { key: "ue5", name: "UE5", note: "正在学习中" },
  { key: "mmd", name: "MMD 制作", note: "动作 / 镜头 / 舞台感" },
  { key: "astrbot", name: "AstrBot", note: "插件开发 / 部署记录" }
] as const;

/**
 * 番剧墙。key 同时是图片名，图片需放在 public/assets/about/<key>.webp
 * （换成自己的图就替换同名文件，或改 AboutPage 里的路径规则）
 */
export const animeFavorites = [
  { key: "engage-kiss", title: "契约之吻", subtitle: "Engage Kiss" },
  { key: "aobuta", title: "青春猪头少年系列", subtitle: "Rascal Does Not Dream" },
  { key: "mushoku-tensei", title: "无职转生", subtitle: "Mushoku Tensei" },
  { key: "charlotte", title: "夏洛特", subtitle: "Charlotte" },
  { key: "summer-pockets", title: "Summer Pockets", subtitle: "夏日口袋" },
  { key: "eromanga-sensei", title: "埃罗芒阿老师", subtitle: "Eromanga Sensei" },
  { key: "no-game-no-life", title: "游戏人生", subtitle: "No Game No Life" },
  { key: "railgun", title: "某科学的超电磁炮", subtitle: "A Certain Scientific Railgun" }
] as const;

/** 偏好标签，图片同上，放在 public/assets/about/xp-<key>.webp */
export const xpFavorites = [
  { key: "catgirl", title: "猫娘", subtitle: "catgirl signal" },
  { key: "pink-hair", title: "粉毛", subtitle: "pink hair bias" },
  { key: "yandere", title: "病娇", subtitle: "sweet danger" },
  { key: "heavy-love", title: "重女", subtitle: "heavy love" }
] as const;

/** 常玩游戏。key 同时是图片名与图标映射键，见 AboutPage 的 gameIcons */
export const favoriteGames = [
  { key: "cyberpunk-2077", title: "赛博朋克 2077", subtitle: "Cyberpunk 2077" },
  { key: "the-finals", title: "终极角逐", subtitle: "THE FINALS" },
  { key: "kovaaks", title: "KovaaK's", subtitle: "aim trainer" },
  { key: "aimlabs", title: "Aimlabs", subtitle: "aim routine" }
] as const;

/** About 页「近况」三栏 */
export const currentSignals = [
  { label: "正在学习", text: "UE5 的场景、材质和蓝图，把脑内小房间慢慢搭出来。" },
  { label: "最近在折腾", text: "AstrBot 插件、部署教程、以及能让博客动起来的小机关。" },
  { label: "今日电波", text: "技术可以严谨一点，呈现方式可以更像玩具一点。" }
] as const;
