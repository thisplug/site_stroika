import { reviews } from '@/data/content'
import { SectionShell } from '@/components/SectionShell'

export function ReviewsSection() {
  return (
    <SectionShell id="reviews" title={reviews.title} subtitle={reviews.subtitle}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reviews.items.map((review) => (
          <article key={review.name} className="rounded-3xl bg-lavender p-6 sm:p-7">
            <p className="text-sm leading-relaxed text-ink/90 sm:text-[15px]">
              «{review.text}»
            </p>
            <div className="mt-6 flex items-end justify-between gap-4">
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
