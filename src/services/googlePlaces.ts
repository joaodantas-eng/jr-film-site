import "server-only";
import { Testimonial } from "@/types";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";

const PLACE_ID = "ChIJd578tQlWpwARyHz91rWj6NM";
const MIN_RATING = 4;

interface GoogleReview {
  rating: number;
  text?: { text: string };
  authorAttribution?: { displayName: string };
  publishTime?: string;
}

// Busca avaliações reais do Google (só 4 estrelas ou mais). Se a chave não
// estiver configurada ou a API falhar, cai para os depoimentos fixos em
// data/testimonials.ts — mesmo padrão de fallback usado com o Gemini.
export async function getGoogleTestimonials(): Promise<Testimonial[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return fallbackTestimonials;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews`, {
      headers: { "X-Goog-Api-Key": apiKey },
      next: { revalidate: 60 * 60 * 24 }, // revalida 1x por dia
    });
    if (!res.ok) throw new Error(`Places API respondeu ${res.status}`);

    const data: { reviews?: GoogleReview[] } = await res.json();
    const goodReviews = (data.reviews ?? []).filter((r) => r.rating >= MIN_RATING && r.text?.text);

    if (goodReviews.length === 0) return fallbackTestimonials;

    return goodReviews.slice(0, 6).map((r, i) => ({
      id: `google-${i}`,
      author: r.authorAttribution?.displayName ?? "Cliente Google",
      rating: r.rating as Testimonial["rating"],
      content: r.text!.text,
      date: r.publishTime ?? "",
    }));
  } catch (error) {
    console.error("[googlePlaces] falha ao buscar avaliações, usando fallback:", error);
    return fallbackTestimonials;
  }
}
