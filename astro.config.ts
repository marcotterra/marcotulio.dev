import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  output: "hybrid",
  adapter: cloudflare(),
  integrations: [
    mdx({
      optimize: true,
    }),
    sitemap(),
  ],
  compressHTML: true,
});
