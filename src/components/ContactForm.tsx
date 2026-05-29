import { useState, type FormEvent } from 'react'
import { contactForm } from '@/data/content'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type ContactFormProps = {
  className?: string
  id?: string
}

export function ContactForm({ className, id = 'contacts' }: ContactFormProps) {
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [phoneValue, setPhoneValue] = useState('')

  function normalizePhone(value: string) {
    const raw = value.trim()
    const hasPlus = raw.includes('+')
    const digits = raw.replace(/\D/g, '') // только цифры

    // Если пользователь начал вводить с '+', но цифр ещё нет — сразу показываем +7
    if (digits.length === 0 && hasPlus) return '+7'

    if (digits.length === 0) return ''

    // Убираем возможный "лишний" ввод страны (например, пользователь ввёл первую '7')
    // и всегда приводим к формату "+7XXXXXXXXXX" (10 цифр после +7)
    const normalizedDigits = digits.startsWith('7') ? digits.slice(1) : digits
    return `+7${normalizedDigits.slice(0, 10)}`
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Берём значение из state, чтобы оно всегда было нормализовано как "+7..."
    const phone = phoneValue

    const digitsCount = phone.replace(/\D/g, '').length

    if (!phone.startsWith('+7')) {
      setPhoneError('Номер должен начинаться с +7')
      setSubmitted(false)
      return
    }

    if (digitsCount !== 11) {
      setPhoneError('Введите номер в формате +7XXXXXXXXXX (10 цифр после +7)')
      setSubmitted(false)
      return
    }

    setPhoneError(null)
    if (!agreed) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
  }

  return (
    <div
      id={id}
      className={cn(
        'rounded-3xl border border-brand/25 bg-card p-6 shadow-[0_8px_40px_rgba(212,175,55,0.08)] sm:p-8',
        className,
      )}
    >
      <h2 className="text-base font-bold uppercase leading-snug tracking-wide text-ink sm:text-lg">
        {contactForm.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
        {contactForm.subtitle}
      </p>

      {submitted ? (
        <p className="mt-8 text-sm leading-relaxed text-muted">
          Спасибо! Мы свяжемся с вами в ближайшие 5 минут.
        </p>
      ) : (
        <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            required
            placeholder={contactForm.namePlaceholder}
            className="w-full rounded-xl bg-lavender px-4 py-3.5 text-sm text-ink outline-none placeholder:text-muted/70 focus:ring-2 focus:ring-brand/30"
          />
          <input
            type="tel"
            name="phone"
            required
            inputMode="tel"
            value={phoneValue}
            onChange={(e) => {
              const normalized = normalizePhone(e.currentTarget.value)
              setPhoneValue(normalized)

              setSubmitted(false)

              if (!normalized) {
                setPhoneError(null)
                return
              }

              const nextDigitsCount = normalized.replace(/\D/g, '').length

              if (!normalized.startsWith('+7')) {
                setPhoneError('Номер должен начинаться с +7')
                return
              }

              if (nextDigitsCount !== 11) {
                setPhoneError(
                  'Введите номер в формате +7XXXXXXXXXX (10 цифр после +7)',
                )
                return
              }

              setPhoneError(null)
            }}
            placeholder={contactForm.phonePlaceholder}
            aria-invalid={phoneError ? true : undefined}
            className={[
              'w-full rounded-xl bg-lavender px-4 py-3.5 text-sm text-ink outline-none placeholder:text-muted/70 focus:ring-2 focus:ring-brand/30',
              phoneError && 'ring-2 ring-red-500/60',
            ]
              .filter(Boolean)
              .join(' ')}
            autoComplete="tel"
          />

            {phoneError && (
              <p className="text-xs font-medium text-red-600">{phoneError}</p>
            )}

          <label className="flex cursor-pointer items-start gap-2.5 pt-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked)
                setSubmitted(false)
              }}
              className="mt-1 h-4 w-4 rounded border-border text-brand focus:ring-brand"
            />
            <span className="text-xs leading-relaxed text-muted">{contactForm.privacy}</span>
          </label>

          <Button
            type="submit"
            disabled={
              !agreed ||
              !phoneValue ||
              !phoneValue.startsWith('+7') ||
              phoneValue.replace(/\D/g, '').length !== 11 ||
              !!phoneError
            }
            className="mt-2 w-full rounded-2xl py-4 text-base disabled:cursor-not-allowed disabled:opacity-50"
          >
            {contactForm.submit}
          </Button>
        </form>
      )}
    </div>
  )
}
