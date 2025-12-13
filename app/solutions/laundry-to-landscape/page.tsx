import { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Droplets, DollarSign, Leaf, Ruler, Clock, Shield, Wrench, Shirt } from "lucide-react"

export const metadata: Metadata = {
  title: 'Buy Your Laundry-to-Landscape Greywater System – Water Wise Group',
  description: 'Join thousands of homeowners turning rinse cycles into real savings. The Aqua2use GWDD is the easiest way to start reusing greywater—no plumbing overhaul, no guesswork, just smart water use.',
  alternates: {
    canonical: 'https://waterwisegroup.com/solutions/laundry-to-landscape'
  }
}

export default function LaundryToLandscape() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Shirt className="h-4 w-4" />
                Laundry-to-Landscape
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Buy Your Laundry-to-Landscape Greywater System
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of homeowners turning rinse cycles into real savings. The Aqua2use GWDD is the easiest way to start reusing greywater—no plumbing overhaul, no guesswork, just smart water use.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link href="/products/aqua2use-gwdd">Buy Aqua2Use GWDD</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get a Consultation</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/family-garden.jpg"
                alt="Laundry to landscape greywater system irrigating garden"
                width={600}
                height={500}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Easy Installation</h3>
              <p className="text-gray-600 text-sm">
                No plumbing overhaul required
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Simple Operation</h3>
              <p className="text-gray-600 text-sm">
                No guesswork, just smart water use
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Laundry Reuse</h3>
              <p className="text-gray-600 text-sm">
                Greywater reuse from laundry cycles
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Water Savings</h3>
              <p className="text-gray-600 text-sm">
                Direct savings for landscaping
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
                Divert water from your washing machine with a simple 3-way valve system
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Filter</h3>
              <p className="text-gray-600">
                4-stage progressive filtration removes lint, hair, and soap residues
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

      {/* Why Laundry Water? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Start with Laundry Water?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Washing machines use 15-40 gallons per load—the biggest single source of reusable greywater in most homes. Starting here gives you maximum impact with minimal effort.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Droplets className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Highest Volume Source</h4>
                    <p className="text-gray-600">Most water per appliance in your home</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Legal Everywhere</h4>
                    <p className="text-gray-600">Permitted in most states without complex permits</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Easiest Installation</h4>
                    <p className="text-gray-600">Simple valve system—no complex plumbing required</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Immediate Savings</h4>
                    <p className="text-gray-600">Cut water bills by 30-40% starting immediately</p>
                  </div>
                </div>
              </div>
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

      {/* Product Specs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Aqua2use Grey Water Diversion System
                  </h2>
                  <p className="text-3xl font-bold text-emerald-600 mb-2">From $625.00</p>
                  <p className="text-gray-600 mb-6">Gravity model - no pump included</p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <Ruler className="h-5 w-5 text-emerald-600" />
                      <span className="text-gray-700">Compact: 24" × 15" × 20"—fits anywhere</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-emerald-600" />
                      <span className="text-gray-700">2-4 hour installation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Droplets className="h-5 w-5 text-emerald-600" />
                      <span className="text-gray-700">Reuse up to 40,000 gallons annually</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-emerald-600" />
                      <span className="text-gray-700">Filter cleaning every 4-6 months</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-emerald-600" />
                      <span className="text-gray-700">12 month replacement warranty</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                    <Link href="/products/aqua2use-gwdd">Buy Aqua2Use GWDD</Link>
                  </Button>
                </div>
                <div className="bg-gray-100 flex items-center justify-center p-8">
                  <Image
                    src="/images/gwdd-gravity.jpg"
                    alt="Aqua2use GWDD"
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
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 lg:p-12">
              <blockquote className="text-xl lg:text-2xl text-gray-800 mb-6 leading-relaxed">
                "I have had my Aqua2Use for about 5 years. It has performed flawlessly. I use grey water to water my flower beds."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Martin</p>
                  <p className="text-gray-600 text-sm">Aqua2use GWDD Owner, 5 Years</p>
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
              Turn Rinse Cycles Into Real Savings
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of homeowners who have discovered the easiest way to save water and money
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
                <Link href="/products/aqua2use-gwdd">Buy Aqua2Use GWDD</Link>
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
