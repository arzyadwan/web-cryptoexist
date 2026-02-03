"use client"

import { useState } from 'react'
import Image from 'next/image'
import { generateSparkline } from '@/lib/sparkline'
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'

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
  const [selectedCoinId, setSelectedCoinId] = useState<string>(coins[0]?.id || '')
  const activeCoin = coins.find((c) => c.id === selectedCoinId) || coins[0]
  
  if (!activeCoin) return null

  const isUp = activeCoin.price_change_percentage_24h >= 0
  const color = isUp ? '#10b981' : '#ef4444' // Emerald-500 or Red-500 (Lebih vibrant)
  const { path, fill } = generateSparkline(activeCoin.sparkline_in_7d.price, 400, 160)

  return (
    <div className="bg-white rounded-[2rem] border-2 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      
      {/* 1. HEADER: Dynamic & High Contrast */}
      <div className="p-5 border-b-2 border-zinc-900 flex justify-between items-center bg-yellow-400">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-black" />
          <h3 className="font-[1000] text-black uppercase tracking-tighter text-sm">Market Snapshot</h3>
        </div>
        <div className="flex items-center gap-1.5 bg-black text-white text-[9px] font-black px-2.5 py-1 rounded-full animate-pulse">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          LIVE DATA
        </div>
      </div>

      {/* 2. TABS: Pro-Trading Style */}
      <div className="grid grid-cols-3 bg-zinc-50 border-b-2 border-zinc-900">
        {coins.map((coin) => {
          const isSelected = coin.id === selectedCoinId
          const coinIsUp = coin.price_change_percentage_24h >= 0

          return (
            <button
              key={coin.id}
              onClick={() => setSelectedCoinId(coin.id)}
              className={`p-4 flex flex-col items-center gap-2 transition-all relative ${
                isSelected ? 'bg-white' : 'hover:bg-zinc-100'
              }`}
            >
              <div className="relative">
                <Image src={coin.image} alt={coin.name} width={24} height={24} className="rounded-full grayscale-[0.5] group-hover:grayscale-0" />
                {isSelected && (
                  <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${coinIsUp ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                )}
              </div>
              <span className={`font-black text-[11px] uppercase tracking-widest ${isSelected ? 'text-black' : 'text-zinc-400'}`}>
                {coin.symbol}
              </span>
              
              {isSelected && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900"></div>
              )}
            </button>
          )
        })}
      </div>

      {/* 3. CHART AREA: Clean & Technical */}
      <div className="p-8 bg-white relative">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-[1000] text-zinc-900 tracking-tighter">
                ${activeCoin.current_price.toLocaleString('en-US')}
              </span>
              <span className="text-xs font-black text-zinc-400 uppercase">USD</span>
            </div>
            <div className={`flex items-center gap-1 text-xs font-black mt-1 ${isUp ? 'text-emerald-600' : 'text-red-600'}`}>
              {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(activeCoin.price_change_percentage_24h).toFixed(2)}%
              <span className="text-zinc-300 ml-1 font-bold italic">(24H)</span>
            </div>
          </div>
        </div>

        {/* Improved Sparkline SVG */}
        <div className="h-32 w-full relative mb-4">
          <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none" className="overflow-visible">
            <defs>
              <linearGradient id={`grad-${activeCoin.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.15" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>

            <path d={fill} fill={`url(#grad-${activeCoin.id})`} className="transition-all duration-500" />
            <path 
              d={path} 
              fill="none" 
              stroke={color} 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-all duration-700 ease-in-out" 
            />

            {/* Price Point Indicator */}
            {(() => {
              const prices = activeCoin.sparkline_in_7d.price
              const lastPrice = prices[prices.length - 1]
              const min = Math.min(...prices), max = Math.max(...prices)
              const y = 160 - ((lastPrice - min) / (max - min || 1)) * 160
              return (
                <g className="transition-all duration-500">
                  <circle cx="400" cy={y} r="8" fill={color} className="opacity-20 animate-ping" />
                  <circle cx="400" cy={y} r="4" fill={color} stroke="white" strokeWidth="2" />
                </g>
              )
            })()}
          </svg>
        </div>

        <div className="flex justify-between border-t border-zinc-50 pt-4">
           <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest leading-none">Performance 7D</span>
           <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest leading-none">Updated Just Now</span>
        </div>
      </div>
    </div>
  )
}