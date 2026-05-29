import { site } from '@/data/content'

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card px-5 py-8 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="text-xs leading-relaxed text-muted sm:text-sm">
        <p className="font-medium text-ink/80">{site.legal.name}</p>
        <p className="mt-2">
          ОГРНИП {site.legal.ogrnip} · ИНН {site.legal.inn}
        </p>
        <p className="mt-2">{site.legal.address}</p>
      </div>
    </footer>
  )
}
