import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { BrandMark } from '@/components/BrandMark'
import { navLinks, site } from '@/data/content'
import { cn } from '@/lib/utils'

type IndicatorState = {
  left: number
  top: number
  width: number
  height: number
}

const SCROLL_LOCK_MS = 1000

export function Header() {
  const [activeHref, setActiveHref] = useState<string>(navLinks[0]?.href ?? '#hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const indicatorInitial: IndicatorState = useMemo(
    () => ({ left: 0, top: 0, width: 0, height: 0 }),
    [],
  )
  const [indicator, setIndicator] = useState<IndicatorState>(indicatorInitial)
  const [indicatorReady, setIndicatorReady] = useState(false)

  const navInnerRef = useRef<HTMLDivElement | null>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const scrollLockRef = useRef(false)
  const unlockTimerRef = useRef<number | null>(null)

  function measureActive(href: string) {
    const navEl = navInnerRef.current
    const linkEl = linkRefs.current[href]
    if (!navEl || !linkEl) return

    setIndicator({
      left: linkEl.offsetLeft,
      top: linkEl.offsetTop,
      width: linkEl.offsetWidth,
      height: linkEl.offsetHeight,
    })
    setIndicatorReady(true)
  }

  function lockScrollSpy(href: string) {
    scrollLockRef.current = true
    setActiveHref(href)

    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current)
    }

    unlockTimerRef.current = window.setTimeout(() => {
      scrollLockRef.current = false
      unlockTimerRef.current = null
    }, SCROLL_LOCK_MS)
  }

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    lockScrollSpy(href)
    setMobileOpen(false)

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const sectionId = href.replace('#', '')
    const section = document.getElementById(sectionId)
    if (!section) return

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useLayoutEffect(() => {
    const raf = window.requestAnimationFrame(() => measureActive(activeHref))
    return () => window.cancelAnimationFrame(raf)
  }, [activeHref])

  useEffect(() => {
    const onResize = () => measureActive(activeHref)
    window.addEventListener('resize', onResize)
    const t = window.setTimeout(onResize, 50)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', onResize)
    }
  }, [activeHref])

  useEffect(() => {
    return () => {
      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setMobileOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const sectionIds = navLinks
      .map((l) => l.href.replace('#', '').trim())
      .filter(Boolean)

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (!visible?.target) return
        const id = (visible.target as HTMLElement).id
        const nextHref = `#${id}`

        setActiveHref((prev) => (prev === nextHref ? prev : nextHref))
      },
      {
        threshold: [0.2, 0.35, 0.5],
        rootMargin: '-20% 0px -60% 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-3 px-5 py-4 sm:gap-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex min-w-0 shrink items-center gap-2"
        >
          <BrandMark />
          <div className="min-w-0">
            <p className="font-brand truncate text-sm font-bold uppercase tracking-[0.005em] text-brand sm:text-xl">
              {site.brand}
            </p>
            <p className="hidden truncate text-xs text-muted md:block">{site.tagline}</p>
          </div>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand lg:hidden"
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">Меню</span>
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          <nav className="hidden lg:flex">
            <div ref={navInnerRef} className="relative flex items-center gap-1 xl:gap-2">
              <span
                aria-hidden
                className={cn(
                  'absolute rounded-full border border-brand/40 bg-brand/10 backdrop-blur-sm',
                  indicatorReady
                    ? 'transition-[left,top,width,height] duration-200 ease-out'
                    : 'opacity-0',
                )}
                style={{
                  left: indicator.left,
                  top: indicator.top,
                  width: indicator.width,
                  height: indicator.height,
                }}
              />

              {navLinks.map((link) => {
                const isActive = link.href === activeHref
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    ref={(el) => {
                      linkRefs.current[link.href] = el
                    }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      'relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors xl:px-5',
                      isActive ? 'text-brand' : 'text-ink/80 hover:text-brand',
                    )}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </nav>

          <a
            href={site.phoneHref}
            className="shrink-0 rounded-full bg-brand px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-brand-hover sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {site.phone}
          </a>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-card px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === activeHref
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-brand/15 text-brand'
                        : 'text-ink/80 hover:bg-brand/10 hover:text-brand',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
