interface AvatarProps {
  label?: string
}

export default function Avatar({ label = '상희' }: AvatarProps) {
  return (
    <div>
      <span>{label}</span>
    </div>
  )
}
