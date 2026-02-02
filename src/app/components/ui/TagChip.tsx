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
          ? 'bg-blue-600 text-white border-blue-600' 
          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
        }
      `}
    >
      #{label}
    </Link>
  )
}