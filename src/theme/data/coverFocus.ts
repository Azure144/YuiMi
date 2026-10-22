import { coverFocus } from "@custom/images";

/** 根据封面路径返回 object-position 覆盖值，未配置时返回 undefined */
export function getCoverStyle(cover: string | null | undefined) {
  const focus = coverFocus[cover ?? ""];
  return focus ? `--cover-focus: ${focus};` : undefined;
}
