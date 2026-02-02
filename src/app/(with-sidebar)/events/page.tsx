import { client } from '@/lib/sanity'
import EventCard from '@/app/components/EventCard'
import { Calendar } from 'lucide-react'

export const metadata = {
  title: 'Crypto Events Calendar',
  description: 'Jadwal konferensi, hackathon, dan webinar crypto mendatang.',
}

export const revalidate = 60

async function getEvents() {
  const now = new Date().toISOString()
  
  // Query: Ambil event yang tanggalnya BELUM LEWAT (future), urutkan dari yang terdekat
  const query = `*[_type == "event" && date >= "${now}"] | order(date asc) {
    _id,
    title,
    eventType,
    date,
    location,
    coverImage,
    registrationLink,
    description
  }`

  return client.fetch(query)
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* 1. Header Section */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-yellow-200">
            <Calendar size={14} /> Official Agenda
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Global Crypto Events
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Jangan lewatkan kesempatan networking, belajar, dan membangun masa depan Web3. 
            Berikut adalah jadwal acara terkurasi oleh redaksi.
          </p>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Filters (Visual Only untuk MVP) */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
           {['All Events', 'Conferences', 'Hackathons', 'Webinars'].map((filter, i) => (
             <button 
                key={filter} 
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition ${
                    i === 0 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                }`}
             >
                {filter}
             </button>
           ))}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.length > 0 ? (
            events.map((event: any) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <div className="text-center py-20 bg-white border-2 border-dashed border-gray-300 rounded-xl">
              <p className="text-gray-500 font-medium">Belum ada acara mendatang.</p>
              <p className="text-sm text-gray-400">Cek kembali nanti atau submit acara Anda.</p>
            </div>
          )}
        </div>

        {/* Submit Event CTA */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4">Punya Acara Komunitas?</h2>
                <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                    Kami mendukung pertumbuhan komunitas lokal. Daftarkan meetup atau webinar Anda secara gratis di kalender kami.
                </p>
                <a 
                    href="/contact" 
                    className="inline-block bg-yellow-400 text-black font-black px-8 py-3 rounded-lg hover:bg-yellow-300 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                    Submit Event
                </a>
            </div>
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 opacity-20 rounded-full -ml-10 -mb-10"></div>
        </div>

      </div>
    </main>
  )
}