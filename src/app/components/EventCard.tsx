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
    <div className="flex flex-col md:flex-row bg-white border-2 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 mb-6">
      
      {/* Bagian Kiri: Date Badge (Visual Tiket) */}
      <div className="bg-yellow-400 md:w-32 p-4 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black text-center">
        <span className="text-xl font-black text-black">{month}</span>
        <span className="text-5xl font-black text-black">{day}</span>
        <span className="text-xs font-bold uppercase mt-2 bg-black text-white px-2 py-1 rounded">
          {eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Bagian Tengah: Info */}
      <div className="flex-grow p-6 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider border border-gray-300 px-2 py-0.5 rounded text-gray-500">
            {event.eventType}
          </span>
        </div>
        <h3 className="text-2xl font-black text-gray-900 leading-tight mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
          <div className="flex items-center gap-1">
             <MapPin size={16} className="text-blue-600"/>
             {event.location}
          </div>
        </div>
      </div>

      {/* Bagian Kanan: Image & Button */}
      <div className="md:w-64 bg-gray-50 border-t-2 md:border-t-0 md:border-l-2 border-black p-4 flex flex-col justify-between items-center gap-4">
        {event.coverImage && (
           <div className="relative w-full h-24 rounded border border-black overflow-hidden">
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