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
    <div className="absolute inset-0 flex flex-col">
      <header className="flex items-center gap-2.5 px-4 py-4 border-b border-border shrink-0">
        <button onClick={onExit} aria-label="뒤로" className="bg-transparent border-none p-1.5 cursor-pointer text-ink-soft">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div className="font-display font-extrabold text-[17px]">설정</div>
      </header>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pt-5 pb-10 flex flex-col gap-7">
        <section className="flex flex-col gap-3.5">
          <h2 className="text-xs font-extrabold tracking-wide text-teal uppercase">성격</h2>
          <label className="flex flex-col gap-1.5">
            <span className="flex justify-between text-[13px] font-semibold">
              <span>틱틱거림 정도</span>
              <span className="text-muted-2">{personality}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={personality}
              onChange={(e) => onPersonalityChange(Number(e.target.value))}
              className="w-full accent-teal"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex justify-between text-[13px] font-semibold">
              <span>애정도</span>
              <span className="text-muted-2">{affection}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={affection}
              onChange={(e) => onAffectionChange(Number(e.target.value))}
              className="w-full accent-coral"
            />
          </label>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-extrabold tracking-wide text-teal uppercase">목소리</h2>
          {voiceOptions.map((option) => {
            const selected = option.id === selectedVoiceId
            return (
              <button
                key={option.id}
                onClick={() => onSelectVoice(option.id)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border-[1.5px] cursor-pointer text-ink-dim text-sm font-semibold font-sans ${
                  selected ? 'border-teal bg-teal/10' : 'border-[oklch(0.28_0.02_260)] bg-surface-3'
                }`}
              >
                <span>{option.label}</span>
                {selected && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="oklch(0.75 0.13 190)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )
          })}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-extrabold tracking-wide text-teal uppercase">테마</h2>
          <p className="px-4 py-3.5 rounded-2xl bg-surface-3 text-[13px] text-muted-2 font-medium">
            다크 모드 고정 · 상희는 밤에 더 잘 어울려요
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-extrabold tracking-wide text-teal uppercase">앱</h2>
          <button
            onClick={onResetInstallBanner}
            className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-surface-3 border-none cursor-pointer text-ink-dim text-[13.5px] font-semibold font-sans text-left"
          >
            홈 화면 설치 안내 다시 보기
          </button>
          <button
            onClick={onToggleOfflinePreview}
            className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-surface-3 border-none cursor-pointer text-ink-dim text-[13.5px] font-semibold font-sans text-left"
          >
            <span>오프라인 모드 미리보기</span>
            <span
              className={`w-[38px] h-[22px] rounded-full relative shrink-0 transition-colors ${
                offlinePreview ? 'bg-teal' : 'bg-[oklch(0.35_0.02_260)]'
              }`}
            >
              <span
                className="w-[18px] h-[18px] rounded-full bg-white absolute top-0.5 transition-[left]"
                style={{ left: offlinePreview ? '18px' : '2px' }}
              />
            </span>
          </button>
          <button
            onClick={onOpenHistory}
            className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-surface-3 border-none cursor-pointer text-ink-dim text-[13.5px] font-semibold font-sans text-left"
          >
            대화 기록 보기
          </button>
        </section>
      </div>
    </div>
  )
}
