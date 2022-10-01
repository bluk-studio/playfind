import type { ISidebarLink } from "./link.type";

import RiHome2Line from '~icons/ri/home-2-line'
import RiUser3Line from '~icons/ri/user-3-line'
import RiServerLine from '~icons/ri/server-line'

export const SidebarLinks: ISidebarLink[] = [
  {
    icon: RiHome2Line,
    text: "Главная",
    href: "/home",
  },
  {
    icon: RiUser3Line,
    text: "Пользователи",
    href: "/users"
  },
  {
    icon: RiServerLine,
    text: "Сервера",
    href: "/servers",
  }
] 