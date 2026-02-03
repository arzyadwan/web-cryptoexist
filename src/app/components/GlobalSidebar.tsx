import { Post } from "@/types/sanity";
import SidebarTrending from "./SidebarTrending";
import SidebarMarketMini from "./SidebarMarketMini";
import SidebarNewsletter from "./SidebarNewsLetter";
import MarketSnapshot from "./MarketSnapshot";
import EditorsPick from "./EditorsPick";
import TagChip from "./ui/TagChip"; // Pastikan sudah ada komponen TagChip
import SidebarAd from "./SidebarAd"; // <--- 1. Import Widget Iklan
import AdSpace from "./AdSpace"; // <--- 2. Import Komponen AdSpace

interface Props {
  trendingPosts: Post[];
  editorsPick?: Post[]; // Opsional
  tags?: any[]; // Opsional
}

export default function GlobalSidebar({
  trendingPosts,
  editorsPick,
  tags,
}: Props) {
  return (
    <aside className="space-y-8 h-full">
      {/* 🔴 PRIORITAS 1: Trending News (Traffic Driver) */}
      <SidebarTrending posts={trendingPosts} />
      <EditorsPick posts={editorsPick || []} />

      {/* 🔴 PRIORITAS 1: Newsletter (Asset) */}
      <SidebarNewsletter />
      <AdSpace position="sidebar" showPlaceholder={true} />
      <SidebarAd />

      {/* 🟡 PRIORITAS 2: Tags (Discovery) */}
      {tags && tags.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest">
            Hot Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <TagChip key={t.slug} label={t.title} slug={t.slug} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
