'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, Users, DollarSign, FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import EffectivePolicyView from './EffectivePolicyView'

interface CountyDetailViewProps {
  countyData: any
  stateCode: string
  countyName: string
  complianceData?: any
  sectorView?: 'residential' | 'commercial' | 'both'
}

export default function CountyDetailView({ 
  countyData, 
  stateCode, 
  countyName,
  complianceData,
  sectorView = 'both' 
}: CountyDetailViewProps) {
  const [localCompliance, setLocalCompliance] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (complianceData) {
      setLocalCompliance(complianceData)
    } else {
      fetchCompliance()
    }
  }, [countyName, stateCode, complianceData])

  const fetchCompliance = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/greywater-directory/compliance?state=${stateCode}&county=${countyName}`)
      const result = await response.json()
      if (result.status === 'success') {
        setLocalCompliance(result.compliance)
      }
    } catch (error) {
      console.error('Failed to fetch county compliance:', error)
    } finally {
      setLoading(false)
    }
  }

  const countyCompliance = localCompliance?.county || localCompliance?.effective
  const hasIncentives = countyCompliance?.incentive_count > 0
  const maxIncentive = countyCompliance?.max_incentive

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {countyName} County, {stateCode}
        </h2>
        <p className="text-gray-600 mt-1">
          Greywater Regulations & Incentives
        </p>
      </div>
      
      {/* Effective Policy */}
      <EffectivePolicyView 
        complianceData={localCompliance}
        jurisdictionName={`${countyName} County`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Greywater Status */}
        <Card className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Greywater Status</p>
              <div className="text-sm text-gray-600 mt-1">
                {countyCompliance?.greywater_allowed !== false ? (
                  <Badge className="bg-green-100 text-green-800">Allowed</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">Not Allowed</Badge>
                )}
              </div>
              {countyCompliance?.permit_required && (
                <p className="text-xs text-gray-500 mt-2">Permit required</p>
              )}
            </div>
          </div>
        </Card>

        {/* Financial Incentives */}
        <Card className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Financial Incentives</p>
              <div className="text-sm text-gray-600 mt-1">
                {hasIncentives ? (
                  <>
                    <Badge className="bg-green-100 text-green-800">
                      {countyCompliance.incentive_count} Available
                    </Badge>
                    {maxIncentive && (
                      <p className="text-xs text-gray-500 mt-2">
                        Up to ${maxIncentive.toLocaleString()}
                      </p>
                    )}
                  </>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800">None Available</Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Cities in County */}
        {countyData?.city_count > 0 && (
          <Card className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Cities</p>
                <p className="text-sm text-gray-600 mt-1">
                  <Badge className="bg-purple-100 text-purple-800">
                    {countyData.city_count} Cities
                  </Badge>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  With local regulations
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Incentive Programs */}
      {hasIncentives && countyCompliance?.incentives?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Available Incentive Programs</h3>
          <div className="grid gap-4">
            {countyCompliance.incentives.map((program: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{program.program_name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {program.incentive_type || 'Rebate Program'}
                      </p>
                    </div>
                    {program.incentive_amount_max && (
                      <Badge className="bg-green-100 text-green-800">
                        Up to ${program.incentive_amount_max.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                  
                  {program.program_description && (
                    <p className="text-sm text-gray-600">{program.program_description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 text-xs">
                    {program.residential_eligibility && (
                      <Badge variant="outline">Residential</Badge>
                    )}
                    {program.commercial_eligibility && (
                      <Badge variant="outline">Commercial</Badge>
                    )}
                  </div>
                  
                  {program.incentive_url && (
                    <a 
                      href={program.incentive_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Compliance Summary */}
      {countyCompliance?.regulation_summary && (
        <Card className="p-4">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Compliance Summary</h3>
              <p className="text-sm text-gray-600">{countyCompliance.regulation_summary}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}