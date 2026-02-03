import Image from 'next/image'
import { urlFor } from '@/lib/urlFor'
import { MapPin, ExternalLink, Clock } from 'lucide-react'

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
  
  const day = eventDate.toLocaleDateString('id-ID', { day: 'numeric' })
  const month = eventDate.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()

  return (
    <div className="group flex flex-col md:flex-row bg-white border-2 border-zinc-900 rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 mb-8">
      
      {/* 1. Date Badge: The Ticket Stub */}
      <div className="bg-yellow-400 md:w-40 p-6 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-zinc-900 text-center relative overflow-hidden">
        {/* Decorative Perforation (Efek Sobekan Tiket) */}
        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-zinc-900 rounded-full z-10"></div>
        
        <span className="text-xs font-[1000] uppercase tracking-[0.3em] text-black/40 mb-1">{month}</span>
        <span className="text-6xl font-[1000] text-black leading-none tracking-tighter">{day}</span>
        
        <div className="mt-4 bg-black text-yellow-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
          <Clock size={12} strokeWidth={3} />
          <span className="text-[10px] font-black tracking-widest uppercase">
            {eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* 2. Info Section: The Briefing */}
      <div className="flex-grow p-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-zinc-100 text-zinc-900 text-[9px] font-[1000] uppercase tracking-[0.2em] px-3 py-1.5 rounded-md border border-zinc-200">
            {event.eventType}
          </span>
          <div className="h-[1px] flex-grow bg-zinc-100"></div>
        </div>

        <h3 className="text-2xl md:text-3xl font-[1000] text-black leading-none tracking-tighter mb-4 group-hover:text-yellow-600 transition-colors uppercase italic">
          {event.title}
        </h3>
        
        <p className="text-zinc-500 text-sm font-medium mb-6 line-clamp-2 leading-relaxed opacity-80">
          {event.description}
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-[11px] font-black text-zinc-900 uppercase tracking-widest">
             <MapPin size={16} className="text-yellow-600" strokeWidth={3} />
             {event.location}
          </div>
          <div className="h-4 w-[1px] bg-zinc-200 hidden sm:block"></div>
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            RSVP OPEN
          </div>
        </div>
      </div>

      {/* 3. Action Section: The Boarding Pass */}
      <div className="md:w-72 bg-zinc-50 border-t-2 md:border-t-0 md:border-l-2 border-zinc-900 p-6 flex flex-col justify-between items-center gap-6 relative">
        {/* Decorative Circle (Efek Sobekan Tiket Sebelah Kanan) */}
        <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-zinc-900 rounded-full z-10"></div>

        {event.coverImage ? (
           <div className="relative w-full aspect-video rounded-2xl border-2 border-zinc-200 overflow-hidden shadow-sm group-hover:border-zinc-900 transition-colors">
             <Image 
                src={urlFor(event.coverImage).url()} 
                alt={event.title} 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
             />
           </div>
        ) : (
          <div className="w-full aspect-video bg-zinc-200 rounded-2xl flex items-center justify-center text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">
            Visual_Missing
          </div>
        )}
        
        {event.registrationLink ? (
          <a 
            href={event.registrationLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-black text-yellow-400 py-4 px-6 rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.2em] hover:bg-yellow-400 hover:text-black transition-all active:scale-95 shadow-xl"
          >
            Register Intel <ExternalLink size={14} strokeWidth={3} />
          </a>
        ) : (
          <div className="w-full flex items-center justify-center gap-3 bg-zinc-200 text-zinc-400 py-4 px-6 rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.2em] cursor-not-allowed italic">
            Access_Closed
          </div>
        )}
      </div>

    </div>
  )
}