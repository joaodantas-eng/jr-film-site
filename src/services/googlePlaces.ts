import "server-only";
import { Testimonial } from "@/types";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";
import { contactInfo } from "@/data/contact";
import { logServerError } from "@/lib/serverLog";

interface GoogleReview {
  rating: number;
  text?: { text: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName: string; uri?: string };
  publishTime?: string;
}

interface PlaceDetails {
  reviews?: GoogleReview[];
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
}

export interface ReviewsData {
  reviews: Testimonial[];
  // Nota média e total de avaliações da ficha no Google (só com a API ativa).
  rating?: number;
  ratingCount?: number;
  googleMapsUri?: string;
  origin: "google" | "manual";
}

// Busca avaliações reais da ficha da JR Film no Google (Places API, chave
// GOOGLE_PLACES_API_KEY só no servidor). O Google devolve no máximo 5
// avaliações; exibimos as de 4 estrelas ou mais, com nome do autor, link
// para o perfil e indicação de origem, como exigem as regras de exibição.
// Sem chave ou com erro, usa as avaliações cadastradas em data/testimonials.ts.
// Revalida 1x por dia (cache do Next.js), para não gerar custo a cada visita.
export async function getGoogleReviews(): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return { reviews: fallbackTestimonials, origin: "manual" };

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${contactInfo.googlePlaceId}?languageCode=pt-BR`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews,rating,userRatingCount,googleMapsUri",
      },
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Places API respondeu ${res.status}`);

    const data: PlaceDetails = await res.json();
    const goodReviews = (data.reviews ?? []).filter((r) => r.rating >= 4 && r.text?.text);
    if (goodReviews.length === 0) return { reviews: fallbackTestimonials, origin: "manual" };

    return {
      origin: "google",
      rating: data.rating,
      ratingCount: data.userRatingCount,
      googleMapsUri: data.googleMapsUri,
      reviews: goodReviews.slice(0, 6).map((r, i) => ({
        id: `google-${i}`,
        author: r.authorAttribution?.displayName ?? "Cliente no Google",
        authorUrl: r.authorAttribution?.uri,
        rating: Math.min(5, Math.max(1, Math.round(r.rating))) as Testimonial["rating"],
        content: r.text!.text,
        date: r.publishTime ?? "",
        relativeDate: r.relativePublishTimeDescription,
        source: "Google",
      })),
    };
  } catch (error) {
    logServerError("googlePlaces", error);
    return { reviews: fallbackTestimonials, origin: "manual" };
  }
}
