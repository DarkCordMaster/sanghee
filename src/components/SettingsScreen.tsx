import type { VoiceOption } from '../types'

interface SettingsScreenProps {
  onExit: () => void
  personality: number
  affection: number
  onPersonalityChange: (value: number) => void
  onAffectionChange: (value: number) => void
  voiceOptions: VoiceOption[]
  selectedVoiceId: string
  onSelectVoice: (id: string) => void
  offlinePreview: boolean
  onToggleOfflinePreview: () => void
  onResetInstallBanner: () => void
  onOpenHistory: () => void
}

export default function SettingsScreen({
  onExit,
  personality,
  affection,
  onPersonalityChange,
  onAffectionChange,
  voiceOptions,
  selectedVoiceId,
  onSelectVoice,
  offlinePreview,
  onToggleOfflinePreview,
  onResetInstallBanner,
  onOpenHistory,
}: SettingsScreenProps) {
  return (
    <div>
      <header>
        <button onClick={onExit} aria-label="뒤로">뒤로</button>
        <div>설정</div>
      </header>

      <div>
        <section>
          <h2>성격</h2>
          <label>
            <span>틱틱거림 정도 {personality}%</span>
            <input
              type="range"
              min={0}
              max={100}
              value={personality}
              onChange={(e) => onPersonalityChange(Number(e.target.value))}
            />
          </label>
          <label>
            <span>애정도 {affection}%</span>
            <input
              type="range"
              min={0}
              max={100}
              value={affection}
              onChange={(e) => onAffectionChange(Number(e.target.value))}
            />
          </label>
        </section>

        <section>
          <h2>목소리</h2>
          {voiceOptions.map((option) => (
            <button key={option.id} onClick={() => onSelectVoice(option.id)}>
              <span>{option.label}</span>
              {option.id === selectedVoiceId && <span>선택됨</span>}
            </button>
          ))}
        </section>

        <section>
          <h2>테마</h2>
          <p>다크 모드 고정 · 상희는 밤에 더 잘 어울려요</p>
        </section>

        <section>
          <h2>앱</h2>
          <button onClick={onResetInstallBanner}>홈 화면 설치 안내 다시 보기</button>
          <button onClick={onToggleOfflinePreview}>
            <span>오프라인 모드 미리보기</span>
            <span>{offlinePreview ? 'ON' : 'OFF'}</span>
          </button>
          <button onClick={onOpenHistory}>대화 기록 보기</button>
        </section>
      </div>
    </div>
  )
}
