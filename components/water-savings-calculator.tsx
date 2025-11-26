"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, DollarSign, Home, Calculator, X, CloudRain, Sprout, ArrowRight, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react"

interface WaterSavingsCalculatorProps {
  isOpen: boolean
  onClose: () => void
}

interface CalculatorResults {
  zipCode: string
  gallonsReplaced: number
  irrigationNeedGallons: number
  availableGreywaterGallons: number
  dollarsavedPerYear: number
  dollarsavedPerMonth: number
  percentageSaved?: number
  householdSize: number
  areaSqFt: number
  rainInches: number
  pricePerKgal: number
}

export function WaterSavingsCalculator({ isOpen, onClose }: WaterSavingsCalculatorProps) {
  const router = useRouter()
  const [zipCode, setZipCode] = useState("")
  const [householdSize, setHouseholdSize] = useState("4")
  const [currentBill, setCurrentBill] = useState("")
  const [irrigatedArea, setIrrigatedArea] = useState("1000")
  const [annualRainInches, setAnnualRainInches] = useState("15")
  const [region, setRegion] = useState("west")
  const [waterPricePerKgal, setWaterPricePerKgal] = useState("6.00")
  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [step, setStep] = useState(1)

  const calculateSavings = () => {
    if (!zipCode) return

    const people = Math.max(1, parseInt(householdSize || '0'))
    const billAmount = parseFloat(currentBill || '0')
    const areaSqFt = Math.max(0, parseFloat(irrigatedArea || '0'))
    const rainInches = Math.max(0, parseFloat(annualRainInches || '0'))
    const pricePerKgal = Math.max(0, parseFloat(waterPricePerKgal || '0'))

    const targetIrrigationInchesPerYear = 20
    const gallonsPerSqFtPerInch = 0.623
    const greywaterPerPersonPerDay = 25
    const captureEfficiency = 0.6

    const shortfallInches = Math.max(0, targetIrrigationInchesPerYear - rainInches)
    const irrigationNeedGallons = areaSqFt * gallonsPerSqFtPerInch * shortfallInches

    const availableGreywaterGallons = people * greywaterPerPersonPerDay * 365 * captureEfficiency

    const gallonsReplaced = Math.min(irrigationNeedGallons, availableGreywaterGallons)

    const dollarsavedPerYear = (gallonsReplaced / 1000) * pricePerKgal
    const dollarsavedPerMonth = dollarsavedPerYear / 12
    const percentageSaved = billAmount > 0 ? Math.round((dollarsavedPerYear / (billAmount * 12)) * 100) : undefined

    setResults({
      zipCode,
      gallonsReplaced: Math.round(gallonsReplaced),
      irrigationNeedGallons: Math.round(irrigationNeedGallons),
      availableGreywaterGallons: Math.round(availableGreywaterGallons),
      dollarsavedPerYear: Math.round(dollarsavedPerYear),
      dollarsavedPerMonth: Math.round(dollarsavedPerMonth),
      percentageSaved,
      householdSize: people,
      areaSqFt,
      rainInches,
      pricePerKgal
    })
  }

  const resetCalculator = () => {
    setZipCode("")
    setHouseholdSize("4")
    setCurrentBill("")
    setIrrigatedArea("1000")
    setAnnualRainInches("15")
    setRegion("west")
    setWaterPricePerKgal("6.00")
    setResults(null)
    setStep(1)
  }

  const handleGetQuote = () => {
    if (!results) return
    
    // Encode calculator results as URL params for lead gen
    const params = new URLSearchParams({
      source: 'calculator',
      zip: results.zipCode,
      household: results.householdSize.toString(),
      area: results.areaSqFt.toString(),
      savings: results.dollarsavedPerYear.toString(),
      gallons: results.gallonsReplaced.toString(),
    })
    
    onClose()
    router.push(`/contact?${params.toString()}`)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 px-6 py-6 text-white">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5 border border-white/30">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Water Savings Calculator</h2>
                  <p className="text-white/80 text-sm mt-0.5">See how much you could save with greywater</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {!results ? (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`h-2 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                <div className={`h-2 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
              </div>
              
              {step === 1 ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Where are you located?</h3>
                    <p className="text-gray-500 text-sm">We'll calculate savings based on your area</p>
                  </div>
                  
                  <div className="max-w-sm mx-auto space-y-4">
                    <div>
                      <Label htmlFor="zipcode" className="text-gray-700 font-medium">Zip Code</Label>
                      <Input
                        id="zipcode"
                        placeholder="Enter your zip code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        maxLength={5}
                        className="mt-1.5 h-12 text-center text-lg font-medium border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="household" className="text-gray-700 font-medium">Household Size</Label>
                      <select
                        id="household"
                        value={householdSize}
                        onChange={(e) => setHouseholdSize(e.target.value)}
                        className="w-full mt-1.5 p-3 h-12 border border-gray-200 rounded-lg text-center font-medium focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4">4 people</option>
                        <option value="5">5+ people</option>
                      </select>
                    </div>
                    
                    <Button 
                      onClick={() => setStep(2)}
                      className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium mt-4"
                      disabled={!zipCode || zipCode.length < 5}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Tell us about your property</h3>
                    <p className="text-gray-500 text-sm">This helps us calculate accurate savings</p>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="area" className="text-gray-700 font-medium">Irrigated Area (sq ft)</Label>
                      <Input
                        id="area"
                        placeholder="e.g. 1000"
                        value={irrigatedArea}
                        onChange={(e) => setIrrigatedArea(e.target.value)}
                        type="number"
                        className="mt-1.5 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">Lawn + garden area</p>
                    </div>

                    <div>
                      <Label htmlFor="rain" className="text-gray-700 font-medium">Annual Rainfall (inches)</Label>
                      <Input
                        id="rain"
                        placeholder="e.g. 15"
                        value={annualRainInches}
                        onChange={(e) => setAnnualRainInches(e.target.value)}
                        type="number"
                        className="mt-1.5 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">Avg for your region</p>
                    </div>

                    <div>
                      <Label htmlFor="price" className="text-gray-700 font-medium">Water Price ($/1,000 gal)</Label>
                      <Input
                        id="price"
                        placeholder="e.g. 6.00"
                        value={waterPricePerKgal}
                        onChange={(e) => setWaterPricePerKgal(e.target.value)}
                        type="number"
                        step="0.01"
                        className="mt-1.5 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">Check your water bill</p>
                    </div>

                    <div>
                      <Label htmlFor="bill" className="text-gray-700 font-medium">Monthly Bill ($) <span className="text-gray-400 font-normal">— optional</span></Label>
                      <Input
                        id="bill"
                        placeholder="For % savings estimate"
                        value={currentBill}
                        onChange={(e) => setCurrentBill(e.target.value)}
                        type="number"
                        className="mt-1.5 h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button 
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 h-12"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={calculateSavings}
                      className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Calculate Savings
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Success header */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 mb-4">
                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Great news for {results.zipCode}!
                </h3>
                <p className="text-gray-500">
                  {results.householdSize}-person household • {results.areaSqFt.toLocaleString()} sq ft irrigated
                </p>
              </div>

              {/* Main savings highlight */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 text-emerald-100 mb-2">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide">Estimated Annual Savings</span>
                  </div>
                  <div className="text-5xl font-bold mb-2">
                    ${results.dollarsavedPerYear}
                    <span className="text-2xl font-normal text-white/70">/year</span>
                  </div>
                  <p className="text-emerald-100">
                    That's <span className="font-semibold text-white">${results.dollarsavedPerMonth}/month</span> back in your pocket
                  </p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="border-blue-100 bg-blue-50/50">
                  <CardContent className="p-4 text-center">
                    <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">
                      {results.gallonsReplaced.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Gallons saved/year</div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-100 bg-emerald-50/50">
                  <CardContent className="p-4 text-center">
                    <Sprout className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">
                      {results.availableGreywaterGallons.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Greywater available</div>
                  </CardContent>
                </Card>

                <Card className="border-purple-100 bg-purple-50/50">
                  <CardContent className="p-4 text-center">
                    <Home className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">
                      {results.percentageSaved !== undefined ? `${results.percentageSaved}%` : '—'}
                    </div>
                    <div className="text-xs text-gray-500">Bill reduction</div>
                  </CardContent>
                </Card>
              </div>

              {/* Details */}
              <div className="flex gap-3">
                <div className="flex-1 rounded-lg bg-gray-50 p-3 flex items-center gap-3">
                  <CloudRain className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Irrigation need:</span>
                    <span className="text-gray-500 ml-1">{results.irrigationNeedGallons.toLocaleString()} gal/yr</span>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200/50">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Ready to start saving?</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Get a free custom quote tailored to your property. We'll recommend the perfect system and show you exact pricing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={resetCalculator} 
                  variant="outline" 
                  className="flex-1 h-12 border-gray-200"
                >
                  Recalculate
                </Button>
                <Button 
                  onClick={handleGetQuote}
                  className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium group"
                >
                  Get My Free Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
              
              <p className="text-center text-xs text-gray-400">
                No commitment required • Response within 24 hours
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
