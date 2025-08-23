import { PageTemplate, FeatureCard } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle, BookOpen } from "lucide-react"

const stateData = [
  {
    state: "Arizona",
    status: "Fully Legal",
    description: "Comprehensive greywater regulations allowing residential and commercial use",
    details: "Permits required for some systems. Subsurface irrigation encouraged."
  },
  {
    state: "California",
    status: "Fully Legal",
    description: "Progressive greywater laws with simple permit process",
    details: "Laundry-to-landscape systems allowed without permits. Other systems require permits."
  },
  {
    state: "Nevada",
    status: "Fully Legal",
    description: "Allows greywater systems with proper permits",
    details: "Permits required. Must follow state plumbing code requirements."
  },
  {
    state: "Texas",
    status: "Fully Legal",
    description: "Permits greywater use for irrigation with regulations",
    details: "Systems must be designed by licensed professionals for large installations."
  },
  {
    state: "Colorado",
    status: "Restricted",
    description: "Limited to laundry-to-landscape systems only",
    details: "Only washing machine greywater allowed. Other sources prohibited."
  },
  {
    state: "New Mexico",
    status: "Fully Legal",
    description: "Comprehensive regulations supporting greywater reuse",
    details: "Permits required for most systems. Strong support for water conservation."
  },
  {
    state: "Utah",
    status: "Fully Legal",
    description: "Allows greywater systems with proper design and permits",
    details: "Must comply with state plumbing code. Professional installation recommended."
  },
  {
    state: "Oregon",
    status: "Fully Legal",
    description: "Permits greywater systems with environmental safeguards",
    details: "Focus on groundwater protection. Permits required for most systems."
  },
  {
    state: "Washington",
    status: "Restricted",
    description: "Limited greywater use with strict regulations",
    details: "Primarily laundry systems. Health department approval required."
  },
  {
    state: "Florida",
    status: "Limited",
    description: "Some counties allow greywater systems",
    details: "Varies by county. Check local health department regulations."
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Fully Legal":
      return "bg-green-100 text-green-800 border-green-200"
    case "Restricted":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Limited":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function GreywaterStateLaws() {
  return (
    <PageTemplate
      title="Greywater State Laws & Regulations"
      subtitle="Understanding the legal landscape for greywater systems across the United States. Stay compliant while maximizing your water savings."
      ctaTitle="Need Help Navigating Regulations?"
      ctaSubtitle="Our experts can help you understand local requirements and design compliant systems"
      ctaButtonText="Get Expert Guidance"
    >
      <div className="max-w-6xl mx-auto">
        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Legal Notice</h3>
              <p className="text-blue-700 leading-relaxed">
                This information is for general guidance only and may not reflect the most current regulations. 
                Greywater laws vary significantly by state, county, and municipality. Always consult with local 
                authorities and obtain necessary permits before installing any greywater system.
              </p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Regulatory Overview</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <FeatureCard
              title="Fully Legal States"
              description="Comprehensive regulations allowing various greywater systems with proper permits"
              icon={<CheckCircle className="h-10 w-10 text-green-600" />}
            />
            <FeatureCard
              title="Restricted States"
              description="Limited greywater use, often only laundry-to-landscape systems allowed"
              icon={<AlertTriangle className="h-10 w-10 text-yellow-600" />}
            />
            <FeatureCard
              title="Prohibited States"
              description="Greywater systems not currently permitted or highly restricted"
              icon={<Shield className="h-10 w-10 text-red-600" />}
            />
          </div>
        </div>

        {/* State-by-State Breakdown */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">State-by-State Regulations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateData.map((state, index) => (
              <Card key={index} className="hover-lift transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{state.state}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(state.status)}`}>
                      {state.status}
                    </span>
                  </div>
                  <CardDescription>{state.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{state.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Requirements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Requirements Across States</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-gray-600" />
                  Permit Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Building permits for permanent installations</li>
                  <li>• Health department approval in many areas</li>
                  <li>• Professional design for large systems</li>
                  <li>• Inspection requirements</li>
                  <li>• Annual compliance reporting (some states)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Safety Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Subsurface irrigation preferred</li>
                  <li>• Setbacks from wells and property lines</li>
                  <li>• Use of approved soaps and detergents</li>
                  <li>• No storage beyond 24 hours</li>
                  <li>• Backflow prevention requirements</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Types of Systems */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common System Categories</h2>
          <div className="space-y-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle>Laundry-to-Landscape (Most Permissive)</CardTitle>
                <CardDescription>
                  Direct connection from washing machine to landscape irrigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Often requires no permit in permissive states. Simple three-way valve system 
                  allows switching between sewer and landscape irrigation. Most commonly allowed 
                  system type across all states with greywater laws.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle>Simple Systems (Moderate Restrictions)</CardTitle>
                <CardDescription>
                  Basic greywater systems with minimal treatment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Usually includes basic filtration and surge tanks. May collect from multiple 
                  sources like showers and bathroom sinks. Typically requires permits and 
                  professional installation in most states.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle>Complex Systems (Most Regulated)</CardTitle>
                <CardDescription>
                  Advanced treatment and distribution systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Includes multi-stage filtration, disinfection, and automated distribution. 
                  Often requires engineered design, professional installation, and ongoing 
                  maintenance contracts. May require special permits and inspections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Steps to Compliance */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Steps to Legal Compliance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-gray-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Research Local Laws</h3>
              <p className="text-gray-600 text-sm">
                Contact local building departments, health departments, and water utilities
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-gray-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Compliant System</h3>
              <p className="text-gray-600 text-sm">
                Select a system type that meets local requirements and your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-gray-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Obtain Permits</h3>
              <p className="text-gray-600 text-sm">
                Submit applications and get necessary approvals before installation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-gray-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Professional Install</h3>
              <p className="text-gray-600 text-sm">
                Use licensed contractors and pass required inspections
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}