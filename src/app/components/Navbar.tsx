"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Bell } from "lucide-react";
import SearchAutocomplete from "./SearchAutoComplete";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Efek scroll untuk navbar yang lebih dinamis
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    {
      name: "Intelligence",
      href: "/news",
      type: "dropdown",
      children: [
        { name: "Latest Pulse", href: "/news" },
        { name: "Bitcoin", href: "/category/bitcoin" },
        { name: "Ethereum", href: "/category/ethereum" },
        { name: "Market Analysis", href: "/category/market-analysis" },
        { name: "Regulation", href: "/category/regulation" },
      ],
    },
    { name: "Events", href: "/events", type: "link" },
    { name: "Market", href: "/market", type: "link" },
    { name: "Crypto Exist", href: "/about", type: "link" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b-1 border-gray-200 h-16"
          : "bg-white h-20 border-b-2 border-zinc-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* === LOGO: High Contrast === */}
        <div className="flex-shrink-0">
          <Link href="/" className="group flex items-center gap-3">
            <div className="bg-yellow-400 p-1.5 rounded-lg ">
              <div className="relative w-8 h-8">
                <Image
                  src="/icon.png"
                  alt="Logo Icon"
                  fill
                  className="object-contain "
                />
              </div>
            </div>
            <span className="text-xl font-[1000] uppercase tracking-tighter text-black hidden lg:block">
              CRYPTO<span className="text-yellow-500"> EXIST</span>
            </span>
          </Link>
        </div>

        {/* === DESKTOP NAV: Technical Style === */}
        <nav className="hidden md:flex items-center gap-2">
          {navigation.map((item) => {
            const active =
              isActive(item.href) ||
              item.children?.some((c) => isActive(c.href));

            if (item.type === "dropdown") {
              return (
                <div
                  key={item.name}
                  className="relative group flex items-center h-full"
                >
                  <button
                    className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-[900] uppercase tracking-widest transition-all rounded-lg ${
                      active
                        ? "bg-zinc-900 text-yellow-400"
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-black"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={14}
                      className="group-hover:rotate-180 transition-transform duration-500"
                    />
                  </button>

                  <div className="absolute top-full left-0 w-64 bg-zinc-900 border-2 border-black rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-2 p-3 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                    {item.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`block px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                          isActive(child.href)
                            ? "bg-white/10 text-yellow-400"
                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-[11px] font-[900] uppercase tracking-widest transition-all rounded-lg ${
                  active
                    ? "bg-zinc-900 text-yellow-400"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* === TOOLS: Pro Terminal Style === */}
        <div className="hidden md:flex items-center gap-6">
          <div className="w-48 xl:w-64 scale-90 origin-right">
            <SearchAutocomplete />
          </div>

          <div className="flex items-center gap-3 border-l border-zinc-200 pl-6">
            <Link href="/contact">
              <button className="bg-black text-yellow-400 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-yellow-400 hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none active:translate-y-1">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* === MOBILE TOGGLE === */}
        <button
          className="md:hidden p-2 bg-zinc-100 rounded-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Menggunakan Tema Gelap agar kontras */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bg-zinc-900 h-screen z-50 p-6 animate-in slide-in-from-right duration-500">
          <div className="space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-3xl font-[1000] text-white uppercase tracking-tighter"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <hr className="border-white/10" />
            <button className="w-full bg-yellow-400 text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em]">
              Join Dispatch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
