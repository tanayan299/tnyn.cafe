import { getBlogPermalink, getWorkPermalink, getAsset } from './../utils/permalinks';
const today = new Date();

export const headerData = {
  links: [
    {
      text: 'About',
      href: '/about',
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Work',
      href: getWorkPermalink(),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: 'Twitter',
      icon: 'tabler:brand-twitter',
      href: 'https://twitter.com/tananyan29',
    },
    {
      ariaLabel: 'Github',
      icon: 'tabler:brand-github',
      href: 'https://github.com/tanayan299',
    },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: ` © ${today.getFullYear()} tanayan / All rights reserved.`,
};
