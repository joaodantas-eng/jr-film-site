import { testimonials } from "@/data/testimonials";
import { contactInfo } from "@/data/contact";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="border-y border-border bg-surface/40 py-24 md:py-32">
      <SectionContainer>
        <SectionTitle eyebrow="Depoimentos" title="Quem já passou pela JR Film." align="center" className="mx-auto" />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <ReviewCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-12 flex justify-center">
          <Button href={contactInfo.googleReviewUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
            <Star className="h-4 w-4 text-accent" />
            Avaliar no Google
          </Button>
        </div>
      </SectionContainer>
    </section>
  );
}
