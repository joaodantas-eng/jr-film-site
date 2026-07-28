import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Phone, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

export function ContactSection() {
  return (
    <section id="contato" className="py-24 md:py-32">
      <SectionContainer className="grid gap-14 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="Contato" title="Vamos cuidar do seu veículo." />

          <ul className="mt-8 space-y-6">
            <li className="flex items-start gap-4">
              <Phone className="mt-0.5 h-5 w-5 text-accent" strokeWidth={1.75} />
              <div>
                <p className="text-sm text-muted">Telefone</p>
                <p className="text-foreground">{contactInfo.phoneDisplay}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="mt-0.5 h-5 w-5 text-accent" strokeWidth={1.75} />
              <div>
                <p className="text-sm text-muted">Endereço</p>
                <p className="text-foreground">
                  {contactInfo.address.street}, {contactInfo.address.neighborhood}
                  <br />
                  {contactInfo.address.city}/{contactInfo.address.state} — {contactInfo.address.zip}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Clock className="mt-0.5 h-5 w-5 text-accent" strokeWidth={1.75} />
              <div>
                <p className="text-sm text-muted">Horário de atendimento</p>
                {contactInfo.hours.map((h) => (
                  <p key={h.day} className="text-foreground">
                    {h.day}: {h.time}
                  </p>
                ))}
              </div>
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <WhatsAppButton size="lg" />
            <Button href={contactInfo.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
              Como chegar
            </Button>
          </div>

          <div className="mt-8 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
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
      </SectionContainer>
    </section>
  );
}
