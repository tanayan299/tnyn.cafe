import slugify from 'limax';

import { SITE, APP_BLOG, APP_WORK } from '~/utils/config';

import { trim } from '~/utils/utils';

export const trimSlash = (s: string) => trim(trim(s, '/'));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

const BASE_PATHNAME = SITE.base || '/';

export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

// BLOG Configs
export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const BLOG_CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const BLOG_TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';

export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

// WORK Configs
export const WORK_BASE = cleanSlug(APP_WORK?.list?.pathname);
export const WORK_CATEGORY_BASE = cleanSlug(APP_WORK?.category?.pathname);
export const WORK_TAG_BASE = cleanSlug(APP_WORK?.tag?.pathname) || 'tag';

export const WORK_PERMALINK_PATTERN = trimSlash(APP_WORK?.post?.permalink || `${WORK_BASE}/%slug%`);

/** */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/** */
export const getPermalink = (slug = '', type = 'page', base = ''): string => {
  let permalink: string;

  let tagBase;
  if (base === WORK_BASE) {
    tagBase = WORK_TAG_BASE;
  } else {
    tagBase = BLOG_TAG_BASE;
  }

  let categoryBase;
  if (base === WORK_BASE) {
    categoryBase = WORK_CATEGORY_BASE;
  } else {
    categoryBase = BLOG_CATEGORY_BASE;
  }

  switch (type) {
    case 'category':
      permalink = createPath(base || categoryBase, trimSlash(slug));
      break;

    case 'tag':
      permalink = createPath(base || tagBase, trimSlash(slug));
      break;

    case 'post':
      permalink = createPath(base || trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(base || slug);
      break;
  }

  return definitivePermalink(permalink);
};

/** */
export const getHomePermalink = (): string => getPermalink('/');

/** */
export const getBlogPermalink = (base = BLOG_BASE): string => getPermalink(base);
export const getWorkPermalink = (base = WORK_BASE): string => getPermalink(base);

/** */
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

/** */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);
