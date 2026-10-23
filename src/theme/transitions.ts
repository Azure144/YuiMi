/**
 * 全站页面过渡参数。
 *
 * 这里只描述 View Transition 的时长/缓动，实际 keyframes 在
 * `src/theme/styles/transitions.css`。保持单一定义，避免页面与文章
 * 各自动画、节奏不一致。
 */

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)";

const pagePair = {
  old: {
    name: "yuimi-page-out",
    duration: 150,
    easing: EASE_IN,
    fillMode: "both"
  },
  new: {
    name: "yuimi-page-in",
    duration: 220,
    delay: 30,
    easing: EASE_OUT,
    fillMode: "both"
  }
} as const;

const articleHeaderPair = {
  old: {
    name: "yuimi-article-head-out",
    duration: 110,
    easing: EASE_IN,
    fillMode: "both"
  },
  new: {
    name: "yuimi-article-head-in",
    duration: 200,
    delay: 55,
    easing: EASE_OUT,
    fillMode: "both"
  }
} as const;

/** 主内容区：轻微上移淡入，退出时更短、更轻。 */
export const pageTransition = {
  forwards: pagePair,
  backwards: pagePair
} as const;

/** 文章头部：比正文稍晚一点出现，形成克制的错峰。 */
export const articleHeaderTransition = {
  forwards: articleHeaderPair,
  backwards: articleHeaderPair
} as const;
