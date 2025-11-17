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
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

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
  incentives?: any[]
  // Add detailed regulations
  allowed_sources?: string
  prohibited_sources?: string
  treatment_requirements?: string
  system_size_limits?: string
  setback_requirements?: string
  inspection_required?: boolean
}

interface StateDetailViewProps {
  stateData: StateData
  complianceData?: any
  onBack?: () => void
  showCountiesBelow?: boolean
}

export default function StateDetailView({ stateData: initialStateData, complianceData, onBack, showCountiesBelow = true }: StateDetailViewProps) {
  const [sectorView, setSectorView] = useState<'residential' | 'commercial'>('residential')
  const [stateData, setStateData] = useState(initialStateData)

  // Merge compliance data incentives into stateData
  useEffect(() => {
    if (complianceData?.state) {
      // Merge compliance data incentives and regulations into stateData
      setStateData(prevData => ({
        ...prevData,
        incentives: complianceData.state.incentives,
        ...complianceData.state
      }))
    }
  }, [complianceData])

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

  const residentialIncentives = stateData.incentives?.filter(i => i.residential_eligibility) || []
  const commercialIncentives = stateData.incentives?.filter(i => i.commercial_eligibility) || []

  return (
    <div className="space-y-6 mb-8">
      {/* Header Card */}
      <Card className="border-l-4 border-l-blue-600 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl lg:text-3xl font-bold flex items-center gap-3 mb-2">
                <Building className="h-8 w-8 text-blue-600" />
                {stateData.state_name}
              </CardTitle>
              <p className="text-base text-gray-600">
                Comprehensive Greywater Regulations & Compliance Information
              </p>
              <div className="flex gap-4 mt-3">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {stateData.county_count} Counties
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Home className="h-3 w-3" />
                  {stateData.city_count} Cities
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={`text-sm px-3 py-1.5 ${getLegalStatusColor(stateData.legalStatus)}`}>
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
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-gray-700 leading-relaxed">{stateData.summary}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Sector Toggle */}
      <div className="flex items-center justify-center gap-2 border rounded-lg p-1.5 bg-white shadow-sm sticky top-2 z-10">
        <Button
          variant={sectorView === 'residential' ? 'default' : 'ghost'}
          size="lg"
          onClick={() => setSectorView('residential')}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Home className="h-4 w-4" />
          Residential
        </Button>
        <Button
          variant={sectorView === 'commercial' ? 'default' : 'ghost'}
          size="lg"
          onClick={() => setSectorView('commercial')}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Building className="h-4 w-4" />
          Commercial
        </Button>
      </div>

      {/* Conditional Rendering based on Sector */}
      {sectorView === 'residential' ? (
        <ResidentialView stateData={stateData} incentives={residentialIncentives} />
      ) : (
        <CommercialView stateData={stateData} incentives={commercialIncentives} />
      )}

      {/* Regulatory Information - Common to Both */}
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
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
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Recent Policy Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 leading-relaxed">{stateData.recentChanges}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Residential View Component
const ResidentialView = ({ stateData, incentives }: { stateData: StateData, incentives: any[] }) => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 bg-orange-50">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-orange-600" />
            Permit Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> {stateData.permitRequired ? `Yes, for systems over ${stateData.permitThresholdGpd || 'certain size'}` : 'Varies'}
          </p>
          <p className="text-sm text-gray-500 italic">Simple systems like laundry-to-landscape often do not require a permit.</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 bg-blue-50">
          <CardTitle className="text-base flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-600" />
            System & Use Regulations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
           <RegulationItem title="Allowed Sources" content={stateData.allowed_sources} />
           <RegulationItem title="Size Limits" content={stateData.system_size_limits} />
        </CardContent>
      </Card>
      
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 bg-green-50">
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            Financial Incentives
          </CardTitle>
        </CardHeader>
        <CardContent>
          {incentives.length > 0 ? (
            <div>
              <p className="text-sm text-green-700 font-semibold">{incentives.length} program(s) available.</p>
              {/* Future enhancement: could add a button to view program details */}
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500">No statewide residential incentives found.</p>
              <p className="text-xs text-gray-400 mt-2">Local rebates may be available. Check specific counties and cities for details.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    {/* Detailed list of incentives can be rendered here */}
  </div>
);

// Commercial View Component
const CommercialView = ({ stateData, incentives }: { stateData: StateData, incentives: any[] }) => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 bg-orange-50">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-orange-600" />
            Permit Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> {stateData.permitRequired ? 'Yes, permit required' : 'Permit requirements vary'}
          </p>
          <p className="text-sm text-gray-500 italic">Commercial systems almost always require a permit, including engineering plans and health department review.</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 bg-blue-50">
          <CardTitle className="text-base flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-600" />
            System & Use Regulations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
           <RegulationItem title="Treatment Requirements" content={stateData.treatment_requirements} />
           <RegulationItem title="Setback Requirements" content={stateData.setback_requirements} />
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 bg-green-50">
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            Financial Incentives
          </CardTitle>
        </CardHeader>
        <CardContent>
          {incentives.length > 0 ? (
            <div>
              <p className="text-sm text-green-700 font-semibold">{incentives.length} program(s) available for commercial properties.</p>
              {/* Future enhancement: could add a button to view program details */}
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500">No statewide commercial incentives found.</p>
              <p className="text-xs text-gray-400 mt-2">Local rebates may be available. Check specific counties and cities for details.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
     {/* Detailed list of incentives can be rendered here */}
  </div>
);

const RegulationItem = ({ title, content }: { title: string, content?: string | boolean | null }) => {
  if (content === null || content === undefined) return null;

  let displayContent;
  if (typeof content === 'boolean') {
    displayContent = <li>{content ? 'Yes' : 'No'}</li>;
  } else {
    const items = content.split(/;|,|\|/).map(item => item.trim()).filter(Boolean);
    if (items.length === 0) return null;
    displayContent = items.map((item, index) => <li key={index}>{item}</li>);
  }

  return (
    <div>
      <p className="text-xs font-medium text-gray-700 uppercase tracking-wider">{title}:</p>
      <ul className="text-sm text-gray-600 mt-1 ml-4 list-disc space-y-1">
        {displayContent}
      </ul>
    </div>
  );
};