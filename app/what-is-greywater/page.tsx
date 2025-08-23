import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Droplets, Home, Shield, Leaf } from "lucide-react"

export default function WhatIsGreywater() {
  return (
    <PageTemplate
      title="What is Greywater?"
      subtitle="Learn about greywater recycling, its benefits, and how it can transform your water usage while protecting the environment."
      heroImage="/images/water-reuse.jpg"
      heroImageAlt="Greywater recycling system diagram"
    >
      <div className="max-w-4xl mx-auto">
        {/* Definition Section */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Greywater</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Greywater is gently used water from your bathroom sinks, showers, tubs, and washing machines. 
            It's water that hasn't come into contact with toilet waste (which is called blackwater) or 
            heavily contaminated sources like kitchen sinks or diaper wash water.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            While greywater isn't suitable for drinking, it's perfectly safe for irrigating your landscape 
            when properly filtered and distributed. In fact, greywater contains nutrients like nitrogen and 
            phosphorus that can actually benefit your plants and soil.
          </p>
        </div>

        {/* Sources of Greywater */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sources of Greywater</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Bathroom Sinks"
              description="Hand washing and teeth brushing water"
              icon={<Droplets className="h-10 w-10 text-gray-600" />}
            />
            <FeatureCard
              title="Showers & Tubs"
              description="Bathing water from your daily routine"
              icon={<Home className="h-10 w-10 text-gray-600" />}
            />
            <FeatureCard
              title="Washing Machines"
              description="Rinse and wash cycle water (with eco-friendly detergents)"
              icon={<Shield className="h-10 w-10 text-gray-600" />}
            />
            <FeatureCard
              title="Utility Sinks"
              description="Laundry room and utility room sinks"
              icon={<Leaf className="h-10 w-10 text-gray-600" />}
            />
          </div>
        </div>

        {/* What's NOT Greywater */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-red-800 mb-4">What's NOT Greywater?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Blackwater (Never Use):</h4>
              <ul className="space-y-1 text-red-700">
                <li>• Toilet waste</li>
                <li>• Bidet water</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Dark Greywater (Avoid):</h4>
              <ul className="space-y-1 text-red-700">
                <li>• Kitchen sink water (food particles)</li>
                <li>• Dishwasher water</li>
                <li>• Diaper wash water</li>
                <li>• Water with harsh chemicals</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Benefits of Greywater Recycling</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Environmental Benefits</h3>
              <BenefitList
                benefits={[
                  "Reduces freshwater consumption by up to 50%",
                  "Decreases strain on septic systems and treatment plants",
                  "Reduces groundwater depletion",
                  "Minimizes wastewater discharge to the environment",
                  "Supports sustainable water management practices"
                ]}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Personal Benefits</h3>
              <BenefitList
                benefits={[
                  "Lower monthly water bills",
                  "Healthier, more lush landscapes",
                  "Increased property value",
                  "Water security during droughts",
                  "Reduced reliance on municipal water systems"
                ]}
              />
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Greywater Recycling Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Collection</h3>
              <p className="text-gray-600">
                Greywater is diverted from drains before it reaches the sewer or septic system
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Filtration</h3>
              <p className="text-gray-600">
                Multi-stage filtration removes particles, lint, and contaminants
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Distribution</h3>
              <p className="text-gray-600">
                Clean greywater irrigates your landscape through drip irrigation or subsurface systems
              </p>
            </div>
          </div>
        </div>

        {/* Safety Considerations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety & Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Do's</h3>
              <BenefitList
                benefits={[
                  "Use biodegradable, phosphate-free soaps and detergents",
                  "Install proper filtration systems",
                  "Use greywater immediately (don't store it)",
                  "Apply greywater to ornamental plants and trees",
                  "Follow local regulations and codes"
                ]}
              />
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">Don'ts</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span className="text-yellow-800">Don't use greywater on edible plants</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span className="text-yellow-800">Don't allow surface ponding</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span className="text-yellow-800">Don't use harsh chemicals or bleach</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span className="text-yellow-800">Don't store greywater for more than 24 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Learn More?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover how greywater recycling can work for your specific situation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/how-it-works">How It Works</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">View Systems</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}