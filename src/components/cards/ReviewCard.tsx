import { Testimonial } from "@/types";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReviewCard({ testimonial, featured = false }: { testimonial: Testimonial; featured?: boolean }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-3xl border border-border p-6 md:p-8",
        featured ? "bg-surface-elevated" : "bg-surface",
      )}
    >
      <div className="flex gap-0.5" role="img" aria-label={`Nota ${testimonial.rating} de 5 estrelas`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            aria-hidden="true"
            className={cn("h-4 w-4", i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-border-strong")}
          />
        ))}
      </div>
      <blockquote
        className={cn(
          "mt-5 flex-1 leading-relaxed text-foreground/90",
          featured ? "type-display text-xl font-bold leading-snug md:text-2xl" : "text-[1rem]",
        )}
      >
        <p>&ldquo;{testimonial.content}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-sm font-bold text-foreground"
        >
          {testimonial.author.trim().charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          {testimonial.authorUrl ? (
            <a
              href={testimonial.authorUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block truncate font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {testimonial.author}
            </a>
          ) : (
            <span className="block truncate font-semibold text-foreground">{testimonial.author}</span>
          )}
          {(testimonial.source || testimonial.relativeDate) && (
            <span className="block text-sm text-muted">
              {[testimonial.source && `Avaliação no ${testimonial.source}`, testimonial.relativeDate]
                .filter(Boolean)
                .join(", ")}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
