import SimpleDirectoryView from '@/components/directory/SimpleDirectoryView'
import { getStateNameFromCode } from '@/lib/state-utils'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ state: string; county: string }>
}

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
    title: `${countyName} County, ${stateName} Greywater Regulations | Permits & Rebates`,
    description: `Find greywater rules and rebates in ${countyName} County, ${stateName}. Search cities for local requirements.`,
    keywords: `${countyName} County greywater, ${countyName} water rebates, ${stateName} ${countyName} greywater permits`
  }
}

export default async function CountyPage({ params }: PageProps) {
  const { state, county } = await params
  return <SimpleDirectoryView initialState={state.toUpperCase()} initialCounty={county} />
}