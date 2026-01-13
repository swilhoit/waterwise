"use client"

import React from 'react'
import {
  FileText, Check, AlertTriangle, Clock,
  Phone, ExternalLink, Wrench, BadgeCheck,
  Building2, MapPin, Droplets, CloudRain
} from 'lucide-react'

interface PermitData {
  permitType?: string
  permitRequired?: boolean | string
  thresholdGpd?: number
  permitAuthority?: string
  permitFramework?: string
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  keyRestrictions?: string[]
  applicationUrl?: string
  applicationMethod?: string
  requiredDocuments?: string[]
  typicalFees?: string
  feeMin?: number
  feeMax?: number
  processingDays?: number | string
  laundryToLandscapeAllowed?: boolean
  branchedDrainAllowed?: boolean
  surgeTankAllowed?: boolean
  indoorReuseAllowed?: boolean
  diyAllowed?: boolean
  licensedPlumberRequired?: boolean
  licensedContractorRequired?: boolean
  inspectionsRequired?: string[]
  departmentName?: string
  departmentPhone?: string
  departmentAddress?: string
  departmentHours?: string
  departmentUrl?: string
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
  waterType?: 'greywater' | 'rainwater'
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
  const isRainwater = waterType === 'rainwater'
  const Icon = isRainwater ? CloudRain : Droplets

  const themeColors = isRainwater ? {
    primary: 'cyan',
    headerBg: 'bg-gradient-to-r from-cyan-50 to-blue-50',
    headerBorder: 'border-cyan-100',
    iconBg: 'bg-cyan-600',
    accent: 'bg-cyan-50 border-cyan-100 text-cyan-700',
    button: 'bg-cyan-600 hover:bg-cyan-700'
  } : {
    primary: 'emerald',
    headerBg: 'bg-gradient-to-r from-emerald-50 to-green-50',
    headerBorder: 'border-emerald-100',
    iconBg: 'bg-emerald-600',
    accent: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    button: 'bg-emerald-600 hover:bg-emerald-700'
  }

  const data = permitData || (stateBaseline ? {
    thresholdGpd: stateBaseline.thresholdGpd,
    permitFramework: stateBaseline.permitFramework,
    applicationUrl: stateBaseline.stateGuidanceUrl,
    diyAllowed: stateBaseline.diyAllowed,
    exemptions: stateBaseline.exemptions,
    collectionLimitGallons: stateBaseline.collectionLimitGallons,
    keyRestrictions: stateBaseline.keyRestrictions
  } : null)

  if (!data) return null

  const hasDetailedData = permitData !== null
  const displayLocation = level === 'city' ? locationName : (stateName || locationName)

  // Determine permit status
  const getPermitStatus = () => {
    if (isRainwater) {
      const permitReq = typeof data.permitRequired === 'string' ? data.permitRequired.toLowerCase() : ''
      if (permitReq === 'no' || data.permitRequired === false) {
        return { text: 'No Permit Required', color: 'text-cyan-700', bg: 'bg-cyan-100' }
      }
      if (permitReq === 'conditional' || permitReq === 'tiered') {
        return { text: permitReq.charAt(0).toUpperCase() + permitReq.slice(1), color: 'text-amber-700', bg: 'bg-amber-100' }
      }
      return { text: 'Check Requirements', color: 'text-gray-700', bg: 'bg-gray-100' }
    }

    if (data.thresholdGpd) {
      return { text: `Under ${data.thresholdGpd} GPD: No Permit`, color: 'text-emerald-700', bg: 'bg-emerald-100' }
    }
    if (data.permitRequired === false) {
      return { text: 'No Permit Required', color: 'text-emerald-700', bg: 'bg-emerald-100' }
    }
    return { text: 'Permit Required', color: 'text-amber-700', bg: 'bg-amber-100' }
  }

  const permitStatus = getPermitStatus()

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`${themeColors.headerBg} px-6 py-4 border-b ${themeColors.headerBorder}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${themeColors.iconBg} rounded-xl flex items-center justify-center`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isRainwater ? 'Permit Requirements' : 'Permit Requirements'}
              </h2>
              <p className="text-sm text-gray-600">
                {level === 'state' ? displayLocation : `${displayLocation}, ${stateCode}`}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${permitStatus.bg} ${permitStatus.color}`}>
            {permitStatus.text}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Key Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Threshold / Collection Limit */}
          {!isRainwater && data.thresholdGpd && (
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-xs text-emerald-600 uppercase tracking-wide mb-1 font-medium">Permit-Free Threshold</p>
              <p className="text-2xl font-bold text-emerald-700">{data.thresholdGpd} GPD</p>
            </div>
          )}
          {isRainwater && (
            <div className={`rounded-xl p-4 border ${data.collectionLimitGallons ? 'bg-amber-50 border-amber-100' : 'bg-cyan-50 border-cyan-100'}`}>
              <p className={`text-xs uppercase tracking-wide mb-1 font-medium ${data.collectionLimitGallons ? 'text-amber-600' : 'text-cyan-600'}`}>
                Collection Limit
              </p>
              <p className={`text-2xl font-bold ${data.collectionLimitGallons ? 'text-amber-700' : 'text-cyan-700'}`}>
                {data.collectionLimitGallons ? `${data.collectionLimitGallons.toLocaleString()} gal` : 'Unlimited'}
              </p>
            </div>
          )}

          {/* Fees */}
          {(data.typicalFees || data.feeMin !== undefined || data.feeMax !== undefined) && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">Typical Fees</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.typicalFees || (data.feeMin === 0 && data.feeMax === 0 ? 'Free' : `$${data.feeMin || 0}-$${data.feeMax || 0}`)}
              </p>
            </div>
          )}

          {/* Processing Time */}
          {data.processingDays && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">Processing</p>
              <p className="text-2xl font-bold text-gray-900">
                {typeof data.processingDays === 'number' ? `${data.processingDays} days` : data.processingDays}
              </p>
            </div>
          )}

          {/* DIY Status */}
          {data.diyAllowed !== undefined && (
            <div className={`rounded-xl p-4 border ${data.diyAllowed ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
              <p className={`text-xs uppercase tracking-wide mb-1 font-medium ${data.diyAllowed ? 'text-emerald-600' : 'text-amber-600'}`}>
                DIY Installation
              </p>
              <p className={`text-2xl font-bold ${data.diyAllowed ? 'text-emerald-700' : 'text-amber-700'}`}>
                {data.diyAllowed ? 'Allowed' : 'Pro Required'}
              </p>
            </div>
          )}
        </div>

        {/* Exemptions */}
        {data.exemptions && data.exemptions.length > 0 && (
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 mb-6">
            <h3 className="flex items-center gap-2 text-emerald-800 font-semibold mb-3">
              <Check className="h-5 w-5" />
              When You DON'T Need a Permit
            </h3>
            <ul className="space-y-2">
              {data.exemptions.map((exemption, idx) => (
                <li key={idx} className="flex items-start gap-2 text-emerald-700 text-sm">
                  <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  {exemption}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Two Column: Systems/Documents + Requirements */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Left: System Types (greywater) or Documents */}
          <div className="space-y-4">
            {/* Allowed System Types - Greywater */}
            {!isRainwater && (data.laundryToLandscapeAllowed || data.branchedDrainAllowed || data.surgeTankAllowed || data.indoorReuseAllowed) && (
              <div>
                <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                  <Wrench className="h-4 w-4 text-emerald-600" />
                  Allowed System Types
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {data.laundryToLandscapeAllowed && (
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-800">Laundry-to-Landscape</span>
                    </div>
                  )}
                  {data.branchedDrainAllowed && (
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-800">Branched Drain</span>
                    </div>
                  )}
                  {data.surgeTankAllowed && (
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-800">Surge Tank</span>
                    </div>
                  )}
                  {data.indoorReuseAllowed && (
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg text-sm">
                      <Check className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800">Indoor Reuse</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Required Documents */}
            {data.requiredDocuments && data.requiredDocuments.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                  <FileText className="h-4 w-4 text-gray-600" />
                  Required Documents
                </h3>
                <ul className="space-y-1.5">
                  {data.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Installation Requirements */}
          <div className="space-y-4">
            <div>
              <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                <BadgeCheck className="h-4 w-4 text-gray-600" />
                Installation Requirements
              </h3>
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
                {data.licensedContractorRequired && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-gray-700">Licensed contractor required</span>
                  </div>
                )}
              </div>
            </div>

            {/* Inspections */}
            {data.inspectionsRequired && data.inspectionsRequired.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Required Inspections</h4>
                <ul className="space-y-1.5">
                  {data.inspectionsRequired.map((inspection, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      {inspection}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contact & Apply */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
          {data.departmentName ? (
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
                  <a href={`tel:${data.departmentPhone}`} className={`text-sm flex items-center gap-1 ${isRainwater ? 'text-cyan-600 hover:text-cyan-700' : 'text-emerald-600 hover:text-emerald-700'}`}>
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
          ) : level === 'city' ? (
            <div>
              <p className="text-sm text-gray-600">
                Based on {stateName || stateCode} state regulations
              </p>
            </div>
          ) : null}

          {data.applicationUrl && (
            <a
              href={data.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-white font-medium rounded-lg transition-colors ${themeColors.button}`}
            >
              {level === 'state' ? 'View State Guidelines' : 'Apply for Permit'}
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
