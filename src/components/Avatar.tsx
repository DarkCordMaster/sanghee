interface AvatarProps {
  label?: string
  className?: string
}

export default function Avatar({ label = '상희', className = 'w-full h-full' }: AvatarProps) {
  return (
    <div
      className={`${className} rounded-full bg-gradient-to-br from-teal/40 to-coral/30 flex items-center justify-center text-center px-1 text-[9px] font-bold text-ink-soft leading-tight`}
    >
      {label}
    </div>
  )
}
