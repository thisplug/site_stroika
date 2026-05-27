import { about } from '@/data/content'
import { SectionShell } from '@/components/SectionShell'

export function AboutSection() {
  return (
    <SectionShell id="about" title={about.title} subtitle={about.subtitle} tone="surface">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-5">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-ink/85">
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {about.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-4">
                <p className="text-2xl font-extrabold text-brand">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl">
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
