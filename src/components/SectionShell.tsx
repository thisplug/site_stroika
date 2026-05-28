import type { ReactNode } from 'react'
import { site } from '@/data/content'
import { cn } from '@/lib/utils'

type SectionShellProps = {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  tone?: 'white' | 'surface'
}

export function SectionShell({
  id,
  title,
  subtitle,
  children,
  className,
  tone = 'white',
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 xl:px-16 2xl:px-20',
        tone === 'white' && 'bg-surface',
        tone === 'surface' && 'bg-card',
        className,
      )}
    >
      <div className="w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {site.brand}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{subtitle}</p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
