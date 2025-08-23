import { PageTemplate, FeatureCard, BenefitList } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HardHat, Droplets, Shield, Users, Truck, Wrench } from "lucide-react"

export default function RemoteWorkSites() {
  return (
    <PageTemplate
      title="Greywater Solutions for Remote Work Sites"
      subtitle="Sustainable water management for construction sites, mining operations, and remote facilities where water conservation and environmental compliance are critical."
      heroImage="/images/gwdd-ug.jpg"
      heroImageAlt="Industrial greywater system at remote work site"
    >
      <div className="max-w-4xl mx-auto">
        {/* Remote Site Challenges */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Remote Site Water Challenges</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-700">Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Limited water supply and delivery costs</li>
                  <li>• Expensive wastewater removal services</li>
                  <li>• Environmental compliance requirements</li>
                  <li>• Remote location logistics challenges</li>
                  <li>• Seasonal accessibility issues</li>
                  <li>• High operational costs for water management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-700">Greywater Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Reduce water delivery frequency by 50-70%</li>
                  <li>• Lower wastewater disposal costs</li>
                  <li>• Meet environmental regulations</li>
                  <li>• Dust control and site stabilization</li>
                  <li>• Vegetation establishment for erosion control</li>
                  <li>• Improved worker satisfaction and health</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Applications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Remote Site Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Construction Sites"
              description="Temporary facilities, wash stations, and dust control for construction projects"
              icon={<HardHat className="h-10 w-10 text-orange-600" />}
            />
            <FeatureCard
              title="Mining Operations"
              description="Process water recycling and environmental compliance for extraction sites"
              icon={<Truck className="h-10 w-10 text-gray-600" />}
            />
            <FeatureCard
              title="Oil & Gas Sites"
              description="Drilling operations, worker camps, and environmental protection"
              icon={<Wrench className="h-10 w-10 text-blue-600" />}
            />
            <FeatureCard
              title="Remote Facilities"
              description="Research stations, military bases, and temporary installations"
              icon={<Shield className="h-10 w-10 text-green-600" />}
            />
            <FeatureCard
              title="Worker Camps"
              description="Temporary housing facilities with showers, kitchens, and laundry"
              icon={<Users className="h-10 w-10 text-purple-600" />}
            />
            <FeatureCard
              title="Event Sites"
              description="Large outdoor events, festivals, and temporary installations"
              icon={<Droplets className="h-10 w-10 text-blue-600" />}
            />
          </div>
        </div>

        {/* System Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Industrial Greywater System Types</h2>
          
          <div className="space-y-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Portable Treatment Units</CardTitle>
                <CardDescription>Mobile systems for short-term projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <BenefitList
                      benefits={[
                        "Trailer-mounted for easy transport",
                        "Quick setup and teardown",
                        "Self-contained operation",
                        "Suitable for 50-500 GPD capacity"
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Short-term construction projects</li>
                      <li>• Emergency response situations</li>
                      <li>• Seasonal operations</li>
                      <li>• Sites with changing locations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Modular Treatment Systems</CardTitle>
                <CardDescription>Scalable systems for medium-term installations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <BenefitList
                      benefits={[
                        "Containerized treatment modules",
                        "Expandable capacity as needed",
                        "Remote monitoring capabilities",
                        "Handle 500-5000 GPD"
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Medium-term mining operations</li>
                      <li>• Large construction projects</li>
                      <li>• Worker camp facilities</li>
                      <li>• Research installations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Permanent Installations</CardTitle>
                <CardDescription>Custom-engineered systems for long-term operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <BenefitList
                      benefits={[
                        "Site-specific engineering design",
                        "Maximum efficiency and reliability",
                        "Integration with existing infrastructure",
                        "Capacity from 1,000-50,000+ GPD"
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Permanent mining facilities</li>
                      <li>• Long-term military bases</li>
                      <li>• Industrial manufacturing sites</li>
                      <li>• Large-scale operations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Regulatory Compliance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Environmental Compliance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Federal Regulations</CardTitle>
              </CardHeader>
              <CardContent>
                <BenefitList
                  benefits={[
                    "EPA wastewater discharge permits",
                    "Clean Water Act compliance",
                    "NPDES permit requirements",
                    "Environmental impact assessments",
                    "Worker safety (OSHA) standards"
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>State & Local Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <BenefitList
                  benefits={[
                    "State water quality standards",
                    "Local health department permits",
                    "Groundwater protection requirements",
                    "Soil contamination prevention",
                    "Monitoring and reporting obligations"
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Economic Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Economic Impact</h2>
          <div className="bg-green-50 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">50-70%</div>
                <div className="text-sm text-gray-600">Reduction in water delivery costs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">60-80%</div>
                <div className="text-sm text-gray-600">Less wastewater disposal volume</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">1-3 Years</div>
                <div className="text-sm text-gray-600">Typical payback period</div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Implementation Process</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Site Assessment</h4>
                <p className="text-gray-600">Evaluate water usage, waste streams, and environmental constraints</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Regulatory Review</h4>
                <p className="text-gray-600">Identify permit requirements and compliance obligations</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">3</span>
              </div>
              <div>
                <h4 className="font-semibold">System Design</h4>
                <p className="text-gray-600">Custom engineering for site-specific requirements</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Installation & Commissioning</h4>
                <p className="text-gray-600">Professional installation with full testing and startup</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-600">5</span>
              </div>
              <div>
                <h4 className="font-semibold">Training & Support</h4>
                <p className="text-gray-600">Operator training and ongoing maintenance support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}