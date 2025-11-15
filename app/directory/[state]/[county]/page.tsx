import DirectoryView from '@/components/directory/DirectoryView'
import { getStateNameFromCode } from '@/lib/state-utils'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ state: string; county: string }>
}

// Helper function to format county name
function formatCountyName(county: string): string {
  return county
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, county } = await params
  const stateName = getStateNameFromCode(state)
  const countyName = formatCountyName(county)

  return {
    title: `${countyName} County, ${stateName} Water Programs | Greywater & Rainwater Rebates`,
    description: `Find water conservation rebates and programs in ${countyName} County, ${stateName}. Greywater systems, rainwater harvesting incentives, and city-specific programs.`,
    keywords: `${countyName} County water rebates, ${countyName} greywater, ${stateName} ${countyName} water conservation, ${countyName} rainwater harvesting`
  }
}

export default async function CountyPage({ params }: PageProps) {
  const { state, county } = await params

  return (
    <DirectoryView
      level="cities"
      initialState={state}
      initialCounty={county}
    />
  )
}