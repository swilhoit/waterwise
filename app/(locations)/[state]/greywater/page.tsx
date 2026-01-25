import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GreywaterSpokeView from '@/components/directory/GreywaterSpokeView'
import { STATE_NAMES, getStateCodeFromSlug, generateStateStaticParams } from '@/lib/state-utils'
import { getGreywaterData, getIncentivesByType } from '@/lib/directory-queries'

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
    getGreywaterData(stateCode),
    getIncentivesByType(stateCode, 'greywater')
  ])

  const status = data?.greywater?.legalStatus || 'varies'
  const permitInfo = data?.greywater?.permitRequired || 'varies by system size'
  const threshold = data?.greywater?.permitThresholdGpd

  return {
    title: `${stateName} Greywater Laws & Permits | Is Greywater Legal?`,
    description: `Greywater is ${status.toLowerCase()} in ${stateName}. Permit: ${permitInfo}${threshold ? `. No permit needed under ${threshold} GPD` : ''}. ${incentives.length} rebate programs available. Complete regulations guide.`,
    keywords: [
      `${stateName} greywater laws`,
      `${stateName} greywater permit`,
      `is greywater legal in ${stateName}`,
      `${stateName} greywater regulations`,
      `${stateName} greywater rebates`,
      `${stateName} laundry to landscape`
    ].join(', '),
    openGraph: {
      title: `${stateName} Greywater Laws & Regulations`,
      description: `Complete guide to greywater permits, regulations, and ${incentives.length} rebate programs in ${stateName}.`,
      type: 'website'
    }
  }
}

export const revalidate = 3600

export default async function StateGreywaterPage({ params }: PageProps) {
  const { state } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]

  const [data, incentives] = await Promise.all([
    getGreywaterData(stateCode),
    getIncentivesByType(stateCode, 'greywater')
  ])

  return (
    <GreywaterSpokeView
      level="state"
      stateName={stateName}
      stateCode={stateCode}
      greywater={data?.greywater || null}
      agency={data?.agency || null}
      incentives={incentives}
    />
  )
}
