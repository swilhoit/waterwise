import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RainwaterSpokeView from '@/components/directory/RainwaterSpokeView'
import { STATE_NAMES, getStateCodeFromSlug } from '@/lib/state-utils'
import {
  getCityInfo,
  getRainwaterData,
  getIncentivesByType,
  formatCityName
} from '@/lib/directory-queries'

interface PageProps {
  params: Promise<{ state: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) return { title: 'Location Not Found' }

  const stateName = STATE_NAMES[stateCode]
  const cityInfo = await getCityInfo(stateCode, city)
  const cityName = cityInfo?.city_name || formatCityName(city)

  const [data, incentives] = await Promise.all([
    getRainwaterData(stateCode),
    getIncentivesByType(stateCode, 'rainwater', cityName, cityInfo?.county_name)
  ])

  const status = data?.rainwater?.legalStatus || 'legal'
  const limit = data?.rainwater?.collectionLimitGallons

  return {
    title: `${cityName}, ${stateCode} Rainwater Harvesting | Collection Laws & Rebates`,
    description: `Rainwater harvesting is ${status.toLowerCase()} in ${cityName}, ${stateName}. ${limit ? `Limit: ${limit.toLocaleString()} gallons.` : 'No collection limits.'} ${incentives.length} rebate programs available.`,
    keywords: [
      `${cityName} rainwater harvesting`,
      `${cityName} rainwater collection`,
      `${cityName} rain barrel`,
      `is rainwater harvesting legal in ${cityName}`,
      `${cityName} cistern`,
      `${cityName} rainwater rebates`
    ].join(', '),
    openGraph: {
      title: `${cityName} Rainwater Harvesting Laws`,
      description: `Rainwater collection rules and ${incentives.length} rebate programs in ${cityName}, ${stateName}.`
    }
  }
}

export const revalidate = 3600

export default async function CityRainwaterPage({ params }: PageProps) {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]
  const cityInfo = await getCityInfo(stateCode, city)
  const cityName = cityInfo?.city_name || formatCityName(city)

  const [data, incentives] = await Promise.all([
    getRainwaterData(stateCode),
    getIncentivesByType(stateCode, 'rainwater', cityName, cityInfo?.county_name)
  ])

  return (
    <RainwaterSpokeView
      level="city"
      stateName={stateName}
      stateCode={stateCode}
      cityName={cityName}
      countyName={cityInfo?.county_name}
      rainwater={data?.rainwater || null}
      agency={data?.agency || null}
      incentives={incentives}
    />
  )
}
