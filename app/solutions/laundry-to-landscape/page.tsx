import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shirt, Droplets, Wrench, CheckCircle, AlertTriangle } from "lucide-react"

export default function LaundryToLandscape() {
  return (
    <PageTemplate
      title="Laundry-to-Landscape Greywater Systems"
      subtitle="The simplest and most cost-effective way to start saving water. Direct your washing machine water to your landscape with minimal installation and maximum impact."
      heroImage="/images/family-garden.jpg"
      heroImageAlt="Laundry to landscape system irrigating garden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Why Laundry-to-Landscape */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Laundry-to-Landscape?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Easiest Installation"
              description="Simple 3-way valve system - no complex plumbing required"
              icon={<Wrench className="h-10 w-10 text-blue-600" />}
            />
            <FeatureCard
              title="Most Water Savings"
              description="Washing machines use 15-40 gallons per load - the biggest single source"
              icon={<Droplets className="h-10 w-10 text-blue-600" />}
            />
            <FeatureCard
              title="Legal Everywhere"
              description="Permitted in most states without complex permits"
              icon={<CheckCircle className="h-10 w-10 text-green-600" />}
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="bg-blue-50 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Three-Way Valve</h3>
                <p className="text-gray-600">
                  Install a simple valve system that diverts water from the washing machine drain
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Distribution</h3>
                <p className="text-gray-600">
                  Water flows through pipes to different zones in your landscape
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Irrigation</h3>
                <p className="text-gray-600">
                  Plants receive nutrient-rich greywater automatically with each wash cycle
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Components */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">System Components</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Core Components</CardTitle>
              </CardHeader>
              <CardContent>
                <BenefitList
                  benefits={[
                    "Three-way valve (laundry-to-sewer or landscape)",
                    "Distribution manifold for multiple zones",
                    "Flexible tubing for water distribution",
                    "Mulch basins for water infiltration",
                    "Basic filtration (lint trap optional)"
                  ]}
                />
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Optional Upgrades</CardTitle>
              </CardHeader>
              <CardContent>
                <BenefitList
                  benefits={[
                    "Automated timer valves for different zones",
                    "Surge tanks for better water distribution",
                    "Advanced filtration systems",
                    "Flow meters to monitor usage",
                    "Backflow prevention devices"
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">System Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Water & Cost Savings</h3>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Save 15-40 gallons per load of laundry</li>
                    <li>• Reduce water bills by 20-30%</li>
                    <li>• Lower sewage fees in many areas</li>
                    <li>• Typical payback period: 1-2 years</li>
                    <li>• Average savings: $200-500 annually</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Environmental Impact</h3>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Reduce municipal water demand</li>
                    <li>• Decrease wastewater treatment loads</li>
                    <li>• Provide nutrients for healthier plants</li>
                    <li>• Support drought-resistant landscaping</li>
                    <li>• Reduce reliance on chemical fertilizers</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Installation Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Installation Process</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Planning & Permits</h4>
                <p className="text-gray-600">Check local regulations and plan your irrigation zones</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Valve Installation</h4>
                <p className="text-gray-600">Install three-way valve at washing machine drain connection</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Distribution System</h4>
                <p className="text-gray-600">Run tubing to irrigation zones and install outlet valves</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Mulch Basins</h4>
                <p className="text-gray-600">Create mulch basins around plants for water infiltration</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">5</span>
              </div>
              <div>
                <h4 className="font-semibold">Testing & Optimization</h4>
                <p className="text-gray-600">Test system operation and adjust flow to different zones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Considerations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Important Considerations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  Detergent Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-yellow-800">
                  <li>• Use biodegradable, plant-safe detergents</li>
                  <li>• Avoid detergents with boron or bleach</li>
                  <li>• Low-sodium detergents preferred</li>
                  <li>• Liquid detergents often better than powder</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Plant Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-800">
                  <li>• Choose salt-tolerant plants</li>
                  <li>• Avoid edible plants (ornamentals only)</li>
                  <li>• Consider mature plant water needs</li>
                  <li>• Native plants often work best</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* DIY vs Professional */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">DIY or Professional Installation?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">DIY Installation</CardTitle>
                <CardDescription className="text-center">Perfect for handy homeowners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-green-600">$150-$400</span>
                  <p className="text-sm text-gray-600">Total system cost</p>
                </div>
                <BenefitList
                  benefits={[
                    "Lowest cost option",
                    "Learn how your system works",
                    "Customize to your exact needs",
                    "Satisfaction of DIY completion"
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Professional Installation</CardTitle>
                <CardDescription className="text-center">Hassle-free and guaranteed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-blue-600">$800-$1,500</span>
                  <p className="text-sm text-gray-600">Including installation</p>
                </div>
                <BenefitList
                  benefits={[
                    "Professional design and installation",
                    "Permits handled for you",
                    "Warranty on workmanship",
                    "Ongoing support and maintenance"
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}