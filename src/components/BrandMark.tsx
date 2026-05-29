import { site } from '@/data/content'
import { cn } from '@/lib/utils'

type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <img
      src={site.logo}
      alt={site.brand}
      className={cn(
        'h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12',
        className,
      )}
    />
  )
}
