import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NewsCard from '@/app/components/NewsCard' // <--- Import NewsCard

export const revalidate = 60

// Konfigurasi Pagination
const POSTS_PER_PAGE = 9

interface Props {
  searchParams: Promise<{ page?: string }>
}

async function getPosts(page: number) {
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  // Query Data + Total Count (untuk kalkulasi halaman)
  const query = `{
    "posts": *[_type == "post"] | order(publishedAt desc)[${start}...${end}] {
      _id, title, slug, mainImage, publishedAt, excerpt,
      "author": author->{name},
      "categories": categories[]->{title}
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
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex justify-between items-end mb-12 border-b pb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Indeks Berita</h1>
          <p className="text-gray-600">Halaman {currentPage} dari {totalPages}</p>
        </div>
        
        {/* Simple Sort Toggle (UI Only - Logic butuh state client side kompleks) */}
        <div className="flex gap-2 text-sm">
          <span className="font-bold text-black border-b-2 border-black cursor-pointer">Terbaru</span>
          <span className="text-gray-400 cursor-not-allowed" title="Fitur view count belum tersedia">Populer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post: Post) => (
          // Menggunakan komponen NewsCard yang sudah diupdate agar konsisten
          <div key={post._id}>
             <NewsCard post={post} /> 
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4">
        {currentPage > 1 && (
          <Link 
            href={`/news?page=${currentPage - 1}`}
            className="flex items-center px-4 py-2 border rounded hover:bg-gray-50 font-bold text-sm"
          >
            <ChevronLeft size={16} className="mr-2"/> Sebelumnya
          </Link>
        )}
        
        {currentPage < totalPages && (
          <Link 
            href={`/news?page=${currentPage + 1}`}
            className="flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 font-bold text-sm uppercase tracking-wide"
          >
            Selanjutnya <ChevronRight size={16} className="ml-2"/>
          </Link>
        )}
      </div>
    </main>
  )
}