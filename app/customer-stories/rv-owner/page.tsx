import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Truck, Droplets, Calendar, TreePine, CheckCircle } from "lucide-react"

export default function RVOwnerStory() {
  return (
    <div>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50/30 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/customer-stories" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-700 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Customer Stories
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Permanent RV Living</span>
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="h-4 w-4" />
                  <span>Garden Irrigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  <span>Zero waste water</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                From Muddy Mess to Thriving Garden: How One RV Owner Transformed Greywater into Greenery
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Jay Linden's innovative solution turned a drainage problem into a flourishing garden oasis
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
              <div className="relative mb-8">
                <Image
                  src="/images/rv-customer.jpg"
                  alt="RV greywater system setup"
                  width={800}
                  height={400}
                  className="rounded-lg w-full"
                />
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
                <p className="text-lg italic text-gray-700 mb-0">
                  "I've been happy with the results. The plants are healthy and around my trailer is dry."
                </p>
                <p className="text-sm text-gray-600 mt-2 font-semibold">— Jay Linden, Permanent RV Resident</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Living permanently in a travel trailer presented unique challenges for Jay Linden. The greywater drainage from his RV was creating several problems:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Standing water and puddles around the trailer</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Unpleasant odors from stagnant greywater</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Excess moisture creating muddy conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Wasted water that could benefit plants</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Jay discovered the Aqua2use Grey Water Diversion Device (GWDD), a system perfectly suited for RV applications. The GWDD offered a simple yet effective solution that could connect directly to his RV's existing greywater output.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">System Setup</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Direct connection to RV's greywater hose</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Aqua2use GWDD filtration system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Standard garden hose for water distribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Easy-to-move irrigation setup</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementation Process</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The installation was remarkably straightforward. Jay connected the GWDD directly to his RV's greywater outlet using standard fittings. The filtered water then flows through a regular garden hose, which Jay moves every few days to irrigate different areas around his trailer.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                This simple rotation system ensures even water distribution while preventing oversaturation in any single area. The mobility of the setup perfectly matches the flexibility needed for RV living.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits for RV Living</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Eliminated Standing Water</h4>
                      <p className="text-sm text-gray-600">No more puddles or muddy areas around the trailer</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Odor Control</h4>
                      <p className="text-sm text-gray-600">Fresh environment with no greywater smells</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Garden Creation</h4>
                      <p className="text-sm text-gray-600">Transformed waste into thriving plant life</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Easy Maintenance</h4>
                      <p className="text-sm text-gray-600">Minimal upkeep required for continuous operation</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Results</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The transformation around Jay's trailer has been remarkable. What was once a problematic drainage area is now a green oasis. The nutrient-rich greywater has nourished the surrounding plants, creating a beautiful and sustainable garden environment.
              </p>

              <div className="bg-green-50 rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Impact & Achievements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                    <p className="text-gray-700">Greywater recycled for irrigation</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">Zero</div>
                    <p className="text-gray-700">Standing water or odor issues</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">Thriving</div>
                    <p className="text-gray-700">Garden created from recycled water</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">Simple</div>
                    <p className="text-gray-700">Installation and maintenance</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect for RV Lifestyle</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Jay's success story demonstrates how the Aqua2use system is ideally suited for RV living. The system's portability, easy connection to standard RV fittings, and minimal maintenance requirements make it perfect for both permanent and traveling RV residents.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                By moving the garden hose every few days, Jay ensures even water distribution while maintaining the flexibility that RV living demands. This simple approach has turned what was once a waste management challenge into an opportunity for sustainable living.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
                <p className="text-lg font-semibold text-gray-900 mb-2">Jay's Message to Fellow RV Owners:</p>
                <p className="text-gray-700">
                  "If you're dealing with greywater issues in your RV, this system is a game-changer. It's simple to set up, works with standard RV connections, and completely eliminates the problems of standing water and odors. Plus, you get the bonus of creating a beautiful garden wherever you're parked. I've been happy with the results—the plants are healthy and around my trailer is dry."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Transform Your RV Greywater Challenge into a Garden Paradise
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of RV owners who have discovered the perfect greywater solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
                <Link href="/solutions/rvs">Learn More About RV Systems</Link>
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