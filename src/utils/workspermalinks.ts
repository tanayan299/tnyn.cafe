import slugify from "limax";

import { WORKSITE, WORKS } from "~/config.mjs";
import { trim } from "~/utils/utils";

export const trimSlash = (s: string) => trim(trim(s, "/"));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
  return "/" + paths + (WORKSITE.trailingSlash && paths ? "/" : "");
};

const BASE_PATHNAME = WORKSITE.basePathname;

export const cleanSlug = (text = "") =>
  trimSlash(text)
    .split("/")
    .map((slug) => slugify(slug))
    .join("/");

export const POST_PERMALINK_PATTERN = trimSlash(
  WORKS?.works?.permalink || "/%slug%"
);

export const WORKS_BASE = cleanSlug(WORKS?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(WORKS?.category?.pathname || "category");
export const TAG_BASE = cleanSlug(WORKS?.tag?.pathname) || "tag";

/** */
export const getCanonical = (path = ""): string | URL => {
  const url = String(new URL(path, WORKSITE.origin));
  if (WORKSITE.trailingSlash == false && path && url.endsWith("/")) {
    return url.slice(0, -1);
  } else if (WORKSITE.trailingSlash == true && path && !url.endsWith("/")) {
    return url + "/";
  }
  return url;
};

/** */
export const getPermalink = (slug = "", type = "page"): string => {
  let permalink: string;

  switch (type) {
    case "category":
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;

    case "tag":
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;

    case "works":
      permalink = createPath(trimSlash(slug));
      break;

    case "page":
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

/** */
export const getHomePermalink = (): string => getPermalink("/");

/** */
export const getWorksPermalink = (): string => getPermalink(WORKS_BASE);

/** */
export const getAsset = (path: string): string =>
  "/" +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");

/** */
const definitivePermalink = (permalink: string): string =>
  createPath(BASE_PATHNAME, permalink);
