"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Search, Check, ExternalLink, Phone, Mail, Building2, FileText, Droplets, AlertTriangle, Clock, DollarSign, ShieldCheck, Gauge } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { nameToSlug, findBySlug } from '@/lib/url-utils'

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

interface StateStaticData {
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
  agencyPhone?: string
  governmentWebsite?: string
  regulatoryClassification?: string
  summary?: string
  state_name?: string
  state_code?: string
  has_incentives?: boolean
  incentive_count?: number
  max_rebate_amount?: number
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
  const [stateStaticData, setStateStaticData] = useState<StateStaticData | null>(null)

  // Selection states - initialize from initialData if available
  const [selectedState, setSelectedState] = useState<StateItem | null>(initialSelectedState)
  const [selectedCounty, setSelectedCounty] = useState<CountyItem | null>(null)
  const [selectedCity, setSelectedCity] = useState<CityItem | null>(null)

  // UI states
  const [loading, setLoading] = useState(!initialData.length && !initialSelectedState)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllCities, setShowAllCities] = useState(false)
  const [viewMode, setViewMode] = useState<'cities' | 'counties'>('cities')
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<'all' | 'residential' | 'commercial'>('all')
  const INITIAL_CITIES_SHOWN = 50

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
      const res = await fetch(`/api/greywater-directory/state-data?state=${stateCode}`)
      const data = await res.json()
      if (data.status === 'success') setStateStaticData(data.data)
    } catch (err) {
      console.error('Failed to fetch state static data:', err)
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Greywater Regulations by State</h1>
          <p className="text-gray-600">Find greywater rules and rebates for your location</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* States Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Loading states...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredStates.map((state) => (
              <button
                key={state.state_jurisdiction_id}
                onClick={() => navigateToState(state)}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors text-left group"
              >
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-emerald-700">{state.state_name}</p>
                  <p className="text-sm text-gray-500">{state.city_count || 0} cities</p>
                </div>
                <div className="flex items-center gap-2">
                  {state.legalStatus === 'Legal' && (
                    <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">Legal</span>
                  )}
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ==========================================================================
  // RENDER: STATE PAGE (Level 2) - ENHANCED
  // ==========================================================================

  if (selectedState && !selectedCounty && !selectedCity) {
    // Sort cities: top cities first (alphabetically), then remaining cities alphabetically
    const sortedCities = [...allCities].sort((a, b) => {
      const aIsTop = TOP_CA_CITIES.some(c => c.toLowerCase() === a.city_name?.toLowerCase())
      const bIsTop = TOP_CA_CITIES.some(c => c.toLowerCase() === b.city_name?.toLowerCase())
      // Both are top cities - sort alphabetically
      if (aIsTop && bIsTop) return (a.city_name || '').localeCompare(b.city_name || '')
      // Only a is a top city
      if (aIsTop) return -1
      // Only b is a top city
      if (bIsTop) return 1
      // Neither is a top city - sort alphabetically
      return (a.city_name || '').localeCompare(b.city_name || '')
    })

    const filteredCities = sortedCities.filter(c =>
      c.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredCounties = counties.filter(c =>
      c.county_name?.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => (a.county_name || '').localeCompare(b.county_name || ''))

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <button onClick={() => router.push(basePath)} className="text-gray-500 hover:text-emerald-600">
            All States
          </button>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">{selectedState.state_name}</span>
        </nav>

        {/* Recent Changes Banner */}
        {stateStaticData?.recentChanges && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Recent Regulatory Update</p>
              <p className="text-sm text-amber-700">{stateStaticData.recentChanges}</p>
            </div>
          </div>
        )}

        {/* State Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedState.state_name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={
                  stateStaticData?.legalStatus === 'Legal' ? 'bg-emerald-100 text-emerald-700' :
                  stateStaticData?.legalStatus === 'Regulated' ? 'bg-blue-100 text-blue-700' :
                  stateStaticData?.legalStatus === 'Limited/Unclear' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }>
                  {stateStaticData?.legalStatus || selectedState.legalStatus || 'Legal'}
                </Badge>
                {stateStaticData?.regulatoryClassification && (
                  <span className="text-sm text-gray-500">{stateStaticData.regulatoryClassification}</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">{selectedState.city_count}</span>
              <p className="text-sm text-gray-500">cities</p>
            </div>
          </div>

          {/* Summary */}
          {stateStaticData?.summary && (
            <p className="text-gray-600 mb-4">{stateStaticData.summary}</p>
          )}

          {/* Use Type Indicators */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <div className={`flex items-center gap-2 ${stateStaticData?.outdoorUseAllowed ? 'text-emerald-600' : 'text-gray-400'}`}>
              <Droplets className="h-4 w-4" />
              <span className="text-sm font-medium">Outdoor Use {stateStaticData?.outdoorUseAllowed ? 'Allowed' : 'Not Allowed'}</span>
            </div>
            <div className={`flex items-center gap-2 ${stateStaticData?.indoorUseAllowed ? 'text-emerald-600' : 'text-gray-400'}`}>
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Indoor Use {stateStaticData?.indoorUseAllowed ? 'Allowed' : 'Not Allowed'}</span>
            </div>
          </div>
        </div>

        {/* Permit & Regulations Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Permit Requirements */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-400" />
              Permit Requirements
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Permit Required</span>
                <span className="font-medium">{stateStaticData?.permitRequired || 'Varies'}</span>
              </div>
              {stateStaticData?.permitThresholdGpd !== null && stateStaticData?.permitThresholdGpd !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">No-Permit Threshold</span>
                  <span className="font-medium">{stateStaticData.permitThresholdGpd > 0 ? `Under ${stateStaticData.permitThresholdGpd} GPD` : 'All systems need permit'}</span>
                </div>
              )}
              {stateStaticData?.governingCode && (
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Governing Code:</span>
                  <p className="text-sm font-medium text-gray-700 mt-1">{stateStaticData.governingCode}</p>
                </div>
              )}
            </div>
          </div>

          {/* Agency Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-400" />
              Regulatory Agency
            </h2>
            <div className="space-y-3">
              {stateStaticData?.primaryAgency && (
                <p className="font-medium text-gray-900">{stateStaticData.primaryAgency}</p>
              )}
              {stateStaticData?.agencyPhone && (
                <a href={`tel:${stateStaticData.agencyPhone}`} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                  <Phone className="h-4 w-4" />
                  {stateStaticData.agencyPhone}
                </a>
              )}
              {stateStaticData?.governmentWebsite && (
                <a href={stateStaticData.governmentWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                  <ExternalLink className="h-4 w-4" />
                  Official Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Approved Uses & Restrictions */}
        {(stateStaticData?.approvedUses?.length || stateStaticData?.keyRestrictions?.length) && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Approved Uses */}
            {stateStaticData?.approvedUses && stateStaticData.approvedUses.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-600" />
                  Approved Uses
                </h2>
                <ul className="space-y-2">
                  {stateStaticData.approvedUses.map((use, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-emerald-800">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Restrictions */}
            {stateStaticData?.keyRestrictions && stateStaticData.keyRestrictions.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Key Restrictions
                </h2>
                <ul className="space-y-2">
                  {stateStaticData.keyRestrictions.map((restriction, idx) => (
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

        {/* Incentives Summary */}
        {stateStaticData?.has_incentives && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  Rebates Available
                </h2>
                <p className="text-gray-600 mt-1">
                  {stateStaticData.incentive_count} rebate program{stateStaticData.incentive_count !== 1 ? 's' : ''} available in {selectedState.state_name}
                </p>
              </div>
              {stateStaticData.max_rebate_amount && stateStaticData.max_rebate_amount > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Up to</p>
                  <p className="text-2xl font-bold text-emerald-600">${stateStaticData.max_rebate_amount.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View Toggle & Search */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {viewMode === 'cities' ? 'Find Your City' : 'Browse by County'}
            </h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => { setViewMode('cities'); setSearchTerm(''); setShowAllCities(false); }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'cities'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cities
              </button>
              <button
                onClick={() => { setViewMode('counties'); setSearchTerm(''); }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'counties'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
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
                  {city.county_name && (
                    <p className="text-sm text-gray-500">{city.county_name} County</p>
                  )}
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
                <div key={idx} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{incentive.program_name}</h3>
                      <div className="flex gap-2 mt-1">
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
                  <div className="flex items-center gap-4 pt-3 border-t border-emerald-200 text-sm">
                    {incentive.incentive_url && (
                      <a
                        href={incentive.incentive_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> Apply
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

    // Parse allowed sources
    const allowedSources = effective?.allowed_sources?.split(',').map((s: string) => s.trim()).filter(Boolean) ||
                          stateStaticData?.approvedUses || []
    const prohibitedSources = effective?.prohibited_sources?.split(',').map((s: string) => s.trim()).filter(Boolean) || []

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

        {/* Permit Requirements - Using Actual Data */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-400" />
            Permit Requirements
          </h2>

          <div className="space-y-4">
            {/* Show actual permit info if available */}
            {effective && effective.permit_required !== null && (
              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Permit Status</p>
                  <p className="text-sm text-gray-500">{effective.permit_type || 'Standard permit'}</p>
                </div>
                <span className={effective.permit_required ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
                  {effective.permit_required ? 'Required' : 'Not required'}
                </span>
              </div>
            )}

            {/* Permit Fee */}
            {effective && (effective.permit_fee || effective.annual_fee) && (
              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Permit Fees</p>
                  {effective.processing_time_days && (
                    <p className="text-sm text-gray-500">Processing: ~{effective.processing_time_days} days</p>
                  )}
                </div>
                <div className="text-right">
                  {effective.permit_fee && (
                    <p className="font-medium text-gray-900">${effective.permit_fee} initial</p>
                  )}
                  {effective.annual_fee && (
                    <p className="text-sm text-gray-500">${effective.annual_fee}/year</p>
                  )}
                </div>
              </div>
            )}

            {/* System Size Limits */}
            {effective?.system_size_limits && (
              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">System Size Limits</p>
                </div>
                <span className="text-gray-700">{effective.system_size_limits}</span>
              </div>
            )}

            {/* Inspection Required */}
            {effective && effective.inspection_required !== undefined && (
              <div className="flex items-start justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Inspection Required</p>
                </div>
                <span className={effective.inspection_required ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
                  {effective.inspection_required ? 'Yes' : 'No'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Water Sources - Allowed & Prohibited */}
        {(allowedSources.length > 0 || prohibitedSources.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Allowed Sources */}
            {allowedSources.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-600" />
                  Allowed Water Sources
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

            {/* Prohibited Sources */}
            {prohibitedSources.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Prohibited Sources
                </h2>
                <ul className="space-y-2">
                  {prohibitedSources.map((source: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-red-800">
                      <span className="text-red-500 mt-1">✕</span>
                      <span className="text-sm">{source}</span>
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
                Available Rebates
                <span className="text-sm font-normal text-gray-500">({allIncentives.length})</span>
              </h2>
              {/* Property Type Filter */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPropertyTypeFilter('all')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    propertyTypeFilter === 'all'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setPropertyTypeFilter('residential')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    propertyTypeFilter === 'residential'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Residential
                </button>
                <button
                  onClick={() => setPropertyTypeFilter('commercial')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    propertyTypeFilter === 'commercial'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {allIncentives
                .filter((program: any) => {
                  if (propertyTypeFilter === 'all') return true;
                  // Strict filtering: only show if explicitly eligible
                  if (propertyTypeFilter === 'residential') return program.residential_eligible === true;
                  if (propertyTypeFilter === 'commercial') return program.commercial_eligible === true;
                  return true;
                })
                .map((program: any, idx: number) => (
                <div key={idx} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{program.program_name || 'Rebate Program'}</p>
                      <div className="flex gap-2 mt-1">
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
                    <div className="mt-3 pt-3 border-t border-emerald-200">
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

                  {/* Contact & Apply */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-emerald-200 text-sm">
                    {program.incentive_url && (
                      <a
                        href={program.incentive_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> Apply
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
                </div>
              ))}
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
