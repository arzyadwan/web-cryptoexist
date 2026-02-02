import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'

export default function NewsListCard({ post }: { post: Post }) {
  return (
    <div className="flex gap-4 group mb-6 items-start border-b border-gray-100 pb-6 last:border-0 last:pb-0">
      {/* Thumbnail */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 mt-1">
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform grayscale group-hover:grayscale-0 duration-300"
          />
        )}
      </div>
      
      {/* Teks */}
      <div className="flex flex-col">
        <h4 className="font-bold text-gray-900 leading-snug group-hover:text-yellow-600 transition mb-1">
          <Link href={`/news/${post.slug.current}`}>
            {post.title}
          </Link>
        </h4>
        
        {/* TAMBAHAN: Excerpt / Ringkasan */}
        <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-relaxed">
            {post.excerpt}
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
           <span className="font-bold text-black uppercase text-[10px] tracking-wider">
             {post.author?.name || 'Editor'}
           </span>
           <span>•</span>
           <time>{new Date(post.publishedAt).toLocaleDateString('id-ID')}</time>
        </div>
      </div>
    </div>
  )
}