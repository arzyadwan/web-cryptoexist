import Link from 'next/link'
import { client } from '@/lib/sanity'
import { Calendar } from 'lucide-react'

// Fetch max 2 event terdekat
async function getUpcomingEvents() {
  const now = new Date().toISOString()
  const query = `*[_type == "event" && date >= "${now}"] | order(date asc)[0...2] {
    _id,
    title,
    date,
    eventType,
    registrationLink
  }`
  return client.fetch(query)
}

export default async function SidebarEvent() {
  const events = await getUpcomingEvents()

  if (!events || events.length === 0) return null

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header Widget */}
      <div className="bg-black px-4 py-3 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
           <Calendar size={14} className="text-yellow-400"/> Agenda
        </h3>
        <Link href="/events" className="text-[10px] font-bold text-yellow-400 hover:text-white transition">
           LIHAT SEMUA →
        </Link>
      </div>

      {/* List Event */}
      <div className="divide-y divide-gray-100">
        {events.map((event: any) => {
          const dateObj = new Date(event.date)
          const day = dateObj.toLocaleDateString('id-ID', { day: 'numeric' })
          const month = dateObj.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()

          return (
            <div key={event._id} className="p-4 flex gap-3 group hover:bg-yellow-50 transition cursor-pointer">
              
              {/* Tanggal (Kotak Kuning Kecil) */}
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 border border-black rounded flex flex-col items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
                 <span className="text-[10px] font-bold leading-none">{month}</span>
                 <span className="text-xl font-black leading-none">{day}</span>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">
                   {event.eventType}
                 </span>
                 <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600">
                   {event.title}
                 </h4>
              </div>

            </div>
          )
        })}
      </div>
      
      {/* CTA Button (Optional) */}
      <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
         <Link href="/events" className="text-xs font-bold text-gray-500 hover:text-black block w-full">
            Cari Event Lainnya
         </Link>
      </div>
    </div>
  )
}