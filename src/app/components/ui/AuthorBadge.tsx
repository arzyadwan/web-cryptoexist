import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/urlFor'
import { Author } from '@/types/sanity'

export default function AuthorBadge({ author }: { author: Author }) {
  if (!author) return null
  
  return (
    <Link 
      href={`/author/${author.slug?.current}`}
      className="flex items-center gap-3 group p-2 rounded-lg hover:bg-gray-50 transition"
    >
      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 group-hover:border-blue-400 transition">
        {author.image ? (
          <Image
            src={urlFor(author.image).url()}
            alt={author.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {author.name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">
          {author.name}
        </p>
        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Journalist</p>
      </div>
    </Link>
  )
}