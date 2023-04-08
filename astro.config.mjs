import * as url from "url";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config.mjs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

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
  base: "/",

  output: "static",

  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
    image(),
  ],

  vite: {
    resolve: {
      alias: {
        "~/": `${__dirname}src/`,
      },
    },
  },
});
