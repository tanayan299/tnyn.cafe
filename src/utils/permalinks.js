import slugify from "limax";
import { SITE, BLOG } from "~/config.mjs";

const trim = (str, ch) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && str[start] === ch) ++start;
  while (end > start && str[end - 1] === ch) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

const trimSlash = (s) => trim(trim(s, "/"));
const createPath = (...params) => {
  const paths = params.filter((el) => !!el).join("/");
  return "/" + paths + (SITE.trailingSlash && paths ? "/" : "");
};

const baseUrl = trimSlash(SITE.baseUrl);
export const cleanSlug = (text) => slugify(trimSlash(text));

export const BLOG_BASE = cleanSlug(BLOG?.blog?.pathname);
export const POST_BASE = cleanSlug(BLOG?.post?.pathname);
export const CATEGORY_BASE = cleanSlug(BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(BLOG?.tag?.pathname);

export const getCanonical = (path = "") => new URL(path, SITE.domain);

export const getPermalink = (slug = "", type = "page") => {
  const _slug = cleanSlug(slug);

  switch (type) {
    case "category":
      return createPath(baseUrl, CATEGORY_BASE, _slug);

    case "tag":
      return createPath(baseUrl, TAG_BASE, _slug);

    case "post":
      return createPath(
        baseUrl,
        BLOG.postsWithoutBlogSlug ? "" : BLOG_BASE,
        _slug
      );

    case "page":
    default:
      return createPath(baseUrl, POST_BASE, _slug);
  }
};

export const getHomePermalink = () => {
  const permalink = getPermalink();
  return permalink !== "/" ? permalink + "/" : permalink;
};

export const getRelativelink = (link = "") => {
  return createPath(baseUrl, trimSlash(link));
};

export const getBlogPermalink = () => getPermalink(BLOG_BASE);
