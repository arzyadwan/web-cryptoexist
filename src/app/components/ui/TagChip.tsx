import Link from 'next/link'

interface Props {
  label: string
  slug: string
  isActive?: boolean
}

export default function TagChip({ label, slug, isActive = false }: Props) {
  return (
    <Link
      href={`/tag/${slug}`}
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition-all border
        ${isActive 
          ? 'bg-black text-yellow-400 border-black' 
          : 'bg-white text-gray-500 border-gray-200 hover:border-yellow-400 hover:text-yellow-600'
        }
      `}
    >
      #{label}
    </Link>
  )
}