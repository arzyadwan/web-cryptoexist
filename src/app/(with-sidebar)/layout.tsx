import GlobalSidebar from '@/app/components/GlobalSidebar'
import { client } from '@/lib/sanity'

// Fetch data sidebar sekali di layout level (Server Component)
async function getSidebarData() {
  const trendingQuery = `*[_type == "post"] | order(views desc)[0...5] {
     _id, title, slug, "author": author->{name}
  }`
  const tagsQuery = `*[_type == "tag"][0...8] { title, "slug": slug.current }`
  
  const [trending, tags] = await Promise.all([
    client.fetch(trendingQuery),
    client.fetch(tagsQuery)
  ])
  return { trending, tags }
}

export default async function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { trending, tags } = await getSidebarData()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Konten Utama (8 Kolom) */}
        <div className="lg:col-span-8 w-full">
          {children}
        </div>

        {/* Global Sidebar (4 Kolom) - Sticky */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 h-fit">
          <GlobalSidebar trendingPosts={trending} tags={tags} />
        </aside>

      </div>
    </div>
  )
}