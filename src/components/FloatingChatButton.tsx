import { useState } from 'react'
import { site } from '@/data/content'

const channels = [
  { key: 'telegram', label: 'Telegram', href: site.telegramUrl, color: '#2AABEE', delay: '0ms' },
  { key: 'vk', label: 'VK', href: site.vkUrl, color: '#4C75A3', delay: '70ms' },
  { key: 'whatsapp', label: 'WhatsApp', href: site.whatsappUrl, color: '#25D366', delay: '140ms' },
] as const

function ChannelIcon({ type }: { type: 'telegram' | 'vk' | 'whatsapp' }) {
  if (type === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M21.3 4.36c.33-.14.7.12.66.48l-2.73 14.37a.52.52 0 0 1-.74.38l-4.38-2.03l-2.16 2.03c-.23.22-.61.06-.61-.26v-3.18l6.73-8.26a.24.24 0 0 0-.33-.35l-8.36 6.75l-4.27-1.67a.52.52 0 0 1 .03-.98L21.3 4.36Z" />
      </svg>
    )
  }

  if (type === 'vk') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M12.76 17h-1.05s-2.33-.15-4.37-2.03C5.1 12.9 3.2 8.86 3.2 8.86s-.1-.26.01-.38c.13-.13.47-.14.47-.14l2.53-.01s.24.03.4.14c.14.1.21.28.21.28s.4.9.94 1.7c1.04 1.57 1.53 1.9 1.88 1.71.51-.28.36-2.24.36-2.24s0-.72-.25-1.04c-.2-.24-.58-.32-.75-.33-.14-.02.09-.28.38-.4c.44-.2 1.22-.2 2.13-.2c.72 0 .92.05 1.18.12c.62.15.59.61.55 1.6c-.02.66-.1 1.57.34 1.87c.18.13.64.02 1.78-1.68c.54-.8.95-1.76.95-1.76s.09-.18.22-.28c.14-.1.33-.08.33-.08l2.64-.01s.8-.08.92.24c.14.34-.3 1.14-1.36 2.54c-1 1.33-1.49 1.81-1.46 2.24c.03.32.38.61 1.11 1.29c1.52 1.42 1.92 2.17 1.97 2.26l.01.01c.41.6-.45.65-.45.65l-2.35.03s-.5.09-1.16-.31c-.35-.21-.68-.55-1-.87c-.5-.5-.95-.95-1.35-.87c-.7.19-.67 1.44-.67 1.44s0 .27-.15.4c-.17.15-.49.17-.49.17Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12.04 3.03A8.94 8.94 0 0 0 3 11.94c0 1.57.42 3.11 1.2 4.46L3 21l4.75-1.23a9.1 9.1 0 0 0 4.3 1.1h.01c4.98 0 9.03-3.99 9.04-8.91A8.93 8.93 0 0 0 12.04 3.03Zm4.97 12.57c-.2.55-1.15 1.03-1.58 1.1c-.42.07-.97.1-1.56-.09c-.36-.12-.83-.27-1.43-.52c-2.52-1.08-4.16-3.73-4.29-3.91c-.14-.18-1.03-1.37-1.03-2.62c0-1.24.66-1.85.9-2.1c.24-.24.52-.31.7-.31c.18 0 .35.01.5.01c.16.01.37-.06.57.43c.2.49.68 1.68.74 1.8c.06.12.1.27.02.42c-.08.15-.12.24-.24.36c-.12.12-.26.27-.36.36c-.12.12-.24.25-.1.49c.13.24.6.98 1.28 1.58c.88.79 1.61 1.04 1.84 1.16c.24.12.37.1.5-.06c.13-.16.56-.64.7-.85c.14-.22.29-.18.48-.11c.2.07 1.24.58 1.45.68c.22.11.37.16.42.25c.06.09.06.55-.14 1.1Z" />
    </svg>
  )
}

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      <div className="relative">
        <div
          className="absolute bottom-20 right-0 flex flex-col gap-2"
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          {channels.map((channel) => (
            <a
              key={channel.key}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={channel.key}
              className="inline-flex h-11 min-w-[132px] items-center justify-start gap-2 rounded-xl border border-white/12 bg-[#121316] px-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.28)] transition-all duration-300"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.92)',
                transitionDelay: isOpen ? channel.delay : '0ms',
              }}
            >
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                style={{ color: channel.color }}
              >
                <ChannelIcon type={channel.key} />
              </span>
              <span>{channel.label}</span>
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={isOpen ? 'Свернуть мессенджеры' : 'Открыть мессенджеры'}
          onClick={() => setIsOpen((v) => !v)}
          className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand text-black shadow-[0_10px_24px_rgba(212,175,55,0.45)] transition-transform hover:scale-105 hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-9 w-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M7.5 17.5H6a2.5 2.5 0 0 1-2.5-2.5V7A2.5 2.5 0 0 1 6 4.5h8A2.5 2.5 0 0 1 16.5 7v1" />
            <path d="M10 10.5h8A2.5 2.5 0 0 1 20.5 13v4A2.5 2.5 0 0 1 18 19.5h-3.2l-2.8 2V19.5H10A2.5 2.5 0 0 1 7.5 17V13a2.5 2.5 0 0 1 2.5-2.5Z" />
            <circle cx="12" cy="14.9" r="0.5" fill="currentColor" />
            <circle cx="14.2" cy="14.9" r="0.5" fill="currentColor" />
            <circle cx="16.4" cy="14.9" r="0.5" fill="currentColor" />
          </svg>
          <span className="absolute bottom-0 left-0 h-4 w-4 rounded-full border-2 border-surface bg-[#20c85a]" />
        </button>
      </div>
    </div>
  )
}
