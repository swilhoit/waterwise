"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronDown, Search, Check, ExternalLink, Phone, Mail, Building2, FileText, Droplets, AlertTriangle, Clock, DollarSign, ShieldCheck, Gauge, MapPin, ListChecks, ClipboardList, CloudRain, Leaf, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { nameToSlug, findBySlug } from '@/lib/url-utils'
import DirectoryCTA from './DirectoryCTA'

// Resource type configuration
type ResourceType = 'all' | 'greywater' | 'rainwater' | 'conservation'

const RESOURCE_TYPES: { id: ResourceType; label: string; icon: any; bgColor: string; color: string }[] = [
  { id: 'all', label: 'All', icon: Droplets, bgColor: 'bg-gray-100', color: 'text-gray-700' },
  { id: 'greywater', label: 'Greywater', icon: Droplets, bgColor: 'bg-teal-50', color: 'text-teal-700' },
  { id: 'rainwater', label: 'Rainwater', icon: CloudRain, bgColor: 'bg-teal-50', color: 'text-teal-700' },
  { id: 'conservation', label: 'Conservation', icon: Leaf, bgColor: 'bg-teal-50', color: 'text-teal-700' },
]

// =============================================================================
// TYPES
// =============================================================================

interface StateItem {
  state_jurisdiction_id?: string
  state_name?: string
  state_code?: string
  legalStatus?: string
  county_count?: number
  city_count?: number
}

interface CountyItem {
  county_jurisdiction_id?: string
  county_name?: string
  city_count?: number
}

interface CityItem {
  city_jurisdiction_id?: string
  city_name?: string
  county_name?: string
  population?: number
  has_greywater_policy?: number
}

interface ComplianceData {
  state?: any
  county?: any
  city?: any
  effective?: any
}

// Greywater-specific regulation data
interface GreywaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  permitExplanation?: string
  permitProcess?: string
  permitThresholdGpd?: number | null
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  approvedUses?: string[]
  keyRestrictions?: string[]
  recentChanges?: string | null
  regulatoryClassification?: string
  summary?: string
}

// Rainwater-specific regulation data
interface RainwaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  permitExplanation?: string
  permitProcess?: string
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  taxIncentives?: string
  approvedUses?: string[]
  keyRestrictions?: string[]
  recentChanges?: string | null
  regulatoryClassification?: string
  summary?: string
}

// Agency info
interface AgencyData {
  name?: string
  contact?: string
  phone?: string
  website?: string
}

// Incentive summary
interface IncentiveSummary {
  total: number
  greywater: number
  rainwater: number
  conservation: number
  maxRebate: number
}

// Unified state data from API
interface UnifiedStateData {
  state_code: string
  state_name: string
  greywater: GreywaterData | null
  rainwater: RainwaterData | null
  conservation: {
    hasRegulations: boolean
    message: string
    incentiveCount: number
  }
  agency: AgencyData | null
  incentives: IncentiveSummary
  lastUpdated?: string
}

// =============================================================================
// DATA COMPLETENESS HELPERS
// =============================================================================

type DataConfidence = 'verified' | 'partial' | 'unknown'

interface DataCompletenessResult {
  confidence: DataConfidence
  label: string
  description: string
}

// Determine data completeness for greywater regulations
const getGreywaterDataCompleteness = (data: GreywaterData | null | undefined): DataCompletenessResult => {
  if (!data) {
    return {
      confidence: 'unknown',
      label: 'Regulations Unknown',
      description: 'We have not yet verified greywater regulations for this jurisdiction.'
    }
  }

  // Check for key fields that indicate verified data
  const hasLegalStatus = !!data.legalStatus
  const hasPermitInfo = data.permitRequired !== undefined && data.permitRequired !== null
  const hasGoverningCode = !!data.governingCode
  const hasUseInfo = data.indoorUseAllowed !== undefined || data.outdoorUseAllowed !== undefined

  const completenessScore = [hasLegalStatus, hasPermitInfo, hasGoverningCode, hasUseInfo].filter(Boolean).length

  if (completenessScore >= 3) {
    return {
      confidence: 'verified',
      label: 'Verified',
      description: 'This information has been verified against official sources.'
    }
  } else if (completenessScore >= 1) {
    return {
      confidence: 'partial',
      label: 'Partial Data',
      description: 'Some information may be incomplete. Contact local authorities to confirm.'
    }
  }

  return {
    confidence: 'unknown',
    label: 'Regulations Unknown',
    description: 'We have not yet verified greywater regulations for this jurisdiction.'
  }
}

// Determine data completeness for rainwater regulations
const getRainwaterDataCompleteness = (data: RainwaterData | null | undefined): DataCompletenessResult => {
  if (!data) {
    return {
      confidence: 'unknown',
      label: 'Regulations Unknown',
      description: 'We have not yet verified rainwater regulations for this jurisdiction.'
    }
  }

  const hasLegalStatus = !!data.legalStatus
  const hasPermitInfo = data.permitRequired !== undefined && data.permitRequired !== null
  const hasGoverningCode = !!data.governingCode
  const hasCollectionLimit = data.collectionLimitGallons !== undefined

  const completenessScore = [hasLegalStatus, hasPermitInfo, hasGoverningCode, hasCollectionLimit].filter(Boolean).length

  if (completenessScore >= 3) {
    return {
      confidence: 'verified',
      label: 'Verified',
      description: 'This information has been verified against official sources.'
    }
  } else if (completenessScore >= 1) {
    return {
      confidence: 'partial',
      label: 'Partial Data',
      description: 'Some information may be incomplete. Contact local authorities to confirm.'
    }
  }

  return {
    confidence: 'unknown',
    label: 'Regulations Unknown',
    description: 'We have not yet verified rainwater regulations for this jurisdiction.'
  }
}

// Data Confidence Badge Component
const DataConfidenceBadge = ({ completeness, showDescription = false }: { completeness: DataCompletenessResult, showDescription?: boolean }) => {
  const config = {
    verified: {
      icon: CheckCircle2,
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    partial: {
      icon: AlertCircle,
      className: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    unknown: {
      icon: HelpCircle,
      className: 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const { icon: Icon, className } = config[completeness.confidence]

  return (
    <div className="inline-flex flex-col">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
        <Icon className="h-3 w-3" />
        {completeness.label}
      </span>
      {showDescription && (
        <span className="text-xs text-gray-500 mt-1">{completeness.description}</span>
      )}
    </div>
  )
}

// Format last updated date
const formatLastUpdated = (dateString?: string): string => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

// Get regulation status badge based on data completeness
const getRegulationStatusBadge = (greywaterData: GreywaterData | null | undefined) => {
  const completeness = getGreywaterDataCompleteness(greywaterData)

  if (completeness.confidence === 'unknown') {
    return {
      icon: HelpCircle,
      className: 'bg-gray-100 text-gray-600',
      label: 'Contact Local Authority'
    }
  }

  if (greywaterData?.legalStatus) {
    return {
      icon: Droplets,
      className: 'bg-emerald-100 text-emerald-700',
      label: `Greywater ${greywaterData.legalStatus}`
    }
  }

  return {
    icon: HelpCircle,
    className: 'bg-gray-100 text-gray-600',
    label: 'Contact Local Authority'
  }
}

interface SimpleDirectoryViewProps {
  initialState?: string
  initialCounty?: string
  initialCity?: string
  basePath?: string
  initialData?: any[]
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function SimpleDirectoryView({
  initialState,
  initialCounty,
  initialCity,
  basePath = '/directory',
  initialData = []
}: SimpleDirectoryViewProps) {
  const router = useRouter()

  // Find initial selected state from initialData if available
  const initialSelectedState = initialState && initialData.length > 0
    ? initialData.find((s: StateItem) => s.state_code === initialState) || null
    : null

  // Data states
  const [states, setStates] = useState<StateItem[]>(initialData)
  const [counties, setCounties] = useState<CountyItem[]>([])
  const [cities, setCities] = useState<CityItem[]>([])
  const [allCities, setAllCities] = useState<CityItem[]>([])
  const [compliance, setCompliance] = useState<ComplianceData | null>(null)
  const [stateData, setStateData] = useState<UnifiedStateData | null>(null)

  // Computed: greywater data for backward compatibility with county/city pages
  const stateStaticData = stateData?.greywater ? {
    ...stateData.greywater,
    primaryAgency: stateData.agency?.name,
    agencyPhone: stateData.agency?.phone,
    governmentWebsite: stateData.agency?.website,
    state_name: stateData.state_name,
    state_code: stateData.state_code
  } : null

  // Selection states - initialize from initialData if available
  const [selectedState, setSelectedState] = useState<StateItem | null>(initialSelectedState)
  const [selectedCounty, setSelectedCounty] = useState<CountyItem | null>(null)
  const [selectedCity, setSelectedCity] = useState<CityItem | null>(null)

  // UI states
  const [loading, setLoading] = useState(!initialData.length && !initialSelectedState)
  const [searchTerm, setSearchTerm] = useState('')
  const [citiesSearchTerm, setCitiesSearchTerm] = useState('')
  const [countiesSearchTerm, setCountiesSearchTerm] = useState('')
  const [showAllCities, setShowAllCities] = useState(false)
  const [viewMode, setViewMode] = useState<'cities' | 'counties'>('cities')
  const [resourceTypeFilter, setResourceTypeFilter] = useState<ResourceType>('all')
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<'all' | 'residential' | 'commercial'>('all')
  const [programTypeFilter, setProgramTypeFilter] = useState<'all' | 'rebates' | 'tax' | 'grants'>('all')
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())
  const INITIAL_CITIES_SHOWN = 50

  // Toggle program expansion
  const toggleProgramExpanded = (programName: string) => {
    setExpandedPrograms(prev => {
      const next = new Set(prev)
      if (next.has(programName)) {
        next.delete(programName)
      } else {
        next.add(programName)
      }
      return next
    })
  }

  // Get resource type badge styling - teal accent
  const getResourceTypeBadge = (resourceType: string) => {
    switch (resourceType) {
      case 'rainwater':
        return { className: 'bg-teal-50 text-teal-700 border border-teal-200', label: 'Rainwater', icon: CloudRain }
      case 'conservation':
        return { className: 'bg-teal-50 text-teal-700 border border-teal-200', label: 'Conservation', icon: Leaf }
      case 'greywater':
      default:
        return { className: 'bg-teal-50 text-teal-700 border border-teal-200', label: 'Greywater', icon: Droplets }
    }
  }

  // Get program subtype badge for conservation programs - minimal
  const getSubtypeBadge = (subtype: string) => {
    const subtypes: Record<string, { label: string; className: string }> = {
      'turf_removal': { label: 'Turf Removal', className: 'border border-gray-200 text-gray-600' },
      'smart_irrigation': { label: 'Smart Irrigation', className: 'border border-gray-200 text-gray-600' },
      'efficient_fixtures': { label: 'Efficient Fixtures', className: 'border border-gray-200 text-gray-600' },
      'pool_covers': { label: 'Pool Covers', className: 'border border-gray-200 text-gray-600' },
      'leak_detection': { label: 'Leak Detection', className: 'border border-gray-200 text-gray-600' },
      'water_audit': { label: 'Water Audit', className: 'border border-gray-200 text-gray-600' },
      'appliance_rebate': { label: 'Appliance', className: 'border border-gray-200 text-gray-600' },
    }
    return subtypes[subtype] || null
  }

  // Filter incentives by resource type
  const filterIncentivesByResourceType = (incentives: any[]) => {
    if (resourceTypeFilter === 'all') return incentives
    return incentives.filter(p => {
      const pType = p.resource_type || 'greywater'
      return pType === resourceTypeFilter
    })
  }

  // Top California cities by population (for sorting)
  const TOP_CA_CITIES = [
    'Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno',
    'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim',
    'Santa Ana', 'Riverside', 'Stockton', 'Irvine', 'Chula Vista',
    'Fremont', 'San Bernardino', 'Modesto', 'Fontana', 'Moreno Valley',
    'Santa Clarita', 'Glendale', 'Huntington Beach', 'Garden Grove', 'Oceanside',
    'Rancho Cucamonga', 'Santa Rosa', 'Ontario', 'Elk Grove', 'Corona',
    'Lancaster', 'Palmdale', 'Salinas', 'Pomona', 'Hayward',
    'Escondido', 'Sunnyvale', 'Torrance', 'Pasadena', 'Orange',
    'Fullerton', 'Thousand Oaks', 'Roseville', 'Concord', 'Simi Valley',
    'Santa Clara', 'Victorville', 'Vallejo', 'Berkeley', 'El Monte'
  ]

  // ==========================================================================
  // DATA FETCHING
  // ==========================================================================

  const fetchStates = async () => {
    try {
      const res = await fetch('/api/greywater-directory/hierarchy?level=states')
      const data = await res.json()
      if (data.status === 'success') {
        const mapped = data.data.map((state: StateItem) => ({
          ...state,
          legalStatus: state.legalStatus || 'Legal'
        }))
        setStates(mapped)
      }
    } catch (err) {
      console.error('Failed to fetch states:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCounties = async (stateId: string) => {
    try {
      const res = await fetch(`/api/greywater-directory/hierarchy?level=counties&parentId=${stateId}`)
      const data = await res.json()
      if (data.status === 'success') setCounties(data.data)
    } catch (err) {
      console.error('Failed to fetch counties:', err)
    }
  }

  const fetchCities = async (countyId: string) => {
    try {
      const res = await fetch(`/api/greywater-directory/hierarchy?level=cities&parentId=${countyId}&parentType=county`)
      const data = await res.json()
      if (data.status === 'success') setCities(data.data)
    } catch (err) {
      console.error('Failed to fetch cities:', err)
    }
  }

  const fetchAllCitiesForState = async (stateId: string) => {
    try {
      const res = await fetch(`/api/greywater-directory/hierarchy?level=cities&parentId=${stateId}&parentType=state`)
      const data = await res.json()
      if (data.status === 'success') setAllCities(data.data)
    } catch (err) {
      console.error('Failed to fetch cities:', err)
    }
  }

  const fetchCompliance = async (state: string, county?: string, city?: string) => {
    try {
      const params = new URLSearchParams({ state })
      if (county) params.append('county', county)
      if (city) params.append('city', city)
      const res = await fetch(`/api/greywater-directory/compliance?${params}`)
      const data = await res.json()
      if (data.status === 'success') setCompliance(data.compliance)
    } catch (err) {
      console.error('Failed to fetch compliance:', err)
    }
  }

  const fetchStateStaticData = async (stateCode: string) => {
    try {
      // Fetch unified state data (includes greywater, rainwater, conservation, agency)
      const res = await fetch(`/api/greywater-directory/state-data?state=${stateCode}`)
      const data = await res.json()
      if (data.status === 'success') {
        setStateData(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch state data:', err)
    }
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================

  useEffect(() => {
    const init = async () => {
      let statesData = initialData.length > 0 ? initialData : []

      if (statesData.length === 0 && !initialState) {
        await fetchStates()
        return
      }

      if (statesData.length === 0 && initialState) {
        const res = await fetch('/api/greywater-directory/hierarchy?level=states')
        const data = await res.json()
        if (data.status === 'success') {
          statesData = data.data.map((state: StateItem) => ({
            ...state,
            legalStatus: state.legalStatus || 'Legal'
          }))
          setStates(statesData)
          setLoading(false)
        }
      }

      if (initialState && statesData.length > 0) {
        const state = statesData.find((s: StateItem) => s.state_code === initialState)
        if (state) {
          setSelectedState(state)
          fetchStateStaticData(initialState)

          if (state.state_jurisdiction_id) {
            fetchCounties(state.state_jurisdiction_id)
            fetchAllCitiesForState(state.state_jurisdiction_id)
          }

          if (initialCounty) {
            const countiesRes = await fetch(`/api/greywater-directory/hierarchy?level=counties&parentId=${state.state_jurisdiction_id}`)
            const countiesData = await countiesRes.json()
            if (countiesData.status === 'success') {
              const county = findBySlug(countiesData.data, initialCounty, 'county_name')
              if (county) {
                setSelectedCounty(county)
                fetchCities(county.county_jurisdiction_id)

                if (initialCity) {
                  const citiesRes = await fetch(`/api/greywater-directory/hierarchy?level=cities&parentId=${county.county_jurisdiction_id}&parentType=county`)
                  const citiesData = await citiesRes.json()
                  if (citiesData.status === 'success') {
                    const city = findBySlug(citiesData.data, initialCity, 'city_name')
                    if (city) {
                      setSelectedCity(city)
                      fetchCompliance(initialState, county.county_name, city.city_name)
                    }
                  }
                } else {
                  fetchCompliance(initialState, county.county_name)
                }
              }
            }
          } else {
            fetchCompliance(initialState)
          }
        }
      }
    }
    init()
  }, [initialState, initialCounty, initialCity, initialData])

  // ==========================================================================
  // NAVIGATION
  // ==========================================================================

  const navigateToState = (state: StateItem) => {
    router.push(`${basePath}/${state.state_code}`)
  }

  const navigateToCounty = (county: CountyItem) => {
    router.push(`${basePath}/${selectedState?.state_code}/${nameToSlug(county.county_name || '')}`)
  }

  const navigateToCity = (city: CityItem) => {
    const countySlug = city.county_name ? nameToSlug(city.county_name) : nameToSlug(selectedCounty?.county_name || '')
    router.push(`${basePath}/${selectedState?.state_code}/${countySlug}/${nameToSlug(city.city_name || '')}`)
  }

  // ==========================================================================
  // RENDER: STATES LIST (Level 1)
  // ==========================================================================

  if (!initialState) {
    const filteredStates = states.filter(s =>
      s.state_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.state_code?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Regulations Directory</h1>
          <p className="text-gray-500">Find greywater and rainwater regulations by state</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors text-sm"
          />
        </div>

        {/* States Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-5 w-5 border border-gray-300 border-t-gray-600 rounded-full mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredStates.map((state) => (
              <button
                key={state.state_jurisdiction_id}
                onClick={() => navigateToState(state)}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-sm transition-all text-left group"
              >
                <p className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">{state.state_name}</p>
                <p className="text-xs text-gray-400 mt-1">{state.city_count || 0} cities</p>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ==========================================================================
  // RENDER: STATE PAGE (Level 2) - UNIFIED SIDE-BY-SIDE VIEW
  // ==========================================================================

  if (selectedState && !selectedCounty && !selectedCity) {
    // Sort cities: top cities first (alphabetically), then remaining cities alphabetically
    const sortedCities = [...allCities].sort((a, b) => {
      const aIsTop = TOP_CA_CITIES.some(c => c.toLowerCase() === a.city_name?.toLowerCase())
      const bIsTop = TOP_CA_CITIES.some(c => c.toLowerCase() === b.city_name?.toLowerCase())
      if (aIsTop && bIsTop) return (a.city_name || '').localeCompare(b.city_name || '')
      if (aIsTop) return -1
      if (bIsTop) return 1
      return (a.city_name || '').localeCompare(b.city_name || '')
    })

    const filteredCities = sortedCities.filter(c =>
      c.city_name?.toLowerCase().includes(citiesSearchTerm.toLowerCase())
    )

    const filteredCounties = counties.filter(c =>
      c.county_name?.toLowerCase().includes(countiesSearchTerm.toLowerCase())
    ).sort((a, b) => (a.county_name || '').localeCompare(b.county_name || ''))

    // Helper to get status badge color - teal accent
    const getStatusBadgeClass = () => {
      return 'bg-teal-50 text-teal-700 border border-teal-200'
    }

    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <button onClick={() => router.push(basePath)} className="text-gray-500 hover:text-emerald-600">
              All States
            </button>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <span className="text-gray-900 font-medium">{selectedState.state_name}</span>
          </nav>

          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{selectedState.state_name}</h1>
                  {stateData && (
                    <DataConfidenceBadge completeness={getGreywaterDataCompleteness(stateData.greywater)} />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const badge = getRegulationStatusBadge(stateData?.greywater)
                    const Icon = badge.icon
                    return (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${badge.className} rounded-full text-sm font-medium`}>
                        <Icon className="h-3.5 w-3.5" />
                        {badge.label}
                      </span>
                    )
                  })()}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {selectedState.city_count} cities
                  </span>
                </div>
                {stateData?.lastUpdated && (
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last verified: {formatLastUpdated(stateData.lastUpdated)}
                  </p>
                )}
              </div>
              {(stateData?.incentives?.total ?? 0) > 0 && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">{stateData?.incentives?.total}</p>
                  <p className="text-sm text-gray-500">Incentive Programs</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Changes Alert */}
          {(stateData?.greywater?.recentChanges || stateData?.rainwater?.recentChanges) && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-800 text-sm">Recent Update</p>
                  <p className="text-sm text-amber-700">
                    {stateData?.greywater?.recentChanges || stateData?.rainwater?.recentChanges}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Greywater Regulations Card */}
            {stateData?.greywater && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-emerald-50 px-5 py-3 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-emerald-600" />
                    Greywater Regulations
                  </h2>
                </div>
                <div className="p-0">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-5 py-3 text-gray-600 bg-gray-50 w-2/5">Status</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{stateData.greywater.legalStatus || 'Legal'}</td>
                      </tr>
                      {stateData.greywater.regulatoryClassification && (
                        <tr>
                          <td className="px-5 py-3 text-gray-600 bg-gray-50">Classification</td>
                          <td className="px-5 py-3 text-gray-900">{stateData.greywater.regulatoryClassification}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="px-5 py-3 text-gray-600 bg-gray-50">Allowed Uses</td>
                        <td className="px-5 py-3 text-gray-900">
                          {[
                            stateData.greywater.outdoorUseAllowed && 'Outdoor',
                            stateData.greywater.indoorUseAllowed && 'Indoor'
                          ].filter(Boolean).join(', ') || 'Varies'}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-gray-600 bg-gray-50">Permit</td>
                        <td className="px-5 py-3 text-gray-900">{stateData.greywater.permitRequired || 'Varies'}</td>
                      </tr>
                      {stateData.greywater.permitThresholdGpd !== null && stateData.greywater.permitThresholdGpd !== undefined && (
                        <tr>
                          <td className="px-5 py-3 text-gray-600 bg-gray-50">No-Permit Limit</td>
                          <td className="px-5 py-3 text-gray-900">
                            {stateData.greywater.permitThresholdGpd > 0 ? `Under ${stateData.greywater.permitThresholdGpd} GPD` : 'All need permit'}
                          </td>
                        </tr>
                      )}
                      {stateData.greywater.governingCode && (
                        <tr>
                          <td className="px-5 py-3 text-gray-600 bg-gray-50">Code</td>
                          <td className="px-5 py-3 text-gray-900 text-xs">{stateData.greywater.governingCode}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Rainwater Regulations Card */}
            {stateData?.rainwater && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-cyan-50 px-5 py-3 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-cyan-600" />
                    Rainwater Regulations
                  </h2>
                </div>
                <div className="p-0">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-5 py-3 text-gray-600 bg-gray-50 w-2/5">Status</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{stateData.rainwater.legalStatus || 'Legal'}</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-gray-600 bg-gray-50">Collection Limit</td>
                        <td className="px-5 py-3 text-gray-900">
                          {stateData.rainwater.collectionLimitGallons && stateData.rainwater.collectionLimitGallons > 0
                            ? `${stateData.rainwater.collectionLimitGallons.toLocaleString()} gal`
                            : 'Unlimited'}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-gray-600 bg-gray-50">Potable Use</td>
                        <td className="px-5 py-3 text-gray-900">
                          {stateData.rainwater.potableUseAllowed ? 'Allowed (with treatment)' : 'Non-potable only'}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-gray-600 bg-gray-50">Permit</td>
                        <td className="px-5 py-3 text-gray-900">{stateData.rainwater.permitRequired || 'No'}</td>
                      </tr>
                      {stateData.rainwater.taxIncentives && (
                        <tr>
                          <td className="px-5 py-3 text-gray-600 bg-gray-50">Tax Incentives</td>
                          <td className="px-5 py-3 text-gray-900 text-xs">{stateData.rainwater.taxIncentives}</td>
                        </tr>
                      )}
                      {stateData.rainwater.governingCode && (
                        <tr>
                          <td className="px-5 py-3 text-gray-600 bg-gray-50">Code</td>
                          <td className="px-5 py-3 text-gray-900 text-xs">{stateData.rainwater.governingCode}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Agency & Incentives Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Regulatory Agency Card */}
            {stateData?.agency?.name && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Regulatory Agency</h3>
                    <p className="text-xs text-gray-500">{stateData.agency.name}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {stateData.agency.phone && (
                    <a href={`tel:${stateData.agency.phone}`} className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
                      <Phone className="h-3.5 w-3.5" />
                      {stateData.agency.phone}
                    </a>
                  )}
                  {stateData.agency.website && (
                    <a href={stateData.agency.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Official Website
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Incentives Card */}
            {compliance?.state?.incentives && compliance.state.incentives.length > 0 ? (
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-emerald-50 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    Available Incentives
                  </h2>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                    {filterIncentivesByResourceType(compliance.state.incentives).length} programs
                  </span>
                </div>
                <div className="divide-y divide-gray-200">
                  {filterIncentivesByResourceType(compliance.state.incentives).slice(0, 3).map((incentive: any, idx: number) => (
                    <div key={idx} className="px-5 py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm truncate">{incentive.program_name}</p>
                        {incentive.program_description && (
                          <p className="text-xs text-gray-500 truncate">{incentive.program_description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {incentive.incentive_amount_max && (
                          <span className="text-sm font-semibold text-emerald-600">
                            Up to ${incentive.incentive_amount_max.toLocaleString()}
                          </span>
                        )}
                        {incentive.incentive_url && (
                          <a
                            href={incentive.incentive_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                          >
                            Apply <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    Incentives
                  </h2>
                </div>
                <div className="p-5 text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-1">No rebates found for this area</p>
                  <p className="text-xs text-gray-500">Check with your local water utility for potential rebate programs.</p>
                </div>
              </div>
            )}
          </div>

          {/* View Toggle & Search for Cities/Counties */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              Browse by {viewMode === 'cities' ? 'City' : 'County'}
            </h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => { setViewMode('cities'); setShowAllCities(false); }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  viewMode === 'cities'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Cities
              </button>
              <button
                onClick={() => { setViewMode('counties'); }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  viewMode === 'counties'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Counties
              </button>
            </div>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={viewMode === 'cities' ? 'Search cities...' : 'Search counties...'}
              value={viewMode === 'cities' ? citiesSearchTerm : countiesSearchTerm}
              onChange={(e) => viewMode === 'cities' ? setCitiesSearchTerm(e.target.value) : setCountiesSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-400 transition-colors text-sm"
            />
          </div>

        {/* Cities List */}
        {viewMode === 'cities' && (
          <div className="divide-y divide-gray-100">
            {(showAllCities || citiesSearchTerm ? filteredCities : filteredCities.slice(0, INITIAL_CITIES_SHOWN)).map((city, idx) => (
              <button
                key={`${city.city_name}-${idx}`}
                onClick={() => navigateToCity(city)}
                className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors text-left group -mx-3 px-3 rounded"
              >
                <div>
                  <p className="font-medium text-gray-900">{city.city_name}</p>
                  {city.county_name && <p className="text-xs text-gray-400 mt-0.5">{city.county_name} County</p>}
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500" />
              </button>
            ))}
            {!showAllCities && !citiesSearchTerm && filteredCities.length > INITIAL_CITIES_SHOWN && (
              <button
                onClick={() => setShowAllCities(true)}
                className="w-full py-4 text-center text-gray-500 hover:text-gray-700 text-sm"
              >
                Show all {filteredCities.length} cities
              </button>
            )}
            {filteredCities.length === 0 && citiesSearchTerm && (
              <p className="text-center text-gray-400 py-8 text-sm">No cities found matching "{citiesSearchTerm}"</p>
            )}
            {filteredCities.length === 0 && !citiesSearchTerm && allCities.length === 0 && (
              <div className="text-center py-8">
                <div className="animate-spin h-5 w-5 border border-gray-300 border-t-gray-600 rounded-full mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Loading cities...</p>
              </div>
            )}
          </div>
        )}

        {/* Counties List */}
        {viewMode === 'counties' && (
          <div className="divide-y divide-gray-100">
            {filteredCounties.map((county, idx) => (
              <button
                key={`${county.county_name}-${idx}`}
                onClick={() => navigateToCounty(county)}
                className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors text-left group -mx-3 px-3 rounded"
              >
                <div>
                  <p className="font-medium text-gray-900">{county.county_name} County</p>
                  <p className="text-xs text-gray-400 mt-0.5">{county.city_count} cities</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500" />
              </button>
            ))}
            {filteredCounties.length === 0 && countiesSearchTerm && (
              <p className="text-center text-gray-500 py-8">No counties found matching "{countiesSearchTerm}"</p>
            )}
            {filteredCounties.length === 0 && !countiesSearchTerm && counties.length === 0 && (
              <div className="text-center py-8">
                <div className="animate-spin h-5 w-5 border border-gray-300 border-t-gray-600 rounded-full mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Loading counties...</p>
              </div>
            )}
          </div>
        )}
          </div>

          {/* CTA Section */}
          <DirectoryCTA stateName={selectedState.state_name} />
        </div>
      </div>
    )
  }

  // ==========================================================================
  // RENDER: COUNTY PAGE (Level 2.5)
  // ==========================================================================

  if (selectedState && selectedCounty && !selectedCity) {
    const filteredCities = cities.filter(c =>
      c.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const countyData = compliance?.county
    const countyIncentives = countyData?.incentives || []

    // Get state data for displaying applicable regulations
    const allowedSources = stateStaticData?.approvedUses || []
    const keyRestrictions = stateStaticData?.keyRestrictions || []

    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <button onClick={() => router.push(basePath)} className="text-gray-500 hover:text-emerald-600">
              All States
            </button>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <button onClick={() => router.push(`${basePath}/${selectedState.state_code}`)} className="text-gray-500 hover:text-emerald-600">
              {selectedState.state_name}
            </button>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <span className="text-gray-900 font-medium">{selectedCounty.county_name} County</span>
          </nav>

          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{selectedCounty.county_name} County, {selectedState.state_name}</h1>
                  {stateData && (
                    <DataConfidenceBadge completeness={getGreywaterDataCompleteness(stateData.greywater)} />
                  )}
                </div>
                <p className="text-gray-600 mb-3">Greywater regulations and rebate programs</p>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const badge = getRegulationStatusBadge(stateData?.greywater)
                    const Icon = badge.icon
                    return (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${badge.className} rounded-full text-sm font-medium`}>
                        <Icon className="h-3.5 w-3.5" />
                        {badge.label}
                      </span>
                    )
                  })()}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {selectedCounty.city_count} cities
                  </span>
                  {countyIncentives.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                      <DollarSign className="h-3.5 w-3.5" />
                      {countyIncentives.length} rebate{countyIncentives.length !== 1 ? 's' : ''} available
                    </span>
                  )}
                </div>
                {stateData?.lastUpdated && (
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last verified: {formatLastUpdated(stateData.lastUpdated)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* County-Specific Regulations Alert (if they exist) */}
          {countyData?.regulation_summary && countyData.regulation_summary !== `${selectedCounty.county_name} County defers to state regulations.` && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-800 text-sm">County-Specific Rules</p>
                  <p className="text-sm text-amber-700">{countyData.regulation_summary}</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content - Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Regulations */}
            <div className="lg:col-span-2 space-y-6">
              {/* Greywater Rules Card */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-emerald-50 px-5 py-3 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-emerald-600" />
                    Greywater Rules in {selectedCounty.county_name} County
                  </h2>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedCounty.county_name} County follows {selectedState.state_name} state greywater regulations.
                    {stateStaticData?.permitThresholdGpd && stateStaticData.permitThresholdGpd > 0 && (
                      <span className="font-medium text-gray-800"> Simple systems under {stateStaticData.permitThresholdGpd} gallons per day typically don't require a permit.</span>
                    )}
                  </p>

                  {/* Quick Facts Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Permit Status</p>
                      <p className="font-semibold text-gray-900">
                        {stateStaticData?.permitRequired === 'conditional' ? 'Conditional' :
                         stateStaticData?.permitRequired === 'yes' ? 'Required' : 'Not Required for Simple Systems'}
                      </p>
                    </div>
                    {stateStaticData?.permitThresholdGpd && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">No-Permit Threshold</p>
                        <p className="font-semibold text-gray-900">{stateStaticData.permitThresholdGpd} GPD</p>
                      </div>
                    )}
                  </div>

                  {/* Allowed Uses */}
                  {allowedSources.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-800 mb-2">Allowed Uses</p>
                      <div className="flex flex-wrap gap-2">
                        {allowedSources.slice(0, 6).map((use: string, idx: number) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded text-xs">
                            <Check className="h-3 w-3" />
                            {use}
                          </span>
                        ))}
                        {allowedSources.length > 6 && (
                          <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            +{allowedSources.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Key Restrictions */}
                  {keyRestrictions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-2">Key Requirements</p>
                      <ul className="space-y-1.5">
                        {keyRestrictions.slice(0, 4).map((restriction: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-amber-500 mt-0.5">•</span>
                            {restriction}
                          </li>
                        ))}
                        {keyRestrictions.length > 4 && (
                          <li className="text-sm text-gray-500 font-medium pl-4">
                            +{keyRestrictions.length - 4} more requirements
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* State Agency Link */}
                  {stateStaticData?.governmentWebsite && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a
                        href={stateStaticData.governmentWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        <FileText className="h-4 w-4" />
                        View {selectedState.state_name} State Regulations
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Getting Started Card */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-gray-600" />
                    Getting Started with Greywater
                  </h2>
                </div>
                <div className="p-5">
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Check Your City's Rules</p>
                        <p className="text-sm text-gray-500">Select your city below to see any additional local requirements.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Determine System Size</p>
                        <p className="text-sm text-gray-500">
                          {stateStaticData?.permitThresholdGpd
                            ? `Systems under ${stateStaticData.permitThresholdGpd} GPD are typically simpler to install.`
                            : 'Simple laundry-to-landscape systems are usually the easiest to start with.'}
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Apply for Rebates</p>
                        <p className="text-sm text-gray-500">
                          {countyIncentives.length > 0
                            ? `${countyIncentives.length} rebate program${countyIncentives.length !== 1 ? 's' : ''} may be available to offset costs.`
                            : 'Check if your water utility offers rebates for greywater systems.'}
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Right Column - Incentives & Quick Links */}
            <div className="space-y-6">
              {/* Incentives Card */}
              {countyIncentives.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-teal-50 px-5 py-3 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-teal-600" />
                      Available Rebates
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {countyIncentives.map((incentive: any, idx: number) => (
                      <div key={idx} className="p-4">
                        <p className="font-medium text-gray-900 text-sm mb-1">{incentive.program_name}</p>
                        {(incentive.incentive_amount_max || incentive.max_funding_per_application) && (
                          <p className="text-lg font-semibold text-teal-600 mb-2">
                            Up to ${(incentive.incentive_amount_max || incentive.max_funding_per_application).toLocaleString()}
                          </p>
                        )}
                        {incentive.program_description && (
                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{incentive.program_description}</p>
                        )}
                        {incentive.application_url && (
                          <a
                            href={incentive.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium"
                          >
                            Learn More <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* County Permits (if they have specific requirements) */}
              {countyData && (countyData.permit_required !== null || countyData.permit_fee || countyData.permit_type) && (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-amber-50 px-5 py-3 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-600" />
                      County Permits
                    </h2>
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-100">
                      {countyData.permit_required !== null && (
                        <tr>
                          <td className="px-4 py-2.5 text-gray-600">Required</td>
                          <td className="px-4 py-2.5 font-medium text-gray-900 text-right">{countyData.permit_required ? 'Yes' : 'No'}</td>
                        </tr>
                      )}
                      {countyData.permit_type && (
                        <tr>
                          <td className="px-4 py-2.5 text-gray-600">Type</td>
                          <td className="px-4 py-2.5 text-gray-900 text-right">{countyData.permit_type}</td>
                        </tr>
                      )}
                      {countyData.permit_fee && (
                        <tr>
                          <td className="px-4 py-2.5 text-gray-600">Fee</td>
                          <td className="px-4 py-2.5 font-medium text-gray-900 text-right">${countyData.permit_fee}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Contact Info Card */}
              {stateStaticData?.primaryAgency && (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-900 text-sm">State Agency</h2>
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-gray-900 text-sm mb-2">{stateStaticData.primaryAgency}</p>
                    {stateStaticData.agencyPhone && (
                      <a href={`tel:${stateStaticData.agencyPhone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 mb-1">
                        <Phone className="h-3.5 w-3.5" />
                        {stateStaticData.agencyPhone}
                      </a>
                    )}
                    {stateStaticData.governmentWebsite && (
                      <a
                        href={stateStaticData.governmentWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Official Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cities Card */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900">Cities in {selectedCounty.county_name} County</h2>
                <span className="text-sm text-gray-500">{filteredCities.length} cities</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors text-sm"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredCities.map((city, idx) => (
                  <button
                    key={`${city.city_name}-${idx}`}
                    onClick={() => navigateToCity(city)}
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-lg transition-colors text-left group"
                  >
                    <p className="font-medium text-gray-900 group-hover:text-emerald-700">{city.city_name}</p>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-500" />
                  </button>
                ))}
              </div>
              {filteredCities.length === 0 && searchTerm && (
                <p className="text-center text-gray-400 py-8 text-sm">No cities found matching "{searchTerm}"</p>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <DirectoryCTA
            stateName={selectedState.state_name}
            countyName={selectedCounty.county_name}
          />
        </div>
      </div>
    )
  }

  // ==========================================================================
  // RENDER: CITY PAGE (Level 3) - ENHANCED
  // ==========================================================================

  if (selectedState && selectedCounty && selectedCity) {
    const effective = compliance?.effective
    const stateData = compliance?.state
    const allIncentives = [
      ...(compliance?.state?.incentives || []),
      ...(compliance?.county?.incentives || []),
      ...(compliance?.city?.incentives || [])
    ]

    // Parse allowed sources - prioritize state static data since it's more complete
    const allowedSources = stateStaticData?.approvedUses ||
                          effective?.allowed_sources?.split(',').map((s: string) => s.trim()).filter(Boolean) || []
    const prohibitedSources = effective?.prohibited_sources?.split(',').map((s: string) => s.trim()).filter(Boolean) || []
    const keyRestrictions = stateStaticData?.keyRestrictions || []

    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <button onClick={() => router.push(basePath)} className="text-gray-500 hover:text-emerald-600">
              All States
            </button>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <button onClick={() => router.push(`${basePath}/${selectedState.state_code}`)} className="text-gray-500 hover:text-emerald-600">
              {selectedState.state_name}
            </button>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <button onClick={() => router.push(`${basePath}/${selectedState.state_code}/${nameToSlug(selectedCounty.county_name || '')}`)} className="text-gray-500 hover:text-emerald-600">
              {selectedCounty.county_name} County
            </button>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <span className="text-gray-900 font-medium">{selectedCity.city_name}</span>
          </nav>

          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{selectedCity.city_name}</h1>
                  {stateStaticData && (
                    <DataConfidenceBadge completeness={getGreywaterDataCompleteness(stateStaticData)} />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const badge = getRegulationStatusBadge(stateStaticData)
                    const Icon = badge.icon
                    return (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${badge.className} rounded-full text-sm font-medium`}>
                        <Icon className="h-3.5 w-3.5" />
                        {badge.label}
                      </span>
                    )
                  })()}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {selectedCounty.county_name} County
                  </span>
                </div>
              </div>
              {allIncentives.length > 0 && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">{allIncentives.length}</p>
                  <p className="text-sm text-gray-500">Incentive Programs</p>
                </div>
              )}
            </div>
          </div>

          {/* Regulation Summary Alert */}
          {effective?.regulation_summary && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-emerald-800 text-sm">Local Regulations</p>
                  <p className="text-sm text-emerald-700">{effective.regulation_summary}</p>
                </div>
              </div>
            </div>
          )}

          {/* Pre-Plumbing Mandate Alert */}
          {(effective?.has_preplumbing_mandate || compliance?.state?.has_preplumbing_mandate) && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-purple-800 text-sm mb-1">Pre-Plumbing Mandate</p>
                  {effective?.has_preplumbing_mandate ? (
                    <div>
                      <p className="text-sm text-purple-700 mb-2">
                        {effective.preplumbing_details || 'New construction must include greywater-ready plumbing.'}
                      </p>
                      {effective.preplumbing_building_types && (
                        <p className="text-xs text-purple-600">
                          <strong>Applies to:</strong> {effective.preplumbing_building_types}
                        </p>
                      )}
                      {effective.preplumbing_threshold_sqft && (
                        <p className="text-xs text-purple-600">
                          <strong>Threshold:</strong> Buildings {effective.preplumbing_threshold_sqft.toLocaleString()}+ sqft
                        </p>
                      )}
                      {effective.preplumbing_code_reference && (
                        <p className="text-xs text-purple-500 mt-1">
                          {effective.preplumbing_code_reference}
                        </p>
                      )}
                    </div>
                  ) : compliance?.state?.has_preplumbing_mandate ? (
                    <div>
                      <p className="text-sm text-purple-700 mb-2">
                        {compliance.state.preplumbing_details || 'California requires new construction to be greywater-ready under CALGreen.'}
                      </p>
                      {compliance.state.preplumbing_building_types && (
                        <p className="text-xs text-purple-600">
                          <strong>Applies to:</strong> {compliance.state.preplumbing_building_types}
                        </p>
                      )}
                      <p className="text-xs text-purple-500 mt-1">
                        State-level requirement (CALGreen Code)
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Permit Requirements Card */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className={`${stateStaticData?.permitRequired ? 'bg-emerald-50' : 'bg-gray-50'} px-5 py-3 border-b border-gray-200`}>
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className={`h-4 w-4 ${stateStaticData?.permitRequired ? 'text-emerald-600' : 'text-gray-400'}`} />
                  Permit Requirements
                </h2>
              </div>
              {stateStaticData?.permitRequired || effective?.permit_required !== undefined ? (
                <>
                  {/* Desktop table view */}
                  <table className="hidden sm:table w-full text-sm">
                    <tbody className="divide-y divide-gray-200">
                      {(stateStaticData?.permitRequired || effective?.permit_required !== null) && (
                        <tr>
                          <td className="px-5 py-3 text-gray-600 bg-gray-50 w-2/5">Status</td>
                          <td className="px-5 py-3 font-medium text-gray-900">
                            {stateStaticData?.permitRequired || (effective?.permit_required ? 'Required' : 'Not required')}
                          </td>
                        </tr>
                      )}
                      {stateStaticData?.permitThresholdGpd !== null && stateStaticData?.permitThresholdGpd !== undefined && (
                        <tr>
                          <td className="px-5 py-3 text-gray-600 bg-gray-50">No-Permit Threshold</td>
                          <td className="px-5 py-3 text-gray-900">
                            {stateStaticData.permitThresholdGpd > 0 ? `Under ${stateStaticData.permitThresholdGpd} GPD` : 'All need permit'}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="px-5 py-3 text-gray-600 bg-gray-50">Allowed Uses</td>
                        <td className="px-5 py-3 text-gray-900">
                          {[
                            stateStaticData?.outdoorUseAllowed && 'Outdoor',
                            stateStaticData?.indoorUseAllowed && 'Indoor'
                          ].filter(Boolean).join(', ') || 'Varies'}
                        </td>
                      </tr>
                      {stateStaticData?.governingCode && (
                        <tr>
                          <td className="px-5 py-3 text-gray-600 bg-gray-50">Code</td>
                          <td className="px-5 py-3 text-gray-900 text-xs">{stateStaticData.governingCode}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {/* Mobile stacked view */}
                  <div className="sm:hidden divide-y divide-gray-200">
                    {(stateStaticData?.permitRequired || effective?.permit_required !== null) && (
                      <div className="px-5 py-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
                        <p className="font-medium text-gray-900">
                          {stateStaticData?.permitRequired || (effective?.permit_required ? 'Required' : 'Not required')}
                        </p>
                      </div>
                    )}
                    {stateStaticData?.permitThresholdGpd !== null && stateStaticData?.permitThresholdGpd !== undefined && (
                      <div className="px-5 py-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">No-Permit Threshold</p>
                        <p className="text-gray-900">
                          {stateStaticData.permitThresholdGpd > 0 ? `Under ${stateStaticData.permitThresholdGpd} GPD` : 'All need permit'}
                        </p>
                      </div>
                    )}
                    <div className="px-5 py-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Allowed Uses</p>
                      <p className="text-gray-900">
                        {[
                          stateStaticData?.outdoorUseAllowed && 'Outdoor',
                          stateStaticData?.indoorUseAllowed && 'Indoor'
                        ].filter(Boolean).join(', ') || 'Varies'}
                      </p>
                    </div>
                    {stateStaticData?.governingCode && (
                      <div className="px-5 py-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Code</p>
                        <p className="text-gray-900 text-xs">{stateStaticData.governingCode}</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="p-5 text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Permit requirements not yet verified</p>
                  <p className="text-xs text-gray-500">Contact your local building department or water utility for permit information.</p>
                </div>
              )}
            </div>

            {/* System Requirements Card */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-cyan-50 px-5 py-3 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-cyan-600" />
                  System Requirements
                </h2>
              </div>
              <div className="p-5 space-y-4">
                {effective?.treatment_requirements && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Treatment</p>
                    <p className="text-sm text-gray-700">{effective.treatment_requirements}</p>
                  </div>
                )}
                {effective?.setback_requirements && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Setbacks</p>
                    <p className="text-sm text-gray-700">{effective.setback_requirements}</p>
                  </div>
                )}
                {allowedSources.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Approved Uses</p>
                    <ul className="space-y-1">
                      {allowedSources.slice(0, 4).map((source: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          {source}
                        </li>
                      ))}
                      {allowedSources.length > 4 && (
                        <li className="text-sm text-gray-500 font-medium pl-5">
                          +{allowedSources.length - 4} more uses
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {keyRestrictions.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Restrictions</p>
                    <ul className="space-y-1">
                      {keyRestrictions.slice(0, 3).map((restriction: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600">• {restriction}</li>
                      ))}
                      {keyRestrictions.length > 3 && (
                        <li className="text-sm text-gray-500 font-medium pl-3">
                          +{keyRestrictions.length - 3} more restrictions
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {!effective?.treatment_requirements && !effective?.setback_requirements && allowedSources.length === 0 && keyRestrictions.length === 0 && stateStaticData && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-teal-500" />
                      <span>This city follows <strong>{selectedState.state_name}</strong> state greywater code</span>
                    </div>
                    {stateStaticData.governingCode && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Governing Code</p>
                        <p className="text-sm text-gray-800 font-medium">{stateStaticData.governingCode}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-emerald-50 rounded-lg p-2.5 text-center">
                        <p className="text-xs text-emerald-600 font-medium">Outdoor Use</p>
                        <p className="text-sm font-semibold text-emerald-700">{stateStaticData.outdoorUseAllowed ? 'Allowed' : 'Check Local'}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2.5 text-center">
                        <p className="text-xs text-blue-600 font-medium">Indoor Use</p>
                        <p className="text-sm font-semibold text-blue-700">{stateStaticData.indoorUseAllowed ? 'Allowed' : 'Not Allowed'}</p>
                      </div>
                    </div>
                    {stateStaticData.permitThresholdGpd && stateStaticData.permitThresholdGpd > 0 && (
                      <p className="text-xs text-gray-500 bg-amber-50 rounded-lg p-2">
                        <strong>No permit needed</strong> for simple "laundry-to-landscape" systems under {stateStaticData.permitThresholdGpd} gallons/day
                      </p>
                    )}
                  </div>
                )}
                {!effective?.treatment_requirements && !effective?.setback_requirements && allowedSources.length === 0 && keyRestrictions.length === 0 && !stateStaticData && (
                  <p className="text-sm text-gray-500">Contact local building department for requirements</p>
                )}
              </div>
            </div>
          </div>

          {/* Incentives Card */}
          {allIncentives.length > 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
              <div className="bg-emerald-50 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  Available Incentives
                </h2>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                  {allIncentives.length} programs
                </span>
              </div>
              <div className="divide-y divide-gray-200">
                {allIncentives.map((program: any, idx: number) => (
                  <div key={idx} className="px-5 py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm truncate">{program.program_name || 'Rebate Program'}</p>
                      {program.program_description && (
                        <p className="text-xs text-gray-500 truncate">{program.program_description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {program.incentive_amount_max && (
                        <span className="text-sm font-semibold text-emerald-600">
                          Up to ${program.incentive_amount_max.toLocaleString()}
                        </span>
                      )}
                      {program.incentive_url && (
                        <a
                          href={program.incentive_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Apply <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  Incentives
                </h2>
              </div>
              <div className="p-5 text-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">No rebates found for this area</p>
                <p className="text-xs text-gray-500">Check with your local water utility for potential rebate programs.</p>
              </div>
            </div>
          )}

          {/* Resources Card */}
          {(effective?.documentation_url || stateStaticData?.governmentWebsite) && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-gray-600" />
                Official Resources
              </h2>
              <div className="flex flex-wrap gap-3">
                {effective?.documentation_url && (
                  <a
                    href={effective.documentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Local Regulations
                  </a>
                )}
                {stateStaticData?.governmentWebsite && (
                  <a
                    href={stateStaticData.governmentWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Building2 className="h-4 w-4" />
                    State Regulatory Agency
                  </a>
                )}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <DirectoryCTA
            stateName={selectedState.state_name}
            countyName={selectedCounty.county_name}
            cityName={selectedCity.city_name}
          />
        </div>
      </div>
    )
  }

  // Fallback
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <p className="text-sm text-gray-400">Loading...</p>
    </div>
  )
}
