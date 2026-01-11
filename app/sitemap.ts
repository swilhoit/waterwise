import { MetadataRoute } from 'next'
import { getBlogArticles } from '@/lib/shopify'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://waterwisegroup.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/aqua2use`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/replacement-filters`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products/replacement-pumps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/residential`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/tiny-homes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/rvs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/cabins`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/laundry-to-landscape`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/commercial`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/remote-work-sites`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/customer-stories`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/customer-stories/california-homeowner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/customer-stories/rv-owner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/what-is-greywater`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Blog articles from Shopify
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const articles = await getBlogArticles()
    if (articles && articles.length > 0) {
      blogPages = articles.map((article: any) => ({
        url: `${baseUrl}/blog/${article.handle}`,
        lastModified: article.published_at ? new Date(article.published_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch blog articles for sitemap:', error)
  }

  // All 50 states with slugs
  const allStates = [
    { name: 'alabama', code: 'al' },
    { name: 'alaska', code: 'ak' },
    { name: 'arizona', code: 'az' },
    { name: 'arkansas', code: 'ar' },
    { name: 'california', code: 'ca' },
    { name: 'colorado', code: 'co' },
    { name: 'connecticut', code: 'ct' },
    { name: 'delaware', code: 'de' },
    { name: 'florida', code: 'fl' },
    { name: 'georgia', code: 'ga' },
    { name: 'hawaii', code: 'hi' },
    { name: 'idaho', code: 'id' },
    { name: 'illinois', code: 'il' },
    { name: 'indiana', code: 'in' },
    { name: 'iowa', code: 'ia' },
    { name: 'kansas', code: 'ks' },
    { name: 'kentucky', code: 'ky' },
    { name: 'louisiana', code: 'la' },
    { name: 'maine', code: 'me' },
    { name: 'maryland', code: 'md' },
    { name: 'massachusetts', code: 'ma' },
    { name: 'michigan', code: 'mi' },
    { name: 'minnesota', code: 'mn' },
    { name: 'mississippi', code: 'ms' },
    { name: 'missouri', code: 'mo' },
    { name: 'montana', code: 'mt' },
    { name: 'nebraska', code: 'ne' },
    { name: 'nevada', code: 'nv' },
    { name: 'new-hampshire', code: 'nh' },
    { name: 'new-jersey', code: 'nj' },
    { name: 'new-mexico', code: 'nm' },
    { name: 'new-york', code: 'ny' },
    { name: 'north-carolina', code: 'nc' },
    { name: 'north-dakota', code: 'nd' },
    { name: 'ohio', code: 'oh' },
    { name: 'oklahoma', code: 'ok' },
    { name: 'oregon', code: 'or' },
    { name: 'pennsylvania', code: 'pa' },
    { name: 'rhode-island', code: 'ri' },
    { name: 'south-carolina', code: 'sc' },
    { name: 'south-dakota', code: 'sd' },
    { name: 'tennessee', code: 'tn' },
    { name: 'texas', code: 'tx' },
    { name: 'utah', code: 'ut' },
    { name: 'vermont', code: 'vt' },
    { name: 'virginia', code: 'va' },
    { name: 'washington', code: 'wa' },
    { name: 'west-virginia', code: 'wv' },
    { name: 'wisconsin', code: 'wi' },
    { name: 'wyoming', code: 'wy' }
  ]

  // =============================================================================
  // NEW URL STRUCTURE: /[state]/ hub pages
  // =============================================================================

  // State hub pages (pillar content)
  const stateHubPages: MetadataRoute.Sitemap = allStates.map(state => ({
    url: `${baseUrl}/${state.code}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // State greywater spoke pages
  const stateGreywaterPages: MetadataRoute.Sitemap = allStates.map(state => ({
    url: `${baseUrl}/${state.code}/greywater`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // State rainwater spoke pages
  const stateRainwaterPages: MetadataRoute.Sitemap = allStates.map(state => ({
    url: `${baseUrl}/${state.code}/rainwater`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // =============================================================================
  // TOP CITIES - Hub + Spoke pages
  // =============================================================================

  // Priority cities by state (highest search volume)
  const priorityCities = [
    // California (highest priority)
    { state: 'ca', city: 'los-angeles', priority: 0.9 },
    { state: 'ca', city: 'san-diego', priority: 0.9 },
    { state: 'ca', city: 'san-francisco', priority: 0.9 },
    { state: 'ca', city: 'san-jose', priority: 0.85 },
    { state: 'ca', city: 'fresno', priority: 0.8 },
    { state: 'ca', city: 'sacramento', priority: 0.85 },
    { state: 'ca', city: 'long-beach', priority: 0.8 },
    { state: 'ca', city: 'oakland', priority: 0.8 },
    { state: 'ca', city: 'bakersfield', priority: 0.75 },
    { state: 'ca', city: 'anaheim', priority: 0.75 },
    { state: 'ca', city: 'santa-monica', priority: 0.8 },
    { state: 'ca', city: 'pasadena', priority: 0.75 },
    { state: 'ca', city: 'glendale', priority: 0.75 },
    { state: 'ca', city: 'berkeley', priority: 0.75 },
    { state: 'ca', city: 'santa-barbara', priority: 0.75 },

    // Texas
    { state: 'tx', city: 'austin', priority: 0.85 },
    { state: 'tx', city: 'houston', priority: 0.8 },
    { state: 'tx', city: 'dallas', priority: 0.8 },
    { state: 'tx', city: 'san-antonio', priority: 0.75 },
    { state: 'tx', city: 'fort-worth', priority: 0.7 },

    // Arizona
    { state: 'az', city: 'phoenix', priority: 0.85 },
    { state: 'az', city: 'tucson', priority: 0.8 },
    { state: 'az', city: 'scottsdale', priority: 0.75 },
    { state: 'az', city: 'mesa', priority: 0.7 },

    // Colorado
    { state: 'co', city: 'denver', priority: 0.8 },
    { state: 'co', city: 'colorado-springs', priority: 0.7 },
    { state: 'co', city: 'boulder', priority: 0.75 },

    // Oregon
    { state: 'or', city: 'portland', priority: 0.8 },
    { state: 'or', city: 'eugene', priority: 0.7 },
    { state: 'or', city: 'bend', priority: 0.7 },

    // Washington
    { state: 'wa', city: 'seattle', priority: 0.8 },
    { state: 'wa', city: 'tacoma', priority: 0.7 },
    { state: 'wa', city: 'spokane', priority: 0.65 },

    // New Mexico
    { state: 'nm', city: 'albuquerque', priority: 0.75 },
    { state: 'nm', city: 'santa-fe', priority: 0.75 },

    // Nevada
    { state: 'nv', city: 'las-vegas', priority: 0.75 },
    { state: 'nv', city: 'reno', priority: 0.7 },

    // Florida
    { state: 'fl', city: 'miami', priority: 0.7 },
    { state: 'fl', city: 'tampa', priority: 0.65 },
    { state: 'fl', city: 'orlando', priority: 0.65 },
  ]

  // City hub pages
  const cityHubPages: MetadataRoute.Sitemap = priorityCities.map(({ state, city, priority }) => ({
    url: `${baseUrl}/${state}/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }))

  // City greywater spoke pages
  const cityGreywaterPages: MetadataRoute.Sitemap = priorityCities.map(({ state, city, priority }) => ({
    url: `${baseUrl}/${state}/${city}/greywater`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: priority - 0.1,
  }))

  // City rainwater spoke pages
  const cityRainwaterPages: MetadataRoute.Sitemap = priorityCities.map(({ state, city, priority }) => ({
    url: `${baseUrl}/${state}/${city}/rainwater`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: priority - 0.1,
  }))

  return [
    ...staticPages,
    ...blogPages,
    // Location-based SEO pages
    ...stateHubPages,
    ...stateGreywaterPages,
    ...stateRainwaterPages,
    ...cityHubPages,
    ...cityGreywaterPages,
    ...cityRainwaterPages,
  ]
}
