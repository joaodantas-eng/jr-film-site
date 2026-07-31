import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/services/whatsapp";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Phone, MapPin, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";

export function ContactSection() {
  const infoCards = [
    {
      id: "card-whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Falar agora",
      href: buildWhatsAppLink(defaultWhatsAppMessage),
      external: true,
      highlight: true,
    },
    {
      id: "card-phone",
      icon: Phone,
      label: "Telefone",
      value: contactInfo.phoneDisplay,
      href: `tel:${contactInfo.phoneRaw}`,
      external: false,
      highlight: false,
    },
    {
      id: "card-address",
      icon: MapPin,
      label: "Endereço",
      value: `${contactInfo.address.street}, ${contactInfo.address.neighborhood}`,
      href: contactInfo.mapDirectionsUrl,
      external: true,
      highlight: false,
    },
    {
      id: "card-hours",
      icon: Clock,
      label: "Horário",
      value: contactInfo.hours[0]?.time ?? "",
      href: undefined,
      external: false,
      highlight: false,
    },
  ];

  return (
    <section id="contato" className="py-24 md:py-32">
      <SectionContainer>
        <SectionTitle eyebrow="Contato" title="Fale com a gente agora mesmo." align="center" className="mx-auto" />

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {infoCards.map((item) => {
            const content = (
              <Card
                className={`flex h-full flex-col gap-3 ${item.highlight ? "border-accent/40 bg-accent/[0.06]" : ""}`}
              >
                <item.icon className={`h-5 w-5 ${item.highlight ? "text-accent" : "text-accent"}`} strokeWidth={1.75} />
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">{item.label}</p>
                  <p className="mt-1 text-sm font-medium leading-snug text-foreground">{item.value}</p>
                </div>
                {item.href && (
                  <ArrowUpRight className="mt-auto h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent" />
                )}
              </Card>
            );

            return (
              <StaggerItem key={item.id}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="block h-full"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="h-full">{content}</div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da JR Film no mapa"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-border bg-surface p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">Horário completo</p>
              <div className="mt-3 space-y-1.5">
                {contactInfo.hours.map((h) => (
                  <p key={h.day} className="text-sm text-foreground/85">
                    <span className="text-muted">{h.day}:</span> {h.time}
                  </p>
                ))}
              </div>

              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">Siga a JR Film</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground/85 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon name={social.icon} className="h-4 w-4" />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}
