"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, DollarSign, Home, Calculator, X } from "lucide-react"

interface WaterSavingsCalculatorProps {
  isOpen: boolean
  onClose: () => void
}

export function WaterSavingsCalculator({ isOpen, onClose }: WaterSavingsCalculatorProps) {
  const [zipCode, setZipCode] = useState("")
  const [householdSize, setHouseholdSize] = useState("4")
  const [currentBill, setCurrentBill] = useState("")
  const [results, setResults] = useState<any>(null)

  const calculateSavings = () => {
    if (!zipCode || !currentBill) return

    // Mock calculation - in real app, this would use actual water rates and data
    const billAmount = parseFloat(currentBill)
    const people = parseInt(householdSize)
    
    // Estimated savings based on household size and current bill
    const gallonsSavedPerYear = people * 10000 // 10k gallons per person per year
    const percentageSaved = 40 // 40% average water bill reduction
    const dollarsavedPerYear = billAmount * 12 * (percentageSaved / 100)
    const dollarsavedPerMonth = dollarsavedPerYear / 12

    setResults({
      zipCode,
      gallonsSavedPerYear,
      dollarsavedPerYear: Math.round(dollarsavedPerYear),
      dollarsavedPerMonth: Math.round(dollarsavedPerMonth),
      percentageSaved,
      householdSize: people
    })
  }

  const resetCalculator = () => {
    setZipCode("")
    setHouseholdSize("4")
    setCurrentBill("")
    setResults(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Water Savings Calculator</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-center text-gray-600 mb-6">
            Discover how much you could save with greywater recycling
          </p>

        <div className="space-y-6">
          {!results ? (
            <>
              <div className="grid gap-4">
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
                  <Label htmlFor="bill">Monthly Water Bill ($)</Label>
                  <Input
                    id="bill"
                    placeholder="Enter your monthly water bill"
                    value={currentBill}
                    onChange={(e) => setCurrentBill(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <Button 
                onClick={calculateSavings}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!zipCode || !currentBill}
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
                <p className="text-gray-600">Based on a {results.householdSize}-person household</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="text-center pb-2">
                    <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <CardTitle className="text-2xl font-bold">
                      {results.gallonsSavedPerYear.toLocaleString()}
                    </CardTitle>
                    <CardDescription>Gallons saved per year</CardDescription>
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
                      {results.percentageSaved}%
                    </CardTitle>
                    <CardDescription>Water bill reduction</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <p className="text-center text-sm text-gray-700">
                    <strong>Monthly savings: ${results.dollarsavedPerMonth}</strong><br />
                    These estimates are based on average usage and local water rates in your area.
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