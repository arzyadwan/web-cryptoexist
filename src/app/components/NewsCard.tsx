import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'

interface Props {
  post: Post
  minimal?: boolean // Opsi untuk tampilan lebih ringkas
}

export default function NewsCard({ post, minimal = false }: Props) {
  return (
    <article className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Thumbnail Dominan */}
      <div className={`relative w-full ${minimal ? 'h-40' : 'h-52'} bg-gray-100 overflow-hidden`}>
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 bg-gray-200">
            No Image
          </div>
        )}
        {/* Category Badge Floating */}
        <div className="absolute top-3 left-3">
          {post.categories?.slice(0, 1).map((cat, idx) => (
            <span key={idx} className="bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-sm">
              {cat.title}
            </span>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className={`font-bold text-gray-900 group-hover:text-yellow-600 transition-colors leading-snug mb-3 ${minimal ? 'text-base line-clamp-2' : 'text-xl line-clamp-2'}`}>
          <Link href={`/news/${post.slug.current}`}>
            {post.title}
          </Link>
        </h2>
        
        {!minimal && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4 mt-auto">
          <div className="flex items-center gap-2">
            {/* Author Avatar Mini (Opsional) */}
             <span className="font-medium text-gray-900 truncate max-w-[100px]">{post.author?.name}</span>
          </div>
          <time>{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
        </div>
      </div>
    </article>
  )
}