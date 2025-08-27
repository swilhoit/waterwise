import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Droplets, Battery, Leaf, Minimize } from "lucide-react"

export default function TinyHomeSolutions() {
  return (
    <PageTemplate
      title="Tiny Home Greywater Systems"
      subtitle="Maximize sustainability in minimal space with compact greywater recycling solutions designed for tiny living."
      heroImage="/images/tiny-home-customer.jpg"
      heroImageAlt="Tiny home greywater system"
    >
      <div className="max-w-4xl mx-auto">
        {/* Tiny Home Challenges */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Water Management in Tiny Spaces</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-700">Tiny Home Water Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Limited water storage capacity</li>
                  <li>• Off-grid water management needs</li>
                  <li>• Space constraints for systems</li>
                  <li>• Need for sustainable solutions</li>
                  <li>• Compliance with local codes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-700">Compact Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Space-saving designs under 2 sq ft</li>
                  <li>• Complete water independence</li>
                  <li>• Perfect for off-grid living</li>
                  <li>• Sustainable closed-loop systems</li>
                  <li>• Code-compliant installations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Designed for Tiny Living</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Minimize}
              title="Ultra-Compact"
              description="Fits in the smallest spaces without sacrificing performance"
            />
            <FeatureCard
              icon={Battery}
              title="Off-Grid Ready"
              description="Works with solar power and limited water supplies"
            />
            <FeatureCard
              icon={Leaf}
              title="Sustainable Living"
              description="Complete the tiny home sustainability circle"
            />
          </div>
        </div>

        {/* Perfect For Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Permanent Tiny Homes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Fixed installations with dedicated garden spaces benefit from consistent greywater recycling for landscaping.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mobile Tiny Homes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Portable systems that move with your home, providing water recycling wherever you park.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tiny Home System Benefits</h2>
          <BenefitList
            benefits={[
              "Minimal footprint - fits under sinks or in utility closets",
              "Processes water from showers, sinks, and washing machines",
              "Simple DIY installation in most tiny homes",
              "Low power consumption for off-grid compatibility",
              "Extends time between water refills significantly",
              "Creates nutrient-rich water for gardens",
              "Reduces environmental impact of tiny living",
              "Complements composting toilets and solar systems"
            ]}
          />
        </div>

        {/* Customer Quote */}
        <div className="bg-green-50 border-l-4 border-green-600 p-8 mb-16">
          <p className="text-lg italic text-gray-700 mb-4">
            "Perfect for our tiny home! Compact, efficient, and helps us live sustainably off-grid. We love that we can shower and do laundry knowing that water is going directly to our vegetable garden."
          </p>
          <p className="text-sm font-semibold text-gray-600">— Emily Rodriguez, Tiny Home Owner</p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Complete Your Sustainable Tiny Home
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join the tiny home movement with water recycling that matches your sustainable lifestyle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products/aqua2use-gwdd">View Tiny Home Systems</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/customer-stories">Read Success Stories</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}