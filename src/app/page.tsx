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
import CategorySection from "./components/CategorySection"; // <--- Import Component Baru

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
  const excludedIds = [heroId, ...topNewsPosts.map((p: any) => p._id)].filter(
    Boolean,
  );

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

  const [trending, editorsPick, tags, bitcoinPosts, ethereumPosts] =
    await Promise.all([
      client.fetch(trendingQuery),
      client.fetch(editorsPickQuery),
      client.fetch(tagsQuery),
      client.fetch(bitcoinQuery), // Fetch Bitcoin
      client.fetch(ethereumQuery), // Fetch Ethereum
    ]);

  return {
    heroPost,
    topNewsPosts,
    latestNewsPosts,
    trending,
    editorsPick,
    tags,
    bitcoinPosts, // Return Data
    ethereumPosts, // Return Data
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
    ethereumPosts,
  } = await getData();

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* SECTION ATAS (HERO, SPLIT LAYOUT) TETAP SAMA */}
        <section>
          {heroPost ? (
            <FeaturedHero post={heroPost} />
          ) : (
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300">
              <p className="text-gray-400 font-bold">
                ⚠️ Editor belum memilih Hero Banner
              </p>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* === KOLOM KIRI (8) === */}
          <div className="lg:col-span-8 space-y-12">
            {/* Top News */}
            {topNewsPosts.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-yellow-400"></div>
                  <h2 className="text-2xl font-black text-black uppercase tracking-tight">
                    Top Stories
                  </h2>
                </div>
                <div className="flex flex-col">
                  {topNewsPosts.map((post: Post) => (
                    <NewsListCard key={post._id} post={post} />
                  ))}
                </div>
              </section>
            )}
            {/* Tags & Leaderboard Ad */}
            <section className="relative group">
  {/* Dekorasi Background (Garis Teknis) */}
  <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-colors"></div>
  
  <div className="relative bg-zinc-900 p-8 rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(247,147,26,1)] overflow-hidden">
    {/* Header Section dengan Ikon Stats */}
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-yellow-400 p-2 rounded-xl shadow-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-[1000] text-white text-sm uppercase tracking-[0.2em] leading-none">
            Collective <span className="text-yellow-400">Attention</span>
          </h3>
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1.5">
            Explore Market Narratives
          </p>
        </div>
      </div>
      
      {/* Indikator Online/Live */}
      <div className="hidden sm:flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter">Live Updates</span>
      </div>
    </div>

    {/* Chips Container */}
    <div className="flex flex-wrap gap-3 relative z-10">
      {tags.map((t: any) => (
        <TagChip key={t.slug} label={t.title} slug={t.slug} />
      ))}
      
      {/* Tombol Explore More yang menyatu */}
      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 hover:text-white transition-all">
        All Sectors
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>

    {/* Background Pattern Mask */}
    <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4">
       <svg width="200" height="200" viewBox="0 0 100 100">
         <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" />
         <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1" fill="none" strokeDasharray="2 2" />
       </svg>
    </div>
  </div>
</section>
            <div className="hidden md:block">
              <AdSpace position="leaderboard" />
            </div>
            
            {/* Latest News Section */}
            <section className="relative">
              {/* Header dengan Aksen Garis Dinamis */}
              <div className="flex items-end justify-between mb-10 border-b-2 border-zinc-100 pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg rotate-12 absolute -z-10 opacity-20 group-hover:rotate-45 transition-transform"></div>
                    <div className="w-3 h-10 bg-black rounded-full"></div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">
                      Latest <span className="text-yellow-500">Dispatch</span>
                    </h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">
                      Real-time Intelligence
                    </p>
                  </div>
                </div>

                <Link
                  href="/archive"
                  className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-yellow-600 transition-colors"
                >
                  Explore Archive
                  <div className="bg-black text-white p-1 rounded-full group-hover:translate-x-1 transition-transform">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* Grid System dengan Hover State yang Lebih Halus */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {latestNewsPosts.map((post: Post) => (
                  <article
                    key={post._id}
                    className="group relative flex flex-col h-full bg-white transition-all duration-500"
                  >
                    {/* Image Container dengan Aspect Ratio 16:9 yang Konsisten */}
                    <div className="relative aspect-[16/9] w-full bg-zinc-100 rounded-2xl overflow-hidden mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgba(247,147,26,0.1)] transition-all duration-500">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-zinc-50 text-zinc-300 font-black italic">
                          NO SIGNAL
                        </div>
                      )}

                      {/* Category Badge Floating */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {post.categories?.slice(0, 1).map((cat: any) => (
                          <span
                            key={cat.slug.current}
                            className="bg-black text-yellow-400 text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-tighter shadow-xl backdrop-blur-md"
                          >
                            {cat.title}
                          </span>
                        ))}
                      </div>

                      {/* Overlay Gradient (Hanya muncul saat hover) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col flex-grow px-2">
                      <h3 className="font-black text-2xl text-zinc-900 leading-[1.1] mb-3 group-hover:text-yellow-600 transition-colors duration-300 decoration-yellow-400 decoration-4 underline-offset-4 group-hover:underline">
                        <Link href={`/news/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-[15px] text-gray-500 mb-6 line-clamp-2 leading-relaxed font-medium">
                        {post.excerpt}
                      </p>

                      {/* Footer Card yang Lebih Rapi */}
                      <div className="flex items-center justify-between mt-auto pt-5 border-t border-zinc-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-white border-2 border-yellow-400 shadow-sm">
                            {post.author?.name?.charAt(0) || "E"}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black text-zinc-900 uppercase tracking-tighter leading-none">
                              {post.author?.name || "Anonymous"}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-bold mt-1">
                              Verified Analyst
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <time className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "id-ID",
                              { day: "2-digit", month: "short" },
                            )}
                          </time>
                          <div className="h-1 w-full bg-zinc-100 mt-1 overflow-hidden rounded-full">
                            <div className="h-full bg-yellow-400 w-0 group-hover:w-full transition-all duration-700"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

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
            <GlobalSidebar
              trendingPosts={trending}
              editorsPick={editorsPick}
              tags={tags}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
