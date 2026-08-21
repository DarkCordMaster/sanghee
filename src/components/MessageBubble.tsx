import type { ChatMessage } from '../types'
import Avatar from './Avatar'

interface MessageBubbleProps {
  message: ChatMessage
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isSanghee = message.from === 'sanghee'

  return (
    <div>
      {isSanghee && <Avatar />}
      <div>{message.text}</div>
    </div>
  )
}
