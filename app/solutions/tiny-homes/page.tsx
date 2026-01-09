import { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Droplets, DollarSign, Leaf, Ruler, Clock, Shield, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: 'Greywater Systems for Tiny Homes – Water Wise Group',
  description: 'Live Small. Save Big. Go Green. Tiny home greywater systems that save 40% on water bills. Compact design, 2-4 hour installation, 40,000 gallons saved annually.',
  alternates: {
    canonical: 'https://waterwisegroup.com/solutions/tiny-homes'
  }
}

export default function TinyHomeSolutions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                Tiny Home Solutions
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Live Small. Save Big. Go Green.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Tiny homes need to save water. Use less, protect nature, and follow the rules—all while living a green life.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Untreated greywater from showers, sinks, and washing machines represents wasted potential. Turn every drop of your shower and laundry into a lush garden that cuts your bills and fuels your off-grid life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link href="/products/aqua2use">Buy Aqua2Use GWDD</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get a Consultation</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/tiny-home-customer.jpg"
                alt="Greywater system for tiny homes"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save Money Instantly</h3>
              <p className="text-gray-600">
                Cut your water bill by 40% and enjoy lower monthly bills
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Conserve Water</h3>
              <p className="text-gray-600">
                Reuse non-sewage waste water to significantly reduce water consumption
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Environmental Impact</h3>
              <p className="text-gray-600">
                Recycle your grey water to create a sustainable lifestyle
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
              Three simple steps to water recycling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collect</h3>
              <p className="text-gray-600">
                Collect water from laundry, sinks, bath, and shower
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Filter</h3>
              <p className="text-gray-600">
                Filter using advanced filter mats
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flourish</h3>
              <p className="text-gray-600">
                Automatically pump filtered water via subsurface drip irrigation to plants
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Aqua2use Grey Water Diversion System
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                From <span className="font-bold text-emerald-600">$625.00</span>
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Ruler className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Compact Design</h4>
                    <p className="text-gray-600">24" length × 15" width × 20" height — fits anywhere</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quick Installation</h4>
                    <p className="text-gray-600">2-4 hours — so you'll start saving water and money fast!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Droplets className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Massive Savings</h4>
                    <p className="text-gray-600">Families of four can reuse over 40,000 gallons of water each year</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Easy Maintenance</h4>
                    <p className="text-gray-600">Filter designed for repeated cleaning; recommended cycle every 4-6 months</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Warranty Protection</h4>
                    <p className="text-gray-600">All parts and the pump are covered by a 12 month replacement warranty</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                <Link href="/products/aqua2use">Buy Aqua2Use GWDD</Link>
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/images/gwdd-gravity.jpg"
                alt="Aqua2use Grey Water Diversion System"
                width={500}
                height={500}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Safety Note */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Safe for Your Garden</h3>
            <p className="text-lg text-gray-700">
              It is absolutely safe to use greywater to water your plants and your trees when using drip irrigation and low-phosphate detergent.
            </p>
          </div>
        </div>
      </section>

      {/* Real Customer Testimonial */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 lg:p-12">
              <blockquote className="text-xl lg:text-2xl text-gray-800 mb-6 leading-relaxed">
                "While planning the design of our tiny house, I explored various grey water filtering systems. This particular design seamlessly integrated into our wastewater management plan."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                  <span className="text-emerald-700 font-bold">ME</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mike E.</p>
                  <p className="text-gray-600 text-sm">Tiny Home Owner, Aqua2use GWDD</p>
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
              Complete Your Sustainable Tiny Home
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join the tiny home movement with water recycling that matches your sustainable lifestyle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
                <Link href="/products/aqua2use">Buy Aqua2Use GWDD</Link>
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
