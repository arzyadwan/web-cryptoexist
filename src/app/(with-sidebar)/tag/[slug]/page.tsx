import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/urlFor'
import { Post, Tag } from '@/types/sanity'

export const revalidate = 60

interface TagWithPosts extends Tag {
  posts: Post[]
}

// 1. Generate Static Params (Speed)
export async function generateStaticParams() {
  const query = `*[_type == "tag"]{ "slug": slug.current }`
  const tags = await client.fetch(query)

  return tags.map((t: { slug: string }) => ({
    slug: t.slug,
  }))
}

// 2. Fetch Data
async function getTagData(slug: string): Promise<TagWithPosts | null> {
  // Query: Cari Tag-nya, lalu cari Post yang me-referensi Tag tersebut di field 'tags'
  const query = `*[_type == "tag" && slug.current == $slug][0] {
    title,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      "author": author->{name}
    }
  }`
  return client.fetch(query, { slug })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tag = await getTagData(slug)
  if (!tag) return { title: 'Not Found' }
  
  return {
    title: `Topik: ${tag.title}`,
    description: `Kumpulan berita dan artikel seputar ${tag.title}.`,
  }
}

// 3. Page Component
export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getTagData(slug)

  if (!data) notFound()

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12 border-b pb-8">
        <span className="text-gray-500 font-medium uppercase text-sm tracking-wider">Topik</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">#{data.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.posts.length > 0 ? (
          data.posts.map((post) => (
            <article key={post._id} className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all">
              {post.mainImage && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 line-clamp-2">
                  <Link href={`/news/${post.slug.current}`}>
                    {post.title}
                  </Link>
                </h2>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                  <span>{post.author?.name}</span>
                  <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-500 col-span-full py-12 text-center bg-gray-50 rounded">
            Belum ada artikel dengan tag ini.
          </p>
        )}
      </div>
    </main>
  )
}