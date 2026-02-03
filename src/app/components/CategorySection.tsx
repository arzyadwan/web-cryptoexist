import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'
import { ArrowRight } from 'lucide-react'

interface Props {
  title: string
  categorySlug: string
  posts: Post[]
}

export default function CategorySection({ title, categorySlug, posts }: Props) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-8 border-t border-gray-100">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 bg-blue-600"></div> {/* Warna beda dikit biar fresh */}
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">
            {title}
          </h2>
        </div>
        <Link 
            href={`/category/${categorySlug}`}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
        >
            Lihat Semua <ArrowRight size={16} />
        </Link>
      </div>

      {/* Horizontal Slider Container */}
      {/* 'overflow-x-auto' membuat scroll ke samping */}
      {/* 'snap-x' membuat scroll berhenti pas di kartu (snapping) */}
      <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        
        {posts.map((post) => (
          <div 
            key={post._id} 
            className="flex-shrink-0 w-[280px] snap-center group"
          >
            <Link href={`/news/${post.slug.current}`} className="block h-full">
                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 bg-gray-100 shadow-sm border border-gray-100">
                    {post.mainImage ? (
                        <Image 
                            src={urlFor(post.mainImage).url()} 
                            alt={post.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">NO IMAGE</div>
                    )}
                </div>
                
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                        {new Date(post.publishedAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}
                    </span>
                    <h3 className="font-bold text-gray-900 leading-snug group-hover:text-blue-600 line-clamp-2">
                        {post.title}
                    </h3>
                </div>
            </Link>
          </div>
        ))}

        {/* Card Terakhir: "Lihat Lainnya" Button */}
        <div className="flex-shrink-0 w-[150px] snap-center flex items-center justify-center">
            <Link 
                href={`/category/${categorySlug}`}
                className="flex flex-col items-center gap-2 group p-4 text-center"
            >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight size={20} />
                </div>
                <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600">
                    Berita {title} Lainnya
                </span>
            </Link>
        </div>

      </div>
    </section>
  )
}