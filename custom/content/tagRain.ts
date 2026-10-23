/**
 * 首页标签雨配置。
 *
 * 标签和配色是内容层配置；性能档位只影响绘制数量/像素密度，
 * 不改变标签的视觉样式。
 */
export const tagRain = {
  labels: [
    "Unity3D",
    "Blender",
    "UE5",
    "MMD",
    "AstrBot",
    "猫娘",
    "粉毛",
    "病娇",
    "重女",
    "契约之吻",
    "青春猪头少年",
    "无职转生",
    "夏洛特",
    "Summer Pockets",
    "埃罗芒阿老师",
    "游戏人生",
    "超电磁炮",
    "Cyberpunk 2077",
    "THE FINALS",
    "KovaaK's",
    "Aimlabs",
    "Yuimi Radio",
    "Live2D",
    "小游戏"
  ],
  palette: [
    { fill: "#fff5bf", stroke: "#f0c95a", ink: "#725d22" },
    { fill: "#ffddea", stroke: "#f2a8bd", ink: "#824759" },
    { fill: "#dff2ff", stroke: "#9fc8eb", ink: "#315a78" },
    { fill: "#dff5ea", stroke: "#9bd6b7", ink: "#315e49" },
    { fill: "#eee4ff", stroke: "#c9b8ef", ink: "#57467b" }
  ],
  tags: {
    spritePad: 22
  },
  pigs: {
    minWidth: 42,
    maxWidth: 58,
    heightRatio: 0.78,
    spritePad: 6
  },
  motion: {
    maxFps: {
      desktop: 60,
      mobile: 90,
      lite: 60
    },
    dropDelay: [120, 220],
    fadeDuration: 5200,
    dpr: {
      desktop: 1.35,
      mobile: 1.1,
      lite: 1
    },
    limits: {
      desktop: { labels: 20, pigs: 3 },
      mobile: { labels: 14, pigs: 2 },
      lite: { labels: 10, pigs: 2 }
    }
  }
} as const;
