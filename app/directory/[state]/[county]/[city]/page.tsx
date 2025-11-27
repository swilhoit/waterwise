import SimpleDirectoryView from '@/components/directory/SimpleDirectoryView'
import { getStateNameFromCode } from '@/lib/state-utils'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ state: string; county: string; city: string }>
}

function formatCityName(city: string): string {
  return city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

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
    title: `${cityName}, ${stateName} Greywater Permits & Rebates`,
    description: `Greywater rules for ${cityName}, ${countyName} County, ${stateName}. Find permit requirements and available rebates.`,
    keywords: `${cityName} greywater, ${cityName} ${stateName} greywater permits, ${cityName} water rebates, ${cityName} greywater rebates`
  }
}

export default async function CityPage({ params }: PageProps) {
  const { state, county, city } = await params
  return (
    <SimpleDirectoryView
      initialState={state.toUpperCase()}
      initialCounty={county}
      initialCity={city}
    />
  )
}