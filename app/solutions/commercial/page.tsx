"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Droplets, DollarSign, Leaf } from "lucide-react"

export default function CommercialSolutions() {
  return (
    <PageTemplate
      title="Commercial Greywater Systems"
      subtitle="Engineered water reuse for hotels, gyms, laundries, schools, offices, and campuses—reduce operating costs while meeting sustainability goals."
      heroImage="/images/solutions/commercial-ai.jpg"
      heroImageAlt="Commercial greywater system"
    >
      <div className="max-w-5xl mx-auto">
        {/* Challenges vs Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Commercial Properties Implement Greywater</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-700">Typical Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Rising water and sewer charges</li>
                  <li>• Drought restrictions limiting landscaping</li>
                  <li>• Corporate ESG and reporting requirements</li>
                  <li>• Limited downtime for installations</li>
                  <li>• Complex plumbing and mechanical rooms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-700">Key Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• 30–60% reduction in outdoor potable water use</li>
                  <li>• Lower operating expenses and predictable ROI</li>
                  <li>• Healthier landscapes and guest experience</li>
                  <li>• Supports LEED/Green Globes and local incentives</li>
                  <li>• Scalable designs for multi-building campuses</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Building}
              title="Hospitality & Resorts"
              description="Reuse showers and laundry greywater for landscaping and cooling make-up."
            />
            <FeatureCard
              icon={Droplets}
              title="Fitness & Gyms"
              description="Capture shower water to offset irrigation and water features."
            />
            <FeatureCard
              icon={DollarSign}
              title="Laundries & Campuses"
              description="High-volume reuse with fast payback across multiple buildings."
            />
          </div>
        </div>

        {/* System Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Commercial System Features</h2>
          <BenefitList
            benefits={[
              "Multi-stage filtration for lint, hair, and surfactants",
              "Automated flushing and maintenance routines",
              "Pump stations sized for peak demand and redundancy",
              "BMS/BAS integration and remote monitoring options",
              "Compatibility with existing irrigation zones and controllers",
              "Documentation support for permits and incentives",
            ]}
          />
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Start Reducing Operating Costs</h2>
          <p className="text-lg text-gray-700 mb-8">Request a preliminary design and savings model tailored to your facility.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Request Commercial Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">Explore Systems</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}


