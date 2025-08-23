import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Droplets, DollarSign, Leaf, MapPin } from "lucide-react"

export default function RVSolutions() {
  return (
    <PageTemplate
      title="Greywater Solutions for RVs"
      subtitle="Extend your boondocking adventures and reduce environmental impact with efficient greywater recycling systems designed specifically for RV living."
      heroImage="/images/cabin-greywater.jpg"
      heroImageAlt="RV greywater system installation"
    >
      <div className="max-w-4xl mx-auto">
        {/* RV Challenges */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">RV Water Challenges</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-700">Common Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Limited fresh water tank capacity</li>
                  <li>• Frequent dump station visits required</li>
                  <li>• Restricted camping in areas without hookups</li>
                  <li>• High water costs at some campgrounds</li>
                  <li>• Environmental impact concerns</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-700">Greywater Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Double your effective water capacity</li>
                  <li>• Extended boondocking capabilities</li>
                  <li>• Reduced dump station frequency</li>
                  <li>• Lower campground water fees</li>
                  <li>• Environmentally responsible camping</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits for RVers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why RVers Choose Greywater</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Extended Boondocking"
              description="Stay off-grid longer without worrying about water capacity"
              icon={<MapPin className="h-10 w-10 text-gray-600" />}
            />
            <FeatureCard
              title="Cost Savings"
              description="Reduce campground fees and dump station costs"
              icon={<DollarSign className="h-10 w-10 text-green-600" />}
            />
            <FeatureCard
              title="Environmental Impact"
              description="Leave no trace with responsible water management"
              icon={<Leaf className="h-10 w-10 text-green-600" />}
            />
            <FeatureCard
              title="Freedom & Flexibility"
              description="Camp anywhere with confident water management"
              icon={<Truck className="h-10 w-10 text-gray-600" />}
            />
          </div>
        </div>

        {/* System Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">RV Greywater System Options</h2>
          
          <div className="space-y-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-6 w-6 text-gray-600" />
                  Portable Filtration Systems
                </CardTitle>
                <CardDescription>Perfect for occasional RV trips and rentals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <BenefitList
                      benefits={[
                        "No permanent installation required",
                        "Easy to set up and take down",
                        "Works with any RV type",
                        "Affordable entry point"
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Weekend warriors</li>
                      <li>• Rental RVs</li>
                      <li>• Testing greywater benefits</li>
                      <li>• Temporary solutions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-6 w-6 text-gray-600" />
                  Integrated RV Systems
                </CardTitle>
                <CardDescription>Professional installation for full-time RVers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <BenefitList
                      benefits={[
                        "Permanent plumbing integration",
                        "Automatic operation",
                        "Maximum filtration efficiency",
                        "Professional installation available"
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Full-time RVers</li>
                      <li>• Frequent boondockers</li>
                      <li>• Long-term travelers</li>
                      <li>• Premium RV setups</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Installation Considerations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Installation Considerations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Space Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Minimal space needed for portable systems</li>
                  <li>• Integrated systems require bay access</li>
                  <li>• Consider storage when not in use</li>
                  <li>• Weight distribution important</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Plumbing Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• May require professional installation</li>
                  <li>• Valve systems for switching modes</li>
                  <li>• Freeze protection in cold climates</li>
                  <li>• Accessibility for maintenance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legal Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Check campground policies</li>
                  <li>• Understand state regulations</li>
                  <li>• National park restrictions</li>
                  <li>• Private vs public land rules</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">RVer Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <blockquote className="text-gray-700 italic mb-4">
                  "We've been able to extend our boondocking from 3 days to over a week with our greywater system. 
                  It's opened up so many more camping opportunities!"
                </blockquote>
                <footer className="text-sm text-gray-600">— Sarah & Mike, Full-time RVers</footer>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <blockquote className="text-gray-700 italic mb-4">
                  "The system paid for itself in the first season just from reduced dump station fees and 
                  being able to stay at less expensive campgrounds without hookups."
                </blockquote>
                <footer className="text-sm text-gray-600">— Tom, Weekend RVer</footer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Getting Started */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Expand Your RV Adventures?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Let us help you choose the perfect greywater solution for your RV lifestyle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Get RV Consultation</Link>
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