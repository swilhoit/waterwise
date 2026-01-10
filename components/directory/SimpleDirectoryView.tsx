"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronDown, Search, Check, ExternalLink, Phone, Mail, Building2, FileText, Droplets, AlertTriangle, Clock, DollarSign, ShieldCheck, Gauge, MapPin, ListChecks, ClipboardList, CloudRain, Leaf } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { nameToSlug, findBySlug } from '@/lib/url-utils'

// Resource type configuration
type ResourceType = 'all' | 'greywater' | 'rainwater' | 'conservation'

const RESOURCE_TYPES: { id: ResourceType; label: string; icon: any; bgColor: string; color: string }[] = [
  { id: 'all', label: 'All', icon: Droplets, bgColor: 'bg-gray-100', color: 'text-gray-700' },
  { id: 'greywater', label: 'Greywater', icon: Droplets, bgColor: 'bg-gray-100', color: 'text-gray-700' },
  { id: 'rainwater', label: 'Rainwater', icon: CloudRain, bgColor: 'bg-gray-100', color: 'text-gray-700' },
  { id: 'conservation', label: 'Conservation', icon: Leaf, bgColor: 'bg-gray-100', color: 'text-gray-700' },
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

  // Get resource type badge styling - minimal design
  const getResourceTypeBadge = (resourceType: string) => {
    switch (resourceType) {
      case 'rainwater':
        return { className: 'bg-gray-100 text-gray-600 border border-gray-200', label: 'Rainwater', icon: CloudRain }
      case 'conservation':
        return { className: 'bg-gray-100 text-gray-600 border border-gray-200', label: 'Conservation', icon: Leaf }
      case 'greywater':
      default:
        return { className: 'bg-gray-100 text-gray-600 border border-gray-200', label: 'Greywater', icon: Droplets }
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
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Minimal Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Regulations Directory</h1>
          <p className="text-gray-500 text-sm">Find greywater and rainwater regulations by state</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-400 transition-colors text-sm"
          />
        </div>

        {/* States List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-5 w-5 border border-gray-300 border-t-gray-600 rounded-full mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredStates.map((state) => (
              <button
                key={state.state_jurisdiction_id}
                onClick={() => navigateToState(state)}
                className="w-full flex items-center justify-between py-4 hover:bg-gray-50 transition-colors text-left group -mx-3 px-3 rounded"
              >
                <div>
                  <p className="font-medium text-gray-900">{state.state_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{state.city_count || 0} cities</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500" />
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
      c.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredCounties = counties.filter(c =>
      c.county_name?.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => (a.county_name || '').localeCompare(b.county_name || ''))

    // Helper to get status badge color - minimal
    const getStatusBadgeClass = () => {
      return 'bg-gray-100 text-gray-600 border border-gray-200'
    }

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <button onClick={() => router.push(basePath)} className="text-gray-400 hover:text-gray-600">
            All States
          </button>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-900">{selectedState.state_name}</span>
        </nav>

        {/* Minimal State Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">{selectedState.state_name}</h1>
          <p className="text-sm text-gray-500">{selectedState.city_count} cities</p>
        </div>

        {/* Recent Changes */}
        {(stateData?.greywater?.recentChanges || stateData?.rainwater?.recentChanges) && (
          <div className="border-l-2 border-gray-300 pl-4 mb-8">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Recent Update</p>
            <p className="text-sm text-gray-600">
              {stateData?.greywater?.recentChanges || stateData?.rainwater?.recentChanges}
            </p>
          </div>
        )}

        {/* Side-by-Side Regulations Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Greywater Column */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Greywater Reuse
            </h2>

            {stateData?.greywater ? (
              <div className="space-y-4">
                {/* Status & Classification */}
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Status</span>
                  <Badge className={getStatusBadgeClass(stateData.greywater.legalStatus)}>
                    {stateData.greywater.legalStatus || 'Legal'}
                  </Badge>
                </div>

                {stateData.greywater.regulatoryClassification && (
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Classification</span>
                    <span className="text-sm font-medium text-blue-900">{stateData.greywater.regulatoryClassification}</span>
                  </div>
                )}

                {/* Use Allowances */}
                <div className="flex gap-4 py-2">
                  <div className={`flex items-center gap-1.5 ${stateData.greywater.outdoorUseAllowed ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {stateData.greywater.outdoorUseAllowed ? <Check className="h-4 w-4" /> : <span className="h-4 w-4 text-center">✗</span>}
                    <span className="text-sm">Outdoor</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${stateData.greywater.indoorUseAllowed ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {stateData.greywater.indoorUseAllowed ? <Check className="h-4 w-4" /> : <span className="h-4 w-4 text-center">✗</span>}
                    <span className="text-sm">Indoor</span>
                  </div>
                </div>

                {/* Permit Info */}
                <div className="pt-3 border-t border-blue-200">
                  <p className="text-xs font-semibold text-blue-700 uppercase mb-2">Permits</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Required</span>
                      <span className="font-medium text-blue-900">{stateData.greywater.permitRequired || 'Varies'}</span>
                    </div>
                    {stateData.greywater.permitThresholdGpd !== null && stateData.greywater.permitThresholdGpd !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600">No-Permit Threshold</span>
                        <span className="font-medium text-blue-900">
                          {stateData.greywater.permitThresholdGpd > 0 ? `< ${stateData.greywater.permitThresholdGpd} GPD` : 'All need permit'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Governing Code */}
                {stateData.greywater.governingCode && (
                  <div className="pt-3 border-t border-blue-200">
                    <p className="text-xs font-semibold text-blue-700 uppercase mb-1">Governing Code</p>
                    <p className="text-sm text-blue-800">{stateData.greywater.governingCode}</p>
                  </div>
                )}

                {/* Approved Uses */}
                {stateData.greywater.approvedUses && stateData.greywater.approvedUses.length > 0 && (
                  <div className="pt-3 border-t border-blue-200">
                    <p className="text-xs font-semibold text-blue-700 uppercase mb-2">Approved Uses</p>
                    <div className="flex flex-wrap gap-1.5">
                      {stateData.greywater.approvedUses.slice(0, 4).map((use, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-700 text-xs">{use}</Badge>
                      ))}
                      {stateData.greywater.approvedUses.length > 4 && (
                        <Badge className="bg-blue-100 text-blue-700 text-xs">+{stateData.greywater.approvedUses.length - 4} more</Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-blue-600 text-sm">No greywater data available for this state.</p>
            )}
          </div>

          {/* Rainwater Column */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-cyan-900 mb-4 flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-cyan-600" />
              Rainwater Harvesting
            </h2>

            {stateData?.rainwater ? (
              <div className="space-y-4">
                {/* Status */}
                <div className="flex justify-between items-center">
                  <span className="text-cyan-700">Status</span>
                  <Badge className={getStatusBadgeClass(stateData.rainwater.legalStatus)}>
                    {stateData.rainwater.legalStatus || 'Legal'}
                  </Badge>
                </div>

                {/* Collection Limit */}
                <div className="flex justify-between items-center">
                  <span className="text-cyan-700">Collection Limit</span>
                  <span className="font-medium text-cyan-900">
                    {stateData.rainwater.collectionLimitGallons && stateData.rainwater.collectionLimitGallons > 0
                      ? `${stateData.rainwater.collectionLimitGallons.toLocaleString()} gal`
                      : 'Unlimited'}
                  </span>
                </div>

                {/* Potable Use */}
                <div className="flex justify-between items-center">
                  <span className="text-cyan-700">Potable Use</span>
                  <span className={`font-medium ${stateData.rainwater.potableUseAllowed ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {stateData.rainwater.potableUseAllowed ? 'Allowed (w/ treatment)' : 'Non-potable only'}
                  </span>
                </div>

                {/* Permit Info */}
                <div className="pt-3 border-t border-cyan-200">
                  <p className="text-xs font-semibold text-cyan-700 uppercase mb-2">Permits</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-600">Required</span>
                    <span className="font-medium text-cyan-900">{stateData.rainwater.permitRequired || 'No'}</span>
                  </div>
                </div>

                {/* Tax Incentives */}
                {stateData.rainwater.taxIncentives && (
                  <div className="pt-3 border-t border-cyan-200">
                    <p className="text-xs font-semibold text-cyan-700 uppercase mb-1 flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Tax Incentives
                    </p>
                    <p className="text-sm text-cyan-800">{stateData.rainwater.taxIncentives}</p>
                  </div>
                )}

                {/* Governing Code */}
                {stateData.rainwater.governingCode && (
                  <div className="pt-3 border-t border-cyan-200">
                    <p className="text-xs font-semibold text-cyan-700 uppercase mb-1">Governing Code</p>
                    <p className="text-sm text-cyan-800">{stateData.rainwater.governingCode}</p>
                  </div>
                )}

                {/* Approved Uses */}
                {stateData.rainwater.approvedUses && stateData.rainwater.approvedUses.length > 0 && (
                  <div className="pt-3 border-t border-cyan-200">
                    <p className="text-xs font-semibold text-cyan-700 uppercase mb-2">Approved Uses</p>
                    <div className="flex flex-wrap gap-1.5">
                      {stateData.rainwater.approvedUses.slice(0, 4).map((use, idx) => (
                        <Badge key={idx} className="bg-cyan-100 text-cyan-700 text-xs">{use}</Badge>
                      ))}
                      {stateData.rainwater.approvedUses.length > 4 && (
                        <Badge className="bg-cyan-100 text-cyan-700 text-xs">+{stateData.rainwater.approvedUses.length - 4} more</Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-cyan-600 text-sm">No rainwater data available for this state.</p>
            )}
          </div>
        </div>

        {/* Conservation Note */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <Leaf className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-emerald-900">Water Conservation</p>
              <p className="text-sm text-emerald-700">
                {stateData?.conservation?.message || 'Conservation programs are incentive-based. See available rebates below.'}
                {stateData?.incentives?.conservation ? ` (${stateData.incentives.conservation} programs available)` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Agency */}
        {stateData?.agency?.name && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-400" />
              Regulatory Agency
            </h2>
            <div className="space-y-3">
              <p className="font-medium text-gray-900">{stateData.agency.name}</p>
              {stateData.agency.phone && (
                <a href={`tel:${stateData.agency.phone}`} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                  <Phone className="h-4 w-4" />
                  {stateData.agency.phone}
                </a>
              )}
              {stateData.agency.website && (
                <a href={stateData.agency.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                  <ExternalLink className="h-4 w-4" />
                  Official Website
                </a>
              )}
            </div>
          </div>
        )}

        {/* State Incentives */}
        {compliance?.state?.incentives && compliance.state.incentives.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Available Incentives & Rebates
                <span className="text-sm font-normal text-gray-500">({filterIncentivesByResourceType(compliance.state.incentives).length})</span>
              </h2>
              {stateData?.incentives?.maxRebate && stateData.incentives.maxRebate > 0 && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Up to</p>
                  <p className="text-xl font-bold text-emerald-600">${stateData.incentives.maxRebate.toLocaleString()}</p>
                </div>
              )}
            </div>

            {/* Resource Type Filter */}
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
              {RESOURCE_TYPES.map((type) => {
                const Icon = type.icon
                const count = type.id === 'all'
                  ? compliance.state.incentives.length
                  : compliance.state.incentives.filter((p: any) => (p.resource_type || 'greywater') === type.id).length
                if (count === 0 && type.id !== 'all') return null
                return (
                  <button
                    key={type.id}
                    onClick={() => setResourceTypeFilter(type.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      resourceTypeFilter === type.id
                        ? `${type.bgColor} ${type.color}`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {type.label}
                    <span className="opacity-70">({count})</span>
                  </button>
                )
              })}
            </div>

            <div className="space-y-4">
              {filterIncentivesByResourceType(compliance.state.incentives).map((incentive: any, idx: number) => {
                const resourceBadge = getResourceTypeBadge(incentive.resource_type || 'greywater')
                const subtypeBadge = incentive.program_subtype ? getSubtypeBadge(incentive.program_subtype) : null
                const ResourceIcon = resourceBadge.icon

                return (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{incentive.program_name}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <Badge className={`${resourceBadge.className} text-xs flex items-center gap-1`}>
                          <ResourceIcon className="h-3 w-3" />
                          {resourceBadge.label}
                        </Badge>
                        {subtypeBadge && (
                          <Badge className={`${subtypeBadge.className} text-xs`}>{subtypeBadge.label}</Badge>
                        )}
                        {incentive.incentive_type === 'rebate' && (
                          <Badge className="bg-gray-200 text-gray-700 text-xs">Rebate</Badge>
                        )}
                        {incentive.incentive_type === 'tax_credit' && (
                          <Badge className="bg-indigo-100 text-indigo-700 text-xs">Tax Credit</Badge>
                        )}
                        {incentive.incentive_type === 'tax_exemption' && (
                          <Badge className="bg-indigo-100 text-indigo-700 text-xs">Tax Exemption</Badge>
                        )}
                        {incentive.residential_eligible && (
                          <Badge className="bg-slate-100 text-slate-700 text-xs">Residential</Badge>
                        )}
                        {incentive.commercial_eligible && (
                          <Badge className="bg-purple-100 text-purple-700 text-xs">Commercial</Badge>
                        )}
                      </div>
                    </div>
                    {incentive.incentive_amount_max && (
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Up to</p>
                        <p className="text-lg font-bold text-emerald-600">
                          ${incentive.incentive_amount_max.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                  {incentive.program_description && (
                    <p className="text-sm text-gray-600 mb-3">{incentive.program_description}</p>
                  )}
                  {incentive.incentive_url && (
                    <a
                      href={incentive.incentive_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Apply Now <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                )
              })}
            </div>
          </div>
        )}

        {/* View Toggle & Search for Cities/Counties */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {viewMode === 'cities' ? 'Find Your City' : 'Browse by County'}
            </h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => { setViewMode('cities'); setSearchTerm(''); setShowAllCities(false); }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'cities' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cities
              </button>
              <button
                onClick={() => { setViewMode('counties'); setSearchTerm(''); }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'counties' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Counties
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={viewMode === 'cities' ? 'Search cities...' : 'Search counties...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Cities List */}
        {viewMode === 'cities' && (
          <div className="space-y-2">
            {(showAllCities || searchTerm ? filteredCities : filteredCities.slice(0, INITIAL_CITIES_SHOWN)).map((city, idx) => (
              <button
                key={`${city.city_name}-${idx}`}
                onClick={() => navigateToCity(city)}
                className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors text-left group"
              >
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-emerald-700">{city.city_name}</p>
                  {city.county_name && <p className="text-sm text-gray-500">{city.county_name} County</p>}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
              </button>
            ))}
            {!showAllCities && !searchTerm && filteredCities.length > INITIAL_CITIES_SHOWN && (
              <button
                onClick={() => setShowAllCities(true)}
                className="w-full py-4 text-center text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                Show all {filteredCities.length} cities
              </button>
            )}
            {filteredCities.length === 0 && searchTerm && (
              <p className="text-center text-gray-500 py-8">No cities found matching "{searchTerm}"</p>
            )}
            {filteredCities.length === 0 && !searchTerm && allCities.length === 0 && (
              <div className="text-center py-8">
                <div className="animate-spin h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-gray-500">Loading cities...</p>
              </div>
            )}
          </div>
        )}

        {/* Counties List */}
        {viewMode === 'counties' && (
          <div className="space-y-2">
            {filteredCounties.map((county, idx) => (
              <button
                key={`${county.county_name}-${idx}`}
                onClick={() => navigateToCounty(county)}
                className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors text-left group"
              >
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-emerald-700">{county.county_name} County</p>
                  <p className="text-sm text-gray-500">{county.city_count} cities</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
              </button>
            ))}
            {filteredCounties.length === 0 && searchTerm && (
              <p className="text-center text-gray-500 py-8">No counties found matching "{searchTerm}"</p>
            )}
            {filteredCounties.length === 0 && !searchTerm && counties.length === 0 && (
              <div className="text-center py-8">
                <div className="animate-spin h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-gray-500">Loading counties...</p>
              </div>
            )}
          </div>
        )}
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

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
          <button onClick={() => router.push(basePath)} className="text-gray-500 hover:text-emerald-600">
            All States
          </button>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <button onClick={() => router.push(`${basePath}/${selectedState.state_code}`)} className="text-gray-500 hover:text-emerald-600">
            {selectedState.state_name}
          </button>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">{selectedCounty.county_name} County</span>
        </nav>

        {/* County Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedCounty.county_name} County</h1>
              <p className="text-gray-500">{selectedState.state_name} • {selectedCounty.city_count} cities</p>
            </div>
            {countyData && countyData.greywater_allowed !== undefined && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                countyData.greywater_allowed !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {countyData.greywater_allowed !== false ? (
                  <><Check className="h-4 w-4" /> Greywater Allowed</>
                ) : (
                  <><AlertTriangle className="h-4 w-4" /> Restricted</>
                )}
              </div>
            )}
          </div>

          {countyData?.regulation_summary && countyData.regulation_summary !== `${selectedCounty.county_name} County defers to state regulations.` && (
            <p className="text-gray-600">{countyData.regulation_summary}</p>
          )}
        </div>

        {/* State Permit Explanation - What This Means For You */}
        {stateStaticData?.permitExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {selectedState.state_name} Permit Requirements
            </h2>
            <p className="text-blue-800 leading-relaxed">{stateStaticData.permitExplanation}</p>
            {stateStaticData?.permitProcess && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-blue-600" />
                  How to Get Started
                </h3>
                <p className="text-sm text-blue-700">{stateStaticData.permitProcess}</p>
              </div>
            )}
          </div>
        )}

        {/* County Permit Info - if available */}
        {countyData && (countyData.permit_required !== null || countyData.permit_fee || countyData.permit_type) && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-400" />
              County Permit Requirements
            </h2>
            <div className="space-y-3">
              {countyData.permit_required !== null && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Permit Required</span>
                  <span className={`font-medium ${countyData.permit_required ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {countyData.permit_required ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
              {countyData.permit_type && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Permit Type</span>
                  <span className="font-medium">{countyData.permit_type}</span>
                </div>
              )}
              {countyData.permit_fee && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Permit Fee</span>
                  <span className="font-medium">${countyData.permit_fee}</span>
                </div>
              )}
              {countyData.annual_fee && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Fee</span>
                  <span className="font-medium">${countyData.annual_fee}/year</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* County Incentives - if available */}
        {countyIncentives.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-400" />
              County Rebates & Incentives
              <span className="text-sm font-normal text-gray-500">({countyIncentives.length})</span>
            </h2>
            <div className="space-y-4">
              {countyIncentives.map((incentive: any, idx: number) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{incentive.program_name}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {/* Program Type Badge */}
                        {incentive.incentive_type === 'rebate' && (
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">Rebate</Badge>
                        )}
                        {incentive.incentive_type === 'tax_credit' && (
                          <Badge className="bg-indigo-100 text-indigo-700 text-xs">Tax Credit</Badge>
                        )}
                        {incentive.incentive_type === 'grant' && (
                          <Badge className="bg-teal-100 text-teal-700 text-xs">Grant</Badge>
                        )}
                        {/* Property Type Badges */}
                        {incentive.residential_eligible && (
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Residential</Badge>
                        )}
                        {incentive.commercial_eligible && (
                          <Badge className="bg-purple-100 text-purple-700 text-xs">Commercial</Badge>
                        )}
                        {incentive.applicant_type === 'business' && !incentive.residential_eligible && (
                          <Badge className="bg-amber-100 text-amber-700 text-xs">Business Only</Badge>
                        )}
                      </div>
                    </div>
                    {(incentive.incentive_amount_max || incentive.max_funding_per_application) && (
                      <div className="text-right">
                        <span className="text-emerald-600 font-bold text-lg">
                          Up to ${(incentive.incentive_amount_max || incentive.max_funding_per_application).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                  {incentive.program_description && (
                    <p className="text-sm text-gray-600 mb-3">{incentive.program_description}</p>
                  )}
                  {incentive.eligibility_details && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Eligibility</p>
                      <p className="text-sm text-gray-700">{incentive.eligibility_details}</p>
                    </div>
                  )}
                  {incentive.how_to_apply && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">How to Apply</p>
                      <p className="text-sm text-gray-700">{incentive.how_to_apply}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-100 text-sm">
                    {incentive.incentive_url && (
                      <a
                        href={incentive.incentive_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {(() => {
                          try {
                            const domain = new URL(incentive.incentive_url).hostname.replace('www.', '');
                            return domain;
                          } catch {
                            return 'Apply';
                          }
                        })()}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* State-level info reminder */}
        {stateStaticData && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Note:</span> {selectedCounty.county_name} County follows {selectedState.state_name} state greywater regulations.
              {stateStaticData.permitThresholdGpd && stateStaticData.permitThresholdGpd > 0 && (
                <> Systems under {stateStaticData.permitThresholdGpd} GPD may not require a permit.</>
              )}
            </p>
          </div>
        )}

        {/* City Search */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Select Your City</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Cities List */}
        <div className="space-y-2">
          {filteredCities.map((city, idx) => (
            <button
              key={`${city.city_name}-${idx}`}
              onClick={() => navigateToCity(city)}
              className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors text-left group"
            >
              <p className="font-medium text-gray-900 group-hover:text-emerald-700">{city.city_name}</p>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
            </button>
          ))}
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
          <button onClick={() => router.push(basePath)} className="text-gray-500 hover:text-emerald-600">
            All States
          </button>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <button onClick={() => router.push(`${basePath}/${selectedState.state_code}`)} className="text-gray-500 hover:text-emerald-600">
            {selectedState.state_name}
          </button>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">{selectedCity.city_name}</span>
        </nav>

        {/* City Header with Status */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedCity.city_name}</h1>
              <p className="text-gray-500">{selectedCounty.county_name} County, {selectedState.state_name}</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
              effective?.greywater_allowed !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {effective?.greywater_allowed !== false ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              <span className="font-medium text-sm">
                {effective?.greywater_allowed !== false ? 'Greywater Legal' : 'Greywater Restricted'}
              </span>
            </div>
          </div>

          {effective?.regulation_summary && (
            <p className="text-gray-600">{effective.regulation_summary}</p>
          )}
        </div>

        {/* Permit Requirements - Using State Data since most cities defer to state */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-400" />
            Permit Requirements
          </h2>

          <div className="space-y-4">
            {/* Permit Status - use stateStaticData as most cities defer to state */}
            {(stateStaticData?.permitRequired || effective?.permit_required !== null) && (
              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Permit Status</p>
                  <p className="text-sm text-gray-500">{selectedState.state_name} state regulations</p>
                </div>
                <span className="font-medium text-gray-900">
                  {stateStaticData?.permitRequired || (effective?.permit_required ? 'Required' : 'Not required')}
                </span>
              </div>
            )}

            {/* No-Permit Threshold */}
            {stateStaticData?.permitThresholdGpd !== null && stateStaticData?.permitThresholdGpd !== undefined && (
              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">No-Permit Threshold</p>
                  <p className="text-sm text-gray-500">Simple systems under this limit</p>
                </div>
                <span className="font-medium text-emerald-600">
                  {stateStaticData.permitThresholdGpd > 0 ? `Under ${stateStaticData.permitThresholdGpd} GPD` : 'All systems need permit'}
                </span>
              </div>
            )}

            {/* Governing Code */}
            {stateStaticData?.governingCode && (
              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Governing Code</p>
                </div>
                <span className="text-gray-700 text-sm text-right max-w-xs">{stateStaticData.governingCode}</span>
              </div>
            )}

            {/* Indoor/Outdoor Use */}
            <div className="flex items-start justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Allowed Uses</p>
              </div>
              <div className="flex gap-3">
                <span className={`text-sm font-medium ${stateStaticData?.outdoorUseAllowed ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {stateStaticData?.outdoorUseAllowed ? '✓ Outdoor' : '✗ Outdoor'}
                </span>
                <span className={`text-sm font-medium ${stateStaticData?.indoorUseAllowed ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {stateStaticData?.indoorUseAllowed ? '✓ Indoor' : '✗ Indoor'}
                </span>
              </div>
            </div>

            {/* Regulatory Agency */}
            {stateStaticData?.primaryAgency && (
              <div className="flex items-start justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Regulatory Agency</p>
                  {stateStaticData.agencyPhone && (
                    <a href={`tel:${stateStaticData.agencyPhone}`} className="text-sm text-emerald-600 hover:text-emerald-700">
                      {stateStaticData.agencyPhone}
                    </a>
                  )}
                </div>
                <span className="text-gray-700 text-sm text-right max-w-xs">{stateStaticData.primaryAgency}</span>
              </div>
            )}
          </div>
        </div>

        {/* Approved Uses & Key Restrictions */}
        {(allowedSources.length > 0 || keyRestrictions.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Approved Uses */}
            {allowedSources.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-600" />
                  Approved Uses
                </h2>
                <ul className="space-y-2">
                  {allowedSources.map((source: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-emerald-800">
                      <Droplets className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Restrictions */}
            {keyRestrictions.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Key Restrictions
                </h2>
                <ul className="space-y-2">
                  {keyRestrictions.map((restriction: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-amber-800">
                      <span className="text-amber-500 mt-1">•</span>
                      <span className="text-sm">{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Treatment & Setback Requirements */}
        {(effective?.treatment_requirements || effective?.setback_requirements) && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gray-400" />
              System Requirements
            </h2>
            <div className="space-y-4">
              {effective.treatment_requirements && (
                <div>
                  <p className="font-medium text-gray-900 mb-1">Treatment Requirements</p>
                  <p className="text-sm text-gray-600">{effective.treatment_requirements}</p>
                </div>
              )}
              {effective.setback_requirements && (
                <div>
                  <p className="font-medium text-gray-900 mb-1">Setback Requirements</p>
                  <p className="text-sm text-gray-600">{effective.setback_requirements}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rebates & Incentives - Show ALL */}
        {allIncentives.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-400" />
                Incentives & Programs
                <span className="text-sm font-normal text-gray-500">({allIncentives.length})</span>
              </h2>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-gray-100">
              {/* Property Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">For:</span>
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setPropertyTypeFilter('all')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      propertyTypeFilter === 'all'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setPropertyTypeFilter('residential')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      propertyTypeFilter === 'residential'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Residential
                  </button>
                  <button
                    onClick={() => setPropertyTypeFilter('commercial')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      propertyTypeFilter === 'commercial'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Commercial
                  </button>
                </div>
              </div>

              {/* Program Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Type:</span>
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setProgramTypeFilter('all')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      programTypeFilter === 'all'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setProgramTypeFilter('rebates')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      programTypeFilter === 'rebates'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Rebates
                  </button>
                  <button
                    onClick={() => setProgramTypeFilter('tax')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      programTypeFilter === 'tax'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Tax Credits
                  </button>
                  <button
                    onClick={() => setProgramTypeFilter('grants')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      programTypeFilter === 'grants'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Grants
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {allIncentives
                .filter((program: any) => {
                  // Property type filter
                  if (propertyTypeFilter === 'residential' && program.residential_eligible !== true) return false;
                  if (propertyTypeFilter === 'commercial' && program.commercial_eligible !== true) return false;

                  // Program type filter
                  if (programTypeFilter === 'rebates' && !['rebate', 'subsidy'].includes(program.incentive_type)) return false;
                  if (programTypeFilter === 'tax' && !['tax_credit', 'tax_exemption'].includes(program.incentive_type)) return false;
                  if (programTypeFilter === 'grants' && !['grant'].includes(program.incentive_type)) return false;

                  return true;
                })
                .map((program: any, idx: number) => {
                  const isExpanded = expandedPrograms.has(program.program_name)
                  const hasDetails = program.eligibility_details || program.how_to_apply || program.documentation_required || program.coverage_area || program.deadline_info

                  return (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Main Card Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{program.program_name || 'Rebate Program'}</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {/* Program Type Badge */}
                          {program.incentive_type === 'rebate' && (
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">Rebate</Badge>
                          )}
                          {program.incentive_type === 'tax_credit' && (
                            <Badge className="bg-indigo-100 text-indigo-700 text-xs">Tax Credit</Badge>
                          )}
                          {program.incentive_type === 'tax_exemption' && (
                            <Badge className="bg-indigo-100 text-indigo-700 text-xs">Tax Exemption</Badge>
                          )}
                          {program.incentive_type === 'grant' && (
                            <Badge className="bg-teal-100 text-teal-700 text-xs">Grant</Badge>
                          )}
                          {program.incentive_type === 'subsidy' && (
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">Subsidy</Badge>
                          )}
                          {/* Property Type Badges */}
                          {program.residential_eligible && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs">Residential</Badge>
                          )}
                          {program.commercial_eligible && (
                            <Badge className="bg-purple-100 text-purple-700 text-xs">Commercial</Badge>
                          )}
                          {program.applicant_type === 'business' && !program.residential_eligible && (
                            <Badge className="bg-amber-100 text-amber-700 text-xs">Business Only</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-700 text-lg">
                          {program.incentive_amount_max
                            ? `Up to $${program.incentive_amount_max.toLocaleString()}`
                            : 'Varies'}
                        </p>
                        {program.incentive_amount_min && program.incentive_amount_min !== program.incentive_amount_max && (
                          <p className="text-xs text-gray-500">Min: ${program.incentive_amount_min.toLocaleString()}</p>
                        )}
                      </div>
                    </div>

                    {program.program_description && (
                      <p className="text-sm text-gray-600 mb-3">{program.program_description}</p>
                    )}

                    {/* Program Tiers */}
                    {program.tiers && program.tiers.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700 mb-2">Tier Structure:</p>
                        <div className="space-y-2">
                          {program.tiers.map((tier: any, tierIdx: number) => (
                            <div key={tierIdx} className="flex justify-between text-sm bg-white/50 rounded px-3 py-2">
                              <div>
                                <span className="font-medium">{tier.tier_name || `Tier ${tier.tier_number}`}</span>
                                {tier.requirements && <span className="text-gray-500 ml-2">- {tier.requirements}</span>}
                              </div>
                              <span className="font-medium text-emerald-700">
                                ${tier.min_amount?.toLocaleString()} - ${tier.max_amount?.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact & Apply Row */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-sm">
                      <div className="flex items-center gap-4">
                        {program.incentive_url && (
                          <a
                            href={program.incentive_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {(() => {
                              try {
                                const domain = new URL(program.incentive_url).hostname.replace('www.', '');
                                return domain;
                              } catch {
                                return 'Apply';
                              }
                            })()}
                          </a>
                        )}
                        {program.program_contact_email && (
                          <a href={`mailto:${program.program_contact_email}`} className="flex items-center gap-1 text-gray-500 hover:text-emerald-600">
                            <Mail className="h-3 w-3" />
                            Email
                          </a>
                        )}
                        {program.program_contact_phone && (
                          <a href={`tel:${program.program_contact_phone}`} className="flex items-center gap-1 text-gray-500 hover:text-emerald-600">
                            <Phone className="h-3 w-3" />
                            {program.program_contact_phone}
                          </a>
                        )}
                      </div>

                      {/* Expand/Collapse Button */}
                      {hasDetails && (
                        <button
                          onClick={() => toggleProgramExpanded(program.program_name)}
                          className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
                        >
                          {isExpanded ? 'Less' : 'More details'}
                          {isExpanded ? <ChevronDown className="h-4 w-4 rotate-180" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details Section */}
                  {isExpanded && hasDetails && (
                    <div className="bg-gray-50 border-t border-gray-200 p-4 space-y-4">
                      {/* Eligibility Details */}
                      {program.eligibility_details && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                            <Check className="h-4 w-4 text-emerald-600" />
                            Eligibility Requirements
                          </h4>
                          <p className="text-sm text-gray-600 pl-6">{program.eligibility_details}</p>
                        </div>
                      )}

                      {/* How to Apply */}
                      {program.how_to_apply && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                            <ListChecks className="h-4 w-4 text-emerald-600" />
                            How to Apply
                          </h4>
                          <p className="text-sm text-gray-600 pl-6 whitespace-pre-line">{program.how_to_apply}</p>
                        </div>
                      )}

                      {/* Documentation Required */}
                      {program.documentation_required && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                            <ClipboardList className="h-4 w-4 text-emerald-600" />
                            Required Documentation
                          </h4>
                          <p className="text-sm text-gray-600 pl-6">{program.documentation_required}</p>
                        </div>
                      )}

                      {/* Coverage Area & Deadline in a row */}
                      {(program.coverage_area || program.deadline_info) && (
                        <div className="flex flex-wrap gap-6 pt-2">
                          {program.coverage_area && (
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Coverage Area</p>
                                <p className="text-sm text-gray-700">{program.coverage_area}</p>
                              </div>
                            </div>
                          )}
                          {program.deadline_info && (
                            <div className="flex items-start gap-2">
                              <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Timing</p>
                                <p className="text-sm text-gray-700">{program.deadline_info}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                  )
              })}
            </div>
          </div>
        )}

        {/* No Rebates Message */}
        {allIncentives.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6 text-center">
            <DollarSign className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-600">No rebate programs currently available for this location.</p>
            <p className="text-sm text-gray-500 mt-1">Check back later or contact your local water utility.</p>
          </div>
        )}

        {/* Official Resources */}
        {(effective?.documentation_url || stateStaticData?.governmentWebsite) && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Official Resources</h2>
            <div className="space-y-3">
              {effective?.documentation_url && (
                <a
                  href={effective.documentation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Local Regulations
                </a>
              )}
              {stateStaticData?.governmentWebsite && (
                <a
                  href={stateStaticData.governmentWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  State Regulatory Agency
                </a>
              )}
              {stateStaticData?.governingCode && (
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Governing Code:</p>
                  <p className="text-sm text-gray-700">{stateStaticData.governingCode}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Fallback
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <p className="text-gray-600">Loading...</p>
    </div>
  )
}
