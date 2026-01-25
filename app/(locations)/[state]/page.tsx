import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationHubView from '@/components/directory/LocationHubView'
import { STATE_NAMES, getStateCodeFromSlug, generateStateStaticParams } from '@/lib/state-utils'
import {
  getStateData,
  getStateIncentives,
  getStateCities,
  getStatePermitDetails
} from '@/lib/directory-queries'

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return generateStateStaticParams()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) {
    return { title: 'State Not Found' }
  }

  const stateName = STATE_NAMES[stateCode]
  const [stateData, incentives] = await Promise.all([
    getStateData(stateCode),
    getStateIncentives(stateCode)
  ])

  const greyStatus = stateData?.greywater?.legalStatus || 'varies by jurisdiction'
  const rainStatus = stateData?.rainwater?.legalStatus || 'legal'
  const rebateCount = incentives.length

  return {
    title: `${stateName} Water Regulations | Greywater, Rainwater & Rebates`,
    description: `Complete guide to ${stateName} water conservation: Greywater is ${greyStatus.toLowerCase()}, rainwater harvesting is ${rainStatus.toLowerCase()}. ${rebateCount} rebate programs available. Permits, laws & incentives.`,
    keywords: [
      `${stateName} greywater`,
      `${stateName} greywater laws`,
      `${stateName} rainwater harvesting`,
      `${stateName} water rebates`,
      `${stateName} water conservation`,
      `is greywater legal in ${stateName}`,
      `${stateName} water recycling`
    ].join(', '),
    openGraph: {
      title: `${stateName} Water Conservation Guide`,
      description: `Greywater laws, rainwater harvesting rules, and ${rebateCount} rebate programs in ${stateName}.`,
      type: 'website'
    }
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function StateHubPage({ params }: PageProps) {
  const { state } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) {
    notFound()
  }

  const stateName = STATE_NAMES[stateCode]

  // Fetch all data in parallel
  const [stateData, incentives, cities, permitDetails] = await Promise.all([
    getStateData(stateCode),
    getStateIncentives(stateCode),
    getStateCities(stateCode),
    getStatePermitDetails(stateCode)
  ])

  return (
    <LocationHubView
      level="state"
      stateName={stateName}
      stateCode={stateCode}
      greywater={stateData?.greywater || null}
      rainwater={stateData?.rainwater || null}
      agency={stateData?.agency || null}
      incentives={incentives}
      cities={cities}
      lastUpdated={stateData?.lastUpdated || undefined}
      permitData={permitDetails}
    />
  )
}
