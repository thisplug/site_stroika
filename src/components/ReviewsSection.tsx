import { useState } from 'react'
import { reviews } from '@/data/content'
import { SectionShell } from '@/components/SectionShell'
import { cn } from '@/lib/utils'

const MONTHS: Record<string, number> = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
}

const LONG_TEXT_THRESHOLD = 220

function parseReviewDate(date: string) {
  const [day, month, year] = date.trim().split(/\s+/)
  if (!day || !month || !year) return 0
  return new Date(Number(year), MONTHS[month] ?? 0, Number(day)).getTime()
}

const sortedReviews = [...reviews.items].sort(
  (a, b) => parseReviewDate(b.date) - parseReviewDate(a.date),
)

type Review = (typeof reviews.items)[number]

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false)
  const hasImage = 'image' in review && !!review.image
  const canCollapse =
    !('collapsible' in review && review.collapsible === false) &&
    (hasImage || review.text.length > LONG_TEXT_THRESHOLD)

  return (
    <article className="mb-5 flex w-full break-inside-avoid flex-col rounded-3xl border border-border bg-lavender p-6 sm:mb-6 sm:p-7">
      {'service' in review && review.service && (
        <p className="mb-3 text-xs font-medium text-brand/90">{review.service}</p>
      )}

      {canCollapse ? (
        <>
          <div
            className={cn(
              'relative overflow-hidden transition-[max-height] duration-300 ease-in-out',
              expanded ? 'max-h-[1200px]' : 'max-h-[5.75rem]',
            )}
          >
            <p className="text-sm leading-relaxed text-ink/90 sm:text-[15px]">
              «{review.text}»
            </p>
            {!expanded && (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-lavender via-lavender/80 to-transparent"
                aria-hidden
              />
            )}
          </div>

          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 inline-flex items-center self-start rounded-lg border border-brand/50 bg-brand/15 px-3.5 py-2 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/25 hover:text-brand-hover"
          >
            {expanded ? 'Свернуть отзыв' : 'Читать полностью'}
          </button>
        </>
      ) : (
        <p className="text-sm leading-relaxed text-ink/90 sm:text-[15px]">«{review.text}»</p>
      )}

      {'image' in review && review.image && (
        <img
          src={review.image}
          alt={'imageAlt' in review && review.imageAlt ? review.imageAlt : review.name}
          className="mt-5 aspect-[4/3] w-full rounded-2xl object-cover"
          loading="lazy"
        />
      )}

      <div className="mt-5 flex shrink-0 items-end justify-between gap-4 border-t border-border/60 pt-5">
        <div>
          <p className="font-semibold text-ink">{review.name}</p>
          <p className="mt-1 text-xs text-muted">{review.date}</p>
        </div>
        <div className="flex shrink-0 gap-0.5 text-brand" aria-label="Оценка 5 из 5">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>★</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function ReviewsSection() {
  return (
    <SectionShell id="reviews" title={reviews.title} subtitle={reviews.subtitle}>
      <ol className="mb-12 space-y-4 sm:space-y-5">
        {reviews.reasons.map((reason, index) => (
          <li
            key={reason}
            className="flex gap-3 text-base leading-relaxed text-ink/85 sm:gap-4 sm:text-[17px]"
          >
            <span className="shrink-0 font-bold text-brand">{index + 1}.</span>
            <span>{reason}</span>
          </li>
        ))}
      </ol>

      <h3 className="mb-8 text-xl font-extrabold uppercase tracking-tight text-ink sm:text-2xl">
        {reviews.clientsHeading}
      </h3>

      <div className="columns-1 gap-5 md:columns-2">
        {sortedReviews.map((review) => (
          <ReviewCard key={`${review.name}-${review.date}`} review={review} />
        ))}
      </div>
    </SectionShell>
  )
}
