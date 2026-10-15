import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/services/whatsapp";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { MapEmbed } from "@/components/map/MapEmbed";
import { Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

const channelClass =
  "group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-border py-4 transition-colors hover:bg-surface";

export function ContactSection() {
  const channels = [
    {
      href: buildWhatsAppLink(defaultWhatsAppMessage),
      external: true,
      icon: MessageCircle,
      label: "WhatsApp",
      value: contactInfo.whatsappDisplay,
      highlight: true,
    },
    {
      href: `tel:${contactInfo.phoneRaw}`,
      external: false,
      icon: Phone,
      label: "Telefone",
      value: contactInfo.phoneDisplay,
    },
    {
      href: contactInfo.mapDirectionsUrl,
      external: true,
      icon: MapPin,
      label: "Como chegar",
      value: `${contactInfo.address.street}, ${contactInfo.address.neighborhood} — ${contactInfo.address.city}/${contactInfo.address.state}`,
    },
  ];

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="py-20 md:py-28" data-track-location="contato">
      <SectionContainer className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionTitle
            id="contato-titulo"
            title="Fale com a JR Film ou venha até a oficina."
            description="Entre em contato com nossa equipe pelo WhatsApp ou telefone."
          />

          <ul className="mt-10 border-t border-border">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className={channelClass}
                >
                  <span
                    className={
                      channel.highlight
                        ? "flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-white"
                        : "flex h-11 w-11 items-center justify-center rounded-lg bg-surface-elevated text-foreground"
                    }
                  >
                    <channel.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{channel.label}</span>
                    <span className="tabular block font-semibold text-foreground">{channel.value}</span>
                  </span>
                  <ArrowUpRight
                    className="mr-2 h-5 w-5 text-muted transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-muted">Horário de atendimento</h3>
              <dl className="tabular mt-3 space-y-2 text-[0.9375rem]">
                {contactInfo.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-foreground/80">{h.day}</dt>
                    <dd className="font-semibold text-foreground">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted">Redes sociais</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-strong px-4 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground hover:text-foreground"
                    >
                      <Icon name={social.icon} className="h-4 w-4" aria-hidden="true" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border lg:aspect-auto lg:min-h-[520px]">
          <MapEmbed />
        </div>
      </SectionContainer>
    </section>
  );
}
