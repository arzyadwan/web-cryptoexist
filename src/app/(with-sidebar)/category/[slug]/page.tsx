import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { Post, Category } from '@/types/sanity'
import NewsCard from '@/app/components/NewsCard' // Pastikan ini NewsCard yang sudah kita poles
import { Zap, LayoutGrid, Info } from 'lucide-react'

interface CategoryWithPosts extends Category {
  posts: Post[]
}

export const revalidate = 60

// 1. Generate Static Params (Tetap sama)
export async function generateStaticParams() {
  const query = `*[_type == "category"]{ "slug": slug.current }`
  const categories = await client.fetch(query)
  return categories.map((cat: { slug: string }) => ({ slug: cat.slug }))
}

async function getCategoryData(slug: string): Promise<CategoryWithPosts | null> {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    title,
    description,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      "author": author->{name},
      "categories": categories[]->{title, "slug": slug.current}
    }
  }`
  return client.fetch(query, { slug })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryData(slug)
  if (!category) return { title: 'Category Not Found' }
  return {
    title: `${category.title} Intelligence | CryptoMedia`,
    description: category.description || `Intelijen pasar dan berita terbaru seputar ${category.title}`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getCategoryData(slug)

  if (!data) notFound()

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Kategori: Industrial High-Contrast */}
      <div className="relative group">
        {/* Dekorasi Aksen */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-400/10 blur-[100px] rounded-full -z-10"></div>
        
        <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-16 border-2 border-black shadow-[12px_12px_0px_0px_rgba(247,147,26,1)] overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 p-2 rounded-lg text-black shadow-lg">
                  <Zap size={20} fill="currentColor" />
                </div>
                <span className="text-yellow-400 text-[10px] font-[1000] uppercase tracking-[0.3em]">Vertical Intel</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-[1000] text-white uppercase tracking-tighter leading-none">
                {data.title}<span className="text-yellow-400">.</span>
              </h1>
              
              {data.description && (
                <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  {data.description}
                </p>
              )}
            </div>

            {/* Metrics Mini-Widget */}
            <div className="hidden lg:flex flex-col gap-4 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 min-w-[240px]">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Reports Found</span>
                <span className="text-xl font-black text-white">{data.posts.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Status</span>
                <span className="text-emerald-500 text-[10px] font-black uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Tracking
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Grid Nav Controller */}
      <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-4">
        <div className="flex items-center gap-4">
          <LayoutGrid size={20} className="text-black" />
          <h2 className="text-xl font-[1000] uppercase tracking-tighter text-black">Comprehensive Archive</h2>
        </div>
        <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
          Sorted by: Newest First
        </div>
      </div>

      {/* 3. Article Grid */}
      {data.posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {data.posts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="group relative py-24 text-center">
          <div className="bg-zinc-50 border-4 border-dashed border-zinc-200 rounded-[3rem] p-12 transition-all group-hover:border-yellow-400">
            <div className="bg-zinc-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-400">
              <Info size={32} />
            </div>
            <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight mb-2">Node Empty</h3>
            <p className="text-zinc-500 font-medium max-w-xs mx-auto text-sm">
              Belum ada intelijen yang tercatat untuk kategori ini dalam 24 jam terakhir.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}