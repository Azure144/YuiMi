import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import expressiveCode from "astro-expressive-code";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExpressiveCode from "rehype-expressive-code";
import * as pagefind from "pagefind";
import { fileURLToPath } from "node:url";
import { build } from "./custom/site.config.ts";

// 部署域名：优先取环境变量 SITE_URL，其次取 custom/site.config.ts 里的 build.siteUrl。
const siteUrl = (process.env.SITE_URL || build.siteUrl).replace(/\/+$/, "");

const expressiveCodeOptions = {
  themes: ["github-dark"],
  defaultProps: {
    wrap: true,
    overridesByLang: {
      "bash,sh,zsh,powershell,ps1,bat,cmd": {
        frame: "terminal"
      }
    }
  },
  frames: {
    showCopyToClipboardButton: true,
    removeCommentsWhenCopyingTerminalFrames: false
  },
  styleOverrides: {
    borderRadius: "8px",
    codeFontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    codeFontSize: "0.9rem",
    codeLineHeight: "1.72",
    codePaddingBlock: "1.1rem",
    codePaddingInline: "1.25rem",
    codeBackground: "#111827",
    uiFontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    frames: {
      frameBoxShadowCssValue: "0 18px 38px rgba(12, 18, 31, 0.28)",
      editorActiveTabBackground: "#111827",
      terminalTitlebarBackground: "#fdf5f0",
      terminalTitlebarForeground: "#31425f",
      inlineButtonBackground: "#ffffff",
      inlineButtonForeground: "#31425f",
      inlineButtonBorder: "#f7b7c8"
    }
  }
};

const pagefindIntegration = () => ({
  name: "kagari-pagefind",
  hooks: {
    "astro:build:done": async ({ dir, logger }) => {
      const { index, errors } = await pagefind.createIndex({
        forceLanguage: "zh",
        includeCharacters: "_-:"
      });

      if (!index) {
        logger.warn(`Pagefind index was not created: ${errors.join(", ")}`);
        return;
      }

      const distDir = fileURLToPath(dir);
      const addResult = await index.addDirectory({
        path: distDir,
        glob: "**/*.html"
      });

      if (addResult.errors.length) {
        logger.warn(`Pagefind indexing warnings: ${addResult.errors.join(", ")}`);
      }

      const writeResult = await index.writeFiles({
        outputPath: fileURLToPath(new URL("./pagefind", dir))
      });

      if (writeResult.errors.length) {
        logger.warn(`Pagefind write warnings: ${writeResult.errors.join(", ")}`);
      } else {
        logger.info(`Pagefind indexed ${addResult.page_count} pages.`);
      }

      await pagefind.close();
    }
  }
});

export default defineConfig({
  site: siteUrl,
  output: "static",
  vite: {
    resolve: {
      alias: {
        "@custom": fileURLToPath(new URL("./custom", import.meta.url))
      }
    }
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "tap"
  },
  integrations: [
    expressiveCode(expressiveCodeOptions),
    sitemap(),
    icon({
      include: {
        tabler: [
          "home-heart",
          "book-2",
          "device-gamepad-2",
          "code",
          "user-heart",
          "search",
          "brand-github",
          "brand-bilibili",
          "sparkles",
          "heart",
          "device-gamepad",
          "movie",
          "pin",
          "terminal-2",
          "flower",
          "mood-smile",
          "chevron-down",
          "palette",
          "x",
          "arrow-up",
          "home",
          "archive",
          "arrow-left",
          "arrow-right",
          "link",
          "copy",
          "file-text",
          "player-play",
          "player-pause",
          "flask-2",
          "user-scan",
          "arrow-back-up",
          "activity-heartbeat",
          "refresh",
          "player-skip-forward",
          "arrow-down",
          "chevron-left",
          "chevron-right",
          "external-link"
        ],
        "simple-icons": [
          "unity",
          "blender",
          "unrealengine",
          "github",
          "bilibili",
          "steam",
          "thefinals"
        ]
      }
    }),
    pagefindIntegration()
  ],
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      gfm: true,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              className: ["heading-anchor"],
              ariaLabel: "复制标题链接"
            },
            content: {
              type: "text",
              value: "#"
            }
          }
        ],
        [rehypeExpressiveCode, expressiveCodeOptions]
      ]
    })
  },
  devToolbar: {
    enabled: false
  }
});
