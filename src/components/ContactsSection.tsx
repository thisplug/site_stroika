import { contacts } from '@/data/content'
import { SectionShell } from '@/components/SectionShell'

export function ContactsSection() {
  return (
    <SectionShell id="contacts" title={contacts.title} subtitle={contacts.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border bg-lavender p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              <span className="mr-1.5" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </p>
            {'href' in item && item.href ? (
              <a
                href={item.href}
                className="mt-2 block text-base font-semibold text-ink transition-colors hover:text-brand sm:text-lg"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-2 text-base font-semibold text-ink sm:text-lg">{item.value}</p>
            )}
            {'note' in item && item.note && (
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm leading-relaxed text-ink/85 sm:text-base">
        {contacts.closing}
      </p>
    </SectionShell>
  )
}
