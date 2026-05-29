import { about } from '@/data/content'
import { SectionShell } from '@/components/SectionShell'

function BulletList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed text-ink/85">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AboutSection() {
  return (
    <SectionShell id="about" title={about.title} subtitle={about.subtitle} tone="surface">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-8">
          <p className="text-base leading-relaxed text-ink/85">{about.lead}</p>

          <BulletList title={about.howWeWork.title} items={about.howWeWork.items} />
          <BulletList title={about.whyChoose.title} items={about.whyChoose.items} />

          <blockquote className="border-l-2 border-brand/50 pl-5">
            <p className="text-base italic leading-relaxed text-ink/90">
              «{about.quote.text}».
            </p>
            <footer className="mt-3 text-sm font-semibold text-brand">— {about.quote.author}</footer>
          </blockquote>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {about.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-lavender p-4">
                <p className="text-2xl font-extrabold text-brand">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-border pt-6">
            {about.highlights.map((item) => (
              <p key={item.text} className="text-base leading-relaxed text-ink/85">
                {'label' in item && item.label ? (
                  <>
                    <span className="font-semibold text-ink">{item.label}:</span> {item.text}
                  </>
                ) : (
                  item.text
                )}
              </p>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl lg:sticky lg:top-24">
          <img
            src={about.image}
            alt="Бригада на объекте"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </SectionShell>
  )
}
