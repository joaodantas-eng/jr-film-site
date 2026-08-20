import { siteConfig } from "@/data/site";
import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";
import { mainNav } from "@/data/navigation";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <SectionContainer className="grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="dark-bg" height={26} />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.description}</p>
          <div className="mt-6 flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Navegação</h4>
          <ul className="mt-4 space-y-2.5">
            {mainNav.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="text-sm text-foreground/80 hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Contato</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
            <li>{contactInfo.phoneDisplay}</li>
            <li>
              {contactInfo.address.street}, {contactInfo.address.neighborhood}
            </li>
            <li>
              {contactInfo.address.city}/{contactInfo.address.state}
            </li>
          </ul>
        </div>
      </SectionContainer>

      <div className="border-t border-border py-6">
        <SectionContainer className="flex flex-col items-center justify-between gap-2 text-xs text-muted md:flex-row">
          <span>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos os direitos reservados.
            {" · "}
            <a href="/privacidade" className="hover:text-foreground">Privacidade</a>
          </span>
          <span className="font-mono">{siteConfig.city} / {siteConfig.state}</span>
        </SectionContainer>
      </div>
    </footer>
  );
}
