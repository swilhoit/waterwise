"use client" 

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  MapPin, 
  Building, 
  Home, 
  Droplets, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  Search,
  Globe,
  Phone,
  Mail,
  LayoutGrid,
  TableIcon
} from 'lucide-react'
import DetailedComplianceView from './DetailedComplianceView'
import StateDetailView from './StateDetailView'
import CountyDetailView from './CountyDetailView'
import { nameToSlug, slugToName, findBySlug } from '@/lib/url-utils'

interface HierarchyItem {
  // State fields
  state_jurisdiction_id?: string
  state_name?: string
  state_code?: string
  
  // State regulatory fields
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
  
  // County fields
  county_jurisdiction_id?: string
  county_name?: string
  
  // City fields
  city_jurisdiction_id?: string
  city_name?: string
  population?: number
  
  // Water district fields
  district_id?: string
  district_name?: string
  website?: string
  phone?: string
  email?: string
  rebate_program_name?: string
  rebate_amount?: number
  rebate_program_url?: string
  
  // Common fields
  regulation_summary?: string
  county_count?: number
  city_count?: number
  has_greywater_policy?: number
  max_rebate_amount?: number
}

interface BreadcrumbItem {
  label: string
  path: string
  type: 'states' | 'counties' | 'cities'
}

interface DirectoryViewProps {
  initialState?: string
  initialCounty?: string
  initialCity?: string
  level: 'states' | 'counties' | 'cities'
  basePath?: string
  stateData?: any
  showStateDetail?: boolean
  initialData?: HierarchyItem[] // Pre-fetched data from server
}

export default function DirectoryView({
  initialState,
  initialCounty,
  initialCity,
  level,
  basePath = '/resources',
  stateData,
  showStateDetail = false,
  initialData = []
}: DirectoryViewProps) {
  const router = useRouter()

  const [currentLevel, setCurrentLevel] = useState<'states' | 'counties' | 'cities'>(level)
  const [data, setData] = useState<HierarchyItem[]>(initialData) // Start with pre-fetched data
  const [loading, setLoading] = useState(!initialData.length) // Don't show loading if we have initial data
  const [error, setError] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<HierarchyItem | null>(null)
  const [selectedCounty, setSelectedCounty] = useState<HierarchyItem | null>(null)
  const [selectedCity, setSelectedCity] = useState<HierarchyItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')
  const [complianceDetails, setComplianceDetails] = useState<any>(null)
  const [loadingCompliance, setLoadingCompliance] = useState(false)
  const [waterDistricts, setWaterDistricts] = useState<HierarchyItem[]>([])
  const [showWaterDistricts, setShowWaterDistricts] = useState(false)
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])
  const [stateViewMode, setStateViewMode] = useState<'counties' | 'cities'>('counties')
  const [allCitiesData, setAllCitiesData] = useState<HierarchyItem[]>([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [sectorView, setSectorView] = useState<'residential' | 'commercial'>('residential')

  // Fetch all cities for a state
  const fetchAllCitiesForState = async (stateId: string) => {
    setLoadingCities(true)
    try {
      const params = new URLSearchParams({ 
        level: 'cities',
        parentId: stateId,
        parentType: 'state'
      })
      
      const response = await fetch(`/api/greywater-directory/hierarchy?${params}`)
      const result = await response.json()
      
      if (result.status === 'success') {
        setAllCitiesData(result.data)
      }
    } catch (err) {
      console.error('Failed to fetch cities:', err)
      setAllCitiesData([])
    } finally {
      setLoadingCities(false)
    }
  }

  // Fetch data based on current level and parent
  const fetchData = async (
    level: 'states' | 'counties' | 'cities' | 'water_districts',
    parentId?: string,
    parentType?: string,
    stateCode?: string
  ) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ level })
      if (parentId) params.append('parentId', parentId)
      if (parentType) params.append('parentType', parentType)
      if (stateCode) params.append('stateCode', stateCode)

      const response = await fetch(`/api/greywater-directory/hierarchy?${params}`)
      const result = await response.json()

      if (result.status === 'success') {
        // For states, enrich with full state data from JSON
        if (level === 'states') {
          const enrichedStates = await Promise.all(
            result.data.map(async (state: HierarchyItem) => {
              try {
                const stateResponse = await fetch(`/api/greywater-directory/state-data?state=${state.state_code}`)
                const stateResult = await stateResponse.json()
                if (stateResult.status === 'success') {
                  return { ...state, ...stateResult.data }
                }
              } catch (error) {
                console.error('Error fetching state data:', error)
              }
              return state
            })
          )
          setData(enrichedStates)
        } else {
          setData(result.data)
        }
        if (level !== 'water_districts') {
          setCurrentLevel(level as 'states' | 'counties' | 'cities')
        }
      } else {
        setError(result.message || 'Failed to load data')
      }
    } catch (err) {
      setError('Failed to connect to database')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch compliance details
  const fetchComplianceDetails = async (state?: string, county?: string, city?: string) => {
    if (!state) return
    
    setLoadingCompliance(true)
    try {
      const params = new URLSearchParams({ state })
      if (county) params.append('county', county)
      if (city) params.append('city', city)
      
      const response = await fetch(`/api/greywater-directory/compliance?${params}`)
      const result = await response.json()
      
      if (result.status === 'success') {
        setComplianceDetails(result.compliance)
      }
    } catch (err) {
      console.error('Failed to fetch compliance details:', err)
    } finally {
      setLoadingCompliance(false)
    }
  }

  // Navigate to states
  const selectState = (state: HierarchyItem) => {
    router.push(`${basePath}/${state.state_code}`)
  }

  // Navigate to counties  
  const selectCounty = (county: HierarchyItem) => {
    router.push(`${basePath}/${selectedState?.state_code}/${nameToSlug(county.county_name || '')}`)
  }

  // Navigate to cities
  const selectCity = (city: HierarchyItem) => {
    router.push(`${basePath}/${selectedState?.state_code}/${nameToSlug(selectedCounty?.county_name || '')}/${nameToSlug(city.city_name || '')}`)
  }

  // Fetch water districts for a city
  const fetchWaterDistricts = async (cityName: string) => {
    try {
      const params = new URLSearchParams({ 
        level: 'water_districts',
        parentId: cityName,
        parentType: 'city'
      })
      
      const response = await fetch(`/api/greywater-directory/hierarchy?${params}`)
      const result = await response.json()
      
      if (result.status === 'success') {
        setWaterDistricts(result.data)
      }
    } catch (err) {
      console.error('Failed to fetch water districts:', err)
      setWaterDistricts([])
    }
  }

  // Initialize data and state based on props
  useEffect(() => {
    const initializeDirectory = async () => {
      // Build breadcrumbs based on current path
      const newBreadcrumbs: BreadcrumbItem[] = [
        { label: 'All States', path: basePath, type: 'states' }
      ]

      if (initialState) {
        // Load states first to get state data
        try {
          // Use initialData if available, otherwise fetch from API
          let statesData = initialData.length > 0 ? initialData : []

          if (statesData.length === 0) {
            const statesResponse = await fetch('/api/greywater-directory/hierarchy?level=states')
            const statesResult = await statesResponse.json()

            if (statesResult.status === 'success') {
              statesData = statesResult.data
            }
          }

          if (statesData.length > 0) {
            const stateData = statesData.find((s: HierarchyItem) => s.state_code === initialState)
            
            if (stateData) {
              setSelectedState(stateData)
              newBreadcrumbs.push({ 
                label: stateData.state_name || '', 
                path: `${basePath}/${initialState}`, 
                type: 'counties' 
              })
              
              if (initialCounty) {
                // Load counties to get county data
                const countiesResponse = await fetch(`/api/greywater-directory/hierarchy?level=counties&parentId=${stateData.state_jurisdiction_id}`)
                const countiesResult = await countiesResponse.json()
                
                if (countiesResult.status === 'success') {
                  const countyData = findBySlug(countiesResult.data, initialCounty, 'county_name')
                  
                  if (countyData) {
                    setSelectedCounty(countyData)
                    newBreadcrumbs.push({ 
                      label: countyData.county_name || '', 
                      path: `${basePath}/${initialState}/${nameToSlug(countyData.county_name || '')}`, 
                      type: 'cities' 
                    })
                    
                    if (initialCity) {
                      // Load cities to get city data
                      const citiesResponse = await fetch(`/api/greywater-directory/hierarchy?level=cities&parentId=${countyData.county_jurisdiction_id}&parentType=county`)
                      const citiesResult = await citiesResponse.json()
                      
                      if (citiesResult.status === 'success') {
                        const cityData = findBySlug(citiesResult.data, initialCity, 'city_name')
                        
                        if (cityData) {
                          const fullCityData = {
                            ...cityData,
                            state_code: stateData.state_code,
                            state_name: stateData.state_name
                          };
                          setSelectedCity(fullCityData)
                          
                          newBreadcrumbs.push({ 
                            label: cityData.city_name || '', 
                            path: `${basePath}/${initialState}/${nameToSlug(countyData.county_name || '')}/${nameToSlug(cityData.city_name || '')}`, 
                            type: 'cities' 
                          })
                          
                          // For city view, show empty data and fetch water districts
                          setData([])
                          setCurrentLevel('cities')
                          setLoading(false)  // Don't show loading for city detail page
                          fetchWaterDistricts(cityData.city_name || '')
                          fetchComplianceDetails(initialState, countyData.county_name, cityData.city_name)
                        }
                      }
                    } else {
                      // Show cities in this county
                      fetchData('cities', countyData.county_jurisdiction_id, 'county', stateData.state_code)
                      fetchComplianceDetails(initialState, countyData.county_name)
                    }
                  }
                }
              } else {
                // Show counties in this state
                if (stateData.state_jurisdiction_id) {
                  fetchData('counties', stateData.state_jurisdiction_id)
                  fetchAllCitiesForState(stateData.state_jurisdiction_id)
                  fetchComplianceDetails(initialState)
                }
              }
            }
          }
        } catch (error) {
          console.error('Failed to initialize directory:', error)
          // Only fetch if we don't have initial data
          if (initialData.length === 0) {
            fetchData('states')
          }
        }
      } else {
        // Show all states - only fetch if we don't have initial data
        if (initialData.length === 0) {
          fetchData('states')
        }
      }

      setBreadcrumbs(newBreadcrumbs)
    }

    initializeDirectory()
  }, [initialState, initialCounty, initialCity, basePath])

  // Filter data based on search
  const getFilteredData = () => {
    // For state pages, check which view mode we're in
    const dataToFilter = (selectedState && !selectedCounty && !selectedCity && stateViewMode === 'cities') 
      ? allCitiesData 
      : data
      
    return dataToFilter.filter(item => {
      const searchLower = searchTerm.toLowerCase()
      return (
        item.state_name?.toLowerCase().includes(searchLower) ||
        item.county_name?.toLowerCase().includes(searchLower) ||
        item.city_name?.toLowerCase().includes(searchLower) ||
        item.district_name?.toLowerCase().includes(searchLower) ||
        item.state_code?.toLowerCase().includes(searchLower)
      )
    })
  }
  
  const filteredData = getFilteredData()

  // Render table row based on level
  const renderTableRow = (item: HierarchyItem, index: number) => {
    switch (currentLevel) {
      case 'states':
        return (
          <TableRow 
            key={item.state_jurisdiction_id}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => selectState(item)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                {item.state_name}
              </div>
            </TableCell>
            <TableCell>{item.state_code}</TableCell>
            <TableCell>{item.county_count || 0}</TableCell>
            <TableCell>{item.city_count || 0}</TableCell>
            <TableCell>
              {item.legalStatus ? (
                <Badge 
                  variant="default" 
                  className={
                    item.legalStatus === 'Legal' ? 'bg-green-100 text-green-800' :
                    item.legalStatus === 'Regulated' ? 'bg-blue-100 text-blue-800' :
                    item.legalStatus === 'Highly Regulated' ? 'bg-orange-100 text-orange-800' :
                    item.legalStatus === 'Limited/Unclear' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }
                >
                  {item.legalStatus}
                </Badge>
              ) : (
                <Badge variant="secondary">
                  View Details
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </TableCell>
          </TableRow>
        )

      case 'counties':
        return (
          <TableRow 
            key={item.county_jurisdiction_id}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => selectCounty(item)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                {item.county_name}
              </div>
            </TableCell>
            <TableCell>{item.city_count || 0}</TableCell>
            <TableCell>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </TableCell>
          </TableRow>
        )

      case 'cities':
        return (
          <TableRow 
            key={`city-${item.city_name}-${item.county_name || item.state_code}-${index}`}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => selectCity(item)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-gray-500" />
                {item.city_name}
              </div>
            </TableCell>
            <TableCell>
              {item.population ? item.population.toLocaleString() : <span className="text-gray-400">-</span>}
            </TableCell>
            <TableCell>
              {item.has_greywater_policy === 1 ? (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  City Policy
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <XCircle className="h-3 w-3 mr-1" />
                  County/State
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </TableCell>
          </TableRow>
        )

      default:
        return null
    }
  }

  // Render card based on level
  const renderCard = (item: HierarchyItem, index: number) => {
    switch (currentLevel) {
      case 'states':
        return (
          <Card 
            key={item.state_jurisdiction_id}
            className="transition-all duration-200 cursor-pointer hover:border-blue-400 hover:-translate-y-1"
            onClick={() => selectState(item)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    {item.state_name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {item.state_code} • {item.county_count} Counties • {item.city_count} Cities
                  </CardDescription>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.legalStatus ? (
                    <Badge 
                      variant="default" 
                      className={
                        item.legalStatus === 'Legal' ? 'bg-green-100 text-green-800' :
                        item.legalStatus === 'Regulated' ? 'bg-blue-100 text-blue-800' :
                        item.legalStatus === 'Highly Regulated' ? 'bg-orange-100 text-orange-800' :
                        item.legalStatus === 'Limited/Unclear' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {item.legalStatus}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      View Details
                    </Badge>
                  )}
                  {item.regulatoryClassification && (
                    <Badge variant="outline" className="text-xs">
                      {item.regulatoryClassification}
                    </Badge>
                  )}
                </div>
                {item.permitRequired && (
                  <p className="text-sm text-gray-600">
                    <FileText className="h-3 w-3 inline mr-1" />
                    Permits: {item.permitRequired}
                  </p>
                )}
                {item.summary && (
                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                    {item.summary}
                  </p>
                )}
                {item.max_rebate_amount && item.max_rebate_amount > 0 && (
                  <p className="text-sm text-green-700 font-medium">
                    Up to ${item.max_rebate_amount.toLocaleString()} in rebates
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 'counties':
        return (
          <Card 
            key={item.county_jurisdiction_id}
            className="transition-all duration-200 cursor-pointer hover:border-blue-400 hover:-translate-y-1"
            onClick={() => selectCounty(item)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    {item.county_name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {item.city_count} Cities
                  </CardDescription>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {item.regulation_summary && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.regulation_summary}
                  </p>
                )}
                {item.max_rebate_amount && item.max_rebate_amount > 0 && (
                  <p className="text-sm text-green-700 font-medium">
                    Up to ${item.max_rebate_amount.toLocaleString()} in rebates
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 'cities':
        return (
          <Card 
            key={`city-${item.city_name}-${item.county_name || item.state_code}-${index}`}
            className="transition-all duration-200 cursor-pointer hover:border-blue-400 hover:-translate-y-1"
            onClick={() => selectCity(item)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Home className="h-5 w-5 text-green-600" />
                    {item.city_name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {item.population && `Population: ${item.population.toLocaleString()}`}
                  </CardDescription>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {item.regulation_summary && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.regulation_summary}
                  </p>
                )}
                {item.max_rebate_amount && item.max_rebate_amount > 0 && (
                  <p className="text-sm text-green-700 font-medium">
                    Up to ${item.max_rebate_amount.toLocaleString()} in rebates
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 mb-6 text-sm bg-white px-4 py-3 rounded-lg border">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />}
              <button
                onClick={() => router.push(crumb.path)}
                className={`hover:text-blue-600 transition-colors truncate ${
                  index === breadcrumbs.length - 1
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-600'
                }`}
              >
                {crumb.label}
              </button>
            </div>
          ))}
        </nav>

        {/* Controls Section - Moved to top */}
        {(data.length > 0 || selectedCounty || selectedCity) && (
          <div className="mb-6 lg:mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Only show search bar when not on detail pages */}
            {!selectedCity && data.length > 0 && (
              <div className="relative w-full lg:max-w-md lg:flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search ${selectedState && !selectedCounty && stateViewMode === 'cities' ? 'cities' : currentLevel}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Residential/Commercial Toggle */}
              <div className="flex items-center gap-1 border rounded-lg p-1 bg-white">
                <Button
                  variant={sectorView === 'residential' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSectorView('residential')}
                  className="flex items-center gap-1.5 text-xs lg:text-sm"
                >
                  <Home className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                  <span className="hidden sm:inline">Residential</span>
                </Button>
                <Button
                  variant={sectorView === 'commercial' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSectorView('commercial')}
                  className="flex items-center gap-1.5 text-xs lg:text-sm"
                >
                  <Building className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                  <span className="hidden sm:inline">Commercial</span>
                </Button>
              </div>
              
              {/* View Mode Toggle */}
              {data.length > 0 && (
                <div className="flex items-center gap-1 border rounded-lg p-1 bg-white">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    title="Table view"
                  >
                    <TableIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'card' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('card')}
                    title="Card view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Show detailed view for selected jurisdiction */}
        {showStateDetail && stateData && !selectedCounty && !selectedCity && (
          <StateDetailView stateData={stateData} complianceData={complianceDetails} />
        )}
        {selectedCounty && !selectedCity && (
          <CountyDetailView 
            countyData={selectedCounty}
            stateCode={selectedState?.state_code || ''}
            countyName={selectedCounty.county_name || ''}
            complianceData={complianceDetails}
            sectorView={sectorView}
          />
        )}
        {selectedCity && selectedCounty && selectedState && (
          <DetailedComplianceView 
            selectedState={selectedState}
            selectedCounty={selectedCounty}
            selectedCity={selectedCity}
            complianceData={complianceDetails}
            sectorView={sectorView}
          />
        )}

        {/* Water Districts Section - Only show when viewing a city with no table data */}
        {selectedCity && data.length === 0 && (
          <div className="mb-8 bg-white border rounded-lg overflow-hidden">
            <button
              onClick={() => setShowWaterDistricts(!showWaterDistricts)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Water Districts</h3>
                  <p className="text-sm text-gray-600">
                    {waterDistricts.length > 0 
                      ? `${waterDistricts.length} water district${waterDistricts.length > 1 ? 's' : ''} serving this area`
                      : 'Loading water districts...'}
                  </p>
                </div>
              </div>
              <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${showWaterDistricts ? 'rotate-90' : ''}`} />
            </button>
            
            {showWaterDistricts && waterDistricts.length > 0 && (
              <div className="border-t px-6 py-4">
                <div className="grid gap-4">
                  {waterDistricts.map((district) => (
                    <div key={district.district_id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            {district.district_name}
                          </h4>
                          {district.rebate_program_name && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">{district.rebate_program_name}</p>
                              {district.rebate_amount && (
                                <p className="text-lg font-semibold text-green-700 mt-1">
                                  ${district.rebate_amount.toLocaleString()} Rebate Available
                                </p>
                              )}
                            </div>
                          )}
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            {district.website && (
                              <a 
                                href={district.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                              >
                                <Globe className="h-3 w-3" />
                                Website
                              </a>
                            )}
                            {district.phone && (
                              <span className="flex items-center gap-1 text-gray-600">
                                <Phone className="h-3 w-3" />
                                {district.phone}
                              </span>
                            )}
                            {district.email && (
                              <a 
                                href={`mailto:${district.email}`}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                              >
                                <Mail className="h-3 w-3" />
                                Email
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}


        {/* Section Header */}
        {data.length > 0 && !selectedCity && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedState && !selectedCounty && stateViewMode === 'cities' 
                    ? `Cities in ${selectedState.state_name}`
                    : currentLevel === 'cities' ? 'Cities' :
                      currentLevel === 'counties' ? 'Counties' : 'States'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedState && !selectedCounty && stateViewMode === 'cities'
                    ? `Showing ${filteredData.length} ${filteredData.length === 1 ? 'city' : 'cities'} directly`
                    : 'Click on any item below to view details and drill down further'}
                </p>
              </div>
              
              {/* County/City Toggle for State Pages */}
              {selectedState && !selectedCounty && !selectedCity && (
                <div className="flex items-center gap-2 border rounded-lg p-1">
                  <Button
                    variant={stateViewMode === 'counties' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setStateViewMode('counties')
                      setCurrentLevel('counties')
                    }}
                    className="flex items-center gap-2"
                  >
                    <Building className="h-4 w-4" />
                    Counties
                  </Button>
                  <Button
                    variant={stateViewMode === 'cities' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setStateViewMode('cities')
                      setCurrentLevel('cities')
                    }}
                    className="flex items-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Cities
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {!selectedCity && (loading || (selectedState && !selectedCounty && stateViewMode === 'cities' && loadingCities)) ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading {selectedState && !selectedCounty && stateViewMode === 'cities' ? 'cities' : currentLevel}...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{error}</p>
            <Button 
              onClick={() => fetchData(currentLevel)}
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        ) : filteredData.length === 0 && data.length === 0 && !selectedCity ? (
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              {searchTerm ? `No ${currentLevel} found matching "${searchTerm}"` : `No ${currentLevel} available`}
            </p>
          </div>
        ) : !selectedCity && data.length > 0 && (
          viewMode === 'table' ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    {currentLevel === 'states' && (
                      <>
                        <TableHead>State</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Counties</TableHead>
                        <TableHead>Cities</TableHead>
                        <TableHead>Policy</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </>
                    )}
                    {currentLevel === 'counties' && (
                      <>
                        <TableHead>County</TableHead>
                        <TableHead>Cities</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </>
                    )}
                    {currentLevel === 'cities' && (
                      <>
                        <TableHead>City</TableHead>
                        <TableHead>Population</TableHead>
                        <TableHead>Policy</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => renderTableRow(item, index))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item, index) => renderCard(item, index))}
            </div>
          )
        )}

        {/* Results Summary */}
        {!loading && !error && filteredData.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredData.length} {currentLevel}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        )}
      </div>
    </div>
  )
}