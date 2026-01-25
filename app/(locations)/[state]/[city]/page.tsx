import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationHubView from '@/components/directory/LocationHubView'
import { FAQSchema } from '@/components/schema-markup'
import { STATE_NAMES, getStateCodeFromSlug } from '@/lib/state-utils'
import {
  getCityInfo,
  getStateData,
  getCityIncentives,
  getLocalRegulations,
  getCityPermitDetails,
  getCityWaterUtilities,
  formatCityName,
  getMaxRebate
} from '@/lib/directory-queries'
import type { FAQ, IncentiveProgram, GreywaterData, RainwaterData } from '@/lib/directory-types'

interface PageProps {
  params: Promise<{ state: string; city: string }>
}

function generateCityFAQs(
  cityName: string,
  stateName: string,
  stateCode: string,
  greywater: GreywaterData | null,
  rainwater: RainwaterData | null,
  incentives: IncentiveProgram[]
): FAQ[] {
  const greywaterStatus = greywater?.legalStatus || 'varies by jurisdiction'
  const rainwaterStatus = rainwater?.legalStatus || 'legal'
  const rebateCount = incentives.length

  return [
    {
      question: `Is greywater legal in ${cityName}, ${stateCode}?`,
      answer: `Yes, greywater is ${greywaterStatus.toLowerCase()} in ${cityName}, ${stateName}. ${
        greywater?.permitThresholdGpd
          ? `Simple systems under ${greywater.permitThresholdGpd} gallons per day typically don't require a permit.`
          : 'Check local requirements for permit details.'
      }`
    },
    {
      question: `Is rainwater harvesting legal in ${cityName}?`,
      answer: `Rainwater harvesting is ${rainwaterStatus.toLowerCase()} in ${cityName}, ${stateName}. ${
        rainwater?.collectionLimitGallons
          ? `Collection is limited to ${rainwater.collectionLimitGallons.toLocaleString()} gallons.`
          : 'There are no collection limits for residential use.'
      }`
    },
    {
      question: `Are there water rebates available in ${cityName}?`,
      answer: rebateCount > 0
        ? `Yes! There ${rebateCount === 1 ? 'is' : 'are'} ${rebateCount} rebate program${rebateCount !== 1 ? 's' : ''} available for ${cityName} residents, including greywater systems, rainwater harvesting, and water conservation incentives.`
        : `Check with your local water utility in ${cityName} for current rebate programs.`
    },
    {
      question: `What can I use greywater for in ${cityName}?`,
      answer: `In ${cityName}, greywater is typically approved for ${
        greywater?.outdoorUseAllowed ? 'outdoor landscape irrigation' : ''
      }${greywater?.outdoorUseAllowed && greywater?.indoorUseAllowed ? ' and ' : ''}${
        greywater?.indoorUseAllowed ? 'indoor toilet flushing with proper treatment' : ''
      }. Kitchen sink water with food waste is generally not allowed.`
    }
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) return { title: 'Location Not Found' }

  const stateName = STATE_NAMES[stateCode]
  const cityInfo = await getCityInfo(stateCode, city)
  const cityName = cityInfo?.city_name || formatCityName(city)

  const [stateData, incentives] = await Promise.all([
    getStateData(stateCode),
    getCityIncentives(stateCode, cityName, cityInfo?.county_name)
  ])

  const greyStatus = stateData?.greywater?.legalStatus || 'varies'
  const rainStatus = stateData?.rainwater?.legalStatus || 'legal'
  const rebateCount = incentives.length
  const maxRebate = getMaxRebate(incentives)

  return {
    title: `${cityName}, ${stateCode} Water Conservation | Greywater, Rainwater & Rebates`,
    description: `Complete water conservation guide for ${cityName}, ${stateName}. Greywater: ${greyStatus.toLowerCase()}. Rainwater: ${rainStatus.toLowerCase()}. ${rebateCount} rebate programs${maxRebate > 0 ? `, up to $${maxRebate.toLocaleString()}` : ''}.`,
    keywords: [
      `${cityName} greywater`,
      `${cityName} rainwater harvesting`,
      `${cityName} water rebates`,
      `${cityName} water conservation`,
      `is greywater legal in ${cityName}`,
      `${cityName} greywater permit`,
      `${cityName} rain barrel`
    ].join(', '),
    openGraph: {
      title: `Water Conservation in ${cityName}, ${stateCode}`,
      description: `Greywater laws, rainwater harvesting rules, and ${rebateCount} rebate programs in ${cityName}.`,
      type: 'website'
    }
  }
}

export const revalidate = 3600

export default async function CityHubPage({ params }: PageProps) {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]
  const cityInfo = await getCityInfo(stateCode, city)
  const cityName = cityInfo?.city_name || formatCityName(city)
  const countyName = cityInfo?.county_name

  // Fetch all data in parallel
  const [stateData, incentives, localRegs, permitDetails, waterUtilities] = await Promise.all([
    getStateData(stateCode),
    getCityIncentives(stateCode, cityName, countyName),
    getLocalRegulations(stateCode, cityName, countyName),
    getCityPermitDetails(stateCode, cityName),
    getCityWaterUtilities(stateCode, cityName)
  ])

  const faqs = generateCityFAQs(
    cityName,
    stateName,
    stateCode,
    stateData?.greywater || null,
    stateData?.rainwater || null,
    incentives
  )

  return (
    <>
      <FAQSchema faqs={faqs} />
      <LocationHubView
        level="city"
        stateName={stateName}
        stateCode={stateCode}
        cityName={cityName}
        countyName={countyName}
        greywater={stateData?.greywater || null}
        rainwater={stateData?.rainwater || null}
        agency={stateData?.agency || null}
        incentives={incentives}
        lastUpdated={stateData?.lastUpdated || undefined}
        preplumbing={localRegs?.preplumbing || null}
        localRegulation={localRegs ? {
          regulationSummary: localRegs.regulationSummary,
          permitRequired: localRegs.permitRequired
        } : null}
        permitData={permitDetails}
        waterUtilities={waterUtilities}
      />
    </>
  )
}
