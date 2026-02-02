export function generateSparkline(data: number[], width: number = 100, height: number = 40): { path: string, fill: string } {
  if (!data || data.length === 0) return { path: "", fill: "" }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1 

  const stepX = width / (data.length - 1)

  // Buat titik koordinat untuk garis
  const points = data.map((price, index) => {
    const x = index * stepX
    const y = height - ((price - min) / range) * height
    return `${x},${y}`
  })

  const linePath = `M${points.join(" L")}`

  // Buat area tertutup untuk fill (tambah titik pojok bawah kanan & kiri)
  const fillPath = `${linePath} L${width},${height} L0,${height} Z`

  return { path: linePath, fill: fillPath }
}