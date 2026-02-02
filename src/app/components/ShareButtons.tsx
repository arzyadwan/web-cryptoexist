"use client"

import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { useState } from 'react'

export default function ShareButtons({ title, slug }: { title: string, slug: string }) {
  const [copied, setCopied] = useState(false)
  
  // URL dibentuk manual agar bisa dirender di server/client dengan konsisten
  // Ganti process.env.NEXT_PUBLIC_BASE_URL dengan domain asli nanti
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/news/${slug}`

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-4 my-8 border-y py-4">
      <span className="text-sm font-bold text-gray-500 uppercase">Share:</span>
      
      <a 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition"
      >
        <Twitter size={18} />
      </a>

      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition"
      >
        <Facebook size={18} />
      </a>

      <a 
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-gray-100 rounded-full hover:bg-blue-700 hover:text-white transition"
      >
        <Linkedin size={18} />
      </a>

      <button 
        onClick={handleCopy}
        className="p-2 bg-gray-100 rounded-full hover:bg-green-600 hover:text-white transition relative"
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
      </button>
    </div>
  )
}