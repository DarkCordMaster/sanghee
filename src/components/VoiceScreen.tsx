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

export default function VoiceScreen({ voiceState, onExit, onCycleState }: VoiceScreenProps) {
  return (
    <div>
      <header>
        <button onClick={onExit} aria-label="뒤로">뒤로</button>
        <Avatar />
        <div>상희</div>
      </header>

      <div>
        <div>{STATE_LABEL[voiceState]}</div>
      </div>

      <footer>
        <button onClick={onCycleState}>다음 상태 보기</button>
        <button onClick={onExit} aria-label="종료">종료</button>
      </footer>
    </div>
  )
}
