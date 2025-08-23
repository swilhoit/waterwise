import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertTriangle, MapPin, FileText, Phone } from "lucide-react"
import { getAllStates, getStateInfo, getStateSlug, getMetadata, getStatesByLegalStatus, getProgressiveStates, getRestrictiveStates } from "@/lib/greywater-laws"

export default function GreywaterLaws() {
  const metadata = getMetadata()
  const states = getAllStates()
  const statesByStatus = getStatesByLegalStatus()
  const progressiveStates = getProgressiveStates()
  const restrictiveStates = getRestrictiveStates()

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('legal') && !lowerStatus.includes('illegal')) return 'text-green-600'
    if (lowerStatus.includes('regulated') || lowerStatus.includes('permitted')) return 'text-blue-600'
    if (lowerStatus.includes('limited') || lowerStatus.includes('unclear')) return 'text-yellow-600'
    if (lowerStatus.includes('prohibited') || lowerStatus.includes('no formal') || lowerStatus.includes('no specific')) return 'text-red-600'
    return 'text-gray-600'
  }

  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('legal') && !lowerStatus.includes('illegal')) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (lowerStatus.includes('regulated') || lowerStatus.includes('permitted')) return <CheckCircle className="h-5 w-5 text-blue-600" />
    if (lowerStatus.includes('limited') || lowerStatus.includes('unclear')) return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    if (lowerStatus.includes('prohibited') || lowerStatus.includes('no formal') || lowerStatus.includes('no specific')) return <XCircle className="h-5 w-5 text-red-600" />
    return <AlertTriangle className="h-5 w-5 text-gray-600" />
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              Greywater Laws by <span className="text-gradient">State</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              {metadata.title}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-gray-500">Last Updated:</span> <span className="font-semibold">{metadata.lastUpdated}</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-gray-500">Total States:</span> <span className="font-semibold">{metadata.totalStates}</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-gray-500">Data Source:</span> <span className="font-semibold">{metadata.dataSource}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="p-6">
              <CardContent className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {metadata.summary}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Quick Overview
              </h2>
              <p className="text-xl text-gray-600">
                Find your state's greywater regulations at a glance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    Progressive States
                  </CardTitle>
                  <CardDescription>
                    States with user-friendly greywater policies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600 mb-2">{progressiveStates.length}</p>
                  <p className="text-sm text-gray-600">
                    Including Arizona, California, Texas, and others with permit-free thresholds
                  </p>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    Limited/Unclear
                  </CardTitle>
                  <CardDescription>
                    States with limited or unclear regulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-yellow-600 mb-2">
                    {states.length - progressiveStates.length - restrictiveStates.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    Requiring case-by-case approval or lacking clear guidelines
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-600" />
                    Restrictive/Prohibited
                  </CardTitle>
                  <CardDescription>
                    States prohibiting or severely restricting greywater
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-600 mb-2">{restrictiveStates.length}</p>
                  <p className="text-sm text-gray-600">
                    Including Illinois, Indiana, and others with no legal pathway
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">
                  All States Directory
                </h3>
                <p className="text-gray-600 mt-2">
                  Click on any state to view detailed regulations, permit requirements, and contact information
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {states.map((stateName) => {
                    const stateInfo = getStateInfo(stateName)
                    if (!stateInfo) return null
                    
                    return (
                      <Link
                        key={stateName}
                        href={`/greywater-laws/${getStateSlug(stateName)}`}
                        className="group"
                      >
                        <Card className="hover-lift transition-all duration-300 hover:shadow-lg h-full">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {stateName}
                              </h4>
                              {getStatusIcon(stateInfo.legalStatus)}
                            </div>
                            <p className={`text-sm ${getStatusColor(stateInfo.legalStatus)}`}>
                              {stateInfo.legalStatus}
                            </p>
                            {stateInfo.permitThresholdGpd && (
                              <p className="text-xs text-gray-500 mt-1">
                                No permit under {stateInfo.permitThresholdGpd} gpd
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Need Help Understanding Your State's Regulations?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our experts can guide you through the permitting process and recommend the right system for your location
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get Expert Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">View Compliant Systems</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}