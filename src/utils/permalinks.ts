import slugify from "limax";
import { SITE, BLOG } from "~/config.mjs";

const trim = (str = "", ch?: string) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && str[start] === ch) ++start;
  while (end > start && str[end - 1] === ch) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

const BASE_PATHNAME = SITE.baseUrl;

const trimSlash = (s: any) => trim(trim(s, "/"));
const createPath = (...params: string[]) => {
  const paths = params.filter((el) => !!el).join("/");
  return "/" + paths + (SITE.trailingSlash && paths ? "/" : "");
};

const baseUrl = trimSlash(SITE.baseUrl);
export const cleanSlug = (text: string) => slugify(trimSlash(text));

export const BLOG_BASE = cleanSlug(BLOG?.blog?.pathname);
export const POST_BASE = cleanSlug(BLOG?.post?.pathname);
export const CATEGORY_BASE = cleanSlug(BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(BLOG?.tag?.pathname);

export const getCanonical = (path = ""): string | URL =>
  new URL(path, SITE.domain);

export const getPermalink = (slug = "", type = "page") => {
  const _slug = cleanSlug(slug);

  switch (type) {
    case "category":
      return createPath(baseUrl, CATEGORY_BASE, _slug);
    case "tag":
      return createPath(baseUrl, TAG_BASE, _slug);
    case "post":
      return createPath(baseUrl, POST_BASE, _slug);
    case "page":
    default:
      return createPath(baseUrl, _slug);
  }
};

export const getHomePermalink = (): string => {
  const permalink = getPermalink();
  return permalink !== "/" ? permalink + "/" : permalink;
};

export const getRelativeLink = (link = ""): string => {
  return createPath(baseUrl, trimSlash(link));
};

export const getBlogPermalink = (): string => getPermalink(BLOG_BASE);

const definitivePermalink = (permalink: string): string =>
  createPath(BASE_PATHNAME, permalink);
