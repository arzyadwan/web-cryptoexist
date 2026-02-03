import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/urlFor'

interface AdProps {
  position: 'top-billboard' | 'leaderboard' | 'sidebar' | 'in-article'
  showPlaceholder?: boolean
}

interface AdData {
  _id: string
  title: string
  bannerImage: any
  targetUrl: string
}

// Konfigurasi dimensi per posisi
const adDimensions = {
  'top-billboard': { width: 970, height: 250, containerClass: 'max-w-[970px]' },
  'leaderboard': { width: 728, height: 90, containerClass: 'max-w-[728px]' },
  'sidebar': { width: 500, height: 600, containerClass: 'max-w-[500px]' },
  'in-article': { width: 336, height: 280, containerClass: 'max-w-[336px]' }
}

async function getActiveAd(position: string): Promise<AdData | null> {
  const now = new Date().toISOString()
  const query = `*[_type == "advertisement" && location == $position && isActive == true && startDate <= "${now}" && endDate >= "${now}"][0] {
    _id,
    title,
    bannerImage,
    targetUrl
  }`
  
  return client.fetch(query, { position }, { next: { revalidate: 0 } })
}

export default async function AdSpace({ position, showPlaceholder = false }: AdProps) {
  const ad = await getActiveAd(position)
  const dimensions = adDimensions[position]

  // Skenario 1: Ada Iklan Aktif
  if (ad) {
    return (
      <div className="flex justify-center my-4 w-full">
        <Link 
          href={ad.targetUrl || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`relative block group ${dimensions.containerClass} w-full`}
        >
          {/* Label Kecil */}
          <span className="absolute top-0 right-0 bg-white/80 text-[9px] text-gray-500 px-1 z-10 rounded-bl">
            Ad
          </span>
          
          <div className="relative w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-sm">
            <div className="relative w-full" style={{ aspectRatio: `${dimensions.width}/${dimensions.height}` }}>
              <Image 
                src={urlFor(ad.bannerImage).width(dimensions.width).height(dimensions.height).url()} 
                alt={ad.title}
                fill
                sizes={`(max-width: ${dimensions.width}px) 100vw, ${dimensions.width}px`}
                className="object-contain"
                priority={position === 'top-billboard'}
              />
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // Skenario 2: Tidak Ada Iklan, tapi Placeholder diminta
  if (!ad && showPlaceholder) {
    return (
      <div className="flex justify-center my-4 w-full">
        <div 
          className={`bg-gray-100 border border-dashed border-gray-300 ${dimensions.containerClass} w-full flex flex-col items-center justify-center text-center p-4 rounded-sm`}
          style={{ height: `${dimensions.height}px` }}
        >
          <span className="text-gray-400 font-bold text-xs uppercase">Space Available</span>
          <span className="text-[10px] text-gray-400 mt-1">Contact for Ads</span>
        </div>
      </div>
    )
  }

  // Skenario 3: Tidak ada iklan, dan tidak mau placeholder
  return null
}