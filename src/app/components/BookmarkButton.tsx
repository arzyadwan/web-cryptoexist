"use client"

import { useState, useEffect } from 'react'
import { Bookmark } from 'lucide-react'

interface Props {
  articleId: string
  title: string
  slug: string
}

export default function BookmarkButton({ articleId, title, slug }: Props) {
  const [isSaved, setIsSaved] = useState(false)

  // Cek status saat load
  useEffect(() => {
    const saved = localStorage.getItem('bookmarks')
    if (saved) {
      const parsed = JSON.parse(saved)
      setIsSaved(parsed.some((item: any) => item.id === articleId))
    }
  }, [articleId])

  const toggleBookmark = () => {
    const saved = localStorage.getItem('bookmarks')
    let bookmarks = saved ? JSON.parse(saved) : []

    if (isSaved) {
      // Remove
      bookmarks = bookmarks.filter((item: any) => item.id !== articleId)
    } else {
      // Add
      bookmarks.push({ id: articleId, title, slug, savedAt: new Date().toISOString() })
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    setIsSaved(!isSaved)
  }

  return (
    <button 
      onClick={toggleBookmark}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
        ${isSaved 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
      {isSaved ? 'Tersimpan' : 'Simpan'}
    </button>
  )
}