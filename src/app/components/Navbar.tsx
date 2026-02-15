"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import SearchAutocomplete from "./SearchAutoComplete";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileNewsOpen, setIsMobileNewsOpen] = useState(true);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/", type: "link" },
    {
      name: "News",
      href: "/news",
      type: "dropdown",
      children: [
        { name: "Latest News", href: "/news" },
        { name: "Bitcoin", href: "/category/bitcoin" },
        { name: "Ethereum", href: "/category/ethereum" },
        { name: "Altcoins", href: "/category/altcoins" },
        { name: "DeFi & Web3", href: "/category/defi-web3" },
        { name: "Regulation", href: "/category/regulation" },
        { name: "Market Analysis", href: "/category/market-analysis" },
      ],
    },
    { name: "Event", href: "/events", type: "link" },
    { name: "About", href: "/about", type: "link" },
    { name: "Contact", href: "/contact", type: "link" },
  ];

  const isActive = (path: string) => pathname === path;
  const isParentActive = (children: { href: string }[]) =>
    children?.some((c) => c.href === pathname);

  return (
    <header className="sticky top-0 z-100 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* === LOGO SECTION === */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            {/* Hardcode Image Logo */}
            <div className="relative w-40 h-10">
              <Image 
                src="/logo.png" // Pastikan file logo.png ada di folder public
                alt="CryptoMedia Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* === DESKTOP NAV === */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => {
            const active =
              isActive(item.href) ||
              (item.children && isParentActive(item.children));

            if (item.type === "dropdown") {
              return (
                <div
                  key={item.name}
                  className="relative group h-16 flex items-center px-3"
                >
                  <button
                    className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                      active
                        ? "text-yellow-600"
                        : "text-gray-600 hover:text-yellow-600"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={14}
                      className="group-hover:rotate-180 transition-transform duration-300"
                    />
                  </button>

                  {/* Dropdown Content */}
                  <div className="absolute top-[calc(100%-4px)] left-0 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2">
                    {item.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`block px-4 py-2.5 text-sm rounded-xl transition-colors ${
                          isActive(child.href)
                            ? "bg-yellow-50 text-black font-bold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-black"
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
                className={`px-4 py-2 text-sm font-semibold transition-colors rounded-full ${
                  active
                    ? "text-black bg-yellow-400"
                    : "text-gray-600 hover:text-black hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* === SEARCH & CTA (Desktop) === */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-56">
            <SearchAutocomplete />
          </div>
          <button className="bg-yellow-400 text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-black hover:text-yellow-400 transition-colors shadow-sm">
            Subscribe
          </button>
        </div>

        {/* === MOBILE MENU BUTTON === */}
        <button
          className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* === MOBILE MENU OVERLAY === */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-white border-t border-gray-100 h-[calc(100vh-64px)] overflow-y-auto animate-in slide-in-from-top duration-300">
          <div className="p-6 space-y-4">
            {navigation.map((item) => {
              if (item.type === "dropdown") {
                return (
                  <div key={item.name} className="space-y-2">
                    <button
                      onClick={() => setIsMobileNewsOpen(!isMobileNewsOpen)}
                      className="flex items-center justify-between w-full py-2 text-xl font-bold text-gray-900"
                    >
                      {item.name}
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${
                          isMobileNewsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isMobileNewsOpen && (
                      <div className="grid grid-cols-1 gap-1 pl-4 border-l-2 border-gray-100">
                        {item.children?.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`py-2 text-base ${
                              isActive(child.href)
                                ? "text-blue-600 font-bold"
                                : "text-gray-500"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 text-xl font-bold ${
                    isActive(item.href) ? "text-yellow-600" : "text-gray-900"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <div className="w-full pt-4">
              <SearchAutocomplete />
            </div>
            
            <div className="pt-2">
              <button className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-bold shadow-lg shadow-yellow-100">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}