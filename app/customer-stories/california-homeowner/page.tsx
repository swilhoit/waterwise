import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Droplets, TreePine, Calendar, MapPin, CheckCircle } from "lucide-react"

export default function CaliforniaHomeownerStory() {
  return (
    <div>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50/30 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/customer-stories" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-700 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Customer Stories
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>California</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>System installed 2021</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  <span>90% water reused</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                How One California Homeowner Uses Aqua2use to Save Water—and His Trees
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Jay's innovative greywater system protects 60-year-old redwoods and camellias during California droughts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                <p className="text-lg italic text-gray-700 mb-0">
                  "If you're even a little handy and care about saving water, Aqua2use is an affordable way to make a big impact. If it ever gets really bad, at least our trees will survive."
                </p>
                <p className="text-sm text-gray-600 mt-2 font-semibold">— Jay, California Homeowner</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Living in drought-prone California, Jay faced a critical challenge: how to maintain his mature landscape, including precious 60-year-old redwoods and camellias, while complying with increasingly strict water restrictions. Traditional irrigation was becoming both expensive and environmentally irresponsible.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Jay installed an Aqua2use greywater system that captures water from his washing machine, sinks, tub, and shower. Using a clever combination of a two-way valve and indexing valve, he can distribute filtered greywater to different trees throughout his property.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">System Components</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Aqua2use GWDD filtration system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Two-way valve for distribution control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Indexing valve for rotating irrigation zones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Connection to washing machine, bathroom sinks, tub, and shower</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Process</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                As a hands-on homeowner, Jay appreciated the DIY-friendly nature of the Aqua2use system. The installation was straightforward enough for someone with basic plumbing knowledge, yet sophisticated enough to handle his household's full greywater output.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintenance</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Jay found maintenance surprisingly simple: "You just open the system every 3-4 months and scrape off any extra build-up." This minimal maintenance requirement makes the system practical for busy homeowners.
              </p>

              <div className="bg-green-50 rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Impact & Results</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                    <p className="text-gray-700">Of household water reused for irrigation</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">60+ years</div>
                    <p className="text-gray-700">Age of trees now protected from drought</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">3-4 months</div>
                    <p className="text-gray-700">Between simple maintenance checks</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                    <p className="text-gray-700">Peace of mind during water restrictions</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Looking Forward</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Jay's system represents more than just water savings—it's an insurance policy for his landscape. During severe droughts when neighbors' gardens suffer, Jay's trees continue to thrive on recycled household water. His forward-thinking approach demonstrates how individual homeowners can make a significant environmental impact while protecting their property investments.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
                <p className="text-lg font-semibold text-gray-900 mb-2">Jay's Advice to Other Homeowners:</p>
                <p className="text-gray-700">
                  "If you're even a little handy and care about saving water, Aqua2use is an affordable way to make a big impact. The installation is manageable for a DIY project, and the maintenance is minimal. Most importantly, you'll have peace of mind knowing your landscape will survive even the worst droughts."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Protect Your Landscape Like Jay?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of homeowners who are securing their gardens' future with Aqua2use greywater systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/products">View Our Systems</Link>
              </Button>
              <Button size="lg" className="bg-transparent border-2 border-white hover:bg-white/10" asChild>
                <Link href="/contact">Get Your Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}