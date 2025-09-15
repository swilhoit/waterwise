import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Droplets, DollarSign, Shield, AlertCircle, FileText, Phone, MapPin } from "lucide-react"

export default function SantaMonicaResidential() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-600 text-white">Santa Monica Greywater Compliance</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Santa Monica Approved 
              <span className="text-blue-600"> Aqua2use Greywater Systems</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Meet Santa Monica's water conservation mandates with our code-compliant Aqua2use systems. 
              Save 40% on water bills while complying with Stage 2 restrictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/contact">
                  Check Compliance Requirements
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#mandates">View Mandates</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Municipal Code Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Permit Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>NSF Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Badge */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Aqua2use Systems Meet Santa Monica Municipal Code Chapter 7.10</h3>
                <p className="text-gray-600">Our systems include mandatory surge tanks, overflow protection, and backflow prevention required for Santa Monica installations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Mandates */}
      <section id="mandates" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Santa Monica Water Mandates Affecting Your Property
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <AlertCircle className="h-10 w-10 text-orange-600 mb-4" />
                  <CardTitle>Stage 2 Water Shortage Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Mandatory 20% reduction in water use from 2013 baseline levels.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">Current Restrictions:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Landscape watering 2 days/week only</li>
                      <li>• No watering 9 AM - 4 PM</li>
                      <li>• 8 minute maximum per station</li>
                      <li>• Fines from $200-$1,000</li>
                    </ul>
                    <p className="mt-3 font-semibold text-green-700">
                      ✓ Greywater exempt from all restrictions
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <FileText className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle>Greywater System Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Santa Monica Municipal Code 7.10.090 requirements:
                  </p>
                  <div className="space-y-2 text-sm">
                    <ul className="space-y-1 text-gray-600">
                      <li>• Surge tank required (Aqua2use ✓)</li>
                      <li>• Overflow protection (Aqua2use ✓)</li>
                      <li>• Backflow prevention (Aqua2use ✓)</li>
                      <li>• Subsurface irrigation only (Aqua2use ✓)</li>
                      <li>• Health Dept approval needed</li>
                    </ul>
                    <p className="mt-3 font-semibold text-green-700">
                      Aqua2use meets all requirements
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Enforcement Alert</h3>
              <p className="text-gray-700 mb-3">
                Santa Monica Water Resources actively monitors water usage. Properties exceeding allocations receive:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Warning notice with 14-day correction period</li>
                <li>• $200 fine for first violation after warning</li>
                <li>• $500 for second violation</li>
                <li>• $1,000 per day for continued violations</li>
                <li>• Flow restrictors installed for repeat violators</li>
              </ul>
              <p className="mt-4 font-semibold text-green-700">
                Installing an Aqua2use system demonstrates proactive compliance and can reduce or eliminate penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Greywater-Specific Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Santa Monica Greywater Programs & Incentives
              </h2>
              <p className="text-xl text-gray-600">
                Financial support specifically for greywater system installation
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Laundry-to-Landscape Rebate Program</CardTitle>
                      <Badge className="mt-2 bg-green-600 text-white">Active Program</Badge>
                    </div>
                    <span className="text-2xl font-bold text-green-600">$500</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Direct rebate for installing Aqua2use systems that divert washing machine water to landscape irrigation.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Eligibility:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Single-family homes</li>
                        <li>• Must use Aqua2use or approved system</li>
                        <li>• Professional installation required</li>
                        <li>• Pre-approval needed</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Process:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Apply before installation</li>
                        <li>• Install within 90 days</li>
                        <li>• Submit receipts & photos</li>
                        <li>• Receive rebate in 6-8 weeks</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">California Water Efficiency Rebate</CardTitle>
                      <Badge className="mt-2 bg-blue-600 text-white">State Program</Badge>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">$250</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Additional state rebate for greywater systems that process 150+ gallons per day (Aqua2use GWDD qualifies).
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Stackable with local rebates</li>
                    <li>• NSF certification required (Aqua2use has this)</li>
                    <li>• Must reduce indoor water use by 30%+</li>
                    <li>• Online application process</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Spray-to-Drip Conversion Rebate</CardTitle>
                      <Badge className="mt-2 bg-purple-600 text-white">Perfect for Aqua2use</Badge>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">$2/sq ft</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Convert spray irrigation to drip when installing Aqua2use systems. Greywater requires subsurface drip irrigation.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Required for greywater compliance anyway</li>
                    <li>• Up to $2,000 for typical yard</li>
                    <li>• Combines perfectly with Aqua2use installation</li>
                    <li>• We handle the conversion and rebate application</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">Total Available Rebates for Aqua2use Installation:</p>
                  <p className="text-4xl font-bold text-green-600">$2,750+</p>
                  <p className="text-sm text-gray-600 mt-2">Including spray-to-drip conversion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Permit Streamlining */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Santa Monica Permit Process for Aqua2use Systems
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-green-600 mb-4" />
                  <CardTitle>Simple Laundry System - No Permit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Aqua2use laundry-only systems installed WITHOUT a permit if:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✓ No cutting into existing plumbing</li>
                    <li>✓ 3-way valve installation only</li>
                    <li>✓ Uses washing machine pump only</li>
                    <li>✓ Discharge to landscape (subsurface)</li>
                    <li>✓ No storage tank</li>
                  </ul>
                  <p className="mt-4 font-semibold text-green-600">
                    Aqua2use GWDD Laundry Kit qualifies!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle>Full System - Expedited Permit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Aqua2use whole-house systems get priority processing:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 5-7 day plan check (vs 4-6 weeks)</li>
                    <li>• Water conservation priority status</li>
                    <li>• One-stop permit center</li>
                    <li>• Online submission available</li>
                    <li>• We handle all paperwork</li>
                  </ul>
                  <p className="mt-4 font-semibold text-blue-600">
                    Aqua2use is pre-approved system
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Why Aqua2use is Pre-Approved in Santa Monica</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">NSF/ANSI 350</p>
                  <p className="text-sm text-gray-600">Certified for residential water reuse</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">IAPMO Listed</p>
                  <p className="text-sm text-gray-600">Meets all plumbing codes</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">CA Title 22</p>
                  <p className="text-sm text-gray-600">Compliant with state standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Success */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Santa Monica Aqua2use Installations
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Ocean Park - 90405</span>
                  </div>
                  <CardTitle>3-Bedroom Home Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>System:</span>
                      <span className="font-semibold">Aqua2use GWDD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Water Source:</span>
                      <span className="font-semibold">Laundry + Shower</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Savings:</span>
                      <span className="font-semibold text-green-600">$95</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rebate Received:</span>
                      <span className="font-semibold text-green-600">$750</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Permit Status:</span>
                      <span className="font-semibold">Expedited (5 days)</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 italic">
                    "No more watering restrictions. Our garden stays green year-round while neighbors struggle with brown lawns."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Sunset Park - 90404</span>
                  </div>
                  <CardTitle>Duplex Property Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>System:</span>
                      <span className="font-semibold">Aqua2use Pro (2 units)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Water Source:</span>
                      <span className="font-semibold">All greywater sources</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Savings:</span>
                      <span className="font-semibold text-green-600">$180</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rebate Received:</span>
                      <span className="font-semibold text-green-600">$1,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Compliance Status:</span>
                      <span className="font-semibold">Exceeds 20% mandate</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 italic">
                    "City inspector said our Aqua2use system was the best installation he'd seen. Zero compliance issues."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Santa Monica Greywater Questions
              </h2>
            </div>

            <div className="space-y-8">
              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Is the Aqua2use system approved by Santa Monica?
                </h3>
                <p className="text-gray-600">
                  Yes. Aqua2use systems are pre-approved by Santa Monica Building & Safety. They meet all requirements in Municipal Code 7.10.090 including surge tanks, overflow protection, and backflow prevention. The Health Department has approved Aqua2use for residential installations.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How does Aqua2use help with Stage 2 restrictions?
                </h3>
                <p className="text-gray-600">
                  Greywater is completely exempt from Santa Monica's water use restrictions. While other properties can only water 2 days per week for 8 minutes, Aqua2use systems can irrigate any day, any time. This keeps landscapes green while achieving the mandatory 20% reduction.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What rebates apply to Aqua2use systems?
                </h3>
                <p className="text-gray-600">
                  Aqua2use qualifies for Santa Monica's $500 Laundry-to-Landscape rebate and California's $250 Water Efficiency rebate, totaling $750. The system's NSF certification and daily capacity meet all rebate requirements. We help with application paperwork.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do I need a permit for Aqua2use installation?
                </h3>
                <p className="text-gray-600">
                  Simple laundry-only Aqua2use systems don't need permits if installed with a 3-way valve. Full home systems need permits but get expedited 5-7 day processing as water conservation projects. We handle all permit applications and know exactly what Santa Monica requires.
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
            Meet Santa Monica's Water Mandates with Aqua2use
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Pre-approved systems. Expedited permits. Maximum rebates.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold">$2,750+</div>
                <div className="text-sm opacity-90">Total Rebates</div>
              </div>
              <div>
                <div className="text-3xl font-bold">5 Days</div>
                <div className="text-sm opacity-90">Permit Approval</div>
              </div>
              <div>
                <div className="text-3xl font-bold">20%+</div>
                <div className="text-sm opacity-90">Water Reduction</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold" asChild>
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  (310) 555-0123
                </Link>
              </Button>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg" asChild>
                <Link href="/contact">Check Compliance</Link>
              </Button>
            </div>
          </div>
          
          <p className="text-sm opacity-75">
            Serving all Santa Monica ZIP codes: 90401, 90402, 90403, 90404, 90405
          </p>
        </div>
      </section>
    </div>
  )
}