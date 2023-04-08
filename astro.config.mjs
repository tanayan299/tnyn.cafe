import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";

import { SITE } from "./src/config.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    image(),
    sitemap(),
  ],
  site: SITE.domain,
});
