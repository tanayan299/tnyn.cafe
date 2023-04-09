import defaultImage from "./assets/images/default.png";

export const SITE = {
  name: "tnyn.cafed",
  description: "This is tanayan's portfolio site",
  domain: "https://tnyn.cafe",
  baseUrl: "/",
  trailingSlash: false,
  github: "https://github.com/tanayan299",

  title: "tnyn.cafe",

  defaultImage: defaultImage,
  defaultTheme: "system", // "system" | "light" | "dark" | "light:only" | "dark:only"
};

export const BLOG = {
  disabled: false,
  postsPerPage: 4,

  blog: {
    disabled: false,
    pathname: "blog", // blog main path, you can change this to "articles" (/articles)
    noindex: false,
  },

  post: {
    disabled: false,
    pathname: "", // empty for /some-post, value for /pathname/some-post
    noindex: false,
  },

  category: {
    disabled: false,
    pathname: "category", // set empty to change from /category/some-category to /some-category
    noindex: false,
  },

  tag: {
    disabled: false,
    pathname: "tag", // set empty to change from /tag/some-tag to /some-tag
    noindex: false,
  },
};
