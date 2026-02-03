import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'

export default function NewsListCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex gap-6 py-6 border-b border-gray-100 last:border-0 items-center hover:bg-gray-50/50 transition-all duration-300 px-2 -mx-2 rounded-2xl">
      {/* 1. Thumbnail - Ukuran diperbesar & Aspect Ratio tetap terjaga */}
      <div className="relative w-32 h-32 md:w-40 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100 shadow-sm">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-zinc-200 text-[10px] font-black uppercase text-zinc-400">No Image</div>
        )}
        
        {/* Overlay tipis saat hover */}
        <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-2">
           <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
           <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">Trending Now</span>
        </div>

        <h4 className="text-lg md:text-xl font-black text-zinc-900 leading-[1.15] tracking-tight group-hover:text-yellow-600 transition-colors duration-300 mb-2 line-clamp-2">
          <Link href={`/news/${post.slug.current}`}>
            <span className="absolute inset-0 z-0" /> {/* Membuat seluruh area card clickable */}
            {post.title}
          </Link>
        </h4>
        
        <p className="hidden md:block text-sm text-gray-500 line-clamp-2 leading-snug mb-3 font-medium">
          {post.excerpt}
        </p>

        {/* 3. Meta Data - Dibuat lebih berkelas */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-black flex items-center justify-center text-[8px] text-white font-bold">
              {post.author?.name?.charAt(0) || 'E'}
            </div>
            <span className="text-[11px] font-bold text-black uppercase tracking-tighter">
              {post.author?.name || 'Editorial'}
            </span>
            <span className="text-gray-300">/</span>
            <time className="text-[11px] font-medium text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
            </time>
          </div>
          
          {/* Icon panah kecil yang muncul saat hover */}
          <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
               <line x1="5" y1="12" x2="19" y2="12"></line>
               <polyline points="12 5 19 12 12 19"></polyline>
             </svg>
          </div>
        </div>
      </div>
    </article>
  )
}