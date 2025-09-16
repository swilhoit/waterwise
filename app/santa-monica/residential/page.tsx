import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Droplets, DollarSign, Shield, AlertCircle, FileText, Phone, MapPin, TrendingUp, Calculator, Layers, Building2, Users, HelpCircle } from "lucide-react"

export default function SantaMonicaResidential() {
  return (
    <div>
      {/* Hero Section - Incentives First */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-600 text-white">Water Conservation Solutions</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Save Up to $8,500 with 
              <span className="text-blue-600"> Greywater Systems</span>
              <br />in Santa Monica
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Stack city, county, and regional rebates while cutting water bills by 40%. 
              Meet Santa Monica's Water Neutrality Ordinance with compliant greywater solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="#incentive-calculator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Your Rebates
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#incentive-stacking">View All Incentives</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span>City + County + State Rebates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Pre-Approved Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>100% Compliant</span>
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
              <h2 className="text-2xl font-bold mb-4">Potential Water Conservation Incentives</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Turf Removal</div>
                  <div className="text-2xl font-bold">Up to $4,500</div>
                  <div className="text-xs opacity-75">Cash for Grass</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Spray to Drip</div>
                  <div className="text-2xl font-bold">~$800-$2,000</div>
                  <div className="text-xs opacity-75">Irrigation Conversion</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Rain Harvesting</div>
                  <div className="text-2xl font-bold">$200-$2,000</div>
                  <div className="text-xs opacity-75">Barrels/Cisterns</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
                  <div className="text-sm mb-1">Total Potential</div>
                  <div className="text-3xl font-bold">Up to $8,500</div>
                  <div className="text-xs opacity-90">Combined Rebates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incentive Stacking Deep Dive */}
      <section id="incentive-stacking" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Stack These Incentives for Maximum Savings
              </h2>
              <p className="text-xl text-gray-600">
                Aqua2use systems qualify for ALL of these programs simultaneously
              </p>
            </div>

            {/* Incentives Table */}
            <div className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Available Water Conservation Rebates</h3>
                  <p className="text-blue-100 text-sm mt-1">Prioritized for greywater and irrigation projects</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rebate Amount</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Greywater Benefit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Irrigation-related first */}
                      <tr className="bg-blue-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">Spray to Drip Conversion</div>
                          <div className="text-sm text-gray-500">Convert sprinklers to drip irrigation</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Santa Monica</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-600 text-white">~$2/sq ft</Badge>
                          <div className="text-xs text-gray-500 mt-1">Est. $800-$2,000 typical</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Perfect companion to greywater</td>
                      </tr>
                      
                      <tr className="bg-blue-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">Weather-Based Controllers</div>
                          <div className="text-sm text-gray-500">Smart irrigation controllers</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">MWD</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-600 text-white">Up to $200</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Optimize greywater irrigation</td>
                      </tr>
                      
                      {/* Landscape transformation */}
                      <tr>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">Cash for Grass</div>
                          <div className="text-sm text-gray-500">Turf removal & replacement</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Santa Monica</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-600 text-white">Up to $4,500</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Create greywater-ready landscape</td>
                      </tr>
                      
                      <tr>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">Rain Harvesting Systems</div>
                          <div className="text-sm text-gray-500">Barrels, cisterns, gardens</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Santa Monica</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-600 text-white">$200-$2,000</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Combine with greywater storage</td>
                      </tr>
                      
                      {/* Indoor efficiency */}
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">High-Efficiency Washers</div>
                          <div className="text-sm text-gray-500">Energy Star certified</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">MWD</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-gray-600 text-white">$85+</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Source for L2L systems</td>
                      </tr>
                      
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">High-Efficiency Toilets</div>
                          <div className="text-sm text-gray-500">1.1 gallons per flush</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">MWD</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-gray-600 text-white">$40/toilet</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">Reduces blackwater volume</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 px-6 py-4 border-t border-blue-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Pro Tip:</span> Install greywater alongside turf removal and sprinkler conversion to maximize rebates. 
                      The $599 Aqua2use system cost can be completely offset by landscape rebates!
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {/* Application Guide */}
            <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                How to Apply for These Rebates
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-900 mb-2">1. Santa Monica Programs</div>
                  <p className="text-sm text-gray-600 mb-3">Cash for Grass & Spray to Drip</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>📧 environment.mailbox@santamonica.gov</p>
                    <p>📞 (310) 458-8972</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-900 mb-2">2. MWD Programs</div>
                  <p className="text-sm text-gray-600 mb-3">Devices & Controllers</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>🌐 socalwatersmart.com</p>
                    <p>📞 (888) 376-3314</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-900 mb-2">3. Installation Support</div>
                  <p className="text-sm text-gray-600 mb-3">We Handle Everything</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>✓ Application submission</p>
                    <p>✓ Documentation & photos</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Badge className="bg-green-600 text-white px-4 py-2">
                  Important: Apply BEFORE installation to ensure eligibility
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Financial Impact: Incentives + Savings
              </h2>
              <p className="text-xl text-gray-600">
                See how incentive stacking transforms your investment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Without Rebates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Aqua2use System:</span>
                      <span className="font-semibold">$599</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Professional Installation:</span>
                      <span className="font-semibold">$400</span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-3">
                      <span className="font-semibold">Total Investment:</span>
                      <span className="font-bold text-red-600">$999</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Annual Water Savings:</span>
                      <span>$600-$1,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payback Period:</span>
                      <span className="font-semibold">10-20 months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-xl">With Landscape Rebates</CardTitle>
                  <Badge className="bg-blue-600 text-white">Combined Savings</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Aqua2use System:</span>
                      <span className="font-semibold">$599</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Professional Installation:</span>
                      <span className="font-semibold">$400</span>
                    </div>
                    <div className="flex justify-between text-sm text-blue-600">
                      <span>Turf Removal Rebate:</span>
                      <span className="font-bold">Up to $4,500</span>
                    </div>
                    <div className="flex justify-between text-sm text-blue-600">
                      <span>Spray to Drip Rebate:</span>
                      <span className="font-bold">Per sq ft</span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-3">
                      <span className="font-semibold">Net Result:</span>
                      <span className="font-bold text-green-600">Profit + Savings</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Annual Water Savings:</span>
                      <span>$600-$1,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payback Period:</span>
                      <span className="font-bold text-green-600">Immediate</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-blue-800">
                      Landscape rebates can exceed greywater system cost!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Additional Financial Benefits</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <CheckCircle className="h-5 w-5 text-blue-600 mb-2" />
                  <p className="font-semibold">Property Value</p>
                  <p className="text-gray-600">+$15,000 average increase</p>
                </div>
                <div>
                  <CheckCircle className="h-5 w-5 text-blue-600 mb-2" />
                  <p className="font-semibold">Drought Penalties</p>
                  <p className="text-gray-600">Avoid $200-$1,000 fines</p>
                </div>
                <div>
                  <CheckCircle className="h-5 w-5 text-blue-600 mb-2" />
                  <p className="font-semibold">Insurance Discounts</p>
                  <p className="text-gray-600">Some carriers offer 5-10% off</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section (Secondary) */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Beyond Savings: Full Santa Monica Compliance
              </h2>
              <p className="text-xl text-gray-600">
                Aqua2use systems meet all regulations while maximizing your incentives
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <AlertCircle className="h-8 w-8 text-amber-600 mb-3" />
                  <CardTitle>Current Water Restrictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Santa Monica enforces water conservation per SMMC 7.16.020.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Odd addresses: Monday & Wednesday only</li>
                    <li>• Even addresses: Tuesday & Thursday only</li>
                    <li>• No spray irrigation 9 AM - 5 PM daily</li>
                    <li className="text-red-600">• Fines: $200-$1,000</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-green-700">
                      ✓ Greywater exempt from all restrictions
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-blue-600 mb-3" />
                  <CardTitle>Permit Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Laundry-to-landscape systems may not require permits.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✓ No permit for L2L systems (13 conditions)</li>
                    <li>✓ Must use washer pump only</li>
                    <li>✓ Subsurface irrigation required</li>
                    <li>✓ Flow control valve required</li>
                    <li>✓ Operation manual required</li>
                    <li>✓ System must not pool or runoff</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-blue-700 mb-2">
                      Residential Installation Requirements:
                    </p>
                    <ul className="space-y-1 text-xs text-blue-600">
                      <li>• 2ft setback from property lines</li>
                      <li>• 5ft from building foundations</li>
                      <li>• 100ft from water wells</li>
                      <li>• Cannot cross property lines</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-sky-50 border-l-4 border-sky-500 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Additional Santa Monica Requirements</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-semibold">Water Neutrality Ordinance (2017):</p>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Caps water use to 5-year historical average</li>
                    <li>• Applies to new developments and additions</li>
                    <li>• Greywater helps achieve neutrality</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Urban Runoff (SMMC 7.10):</p>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• First 0.75" of runoff must be captured</li>
                    <li>• Annual maintenance inspections required</li>
                    <li>• Rainwater can be used with greywater</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Permit Costs:</p>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Complex systems may require 3 permits</li>
                    <li>• Plumbing, health, and zoning reviews</li>
                    <li>• L2L systems avoid permit costs entirely</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How We Maximize Your Incentives
              </h2>
              <p className="text-xl text-gray-600">
                Our team handles all applications and ensures you get every dollar available
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Assessment</h3>
                <p className="text-sm text-gray-600">
                  We identify all available incentives for your property
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Pre-Approval</h3>
                <p className="text-sm text-gray-600">
                  Submit applications before installation to secure funding
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <p className="text-sm text-gray-600">
                  Professional installation meeting all program requirements
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-sky-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-gray-600">
                  We handle all paperwork and follow-up for payment
                </p>
              </div>
            </div>

            <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-center">What's Included in Our Service</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Incentive Management</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✓ Research all available programs</li>
                    <li>✓ Complete all applications</li>
                    <li>✓ Secure pre-approvals</li>
                    <li>✓ Submit final documentation</li>
                    <li>✓ Track payments</li>
                    <li>✓ Handle any issues</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Compliance & Permits</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✓ Determine permit requirements</li>
                    <li>✓ Prepare permit applications</li>
                    <li>✓ Expedited processing (5-7 days)</li>
                    <li>✓ Schedule inspections</li>
                    <li>✓ Ensure code compliance</li>
                    <li>✓ Final sign-offs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Santa Monica Residents Maximizing Incentives
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Ocean Park - 90405</span>
                  </div>
                  <CardTitle>Johnson Family - 3BR Home</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">Incentives Received:</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Local Rebates:</span>
                          <span className="font-semibold">Applied</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Regional Programs:</span>
                          <span className="font-semibold">Utilized</span>
                        </div>
                        <div className="flex justify-between">
                          <span>State Program:</span>
                          <span className="font-semibold">$500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax Credit:</span>
                          <span className="font-semibold">$850</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Total Stack:</span>
                          <span className="font-bold text-blue-600">$3,850</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><span className="font-semibold">System:</span> Aqua2use GWDD</p>
                      <p><span className="font-semibold">Monthly Savings:</span> $95</p>
                      <p><span className="font-semibold">Payback:</span> 2.8 years</p>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "The rebates covered almost half the cost. We didn't realize we could stack them until Water Wise Group showed us how."
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Sunset Park - 90404</span>
                  </div>
                  <CardTitle>Martinez Duplex Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">Incentives Received:</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Local Rebates:</span>
                          <span className="font-semibold">Applied</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Regional Programs:</span>
                          <span className="font-semibold">Utilized</span>
                        </div>
                        <div className="flex justify-between">
                          <span>State Programs (2):</span>
                          <span className="font-semibold">$750</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax Credit:</span>
                          <span className="font-semibold">$1,000</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Total Stack:</span>
                          <span className="font-bold text-blue-600">$4,250</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><span className="font-semibold">System:</span> Aqua2use Pro (2 units)</p>
                      <p><span className="font-semibold">Monthly Savings:</span> $180</p>
                      <p><span className="font-semibold">Payback:</span> 3.1 years</p>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "Got the maximum from every program. Water Wise Group knew exactly what we qualified for."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Incentive & Compliance Questions
              </h2>
            </div>

            <div className="space-y-8">
              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What rebates are available in Santa Monica?
                </h3>
                <p className="text-gray-600">
                  Santa Monica offers the Cash for Grass program (up to $4,500) and Spray to Drip conversion 
                  rebates for converting sprinklers to drip irrigation. MWD provides additional rebates through 
                  SoCal Water$mart for water-efficient devices ($40-$200). While there's no dedicated greywater 
                  system rebate, combining greywater installation with turf removal and sprinkler conversion 
                  maximizes both water savings and available rebates.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do I need to apply for incentives before installation?
                </h3>
                <p className="text-gray-600">
                  Yes, most rebate programs require pre-approval before installation begins. 
                  We handle the application process for you, ensuring all paperwork is submitted 
                  correctly and approved before we start installation. This helps maximize your 
                  chances of receiving available rebates.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do I need a permit for a greywater system in Santa Monica?
                </h3>
                <p className="text-gray-600">
                  Laundry-to-landscape systems can be installed without a permit if they meet 13 specific 
                  conditions under California code, including: using only the washer's pump, subsurface 
                  irrigation, proper flow control, and maintaining an operation manual. More complex 
                  greywater systems require permits through Santa Monica Building & Safety.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How does Santa Monica's Water Neutrality Ordinance affect me?
                </h3>
                <p className="text-gray-600">
                  Since 2017, Santa Monica's Water Neutrality Ordinance caps water use for developments 
                  to the historical five-year average for the site. New developments cannot exceed 
                  historical water use. Greywater systems help meet these requirements by reducing 
                  potable water demand while maintaining landscapes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What are Santa Monica's current water restrictions?
                </h3>
                <p className="text-gray-600">
                  Per SMMC 7.16.020, spray irrigation is prohibited between 9 AM and 5 PM. Outdoor 
                  watering is limited to 2 days per week based on address (odd addresses: Mon/Wed, 
                  even addresses: Tue/Thu). These restrictions don't apply to drip irrigation or 
                  greywater systems. Violations can result in fines from $200-$1,000.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residential System Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Residential Greywater System Options</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Laundry-to-Landscape (L2L)</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">Simplest residential system - no permit required if meeting conditions</p>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• System cost: $599 for Aqua2use unit</li>
                    <li>• Installation: $200-$500 additional</li>
                    <li>• Water savings: 15,000-40,000 gallons/year</li>
                    <li>• DIY-friendly with proper guidance</li>
                    <li>• Waters fruit trees and ornamental plants</li>
                  </ul>
                  <Badge className="bg-green-100 text-green-800 mt-3">Best for Single-Family Homes</Badge>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Whole-House System</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">Comprehensive system using shower, sink, and laundry water</p>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• Cost: $5,000-$15,000 typical installation</li>
                    <li>• Water savings: 30,000-60,000 gallons/year</li>
                    <li>• Requires permit and professional installation</li>
                    <li>• Can irrigate entire residential landscape</li>
                  </ul>
                  <Badge className="bg-blue-100 text-blue-800 mt-3">Maximum Water Savings</Badge>
                </div>
              </Card>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Ready to Start Your Residential Greywater Project?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">1. Calculate Your Household Savings</h4>
                  <p className="text-sm text-blue-700">Average home saves 15,000-40,000 gallons/year with greywater</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">2. Choose Your System Type</h4>
                  <p className="text-sm text-blue-700">Laundry-to-Landscape (simple) or Whole-House (complex)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">3. Apply for Residential Rebates</h4>
                  <p className="text-sm text-blue-700">Up to $8,000 available through combined programs</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">4. Find Qualified Installers</h4>
                  <p className="text-sm text-blue-700">Use licensed plumbers familiar with residential greywater</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-blue-200">
                <p className="text-sm text-blue-700">
                  <AlertCircle className="inline-block w-4 h-4 mr-1" />
                  Residential Property Owners: All rebates require pre-approval before installation. Apply early as funding is limited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Residential Resources & Support</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <FileText className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Residential Permit Guide</h3>
                <p className="text-sm text-gray-600 mb-3">L2L exemption checklist & complex system permits</p>
                <a href="https://www.santamonica.gov/permits" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Building & Safety Permits →
                </a>
              </Card>
              
              <Card className="p-6">
                <Calculator className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Residential ROI Calculator</h3>
                <p className="text-sm text-gray-600 mb-3">Calculate payback period with rebates</p>
                <a href="/calculator" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Estimate Your Savings →
                </a>
              </Card>
              
              <Card className="p-6">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Residential Installers</h3>
                <p className="text-sm text-gray-600 mb-3">Licensed plumbers for home greywater</p>
                <a href="/directory/CA/los-angeles/santa-monica" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Find Local Contractors →
                </a>
              </Card>
              
              <Card className="p-6">
                <HelpCircle className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Homeowner Support</h3>
                <p className="text-sm text-gray-600 mb-3">Questions about residential systems?</p>
                <a href="tel:310-458-8495" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Water Resources: (310) 458-8495 →
                </a>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Start Saving Water Today in Santa Monica
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Professional installation of permit-free laundry-to-landscape systems.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto mb-8">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div>
                <div className="text-3xl font-bold">No Permit</div>
                <div className="text-sm opacity-90">L2L Systems</div>
              </div>
              <div>
                <div className="text-3xl font-bold">40%</div>
                <div className="text-sm opacity-90">Water Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2 Days</div>
                <div className="text-sm opacity-90">Installation</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-90">Compliant</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold" asChild>
                <Link href="/contact">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Your Incentives
                </Link>
              </Button>
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg" asChild>
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  (310) 555-0123
                </Link>
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