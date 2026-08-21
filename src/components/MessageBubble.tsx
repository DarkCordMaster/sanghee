import type { ChatMessage } from '../types'
import Avatar from './Avatar'

interface MessageBubbleProps {
  message: ChatMessage
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isSanghee = message.from === 'sanghee'

  return (
    <div
      className={`flex gap-2 items-end animate-bubble-in ${
        isSanghee ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {isSanghee && (
        <div className="w-[26px] h-[26px] rounded-full overflow-hidden shrink-0">
          <Avatar />
        </div>
      )}
      <div
        className={`max-w-[76%] px-[15px] py-[11px] text-[14.5px] leading-relaxed font-medium ${
          isSanghee
            ? 'bg-surface-2 text-ink-dim rounded-tl-[4px] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'
            : 'bg-coral text-[oklch(0.12_0.02_260)] rounded-tr-[4px] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
