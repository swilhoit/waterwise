import { getBigQueryClient } from './bigquery'

export interface StateInfo {
  legalStatus: string
  governingCode: string
  permitThresholdGpd: number | null
  permitRequired: string
  permitExplanation?: string
  permitProcess?: string
  indoorUseAllowed: boolean
  outdoorUseAllowed: boolean
  approvedUses: string[]
  keyRestrictions: string[]
  recentChanges: string | null
  primaryAgency: string
  agencyContact: string
  agencyPhone: string | null
  governmentWebsite: string
  regulatoryClassification: string
  summary: string
}

export interface StateMetadata {
  title: string
  lastUpdated: string
  dataSource: string
  totalStates: number
  summary: string
}

// Cache for all states data
let statesCache: Map<string, StateInfo> | null = null
let stateNamesCache: string[] | null = null

async function fetchAllStates(): Promise<Map<string, StateInfo>> {
  if (statesCache) return statesCache

  const bigquery = getBigQueryClient()

  const query = `
    SELECT
      state_name,
      legal_status as legalStatus,
      governing_code as governingCode,
      permit_threshold_gpd as permitThresholdGpd,
      permit_required as permitRequired,
      permit_explanation as permitExplanation,
      permit_process as permitProcess,
      indoor_use_allowed as indoorUseAllowed,
      outdoor_use_allowed as outdoorUseAllowed,
      approved_uses as approvedUses,
      key_restrictions as keyRestrictions,
      recent_changes as recentChanges,
      primary_agency as primaryAgency,
      agency_contact as agencyContact,
      agency_phone as agencyPhone,
      government_website as governmentWebsite,
      regulatory_classification as regulatoryClassification,
      summary
    FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\`
    WHERE resource_type = 'greywater'
    ORDER BY state_name
  `

  const [rows] = await bigquery.query({ query })

  statesCache = new Map()
  stateNamesCache = []

  for (const row of rows as any[]) {
    const stateInfo: StateInfo = {
      legalStatus: row.legalStatus,
      governingCode: row.governingCode,
      permitThresholdGpd: row.permitThresholdGpd,
      permitRequired: row.permitRequired,
      permitExplanation: row.permitExplanation,
      permitProcess: row.permitProcess,
      indoorUseAllowed: row.indoorUseAllowed,
      outdoorUseAllowed: row.outdoorUseAllowed,
      approvedUses: row.approvedUses || [],
      keyRestrictions: row.keyRestrictions || [],
      recentChanges: row.recentChanges,
      primaryAgency: row.primaryAgency,
      agencyContact: row.agencyContact,
      agencyPhone: row.agencyPhone,
      governmentWebsite: row.governmentWebsite,
      regulatoryClassification: row.regulatoryClassification,
      summary: row.summary
    }
    statesCache.set(row.state_name, stateInfo)
    stateNamesCache.push(row.state_name)
  }

  return statesCache
}

export async function getAllStates(): Promise<string[]> {
  if (stateNamesCache) return stateNamesCache
  await fetchAllStates()
  return stateNamesCache || []
}

export async function getStateInfo(stateName: string): Promise<StateInfo | null> {
  const states = await fetchAllStates()
  return states.get(stateName) || null
}

export function getStateSlug(stateName: string): string {
  return stateName.toLowerCase().replace(/\s+/g, '-')
}

export async function getStateFromSlug(slug: string): Promise<string | null> {
  const states = await getAllStates()
  return states.find(state => getStateSlug(state) === slug) || null
}

export function getMetadata(): StateMetadata {
  return {
    title: "US Greywater Regulations Directory",
    lastUpdated: new Date().toISOString().split('T')[0],
    dataSource: "BigQuery greywater_compliance.state_water_regulations",
    totalStates: 50,
    summary: "Comprehensive database of greywater regulations across all 50 US states"
  }
}

export async function getStatesByLegalStatus(): Promise<{ [key: string]: string[] }> {
  const states = await fetchAllStates()
  const grouped: { [key: string]: string[] } = {}

  states.forEach((info, stateName) => {
    const status = info.legalStatus
    if (!grouped[status]) {
      grouped[status] = []
    }
    grouped[status].push(stateName)
  })

  return grouped
}

export async function getProgressiveStates(): Promise<string[]> {
  const states = await fetchAllStates()
  const progressive: string[] = []

  states.forEach((info, stateName) => {
    if (info.regulatoryClassification.toLowerCase().includes('progressive') ||
        info.regulatoryClassification.toLowerCase().includes('comprehensive') ||
        (info.permitThresholdGpd && info.permitThresholdGpd > 0)) {
      progressive.push(stateName)
    }
  })

  return progressive.sort()
}

export async function getRestrictiveStates(): Promise<string[]> {
  const states = await fetchAllStates()
  const restrictive: string[] = []

  states.forEach((info, stateName) => {
    if (info.legalStatus.toLowerCase().includes('prohibited') ||
        info.legalStatus.toLowerCase().includes('no formal') ||
        info.legalStatus.toLowerCase().includes('no specific') ||
        info.regulatoryClassification.toLowerCase().includes('prohibited') ||
        info.regulatoryClassification.toLowerCase().includes('no policy')) {
      restrictive.push(stateName)
    }
  })

  return restrictive.sort()
}
