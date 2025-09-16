import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Droplets, DollarSign, Shield, AlertCircle, FileText, Phone, MapPin, TrendingUp, Calculator, Layers, Building2, Users, HelpCircle } from "lucide-react"

export default function GlendaleResidential() {
  return (
    <div>
      {/* Hero Section - Incentives First */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-600 text-white">Glendale Water Conservation</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get $500 <span className="text-blue-600">Greywater Rebate</span> in Glendale
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Glendale Water & Power offers direct rebates for laundry-to-landscape greywater systems. 
              Cut water bills by 40% while earning city incentives for conservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="#incentive-calculator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Your Savings
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#apply">Apply for Rebate</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span>$500 Direct Rebate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>No Permit Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>GWP Approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incentive Calculator Banner */}
      <section id="incentive-calculator" className="py-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Glendale Greywater Economics</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">System Cost</div>
                  <div className="text-2xl font-bold">$599</div>
                  <div className="text-xs opacity-75">Aqua2use L2L</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">GWP Rebate</div>
                  <div className="text-2xl font-bold">$500</div>
                  <div className="text-xs opacity-75">Greywater Specific!</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Your Cost</div>
                  <div className="text-2xl font-bold">$99</div>
                  <div className="text-xs opacity-75">After Rebate</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
                  <div className="text-sm mb-1">Payback Period</div>
                  <div className="text-3xl font-bold">&lt; 2 Months</div>
                  <div className="text-xs opacity-90">With Water Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Rebate Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Glendale's $500 Laundry-to-Landscape Rebate Program
              </h2>
              <p className="text-xl text-gray-600">
                One of California's best greywater incentive programs
              </p>
            </div>

            <Card className="border-2 border-green-500 mb-8">
              <CardHeader className="bg-green-50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">GWP Greywater Rebate Details</CardTitle>
                    <Badge className="mt-2 bg-green-600 text-white">ACTIVE PROGRAM</Badge>
                  </div>
                  <span className="text-3xl font-bold text-green-600">$500</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Program Benefits:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>Up to $500 rebate (not exceeding actual cost)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>No permit required for L2L systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>Reuse washing machine water for landscape</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>Save 15,000-40,000 gallons/year</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Requirements:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span>Must be GWP residential customer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span>Pre-approval required before installation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span>System must meet CA Plumbing Code</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span>Post-installation inspection required</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-blue-800">
                    💡 Pro Tip: With the $500 rebate, the Aqua2use system costs you only $99 - paid back in under 2 months!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Rebates Table */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">Stack These Additional Glendale Rebates</h3>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rebate Amount</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-green-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">Laundry-to-Landscape Greywater</div>
                          <div className="text-sm text-gray-500">Direct greywater rebate</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-600 text-white">Up to $500</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">GWP residential customer</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">Turf Removal</div>
                          <div className="text-sm text-gray-500">Replace lawn with drought-tolerant plants</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-600 text-white">$2/sq ft</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Up to $2,000 max</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">High-Efficiency Washers</div>
                          <div className="text-sm text-gray-500">Perfect greywater source</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-gray-600 text-white">$85+</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Energy Star certified</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">Rain Barrels</div>
                          <div className="text-sm text-gray-500">Rainwater harvesting</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-600 text-white">$75-$150</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Per barrel installed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section id="apply" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How to Get Your $500 Rebate
              </h2>
              <p className="text-xl text-gray-600">
                Simple 4-step process to get your greywater system nearly free
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Apply Online</h3>
                <p className="text-sm text-gray-600">
                  Submit application at GlendaleWaterAndPower.com
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Get Pre-Approval</h3>
                <p className="text-sm text-gray-600">
                  Wait for approval before purchasing
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Install System</h3>
                <p className="text-sm text-gray-600">
                  DIY or professional installation
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">Receive Rebate</h3>
                <p className="text-sm text-gray-600">
                  $500 check after inspection
                </p>
              </div>
            </div>

            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle>Contact Glendale Water & Power</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Rebate Program Office</h4>
                    <p className="text-sm text-gray-600 mb-2">📞 (818) 548-2062</p>
                    <p className="text-sm text-gray-600 mb-2">📧 gwprebates@glendaleca.gov</p>
                    <p className="text-sm text-gray-600">🌐 GlendaleWaterAndPower.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Office Hours</h4>
                    <p className="text-sm text-gray-600 mb-2">Monday - Friday: 7:00 AM - 5:30 PM</p>
                    <p className="text-sm text-gray-600">141 N. Glendale Ave., Level 1</p>
                    <p className="text-sm text-gray-600">Glendale, CA 91206</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Glendale Greywater Rebate FAQs
              </h2>
            </div>

            <div className="space-y-8">
              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Who qualifies for the $500 greywater rebate?
                </h3>
                <p className="text-gray-600">
                  Residential customers of Glendale Water & Power who install a qualifying laundry-to-landscape 
                  greywater system. The system must be designed to reuse water from washing machines to water 
                  plants and meet California Plumbing Code requirements.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do I need a permit for a laundry-to-landscape system in Glendale?
                </h3>
                <p className="text-gray-600">
                  No permit is required if your system meets the 13 conditions outlined in California Plumbing 
                  Code Chapter 16A, including using only the washer's pump, subsurface irrigation, and proper 
                  flow control. More complex greywater systems do require permits.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Can I install the system myself?
                </h3>
                <p className="text-gray-600">
                  Yes! Laundry-to-landscape systems are DIY-friendly. The Aqua2use system comes with detailed 
                  installation instructions. However, professional installation is also available if preferred, 
                  and the rebate applies either way.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How long does it take to get the rebate?
                </h3>
                <p className="text-gray-600">
                  After your post-installation inspection is approved, rebate checks are typically processed 
                  within 6-8 weeks. The rebate will not exceed the actual cost of your system, up to $500.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Get Your Greywater System for Just $99
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            With Glendale's $500 rebate, the Aqua2use system practically pays for itself!
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto mb-8">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div>
                <div className="text-3xl font-bold">$500</div>
                <div className="text-sm opacity-90">GWP Rebate</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$99</div>
                <div className="text-sm opacity-90">Your Cost</div>
              </div>
              <div>
                <div className="text-3xl font-bold">40%</div>
                <div className="text-sm opacity-90">Water Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2mo</div>
                <div className="text-sm opacity-90">Payback</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold" asChild>
                <Link href="/contact">
                  <Calculator className="mr-2 h-5 w-5" />
                  Start Your Application
                </Link>
              </Button>
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg" asChild>
                <Link href="tel:818-548-2062">
                  <Phone className="mr-2 h-5 w-5" />
                  (818) 548-2062
                </Link>
              </Button>
            </div>
          </div>
          
          <p className="text-sm opacity-75">
            Serving all Glendale ZIP codes: 91201, 91202, 91203, 91204, 91205, 91206, 91207, 91208
          </p>
        </div>
      </section>
    </div>
  )
}