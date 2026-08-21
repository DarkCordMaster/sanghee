import type { ConversationHistoryItem } from '../types'
import Avatar from './Avatar'

interface SidebarDrawerProps {
  open: boolean
  history: ConversationHistoryItem[]
  onClose: () => void
  onStartNewConversation: () => void
  onOpenSettings: () => void
}

export default function SidebarDrawer({
  open,
  history,
  onClose,
  onStartNewConversation,
  onOpenSettings,
}: SidebarDrawerProps) {
  if (!open) return null

  return (
    <div className="absolute inset-0 z-40">
      <div onClick={onClose} className="absolute inset-0 bg-black/55" />
      <div className="absolute left-0 top-0 bottom-0 w-[84%] max-w-[340px] bg-[oklch(0.16_0.02_260)] flex flex-col shadow-[8px_0_30px_rgba(0,0,0,0.4)]">
        <header className="flex items-center gap-2.5 px-4 py-4.5 border-b border-border">
          <div className="w-[34px] h-[34px] rounded-full overflow-hidden shrink-0">
            <Avatar />
          </div>
          <div className="flex-1">
            <div className="font-extrabold text-[14.5px] font-display">상희</div>
            <div className="text-[11px] text-muted-3">대화 기록</div>
          </div>
          <button onClick={onClose} aria-label="닫기" className="bg-transparent border-none text-muted-2 cursor-pointer p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="p-3.5">
          <button
            onClick={onStartNewConversation}
            className="w-full p-2.5 rounded-xl border-[1.5px] border-dashed border-teal/50 bg-teal/[0.08] text-teal-bright font-bold text-[13px] cursor-pointer font-sans"
          >
            + 새 대화 시작
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-2.5 pb-4 flex flex-col gap-1">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={onClose}
              className="flex flex-col gap-0.5 items-start p-3 rounded-xl border-none bg-transparent cursor-pointer text-left hover:bg-surface-2 transition-colors"
            >
              <div className="text-[13px] font-bold text-ink-dim">{item.title}</div>
              <div className="text-[11.5px] text-faint whitespace-nowrap overflow-hidden text-ellipsis max-w-[260px]">
                {item.preview}
              </div>
              <div className="text-[10.5px] text-dim mt-px">{item.date}</div>
            </button>
          ))}
        </div>

        <footer className="px-4 py-3 border-t border-border">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 bg-transparent border-none text-muted-2 text-[12.5px] font-semibold cursor-pointer p-1"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            설정
          </button>
        </footer>
      </div>
    </div>
  )
}
