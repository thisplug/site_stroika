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
        'h-11 w-11 shrink-0 object-contain sm:h-14 sm:w-14',
        className,
      )}
    />
  )
}
