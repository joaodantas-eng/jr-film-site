import { ContactInfo } from "@/types";

export const contactInfo: ContactInfo = {
  phoneDisplay: "(37) 3225-4326",
  phoneRaw: "553732254326",
  whatsappNumber: "5537991124115",
  address: {
    street: "Av. Dom Cabral, 140",
    neighborhood: "Jardim do Lago",
    city: "Nova Serrana",
    state: "MG",
    zip: "35522-008",
  },
  hours: [
    { day: "Segunda a sexta", time: "07h às 17h30" },
    { day: "Sábado", time: "08h às 12h" },
    { day: "Domingo", time: "Fechado" },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=Av.+Dom+Cabral,+140+-+Jardim+do+Lago,+Nova+Serrana+-+MG,+35522-008&output=embed",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Av.+Dom+Cabral%2C+140+-+Jardim+do+Lago%2C+Nova+Serrana+-+MG%2C+35522-008",
  googleReviewUrl: "https://g.page/r/Cch8_da1o-jTEAE/review",
};
