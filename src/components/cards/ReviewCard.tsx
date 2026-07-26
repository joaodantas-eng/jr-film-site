import { Card } from "@/components/ui/Card";
import { Testimonial } from "@/types";
import { Star } from "lucide-react";

export function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="hover:-translate-y-0">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "fill-accent text-accent" : "text-border"}`}
          />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-foreground/90">&ldquo;{testimonial.content}&rdquo;</p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="font-medium text-foreground">{testimonial.author}</span>
        {testimonial.vehicle && (
          <span className="font-mono text-xs uppercase tracking-wide text-muted">{testimonial.vehicle}</span>
        )}
      </div>
    </Card>
  );
}
