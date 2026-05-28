import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type FeatureCardProps = {
  icon: ReactNode
  text: string
  className?: string
}

export function FeatureCard({ icon, text, className }: FeatureCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col gap-3 rounded-2xl border border-border bg-lavender p-4 sm:gap-4 sm:p-5 lg:p-6',
        className,
      )}
    >
      <div className="text-brand">{icon}</div>
      <p className="text-sm leading-relaxed text-ink/85 lg:text-[15px]">{text}</p>
    </article>
  )
}
