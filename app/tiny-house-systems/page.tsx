import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Droplets, DollarSign, Zap, Wrench, Leaf } from "lucide-react"

export default function TinyHouseSystems() {
  return (
    <PageTemplate
      title="Greywater Systems for Tiny Houses"
      subtitle="Maximize water efficiency and minimize environmental impact in your tiny home with compact, efficient greywater recycling solutions designed for small-space living."
      heroImage="/images/cabin-greywater.jpg"
      heroImageAlt="Tiny house with greywater system"
    >
      <div className="max-w-4xl mx-auto">
        {/* Why Tiny Houses Need Greywater */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Tiny Houses Need Greywater Systems</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Limited Water Storage"
              description="Maximize your 20-40 gallon fresh water capacity"
              icon={<Droplets className="h-10 w-10 text-blue-600" />}
            />
            <FeatureCard
              title="Off-Grid Living"
              description="Essential for remote locations without utilities"
              icon={<Home className="h-10 w-10 text-green-600" />}
            />
            <FeatureCard
              title="Cost Efficiency"
              description="Reduce utility costs and extend tank life"
              icon={<DollarSign className="h-10 w-10 text-green-600" />}
            />
            <FeatureCard
              title="Sustainability Goals"
              description="Align with eco-friendly tiny house values"
              icon={<Leaf className="h-10 w-10 text-green-600" />}
            />
          </div>
        </div>

        {/* Unique Challenges */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tiny House Water Challenges</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-orange-700">Space Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Limited space for plumbing systems</li>
                  <li>• Every square foot counts</li>
                  <li>• Need for compact, efficient solutions</li>
                  <li>• Integration with existing tiny house systems</li>
                  <li>• Access for maintenance in tight spaces</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-blue-700">Off-Grid Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• No connection to municipal systems</li>
                  <li>• Limited power availability (12V/solar)</li>
                  <li>• Need for reliable, low-maintenance systems</li>
                  <li>• Seasonal/climate considerations</li>
                  <li>• Regulatory compliance while mobile</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tiny House Greywater Solutions</h2>
          
          <div className="space-y-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-6 w-6 text-blue-600" />
                  Compact Integrated Systems
                </CardTitle>
                <CardDescription>All-in-one solutions designed for tiny houses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <BenefitList
                      benefits={[
                        "Fits in standard tiny house bay",
                        "12V DC operation for solar compatibility",
                        "Integrated filtration and pumping",
                        "Compact 20-50 gallon daily capacity"
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• New tiny house builds</li>
                      <li>• Off-grid locations</li>
                      <li>• Stationary tiny houses</li>
                      <li>• Maximum convenience</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-green-600" />
                  Simple Gravity Systems
                </CardTitle>
                <CardDescription>Low-tech, reliable solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <BenefitList
                      benefits={[
                        "No electricity required",
                        "Minimal maintenance needs",
                        "DIY-friendly installation",
                        "Very low cost"
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Budget-conscious builders</li>
                      <li>• DIY enthusiasts</li>
                      <li>• Temporary installations</li>
                      <li>• Backup systems</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-purple-600" />
                  Modular Systems
                </CardTitle>
                <CardDescription>Flexible, expandable solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <BenefitList
                      benefits={[
                        "Separate components for flexibility",
                        "Upgrade capability over time",
                        "Easier access for maintenance",
                        "Customizable configuration"
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Phased tiny house builds</li>
                      <li>• Custom layouts</li>
                      <li>• Future expansion plans</li>
                      <li>• Unique space constraints</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Installation Considerations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Installation Planning</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Space Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Plan system location during design phase</li>
                  <li>• Consider weight distribution</li>
                  <li>• Ensure access for maintenance</li>
                  <li>• Plan for freeze protection</li>
                  <li>• Integration with other utilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Power Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• 12V DC systems for solar compatibility</li>
                  <li>• Low power consumption (20-50W)</li>
                  <li>• Battery backup considerations</li>
                  <li>• Automatic vs manual operation</li>
                  <li>• Energy-efficient pump selection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mobility Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Secure mounting for road travel</li>
                  <li>• Quick disconnect systems</li>
                  <li>• Winterization procedures</li>
                  <li>• State regulation compliance</li>
                  <li>• Campground compatibility</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Water Budget Example */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tiny House Water Budget</h2>
          <div className="bg-blue-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Without Greywater</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Fresh Water Tank:</span>
                      <span className="font-semibold">30 gallons</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Usage:</span>
                      <span className="font-semibold">25 gallons</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Days Between Refills:</span>
                      <span className="font-bold text-red-600">1.2 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">With Greywater</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Fresh Water Tank:</span>
                      <span className="font-semibold">30 gallons</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Effective Capacity:</span>
                      <span className="font-semibold">45+ gallons</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Days Between Refills:</span>
                      <span className="font-bold text-green-600">3-4 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tiny House Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <blockquote className="text-gray-700 italic mb-4">
                  "Our greywater system has been a game-changer for off-grid living. We can stay in remote locations 
                  for weeks without worrying about water. The system takes up less space than a small closet."
                </blockquote>
                <footer className="text-sm text-gray-600">— Maria & Josh, Full-time Tiny House Dwellers</footer>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <blockquote className="text-gray-700 italic mb-4">
                  "Installation was easier than expected, and the daily maintenance is minimal. Our plants love the 
                  nutrient-rich greywater, and we've cut our water costs by 60%."
                </blockquote>
                <footer className="text-sm text-gray-600">— Alex, Tiny House Builder</footer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cost Comparison */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Investment Comparison</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>DIY Gravity System</CardTitle>
                <div className="text-3xl font-bold text-green-600">$200-$500</div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Basic filtration</li>
                  <li>• Manual operation</li>
                  <li>• DIY installation</li>
                  <li>• 6-12 month payback</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle>Compact System</CardTitle>
                <div className="text-3xl font-bold text-blue-600">$800-$1,500</div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Multi-stage filtration</li>
                  <li>• 12V automated pumps</li>
                  <li>• Professional installation</li>
                  <li>• 12-18 month payback</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Premium Integrated</CardTitle>
                <div className="text-3xl font-bold text-purple-600">$2,000-$3,500</div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Advanced treatment</li>
                  <li>• Smart monitoring</li>
                  <li>• Full integration</li>
                  <li>• 18-24 month payback</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}