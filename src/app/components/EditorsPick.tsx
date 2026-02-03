import Link from 'next/link'
import { Post } from '@/types/sanity'
import { BookmarkCheck, Quote } from 'lucide-react'

export default function EditorsPick({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="relative bg-[#0F172A] rounded-[2rem] p-8 overflow-hidden shadow-2xl">
      {/* Dekorasi Latar Belakang - Quote Icon Besar */}
      <Quote 
        className="absolute -top-4 -right-4 text-white/5 rotate-12" 
        size={120} 
        strokeWidth={3} 
      />

      {/* Header Section */}
      <div className="relative flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <BookmarkCheck size={16} className="text-white" />
          </div>
          <h3 className="font-black text-white text-[11px] uppercase tracking-[0.2em]">
            Editor&apos;s Intel
          </h3>
        </div>
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
          Curated
        </span>
      </div>

      {/* List Artikel */}
      <div className="relative space-y-8">
        {posts.map((post, idx) => (
          <article key={post._id} className="group flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-blue-500/50 group-hover:text-blue-400 transition-colors uppercase">
                Insight {idx + 1}
              </span>
              <div className="h-[1px] flex-grow bg-white/5 group-hover:bg-blue-500/30 transition-all"></div>
            </div>

            <Link href={`/news/${post.slug.current}`} className="block">
              <h4 className="text-base font-bold text-zinc-100 leading-tight group-hover:text-blue-400 transition-all duration-300">
                {post.title}
              </h4>
            </Link>

            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter">
                By {post.author?.name || 'Lead Analyst'}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] font-black text-white bg-blue-600 px-2 py-0.5 rounded uppercase">
                   Read →
                 </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="mt-10 pt-6 border-t border-white/5 text-center">
        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
          Internal Distribution Only
        </p>
      </div>
    </div>
  )
}