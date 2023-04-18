import defaultImage from "./assets/images/tnyncafe_header.png";

const CONFIG = {
  name: "tnyn.cafe",

  origin: "https://tnyn.cafe",
  basePathname: "/",
  trailingSlash: false,

  title: "tnyn.cafe",
  description: "This is tanayan's portfolio site",
  defaultImage: defaultImage,

  defaultTheme: "dark", // Values: "system" | "light" | "dark" | "light:only" | "dark:only"

  language: "en",
  textDirection: "ltr",

  dateFormatter: new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "JST",
  }),

  //googleAnalyticsId: false, // or "G-XXXXXXXXXX",
  //googleSiteVerificationId: "orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M",

  blog: {
    disabled: false,
    postsPerPage: 4,

    works: {
      permalink: "/%slug%", // Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      noindex: false,
      disabled: false,
    },

    list: {
      pathname: "blog", // Blog main path, you can change this to "articles" (/articles)
      noindex: false,
      disabled: false,
    },

    category: {
      pathname: "category", // Category main path /category/some-category
      noindex: true,
      disabled: false,
    },

    tag: {
      pathname: "tag", // Tag main path /tag/some-tag
      noindex: true,
      disabled: false,
    },
  },

  works: {
    disabled: false,
    postsPerPage: 12,

    post: {
      permalink: "/%slug%", // Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      noindex: false,
      disabled: false,
    },

    list: {
      pathname: "works", // Blog main path, you can change this to "articles" (/articles)
      noindex: false,
      disabled: false,
    },

    category: {
      pathname: "category", // Category main path /category/some-category
      noindex: true,
      disabled: false,
    },

    tag: {
      pathname: "tag", // Tag main path /tag/some-tag
      noindex: true,
      disabled: false,
    },
  },
};

export const SITE = { ...CONFIG, blog: undefined };
export const BLOG = CONFIG.blog;

export const WORKSITE = { ...CONFIG, works: undefined };
export const WORKS = CONFIG.works;

export const DATE_FORMATTER = CONFIG.dateFormatter;
