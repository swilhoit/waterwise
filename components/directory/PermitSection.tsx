"use client"

import React from 'react'
import {
  FileText, Check, AlertTriangle, DollarSign, Clock,
  Phone, ExternalLink, Wrench, ClipboardList, BadgeCheck,
  ChevronRight, Lightbulb, Building2, MapPin, Droplets, CloudRain, Gauge
} from 'lucide-react'

interface PermitData {
  // Basic info
  permitType?: string
  permitRequired?: boolean | string  // Support string for "Conditional", "Tiered", etc.
  thresholdGpd?: number
  permitAuthority?: string
  permitFramework?: string

  // Rainwater-specific
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  keyRestrictions?: string[]

  // Application
  applicationUrl?: string
  applicationMethod?: string
  requiredDocuments?: string[]
  typicalFees?: string
  feeMin?: number
  feeMax?: number
  processingDays?: number | string

  // System types (greywater)
  laundryToLandscapeAllowed?: boolean
  branchedDrainAllowed?: boolean
  surgeTankAllowed?: boolean
  indoorReuseAllowed?: boolean

  // Installation
  diyAllowed?: boolean
  licensedPlumberRequired?: boolean
  licensedContractorRequired?: boolean
  inspectionsRequired?: string[]

  // Contact
  departmentName?: string
  departmentPhone?: string
  departmentAddress?: string
  departmentHours?: string
  departmentUrl?: string

  // Additional
  exemptions?: string[]
  requirements?: string[]
  specialRequirements?: string[]
  tips?: string
  notes?: string
}

interface StateBaseline {
  thresholdGpd?: number
  permitFramework?: string
  stateGuidanceUrl?: string
  diyAllowed?: boolean
  exemptions?: string[]
  // Rainwater-specific
  collectionLimitGallons?: number | null
  keyRestrictions?: string[]
}

interface PermitSectionProps {
  level: 'state' | 'county' | 'city'
  locationName: string
  stateCode: string
  stateName?: string
  permitData: PermitData | null
  stateBaseline?: StateBaseline | null
  waterType?: 'greywater' | 'rainwater'  // NEW: Support both water types
}

export default function PermitSection({
  level,
  locationName,
  stateCode,
  stateName,
  permitData,
  stateBaseline,
  waterType = 'greywater'
}: PermitSectionProps) {
  // Theme colors based on water type
  const isRainwater = waterType === 'rainwater'
  const theme = isRainwater ? {
    primary: 'cyan',
    headerBg: 'from-cyan-50 to-blue-50',
    headerBorder: 'border-cyan-100',
    iconBg: 'bg-cyan-600',
    icon: CloudRain,
    accent: 'cyan',
    accentBg: 'bg-cyan-100',
    accentText: 'text-cyan-700',
    accentBorder: 'border-cyan-200'
  } : {
    primary: 'blue',
    headerBg: 'from-blue-50 to-indigo-50',
    headerBorder: 'border-blue-100',
    iconBg: 'bg-blue-600',
    icon: Droplets,
    accent: 'emerald',
    accentBg: 'bg-emerald-100',
    accentText: 'text-emerald-700',
    accentBorder: 'border-emerald-200'
  }
  const Icon = theme.icon

  // Use permit data if available, fall back to state baseline for cities/counties
  const data = permitData || (stateBaseline ? {
    thresholdGpd: stateBaseline.thresholdGpd,
    permitFramework: stateBaseline.permitFramework,
    applicationUrl: stateBaseline.stateGuidanceUrl,
    diyAllowed: stateBaseline.diyAllowed,
    exemptions: stateBaseline.exemptions,
    collectionLimitGallons: stateBaseline.collectionLimitGallons,
    keyRestrictions: stateBaseline.keyRestrictions
  } : null)

  if (!data) {
    return null
  }

  const hasDetailedData = permitData !== null
  const displayLocation = level === 'city' ? locationName : (stateName || locationName)
  const waterTypeLabel = isRainwater ? 'Rainwater Harvesting' : 'Greywater'

  // Determine permit status text
  const getPermitStatus = () => {
    // For rainwater with conditional/tiered permits
    if (isRainwater) {
      const permitReq = typeof data.permitRequired === 'string' ? data.permitRequired : ''
      if (permitReq.toLowerCase() === 'no' || data.permitRequired === false) {
        return {
          text: 'No Permit Required',
          color: 'text-cyan-700',
          bg: 'bg-cyan-100'
        }
      }
      if (permitReq.toLowerCase() === 'conditional') {
        return {
          text: 'Conditional',
          color: 'text-amber-700',
          bg: 'bg-amber-100'
        }
      }
      if (permitReq.toLowerCase() === 'tiered') {
        return {
          text: 'Tiered Requirements',
          color: 'text-amber-700',
          bg: 'bg-amber-100'
        }
      }
      return {
        text: permitReq || 'Check Local Rules',
        color: 'text-gray-700',
        bg: 'bg-gray-100'
      }
    }

    // Greywater logic
    if (data.thresholdGpd) {
      return {
        text: `Under ${data.thresholdGpd} GPD: No Permit`,
        color: 'text-emerald-700',
        bg: 'bg-emerald-100'
      }
    }
    if (data.permitRequired === false) {
      return {
        text: 'No Permit Required',
        color: 'text-emerald-700',
        bg: 'bg-emerald-100'
      }
    }
    return {
      text: 'Permit Required',
      color: 'text-amber-700',
      bg: 'bg-amber-100'
    }
  }

  const permitStatus = getPermitStatus()

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.headerBg} px-6 py-5 border-b ${theme.headerBorder}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${theme.iconBg} rounded-xl flex items-center justify-center`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isRainwater ? 'Rainwater Harvesting Permits' : 'How to Get a Greywater Permit'}
              </h2>
              <p className="text-gray-600">
                {level === 'state' ? `${displayLocation} statewide requirements` : `Requirements for ${displayLocation}, ${stateCode}`}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${permitStatus.bg} ${permitStatus.color}`}>
            {permitStatus.text}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Threshold (Greywater) or Collection Limit (Rainwater) */}
          {!isRainwater && data.thresholdGpd && (
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-xs text-emerald-600 uppercase tracking-wide mb-1 font-medium">Permit-Free Threshold</p>
              <p className="text-2xl font-bold text-emerald-700">{data.thresholdGpd} GPD</p>
              <p className="text-xs text-emerald-600 mt-1">gallons per day</p>
            </div>
          )}

          {/* Rainwater Collection Limit */}
          {isRainwater && (
            <div className={`rounded-xl p-4 border ${data.collectionLimitGallons && data.collectionLimitGallons > 0 ? 'bg-amber-50 border-amber-100' : 'bg-cyan-50 border-cyan-100'}`}>
              <p className={`text-xs uppercase tracking-wide mb-1 font-medium ${data.collectionLimitGallons && data.collectionLimitGallons > 0 ? 'text-amber-600' : 'text-cyan-600'}`}>Collection Limit</p>
              <p className={`text-2xl font-bold ${data.collectionLimitGallons && data.collectionLimitGallons > 0 ? 'text-amber-700' : 'text-cyan-700'}`}>
                {data.collectionLimitGallons && data.collectionLimitGallons > 0 ? `${data.collectionLimitGallons.toLocaleString()} gal` : 'Unlimited'}
              </p>
              <p className={`text-xs mt-1 ${data.collectionLimitGallons && data.collectionLimitGallons > 0 ? 'text-amber-600' : 'text-cyan-600'}`}>
                {data.collectionLimitGallons && data.collectionLimitGallons > 0 ? 'maximum capacity' : 'no restrictions'}
              </p>
            </div>
          )}

          {/* Fees */}
          {(data.typicalFees || data.feeMin !== undefined || data.feeMax !== undefined) && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">Typical Fees</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.typicalFees || (data.feeMin === 0 && data.feeMax === 0 ? 'Free' :
                  data.feeMin === 0 ? `Up to $${data.feeMax}` : `$${data.feeMin}-$${data.feeMax}`)}
              </p>
            </div>
          )}

          {/* Processing Time */}
          {data.processingDays && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {typeof data.processingDays === 'number' ? `${data.processingDays} days` : data.processingDays}
              </p>
            </div>
          )}

          {/* DIY Status */}
          {data.diyAllowed !== undefined && (
            <div className={`rounded-xl p-4 border ${data.diyAllowed ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
              <p className={`text-xs uppercase tracking-wide mb-1 font-medium ${data.diyAllowed ? 'text-emerald-600' : 'text-amber-600'}`}>DIY Installation</p>
              <p className={`text-2xl font-bold ${data.diyAllowed ? 'text-emerald-700' : 'text-amber-700'}`}>
                {data.diyAllowed ? 'Allowed' : 'Pro Required'}
              </p>
            </div>
          )}
        </div>

        {/* Permit Exemptions - Prominent callout */}
        {data.exemptions && data.exemptions.length > 0 && (
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 mb-6">
            <h3 className="flex items-center gap-2 text-emerald-800 font-semibold mb-3">
              <Check className="h-5 w-5" />
              When You DON'T Need a Permit
            </h3>
            <ul className="space-y-2">
              {data.exemptions.map((exemption, idx) => (
                <li key={idx} className="flex items-start gap-2 text-emerald-700">
                  <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{exemption}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column - Steps & Requirements */}
          <div className="space-y-6">
            {/* Permit Application Steps */}
            <div>
              <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
                <ClipboardList className={`h-5 w-5 ${isRainwater ? 'text-cyan-600' : 'text-blue-600'}`} />
                {isRainwater ? 'Understanding Permit Requirements' : 'How to Apply for a Permit'}
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className={`w-7 h-7 rounded-full ${isRainwater ? 'bg-cyan-600' : 'bg-blue-600'} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>1</div>
                  <div>
                    <p className="font-medium text-gray-900">Check if you need a permit</p>
                    <p className="text-sm text-gray-600">
                      {isRainwater
                        ? (typeof data.permitRequired === 'string' && data.permitRequired.toLowerCase() === 'no'
                          ? 'Most residential rainwater systems don\'t require permits'
                          : typeof data.permitRequired === 'string' && data.permitRequired.toLowerCase() === 'conditional'
                            ? 'Indoor use or larger systems may require permits'
                            : 'Review your system size against local requirements')
                        : data.thresholdGpd
                          ? `Systems under ${data.thresholdGpd} GPD are typically exempt`
                          : 'Review your system size and type against local requirements'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className={`w-7 h-7 rounded-full ${isRainwater ? 'bg-cyan-600' : 'bg-blue-600'} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>2</div>
                  <div>
                    <p className="font-medium text-gray-900">{isRainwater ? 'Choose your system type' : 'Gather required documents'}</p>
                    <p className="text-sm text-gray-600">
                      {isRainwater
                        ? 'Rain barrels for small gardens, cisterns for larger needs'
                        : data.requiredDocuments?.length
                          ? `Prepare: ${data.requiredDocuments.slice(0, 2).join(', ')}${data.requiredDocuments.length > 2 ? ', etc.' : ''}`
                          : 'Site plan, system specifications, and property information'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className={`w-7 h-7 rounded-full ${isRainwater ? 'bg-cyan-600' : 'bg-blue-600'} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>3</div>
                  <div>
                    <p className="font-medium text-gray-900">{isRainwater ? 'Install properly' : 'Submit application'}</p>
                    <p className="text-sm text-gray-600">
                      {isRainwater
                        ? 'Ensure proper roof collection, first flush diverter, and overflow'
                        : data.applicationMethod
                          ? `Apply ${data.applicationMethod.toLowerCase()}`
                          : 'Contact your local building department'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className={`w-7 h-7 rounded-full ${isRainwater ? 'bg-cyan-600' : 'bg-blue-600'} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>4</div>
                  <div>
                    <p className="font-medium text-gray-900">{isRainwater ? 'Use appropriately' : 'Install & schedule inspection'}</p>
                    <p className="text-sm text-gray-600">
                      {isRainwater
                        ? 'Non-potable uses: irrigation, car washing, toilet flushing'
                        : data.inspectionsRequired?.length
                          ? `Required: ${data.inspectionsRequired.join(', ')}`
                          : 'Complete installation and request final inspection'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Documents - mainly for greywater */}
            {!isRainwater && data.requiredDocuments && data.requiredDocuments.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                  <FileText className="h-4 w-4 text-gray-600" />
                  Required Documents
                </h4>
                <ul className="grid gap-2">
                  {data.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - System Types & Installation */}
          <div className="space-y-6">
            {/* Allowed System Types - Greywater only */}
            {!isRainwater && (data.laundryToLandscapeAllowed !== undefined || data.branchedDrainAllowed !== undefined) && (
              <div>
                <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  Allowed Greywater Systems
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {data.laundryToLandscapeAllowed && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-800">Laundry-to-Landscape</span>
                    </div>
                  )}
                  {data.branchedDrainAllowed && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-800">Branched Drain</span>
                    </div>
                  )}
                  {data.surgeTankAllowed && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-800">Surge Tank</span>
                    </div>
                  )}
                  {data.indoorReuseAllowed && (
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <Check className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Indoor Reuse</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Key Restrictions - Rainwater only */}
            {isRainwater && data.keyRestrictions && data.keyRestrictions.length > 0 && (
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <h4 className="flex items-center gap-2 text-amber-800 font-semibold mb-3">
                  <AlertTriangle className="h-4 w-4" />
                  Key Restrictions
                </h4>
                <ul className="space-y-2">
                  {data.keyRestrictions.map((restriction, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                      <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      {restriction}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Installation Requirements */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h4 className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                <BadgeCheck className="h-4 w-4 text-gray-600" />
                Installation Requirements
              </h4>
              <div className="space-y-2">
                {data.diyAllowed !== undefined && (
                  <div className="flex items-center gap-2 text-sm">
                    {data.diyAllowed ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="text-gray-700">DIY installation allowed</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="text-gray-700">Professional installation required</span>
                      </>
                    )}
                  </div>
                )}
                {data.licensedPlumberRequired && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-gray-700">Licensed plumber required</span>
                  </div>
                )}
                {data.inspectionsRequired && data.inspectionsRequired.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 uppercase mb-2">Required Inspections</p>
                    {data.inspectionsRequired.map((inspection, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {inspection}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Statewide Requirements */}
            {data.requirements && data.requirements.length > 0 && (
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <h4 className="flex items-center gap-2 text-amber-800 font-semibold mb-3">
                  <AlertTriangle className="h-4 w-4" />
                  Key Requirements
                </h4>
                <ul className="space-y-2">
                  {data.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                      <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Pro Tips */}
        {data.tips && (
          <div className={`rounded-xl p-4 border mb-6 ${isRainwater ? 'bg-cyan-50 border-cyan-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-start gap-3">
              <Lightbulb className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isRainwater ? 'text-cyan-600' : 'text-blue-600'}`} />
              <div>
                <p className={`font-medium mb-1 ${isRainwater ? 'text-cyan-800' : 'text-blue-800'}`}>Pro Tip</p>
                <p className={isRainwater ? 'text-cyan-700' : 'text-blue-700'}>{data.tips}</p>
              </div>
            </div>
          </div>
        )}

        {/* Governing Code Reference */}
        {data.permitFramework && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Governing Code</p>
            <p className="text-gray-900 font-medium">{data.permitFramework}</p>
          </div>
        )}

        {/* Contact & Apply Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
          {hasDetailedData && data.departmentName ? (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-gray-500" />
                <p className="font-medium text-gray-900">{data.departmentName}</p>
              </div>
              {data.departmentAddress && (
                <p className="text-sm text-gray-600 flex items-center gap-1 ml-6">
                  <MapPin className="h-3 w-3" />
                  {data.departmentAddress}
                </p>
              )}
              <div className="flex flex-wrap gap-4 mt-2 ml-6">
                {data.departmentPhone && (
                  <a href={`tel:${data.departmentPhone}`} className={`text-sm flex items-center gap-1 ${isRainwater ? 'text-cyan-600 hover:text-cyan-700' : 'text-blue-600 hover:text-blue-700'}`}>
                    <Phone className="h-3 w-3" />
                    {data.departmentPhone}
                  </a>
                )}
                {data.departmentHours && (
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {data.departmentHours}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className="font-medium text-gray-900">
                {isRainwater ? 'Check local regulations' : 'Contact your local building department'}
              </p>
              <p className="text-sm text-gray-600">
                for specific {isRainwater ? 'rainwater collection' : 'permit'} requirements in {locationName}
              </p>
            </div>
          )}

          {data.applicationUrl && (
            <a
              href={data.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-white font-medium rounded-lg transition-colors ${isRainwater ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {level === 'state' ? 'View State Guidelines' : isRainwater ? 'Learn More' : 'Apply for Permit'}
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Note for cities without detailed data */}
        {!hasDetailedData && level === 'city' && (
          <p className="text-xs text-gray-400 mt-4 text-center">
            Showing {stateName || stateCode} state requirements. Contact {locationName} building department for local specifics.
          </p>
        )}
      </div>
    </div>
  )
}
