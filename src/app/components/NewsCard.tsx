import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'
import { Clock, User, ArrowRight } from 'lucide-react'

interface Props {
  post: Post
  minimal?: boolean 
}

export default function NewsCard({ post, minimal = false }: Props) {
  return (
    <article className="group flex flex-col bg-white transition-all duration-500 relative">
      {/* 1. Media Container: Aspect Ratio 16:9 yang Konsisten */}
      <div className={`relative w-full overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 transition-all duration-500 group-hover:border-zinc-900 group-hover:shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.1)] ${minimal ? 'aspect-[16/10]' : 'aspect-video'}`}>
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[10px] font-black uppercase text-zinc-300 italic tracking-[0.2em]">
            No Signal
          </div>
        )}
        
        {/* Category Badge: Kontras Tinggi */}
        <div className="absolute top-4 left-4 z-10">
          {post.categories?.slice(0, 1).map((cat: any, idx: number) => (
            <span key={idx} className="bg-black text-yellow-400 text-[9px] font-[1000] px-3 py-1.5 rounded-md uppercase tracking-[0.15em] shadow-2xl">
              {cat.title}
            </span>
          ))}
        </div>

        {/* Overlay saat Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* 2. Content Area */}
      <div className="flex flex-col flex-grow pt-6 px-1">
        {/* Meta Header */}
        <div className="flex items-center gap-3 mb-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
          <span className="text-yellow-600">Report</span>
          <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
          <time className="flex items-center gap-1">
            <Clock size={10} strokeWidth={3} />
            {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
          </time>
        </div>

        {/* Title: Tipografi Berwibawa */}
        <h2 className={`font-[1000] text-zinc-900 leading-[1.15] tracking-tight group-hover:text-yellow-600 transition-colors duration-300 mb-4 ${minimal ? 'text-lg line-clamp-2' : 'text-2xl line-clamp-2'}`}>
          <Link href={`/news/${post.slug.current}`}>
            <span className="absolute inset-0 z-0" /> {/* Area Klik Seluruh Card */}
            {post.title}
          </Link>
        </h2>
        
        {/* Excerpt: Hanya muncul jika tidak minimal */}
        {!minimal && (
          <p className="text-zinc-500 text-[14px] font-medium mb-6 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {post.excerpt}
          </p>
        )}
        
        {/* Footer: Metadata & Interaction */}
        <div className="flex items-center justify-between pt-5 border-t border-zinc-50 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-[8px] text-white font-black uppercase ring-2 ring-white shadow-sm">
              {post.author?.name?.charAt(0)}
            </div>
            <span className="text-[10px] font-[900] text-zinc-900 uppercase tracking-tighter">{post.author?.name}</span>
          </div>

          <div className="flex items-center gap-1 text-black text-[10px] font-[1000] uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Read Intel <ArrowRight size={12} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* 3. Decorative Bottom Line */}
      <div className="absolute bottom-[-10px] left-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-700 ease-in-out"></div>
    </article>
  )
}