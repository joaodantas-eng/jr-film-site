import { SocialLink } from "@/types";

// `isProfile`: perfis oficiais da empresa (entram no `sameAs` do JSON-LD).
// Agregadores de links, como o Linktree, aparecem no site mas não são perfis.
export const socialLinks: SocialLink[] = [
  {
    id: "soc-instagram",
    label: "Instagram",
    href: "https://www.instagram.com/jrfilmloja",
    icon: "Instagram",
    isProfile: true,
  },
  {
    id: "soc-facebook",
    label: "Facebook",
    href: "https://www.facebook.com/JRFILMNS",
    icon: "Facebook",
    isProfile: true,
  },
  {
    id: "soc-linktree",
    label: "Todos os links",
    href: "https://linktr.ee/JRFILMLOJA",
    icon: "Link2",
    isProfile: false,
  },
];
