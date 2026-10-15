import Link from "next/link";
import { siteConfig } from "@/data/site";
import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";
import { mainNav } from "@/data/navigation";
import { services } from "@/data/services";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { CookiePreferencesButton } from "@/components/analytics/CookiePreferencesButton";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/services/whatsapp";

const headingClass = "text-sm font-bold text-foreground";
const linkClass = "text-sm text-foreground/80 transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface" data-track-location="rodape">
      <SectionContainer className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-16">
        <div>
          <Logo variant="dark-bg" height={26} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.description}</p>
          <ul className="mt-6 flex gap-3" aria-label="Redes sociais">
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} da JR Film (abre em nova aba)`}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-strong text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon name={social.icon} className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Navegação</h2>
          <ul className="mt-4 space-y-2.5">
            {mainNav.map((link) => (
              <li key={link.id}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Serviços</h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`/servicos/${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Contato</h2>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-foreground/80">
            <p>
              <a
                href={buildWhatsAppLink(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                WhatsApp {contactInfo.whatsappDisplay}
              </a>
            </p>
            <p>
              <a href={`tel:${contactInfo.phoneRaw}`} className={linkClass}>
                Telefone {contactInfo.phoneDisplay}
              </a>
            </p>
            <p>
              {contactInfo.address.street}, {contactInfo.address.neighborhood}
              <br />
              {contactInfo.address.city}/{contactInfo.address.state} · CEP {contactInfo.address.zip}
            </p>
            <p>
              <a
                href={contactInfo.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground underline underline-offset-4 hover:text-accent-fg"
              >
                Ver como chegar
              </a>
            </p>
          </address>
          <ul className="mt-5 space-y-1 text-sm text-muted">
            {contactInfo.hours.map((h) => (
              <li key={h.day}>
                {h.day}: <span className="text-foreground/80">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>

      <div className="border-t border-border py-6">
        <SectionContainer className="flex flex-col items-start justify-between gap-3 text-xs text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacidade" className="hover:text-foreground">
              Política de Privacidade
            </Link>
            <CookiePreferencesButton className="hover:text-foreground" />
          </div>
        </SectionContainer>
      </div>
    </footer>
  );
}
