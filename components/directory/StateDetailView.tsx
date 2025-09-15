"use client"

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Building, 
  Home, 
  Droplets, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  XCircle,
  Phone,
  Globe,
  Mail,
  AlertCircle,
  Info,
  TrendingUp,
  Building2,
  Scale,
  Shield,
  Calendar,
  Users
} from 'lucide-react'

interface StateData {
  legalStatus?: string
  governingCode?: string
  permitThresholdGpd?: number | null
  permitRequired?: string
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  approvedUses?: string[]
  keyRestrictions?: string[]
  recentChanges?: string | null
  primaryAgency?: string
  agencyContact?: string
  agencyPhone?: string | null
  governmentWebsite?: string
  regulatoryClassification?: string
  summary?: string
  state_name?: string
  state_code?: string
  county_count?: number
  city_count?: number
  has_greywater_policy?: boolean
  has_incentives?: boolean | number
  max_rebate_amount?: number
}

interface StateDetailViewProps {
  stateData: StateData
  onBack?: () => void
  showCountiesBelow?: boolean
}

export default function StateDetailView({ stateData, onBack, showCountiesBelow = true }: StateDetailViewProps) {
  const getLegalStatusColor = (status?: string) => {
    switch(status?.toLowerCase()) {
      case 'legal':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'regulated':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'highly regulated':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'permitted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'limited/unclear':
      case 'prohibited':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getClassificationIcon = (classification?: string) => {
    if (classification?.includes('Progressive')) return <TrendingUp className="h-4 w-4" />
    if (classification?.includes('Comprehensive')) return <Shield className="h-4 w-4" />
    if (classification?.includes('Restrictive')) return <AlertCircle className="h-4 w-4" />
    if (classification?.includes('Building Code')) return <Building2 className="h-4 w-4" />
    return <Info className="h-4 w-4" />
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Header Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Building className="h-8 w-8 text-blue-600" />
                {stateData.state_name}
              </CardTitle>
              <p className="text-lg text-gray-600 mt-2">
                Comprehensive Greywater Regulations & Compliance Information
              </p>
              <div className="flex gap-4 mt-3">
                <span className="text-sm text-gray-500">
                  {stateData.county_count} Counties
                </span>
                <span className="text-sm text-gray-500">
                  {stateData.city_count} Cities
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={`text-sm px-3 py-1 ${getLegalStatusColor(stateData.legalStatus)}`}>
                {stateData.legalStatus}
              </Badge>
              {stateData.regulatoryClassification && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  {getClassificationIcon(stateData.regulatoryClassification)}
                  {stateData.regulatoryClassification}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {stateData.summary && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{stateData.summary}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Regulations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Permit Requirements */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-500" />
              Permit Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status:</span>
              <Badge variant={stateData.permitRequired === 'Yes' ? 'destructive' : 'secondary'}>
                {stateData.permitRequired || 'Varies'}
              </Badge>
            </div>
            {stateData.permitThresholdGpd !== null && stateData.permitThresholdGpd !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Threshold:</span>
                <span className="text-sm font-medium">
                  {stateData.permitThresholdGpd === 0 
                    ? 'All systems' 
                    : `${stateData.permitThresholdGpd} GPD`}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Indoor/Outdoor Use */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              Allowed Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Indoor Use:</span>
              {stateData.indoorUseAllowed ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Allowed
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <XCircle className="h-3 w-3 mr-1" />
                  Not Allowed
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Outdoor Use:</span>
              {stateData.outdoorUseAllowed ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Allowed
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <XCircle className="h-3 w-3 mr-1" />
                  Not Allowed
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Incentives */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Financial Incentives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Available:</span>
              {stateData.has_incentives ? (
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              ) : (
                <Badge variant="secondary">No</Badge>
              )}
            </div>
            {stateData.max_rebate_amount && stateData.max_rebate_amount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Max Amount:</span>
                <span className="text-sm font-bold text-green-700">
                  ${stateData.max_rebate_amount.toLocaleString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Approved Uses & Restrictions */}
      <div className="grid md:grid-cols-2 gap-6">
        {stateData.approvedUses && stateData.approvedUses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Approved Uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stateData.approvedUses.map((use, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{use}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {stateData.keyRestrictions && stateData.keyRestrictions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Key Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stateData.keyRestrictions.map((restriction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{restriction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Regulatory Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="h-5 w-5 text-purple-500" />
            Regulatory Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stateData.governingCode && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Governing Code</h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded p-2">
                {stateData.governingCode}
              </p>
            </div>
          )}

          {stateData.primaryAgency && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Primary Agency</h4>
              <p className="text-sm text-gray-600">{stateData.primaryAgency}</p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            {stateData.agencyPhone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{stateData.agencyPhone}</span>
              </div>
            )}
            
            {stateData.agencyContact && !stateData.agencyContact.includes('@') && !stateData.agencyContact.startsWith('http') && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{stateData.agencyContact}</span>
              </div>
            )}

            {stateData.agencyContact && stateData.agencyContact.includes('@') && (
              <a 
                href={`mailto:${stateData.agencyContact}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">Email Agency</span>
              </a>
            )}

            {stateData.governmentWebsite && (
              <a 
                href={stateData.governmentWebsite}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">Official Website</span>
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Changes */}
      {stateData.recentChanges && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Recent Policy Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{stateData.recentChanges}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}