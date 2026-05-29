import { prices } from '@/data/content'
import { SectionShell } from '@/components/SectionShell'
import { Button } from '@/components/ui/Button'

export function PricesSection() {
  return (
    <SectionShell id="prices" title={prices.title} subtitle={prices.subtitle} tone="surface">
      <p className="-mt-4 mb-10 max-w-3xl text-base leading-relaxed text-ink/85">{prices.note}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {prices.items.map((item) => (
          <article
            key={item.name}
            className="flex flex-col rounded-3xl border border-border bg-lavender p-6 sm:p-7"
          >
            <h3 className="text-base font-bold leading-snug text-ink sm:text-lg">{item.name}</h3>
            <p className="mt-3 text-2xl font-extrabold text-brand">{item.price}</p>
            <div className="mt-4 space-y-2.5">
              {item.details.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-muted sm:text-[15px]">
                  {line}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-brand/30 bg-lavender p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="max-w-2xl text-sm leading-relaxed text-ink/85 sm:text-base">
          Нужен точный расчёт? Оставьте заявку — приедем на замер бесплатно и подготовим смету под
          ваш объект.
        </p>
        <Button
          onClick={() =>
            document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Получить расчёт
        </Button>
      </div>
    </SectionShell>
  )
}
