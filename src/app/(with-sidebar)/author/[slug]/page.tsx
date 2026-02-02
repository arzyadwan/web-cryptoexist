import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/urlFor'
import { Post, Author } from '@/types/sanity'

interface AuthorWithPosts extends Author {
  posts: Post[]
}

export const revalidate = 60

export async function generateStaticParams() {
  const query = `*[_type == "author"]{ "slug": slug.current }`
  const authors = await client.fetch(query)
  return authors.map((author: { slug: string }) => ({ slug: author.slug }))
}

async function getAuthorData(slug: string): Promise<AuthorWithPosts | null> {
  const query = `*[_type == "author" && slug.current == $slug][0] {
    name,
    image,
    bio,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage
    }
  }`
  return client.fetch(query, { slug })
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = await getAuthorData(params.slug)

  if (!author) notFound()

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Profile Card */}
      <div className="bg-white border rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="relative w-32 h-32 flex-shrink-0">
          {author.image ? (
            <Image
              src={urlFor(author.image).url()}
              alt={author.name}
              fill
              className="object-cover rounded-full border-4 border-gray-100"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
          )}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
          <p className="text-gray-600 max-w-2xl">{author.bio || "Jurnalis dan kontributor konten crypto."}</p>
        </div>
      </div>

      {/* Artikel Mereka */}
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">Artikel oleh {author.name}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {author.posts.map((post) => (
          <Link key={post._id} href={`/news/${post.slug.current}`} className="group">
            <div className="relative h-40 mb-3 rounded-lg overflow-hidden bg-gray-100">
               {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
               )}
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 leading-snug">
              {post.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}