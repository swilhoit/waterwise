"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, Clock, Wrench, ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react"

export default function ReplacementFilters() {
  return (
    <PageTemplate
      title="Replacement Filters"
      subtitle="Keep your greywater system running at peak performance with genuine replacement filters designed for maximum efficiency and longevity."
      heroImage="/images/gwdd-gravity.jpg"
      heroImageAlt="Greywater system filters"
    >
      <div className="max-w-6xl mx-auto">
        {/* Filter Importance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Filter Replacement Matters</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="System Performance"
              description="Maintain optimal filtration efficiency and water quality"
              icon={Filter}
            />
            <FeatureCard
              title="Equipment Protection"
              description="Prevent clogs and damage to pumps and distribution systems"
              icon={ShieldCheck}
            />
            <FeatureCard
              title="Plant Health"
              description="Ensure clean, safe water for your landscape irrigation"
              icon={CheckCircle}
            />
            <FeatureCard
              title="System Longevity"
              description="Extend the life of your greywater system components"
              icon={Clock}
            />
          </div>
        </div>

        {/* Filter Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Filter Types & Applications</h2>
          
          <div className="space-y-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-6 w-6 text-gray-600" />
                  Pre-Filters (Coarse Filtration)
                </CardTitle>
                <CardDescription>First stage filtration for larger particles and debris</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">What They Remove:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Hair and lint</li>
                      <li>• Soap scum chunks</li>
                      <li>• Large debris</li>
                      <li>• Food particles</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Replacement Frequency:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Every 3-6 months</li>
                      <li>• When visibly clogged</li>
                      <li>• After heavy use periods</li>
                      <li>• As system performance drops</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Compatible Systems:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Aqua2use GWDD</li>
                      <li>• Aqua2use Pro</li>
                      <li>• Custom installations</li>
                      <li>• Laundry-to-landscape</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-6 w-6 text-green-600" />
                  Fine Filters (Secondary Filtration)
                </CardTitle>
                <CardDescription>Advanced filtration for smaller particles and improved water quality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">What They Remove:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Fine suspended solids</li>
                      <li>• Microfibers</li>
                      <li>• Detergent residue</li>
                      <li>• Small organic matter</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Replacement Frequency:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Every 6-12 months</li>
                      <li>• Based on water quality tests</li>
                      <li>• When flow rate decreases</li>
                      <li>• Seasonal replacement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Benefits:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Clearer water output</li>
                      <li>• Reduced clogging downstream</li>
                      <li>• Better plant health</li>
                      <li>• Extended system life</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-6 w-6 text-purple-600" />
                  Carbon Filters (Tertiary Treatment)
                </CardTitle>
                <CardDescription>Advanced treatment for odor control and chemical removal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">What They Remove:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Chlorine and chemicals</li>
                      <li>• Odors and tastes</li>
                      <li>• Some dissolved organics</li>
                      <li>• Colorants and dyes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Replacement Frequency:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Every 12-18 months</li>
                      <li>• When odors return</li>
                      <li>• Based on usage volume</li>
                      <li>• Annual maintenance schedule</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Applications:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Premium systems</li>
                      <li>• High-use installations</li>
                      <li>• Sensitive plant areas</li>
                      <li>• Odor control required</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Replacement Schedule */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Maintenance Schedule</h2>
          <div className="bg-blue-50 rounded-lg p-8">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="text-2xl font-bold text-gray-600">Monthly</div>
                  <CardTitle className="text-lg">Visual Inspection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check for visible clogs</li>
                    <li>• Monitor water flow</li>
                    <li>• Look for system leaks</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="text-2xl font-bold text-green-600">Quarterly</div>
                  <CardTitle className="text-lg">Pre-Filter Change</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Replace coarse filters</li>
                    <li>• Clean filter housings</li>
                    <li>• Check seals and gaskets</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="text-2xl font-bold text-orange-600">Semi-Annual</div>
                  <CardTitle className="text-lg">Fine Filter Change</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Replace fine filters</li>
                    <li>• Test water quality</li>
                    <li>• System performance check</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="text-2xl font-bold text-purple-600">Annual</div>
                  <CardTitle className="text-lg">Full Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Replace all filters</li>
                    <li>• Professional inspection</li>
                    <li>• System optimization</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Signs to Replace */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">When to Replace Filters</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  Warning Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-red-800">
                  <li>• Reduced water flow from outlets</li>
                  <li>• Visible buildup on filter surfaces</li>
                  <li>• Unpleasant odors from system</li>
                  <li>• Water backing up in system</li>
                  <li>• Pump running more frequently</li>
                  <li>• Plants showing stress or damage</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Optimal Performance Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-800">
                  <li>• Consistent water flow rates</li>
                  <li>• Clear, debris-free water output</li>
                  <li>• No unusual system odors</li>
                  <li>• Plants thriving and healthy</li>
                  <li>• Efficient pump operation</li>
                  <li>• Regular maintenance schedule followed</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Filter Replacement Instructions</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-gray-600" />
                Step-by-Step Replacement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">System Shutdown</h4>
                    <p className="text-gray-600">Turn off power and close inlet valves to stop water flow</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Drain System</h4>
                    <p className="text-gray-600">Allow remaining water to drain from filter housings</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Remove Old Filters</h4>
                    <p className="text-gray-600">Unscrew filter housings and remove old filter cartridges</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Clean Housings</h4>
                    <p className="text-gray-600">Clean filter housings and inspect seals and gaskets</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Install New Filters</h4>
                    <p className="text-gray-600">Insert new filters and reassemble housings with proper torque</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">System Restart</h4>
                    <p className="text-gray-600">Restore power and water flow, check for leaks and proper operation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Compatibility */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Filter Compatibility Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Aqua2use GWDD</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Pre-filter: 100 micron mesh</li>
                  <li>• Fine filter: 50 micron cartridge</li>
                  <li>• Optional: Carbon filter stage</li>
                  <li>• Standard 10" housings</li>
                </ul>
                <div className="mt-4">
                  <Button className="w-full" size="sm" asChild>
                    <Link href="/products/aqua2use-gwdd">View System</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Aqua2use Pro</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Multi-stage pre-filtration</li>
                  <li>• Dual fine filter cartridges</li>
                  <li>• Integrated carbon treatment</li>
                  <li>• Commercial grade housings</li>
                </ul>
                <div className="mt-4">
                  <Button className="w-full" size="sm" asChild>
                    <Link href="/products/aqua2use-pro">View System</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Custom Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Site-specific filter selection</li>
                  <li>• Various micron ratings available</li>
                  <li>• Custom housing configurations</li>
                  <li>• Professional consultation included</li>
                </ul>
                <div className="mt-4">
                  <Button className="w-full" size="sm" variant="secondary" asChild>
                    <Link href="/contact">Get Consultation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}