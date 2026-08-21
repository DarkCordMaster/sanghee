import type { ChatMessage } from '../types'
import Avatar from './Avatar'
import MessageBubble from './MessageBubble'

interface ChatScreenProps {
  messages: ChatMessage[]
  input: string
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
    <div>
      <header>
        <button onClick={onOpenSidebar} aria-label="메뉴">메뉴</button>
        <Avatar />
        <div>
          <div>상희</div>
          <div>{statusText}</div>
        </div>
        <button onClick={onOpenSettings} aria-label="설정">설정</button>
      </header>

      {showInstallBanner && (
        <div>
          <span>홈 화면에 상희 추가하고 언제든 바로 만나기</span>
          <button onClick={onInstallApp}>추가</button>
          <button onClick={onDismissInstallBanner} aria-label="닫기">닫기</button>
        </div>
      )}

      {offlinePreview && (
        <div>
          <span>오프라인 · 재연결 시도 중</span>
        </div>
      )}

      <div>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <footer>
        <input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSend()
          }}
          placeholder="상희한테 말 걸어보기..."
        />
        <button onClick={onSend} aria-label="전송">전송</button>
        <button onClick={onEnterVoice} aria-label="음성 모드">음성</button>
      </footer>
    </div>
  )
}
