import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Settings, Shield, AlertTriangle, CheckCircle, Wrench } from "lucide-react"

export default function ReplacementPumps() {
  return (
    <PageTemplate
      title="Replacement Pumps"
      subtitle="Ensure reliable water distribution with high-quality replacement pumps designed for greywater applications. From residential to commercial systems."
      heroImage="/images/gwdd-ug.jpg"
      heroImageAlt="Greywater system pumps"
    >
      <div className="max-w-6xl mx-auto">
        {/* Pump Importance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Quality Pumps Matter</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Reliable Distribution"
              description="Consistent water pressure and flow to all irrigation zones"
              icon={<Zap className="h-10 w-10 text-blue-600" />}
            />
            <FeatureCard
              title="System Efficiency"
              description="Optimal energy usage and reduced operational costs"
              icon={<Settings className="h-10 w-10 text-green-600" />}
            />
            <FeatureCard
              title="Corrosion Resistance"
              description="Built to handle greywater's unique chemical properties"
              icon={<Shield className="h-10 w-10 text-purple-600" />}
            />
            <FeatureCard
              title="Long Service Life"
              description="Designed for continuous operation in greywater applications"
              icon={<CheckCircle className="h-10 w-10 text-green-600" />}
            />
          </div>
        </div>

        {/* Pump Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Pump Types & Applications</h2>
          
          <div className="space-y-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-blue-600" />
                  Diaphragm Pumps
                </CardTitle>
                <CardDescription>Self-priming pumps ideal for intermittent greywater applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Self-priming operation</li>
                      <li>• Handles solids up to 1/8"</li>
                      <li>• Dry-run protection</li>
                      <li>• Quiet operation</li>
                      <li>• 12V DC available</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Applications:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Residential systems</li>
                      <li>• RV installations</li>
                      <li>• Tiny house systems</li>
                      <li>• Intermittent use</li>
                      <li>• Solar-powered systems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Specifications:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Flow: 2-15 GPM</li>
                      <li>• Head: 20-100 feet</li>
                      <li>• Power: 12V DC / 120V AC</li>
                      <li>• Materials: Polypropylene</li>
                      <li>• Service life: 3-5 years</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6 text-green-600" />
                  Centrifugal Pumps
                </CardTitle>
                <CardDescription>High-flow pumps for continuous operation and larger systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• High flow rates</li>
                      <li>• Continuous duty rated</li>
                      <li>• Stainless steel construction</li>
                      <li>• Variable speed capable</li>
                      <li>• Low maintenance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Applications:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Commercial systems</li>
                      <li>• Large residential</li>
                      <li>• Multi-zone irrigation</li>
                      <li>• Continuous operation</li>
                      <li>• High-pressure needs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Specifications:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Flow: 10-100+ GPM</li>
                      <li>• Head: 50-200 feet</li>
                      <li>• Power: 120V/240V AC</li>
                      <li>• Materials: Stainless steel</li>
                      <li>• Service life: 7-10 years</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-purple-600" />
                  Submersible Pumps
                </CardTitle>
                <CardDescription>In-tank pumps for compact installations and surge tank applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Fully submersible design</li>
                      <li>• Space-saving installation</li>
                      <li>• Automatic float switch</li>
                      <li>• Sealed motor housing</li>
                      <li>• Clog-resistant impeller</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Applications:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Surge tank systems</li>
                      <li>• Compact installations</li>
                      <li>• Below-ground systems</li>
                      <li>• Automatic operation</li>
                      <li>• Remote locations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Specifications:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Flow: 5-50 GPM</li>
                      <li>• Head: 10-80 feet</li>
                      <li>• Power: 120V AC</li>
                      <li>• Materials: Thermoplastic</li>
                      <li>• Service life: 5-8 years</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pump Selection Guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Pump Selection Guide</h2>
          <div className="bg-blue-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Sizing Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Flow Rate (GPM):</strong> Based on peak water usage</li>
                    <li><strong>Total Dynamic Head (TDH):</strong> Vertical lift + friction losses</li>
                    <li><strong>Duty Cycle:</strong> Continuous vs intermittent operation</li>
                    <li><strong>Power Source:</strong> AC grid power vs DC solar/battery</li>
                    <li><strong>Installation Space:</strong> Available mounting area</li>
                    <li><strong>Automation Level:</strong> Manual vs automatic operation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Calculations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold">Flow Rate Formula:</h5>
                      <code className="bg-gray-200 p-2 rounded text-sm block">
                        GPM = Daily Usage (gallons) ÷ Operating Hours ÷ 60
                      </code>
                    </div>
                    <div>
                      <h5 className="font-semibold">Total Dynamic Head:</h5>
                      <code className="bg-gray-200 p-2 rounded text-sm block">
                        TDH = Static Lift + Friction Loss + Pressure Requirement
                      </code>
                    </div>
                    <div>
                      <h5 className="font-semibold">Power Requirement:</h5>
                      <code className="bg-gray-200 p-2 rounded text-sm block">
                        HP = (GPM × TDH × Specific Gravity) ÷ (3960 × Efficiency)
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Maintenance & Troubleshooting */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Pump Maintenance & Troubleshooting</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  Common Problems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-red-800">Pump Won't Start:</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Check power connections</li>
                      <li>• Verify pressure switch settings</li>
                      <li>• Inspect fuses and breakers</li>
                      <li>• Test motor windings</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-800">Low Flow/Pressure:</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Clean or replace impeller</li>
                      <li>• Check for air leaks in suction</li>
                      <li>• Inspect discharge piping for clogs</li>
                      <li>• Verify pump sizing is adequate</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-800">Pump Cycles Frequently:</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Check pressure tank pre-charge</li>
                      <li>• Inspect for system leaks</li>
                      <li>• Adjust pressure switch settings</li>
                      <li>• Replace worn check valves</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Maintenance Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-green-800">Monthly:</h5>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Visual inspection for leaks</li>
                      <li>• Check operation and performance</li>
                      <li>• Monitor unusual noises or vibration</li>
                      <li>• Verify pressure switch function</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-800">Quarterly:</h5>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Clean pump exterior and vents</li>
                      <li>• Check electrical connections</li>
                      <li>• Test automatic controls</li>
                      <li>• Inspect mounting and alignment</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-800">Annually:</h5>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Professional performance evaluation</li>
                      <li>• Replace wear components</li>
                      <li>• Update control settings</li>
                      <li>• Plan for replacement if needed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Installation Guidelines */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Installation Guidelines</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-blue-600" />
                Professional Installation Recommended
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Installation Steps:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-blue-600">1</span>
                      </div>
                      <span className="text-sm text-gray-700">Calculate system requirements</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-blue-600">2</span>
                      </div>
                      <span className="text-sm text-gray-700">Select appropriate pump type and size</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-blue-600">3</span>
                      </div>
                      <span className="text-sm text-gray-700">Install proper electrical connections</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-blue-600">4</span>
                      </div>
                      <span className="text-sm text-gray-700">Connect suction and discharge piping</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-blue-600">5</span>
                      </div>
                      <span className="text-sm text-gray-700">Install controls and safety devices</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-blue-600">6</span>
                      </div>
                      <span className="text-sm text-gray-700">Test operation and performance</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Safety Considerations:</h4>
                  <BenefitList
                    benefits={[
                      "Turn off power before beginning work",
                      "Use proper lockout/tagout procedures",
                      "Ensure proper grounding of electrical components",
                      "Install GFCI protection where required",
                      "Follow local electrical and plumbing codes",
                      "Use appropriate PPE during installation"
                    ]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pump Compatibility */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">System Compatibility</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Aqua2use GWDD</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Standard: Diaphragm pump 5-8 GPM</li>
                  <li>• Power: 12V DC or 120V AC</li>
                  <li>• Automatic pressure control</li>
                  <li>• Self-priming operation</li>
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
                  <li>• Standard: Centrifugal pump 15-25 GPM</li>
                  <li>• Power: 120V/240V AC</li>
                  <li>• Variable speed capability</li>
                  <li>• High-efficiency motor</li>
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
                  <li>• Application-specific pump selection</li>
                  <li>• Custom flow and pressure ratings</li>
                  <li>• Specialized materials available</li>
                  <li>• Engineering support included</li>
                </ul>
                <div className="mt-4">
                  <Button className="w-full" size="sm" variant="outline" asChild>
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