import { contacts, site } from '@/data/content'
import { SectionShell } from '@/components/SectionShell'

const contactItems = [
  { label: 'Телефон', value: site.phone, href: site.phoneHref },
  { label: 'E-mail', value: site.email, href: site.emailHref },
  { label: 'Адрес', value: site.address },
  { label: 'Режим работы', value: site.schedule },
] as const

export function ContactsSection() {
  return (
    <SectionShell id="contacts" title={contacts.title} subtitle={contacts.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contactItems.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border bg-lavender p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {item.label}
            </p>
            {'href' in item && item.href ? (
              <a
                href={item.href}
                className="mt-2 block text-base font-semibold text-ink transition-colors hover:text-brand"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-2 text-base font-semibold text-ink">{item.value}</p>
            )}
          </div>
        ))}

        <div className="rounded-2xl border border-border bg-surface p-5 sm:col-span-2 lg:col-span-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Зона работы</p>
          <p className="mt-2 text-base leading-relaxed text-ink/85">
            Челябинск и ближайшие районы. Выезд бригады и доставка материалов согласовываются при
            оформлении заказа.
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
