import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 3) {
    return NextResponse.json({ results: [] })
  }

  // Cari di Judul atau Body
  const sanityQuery = `*[_type == "post" && (title match $q + "*" || pt::text(body) match $q + "*")][0...5]{
    _id,
    title,
    slug,
    publishedAt,
    "category": categories[0]->title
  }`

  try {
    const results = await client.fetch(sanityQuery, { q: query })
    return NextResponse.json({ results })
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}