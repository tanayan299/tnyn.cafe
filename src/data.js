import { getPermalink, getBlogPermalink, getAsset } from "./utils/permalinks";
import { getWorksPermalink } from "./utils/workspermalinks";
const today = new Date();

export const headerData = {
  links: [
    {
      text: "About",
      href: "/about",
    },
    {
      text: "Blog",
      href: getBlogPermalink(),
    },
    {
      text: "Works",
      href: getWorksPermalink(),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: "Terms", href: getPermalink("/terms") },
    { text: "Privacy Policy", href: getPermalink("/privacy") },
  ],
  socialLinks: [
    {
      ariaLabel: "Twitter",
      icon: "tabler:brand-twitter",
      href: "https://twitter.com/tananyan29",
    },
    {
      ariaLabel: "Github",
      icon: "tabler:brand-github",
      href: "https://github.com/tanayan299",
    },
    { ariaLabel: "RSS", icon: "tabler:rss", href: getAsset("/rss.xml") },
  ],
  footNote: ` © ${today.getFullYear()} tanayan / All rights reserved.`,
};
