import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Droplets, DollarSign, Shield, AlertCircle, FileText, Phone, MapPin, TrendingUp, Calculator, Layers, Building2, Users, HelpCircle } from "lucide-react"

export default function SantaClaraValleyResidential() {
  return (
    <div>
      {/* Hero Section - Incentives First */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-600 text-white">Santa Clara Valley Water</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Up to $400 for <span className="text-blue-600">Greywater Systems</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Valley Water offers the Bay Area's best greywater rebates - $200 standard or $400 for 
              qualifying residents. Save water, money, and help protect Silicon Valley's water supply.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="#rebate-tiers">
                  <Calculator className="mr-2 h-5 w-5" />
                  Check Your Rebate Amount
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#apply">Apply Online</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span>$200-$400 Rebates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>No Permit Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Valley Water Approved</span>
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
              <h2 className="text-2xl font-bold mb-4">Valley Water Greywater Economics</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">System Cost</div>
                  <div className="text-2xl font-bold">$599</div>
                  <div className="text-xs opacity-75">Aqua2use L2L</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Standard Rebate</div>
                  <div className="text-2xl font-bold">$200</div>
                  <div className="text-xs opacity-75">All Residents</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Enhanced Rebate</div>
                  <div className="text-2xl font-bold">$400</div>
                  <div className="text-xs opacity-75">Qualifying Areas</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
                  <div className="text-sm mb-1">Your Cost</div>
                  <div className="text-3xl font-bold">$199-$399</div>
                  <div className="text-xs opacity-90">After Rebate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rebate Tiers Section */}
      <section id="rebate-tiers" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Two Rebate Tiers Available
              </h2>
              <p className="text-xl text-gray-600">
                Valley Water offers enhanced rebates for qualifying communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-blue-500">
                <CardHeader className="bg-blue-50">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">Standard Rebate</CardTitle>
                    <span className="text-3xl font-bold text-blue-600">$200</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">
                    Available to all Valley Water residential customers for qualifying 
                    laundry-to-landscape greywater systems.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>All residential customers eligible</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Covers 1/3 of system cost</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Simple application process</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-500">
                <CardHeader className="bg-green-50">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">Enhanced Rebate</CardTitle>
                    <span className="text-3xl font-bold text-green-600">$400</span>
                  </div>
                  <Badge className="mt-2 bg-green-600 text-white">DOUBLE SAVINGS</Badge>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">
                    Enhanced rebate for residents in qualifying disadvantaged communities 
                    or low-income households.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Covers 2/3 of system cost</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Income qualification available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Same simple application</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Eligibility Check */}
            <Card className="bg-blue-50 border-2 border-blue-200">
              <CardHeader>
                <CardTitle>Check Your Eligibility for $400 Enhanced Rebate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  You may qualify for the $400 enhanced rebate if you meet one of these criteria:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Geographic Qualification</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Live in a designated disadvantaged community</li>
                      <li>• Reside in specific ZIP codes (check with Valley Water)</li>
                      <li>• Located in priority conservation areas</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Income Qualification</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Household income below area median</li>
                      <li>• Participation in assistance programs</li>
                      <li>• Senior citizen or disability status</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <p className="text-sm font-semibold text-blue-800">
                    📞 Call (408) 630-2554 to verify your enhanced rebate eligibility
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Stack These Valley Water Rebates
              </h2>
              <p className="text-xl text-gray-600">
                Combine greywater with other conservation programs for maximum savings
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Standard Rebate</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Enhanced Rebate</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-green-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">Greywater L2L System</div>
                        <div className="text-sm text-gray-500">Laundry-to-Landscape</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-blue-600 text-white">$200</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-600 text-white">$400</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">Direct greywater rebate</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">Landscape Conversion</div>
                        <div className="text-sm text-gray-500">Replace lawn with native plants</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-blue-600 text-white">$1/sq ft</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-600 text-white">$2/sq ft</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">Up to $3,000 max</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">Rain Barrels</div>
                        <div className="text-sm text-gray-500">Rainwater harvesting</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-blue-600 text-white">$50</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-600 text-white">$100</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">Per barrel, up to 4</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">High-Efficiency Toilets</div>
                        <div className="text-sm text-gray-500">1.28 gpf or less</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-gray-600 text-white">$100</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-gray-600 text-white">$200</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">Per toilet replaced</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-blue-50 px-6 py-4 border-t border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Maximum Combined Rebates:</span> Standard customers up to $3,500 | 
                  Enhanced customers up to $7,000 total
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section id="apply" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Simple Online Application Process
              </h2>
              <p className="text-xl text-gray-600">
                Get your rebate in 4 easy steps
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Apply Online</h3>
                <p className="text-sm text-gray-600">
                  Submit at valleywater.org/GraywaterApp
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Get Approved</h3>
                <p className="text-sm text-gray-600">
                  Receive approval within 2-3 weeks
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Install System</h3>
                <p className="text-sm text-gray-600">
                  DIY or hire a professional
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">Submit Photos</h3>
                <p className="text-sm text-gray-600">
                  Upload photos, receive rebate check
                </p>
              </div>
            </div>

            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl">What You'll Need to Apply</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Required Information:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Valley Water account number</li>
                      <li>✓ Property address and details</li>
                      <li>✓ System specifications (Aqua2use model)</li>
                      <li>✓ Estimated installation date</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">After Installation:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Photos of installed system</li>
                      <li>✓ Receipt for system purchase</li>
                      <li>✓ Installation invoice (if professional)</li>
                      <li>✓ Completed rebate form</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Valley Water Conservation Team
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span>(408) 630-2554</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span>conservation@valleywater.org</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>5750 Almaden Expressway, San Jose, CA 95118</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Valley Water serves these Santa Clara County communities:
                  </p>
                  <div className="text-sm text-gray-600 grid grid-cols-2 gap-1">
                    <span>• San Jose</span>
                    <span>• Santa Clara</span>
                    <span>• Sunnyvale</span>
                    <span>• Mountain View</span>
                    <span>• Cupertino</span>
                    <span>• Campbell</span>
                    <span>• Los Gatos</span>
                    <span>• Saratoga</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Save Up to $400 on Your Greywater System Today
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Valley Water's rebates make greywater systems affordable for everyone
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto mb-8">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div>
                <div className="text-3xl font-bold">$200-400</div>
                <div className="text-sm opacity-90">Direct Rebate</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$199</div>
                <div className="text-sm opacity-90">Min. Cost</div>
              </div>
              <div>
                <div className="text-3xl font-bold">40%</div>
                <div className="text-sm opacity-90">Water Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold">3-6mo</div>
                <div className="text-sm opacity-90">Payback</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold" asChild>
                <a href="https://www.valleywater.org/GraywaterApp" target="_blank" rel="noopener noreferrer">
                  Apply for Rebate Now
                </a>
              </Button>
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg" asChild>
                <Link href="tel:408-630-2554">
                  <Phone className="mr-2 h-5 w-5" />
                  (408) 630-2554
                </Link>
              </Button>
            </div>
          </div>
          
          <p className="text-sm opacity-75">
            Serving all Santa Clara County communities
          </p>
        </div>
      </section>
    </div>
  )
}