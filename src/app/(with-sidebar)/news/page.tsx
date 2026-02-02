import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/urlFor'
import { Post } from '@/types/sanity'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
          <article key={post._id} className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {post.mainImage ? (
              <div className="relative h-56 w-full bg-gray-100">
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-56 w-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
            )}
            
            <div className="p-5 flex flex-col flex-grow">
              <div className="mb-3">
                {post.categories?.slice(0, 1).map((cat, idx) => (
                   <span key={idx} className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                     {cat.title}
                   </span>
                ))}
              </div>
              
              <h2 className="text-xl font-bold mb-3 hover:text-blue-600">
                <Link href={`/news/${post.slug.current}`}>
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="flex items-center text-xs text-gray-500 border-t pt-4 mt-auto">
                <span className="font-medium text-gray-900 mr-2">{post.author?.name}</span>
                <span>• {new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4">
        {currentPage > 1 && (
          <Link 
            href={`/news?page=${currentPage - 1}`}
            className="flex items-center px-4 py-2 border rounded hover:bg-gray-50"
          >
            <ChevronLeft size={16} className="mr-2"/> Sebelumnya
          </Link>
        )}
        
        {currentPage < totalPages && (
          <Link 
            href={`/news?page=${currentPage + 1}`}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Selanjutnya <ChevronRight size={16} className="ml-2"/>
          </Link>
        )}
      </div>
    </main>
  )
}