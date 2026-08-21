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
    <div>
      <div onClick={onClose} />
      <div>
        <header>
          <Avatar />
          <div>
            <div>상희</div>
            <div>대화 기록</div>
          </div>
          <button onClick={onClose} aria-label="닫기">닫기</button>
        </header>

        <button onClick={onStartNewConversation}>+ 새 대화 시작</button>

        <div>
          {history.map((item) => (
            <button key={item.id} onClick={onClose}>
              <div>{item.title}</div>
              <div>{item.preview}</div>
              <div>{item.date}</div>
            </button>
          ))}
        </div>

        <footer>
          <button onClick={onOpenSettings}>설정</button>
        </footer>
      </div>
    </div>
  )
}
