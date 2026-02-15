import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'

export default function FeaturedHero({ post }: { post: Post }) {
  if (!post) return null

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-sm group border border-gray-200">
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).url()}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
      )}
      
      {/* Gradient Overlay Adjusted for Light Theme Contrast - Tetap gelap agar teks putih terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-4xl">
        <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-sm uppercase tracking-wider mb-4 inline-block shadow-md">
          Breaking News
        </span>
        
        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3 drop-shadow-md">
          <Link href={`/news/${post.slug.current}`} className="hover:text-yellow-400 transition decoration-yellow-400 underline-offset-4 hover:underline">
            {post.title}
          </Link>
        </h1>

        {/* TAMBAHAN: Excerpt Besar */}
        <p className="hidden md:block text-gray-300 text-lg mb-6 line-clamp-2 max-w-2xl leading-relaxed">
            {post.excerpt}
        </p>

        <div className="flex items-center text-gray-400 text-sm gap-4">
          <span className="font-bold text-white uppercase tracking-wider">{post.author?.name}</span>
          <span>•</span>
          <time>{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
        </div>
      </div>
    </div>
  )
}