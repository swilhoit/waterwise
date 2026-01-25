import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RainwaterSpokeView from '@/components/directory/RainwaterSpokeView'
import { STATE_NAMES, getStateCodeFromSlug, generateStateStaticParams } from '@/lib/state-utils'
import { getRainwaterData, getIncentivesByType } from '@/lib/directory-queries'

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return generateStateStaticParams()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) return { title: 'State Not Found' }

  const stateName = STATE_NAMES[stateCode]
  const [data, incentives] = await Promise.all([
    getRainwaterData(stateCode),
    getIncentivesByType(stateCode, 'rainwater')
  ])

  const status = data?.rainwater?.legalStatus || 'legal'
  const limit = data?.rainwater?.collectionLimitGallons
  const potable = data?.rainwater?.potableUseAllowed

  return {
    title: `${stateName} Rainwater Harvesting Laws | Collection Rules & Rebates`,
    description: `Rainwater harvesting is ${status.toLowerCase()} in ${stateName}. ${limit ? `Limit: ${limit.toLocaleString()} gallons.` : 'No collection limits.'} ${potable ? 'Potable use allowed.' : 'Non-potable use.'} ${incentives.length} rebate programs.`,
    keywords: [
      `${stateName} rainwater harvesting`,
      `${stateName} rainwater collection`,
      `is rainwater harvesting legal in ${stateName}`,
      `${stateName} rain barrel`,
      `${stateName} rainwater rebates`,
      `${stateName} cistern laws`
    ].join(', '),
    openGraph: {
      title: `${stateName} Rainwater Harvesting Laws`,
      description: `Complete guide to rainwater collection rules and ${incentives.length} rebate programs in ${stateName}.`,
      type: 'website'
    }
  }
}

export const revalidate = 3600

export default async function StateRainwaterPage({ params }: PageProps) {
  const { state } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]

  const [data, incentives] = await Promise.all([
    getRainwaterData(stateCode),
    getIncentivesByType(stateCode, 'rainwater')
  ])

  return (
    <RainwaterSpokeView
      level="state"
      stateName={stateName}
      stateCode={stateCode}
      rainwater={data?.rainwater || null}
      agency={data?.agency || null}
      incentives={incentives}
    />
  )
}
