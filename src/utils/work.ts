import type { PaginateFunction } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_WORK } from '~/utils/config';
import {
  cleanSlug,
  trimSlash,
  WORK_BASE,
  POST_PERMALINK_PATTERN,
  WORK_CATEGORY_BASE,
  WORK_TAG_BASE,
} from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (work: CollectionEntry<'work'>): Promise<Post> => {
  const { id, slug: rawSlug = '', data } = work;
  const { Content, remarkPluginFrontmatter } = await work.render();

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Post>> {
  const works = await getCollection('work');
  const normalizedPosts = works.map(async (work) => await getNormalizedPost(work));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((work) => !work.draft);

  return results;
};

let _works: Array<Post>;

/** */
export const isWorkEnabled = APP_WORK.isEnabled;
export const isWorkListRouteEnabled = APP_WORK.list.isEnabled;
export const isWorkPostRouteEnabled = APP_WORK.work.isEnabled;
export const isWorkCategoryRouteEnabled = APP_WORK.category.isEnabled;
export const isWorkTagRouteEnabled = APP_WORK.tag.isEnabled;

export const workListRobots = APP_WORK.list.robots;
export const workPostRobots = APP_WORK.work.robots;
export const workCategoryRobots = APP_WORK.category.robots;
export const workTagRobots = APP_WORK.tag.robots;

export const workPostsPerPage = APP_WORK?.postsPerPage;

/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_works) {
    _works = await load();
  }

  return _works;
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const works = await fetchPosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    works.some(function (work: Post) {
      return slug === work.slug && r.push(work);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const works = await fetchPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    works.some(function (work: Post) {
      return id === work.id && r.push(work);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const works = await fetchPosts();

  return works ? works.slice(0, _count) : [];
};

/** */
export const getStaticPathsWorkList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isWorkEnabled || !isWorkListRouteEnabled) return [];
  return paginate(await fetchPosts(), {
    params: { work: WORK_BASE || undefined },
    pageSize: workPostsPerPage,
  });
};

/** */
export const getStaticPathsWorkPost = async () => {
  if (!isWorkEnabled || !isWorkPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((work) => ({
    params: {
      work: work.permalink,
    },
    props: { work },
  }));
};

/** */
export const getStaticPathsWorkCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isWorkEnabled || !isWorkCategoryRouteEnabled) return [];

  const works = await fetchPosts();
  const categories = new Set<string>();
  works.map((work) => {
    typeof work.category === 'string' && categories.add(work.category.toLowerCase());
  });

  return Array.from(categories).flatMap((category) =>
    paginate(
      works.filter((work) => typeof work.category === 'string' && category === work.category.toLowerCase()),
      {
        params: { category: category, work: WORK_CATEGORY_BASE || undefined },
        pageSize: workPostsPerPage,
        props: { category },
      }
    )
  );
};

/** */
export const getStaticPathsWorkTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isWorkEnabled || !isWorkTagRouteEnabled) return [];

  const works = await fetchPosts();
  const tags = new Set<string>();
  works.map((work) => {
    Array.isArray(work.tags) && work.tags.map((tag) => tags.add(tag.toLowerCase()));
  });

  return Array.from(tags).flatMap((tag) =>
    paginate(
      works.filter((work) => Array.isArray(work.tags) && work.tags.find((elem) => elem.toLowerCase() === tag)),
      {
        params: { tag: tag, work: WORK_TAG_BASE || undefined },
        pageSize: workPostsPerPage,
        props: { tag },
      }
    )
  );
};
