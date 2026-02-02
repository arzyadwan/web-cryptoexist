import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Fetch semua slug artikel
  const query = `*[_type == "post"] { "slug": slug.current, publishedAt }`
  const posts = await client.fetch(query)

  // Map data artikel ke format sitemap
  const newsUrls = posts.map((post: { slug: string, publishedAt: string }) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    ...newsUrls,
  ]
}