import { client } from '@/lib/sanity'
import EventCard from '@/app/components/EventCard'
import { Calendar, Terminal, MapPin, Plus } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Protocol Agenda | Global Crypto Events',
  description: 'Jadwal konferensi, hackathon, dan webinar crypto mendatang yang terverifikasi.',
}

export const revalidate = 60

async function getEvents() {
  const now = new Date().toISOString()
  const query = `*[_type == "event" && date >= "${now}"] | order(date asc) {
    _id, title, eventType, date, location, coverImage, registrationLink, description
  }`
  return client.fetch(query)
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. Header Section - High Contrast Hero */}
      <div className="bg-zinc-900 border-b-4 border-black py-24 relative overflow-hidden">
        {/* Dekorasi Grid Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              <Calendar size={14} strokeWidth={3} /> Protocol Agenda
            </div>
            <h1 className="text-5xl md:text-8xl font-[1000] text-white uppercase tracking-tighter leading-none italic">
              Global <span className="text-yellow-400">Events</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-bold max-w-2xl leading-relaxed uppercase tracking-tight">
              Sinkronisasi jadwal konferensi, hackathon, dan intelijen networking Web3 paling krusial di dunia.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Navigation & Filter Bar - Technical Style */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b-2 border-zinc-100 pb-8">
           <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {['All Nodes', 'Conferences', 'Hackathons', 'Webinars'].map((filter, i) => (
                <button 
                   key={filter} 
                   className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                       i === 0 
                       ? 'bg-black text-yellow-400 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]' 
                       : 'bg-white text-zinc-400 border-zinc-100 hover:border-black hover:text-black'
                   }`}
                >
                   {filter}
                </button>
              ))}
           </div>
           
           <div className="flex items-center gap-2 text-zinc-400 font-black text-[10px] uppercase tracking-widest bg-zinc-50 px-4 py-2 rounded-lg border border-zinc-100">
              <Terminal size={14} /> Tracking: {events.length} Upcoming
           </div>
        </div>

        {/* Events List - Vertical Timeline Vibe */}
        <div className="space-y-10">
          {events.length > 0 ? (
            events.map((event: any) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <div className="text-center py-32 border-4 border-dashed border-zinc-100 rounded-[3rem] space-y-4">
              <div className="bg-zinc-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-zinc-300">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">No Active Signals</h3>
              <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Database agenda sedang kosong.</p>
            </div>
          )}
        </div>

        {/* Submit Event CTA - The "Golden Ticket" Box */}
        <div className="mt-24 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-black rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-zinc-900 rounded-[2.5rem] border-2 border-black p-10 md:p-16 text-center shadow-2xl overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
              <div className="absolute -bottom-10 -right-10 text-white/5 font-[1000] text-9xl italic select-none">SUBMIT</div>

              <div className="relative z-10 space-y-6">
                  <h2 className="text-3xl md:text-5xl font-[1000] text-white uppercase tracking-tighter italic">
                    Punya Agenda <span className="text-yellow-400">Komunitas?</span>
                  </h2>
                  <p className="text-zinc-400 font-bold text-sm md:text-lg max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
                    Daftarkan meetup, hackathon, atau konferensi Anda secara gratis di database intelijen kami untuk jangkauan global.
                  </p>
                  <div className="pt-6">
                    <Link 
                        href="/contact" 
                        className="inline-flex items-center gap-3 bg-yellow-400 text-black font-[1000] px-10 py-5 rounded-2xl uppercase text-xs tracking-[0.2em] transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none"
                    >
                        <Plus size={18} strokeWidth={3} /> Submit Protocol
                    </Link>
                  </div>
              </div>
          </div>
        </div>

      </div>
    </main>
  )
}