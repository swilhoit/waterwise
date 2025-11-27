"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageTemplate, FeatureCard } from "@/components/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, CheckCircle, BookOpen, Grid3X3, Table, Loader2 } from "lucide-react"

interface StateData {
  state: string
  status: string
  description: string
  details: string
  fullSummary: string
  permitRequired: string
  permitThresholdGpd: number | null
  indoorUseAllowed: boolean
  outdoorUseAllowed: boolean
  approvedUses: string[]
  keyRestrictions: string[]
  governingCode: string
  primaryAgency: string
}

function transformStateData(rawStates: any[]): StateData[] {
  return rawStates.map((data) => {
    // Determine status category based on legalStatus
    let status = "Limited"
    if (data.legalStatus === "Legal" || data.legalStatus === "Legal and Regulated" || data.legalStatus === "Regulated and Permitted" || data.legalStatus === "Comprehensive Regulations") {
      status = "Fully Legal"
    } else if (data.legalStatus === "Restricted" || data.legalStatus === "Highly Restricted" || data.legalStatus === "Limited" || data.legalStatus === "Limited/Unclear") {
      status = "Restricted"
    } else if (data.legalStatus === "Effectively Prohibited" || data.legalStatus === "No Formal Regulations" || data.legalStatus === "No Specific Regulations") {
      status = "Prohibited"
    }

    // Create a brief description from the regulatory classification
    const description = data.regulatoryClassification || data.legalStatus

    // Extract key details from the summary
    const keyRestrictions = data.keyRestrictions || []
    const details = keyRestrictions.length > 0
      ? keyRestrictions.join(". ")
      : (data.summary?.substring(0, 150) + "..." || "")

    return {
      state: data.state_name,
      status,
      description,
      details,
      fullSummary: data.summary,
      permitRequired: data.permitRequired,
      permitThresholdGpd: data.permitThresholdGpd,
      indoorUseAllowed: data.indoorUseAllowed,
      outdoorUseAllowed: data.outdoorUseAllowed,
      approvedUses: data.approvedUses || [],
      keyRestrictions,
      governingCode: data.governingCode,
      primaryAgency: data.primaryAgency
    }
  }).sort((a, b) => a.state.localeCompare(b.state))
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Fully Legal":
      return "bg-green-100 text-green-800 border-green-200"
    case "Restricted":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Limited":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Prohibited":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function GreywaterStateLaws() {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table')
  const [stateData, setStateData] = useState<StateData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch('/api/greywater-directory/all-states')
        const result = await response.json()
        if (result.status === 'success') {
          setStateData(transformStateData(result.data))
        } else {
          setError('Failed to load state data')
        }
      } catch (err) {
        setError('Failed to load state data')
      } finally {
        setLoading(false)
      }
    }
    fetchStates()
  }, [])

  // Calculate statistics from the data
  const fullyLegalCount = stateData.filter(s => s.status === "Fully Legal").length
  const restrictedCount = stateData.filter(s => s.status === "Restricted").length
  const prohibitedCount = stateData.filter(s => s.status === "Prohibited").length
  const limitedCount = stateData.filter(s => s.status === "Limited").length
  
  // Helper function to create state slug
  const getStateSlug = (stateName: string) => {
    return stateName.toLowerCase().replace(/\s+/g, '-')
  }
  
  // Navigate to state detail page
  const navigateToState = (stateName: string) => {
    router.push(`/greywater-laws/${getStateSlug(stateName)}`)
  }

  if (loading) {
    return (
      <PageTemplate
        title="Greywater State Laws & Regulations"
        subtitle="Understanding the legal landscape for greywater systems across the United States."
        plainHero
      >
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-3 text-gray-600">Loading state data...</span>
        </div>
      </PageTemplate>
    )
  }

  if (error) {
    return (
      <PageTemplate
        title="Greywater State Laws & Regulations"
        subtitle="Understanding the legal landscape for greywater systems across the United States."
        plainHero
      >
        <div className="text-center py-20">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </PageTemplate>
    )
  }

  return (
    <PageTemplate
      title="Greywater State Laws & Regulations"
      subtitle="Understanding the legal landscape for greywater systems across the United States. Stay compliant while maximizing your water savings."
      plainHero
      ctaTitle="Need Help Navigating Regulations?"
      ctaSubtitle="Our experts can help you understand local requirements and design compliant systems"
      ctaButtonText="Get Expert Guidance"
    >
      <div className="max-w-6xl mx-auto">
        {/* Overview */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span>Fully Legal</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </CardTitle>
                <CardDescription>
                  {fullyLegalCount} states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Comprehensive regulations allowing greywater systems with permits
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span>Restricted</span>
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </CardTitle>
                <CardDescription>
                  {restrictedCount} states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Limited use, often only specific system types allowed
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span>Limited</span>
                  <Shield className="h-5 w-5 text-orange-600" />
                </CardTitle>
                <CardDescription>
                  {limitedCount} states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Unclear regulations or case-by-case approval
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span>Prohibited</span>
                  <Shield className="h-5 w-5 text-red-600" />
                </CardTitle>
                <CardDescription>
                  {prohibitedCount} states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  No greywater systems permitted or no formal regulations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* State-by-State Breakdown */}
        <div className="mb-16">
          <div className="flex justify-end mb-8">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="flex items-center gap-2"
              >
                <Grid3X3 className="h-4 w-4" />
                Cards
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="flex items-center gap-2"
              >
                <Table className="h-4 w-4" />
                Table
              </Button>
            </div>
          </div>

          {viewMode === 'card' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateData.map((state, index) => (
                <Card 
                  key={index} 
                  className="hover-lift transition-all duration-300 cursor-pointer"
                  onClick={() => navigateToState(state.state)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg hover:text-blue-700 transition-colors">
                        {state.state}
                      </CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(state.status)}`}>
                        {state.status}
                      </span>
                    </div>
                    <CardDescription>{state.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{state.details}</p>
                    <p className="text-xs text-blue-600 mt-3 font-medium">Click for details →</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left p-4 font-semibold text-gray-900">State</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Permit Required</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Indoor Use</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Outdoor Use</th>
                    <th className="text-left p-4 font-semibold text-gray-900 hidden lg:table-cell">Key Restrictions</th>
                  </tr>
                </thead>
                <tbody>
                  {stateData.map((state, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-black hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigateToState(state.state)}
                    >
                      <td className="p-4 font-medium text-black hover:text-gray-800">
                        {state.state}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-block whitespace-nowrap ${getStatusColor(state.status)}`}>
                          {state.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {state.permitRequired === "Yes" ? "Yes" : 
                         state.permitRequired === "No" ? "No" :
                         state.permitRequired || "Varies"}
                      </td>
                      <td className="p-4 text-center">
                        {state.indoorUseAllowed ? (
                          <CheckCircle className="h-4 w-4 text-green-600 inline" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600 inline" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {state.outdoorUseAllowed ? (
                          <CheckCircle className="h-4 w-4 text-green-600 inline" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600 inline" />
                        )}
                      </td>
                      <td className="p-4 text-sm text-gray-600 hidden lg:table-cell">
                        {state.keyRestrictions?.slice(0, 2).join(". ") || state.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

        {/* Important Legal Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-16">
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
      </div>
    </PageTemplate>
  )
}