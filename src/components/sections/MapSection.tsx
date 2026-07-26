// Mantido como componente próprio para atender à especificação de sections (MapSection),
// embora hoje seja renderizado dentro de ContactSection para evitar repetir o mapa na página.
// Fica disponível caso uma página futura (ex: /contato dedicada) precise do mapa isolado.
import { contactInfo } from "@/data/contact";

export function MapSection() {
  return (
    <section aria-label="Mapa de localização" className="w-full">
      <iframe
        src={contactInfo.mapEmbedUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização da JR Film no mapa"
      />
    </section>
  );
}
