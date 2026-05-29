import { reviews } from '@/data/content'
import { SectionShell } from '@/components/SectionShell'

export function ReviewsSection() {
  return (
    <SectionShell id="reviews" title={reviews.title} subtitle={reviews.subtitle}>
      <div className="grid items-start gap-5 sm:grid-cols-1 md:grid-cols-2">
        {reviews.items.map((review) => (
          <article
            key={`${review.name}-${review.date}`}
            className="flex h-fit w-full flex-col rounded-3xl border border-border bg-lavender p-6 sm:p-7"
          >
            {'service' in review && review.service && (
              <p className="mb-3 text-xs font-medium text-brand/90">{review.service}</p>
            )}
            <p className="text-sm leading-relaxed text-ink/90 sm:text-[15px]">
              «{review.text}»
            </p>
            {'image' in review && review.image && (
              <img
                src={review.image}
                alt={'imageAlt' in review && review.imageAlt ? review.imageAlt : review.name}
                className="mt-5 max-h-56 w-full rounded-2xl object-cover sm:max-h-64"
                loading="lazy"
              />
            )}
            <div className="mt-5 flex items-end justify-between gap-4 border-t border-border/60 pt-5">
              <div>
                <p className="font-semibold text-ink">{review.name}</p>
                <p className="mt-1 text-xs text-muted">{review.date}</p>
              </div>
              <div className="flex gap-0.5 text-brand" aria-label="Оценка 5 из 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
