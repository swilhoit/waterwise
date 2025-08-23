import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, MapPin, FileText, Phone, Globe, Home, Droplets, TreePine, Building } from "lucide-react"
import { getAllStates, getStateInfo, getStateFromSlug, getStateSlug } from "@/lib/greywater-laws"

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state: stateSlug } = await params
  const stateName = getStateFromSlug(stateSlug)
  
  if (!stateName) {
    notFound()
  }
  
  const stateInfo = getStateInfo(stateName)
  
  if (!stateInfo) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('legal') && !lowerStatus.includes('illegal')) return 'bg-green-100 text-green-800 border-green-200'
    if (lowerStatus.includes('regulated') || lowerStatus.includes('permitted')) return 'bg-blue-100 text-blue-800 border-blue-200'
    if (lowerStatus.includes('limited') || lowerStatus.includes('unclear')) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    if (lowerStatus.includes('prohibited') || lowerStatus.includes('no formal') || lowerStatus.includes('no specific')) return 'bg-red-100 text-red-800 border-red-200'
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('legal') && !lowerStatus.includes('illegal')) return <CheckCircle className="h-6 w-6 text-green-600" />
    if (lowerStatus.includes('regulated') || lowerStatus.includes('permitted')) return <CheckCircle className="h-6 w-6 text-blue-600" />
    if (lowerStatus.includes('limited') || lowerStatus.includes('unclear')) return <AlertTriangle className="h-6 w-6 text-yellow-600" />
    if (lowerStatus.includes('prohibited') || lowerStatus.includes('no formal') || lowerStatus.includes('no specific')) return <XCircle className="h-6 w-6 text-red-600" />
    return <AlertTriangle className="h-6 w-6 text-gray-600" />
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/greywater-laws" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to All States
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {stateName} Greywater Laws
                  </h1>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(stateInfo.legalStatus)}
                    <Badge className={`text-lg px-4 py-2 ${getStatusColor(stateInfo.legalStatus)}`}>
                      {stateInfo.legalStatus}
                    </Badge>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <Card className="bg-white/80 backdrop-blur">
                    <CardContent className="p-4">
                      <MapPin className="h-12 w-12 text-blue-600 mx-auto" />
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card className="bg-blue-50/50 border-blue-200">
                <CardContent className="p-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {stateInfo.summary}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Regulatory Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Classification</p>
                    <p className="font-semibold">{stateInfo.regulatoryClassification}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Governing Code</p>
                    <p className="font-semibold text-sm">{stateInfo.governingCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Permit Required</p>
                    <p className="font-semibold">{stateInfo.permitRequired}</p>
                  </div>
                  {stateInfo.permitThresholdGpd !== null && (
                    <div>
                      <p className="text-sm text-gray-500">Permit Threshold</p>
                      <p className="font-semibold">{stateInfo.permitThresholdGpd} gallons per day</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    Agency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Primary Agency</p>
                    <p className="font-semibold">{stateInfo.primaryAgency}</p>
                  </div>
                  {stateInfo.agencyPhone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {stateInfo.agencyPhone}
                      </p>
                    </div>
                  )}
                  {stateInfo.agencyContact && !stateInfo.agencyContact.includes('http') && (
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-semibold text-sm">{stateInfo.agencyContact}</p>
                    </div>
                  )}
                  {stateInfo.governmentWebsite && (
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a 
                        href={stateInfo.governmentWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm"
                      >
                        <Globe className="h-4 w-4" />
                        Visit Official Website
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className={stateInfo.indoorUseAllowed ? "border-green-200" : "border-red-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Indoor Use
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    {stateInfo.indoorUseAllowed ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-600">Allowed</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="font-semibold text-red-600">Not Allowed</span>
                      </>
                    )}
                  </div>
                  {stateInfo.indoorUseAllowed && (
                    <p className="text-sm text-gray-600">
                      Indoor greywater use is permitted for approved applications
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className={stateInfo.outdoorUseAllowed ? "border-green-200" : "border-red-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5" />
                    Outdoor Use
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    {stateInfo.outdoorUseAllowed ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-600">Allowed</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="font-semibold text-red-600">Not Allowed</span>
                      </>
                    )}
                  </div>
                  {stateInfo.outdoorUseAllowed && (
                    <p className="text-sm text-gray-600">
                      Outdoor irrigation and landscape use is permitted
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  Approved Uses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stateInfo.approvedUses.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {stateInfo.approvedUses.map((use, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {use}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No approved uses specified</p>
                )}
              </CardContent>
            </Card>

            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Key Restrictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stateInfo.keyRestrictions.length > 0 ? (
                  <ul className="space-y-2">
                    {stateInfo.keyRestrictions.map((restriction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">•</span>
                        <span className="text-gray-700">{restriction}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No specific restrictions listed</p>
                )}
              </CardContent>
            </Card>

            {stateInfo.recentChanges && (
              <Card className="mb-12 border-blue-200 bg-blue-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Recent Changes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{stateInfo.recentChanges}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Install a Greywater System in {stateName}?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our experts can help you navigate {stateName}'s regulations and select the right system for your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get Expert Guidance</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">View Systems</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const states = getAllStates()
  
  return states.map((stateName) => ({
    state: getStateSlug(stateName)
  }))
}