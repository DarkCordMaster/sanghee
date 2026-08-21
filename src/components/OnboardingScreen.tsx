import Avatar from './Avatar'

interface OnboardingScreenProps {
  onEnterChat: () => void
  onEnterVoice: () => void
}

export default function OnboardingScreen({ onEnterChat, onEnterVoice }: OnboardingScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 gap-5 bg-[radial-gradient(circle_at_50%_30%,oklch(0.28_0.09_195_/_0.5),oklch(0.15_0.02_260)_60%)]">
      <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-2 border-teal/50 shadow-[0_0_40px_oklch(0.7_0.14_190_/_0.35)]">
        <Avatar label="상희 캐릭터 아트" />
      </div>
      <div className="text-center flex flex-col gap-2 mt-1">
        <div className="font-display font-extrabold text-[40px] tracking-tight text-ink">상희</div>
        <div className="text-sm text-muted font-medium">틱틱대지만, 결국 다 들어주는 애</div>
      </div>
      <div className="flex gap-2 flex-wrap justify-center mt-1">
        <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-teal/15 text-teal-bright border border-teal/30">
          톰보이
        </span>
        <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-coral/15 text-coral-light border border-coral/30">
          상어이빨
        </span>
        <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-chip/50 text-ink-soft border border-chip">
          츤데레
        </span>
      </div>
      <button
        onClick={onEnterChat}
        className="mt-5 w-full max-w-[280px] p-4 rounded-full bg-teal text-[oklch(0.12_0.02_260)] font-extrabold text-base shadow-[0_8px_24px_oklch(0.7_0.14_190_/_0.35)] hover:bg-teal-light transition-colors cursor-pointer"
      >
        대화 시작하기
      </button>
      <button
        onClick={onEnterVoice}
        className="bg-transparent border-none text-muted-3 text-[13px] font-semibold underline cursor-pointer p-1 hover:text-ink-soft transition-colors"
      >
        음성으로 바로 시작
      </button>
    </div>
  )
}
