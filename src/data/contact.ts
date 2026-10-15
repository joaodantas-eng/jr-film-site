import { ContactInfo } from "@/types";

// Dados de contato e localização. Tudo que aparece no site, no JSON-LD e no
// prompt do assistente sai daqui — nenhum componente escreve telefone ou
// endereço manualmente.
const fullAddress = "Av. Dom Cabral, 140 - Jardim do Lago, Nova Serrana - MG, 35522-008";

export const contactInfo: ContactInfo = {
  phoneDisplay: "(37) 3225-4326",
  phoneRaw: "553732254326",
  phoneE164: "+55-37-3225-4326",
  whatsappNumber: "5537991124115",
  whatsappDisplay: "(37) 99112-4115",
  address: {
    street: "Av. Dom Cabral, 140",
    neighborhood: "Jardim do Lago",
    city: "Nova Serrana",
    state: "MG",
    zip: "35522-008",
    full: fullAddress,
  },
  // `days` usa os nomes do Schema.org; `opens/closes` no formato HH:MM.
  // Dias sem horário (fechado) ficam só com o rótulo.
  hours: [
    {
      day: "Segunda a sexta",
      time: "07h às 17h30",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:30",
    },
    { day: "Sábado", time: "08h às 12h", days: ["Saturday"], opens: "08:00", closes: "12:00" },
    { day: "Domingo", time: "Fechado", days: ["Sunday"] },
  ],
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`,
  mapSearchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  mapDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,
  googleReviewUrl: "https://g.page/r/Cch8_da1o-jTEAE/review",
  // Identificador da ficha no Google (Places API) — usado para buscar as avaliações reais.
  googlePlaceId: "ChIJd578tQlWpwARyHz91rWj6NM",
};
