import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/urlFor";
import { Post } from "@/types/sanity";
import { Metadata, ResolvingMetadata } from "next";
import ShareButtons from "@/app/components/ShareButtons";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import TagChip from "@/app/components/ui/TagChip";
import BookmarkButton from "@/app/components/BookmarkButton";
import NewsCard from "@/app/components/NewsCard"; // Reuse komponen NewsCard
import AdSpace from "@/app/components/AdSpace";

export const revalidate = 60;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Fetch Detail Artikel
async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    body,
    publishedAt,
    excerpt,
    "author": author->{name, image, bio, "slug": slug},
    "categories": categories[]->{_id, title, "slug": slug}, // Ambil _id category untuk filter related
    "tags": tags[]->{title, "slug": slug}
  }`;
  return client.fetch(query, { slug });
}

// 2. Fetch Berita Terkait (Berdasarkan Kategori yang sama)
async function getRelatedPosts(categoryId: string, currentPostId: string) {
  if (!categoryId) return [];

  // Ambil 2 artikel terbaru dari kategori yang sama, kecuali artikel ini sendiri
  const query = `*[_type == "post" && references($categoryId) && _id != $currentPostId] | order(publishedAt desc)[0...2] {
    _id, title, slug, mainImage, publishedAt, excerpt,
    "author": author->{name},
    "categories": categories[]->{title, slug}
  }`;

  return client.fetch(query, { categoryId, currentPostId });
}

export async function generateStaticParams() {
  const query = `*[_type == "post"]{ "slug": slug.current }`;
  const posts = await client.fetch(query);
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Artikel Tidak Ditemukan" };

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : previousImages;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [
        {
          url: ogImage as string,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // Ambil Related Posts (menggunakan ID kategori pertama)
  const categoryId = post.categories?.[0]?._id;
  const relatedPosts = categoryId
    ? await getRelatedPosts(categoryId, post._id)
    : [];

  const breadcrumbs = [
    { label: "News", href: "/news" },
    {
      label: post.categories?.[0]?.title || "Article",
      href: post.categories?.[0]
        ? `/category/${post.categories[0].slug.current}`
        : undefined,
    },
    { label: post.title },
  ];

  return (
    <article>
      {/* 1. Breadcrumb */}
      <Breadcrumb items={breadcrumbs} />

      {/* 2. Article Header */}
      <header className="mb-8">
        <div className="flex gap-2 mb-4">
          {post.categories?.map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug?.current}`}
              className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wide hover:bg-blue-100"
            >
              {cat.title}
            </Link>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-slate-900">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between border-y border-gray-100 py-4 gap-4">
          <div className="flex items-center gap-3">
            {post.author?.image && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-bold text-sm text-gray-900">
                {post.author?.name}
              </p>
              <div className="flex gap-2 text-xs text-gray-500">
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BookmarkButton
              articleId={post._id}
              title={post.title}
              slug={post.slug.current}
            />
            <ShareButtons title={post.title} slug={post.slug.current} />
          </div>
        </div>
      </header>

      {/* 3. Featured Image */}
      {post.mainImage && (
        <div className="relative w-full h-[300px] md:h-[500px] mb-10 rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      {/* Iklan Sebelum Artikel */}
      <AdSpace position="in-article" />
      {/* 4. Article Body */}
      <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 prose-a:font-bold prose-img:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-yellow-400 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4">
        <PortableText value={post.body} />
      </div>
      {/* Iklan Sebelum Artikel */}
  <AdSpace position="in-article" />
      {/* 5. Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Related Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagChip
                key={tag.slug.current}
                label={tag.title}
                slug={tag.slug.current}
              />
            ))}
          </div>
        </div>
      )}

      {/* 6. Author Bio Box (BARU) */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-white shadow-md">
          {post.author?.image ? (
            <Image
              src={urlFor(post.author.image).url()}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-2xl">
              {post.author?.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-black text-gray-900 text-lg mb-1">
            About {post.author?.name}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Jurnalis teknologi yang berfokus pada perkembangan blockchain,
            regulasi crypto, dan Web3 di Asia Tenggara.
            {/* Note: Nanti bisa ambil dari post.author.bio jika di Sanity sudah ada field bio */}
          </p>
          <Link
            href={`/author/${post.author?.slug?.current}`}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wide"
          >
            Lihat Artikel Lainnya →
          </Link>
        </div>
      </div>

      {/* 7. Newsletter Inline (BARU - Retention) */}
      <div className="mt-12 p-8 bg-yellow-400 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
        <h3 className="text-2xl font-black text-black mb-2">
          Jangan Ketinggalan Berita!
        </h3>
        <p className="text-black/80 font-medium mb-6">
          Dapatkan ringkasan berita crypto harian langsung di inbox Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email Anda"
            className="flex-grow px-4 py-3 rounded border-2 border-black font-bold focus:outline-none"
          />
          <button className="bg-black text-white px-6 py-3 rounded font-black uppercase tracking-wider hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* 8. Related News (BARU) */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-6 bg-black"></div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              Baca Juga
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost: Post) => (
              <NewsCard
                key={relatedPost._id}
                post={relatedPost}
                minimal={true}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
