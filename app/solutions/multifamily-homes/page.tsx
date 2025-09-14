"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Droplets, DollarSign, Leaf } from "lucide-react"

export default function MultifamilySolutions() {
  return (
    <PageTemplate
      title="Multifamily Greywater Systems"
      subtitle="Efficient, code-aligned greywater reuse for apartments, condos, duplexes, and townhome communities."
      heroImage="/images/solutions/homes-ai.jpg"
      heroImageAlt="Multifamily greywater system"
    >
      <div className="max-w-4xl mx-auto">
        {/* Challenges vs Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Multifamily Properties Choose Greywater</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-700">Common Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• High irrigation and common-area water costs</li>
                  <li>• Drought restrictions and seasonal watering limits</li>
                  <li>• Space constraints for treatment equipment</li>
                  <li>• Retrofit complexity in existing buildings</li>
                  <li>• HOA and code compliance requirements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-700">Greywater Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• 30–60% reduction in outdoor potable water use</li>
                  <li>• Healthier landscapes using nutrient-rich water</li>
                  <li>• Centralized or distributed (per-stack/per-wing) designs</li>
                  <li>• Scalable capacity for phased deployments</li>
                  <li>• Attractive ROI with utility savings</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Approaches */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">System Approaches</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Building}
              title="Central Plant"
              description="Collect greywater from multiple risers and treat centrally for irrigation."
            />
            <FeatureCard
              icon={Droplets}
              title="Distributed Nodes"
              description="Smaller treatment units per wing/stack minimize piping changes."
            />
            <FeatureCard
              icon={DollarSign}
              title="Phased Rollout"
              description="Start with highest-yield areas and expand as savings accrue."
            />
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Multifamily System Features</h2>
          <BenefitList
            benefits={[
              "Filtration optimized for hair, lint, and soaps",
              "Automatic backwash/maintenance options",
              "Pump-assisted distribution to irrigation zones",
              "Integrates with existing controllers and drip/emitters",
              "Remote monitoring and alert options",
              "Supports LEED and local water conservation goals",
            ]}
          />
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Evaluate Your Building?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Get a preliminary design and savings estimate for your property in days, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Request Multifamily Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">View Compatible Systems</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}


