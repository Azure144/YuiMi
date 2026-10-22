import type { APIRoute } from "astro";

// 让 robots.txt 里的 Sitemap 地址跟随构建时的 site（SITE_URL），无需手工维护。
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site ?? "https://fuyukawa-kagari.pages.dev").toString();
  const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${sitemap}`, ""].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
