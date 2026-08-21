import Avatar from './Avatar'

interface OnboardingScreenProps {
  onEnterChat: () => void
  onEnterVoice: () => void
}

export default function OnboardingScreen({ onEnterChat, onEnterVoice }: OnboardingScreenProps) {
  return (
    <div>
      <Avatar />
      <div>
        <div>상희</div>
        <div>틱틱대지만, 결국 다 들어주는 애</div>
      </div>
      <div>
        <span>톰보이</span>
        <span>상어이빨</span>
        <span>츤데레</span>
      </div>
      <button onClick={onEnterChat}>대화 시작하기</button>
      <button onClick={onEnterVoice}>음성으로 바로 시작</button>
    </div>
  )
}
