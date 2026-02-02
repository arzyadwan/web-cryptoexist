import { Post } from '@/types/sanity'
import SidebarTrending from './SidebarTrending'
import SidebarMarketMini from './SidebarMarketMini'
import SidebarNewsletter from './SidebarNewsLetter'
import TagChip from './ui/TagChip' // Pastikan sudah ada komponen TagChip
import SidebarAd from './SidebarAd' // <--- 1. Import Widget Iklan

interface Props {
  trendingPosts: Post[]
  editorsPick?: Post[] // Opsional
  tags?: any[] // Opsional
}

export default function GlobalSidebar({ trendingPosts, editorsPick, tags }: Props) {
  return (
    <aside className="space-y-8 h-full">
      
      {/* 🔴 PRIORITAS 1: Trending News (Traffic Driver) */}
      <SidebarTrending posts={trendingPosts} />

      {/* 🔴 PRIORITAS 1: Market Snapshot Mini (Utility) */}
      <SidebarMarketMini />

      {/* 🔴 PRIORITAS 1: Newsletter (Asset) */}
      <SidebarNewsletter />
      <SidebarAd />

      {/* 🟡 PRIORITAS 2: Tags (Discovery) */}
      {tags && tags.length > 0 && (
        <div className="space-y-3">
           <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest">Hot Topics</h3>
           <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                  <TagChip key={t.slug} label={t.title} slug={t.slug} />
              ))}
           </div>
        </div>
      )}

      {/* 🟡 PRIORITAS 2: Editor's Pick (Opsional/Kondisional) */}
      {editorsPick && editorsPick.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
           <h3 className="font-bold text-blue-800 text-xs uppercase tracking-widest mb-3">Editor&apos;s Choice</h3>
           <div className="space-y-3">
              {editorsPick.map(post => (
                 <a key={post._id} href={`/news/${post.slug.current}`} className="block group">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 leading-snug">
                       {post.title}
                    </h4>
                 </a>
              ))}
           </div>
        </div>
      )}

    </aside>
  )
}