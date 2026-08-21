import { useState } from 'react'
import type { ConversationHistoryItem, Screen, VoiceOption, VoiceState } from './types'
import { useChat } from './hooks/useChat'
import OnboardingScreen from './components/OnboardingScreen'
import ChatScreen from './components/ChatScreen'
import VoiceScreen from './components/VoiceScreen'
import SettingsScreen from './components/SettingsScreen'
import SidebarDrawer from './components/SidebarDrawer'

const HISTORY: ConversationHistoryItem[] = [
  { id: '1', title: '오늘, 새벽 산책 얘기', preview: '그니까 별 보러 가자매매', date: '오늘' },
  { id: '2', title: '시험 망친 날', preview: '괜찮아, 다음에 잘하면 되지', date: '어제' },
  { id: '3', title: '라면 먹을까 말까', preview: '먹어. 왜 고민해', date: '3일 전' },
  { id: '4', title: '주말 계획', preview: '나랑 놀 거면서 뭘 물어봐', date: '지난주' },
]

const VOICE_OPTIONS: VoiceOption[] = [
  { id: 'calm', label: '차분한 저음' },
  { id: 'bright', label: '발랄한 미드톤' },
  { id: 'husky', label: '허스키' },
]

function App() {
  const [screen, setScreen] = useState<Screen>('onboarding')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // 채팅 메시지 목록/입력값/전송 상태와 /api/chat/message 호출은
  // useChat 훅 안에 모아둠 (src/hooks/useChat.ts) — 화면 전환 같은 단순 UI 상태와
  // 네트워크 요청이 얽힌 채팅 상태를 한 컴포넌트에 같이 두면 로직을 추적하기 어려워짐
  const { messages, input, setInput, isSending, sendMessage, startNewConversation } = useChat()

  const [voiceState, setVoiceState] = useState<VoiceState>('listening')

  const [personality, setPersonality] = useState(70)
  const [affection, setAffection] = useState(45)
  const [selectedVoiceId, setSelectedVoiceId] = useState('husky')

  const [installDismissed, setInstallDismissed] = useState(false)
  const [offlinePreview, setOfflinePreview] = useState(false)

  const cycleVoiceState = () => {
    const order: VoiceState[] = ['listening', 'thinking', 'speaking']
    setVoiceState((prev) => order[(order.indexOf(prev) + 1) % order.length])
  }

  return (
    <div className="w-full h-screen flex justify-center items-stretch bg-[oklch(0.1_0.015_260)] font-sans text-ink overflow-hidden">
      <div className="w-full max-w-[480px] h-full relative bg-surface flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]">
      {screen === 'onboarding' && (
        <OnboardingScreen
          onEnterChat={() => setScreen('chat')}
          onEnterVoice={() => setScreen('voice')}
        />
      )}

      {screen === 'chat' && (
        <ChatScreen
          messages={messages}
          input={input}
          isSending={isSending}
          statusText={offlinePreview ? '오프라인' : '온라인'}
          showInstallBanner={!installDismissed}
          offlinePreview={offlinePreview}
          onInputChange={setInput}
          onSend={sendMessage}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenSettings={() => setScreen('settings')}
          onEnterVoice={() => setScreen('voice')}
          onInstallApp={() => setInstallDismissed(true)}
          onDismissInstallBanner={() => setInstallDismissed(true)}
        />
      )}

      {screen === 'voice' && (
        <VoiceScreen
          voiceState={voiceState}
          onExit={() => setScreen('chat')}
          onCycleState={cycleVoiceState}
        />
      )}

      {screen === 'settings' && (
        <SettingsScreen
          onExit={() => setScreen('chat')}
          personality={personality}
          affection={affection}
          onPersonalityChange={setPersonality}
          onAffectionChange={setAffection}
          voiceOptions={VOICE_OPTIONS}
          selectedVoiceId={selectedVoiceId}
          onSelectVoice={setSelectedVoiceId}
          offlinePreview={offlinePreview}
          onToggleOfflinePreview={() => setOfflinePreview((prev) => !prev)}
          onResetInstallBanner={() => {
            setInstallDismissed(false)
            setScreen('chat')
          }}
          onOpenHistory={() => setSidebarOpen(true)}
        />
      )}

      <SidebarDrawer
        open={sidebarOpen}
        history={HISTORY}
        onClose={() => setSidebarOpen(false)}
        onStartNewConversation={() => {
          startNewConversation()
          setSidebarOpen(false)
        }}
        onOpenSettings={() => {
          setSidebarOpen(false)
          setScreen('settings')
        }}
      />
      </div>
    </div>
  )
}

export default App
