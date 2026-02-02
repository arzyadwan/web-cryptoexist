import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Atau font pilihan Anda
import "./globals.css";
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer";
import CategoryTabs from "./components/ui/CategoryTabs";
import MarketMarquee from './components/MarketMarquee' // <--- 1. Import Ini

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Crypto News Portal",
    template: "%s | Crypto News Portal", // Hasil: "Judul Artikel | Crypto News Portal"
  },
  description:
    "Portal berita crypto terdepan dengan analisis mendalam dan data pasar real-time.",
  openGraph: {
    title: "Crypto News Portal",
    description: "Berita Crypto, Bitcoin, dan Blockchain terkini.",
    url: "/",
    siteName: "Crypto News Portal",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@handle_anda", // Ganti nanti
    creator: "@handle_anda",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <MarketMarquee />
        {children} {/* Render konten dari route groups */}
        <Footer />
      </body>
    </html>
  );
}
