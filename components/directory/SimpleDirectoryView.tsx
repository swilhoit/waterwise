"use client"

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Search, Check, ExternalLink } from 'lucide-react'
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

  // Data states
  const [states, setStates] = useState<StateItem[]>(initialData)
  const [counties, setCounties] = useState<CountyItem[]>([])
  const [cities, setCities] = useState<CityItem[]>([])
  const [allCities, setAllCities] = useState<CityItem[]>([])
  const [compliance, setCompliance] = useState<ComplianceData | null>(null)

  // Selection states
  const [selectedState, setSelectedState] = useState<StateItem | null>(null)
  const [selectedCounty, setSelectedCounty] = useState<CountyItem | null>(null)
  const [selectedCity, setSelectedCity] = useState<CityItem | null>(null)

  // UI states
  const [loading, setLoading] = useState(!initialData.length)
  const [searchTerm, setSearchTerm] = useState('')

  // ==========================================================================
  // DATA FETCHING
  // ==========================================================================

  const fetchStates = async () => {
    try {
      const res = await fetch('/api/greywater-directory/hierarchy?level=states')
      const data = await res.json()
      if (data.status === 'success') {
        // Map states with legal status - no extra API calls needed
        const mapped = data.data.map((state: StateItem) => ({
          ...state,
          legalStatus: state.legalStatus || 'Legal' // Default to Legal for greywater directory
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

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================

  useEffect(() => {
    const init = async () => {
      // Fetch states if needed
      let statesData = initialData.length > 0 ? initialData : []
      if (statesData.length === 0) {
        await fetchStates()
        statesData = states
      }

      if (initialState && statesData.length > 0) {
        const state = statesData.find((s: StateItem) => s.state_code === initialState)
        if (state) {
          setSelectedState(state)

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
      } else if (!initialData.length) {
        fetchStates()
      }
    }
    init()
  }, [initialState, initialCounty, initialCity])

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
  // RENDER: STATE PAGE (Level 2)
  // ==========================================================================

  if (selectedState && !selectedCounty && !selectedCity) {
    const filteredCities = allCities.filter(c =>
      c.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

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

        {/* State Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedState.state_name}</h1>

          <div className="flex items-center gap-3 mb-4">
            {selectedState.legalStatus && (
              <Badge className={
                selectedState.legalStatus === 'Legal' ? 'bg-emerald-100 text-emerald-700' :
                selectedState.legalStatus === 'Regulated' ? 'bg-gray-100 text-gray-700' :
                'bg-amber-100 text-amber-700'
              }>
                {selectedState.legalStatus}
              </Badge>
            )}
            <span className="text-gray-500">{selectedState.city_count} cities</span>
          </div>

          {compliance?.state?.regulation_summary && (
            <p className="text-gray-600">{compliance.state.regulation_summary}</p>
          )}
        </div>

        {/* City Search */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Find Your City</h2>
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
          {filteredCities.slice(0, 50).map((city, idx) => (
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
          {filteredCities.length > 50 && (
            <p className="text-center text-sm text-gray-500 py-4">
              Showing 50 of {filteredCities.length} cities. Use search to narrow results.
            </p>
          )}
          {filteredCities.length === 0 && searchTerm && (
            <p className="text-center text-gray-500 py-8">No cities found matching "{searchTerm}"</p>
          )}
        </div>
      </div>
    )
  }

  // ==========================================================================
  // RENDER: COUNTY PAGE (Level 2.5) - Simplified
  // ==========================================================================

  if (selectedState && selectedCounty && !selectedCity) {
    const filteredCities = cities.filter(c =>
      c.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedCounty.county_name} County</h1>
          <p className="text-gray-500">{selectedState.state_name} • {selectedCounty.city_count} cities</p>
        </div>

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
  // RENDER: CITY PAGE (Level 3) - The Answer Page
  // ==========================================================================

  if (selectedState && selectedCounty && selectedCity) {
    const effective = compliance?.effective
    const incentives = [
      ...(compliance?.state?.incentives || []),
      ...(compliance?.county?.incentives || []),
      ...(compliance?.city?.incentives || [])
    ]

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
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
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full">
              <Check className="h-4 w-4" />
              <span className="font-medium text-sm">Greywater Legal</span>
            </div>
          </div>

          {effective?.regulation_summary && (
            <p className="text-gray-600">{effective.regulation_summary}</p>
          )}
        </div>

        {/* Permit Requirements */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Permit Requirements</h2>

          <div className="space-y-4">
            <div className="flex items-start justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Simple Systems</p>
                <p className="text-sm text-gray-500">Laundry-to-landscape, under 250 gal/day</p>
              </div>
              <span className="text-emerald-600 font-medium">No permit</span>
            </div>

            <div className="flex items-start justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Standard Systems</p>
                <p className="text-sm text-gray-500">Multi-fixture, 250+ gal/day</p>
              </div>
              <div className="text-right">
                <span className="text-gray-900 font-medium">Permit required</span>
                {effective?.permit_fee && (
                  <p className="text-sm text-gray-500">${effective.permit_fee} fee</p>
                )}
              </div>
            </div>

            <div className="flex items-start justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Complex/Commercial</p>
                <p className="text-sm text-gray-500">Indoor reuse, large systems</p>
              </div>
              <span className="text-gray-900 font-medium">Permit + plans</span>
            </div>
          </div>
        </div>

        {/* Rebates & Incentives */}
        {incentives.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Rebates</h2>

            <div className="space-y-3">
              {incentives.slice(0, 5).map((program: any, idx: number) => (
                <div key={idx} className="flex items-start justify-between p-4 bg-emerald-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{program.program_name || 'Rebate Program'}</p>
                    {program.program_description && (
                      <p className="text-sm text-gray-600 mt-1">{program.program_description}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-emerald-700">
                      {program.incentive_amount_max
                        ? `Up to $${program.incentive_amount_max.toLocaleString()}`
                        : program.rebate_percentage
                        ? `${program.rebate_percentage}%`
                        : 'Varies'}
                    </p>
                    {program.incentive_url && (
                      <a
                        href={program.incentive_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 mt-1"
                      >
                        Apply <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Rebates Message */}
        {incentives.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6 text-center">
            <p className="text-gray-600">No rebate programs currently available for this location.</p>
          </div>
        )}

        {/* Official Resources */}
        {(compliance?.state?.documentation_url || compliance?.effective?.documentation_url) && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Official Resources</h2>
            <div className="space-y-2">
              {compliance?.effective?.documentation_url && (
                <a
                  href={compliance.effective.documentation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Official Documentation
                </a>
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
