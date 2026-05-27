import { site } from '@/data/content'

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-surface px-5 py-10 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-extrabold text-ink">{site.brand}</p>
          <p className="mt-1 text-sm text-muted">{site.tagline} · Челябинск</p>
        </div>
        <a
          href={site.phoneHref}
          className="text-sm font-semibold text-brand hover:text-brand-hover"
        >
          {site.phone}
        </a>
      </div>
    </footer>
  )
}
