import Link from 'next/link'
import { Post } from '@/types/sanity'
import { TrendingUp } from 'lucide-react'

interface Props {
  posts?: Post[] 
}

export default function SidebarTrending({ posts = [] }: Props) {
  if (!posts || posts.length === 0) return null 

  return (
    <div className="bg-white border-2 border-zinc-900 rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1">
      {/* Header dengan Aksen Kuning */}
      <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between">
        <h3 className="font-black text-white text-[11px] uppercase tracking-[0.2em] flex items-center gap-2">
          <TrendingUp size={14} className="text-yellow-400" />
          Market Momentum
        </h3>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>

      <div className="divide-y divide-zinc-100">
        {posts.map((post, idx) => (
          <Link 
            key={post._id} 
            href={`/news/${post.slug.current}`} 
            className="flex gap-4 p-5 hover:bg-yellow-50/50 transition-all group relative overflow-hidden"
          >
            {/* Indikator Angka yang Bold */}
            <div className="flex-shrink-0 relative">
              <span className="text-3xl font-[1000] text-zinc-100 group-hover:text-yellow-400/30 transition-colors leading-none italic">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <h4 className="text-[13px] font-black text-zinc-900 leading-tight group-hover:text-black line-clamp-2 mb-1 uppercase tracking-tight">
                {post.title}
              </h4>
              
              <div className="flex items-center gap-2">
                 <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                   {post.author?.name || 'Staff'}
                 </span>
                 <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
                 <span className="text-[9px] font-black text-yellow-600 uppercase">
                    Trending
                 </span>
              </div>
            </div>

            {/* Hover Decorator */}
            <div className="absolute right-0 top-0 h-full w-1 bg-yellow-400 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
          </Link>
        ))}
      </div>

      {/* Footer Sidebar */}
      <Link 
        href="/trending" 
        className="block py-4 text-center border-t border-zinc-100 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black hover:bg-zinc-50 transition-all"
      >
        View Full Rankings →
      </Link>
    </div>
  )
}