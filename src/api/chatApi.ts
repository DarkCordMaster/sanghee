// 백엔드(Spring Boot + MyBatis) 쪽 /api/chat/message 컨트롤러가 아직 정해진 스펙이 없어서,
// 가장 흔한 REST 채팅 API 형태(세션 ID + 메시지를 보내고 답장 하나를 받는 방식)로 우선 맞춰둠.
// 백엔드 응답 필드명이 확정되면 이 파일에 있는 SendMessageResponse 타입과 파싱 부분만
// 고치면 되도록, fetch 호출을 이 파일 하나로 모아뒀음(다른 컴포넌트는 이 함수만 부르면 됨).

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export interface SendMessageRequest {
  sessionId: string
  message: string
}

export interface SendMessageResponse {
  sessionId: string
  reply: string
}

export async function sendChatMessage(payload: SendMessageRequest): Promise<SendMessageResponse> {
  const response = await fetch(`${API_BASE}/api/chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    // 상태 코드를 그대로 던져서 호출부(useChat)가 실패 사유를 구분해 처리할 수 있게 함
    throw new Error(`채팅 응답 실패: ${response.status}`)
  }

  return response.json() as Promise<SendMessageResponse>
}
