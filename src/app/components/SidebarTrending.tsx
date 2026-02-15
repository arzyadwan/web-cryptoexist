import Link from 'next/link'
import { Post } from '@/types/sanity'

// 1. Ubah tipe props agar 'posts' bersifat opsional (?)
interface Props {
  posts?: Post[] 
}

// 2. Berikan nilai default 'posts = []' di parameter fungsi
export default function SidebarTrending({ posts = [] }: Props) {
  
  // 3. (Opsional) Jika array kosong, jangan render apa-apa (return null)
  // atau biarkan merender kotak kosong (tergantung selera)
  if (!posts || posts.length === 0) {
    return null 
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
        <div className="w-2 h-6 bg-yellow-400"></div>
        <h3 className="font-black text-black text-sm uppercase tracking-tight">Trending News</h3>
      </div>
      <div className="divide-y divide-gray-100">
        
        {/* Sekarang aman karena posts dipastikan array */}
        {posts.map((post, idx) => (
          <Link key={post._id} href={`/news/${post.slug.current}`} className="flex gap-3 p-4 hover:bg-gray-50 transition group">
            <span className="text-2xl font-black text-gray-200 group-hover:text-yellow-400 leading-none">
              {idx + 1}
            </span>
            <div>
               <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-black line-clamp-2">
                 {post.title}
               </h4>
               <span className="text-[10px] text-gray-400 mt-1 block">
                 5 min read
               </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}