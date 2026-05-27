import { hero } from '@/data/content'
import { FeaturesGrid } from '@/components/FeaturesGrid'
import { ContactForm } from '@/components/ContactForm'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-full w-full flex-1 overflow-hidden">
      <img
        src={hero.image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-35% via-white/92 via-55% to-white/25"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-full w-full flex-1 flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid w-full flex-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,28vw)] lg:gap-10 xl:gap-14 2xl:grid-cols-[minmax(0,1.25fr)_minmax(380px,26vw)]">
          <div className="flex min-h-0 flex-col justify-between gap-6 lg:gap-8">
            <div className="shrink-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:text-sm">
                {hero.overline}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] xl:text-6xl 2xl:text-[4.25rem]">
                {hero.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base lg:mt-5 lg:text-lg">
                {hero.description}
              </p>
              <Button
                className="mt-6 lg:mt-8"
                onClick={() =>
                  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {hero.cta}
              </Button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col justify-end gap-6 lg:gap-8">
              <FeaturesGrid />
            </div>
          </div>

          <div className="flex items-start lg:items-center lg:py-4">
            <ContactForm id="hero-form" className="w-full lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
