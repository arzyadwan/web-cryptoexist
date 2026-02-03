import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'
import { ArrowRight, Zap } from 'lucide-react'

interface Props {
  title: string
  categorySlug: string
  posts: Post[]
}

export default function CategorySection({ title, categorySlug, posts }: Props) {
  if (!posts || posts.length === 0) return null

  // Logika warna dinamis berdasarkan slug untuk branding yang kuat
  const isBitcoin = categorySlug.toLowerCase().includes('bitcoin');
  const accentColor = isBitcoin ? 'bg-[#F7931A]' : 'bg-blue-600';
  const textColor = isBitcoin ? 'group-hover:text-[#F7931A]' : 'group-hover:text-blue-600';

  return (
    <section className="py-12 border-t border-zinc-100">
      {/* 1. Enhanced Header Section */}
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${accentColor} text-white shadow-lg shadow-current/20`}>
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter leading-none">
              {title}
            </h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-500"></span>
               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Market Pulse</p>
            </div>
          </div>
        </div>
        
        <Link 
          href={`/category/${categorySlug}`}
          className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-all"
        >
          View Intelligence <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 2. Horizontal Slider with Hidden Scrollbar */}
      <div className="relative group/container">
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          
          {posts.map((post) => (
            <div 
              key={post._id} 
              className="flex-shrink-0 w-[300px] snap-start group"
            >
              <Link href={`/news/${post.slug.current}`} className="block">
                {/* Image Card with Elevation Effect */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-zinc-100 ring-1 ring-zinc-200/50 group-hover:ring-zinc-900 transition-all duration-500">
                  {post.mainImage ? (
                    <Image 
                      src={urlFor(post.mainImage).url()} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-50 text-zinc-300 font-black italic text-xs">OFFLINE</div>
                  )}
                  
                  {/* Subtle Time Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-[9px] font-bold text-white px-2 py-1 rounded-md uppercase tracking-widest">
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className={`font-black text-lg text-zinc-900 leading-[1.2] transition-colors duration-300 line-clamp-2 ${textColor}`}>
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2">
                     <div className={`h-1 w-8 rounded-full ${accentColor} opacity-30 group-hover:opacity-100 transition-all group-hover:w-16`}></div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* 3. The "End of Deck" Card */}
          <div className="flex-shrink-0 w-[200px] snap-start">
            <Link 
              href={`/category/${categorySlug}`}
              className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-zinc-200 rounded-2xl group hover:border-zinc-900 transition-all duration-300 gap-4"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-zinc-100 group-hover:${accentColor} group-hover:text-white transition-all duration-500`}>
                <ArrowRight size={24} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900">
                Explore More
              </p>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}