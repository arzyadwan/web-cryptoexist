import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/urlFor";
import MarketMarquee from "./components/MarketMarquee";
import FeaturedHero from "./components/FeaturedHero";
import NewsListCard from "./components/NewsListCard";
import GlobalSidebar from "./components/GlobalSidebar";
import TagChip from "./components/ui/TagChip";
import { Post } from "@/types/sanity";
import AdSpace from "./components/AdSpace";
import CategorySection from "./components/CategorySection";
import NewsletterBanner from "./components/NewsletterBanner"; // <--- Import Newsletter
import { ArrowRight } from "lucide-react"; // <--- Import Icon

export const revalidate = 60; 

async function getData() {
  // 1️⃣ HERO & 2️⃣ TOP NEWS ... (Kode Lama Tetap Sama)
  const heroQuery = `*[_type == "post" && editorial.isFeaturedHero == true] | order(publishedAt desc)[0] {
    _id, title, slug, mainImage, publishedAt, excerpt, "author": author->{name}
  }`;
  const heroPost = await client.fetch(heroQuery);
  const heroId = heroPost?._id || "";

  const topNewsQuery = `*[_type == "post" && editorial.isTopNews == true && _id != $heroId] | order(publishedAt desc)[0...4] {
    _id, title, slug, mainImage, publishedAt, excerpt, "author": author->{name}
  }`;
  const topNewsPosts = await client.fetch(topNewsQuery, { heroId });

  // Excluded IDs
  const excludedIds = [heroId, ...topNewsPosts.map((p: any) => p._id)].filter(Boolean);

  // 3️⃣ LATEST NEWS (Kode Lama Tetap Sama)
  const latestNewsQuery = `*[_type == "post" && !(_id in $excludedIds)] | order(publishedAt desc)[0...8] {
    _id, title, slug, mainImage, publishedAt, excerpt, 
    "categories": categories[]->{title, slug},
    "author": author->{name}
  }`;
  const latestNewsPosts = await client.fetch(latestNewsQuery, { excludedIds });

  // 4️⃣ CATEGORY DATA (BITCOIN & ETHEREUM) - BAGIAN BARU
  // Ambil 5 artikel terbaru untuk masing-masing kategori
  // Pastikan slug kategori di Sanity Anda benar ('bitcoin', 'ethereum')
  const bitcoinQuery = `*[_type == "post" && "bitcoin" in categories[]->slug.current] | order(publishedAt desc)[0...5] {
     _id, title, slug, mainImage, publishedAt
  }`;
  
  const ethereumQuery = `*[_type == "post" && "ethereum" in categories[]->slug.current] | order(publishedAt desc)[0...5] {
     _id, title, slug, mainImage, publishedAt
  }`;

  // 5️⃣ TRENDING & SIDEBAR (Kode Lama Tetap Sama)
  const trendingQuery = `*[_type == "post"] | order(views desc)[0...5] {
     _id, title, slug, "author": author->{name}
  }`;
  const editorsPickQuery = `*[_type == "post" && editorial.isEditorsPick == true] | order(publishedAt desc)[0...3] {
     _id, title, slug, "author": author->{name}
  }`;
  const tagsQuery = `*[_type == "tag"][0...8] { title, "slug": slug.current }`;

  const [trending, editorsPick, tags, bitcoinPosts, ethereumPosts] = await Promise.all([
    client.fetch(trendingQuery),
    client.fetch(editorsPickQuery),
    client.fetch(tagsQuery),
    client.fetch(bitcoinQuery), // Fetch Bitcoin
    client.fetch(ethereumQuery) // Fetch Ethereum
  ]);

  return {
    heroPost,
    topNewsPosts,
    latestNewsPosts,
    trending,
    editorsPick,
    tags,
    bitcoinPosts, // Return Data
    ethereumPosts // Return Data
  };
}

export default async function Home() {
  const {
    heroPost,
    topNewsPosts,
    latestNewsPosts,
    trending,
    editorsPick,
    tags,
    bitcoinPosts,
    ethereumPosts
  } = await getData();

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* SECTION ATAS (HERO, SPLIT LAYOUT) TETAP SAMA */}
        <section>
          {heroPost ? <FeaturedHero post={heroPost} /> : <div className="bg-gray-100 h-64 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300"><p className="text-gray-400 font-bold">⚠️ Editor belum memilih Hero Banner</p></div>}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* === KOLOM KIRI (8) === */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Top News */}
            {topNewsPosts.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-yellow-400"></div>
                  <h2 className="text-2xl font-black text-black uppercase tracking-tight">Top Stories</h2>
                </div>
                <div className="flex flex-col">
                  {topNewsPosts.map((post: Post) => (
                    <NewsListCard key={post._id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Tags & Leaderboard Ad */}
            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
               <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-3">Collective Attention</h3>
               <div className="flex flex-wrap gap-2">
                  {tags.map((t: any) => (<TagChip key={t.slug} label={t.title} slug={t.slug} />))}
               </div>
            </section>
            <div className="hidden md:block">
              <AdSpace position="leaderboard" />
            </div>

            {/* Latest News */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-8 bg-yellow-400"></div>
                  <h2 className="text-2xl font-black text-black uppercase tracking-tight">Latest News</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                {latestNewsPosts.map((post: Post) => (
                  <article key={post._id} className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-yellow-400/50 transition-all duration-300">
                    <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                      {post.mainImage ? (
                        <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs font-bold uppercase">No Image</div>
                      )}
                      <div className="absolute top-3 left-3">
                        {post.categories?.slice(0, 1).map((cat: any) => (
                          <span key={cat.slug.current} className="bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-wide shadow-sm">{cat.title}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-gray-900 leading-tight mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                        <Link href={`/news/${post.slug.current}`}>{post.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 font-medium border-t border-gray-100 pt-3 mt-auto">
                        <span className="text-gray-900 font-bold uppercase">{post.author?.name || "Editor"}</span>
                        <time>{new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                 <Link 
                    href="/news" 
                    className="flex items-center gap-2 font-bold text-gray-900 border-2 border-gray-200 px-6 py-3 rounded-full hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all"
                 >
                    Lihat Semua Berita <ArrowRight size={18} />
                 </Link>
              </div>
            </section>

            {/* Newsletter Banner */}
            <NewsletterBanner />

            {/* ========== BAGIAN BARU: CATEGORY SLIDERS ========== */}
            
            {/* Bitcoin Section */}
            <CategorySection 
                title="Bitcoin News" 
                categorySlug="bitcoin" // Pastikan slug ini sesuai dengan data di Sanity
                posts={bitcoinPosts} 
            />

            {/* Ethereum Section */}
            <CategorySection 
                title="Ethereum Ecosystem" 
                categorySlug="ethereum" // Pastikan slug ini sesuai dengan data di Sanity
                posts={ethereumPosts} 
            />

          </div>

          {/* === KOLOM KANAN (SIDEBAR) TETAP SAMA === */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24">
            <GlobalSidebar trendingPosts={trending} editorsPick={editorsPick} tags={tags} />
          </aside>

        </div>
      </main>
    </div>
  );
}