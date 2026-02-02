import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/urlFor";
import { Post } from "@/types/sanity";
import NewsCard from "@/app/components/NewsCard";

export const revalidate = 60;

interface AuthorData {
  name: string;
  image: any;
  bio: any;
  slug: { current: string };
  posts: Post[];
}

// 1. Generate Static Params (Agar halaman author dirender saat build)
export async function generateStaticParams() {
  const query = `*[_type == "author"]{ "slug": slug.current }`;
  const authors = await client.fetch(query);

  return authors.map((author: { slug: string }) => ({
    slug: author.slug,
  }));
}

// 2. Fetch Data Author
async function getAuthorData(slug: string): Promise<AuthorData | null> {
  const query = `*[_type == "author" && slug.current == $slug][0] {
    name,
    image,
    bio,
    slug,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      "author": author->{name},
      "categories": categories[]->{title, slug}
    }
  }`;

  // PERBAIKAN UTAMA ADA DI SINI:
  // Kita harus mengirim object { slug } sebagai parameter kedua
  return client.fetch(query, { slug }); 
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorData(slug);
  
  if (!author) return { title: 'Author Not Found' };
  
  return {
    title: `Artikel oleh ${author.name}`,
    description: `Daftar artikel dan berita terbaru yang ditulis oleh ${author.name}.`,
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getAuthorData(slug);

  if (!data) notFound();

  return (
    <div>
      {/* Header Author */}
      <div className="mb-12 text-center border-b border-gray-100 pb-12">
        <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
            {data.image ? (
                <Image 
                    src={urlFor(data.image).url()} 
                    alt={data.name} 
                    fill 
                    className="object-cover"
                />
            ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-3xl">
                    {data.name.charAt(0)}
                </div>
            )}
        </div>
        
        <span className="text-blue-600 font-bold tracking-wider text-xs uppercase bg-blue-50 px-3 py-1 rounded-full">
            Author Profile
        </span>
        <h1 className="text-4xl font-black mt-4 mb-4 text-slate-900">
            {data.name}
        </h1>
        {/* Render bio jika perlu, atau gunakan text statis jika bio belum ready */}
        <p className="text-gray-500 max-w-xl mx-auto">
           Jurnalis dan kontributor konten di CryptoMedia.
        </p>
      </div>

      {/* Grid Artikel Author */}
      <div>
        <h3 className="text-xl font-bold mb-6 border-l-4 border-black pl-3">
            Artikel Terbaru
        </h3>
        
        {data.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.posts.map((post) => (
                <NewsCard key={post._id} post={post} />
            ))}
            </div>
        ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">Author ini belum mempublikasikan artikel.</p>
            </div>
        )}
      </div>
    </div>
  );
}