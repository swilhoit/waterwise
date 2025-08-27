import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mountain, Droplets, Sun, TreePine, Snowflake } from "lucide-react"

export default function CabinSolutions() {
  return (
    <PageTemplate
      title="Cabin & Remote Property Greywater Systems"
      subtitle="Reliable, low-maintenance water recycling for weekend getaways and off-grid properties."
      heroImage="/images/cabin-greywater.jpg"
      heroImageAlt="Cabin greywater system"
    >
      <div className="max-w-4xl mx-auto">
        {/* Cabin Challenges */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Remote Property Water Challenges</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-700">Common Cabin Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Limited or no municipal water access</li>
                  <li>• Well water conservation needs</li>
                  <li>• Seasonal freeze concerns</li>
                  <li>• Infrequent maintenance visits</li>
                  <li>• Remote septic system stress</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-700">Greywater Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Reduce well water usage by 50%</li>
                  <li>• Extend septic system life</li>
                  <li>• Winterization-ready designs</li>
                  <li>• Minimal maintenance required</li>
                  <li>• Automatic operation when away</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Built for Remote Properties</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Mountain}
              title="Rugged Design"
              description="Weather-resistant construction handles extreme conditions"
            />
            <FeatureCard
              icon={Snowflake}
              title="Freeze Protection"
              description="Easy winterization for seasonal properties"
            />
            <FeatureCard
              icon={Sun}
              title="Off-Grid Compatible"
              description="Works with solar power and generator systems"
            />
          </div>
        </div>

        {/* Ideal Applications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ideal For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekend Cabins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  Perfect for properties used seasonally or on weekends. System automatically manages water when you're away.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Self-operating between visits</li>
                  <li>• Easy seasonal shutdown</li>
                  <li>• Maintains landscape naturally</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Off-Grid Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  Complete water independence for properties without municipal connections.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Reduces well water demand</li>
                  <li>• Solar power compatible</li>
                  <li>• Sustainable water cycle</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Cabin System Benefits</h2>
          <BenefitList
            benefits={[
              "Gravity or pump systems for any terrain",
              "Processes shower, sink, and laundry water",
              "Protects septic systems from overload",
              "Creates firebreak vegetation zones",
              "Low maintenance - check quarterly",
              "Durable construction for 20+ year life",
              "Simple winterization process",
              "Maintains property value with green landscaping"
            ]}
          />
        </div>

        {/* Customer Story */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-8 mb-16">
          <p className="text-lg italic text-gray-700 mb-4">
            "Our mountain cabin with challenging terrain needed a solution. The pump system overcame elevation challenges perfectly. Now we save $75/month during growing season while supporting our native plant restoration project."
          </p>
          <p className="text-sm font-semibold text-gray-600">— Robert & Linda Miller, Oregon Cabin Owners</p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Make Your Cabin More Sustainable
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Protect your well, extend your septic life, and maintain beautiful landscaping automatically
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">Explore Cabin Systems</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Get Installation Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}