import rss from "@astrojs/rss";

import { SITE } from "~/config";
import { getPosts } from "~/utils/getPosts";

const posts = await getPosts();

export const get = () =>
  rss({
    title: `${SITE.name}’s Blog`,
    description:
      "tanayan's portfolio site.",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      link: `blog/${post.slug}`,
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
    })),
  });