import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/urlFor'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'

interface EventProps {
  title: string
  date: string
  location: string
  eventType: string
  coverImage: any
  registrationLink: string
  description: string
}

export default function EventCard({ event }: { event: EventProps }) {
  const eventDate = new Date(event.date)
  
  // Format Tanggal: "12"
  const day = eventDate.toLocaleDateString('id-ID', { day: 'numeric' })
  // Format Bulan: "OKT"
  const month = eventDate.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()

  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 mb-6 group">
      
      {/* Bagian Kiri: Date Badge (Visual Tiket) */}
      <div className="bg-gray-50 md:w-32 p-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 text-center group-hover:bg-yellow-400 transition-colors">
        <span className="text-xl font-black text-gray-400 group-hover:text-black transition-colors">{month}</span>
        <span className="text-5xl font-black text-black">{day}</span>
        <span className="text-xs font-bold uppercase mt-2 bg-black text-white px-2 py-1 rounded">
          {eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Bagian Tengah: Info */}
      <div className="flex-grow p-6 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider border border-gray-200 px-2 py-0.5 rounded text-gray-500">
            {event.eventType}
          </span>
        </div>
        <h3 className="text-2xl font-black text-gray-900 leading-tight mb-2 group-hover:text-yellow-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
          <div className="flex items-center gap-1">
             <MapPin size={16} className="text-black"/>
             {event.location}
          </div>
        </div>
      </div>

      {/* Bagian Kanan: Image & Button */}
      <div className="md:w-64 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 p-4 flex flex-col justify-between items-center gap-4">
        {event.coverImage && (
           <div className="relative w-full h-24 rounded overflow-hidden shadow-sm">
             <Image 
                src={urlFor(event.coverImage).url()} 
                alt={event.title} 
                fill 
                className="object-cover"
             />
           </div>
        )}
        
        {event.registrationLink ? (
          <a 
            href={event.registrationLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded font-bold hover:bg-gray-800 transition"
          >
            Register <ExternalLink size={14}/>
          </a>
        ) : (
          <button disabled className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded font-bold cursor-not-allowed">
            Closed
          </button>
        )}
      </div>

    </div>
  )
}