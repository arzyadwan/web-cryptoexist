import Link from 'next/link'
import { Post } from '@/types/sanity'

interface Props {
  posts: Post[]
}

export default function SidebarNews({ posts }: Props) {
  // Kita hapus wrapper border luar dan header di sini, 
  // karena wrapper dan header sudah diatur di page.tsx agar lebih fleksibel
  return (
    <div className="divide-y bg-white">
      {posts.map((post, idx) => (
        <div key={post._id} className="flex gap-3 p-4 hover:bg-gray-50 transition group">
          {/* Nomor Urut */}
          <span className="text-xl font-bold text-gray-200 group-hover:text-blue-200 min-w-[1.5rem] text-center">
            {idx + 1}
          </span>
          
          <div>
              <div className="mb-1">
                {post.categories?.slice(0,1).map((c) => (
                  <span key={c.slug.current} className="text-[10px] uppercase font-bold text-blue-600">
                    {c.title}
                  </span>
                ))}
              </div>
              <h4 className="font-bold text-sm leading-snug text-gray-900 group-hover:text-blue-600 line-clamp-2">
                <Link href={`/news/${post.slug.current}`}>
                  {post.title}
                </Link>
              </h4>
              <time className="text-[10px] text-gray-400 mt-1 block">
                {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                })}
              </time>
          </div>
        </div>
      ))}
    </div>
  )
}