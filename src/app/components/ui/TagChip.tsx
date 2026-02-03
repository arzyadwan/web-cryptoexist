import Link from 'next/link'
import { Hash } from 'lucide-react'

// TagChip.tsx (Enhanced)
interface Props {
  label: string
  slug: string
  isActive?: boolean
  isHot?: boolean // Tambahan untuk kategori yang sedang viral
}

export default function TagChip({ label, slug, isActive, isHot }: Props) {
  const getStyles = () => {
    if (isActive) return "bg-yellow-400 text-black border-zinc-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
    if (isHot) return "bg-black text-white border-yellow-400 animate-pulse";
    return "bg-zinc-100 text-zinc-500 border-transparent hover:border-zinc-900 hover:text-black hover:bg-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]";
  };

  return (
    <Link href={`/tag/${slug}`} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest border-2 transition-all ${getStyles()}`}>
      {isHot && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1"></span>}
      {label}
    </Link>
  );
}