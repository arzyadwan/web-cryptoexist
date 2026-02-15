import { Post } from '@/types/sanity'
import SidebarTrending from './SidebarTrending'
import SidebarMarketMini from './SidebarMarketMini'
import SidebarNewsletter from './SidebarNewsLetter'
import TagChip from './ui/TagChip'
import SidebarAd from './SidebarAd'
import AdSpace from './AdSpace'
import SidebarSocials from './SidebarSocials' // <--- Import Socials

interface Props {
  trendingPosts: Post[]
  editorsPick?: Post[]
  tags?: any[]
}

export default function GlobalSidebar({ trendingPosts, editorsPick, tags }: Props) {
  return (
    <aside className="space-y-6 h-full">
      
      {/* 🔴 PRIORITAS 1: Trending News (Traffic Driver) */}
      <SidebarTrending posts={trendingPosts} />

      {/* 🔴 PRIORITAS 1: Market Snapshot Mini (Utility) */}
      <SidebarMarketMini />

      {/* 🔴 PRIORITAS 1: Newsletter & Socials */}
      <SidebarNewsletter />
      <SidebarSocials />

      <AdSpace position="sidebar" showPlaceholder={true} />
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
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
           <h3 className="font-bold text-yellow-600 text-xs uppercase tracking-widest mb-3">Editor&apos;s Choice</h3>
           <div className="space-y-3">
              {editorsPick.map(post => (
                 <a key={post._id} href={`/news/${post.slug.current}`} className="block group">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-yellow-600 leading-snug">
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