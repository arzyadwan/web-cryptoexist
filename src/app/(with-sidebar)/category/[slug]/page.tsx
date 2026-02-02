import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { Post, Category } from '@/types/sanity'
import NewsCard from '@/app/components/NewsCard'

// Tipe data gabungan untuk response query
interface CategoryWithPosts extends Category {
  posts: Post[]
}

export const revalidate = 60

// 1. Generate Static Params
export async function generateStaticParams() {
  const query = `*[_type == "category"]{ "slug": slug.current }`
  const categories = await client.fetch(query)

  return categories.map((cat: { slug: string }) => ({
    slug: cat.slug,
  }))
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
      "categories": categories[]->{title, slug}
    }
  }`
  return client.fetch(query, { slug })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryData(slug)
  if (!category) return { title: 'Not Found' }
  
  return {
    title: `${category.title} News`,
    description: category.description || `Berita terbaru seputar ${category.title}`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getCategoryData(slug)

  if (!data) notFound()

  return (
    <div>
      {/* Header Kategori */}
      <div className="mb-12 text-center border-b border-gray-100 pb-12">
        <span className="text-blue-600 font-bold tracking-wider text-xs uppercase bg-blue-50 px-3 py-1 rounded-full">
            Category
        </span>
        <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4 text-slate-900">
            {data.title}
        </h1>
        {data.description && (
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">{data.description}</p>
        )}
      </div>

      {/* Grid Artikel (Konten Utama) */}
      {/* Tidak perlu wrapper col-span-8 atau container lagi, karena layout parent sudah menanganinya */}
      {data.posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.posts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">Belum ada artikel dalam kategori ini.</p>
        </div>
      )}
    </div>
  )
}