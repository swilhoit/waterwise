"use client"

import { Calculator, Sparkles, ChevronRight, Droplets } from "lucide-react"
import { useState, useEffect } from "react"
import { WaterSavingsCalculator } from "./water-savings-calculator"

export function TopBanner() {
  const [showCalculator, setShowCalculator] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [currentStat, setCurrentStat] = useState(0)
  
  const stats = [
    "Save up to $800/year",
    "Cut water use by 40%",
    "ROI in 2-3 years"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-2 -right-4 w-32 h-32 bg-cyan-300/10 rounded-full blur-2xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald-300/10 rounded-full blur-xl animate-pulse delay-1000" />
        </div>
        
        {/* Water droplet decorations */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block">
          <Droplets className="h-5 w-5 text-white/20 animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
          <Droplets className="h-5 w-5 text-white/20 animate-bounce" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="container mx-auto px-4 py-2.5 relative z-10">
          <button 
            onClick={() => setShowCalculator(true)}
            className="w-full group flex items-center justify-center gap-3 text-white transition-all duration-300 hover:scale-[1.01]"
          >
            {/* Calculator icon with glow */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all" />
              <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-1.5 border border-white/30 group-hover:bg-white/30 transition-all">
                <Calculator className="h-4 w-4" />
              </div>
            </div>
            
            {/* Main text */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-semibold text-sm sm:text-base tracking-tight">
                Calculate Your Savings
              </span>
              <span className="hidden sm:inline text-white/60">|</span>
              
              {/* Rotating stats */}
              <div className="relative h-5 overflow-hidden">
                <div 
                  className="transition-transform duration-500 ease-out"
                  style={{ transform: `translateY(-${currentStat * 20}px)` }}
                >
                  {stats.map((stat, idx) => (
                    <div 
                      key={idx}
                      className="h-5 flex items-center text-sm font-medium text-cyan-100"
                    >
                      <Sparkles className="h-3 w-3 mr-1.5 text-yellow-300" />
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* CTA arrow */}
            <div className="flex items-center gap-1 ml-2 bg-white/10 backdrop-blur-sm rounded-full pl-3 pr-2 py-1 border border-white/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all">
              <span className="text-xs font-medium hidden sm:inline">Enter Zip Code</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
      
      <WaterSavingsCalculator 
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </>
  )
}
