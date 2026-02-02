"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, Loader2, X } from 'lucide-react'

export default function SearchAutocomplete() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true)
        setIsOpen(true)
        try {
          const res = await fetch(`/api/search?q=${query}`)
          const data = await res.json()
          setResults(data.results || [])
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 500) // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [wrapperRef])

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Cari berita..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 rounded-full text-sm transition-all outline-none border"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setIsOpen(true)}
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
        </div>
        {query && (
          <button 
            onClick={() => { setQuery(''); setIsOpen(false) }}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {results.length > 0 ? (
            <ul>
              {results.map((item) => (
                <li key={item._id}>
                  <Link 
                    href={`/news/${item.slug.current}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 hover:bg-gray-50 border-b last:border-0"
                  >
                    <p className="text-xs font-bold text-blue-600 mb-1">{item.category}</p>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
             !loading && <div className="p-4 text-center text-sm text-gray-500">Tidak ada hasil ditemukan.</div>
          )}
        </div>
      )}
    </div>
  )
}