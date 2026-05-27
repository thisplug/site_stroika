import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline'
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-colors',
        variant === 'primary' &&
          'bg-brand text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        variant === 'outline' &&
          'border border-neutral-300 bg-white text-ink hover:bg-neutral-50',
        className,
      )}
      {...props}
    />
  )
}
