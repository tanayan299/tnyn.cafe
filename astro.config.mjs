import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config.mjs";
import partytown from "@astrojs/partytown";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), image(), sitemap(), partytown()],
  site: SITE.domain,
  base: SITE.baseUrl,
  output: "static",
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), image()],
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src")
      }
    }
  }
});