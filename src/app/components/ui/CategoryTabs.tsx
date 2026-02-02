"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const categories = [
  { name: 'All News', slug: '/news' },
  { name: 'Bitcoin', slug: '/category/bitcoin' },
  { name: 'Ethereum', slug: '/category/ethereum' },
  { name: 'Altcoins', slug: '/category/altcoins' },
  { name: 'DeFi', slug: '/category/defi-web3' },
  { name: 'Regulation', slug: '/category/regulation' },
  { name: 'Analysis', slug: '/category/market-analysis' },
]

export default function CategoryTabs() {
  const pathname = usePathname()

  return (
    <div className="w-full border-b bg-white sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar py-3">
          {categories.map((cat) => {
            const isActive = pathname === cat.slug
            return (
              <Link 
                key={cat.slug} 
                href={cat.slug}
                className={`
                  whitespace-nowrap text-sm font-medium pb-1 border-b-2 transition-colors
                  ${isActive 
                    ? 'text-blue-600 border-blue-600' 
                    : 'text-gray-500 border-transparent hover:text-gray-900'
                  }
                `}
              >
                {cat.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}