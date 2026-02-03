import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'
import { ChevronLeft, ChevronRight, Database, SortAsc } from 'lucide-react'

export const revalidate = 60
const POSTS_PER_PAGE = 8 // Genap agar grid terlihat simetris di 2 kolom

interface Props {
  searchParams: Promise<{ page?: string }>
}

async function getPosts(page: number) {
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const query = `{
    "posts": *[_type == "post"] | order(publishedAt desc)[${start}...${end}] {
      _id, title, slug, mainImage, publishedAt, excerpt,
      "author": author->{name},
      "categories": categories[]->{title, "slug": slug.current}
    },
    "total": count(*[_type == "post"])
  }`
  
  return client.fetch(query)
}

export default async function NewsArchive({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const { posts, total } = await getPosts(currentPage)
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white">
      
      {/* 1. Header Section - Industrial & Technical */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Archive_Log_v2</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-[1000] text-black uppercase tracking-tighter leading-none italic">
            News <span className="text-zinc-200">Intelligence</span>
          </h1>
          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            <span>Entry: {total} Reports</span>
            <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
            <span>Node: {currentPage} / {totalPages}</span>
          </div>
        </div>
        
        {/* Sort Toggle - Pro-Tool UI */}
        <div className="flex bg-zinc-100 p-1 rounded-xl border-2 border-zinc-200">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg">
            <SortAsc size={14} /> Terbaru
          </button>
          <button className="text-zinc-400 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:text-black transition-all">
            Populer
          </button>
        </div>
      </div>

      {/* 2. News Grid - 2 Column Layout untuk Fokus Maksimal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {posts.map((post: Post) => (
          <article key={post._id} className="group relative flex flex-col h-full bg-white transition-all duration-500">
            {/* Aspect Ratio 16:9 yang Konsisten */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-zinc-100 border-2 border-zinc-100 group-hover:border-black shadow-sm group-hover:shadow-[20px_20px_0px_0px_rgba(247,147,26,0.1)] transition-all duration-500">
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-300 font-black italic tracking-widest text-xs">NO_IMAGE_FEED</div>
              )}
              
              {/* Floating Category Badge */}
              <div className="absolute top-5 left-5">
                {post.categories?.slice(0, 1).map((cat: any) => (
                  <span key={cat.slug} className="bg-black text-yellow-400 text-[10px] font-black px-4 py-2 rounded-md uppercase tracking-widest shadow-2xl">
                    {cat.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-col flex-grow px-2">
              <time className="text-[11px] font-black text-yellow-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-yellow-400"></span>
                {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
              </time>

              <h2 className="text-3xl font-[1000] text-black leading-[1.1] mb-4 group-hover:text-yellow-600 transition-colors line-clamp-2 uppercase tracking-tighter">
                <Link href={`/news/${post.slug.current}`}>
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-zinc-500 text-[15px] mb-8 line-clamp-2 leading-relaxed font-medium">
                {post.excerpt}
              </p>
              
              {/* Footer Card */}
              <div className="mt-auto pt-6 border-t-2 border-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[10px] text-white font-black uppercase ring-4 ring-white shadow-sm">
                    {post.author?.name?.charAt(0)}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-tighter text-black">{post.author?.name}</span>
                </div>
                <Link href={`/news/${post.slug.current}`} className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform duration-300">
                  Read Intel →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 3. Neobrutalist Pagination */}
      <div className="flex items-center justify-center gap-6 pt-20">
        {currentPage > 1 ? (
          <Link 
            href={`/news?page=${currentPage - 1}`}
            className="group flex items-center gap-2 px-8 py-4 bg-white border-2 border-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-50 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
          >
            <ChevronLeft size={18} strokeWidth={3} /> Sebelumnya
          </Link>
        ) : (
          <div className="px-8 py-4 border-2 border-zinc-100 text-zinc-200 rounded-2xl text-xs font-black uppercase tracking-widest cursor-not-allowed">
            Sebelumnya
          </div>
        )}
        
        <div className="h-10 w-[2px] bg-zinc-100 hidden sm:block"></div>

        {currentPage < totalPages ? (
          <Link 
            href={`/news?page=${currentPage + 1}`}
            className="group flex items-center gap-2 px-10 py-4 bg-black text-yellow-400 border-2 border-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(247,147,26,0.3)] active:translate-y-1 active:shadow-none"
          >
            Berikutnya <ChevronRight size={18} strokeWidth={3} />
          </Link>
        ) : (
          <div className="px-10 py-4 border-2 border-zinc-100 text-zinc-200 rounded-2xl text-xs font-black uppercase tracking-widest cursor-not-allowed">
            Berikutnya
          </div>
        )}
      </div>
    </main>
  )
}