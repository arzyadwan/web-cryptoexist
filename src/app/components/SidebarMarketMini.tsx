import { ArrowUp, ArrowDown } from 'lucide-react'

// Data dummy untuk UI (nanti fetch real data seperti sebelumnya)
const COINS = [
  { id: 'bitcoin', symbol: 'BTC', price: 'Rp 650jt', change: 2.4, up: true },
  { id: 'ethereum', symbol: 'ETH', price: 'Rp 42jt', change: -1.2, up: false },
  { id: 'solana', symbol: 'SOL', price: 'Rp 1.5jt', change: 5.8, up: true },
]

export default function SidebarMarketMini() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900 text-xs uppercase tracking-widest">Market Pulse</h3>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      </div>
      <div className="divide-y divide-gray-100">
        {COINS.map((coin) => (
          <div key={coin.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
            <div className="flex items-center gap-2">
               <span className="font-black text-xs text-gray-900 w-8">{coin.symbol}</span>
               <span className="text-xs font-medium text-gray-600">{coin.price}</span>
            </div>
            <div className={`flex items-center text-xs font-bold ${coin.up ? 'text-green-600' : 'text-red-600'}`}>
               {coin.up ? <ArrowUp size={12}/> : <ArrowDown size={12}/>}
               {Math.abs(coin.change)}%
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 p-2 text-center">
         <a href="/market" className="text-[10px] font-bold text-blue-600 hover:underline">FULL DATA →</a>
      </div>
    </div>
  )
}