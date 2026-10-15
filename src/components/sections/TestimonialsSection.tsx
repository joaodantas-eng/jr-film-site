import { getGoogleReviews } from "@/services/googlePlaces";
import { contactInfo } from "@/data/contact";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { Star } from "lucide-react";

export async function TestimonialsSection() {
  const { reviews, rating, ratingCount, googleMapsUri, origin } = await getGoogleReviews();
  if (reviews.length === 0) return null;

  const [first, ...rest] = reviews;

  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-titulo" className="border-t border-border py-20 md:py-28">
      <SectionContainer>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionTitle id="avaliacoes-titulo" title="Quem já passou pela JR Film." />
            {origin === "google" && rating && ratingCount ? (
              <p className="tabular mt-4 text-muted">
                Nota{" "}
                <strong className="text-foreground">
                  {rating.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
                </strong>{" "}
                de 5 no Google, com base em {ratingCount.toLocaleString("pt-BR")} avaliações.
              </p>
            ) : (
              <p className="mt-4 text-muted">Avaliações publicadas por clientes no Google.</p>
            )}
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            {googleMapsUri && (
              <Button href={googleMapsUri} target="_blank" rel="noopener noreferrer" variant="secondary">
                Ver todas no Google
              </Button>
            )}
            <Button href={contactInfo.googleReviewUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
              <Star className="h-4 w-4 text-amber-400" aria-hidden="true" />
              Avaliar a JR Film
            </Button>
          </div>
        </div>
        <ul className="mt-12 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          {first && (
            <li className="lg:row-span-2">
              <ReviewCard testimonial={first} featured />
            </li>
          )}
          {rest.slice(0, 2).map((testimonial) => (
            <li key={testimonial.id}>
              <ReviewCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
