"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, DollarSign, Home, Calculator, X, CloudRain, Sprout } from "lucide-react"

interface WaterSavingsCalculatorProps {
  isOpen: boolean
  onClose: () => void
}

export function WaterSavingsCalculator({ isOpen, onClose }: WaterSavingsCalculatorProps) {
  const [zipCode, setZipCode] = useState("")
  const [householdSize, setHouseholdSize] = useState("4")
  const [currentBill, setCurrentBill] = useState("")
  const [irrigatedArea, setIrrigatedArea] = useState("1000")
  const [annualRainInches, setAnnualRainInches] = useState("15")
  const [region, setRegion] = useState("west")
  const [waterPricePerKgal, setWaterPricePerKgal] = useState("6.00")
  const [results, setResults] = useState<any>(null)

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
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white">
        <div className="relative overflow-hidden rounded-t-xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Water Savings Calculator
              </h2>
              <button onClick={onClose} className="text-white/80 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="mt-2 text-white/85 text-sm sm:text-base">Estimate irrigation savings from switching to a greywater system.</p>
          </div>
          <div className="absolute inset-0 pointer-events-none bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        </div>

        <div className="p-6">
        <div className="space-y-6">
          {!results ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="zipcode">Zip Code</Label>
                  <Input
                    id="zipcode"
                    placeholder="Enter your zip code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    maxLength={5}
                  />
                </div>

                <div>
                  <Label htmlFor="household">Household Size</Label>
                  <select
                    id="household"
                    value={householdSize}
                    onChange={(e) => setHouseholdSize(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5+ people</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="area">Irrigated Area (sq ft)</Label>
                  <Input
                    id="area"
                    placeholder="e.g. 1000"
                    value={irrigatedArea}
                    onChange={(e) => setIrrigatedArea(e.target.value)}
                    type="number"
                  />
                </div>

                <div>
                  <Label htmlFor="rain">Average Annual Rainfall (inches)</Label>
                  <Input
                    id="rain"
                    placeholder="e.g. 15"
                    value={annualRainInches}
                    onChange={(e) => setAnnualRainInches(e.target.value)}
                    type="number"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Water Price ($/1,000 gal)</Label>
                  <Input
                    id="price"
                    placeholder="e.g. 6.00"
                    value={waterPricePerKgal}
                    onChange={(e) => setWaterPricePerKgal(e.target.value)}
                    type="number"
                    step="0.01"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="bill">Monthly Water Bill ($) — optional</Label>
                  <Input
                    id="bill"
                    placeholder="Used to estimate % of bill saved"
                    value={currentBill}
                    onChange={(e) => setCurrentBill(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <Button 
                onClick={calculateSavings}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!zipCode}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate My Savings
              </Button>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-green-600 mb-2">
                  Your Potential Savings in {results.zipCode}
                </h3>
                <p className="text-gray-600">{results.householdSize}-person household • {results.areaSqFt.toLocaleString()} sq ft irrigated • {results.rainInches}" rainfall</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="text-center pb-2">
                    <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <CardTitle className="text-2xl font-bold">
                      {results.gallonsReplaced.toLocaleString()}
                    </CardTitle>
                    <CardDescription>Gallons replaced by greywater (annual)</CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="text-center pb-2">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <CardTitle className="text-2xl font-bold">
                      ${results.dollarsavedPerYear}
                    </CardTitle>
                    <CardDescription>Saved annually</CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="text-center pb-2">
                    <Home className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <CardTitle className="text-2xl font-bold">
                      {results.percentageSaved !== undefined ? `${results.percentageSaved}%` : '—'}
                    </CardTitle>
                    <CardDescription>Water bill reduction (est.)</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CloudRain className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-semibold">Irrigation Need (after rain)</div>
                        <div className="text-sm text-gray-700">{results.irrigationNeedGallons.toLocaleString()} gallons/year</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Sprout className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-semibold">Greywater Available</div>
                        <div className="text-sm text-gray-700">{results.availableGreywaterGallons.toLocaleString()} gallons/year</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <p className="text-center text-sm text-gray-700">
                    <strong>Monthly savings: ${results.dollarsavedPerMonth}</strong><br />
                    Pricing uses ${'{'}results.pricePerKgal{'}'} per 1,000 gallons. Adjust region or price to refine.
                  </p>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={resetCalculator} variant="outline" className="flex-1">
                  Calculate Again
                </Button>
                <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                  <a href="/contact">Get Your Free Quote</a>
                </Button>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}