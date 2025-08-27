"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Droplets, DollarSign, Leaf, TreePine } from "lucide-react"

export default function ResidentialSolutions() {
  return (
    <PageTemplate
      title="Residential Greywater Systems"
      subtitle="Transform your home's wastewater into a valuable resource for sustainable landscaping and garden irrigation."
      heroImage="/images/gwdd-gravity.jpg"
      heroImageAlt="Residential greywater system"
    >
      <div className="max-w-4xl mx-auto">
        {/* Home Challenges */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Homeowners Choose Greywater</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-700">Common Water Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Rising water bills every year</li>
                  <li>• Drought restrictions limiting irrigation</li>
                  <li>• Wasted water from daily activities</li>
                  <li>• Struggling landscapes during dry seasons</li>
                  <li>• Environmental concerns about water waste</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-700">Greywater Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Reduce water bills by 30-50%</li>
                  <li>• Drought-proof your landscape</li>
                  <li>• Reuse 50-80% of household water</li>
                  <li>• Healthier plants with nutrient-rich water</li>
                  <li>• Reduce environmental impact</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Perfect for Your Home</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Home}
              title="Single Family Homes"
              description="Complete systems for typical residential properties with yards and gardens"
            />
            <FeatureCard
              icon={TreePine}
              title="Garden Irrigation"
              description="Keep landscapes lush even during water restrictions"
            />
            <FeatureCard
              icon={DollarSign}
              title="Quick ROI"
              description="Most systems pay for themselves in 2-4 years through water savings"
            />
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Residential System Features</h2>
          <BenefitList
            benefits={[
              "Connects to washing machines, showers, and bathroom sinks",
              "Automatic filtration removes lint and debris",
              "Gravity-fed or pump-assisted options available",
              "DIY-friendly installation for handy homeowners",
              "Professional installation also available",
              "Low maintenance - clean filter every 3-4 months",
              "Works with existing irrigation systems",
              "Safe for all landscape plants when proper soaps are used"
            ]}
          />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Start Saving Water and Money Today
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of homeowners who are reducing their water bills while maintaining beautiful landscapes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">View Residential Systems</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}