import { BrandMark } from '@/components/BrandMark'
import { site } from '@/data/content'

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card px-5 py-10 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div>
            <p className="font-brand text-lg font-bold uppercase tracking-[0.005em] text-brand">{site.brand}</p>
            <p className="mt-1 text-sm text-muted">{site.tagline} · Челябинск</p>
          </div>
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
