export type Screen = 'onboarding' | 'chat' | 'voice' | 'settings'

export type MessageSender = 'user' | 'sanghee'

export interface ChatMessage {
  id: string
  from: MessageSender
  text: string
}

export type VoiceState = 'listening' | 'thinking' | 'speaking'

export interface ConversationHistoryItem {
  id: string
  title: string
  preview: string
  date: string
}

export interface VoiceOption {
  id: string
  label: string
}
