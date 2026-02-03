import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'
import { ArrowRight, Flame } from 'lucide-react'

export default function FeaturedHero({ post }: { post: Post }) {
  if (!post) return null

  return (
    <div className="relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden group border border-zinc-200 shadow-xl bg-black">
      {/* 1. Optimized Image - Overlay lebih terkontrol */}
      {post.mainImage && (
        <div className="absolute inset-0 md:w-2/3 md:left-auto">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          {/* Fade effect untuk transisi ke area teks hitam di sebelah kiri pada desktop */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/60 md:via-black/20 to-transparent"></div>
        </div>
      )}
      
      {/* 2. Content Area - Lebih Fokus & Ramping */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 md:w-3/5">
        <div className="space-y-4">
          
          {/* Small Badge */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-yellow-400 text-black text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest">
              <Flame size={12} fill="black" /> Breaking
            </span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              Market Alert
            </span>
          </div>
          
          {/* Headline - Ukuran dikurangi (text-3xl ke 4xl) */}
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
            <Link href={`/news/${post.slug.current}`} className="hover:text-yellow-400 transition-colors">
              {post.title}
            </Link>
          </h1>

          {/* Excerpt - Lebih pendek (line-clamp-2) */}
          <p className="hidden md:block text-zinc-400 text-sm md:text-base line-clamp-2 max-w-lg leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Meta & Button */}
          <div className="flex items-center gap-5 pt-2">
            <Link 
              href={`/news/${post.slug.current}`}
              className="flex items-center gap-2 bg-white text-black text-[11px] font-black px-5 py-2.5 rounded-full hover:bg-yellow-400 transition-colors uppercase tracking-wider"
            >
              Read Report <ArrowRight size={14} />
            </Link>
            
            <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold">
              <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
              <time>{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</time>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}