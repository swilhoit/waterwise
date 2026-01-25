import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GreywaterSpokeView from '@/components/directory/GreywaterSpokeView'
import { STATE_NAMES, getStateCodeFromSlug } from '@/lib/state-utils'
import {
  getCityInfo,
  getGreywaterData,
  getIncentivesByType,
  getLocalRegulations,
  getCityPermitDetails,
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
    getGreywaterData(stateCode),
    getIncentivesByType(stateCode, 'greywater', cityName, cityInfo?.county_name)
  ])

  const status = data?.greywater?.legalStatus || 'varies'
  const permitInfo = data?.greywater?.permitRequired || 'varies'
  const threshold = data?.greywater?.permitThresholdGpd

  return {
    title: `${cityName}, ${stateCode} Greywater Laws & Permits | Is Greywater Legal?`,
    description: `Greywater is ${status.toLowerCase()} in ${cityName}, ${stateName}. Permit: ${permitInfo}${threshold ? `. No permit under ${threshold} GPD` : ''}. ${incentives.length} rebate programs. Complete local regulations guide.`,
    keywords: [
      `${cityName} greywater`,
      `${cityName} greywater laws`,
      `${cityName} greywater permit`,
      `is greywater legal in ${cityName}`,
      `${cityName} laundry to landscape`,
      `${cityName} greywater rebates`
    ].join(', '),
    openGraph: {
      title: `${cityName} Greywater Laws & Permits`,
      description: `Greywater regulations and ${incentives.length} rebate programs in ${cityName}, ${stateName}.`
    }
  }
}

export const revalidate = 3600

export default async function CityGreywaterPage({ params }: PageProps) {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]
  const cityInfo = await getCityInfo(stateCode, city)
  const cityName = cityInfo?.city_name || formatCityName(city)

  const [data, incentives, localRegs, permitDetails] = await Promise.all([
    getGreywaterData(stateCode),
    getIncentivesByType(stateCode, 'greywater', cityName, cityInfo?.county_name),
    getLocalRegulations(stateCode, cityName, cityInfo?.county_name),
    getCityPermitDetails(stateCode, cityName)
  ])

  return (
    <GreywaterSpokeView
      level="city"
      stateName={stateName}
      stateCode={stateCode}
      cityName={cityName}
      countyName={cityInfo?.county_name}
      greywater={data?.greywater || null}
      agency={data?.agency || null}
      incentives={incentives}
      preplumbing={localRegs?.preplumbing || null}
      permitDetails={permitDetails}
    />
  )
}
