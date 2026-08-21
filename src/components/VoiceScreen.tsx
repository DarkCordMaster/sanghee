import type { VoiceState } from '../types'
import Avatar from './Avatar'

interface VoiceScreenProps {
  voiceState: VoiceState
  onExit: () => void
  onCycleState: () => void
}

const STATE_LABEL: Record<VoiceState, string> = {
  listening: '듣는 중',
  thinking: '생각하는 중',
  speaking: '말하는 중',
}

const STATE_COLOR: Record<VoiceState, string> = {
  listening: 'oklch(0.7 0.14 190)',
  thinking: 'oklch(0.75 0.02 260)',
  speaking: 'oklch(0.7 0.17 30)',
}

// 웨이브폼 막대 24개의 높이/애니메이션 속도를 voiceState로부터 매번 계산.
// 별도 state로 두지 않은 이유: 이 값들은 voiceState에만 종속된 "파생 데이터"라서
// state로 중복 저장하면 voiceState와 싱크가 어긋날 수 있음.
function buildWaveBars(voiceState: VoiceState) {
  const isSpeaking = voiceState === 'speaking'
  return Array.from({ length: 24 }, (_, i) => ({
    key: i,
    color: isSpeaking ? 'oklch(0.7 0.17 30)' : 'oklch(0.7 0.14 190)',
    height: isSpeaking ? `${30 + (i % 5) * 12}%` : `${20 + (i % 4) * 8}%`,
    animation: isSpeaking ? 'bar-speak' : 'bar-idle',
    duration: isSpeaking ? `${0.5 + (i % 4) * 0.1}s` : `${1.4 + (i % 3) * 0.2}s`,
    delay: `${(i % 6) * 0.06}s`,
  }))
}

export default function VoiceScreen({ voiceState, onExit, onCycleState }: VoiceScreenProps) {
  const waveBars = buildWaveBars(voiceState)
  const glowColor =
    voiceState === 'speaking' ? 'oklch(0.35 0.1 30 / 0.45)' : 'oklch(0.3 0.09 195 / 0.4)'
  const stateColor = STATE_COLOR[voiceState]

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: `radial-gradient(circle at 50% 25%, ${glowColor}, oklch(0.11 0.015 260) 65%)` }}
    >
      <header className="flex items-center gap-2.5 p-4">
        <button onClick={onExit} aria-label="뒤로" className="bg-transparent border-none p-1.5 cursor-pointer text-ink-soft">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div className="w-[26px] h-[26px] rounded-full overflow-hidden">
          <Avatar />
        </div>
        <div className="font-extrabold text-sm font-display">상희</div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-7 px-6">
        <div className="w-full max-w-[300px] h-[120px] rounded-3xl border-[1.5px] bg-[oklch(0.18_0.02_260_/_0.6)] flex items-center justify-center gap-[5px] relative overflow-hidden" style={{ borderColor: `${stateColor} / 0.3` }}>
          {voiceState === 'thinking' ? (
            <div className="flex gap-2 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-dot-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-dot-bounce" style={{ animationDelay: '0.15s' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-dot-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          ) : (
            waveBars.map((bar) => (
              <span
                key={bar.key}
                className="w-1 rounded-[3px]"
                style={{
                  background: bar.color,
                  height: bar.height,
                  animation: `${bar.animation} ${bar.duration} ease-in-out infinite`,
                  animationDelay: bar.delay,
                  transformOrigin: 'center',
                }}
              />
            ))
          )}
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <div className="font-display font-bold text-[19px]" style={{ color: stateColor }}>
            {STATE_LABEL[voiceState]}
          </div>
          {voiceState === 'speaking' && <div className="text-xs text-muted-3 font-semibold">탭해서 끊기</div>}
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 pt-7 pb-10">
        <button
          onClick={onCycleState}
          className="border border-[oklch(0.35_0.02_260)] bg-transparent text-muted-2 text-xs font-bold px-3.5 py-2 rounded-full cursor-pointer"
        >
          다음 상태 보기
        </button>
        <button
          onClick={onExit}
          aria-label="종료"
          className="w-[58px] h-[58px] rounded-full border-none bg-coral flex items-center justify-center cursor-pointer text-[oklch(0.12_0.02_260)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.3} strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
