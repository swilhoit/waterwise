import { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplets, DollarSign, Leaf, Ruler, Wrench, Shield, Volume2, Sun } from "lucide-react"

export const metadata: Metadata = {
  title: 'Greywater Systems for RVs – Water Wise Group',
  description: 'RV Water Recycling Made Simple. Embrace sustainable RV living with Aqua2use greywater systems. Conserve up to 40,000 gallons annually, reduce campground fees.',
  alternates: {
    canonical: 'https://waterwisegroup.com/solutions/rvs'
  }
}

export default function RVSolutions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Droplets className="h-4 w-4" />
                RV Solutions
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Greywater Systems for RVs
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Embrace sustainable RV living and maximize water conservation through Aqua2use, enabling travelers to dramatically reduce water consumption, optimize wastewater management, and ensure environmental compliance.
              </p>
              <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
                RV Water Recycling Made Simple
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                The system transforms water management challenges by reclaiming greywater for irrigation, reducing environmental strain and operational costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link href="/products/aqua2use">Buy Aqua2Use Pro</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get a Consultation</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/solutions/situation-remote-ai.jpg"
                alt="Greywater system for RVs"
                width={600}
                height={500}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three Key Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Savings</h3>
              <p className="text-gray-600">
                Reduces campground dumping fees and freshwater purchases
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Conserve Up to 40,000 Gallons Annually</h3>
              <p className="text-gray-600">
                Extends RV water tank usage and reduces refill frequency
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Environmental Responsibility</h3>
              <p className="text-gray-600">
                Minimizes ecological footprint through water reuse
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three-stage filtration process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collect</h3>
              <p className="text-gray-600">
                Diverts water from laundry, sinks, bath, and shower
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Filter</h3>
              <p className="text-gray-600">
                Uses state-of-the-art filter mats for greywater filtration
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flourish</h3>
              <p className="text-gray-600">
                Automatically pumps filtered water via subsurface drip irrigation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Design Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative">
              <Image
                src="/images/gwdd-ug.jpg"
                alt="Aqua2use Pro Greywater Diversion System"
                width={500}
                height={500}
                className="rounded-2xl"
              />
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Compact Design for RV Living
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Dimensions: <span className="font-semibold">24" L x 15" W x 20" H</span>
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Ruler className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lightweight and Portable</h4>
                    <p className="text-gray-600">Perfect for tight RV compartments</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sun className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">UV-Resistant Material</h4>
                    <p className="text-gray-600">Built to withstand outdoor conditions</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Volume2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quiet Operation</h4>
                    <p className="text-gray-600">Won't disturb your peaceful RV experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Recommendation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Aqua2use Pro Greywater Diversion System
                  </h2>
                  <p className="text-3xl font-bold text-emerald-600 mb-6">$2,695.00</p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-emerald-600" />
                      <span className="text-gray-700">Minimal upkeep—simply rinse the filters every 4-6 months using a hose</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-emerald-600" />
                      <span className="text-gray-700">All parts and the pump are covered by a 12 month replacement warranty</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                    <Link href="/products/aqua2use">Buy Aqua2Use Pro</Link>
                  </Button>
                </div>
                <div className="bg-gray-100 flex items-center justify-center p-8">
                  <Image
                    src="/images/gwdd-ug.jpg"
                    alt="Aqua2use Pro"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Customer Testimonial */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 lg:p-12">
              <blockquote className="text-xl lg:text-2xl text-gray-800 mb-6 leading-relaxed">
                "I permanently live in a travel trailer...The grey water system enabled me to begin watering all my plants and I've been happy with the results. The plants are healthy and around my trailer is dry."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold">JL</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Jay Linden</p>
                  <p className="text-gray-600 text-sm">RV Owner, Aqua2use GWDD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-emerald-400 font-medium mb-4">Collect. Filter. Flourish.</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Start Your Sustainable RV Journey
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Embrace sustainable RV living with water recycling that goes wherever you go
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
                <Link href="/products/aqua2use">Buy Aqua2Use Pro</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
