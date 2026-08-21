import { useCallback, useRef, useState } from 'react'
import type { ChatMessage } from '../types'
import { sendChatMessage } from '../api/chatApi'

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  from: 'sanghee',
  text: '왔어? ...뭐 보고 싶은 거 있어서 온 거 아니지.',
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  // sessionId를 state가 아니라 ref로 들고 있는 이유: 대화 도중 리렌더링이 일어나도
  // 같은 세션을 유지해야 백엔드(MyBatis)가 이전 대화 맥락을 이어서 조회할 수 있음.
  // state로 두면 이 값이 바뀔 때마다 불필요한 리렌더가 발생하는데, 이 값 자체는
  // 화면에 표시되지 않으므로 리렌더를 유발할 이유가 없음.
  const sessionIdRef = useRef<string>(crypto.randomUUID())

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isSending) return

    const userMessage: ChatMessage = { id: crypto.randomUUID(), from: 'user', text }
    // 서버 응답을 기다리는 동안에도 내가 보낸 메시지가 바로 보이도록 먼저 화면에 반영
    // (낙관적 업데이트). 응답이 늦어져도 대화가 멈춘 것처럼 느껴지지 않게 하기 위함.
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsSending(true)

    try {
      const { reply } = await sendChatMessage({ sessionId: sessionIdRef.current, message: text })
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), from: 'sanghee', text: reply }])
    } catch (error) {
      // 네트워크/서버 오류가 나도 채팅이 끊긴 것처럼 보이지 않도록,
      // 상희 말투를 유지한 에러 메시지를 대화창에 그대로 추가함
      console.error('채팅 메시지 전송 실패', error)
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), from: 'sanghee', text: '...지금 좀 멍해서 못 들었어. 다시 말해줄래?' },
      ])
    } finally {
      setIsSending(false)
    }
  }, [input, isSending])

  const startNewConversation = useCallback(() => {
    // 새 대화는 곧 새 세션이므로 sessionId를 새로 발급해서 이전 대화 맥락과 섞이지 않게 함
    sessionIdRef.current = crypto.randomUUID()
    setMessages([WELCOME_MESSAGE])
  }, [])

  return { messages, input, setInput, isSending, sendMessage, startNewConversation }
}
