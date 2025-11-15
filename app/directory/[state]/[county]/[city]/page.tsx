import DirectoryView from '@/components/directory/DirectoryView'
import { getStateNameFromCode } from '@/lib/state-utils'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ state: string; county: string; city: string }>
}

// Helper function to format city name
function formatCityName(city: string): string {
  return city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper function to format county name
function formatCountyName(county: string): string {
  return county
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, county, city } = await params
  const stateName = getStateNameFromCode(state)
  const cityName = formatCityName(city)
  const countyName = formatCountyName(county)

  return {
    title: `${cityName}, ${stateName} Water Rebates & Programs | Greywater & Rainwater Incentives`,
    description: `Complete guide to water conservation rebates in ${cityName}, ${countyName} County, ${stateName}. Find greywater rebates, rainwater harvesting grants, and local water efficiency programs.`,
    keywords: `${cityName} ${stateName} water rebates, ${cityName} greywater, ${cityName} rainwater harvesting, ${cityName} water conservation programs, ${cityName} ${state} rebates`
  }
}

export default async function CityPage({ params }: PageProps) {
  const { state, county, city } = await params

  return (
    <DirectoryView
      level="cities"
      initialState={state}
      initialCounty={county}
      initialCity={city}
    />
  )
}