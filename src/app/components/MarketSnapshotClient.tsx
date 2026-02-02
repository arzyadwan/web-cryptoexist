"use client"

import { useState } from 'react'
import Image from 'next/image'
import { generateSparkline } from '@/lib/sparkline'

// Interface data yang diterima dari Server Component
interface CoinData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  sparkline_in_7d: {
    price: number[]
  }
}

export default function MarketSnapshotClient({ coins }: { coins: CoinData[] }) {
  // State untuk melacak koin mana yang sedang ditampilkan grafiknya (Default: Koin pertama / Bitcoin)
  const [selectedCoinId, setSelectedCoinId] = useState<string>(coins[0]?.id || '')

  // Cari data koin yang sedang dipilih
  const activeCoin = coins.find((c) => c.id === selectedCoinId) || coins[0]
  
  if (!activeCoin) return null

  // Generate grafik untuk koin yang aktif
  const isUp = activeCoin.price_change_percentage_24h >= 0
  const color = isUp ? '#16a34a' : '#dc2626' // Green-600 or Red-600
  const { path, fill } = generateSparkline(activeCoin.sparkline_in_7d.price, 400, 160)

  return (
    <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      
      {/* HEADER: Judul */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-black text-gray-900 uppercase tracking-tight">Market Snapshot</h3>
        <span className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded">LIVE 7D</span>
      </div>

      {/* TABS: Pilihan Koin */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {coins.map((coin) => {
          const isSelected = coin.id === selectedCoinId
          const coinIsUp = coin.price_change_percentage_24h >= 0

          return (
            <button
              key={coin.id}
              onClick={() => setSelectedCoinId(coin.id)}
              className={`p-3 flex flex-col items-center justify-center transition-all ${
                isSelected ? 'bg-white shadow-inner' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Image src={coin.image} alt={coin.name} width={20} height={20} className="rounded-full" />
                <span className={`font-bold text-xs uppercase ${isSelected ? 'text-black' : 'text-gray-500'}`}>
                  {coin.symbol}
                </span>
              </div>
              <div className={`text-xs font-bold ${coinIsUp ? 'text-green-600' : 'text-red-600'}`}>
                 {coinIsUp ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(1)}%
              </div>
            </button>
          )
        })}
      </div>

      {/* CHART AREA */}
      <div className="p-6 relative">
        {/* Info Harga Besar */}
        <div className="flex items-baseline gap-3 mb-4">
           <h4 className="text-3xl font-black text-black tracking-tighter">
             ${activeCoin.current_price.toLocaleString('en-US')}
           </h4>
           <span className="text-sm font-medium text-gray-400">USD</span>
        </div>

        {/* Grafik SVG Besar */}
        <div className="h-40 w-full relative">
           <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none" className="overflow-visible">
              
              {/* Definisikan Gradient di dalam SVG */}
              <defs>
                <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area Fill (Gradasi di bawah garis) */}
              <path d={fill} fill="url(#gradientFill)" />

              {/* Garis Utama */}
              <path 
                d={path} 
                fill="none" 
                stroke={color} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="drop-shadow-sm" 
              />

              {/* Titik Akhir (Current Price) */}
              {(() => {
                 // Hitung posisi titik terakhir secara manual inline
                 const prices = activeCoin.sparkline_in_7d.price
                 const lastPrice = prices[prices.length - 1]
                 const min = Math.min(...prices)
                 const max = Math.max(...prices)
                 const range = max - min || 1
                 const y = 160 - ((lastPrice - min) / range) * 160
                 return (
                   <>
                    <circle cx="400" cy={y} r="4" fill={color} className="animate-pulse" />
                    <circle cx="400" cy={y} r="2" fill="white" />
                   </>
                 )
              })()}
           </svg>
        </div>

        {/* X-Axis Labels (Dummy Time) */}
        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium uppercase">
           <span>7 Days ago</span>
           <span>Today</span>
        </div>
      </div>

    </div>
  )
}