"use client"

import { Calculator } from "lucide-react"
import { useState } from "react"
import { WaterSavingsCalculator } from "./water-savings-calculator"

export function TopBanner() {
  const [showCalculator, setShowCalculator] = useState(false)

  return (
    <>
      <div className="bg-gradient-to-r from-slate-500 via-gray-500 to-stone-500 text-white py-2">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => setShowCalculator(true)}
            className="w-full text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Calculator className="h-4 w-4" />
            <span>Enter Your Zip Code To Calculate Savings From Switching To A Greywater System For Irrigation</span>
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