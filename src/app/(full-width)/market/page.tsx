import { Activity, ArrowUpRight, ArrowDownRight, RefreshCcw, Zap } from 'lucide-react'

export const metadata = {
  title: 'Market Terminal | Real-Time Crypto Data',
  description: 'Intelijen harga cryptocurrency real-time, kapitalisasi pasar, dan metrik volume global.',
}

async function getFullMarketData() {
  const coins = ['bitcoin', 'ethereum', 'tether', 'solana', 'binancecoin', 'ripple', 'cardano', 'avalanche-2', 'dogecoin', 'polkadot', 'tron', 'chainlink', 'matic-network', 'shiba-inu', 'litecoin', 'bitcoin-cash', 'uniswap', 'stellar']
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=idr&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`
  
  try {
    const res = await fetch(url, { next: { revalidate: 30 } })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    return null
  }
}

export default async function MarketPage() {
  const data = await getFullMarketData()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white min-h-screen">
      
      {/* 1. Header: Market Status Intelligence */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b-4 border-black pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-yellow-500" fill="currentColor" />
            <span className="text-[10px] font-[1000] uppercase tracking-[0.4em] text-zinc-400">Market_Feed_v4.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-[1000] text-black uppercase tracking-tighter leading-none italic">
            Asset <span className="text-zinc-200">Terminal</span>
          </h1>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Live Intelligence Stream (IDR)</p>
          </div>
        </div>

        {/* Global Stats Mini-Widget */}
        <div className="bg-zinc-900 text-white p-6 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(247,147,26,1)]">
           <div className="flex items-center gap-4">
              <div>
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Update Frequency</p>
                <p className="text-lg font-black text-yellow-400 leading-none italic">30 SECONDS</p>
              </div>
              <div className="w-[1px] h-10 bg-zinc-800"></div>
              <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white">
                <RefreshCcw size={20} />
              </button>
           </div>
        </div>
      </div>

      {/* 2. Pro-Market Table */}
      <div className="relative bg-white border-2 border-zinc-900 rounded-[2rem] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white">
                <th className="px-8 py-6 font-black text-[11px] uppercase tracking-[0.2em]">Asset Node</th>
                <th className="px-8 py-6 font-black text-[11px] uppercase tracking-[0.2em] text-right">Price Value</th>
                <th className="px-8 py-6 font-black text-[11px] uppercase tracking-[0.2em] text-right italic">24h Delta</th>
                <th className="px-8 py-6 font-black text-[11px] uppercase tracking-[0.2em] text-right hidden md:table-cell">Market Cap</th>
                <th className="px-8 py-6 font-black text-[11px] uppercase tracking-[0.2em] text-right hidden lg:table-cell">Vol (24h)</th>
                <th className="px-8 py-6 font-black text-[11px] uppercase tracking-[0.2em] text-center text-yellow-400">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-zinc-100">
              {data && Object.keys(data).length > 0 ? (
                Object.entries(data).map(([id, coin]: any) => {
                  if (!coin || typeof coin.idr === 'undefined') return null;
                  
                  const isUp = (coin.idr_24h_change || 0) >= 0;

                  return (
                    <tr key={id} className="group hover:bg-zinc-50 transition-all duration-300 cursor-default">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-6 bg-zinc-900 group-hover:bg-yellow-400 transition-colors"></div>
                           <span className="font-[1000] text-zinc-900 uppercase tracking-tighter text-lg">{id.replace(/-/g, ' ')}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="font-mono text-[16px] font-black text-zinc-900">
                          Rp {coin.idr.toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className={`inline-flex items-center gap-1 font-black text-sm italic ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {Math.abs(coin.idr_24h_change || 0).toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right hidden md:table-cell">
                        <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">
                          {(coin.idr_market_cap / 1e12).toFixed(2)}T <span className="text-[10px] opacity-50">IDR</span>
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right hidden lg:table-cell">
                        <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">
                          {(coin.idr_24h_vol / 1e9).toFixed(2)}M
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button className="bg-black text-yellow-400 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-yellow-400 hover:text-black active:scale-95 shadow-lg group-hover:scale-110">
                          Analyze
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                   <td colSpan={6} className="px-8 py-24 text-center bg-red-50">
                      <div className="flex flex-col items-center gap-4">
                        <Activity size={40} className="text-red-500 animate-bounce" />
                        <div>
                          <p className="text-xl font-black text-red-600 uppercase tracking-tighter italic">Connection Lost</p>
                          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mt-1">Rate limit exceeded / check system node</p>
                        </div>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
        
      {/* 3. Footer Note */}
      <div className="mt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">
         <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
            INTELLIGENCE SOURCE: COINGECKO API
         </div>
         <div className="italic">SYSTEM TIME: {new Date().toLocaleTimeString()}</div>
      </div>
    </main>
  )
}