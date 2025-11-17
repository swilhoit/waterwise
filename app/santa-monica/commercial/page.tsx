import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Building2, DollarSign, Shield, AlertCircle, FileText, Phone, MapPin, TrendingDown } from "lucide-react"

export default function SantaMonicaCommercial() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-600 text-white">Santa Monica Commercial Compliance</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Commercial Aqua2use Systems for 
              <span className="text-blue-600"> Santa Monica Businesses</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Meet Santa Monica's Water Neutrality Ordinance with NSF-certified Aqua2use systems. 
              Achieve mandatory 20% reduction targets and qualify for expedited permitting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/contact">
                  Schedule Compliance Assessment
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#ordinance">View Ordinance</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Water Neutrality Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>NSF/ANSI 350 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>5-Day Permits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Alert */}
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white border-l-4 border-red-500 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Santa Monica Water Neutrality Ordinance - Mandatory Compliance</h3>
                <p className="text-gray-700 mb-2">
                  Commercial developments over 15,000 sq ft must offset 100% of water use. Aqua2use greywater systems provide 40-60% of required offsets.
                </p>
                <p className="text-sm text-gray-600">
                  Non-compliance results in permit denial and fines up to $1,000/day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Mandates */}
      <section id="ordinance" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Santa Monica Commercial Water Mandates
              </h2>
              <p className="text-xl text-gray-600">
                Mandatory requirements affecting all commercial properties
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-red-200">
                <CardHeader>
                  <Shield className="h-10 w-10 text-red-600 mb-4" />
                  <CardTitle>Water Neutrality Ordinance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    SMMC 7.10.050 - Mandatory for developments &gt;15,000 sq ft
                  </p>
                  <div className="space-y-2 text-sm">
                    <ul className="space-y-1 text-gray-600">
                      <li>• 100% water use offset required</li>
                      <li>• Greywater provides 40-60% offset</li>
                      <li>• Aqua2use qualifies for maximum credits</li>
                      <li>• Documentation required before permits</li>
                      <li>• Annual compliance reporting</li>
                    </ul>
                    <p className="mt-3 font-semibold text-green-700">
                      Aqua2use systems pre-approved for compliance
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <TrendingDown className="h-10 w-10 text-orange-600 mb-4" />
                  <CardTitle>20% Mandatory Reduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    All commercial properties must reduce water use 20% from baseline
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">Penalties for Non-Compliance:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 1st violation: $250 fine</li>
                      <li>• 2nd violation: $500 fine</li>
                      <li>• 3rd+ violations: $1,000/day</li>
                      <li>• Flow restrictors installed</li>
                      <li>• Public listing of violators</li>
                    </ul>
                    <p className="mt-3 font-semibold text-green-700">
                      Aqua2use achieves 35-50% reduction
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Commercial Greywater Requirements (SMMC 7.10.090)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">System Requirements:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ NSF/ANSI 350 certification (Aqua2use has)</li>
                    <li>✓ Surge tanks required (Aqua2use includes)</li>
                    <li>✓ Overflow protection (Aqua2use includes)</li>
                    <li>✓ Backflow prevention (Aqua2use includes)</li>
                    <li>✓ Automated controls (Aqua2use includes)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Installation Requirements:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Licensed plumber required</li>
                    <li>• Health Department approval</li>
                    <li>• Cross-connection control plan</li>
                    <li>• Annual inspections</li>
                    <li>• Maintenance logs required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aqua2use Commercial Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Aqua2use Commercial Systems for Santa Monica
              </h2>
              <p className="text-xl text-gray-600">
                Pre-approved systems sized for commercial applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">Aqua2use Pro Series</h3>
                    <Badge className="bg-green-600 text-white">Hotels & Offices</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    High-capacity system for properties processing 500-2,000 gallons/day
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Processes shower, sink, and laundry water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">40-50% water bill reduction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Meets Water Neutrality requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Remote monitoring included</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold">Typical Savings:</p>
                    <p className="text-2xl font-bold text-blue-600">$2,500-4,000/month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">Aqua2use Modular</h3>
                    <Badge className="bg-blue-600 text-white">Multi-Family</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Scalable system for apartments and condos (20-100 units)
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Central laundry water recycling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Common area irrigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">35% reduction in water costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Increases property value 3-5%</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm font-semibold">Typical Savings:</p>
                    <p className="text-2xl font-bold text-green-600">$1,500-2,500/month</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Incentives */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Commercial Greywater Incentives
              </h2>
              <p className="text-xl text-gray-600">
                Financial programs specifically for Aqua2use commercial installations
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">California Commercial Greywater Rebate</CardTitle>
                      <Badge className="mt-2 bg-green-600 text-white">State Program</Badge>
                    </div>
                    <span className="text-2xl font-bold text-green-600">$1/gallon</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Rebate based on system capacity. Aqua2use Pro (500 gal/day) = $500/day capacity = up to $10,000 rebate
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Requirements:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• NSF/ANSI 350 certification ✓</li>
                        <li>• Minimum 500 gal/day capacity ✓</li>
                        <li>• Professional installation ✓</li>
                        <li>• Monitoring system required ✓</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Aqua2use Advantages:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Pre-qualified for rebate</li>
                        <li>• Documentation provided</li>
                        <li>• We handle application</li>
                        <li>• 90-day payment guarantee</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Santa Monica Expedited Permitting</CardTitle>
                      <Badge className="mt-2 bg-blue-600 text-white">Local Benefit</Badge>
                    </div>
                    <span className="text-xl font-bold text-blue-600">5-7 Days</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Aqua2use installations qualify for expedited plan check (vs 4-6 weeks standard)
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Priority processing for water conservation</li>
                    <li>• Dedicated plan check team</li>
                    <li>• Online submission available</li>
                    <li>• Same-day inspection scheduling</li>
                    <li>• Saves $5,000-10,000 in carrying costs</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Federal Tax Benefits</CardTitle>
                      <Badge className="mt-2 bg-purple-600 text-white">Section 179D</Badge>
                    </div>
                    <span className="text-xl font-bold text-purple-600">$1.80/sq ft</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Tax deduction for water efficiency improvements with Aqua2use systems
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Accelerated depreciation available</li>
                    <li>• Combines with state rebates</li>
                    <li>• No cap on deduction amount</li>
                    <li>• Aqua2use qualifies automatically</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Commercial Spray-to-Drip Conversion</CardTitle>
                      <Badge className="mt-2 bg-orange-600 text-white">Required for Greywater</Badge>
                    </div>
                    <span className="text-xl font-bold text-orange-600">$2/sq ft</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Commercial properties must convert to drip irrigation for greywater compliance
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Mandatory for subsurface greywater distribution</li>
                    <li>• Up to $25,000 for commercial landscapes</li>
                    <li>• 50% more efficient than spray irrigation</li>
                    <li>• Installation coordinated with Aqua2use system</li>
                    <li>• Single contractor for both conversions</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">Total Financial Benefits:</p>
                  <p className="text-4xl font-bold text-green-600">50-70% Cost Offset</p>
                  <p className="text-sm text-gray-600 mt-2">Including spray-to-drip conversion rebates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Permit Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Santa Monica Commercial Permit Process
              </h2>
              <p className="text-xl text-gray-600">
                Streamlined process for Aqua2use installations
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Water Neutrality Calc</h3>
                <p className="text-sm text-gray-600">
                  We calculate offsets (1-2 days)
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Expedited Permit</h3>
                <p className="text-sm text-gray-600">
                  5-7 day plan check
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <p className="text-sm text-gray-600">
                  2-5 days, minimal disruption
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">Inspection & Rebates</h3>
                <p className="text-sm text-gray-600">
                  Same-day inspection, rebate filing
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Required Documentation for Aqua2use Commercial Permits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">We Provide:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Water neutrality calculations</li>
                      <li>✓ System engineering drawings</li>
                      <li>✓ NSF certification documents</li>
                      <li>✓ Cross-connection control plan</li>
                      <li>✓ Maintenance specifications</li>
                      <li>✓ Rebate application support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">You Provide:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Property water bills (12 months)</li>
                      <li>• Building plans</li>
                      <li>• Occupancy data</li>
                      <li>• Landscape irrigation plans</li>
                      <li>• Property owner authorization</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Santa Monica Aqua2use Commercial Installations
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Ocean Avenue</span>
                    </div>
                    <Badge className="bg-green-600 text-white">Hotel</Badge>
                  </div>
                  <CardTitle>Boutique Hotel (75 rooms)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>System:</span>
                      <span className="font-semibold">Aqua2use Pro 1000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Capacity:</span>
                      <span className="font-semibold">1,000 gal/day</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Water Reduction:</span>
                      <span className="font-semibold text-green-600">45%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Savings:</span>
                      <span className="font-semibold text-green-600">$3,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rebate Received:</span>
                      <span className="font-semibold text-green-600">$10,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Permit Time:</span>
                      <span className="font-semibold">6 days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ROI Period:</span>
                      <span className="font-semibold">19 months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Colorado Center</span>
                    </div>
                    <Badge className="bg-blue-600 text-white">Office</Badge>
                  </div>
                  <CardTitle>Corporate Office (80,000 sq ft)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>System:</span>
                      <span className="font-semibold">Aqua2use Pro 500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Application:</span>
                      <span className="font-semibold">Restroom to landscape</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Water Neutrality:</span>
                      <span className="font-semibold text-green-600">55% offset</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Savings:</span>
                      <span className="font-semibold text-green-600">$2,100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax Deduction:</span>
                      <span className="font-semibold text-green-600">$144,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Compliance Status:</span>
                      <span className="font-semibold">Exceeds mandate</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>LEED Points:</span>
                      <span className="font-semibold">8 points earned</span>
                    </div>
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
                Commercial Aqua2use Questions
              </h2>
            </div>

            <div className="space-y-8">
              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How does Aqua2use meet Water Neutrality requirements?
                </h3>
                <p className="text-gray-600">
                  Aqua2use systems provide 40-60% of required water offsets through greywater recycling. The NSF/ANSI 350 certification ensures maximum credit allocation. We provide complete calculations showing how your specific Aqua2use system meets Santa Monica's ordinance requirements.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What is the commercial permit timeline?
                </h3>
                <p className="text-gray-600">
                  Aqua2use installations qualify for expedited 5-7 day plan check (vs 4-6 weeks standard). Total timeline: Water neutrality calculations (1-2 days) + Permit approval (5-7 days) + Installation (2-5 days) = operational in 2-3 weeks.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What rebates apply to commercial Aqua2use systems?
                </h3>
                <p className="text-gray-600">
                  California offers $1/gallon capacity rebates (up to $10,000 for Aqua2use Pro systems). Federal Section 179D provides $1.80/sq ft tax deductions. Combined with expedited permitting savings, total incentives cover 40-60% of system cost.
                </p>
              </div>

              <div className="pb-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How much maintenance do Aqua2use commercial systems require?
                </h3>
                <p className="text-gray-600">
                  Quarterly filter changes and annual inspections. Our commercial maintenance contracts include all service, parts, compliance reporting, and remote monitoring. The automated system alerts us to any issues before they affect operation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-slate-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Achieve Santa Monica Compliance with Aqua2use
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Pre-approved systems. Water neutrality compliance. Maximum rebates.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto mb-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold">$10K</div>
                <div className="text-sm opacity-90">State Rebate</div>
              </div>
              <div>
                <div className="text-3xl font-bold">5 Days</div>
                <div className="text-sm opacity-90">Permit Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold">45%</div>
                <div className="text-sm opacity-90">Water Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold">18 mo</div>
                <div className="text-sm opacity-90">ROI Period</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-100 px-8 py-6 text-lg font-semibold" asChild>
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  (310) 555-0123
                </Link>
              </Button>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg" asChild>
                <Link href="/contact">Schedule Assessment</Link>
              </Button>
            </div>
          </div>
          
          <p className="text-sm opacity-75">
            Serving all Santa Monica commercial districts
          </p>
        </div>
      </section>
    </div>
  )
}