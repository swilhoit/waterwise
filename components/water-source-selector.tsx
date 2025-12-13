"use client"

import { useState } from "react"
import { Droplets, CloudRain, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeadFormModal } from "@/components/lead-form-modal"

export function WaterSourceSelector() {
  const [selected, setSelected] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleSelection = (source: string) => {
    setSelected(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    )
  }

  const handleSubmit = () => {
    setIsModalOpen(true)
  }

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
          Select Your Water Collection Source
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Choose one or both options to get started
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {/* Greywater Option */}
          <button
            onClick={() => toggleSelection("greywater")}
            className={`relative text-left bg-white p-8 rounded-2xl border-2 transition-all ${
              selected.includes("greywater")
                ? "border-emerald-500 ring-2 ring-emerald-100"
                : "border-gray-200 hover:border-emerald-300"
            }`}
          >
            {selected.includes("greywater") && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
              selected.includes("greywater") ? "bg-emerald-200" : "bg-emerald-100"
            }`}>
              <Droplets className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Greywater Recycling</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Reuse water from showers, sinks & laundry</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Save up to 40,000 gallons per year</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Reduce water bills by 40%</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Year-round water source</span>
              </li>
            </ul>
          </button>

          {/* Rainwater Option */}
          <button
            onClick={() => toggleSelection("rainwater")}
            className={`relative text-left bg-white p-8 rounded-2xl border-2 transition-all ${
              selected.includes("rainwater")
                ? "border-blue-500 ring-2 ring-blue-100"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            {selected.includes("rainwater") && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
              selected.includes("rainwater") ? "bg-blue-200" : "bg-blue-100"
            }`}>
              <CloudRain className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Rainwater Harvesting</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Capture rainwater for outdoor use</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Rebates & incentives available</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Pure, chemical-free water</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Reduce stormwater runoff</span>
              </li>
            </ul>
          </button>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Started
          </Button>
          {selected.length === 0 && (
            <p className="text-sm text-gray-500 mt-3">Select at least one option to continue</p>
          )}
          {selected.length > 0 && (
            <p className="text-sm text-gray-500 mt-3">
              {selected.length === 2 ? "Both sources selected" : `${selected[0] === "greywater" ? "Greywater" : "Rainwater"} selected`}
            </p>
          )}
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedSources={selected}
      />
    </section>
  )
}
