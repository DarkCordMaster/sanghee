import type { ChatMessage } from '../types'
import Avatar from './Avatar'
import MessageBubble from './MessageBubble'

interface ChatScreenProps {
  messages: ChatMessage[]
  input: string
  isSending: boolean
  statusText: string
  showInstallBanner: boolean
  offlinePreview: boolean
  onInputChange: (value: string) => void
  onSend: () => void
  onOpenSidebar: () => void
  onOpenSettings: () => void
  onEnterVoice: () => void
  onInstallApp: () => void
  onDismissInstallBanner: () => void
}

export default function ChatScreen({
  messages,
  input,
  isSending,
  statusText,
  showInstallBanner,
  offlinePreview,
  onInputChange,
  onSend,
  onOpenSidebar,
  onOpenSettings,
  onEnterVoice,
  onInstallApp,
  onDismissInstallBanner,
}: ChatScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col">
      <header className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border shrink-0 bg-surface">
        <button
          onClick={onOpenSidebar}
          aria-label="메뉴"
          className="bg-transparent border-none p-1.5 cursor-pointer text-ink-soft hover:text-teal transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>

        <div className="w-[34px] h-[34px] rounded-full overflow-hidden shrink-0 border-[1.5px] border-teal/50">
          <Avatar />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="font-extrabold text-[15px] font-display">상희</div>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${offlinePreview ? 'bg-dim' : 'bg-teal'}`} />
            <span className="text-[11px] text-muted-3 font-semibold">{statusText}</span>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          aria-label="설정"
          className="bg-transparent border-none p-1.5 cursor-pointer text-ink-soft hover:text-teal transition-colors"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </header>

      {showInstallBanner && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-teal/10 border-b border-teal/25 animate-banner-in">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="oklch(0.75 0.13 190)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <div className="flex-1 text-xs font-semibold text-ink-dim leading-snug">
            홈 화면에 상희 추가하고 언제든 바로 만나기
          </div>
          <button
            onClick={onInstallApp}
            className="border-none bg-teal text-[oklch(0.12_0.02_260)] text-xs font-extrabold px-3 py-1.5 rounded-full cursor-pointer shrink-0"
          >
            추가
          </button>
          <button
            onClick={onDismissInstallBanner}
            aria-label="닫기"
            className="bg-transparent border-none text-faint cursor-pointer p-0.5 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {offlinePreview && (
        <div className="flex items-center justify-center gap-1.5 py-2 bg-[oklch(0.3_0.03_30_/_0.4)] border-b border-[oklch(0.5_0.1_30_/_0.3)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.75 0.13 40)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          </svg>
          <span className="text-[11.5px] font-bold text-[oklch(0.8_0.05_40)]">오프라인 · 재연결 시도 중</span>
        </div>
      )}

      <div className="no-scrollbar flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <footer className="flex items-center gap-2 px-3.5 py-3 border-t border-border shrink-0 bg-surface">
        <div className="flex-1 flex items-center bg-surface-3 rounded-full py-1 pr-1 pl-4">
          <input
            value={input}
            disabled={isSending}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSend()
            }}
            placeholder={isSending ? '상희가 답장 중...' : '상희한테 말 걸어보기...'}
            className="flex-1 bg-transparent border-none outline-none text-ink text-sm font-sans py-2 placeholder:text-muted-3 disabled:opacity-60"
          />
          <button
            onClick={onSend}
            disabled={isSending}
            aria-label="전송"
            className="w-9 h-9 rounded-full border-none bg-coral flex items-center justify-center cursor-pointer shrink-0 text-[oklch(0.12_0.02_260)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>
        <button
          onClick={onEnterVoice}
          aria-label="음성 모드"
          className="w-[46px] h-[46px] rounded-full border-none bg-teal flex items-center justify-center cursor-pointer shrink-0 text-[oklch(0.12_0.02_260)] shadow-[0_4px_14px_oklch(0.7_0.14_190_/_0.4)]"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      </footer>
    </div>
  )
}
