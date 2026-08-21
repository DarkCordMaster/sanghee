import { useState } from 'react'
import type { ChatMessage, ConversationHistoryItem, Screen, VoiceOption, VoiceState } from './types'
import OnboardingScreen from './components/OnboardingScreen'
import ChatScreen from './components/ChatScreen'
import VoiceScreen from './components/VoiceScreen'
import SettingsScreen from './components/SettingsScreen'
import SidebarDrawer from './components/SidebarDrawer'

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', from: 'sanghee', text: '왔어? ...뭐 보고 싶은 거 있어서 온 거 아니지.' },
  { id: '2', from: 'user', text: '그냥 심심해서 왔지' },
  { id: '3', from: 'sanghee', text: '심심하다고 아무나 붙잡는 거 아니거든. ...근데 뭐, 오늘은 시간 비어있으니까 있어줄게.' },
]

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

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')

  const [voiceState, setVoiceState] = useState<VoiceState>('listening')

  const [personality, setPersonality] = useState(70)
  const [affection, setAffection] = useState(45)
  const [selectedVoiceId, setSelectedVoiceId] = useState('husky')

  const [installDismissed, setInstallDismissed] = useState(false)
  const [offlinePreview, setOfflinePreview] = useState(false)

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), from: 'user', text }])
    setInput('')
  }

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
          setMessages([])
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
