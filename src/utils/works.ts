import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { Works } from "~/types";
import {
  cleanSlug,
  trimSlash,
  POST_PERMALINK_PATTERN,
} from "./workspermalinks";

const generatePermalink = async ({ id, slug, publishDate, category }) => {
  const year = String(publishDate.getFullYear()).padStart(4, "0");
  const month = String(publishDate.getMonth() + 1).padStart(2, "0");
  const day = String(publishDate.getDate()).padStart(2, "0");
  const hour = String(publishDate.getHours()).padStart(2, "0");
  const minute = String(publishDate.getMinutes()).padStart(2, "0");
  const second = String(publishDate.getSeconds()).padStart(2, "0");

  const permalink = POST_PERMALINK_PATTERN.replace("%slug%", slug)
    .replace("%id%", id)
    .replace("%category%", category || "")
    .replace("%year%", year)
    .replace("%month%", month)
    .replace("%day%", day)
    .replace("%hour%", hour)
    .replace("%minute%", minute)
    .replace("%second%", second);

  return permalink
    .split("/")
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
};

const getNormalizedPost = async (
  works: CollectionEntry<"works">
): Promise<Works> => {
  const { id, slug: rawSlug = "", data } = works;
  const { Content, remarkPluginFrontmatter } = await works.render();

  const {
    tags: rawTags = [],
    category: rawCategory,
    author = "Anonymous",
    publishDate: rawPublishDate = new Date(),
    ...rest
  } = data;

  const slug = cleanSlug(rawSlug.split("/").pop());
  const publishDate = new Date(rawPublishDate);
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));

  return {
    id: id,
    slug: slug,

    publishDate: publishDate,
    category: category,
    tags: tags,
    author: author,

    ...rest,

    Content: Content,
    // or 'body' in case you consume from API

    permalink: await generatePermalink({ id, slug, publishDate, category }),

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Works>> {
  const workes = await getCollection("works");
  const normalizedPosts = workes.map(
    async (works) => await getNormalizedPost(works)
  );

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((works) => !works.draft);

  return results;
};

let _workes: Array<Works>;

/** */
export const fetchPosts = async (): Promise<Array<Works>> => {
  if (!_workes) {
    _workes = await load();
  }

  return _workes;
};

/** */
export const findPostsBySlugs = async (
  slugs: Array<string>
): Promise<Array<Works>> => {
  if (!Array.isArray(slugs)) return [];

  const workes = await fetchPosts();

  return slugs.reduce(function (r: Array<Works>, slug: string) {
    workes.some(function (works: Works) {
      return slug === works.slug && r.push(works);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (
  ids: Array<string>
): Promise<Array<Works>> => {
  if (!Array.isArray(ids)) return [];

  const workes = await fetchPosts();

  return ids.reduce(function (r: Array<Works>, id: string) {
    workes.some(function (works: Works) {
      return id === works.id && r.push(works);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({
  count,
}: {
  count?: number;
}): Promise<Array<Works>> => {
  const _count = count || 4;
  const workes = await fetchPosts();

  return workes ? workes.slice(0, _count) : [];
};
