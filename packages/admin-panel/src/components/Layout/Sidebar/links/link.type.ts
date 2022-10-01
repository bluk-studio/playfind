export interface ISidebarLink {
  icon: any,
  text: string,
  href: string,
  checker?: (link: ISidebarLink) => boolean
};