import Link from 'next/link'
import { Twitter, Instagram, Send, Linkedin } from 'lucide-react'

const SOCIALS = [
  { id: 'twitter', icon: Twitter, href: '#', label: 'Twitter' },
  { id: 'telegram', icon: Send, href: '#', label: 'Telegram' },
  { id: 'instagram', icon: Instagram, href: '#', label: 'Instagram' },
  // { id: 'linkedin', icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function SidebarSocials() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
      <h3 className="font-black text-black text-sm uppercase tracking-tight mb-4">
        Follow Us
      </h3>
      <div className="flex gap-2">
        {SOCIALS.map((social) => (
          <Link 
            key={social.id} 
            href={social.href}
            className="flex-1 h-10 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all group"
            aria-label={social.label}
          >
             <social.icon size={18} className="group-hover:scale-110 transition-transform"/>
          </Link>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mt-3 text-center font-medium">
         Join our growing community
      </p>
    </div>
  )
}
