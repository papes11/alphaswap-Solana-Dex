"use client"

import type React from "react"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function TokenCharts() {
  const [alphaPrice, setAlphaPrice] = useState<number | null>(null)
  const [solPrice, setSolPrice] = useState<number | null>(null)
  const [alphaChange, setAlphaChange] = useState<number | null>(null)
  const [solChange, setSolChange] = useState<number | null>(null)
  const [alphaChartData, setAlphaChartData] = useState<number[]>([])
  const [solChartData, setSolChartData] = useState<number[]>([])

  useEffect(() => {
    // Fetch Alpha price and chart data
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=alpha-4&vs_currencies=usd&include_24hr_change=true")
      .then((res) => res.json())
      .then((data) => {
        setAlphaPrice(data["alpha-4"].usd)
        setAlphaChange(data["alpha-4"].usd_24h_change)
      })

    fetch("https://api.coingecko.com/api/v3/coins/alpha-4/market_chart?vs_currency=usd&days=1")
      .then((res) => res.json())
      .then((data) => {
        const prices = data.prices.map((price: [number, number]) => price[1])
        setAlphaChartData(prices)
      })

    // Fetch SOL price and chart data
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true")
      .then((res) => res.json())
      .then((data) => {
        setSolPrice(data.solana.usd)
        setSolChange(data.solana.usd_24h_change)
      })

    fetch("https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1")
      .then((res) => res.json())
      .then((data) => {
        const prices = data.prices.map((price: [number, number]) => price[1])
        setSolChartData(prices)
      })
  }, [])

  const generatePathData = (data: number[]) => {
    if (!data.length) return ""
    const max = Math.max(...data)
    const min = Math.min(...data)
    const normalizedData = data.map((value) => ((value - min) / (max - min)) * 50)
    return normalizedData.map((value, index) => `${index * 10},${50 - value}`).join(" ")
  }

  const formatPrice = (price: number | null) => {
    if (price === null) return "Loading..."
    if (price < 0.01) {
      return price.toFixed(6)
    }
    return price.toFixed(2)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
          ALPHAS
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Alpha Card */}
        <div className="card-glass rounded-2xl p-4 button-glow">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
              $
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-white font-medium mr-2">alpha</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-baseline mb-2">
            <div className="text-xl font-semibold text-white">
              ${formatPrice(alphaPrice)}
            </div>
            <div className={`text-sm ${alphaChange !== null && alphaChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {alphaChange !== null ? `${alphaChange.toFixed(2)}%` : "Loading..."}
            </div>
          </div>

          <div className="h-12 mt-4 relative">
            <svg viewBox="0 0 200 50" className="w-full h-full">
              <path
                d={`M0,50 ${generatePathData(alphaChartData)}`}
                fill="none"
                strokeWidth="1.5"
                stroke={
                  alphaChange !== null 
                    ? alphaChange >= 0 
                      ? "#10b981" 
                      : "#ef4444" 
                    : "white"
                }
                filter="url(#glow)"
              />
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* SOL Card */}
        <div className="card-glass rounded-2xl p-4 button-glow">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
              S
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-white font-medium mr-2">SOL</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-baseline mb-2">
            <div className="text-xl font-semibold text-white">
              ${formatPrice(solPrice)}
            </div>
            <div className={`text-sm ${solChange !== null && solChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {solChange !== null ? `${solChange.toFixed(2)}%` : "Loading..."}
            </div>
          </div>

          <div className="h-12 mt-4 relative">
            <svg viewBox="0 0 200 50" className="w-full h-full">
              <path
                d={`M0,50 ${generatePathData(solChartData)}`}
                fill="none"
                strokeWidth="1.5"
                stroke={
                  solChange !== null 
                    ? solChange >= 0 
                      ? "#10b981" 
                      : "#ef4444" 
                    : "white"
                }
                filter="url(#glow)"
              />
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}