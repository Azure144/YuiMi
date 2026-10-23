/**
 * 全站页面过渡参数。
 *
 * 这里只描述 View Transition 的时长/缓动，实际 keyframes 在
 * `src/theme/styles/transitions.css`。保持单一定义，避免页面与文章
 * 各自动画、节奏不一致。
 */

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)";

const pageForward = {
  old: {
    name: "yuimi-page-out",
    duration: 180,
    easing: EASE_IN,
    fillMode: "both"
  },
  new: {
    name: "yuimi-page-in",
    duration: 300,
    delay: 40,
    easing: EASE_OUT,
    fillMode: "both"
  }
} as const;

const pageBackward = {
  old: {
    name: "yuimi-page-out-back",
    duration: 180,
    easing: EASE_IN,
    fillMode: "both"
  },
  new: {
    name: "yuimi-page-in-back",
    duration: 300,
    delay: 40,
    easing: EASE_OUT,
    fillMode: "both"
  }
} as const;

const articleForward = {
  old: {
    name: "yuimi-article-head-out",
    duration: 130,
    easing: EASE_IN,
    fillMode: "both"
  },
  new: {
    name: "yuimi-article-head-in",
    duration: 260,
    delay: 60,
    easing: EASE_OUT,
    fillMode: "both"
  }
} as const;

const articleBackward = {
  old: {
    name: "yuimi-article-head-out-back",
    duration: 130,
    easing: EASE_IN,
    fillMode: "both"
  },
  new: {
    name: "yuimi-article-head-in-back",
    duration: 260,
    delay: 60,
    easing: EASE_OUT,
    fillMode: "both"
  }
} as const;

/** 主内容区：退出上浮，进入时从下方滑入。 */
export const pageTransition = {
  forwards: pageForward,
  backwards: pageBackward
} as const;

/** 文章头部：比正文稍晚出现，形成更明显的错峰。 */
export const articleHeaderTransition = {
  forwards: articleForward,
  backwards: articleBackward
} as const;
