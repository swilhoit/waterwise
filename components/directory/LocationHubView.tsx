"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight, ChevronDown, Search, ExternalLink, Phone, Building2,
  Droplets, CloudRain, DollarSign, Leaf, MapPin,
  CheckCircle2, AlertCircle, HelpCircle, Clock, ArrowRight,
  FileText, ClipboardList, Wrench, Timer, Users, Home, BadgeCheck
} from 'lucide-react'
import PermitSection from './PermitSection'
import LocationContextCard from './LocationContextCard'

// =============================================================================
// TYPES
// =============================================================================

interface GreywaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  permitThresholdGpd?: number | null
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  approvedUses?: string[]
  keyRestrictions?: string[]
  recentChanges?: string | null
  summary?: string
}

interface RainwaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  taxIncentives?: string
  approvedUses?: string[]
  keyRestrictions?: string[]
  summary?: string
}

interface AgencyData {
  name?: string
  phone?: string
  website?: string
}

interface IncentiveProgram {
  program_name: string
  incentive_type?: string
  resource_type?: string
  program_subtype?: string
  incentive_amount_min?: number
  incentive_amount_max?: number
  incentive_per_unit?: string
  incentive_url?: string
  program_description?: string
  water_utility?: string
  residential_eligible?: boolean | string
  commercial_eligible?: boolean | string
  // Eligibility details
  eligibility_details?: string
  property_requirements?: string
  income_requirements?: string
  // How to apply
  how_to_apply?: string
  steps_to_apply?: string
  documentation_required?: string
  pre_approval_required?: boolean | string
  processing_time?: string
  // Requirements
  installation_requirements?: string
  contractor_requirements?: string
  product_requirements?: string
  inspection_required?: boolean | string
  timeline_to_complete?: string
  // Reimbursement
  reimbursement_process?: string
  restrictions?: string
  // Stacking
  stacking_allowed?: boolean | string
  stacking_details?: string
  // Contact
  contact_email?: string
  contact_phone?: string
  coverage_area?: string
  deadline_info?: string
  program_end_date?: string
  // Jurisdiction tracking
  jurisdiction_id?: string
  jurisdiction_level?: 'state' | 'county' | 'city' | 'other'
}

interface CityItem {
  city_name: string
  county_name?: string
  city_jurisdiction_id?: string
}

interface PreplumbingData {
  hasMandate: boolean
  details?: string
  buildingTypes?: string
  thresholdSqft?: number
  codeReference?: string
}

interface LocalRegulation {
  regulationSummary?: string
  permitRequired?: boolean
}

interface WaterUtilityData {
  name: string
  website?: string
  phone?: string
  programCount?: number
}

interface PermitData {
  // Basic info
  permitType?: string
  permitRequired?: boolean
  thresholdGpd?: number
  permitAuthority?: string
  permitFramework?: string
  // Application
  applicationUrl?: string
  applicationMethod?: string
  requiredDocuments?: string[]
  typicalFees?: string
  feeMin?: number
  feeMax?: number
  processingDays?: number | string
  // System types
  laundryToLandscapeAllowed?: boolean
  branchedDrainAllowed?: boolean
  surgeTankAllowed?: boolean
  indoorReuseAllowed?: boolean
  // Installation
  diyAllowed?: boolean
  licensedPlumberRequired?: boolean
  licensedContractorRequired?: boolean
  inspectionsRequired?: string[]
  // Contact
  departmentName?: string
  departmentPhone?: string
  departmentAddress?: string
  departmentHours?: string
  departmentUrl?: string
  // Additional
  exemptions?: string[]
  requirements?: string[]
  specialRequirements?: string[]
  tips?: string
  notes?: string
}

interface LocationHubViewProps {
  level: 'state' | 'city'
  stateName: string
  stateCode: string
  cityName?: string
  countyName?: string
  greywater: GreywaterData | null
  rainwater: RainwaterData | null
  agency: AgencyData | null
  incentives: IncentiveProgram[]
  cities?: CityItem[]
  lastUpdated?: string
  preplumbing?: PreplumbingData | null
  localRegulation?: LocalRegulation | null
  waterUtilities?: WaterUtilityData[]
  permitData?: PermitData | null
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

type DataConfidence = 'verified' | 'partial' | 'unknown'

const getDataConfidence = (data: GreywaterData | RainwaterData | null): DataConfidence => {
  if (!data) return 'unknown'
  const hasStatus = !!(data as any).legalStatus
  const hasPermit = (data as any).permitRequired !== undefined
  const hasCode = !!(data as any).governingCode
  const score = [hasStatus, hasPermit, hasCode].filter(Boolean).length
  if (score >= 2) return 'verified'
  if (score >= 1) return 'partial'
  return 'unknown'
}

// Get official regulation website URLs for jurisdictions
const getJurisdictionUrls = (stateCode: string, stateName: string, countyName?: string, cityName?: string) => {
  // State water regulation URLs
  const stateUrls: Record<string, string> = {
    'CA': 'https://www.hcd.ca.gov/building-standards/state-housing-law/wildfire-702-greywater',
    'AZ': 'https://www.azdeq.gov/permits/water-permits/reclaimed-water',
    'TX': 'https://www.tceq.texas.gov/permitting/water_quality/rainwater-greywater-water-reuse',
    'NM': 'https://www.srca.nm.gov/water-resources/',
    'CO': 'https://cdphe.colorado.gov/graywater',
    'OR': 'https://www.oregon.gov/oha/ph/healthyenvironments/drinkingwater/pages/graywater.aspx',
    'WA': 'https://ecology.wa.gov/water-shorelines/water-supply/water-recovery-reuse',
    'NV': 'https://ndep.nv.gov/water/water-reuse-program',
    'UT': 'https://deq.utah.gov/water-quality/water-reuse',
  }

  // Known county water/building code URLs (key = "STATE_COUNTY")
  const countyUrls: Record<string, string> = {
    // Southern California Counties
    'CA_LOS_ANGELES': 'https://pw.lacounty.gov/bsd/lib/BuildingCode/',
    'CA_SAN_DIEGO': 'https://www.sandiegocounty.gov/pds/bldg/',
    'CA_ORANGE': 'https://ocpublicworks.com/building',
    'CA_VENTURA': 'https://www.ventura.org/building-and-safety/',
    'CA_RIVERSIDE': 'https://rivcoeda.org/Building-and-Safety',
    'CA_SAN_BERNARDINO': 'https://sbcounty.gov/lus/building_and_safety/',
    'CA_IMPERIAL': 'https://www.icpds.com/',

    // Bay Area Counties
    'CA_SANTA_CLARA': 'https://www.sccgov.org/sites/dpd/Pages/dpd.aspx',
    'CA_ALAMEDA': 'https://www.acgov.org/cda/planning/',
    'CA_SAN_FRANCISCO': 'https://sfdbi.org/building-codes',
    'CA_CONTRA_COSTA': 'https://www.contracosta.ca.gov/6282/Building-Inspection',
    'CA_MARIN': 'https://www.marincounty.org/depts/cd/divisions/building-and-safety',
    'CA_SONOMA': 'https://sonomacounty.ca.gov/development-services/permit-sonoma/',
    'CA_SAN_MATEO': 'https://www.smcgov.org/planning/building',
    'CA_NAPA': 'https://www.napacounty.gov/3492/Building-Division',
    'CA_SOLANO': 'https://www.solanocounty.gov/government/resource-management/building-safety-services',

    // Central Coast Counties
    'CA_SANTA_BARBARA': 'https://www.countyofsb.org/339/Building-Safety',
    'CA_MONTEREY': 'https://www.co.monterey.ca.us/government/departments-i-z/resource-management-agency/building-services',
    'CA_SAN_LUIS_OBISPO': 'https://www.slocounty.ca.gov/Departments/Planning-Building.aspx',
    'CA_SANTA_CRUZ': 'https://cdi.santacruzcountyca.gov/UPC.aspx',
    'CA_SAN_BENITO': 'https://www.sanbenitocountyca.gov/departments/resource-management-agency/building-planning',

    // Central Valley Counties
    'CA_KERN': 'https://kernpublicworks.com/building-and-development/',
    'CA_FRESNO': 'https://www.co.fresno.ca.us/departments/public-works-planning/development-services',
    'CA_TULARE': 'https://tularecounty.ca.gov/rma/planning-building/building-department',
    'CA_KINGS': 'https://www.countyofkingsca.gov/departments/community-development-agency',
    'CA_STANISLAUS': 'https://www.stancounty.com/planning/bp/',
    'CA_SAN_JOAQUIN': 'https://www.sjgov.org/department/cdd/building',
    'CA_MERCED': 'https://www.co.merced.ca.us/132/Building-Permits',
    'CA_MADERA': 'https://www.maderacounty.com/government/community-economic-development-department/building-division',
    'CA_MARIPOSA': 'https://www.mariposacounty.org/67/Building',

    // Sacramento Area Counties
    'CA_SACRAMENTO': 'https://building.saccounty.gov/',
    'CA_PLACER': 'https://www.placer.ca.gov/2128/Building-Services',
    'CA_EL_DORADO': 'https://www.eldoradocounty.ca.gov/Land-Use/Planning-and-Building/Building-Division',
    'CA_YOLO': 'https://www.yolocounty.gov/government/general-government-departments/community-services/building-inspection-services',
    'CA_SUTTER': 'https://www.suttercounty.org/government/county-departments/development-services/building-services',
    'CA_YUBA': 'https://www.yuba.gov/departments/community_development/building_department/permit_services.php',

    // North State Counties
    'CA_SHASTA': 'https://www.shastacounty.gov/building',
    'CA_BUTTE': 'https://www.buttecounty.net/251/Development-Services',
    'CA_HUMBOLDT': 'https://humboldtgov.org/2546/Planning-Building',
    'CA_MENDOCINO': 'https://www.mendocinocounty.gov/government/planning-building-services',
    'CA_LAKE': 'https://www.lakecountyca.gov/444/Building-Safety',
  }

  // Known city municipal code URLs (key = "STATE_CITY")
  const cityUrls: Record<string, string> = {
    // Major California Cities
    'CA_LOS_ANGELES': 'https://codelibrary.amlegal.com/codes/los_angeles/latest/lamc/0-0-0-1',
    'CA_SAN_DIEGO': 'https://www.sandiego.gov/development-services/codes-policies',
    'CA_SAN_FRANCISCO': 'https://codelibrary.amlegal.com/codes/san_francisco/latest/overview',
    'CA_SAN_JOSE': 'https://www.sanjoseca.gov/your-government/departments/planning-building-code-enforcement/building-code-enforcement',
    'CA_OAKLAND': 'https://www.oaklandca.gov/departments/planning-building',
    'CA_LONG_BEACH': 'https://www.longbeach.gov/lbds/',
    'CA_SANTA_MONICA': 'https://www.santamonica.gov/building-codes',
    'CA_PASADENA': 'https://www.cityofpasadena.net/building-and-safety/',
    'CA_BURBANK': 'https://www.burbankca.gov/departments/community-development/building-division',
    'CA_GLENDALE': 'https://www.glendaleca.gov/government/departments/community-development/building-safety',
    'CA_ALTADENA': 'https://pw.lacounty.gov/bsd/lib/BuildingCode/', // Unincorporated, uses LA County

    // San Diego County Cities
    'CA_CARLSBAD': 'https://www.carlsbadca.gov/departments/community-development/building',
    'CA_CHULA_VISTA': 'https://www.chulavistaca.gov/departments/development-services',
    'CA_EL_CAJON': 'https://www.elcajon.gov/doing-business/building-and-fire-permits',
    'CA_ESCONDIDO': 'https://www.escondido.gov/215/Building',
    'CA_NATIONAL_CITY': 'https://www.nationalcityca.gov/government/community-development/building',
    'CA_OCEANSIDE': 'https://www.ci.oceanside.ca.us/government/development-services/building',
    'CA_POWAY': 'https://poway.org/243/Building-Services',
    'CA_SANTEE': 'https://www.cityofsanteeca.gov/government/planning-and-building/building-permits-inspections',
    'CA_VISTA': 'https://www.vista.gov/departments/community-development/permits-forms',

    // Orange County Cities
    'CA_IRVINE': 'https://www.cityofirvine.org/community-development/building-safety',
    'CA_ANAHEIM': 'https://www.anaheim.net/1085/Building',
    'CA_SANTA_ANA': 'https://www.santa-ana.org/building-and-engineering/',

    // Riverside County Cities
    'CA_CORONA': 'https://www.coronaca.gov/departments/building-division',
    'CA_RIVERSIDE': 'https://riversideca.gov/cedd/building-safety',
    'CA_TEMECULA': 'https://temeculaca.gov/275/Building-Safety',
    'CA_MURRIETA': 'https://www.murrietaca.gov/162/Building-Safety',
    'CA_HEMET': 'https://www.hemetca.gov/68/Building-Safety',

    // San Bernardino County Cities
    'CA_FONTANA': 'https://www.fontanaca.gov/136/Building-Safety',
    'CA_MORENO_VALLEY': 'https://moval.gov/city_hall/muni-code.html',
    'CA_ONTARIO': 'https://www.ontarioca.gov/government/community-development/building',
    'CA_RANCHO_CUCAMONGA': 'https://www.cityofrc.us/community-development/building-safety',
    'CA_SAN_BERNARDINO': 'https://www.sanbernardino.gov/205/Building-Safety-Division',
    'CA_REDLANDS': 'https://www.cityofredlands.org/building-safety',

    // Bay Area - Alameda County Cities
    'CA_BERKELEY': 'https://berkeleyca.gov/construction-development/permit-types/building',
    'CA_FREMONT': 'https://www.fremont.gov/government/municipal-code',
    'CA_HAYWARD': 'https://www.hayward-ca.gov/your-government/codes-regulations',
    'CA_SAN_LEANDRO': 'https://www.sanleandro.org/212/Building-Codes',
    'CA_LIVERMORE': 'https://www.livermoreca.gov/departments/community-development/building',
    'CA_PLEASANTON': 'https://www.cityofpleasantonca.gov/gov/depts/cd/building/default.asp',
    'CA_DUBLIN': 'https://www.dublin.ca.gov/73/Municipal-Code',
    'CA_UNION_CITY': 'https://www.unioncity.org/210/Building',
    'CA_NEWARK': 'https://www.newarkca.gov/departments/public-works/building-inspection-division',

    // Bay Area - Santa Clara County Cities
    'CA_SUNNYVALE': 'https://www.sunnyvale.ca.gov/your-government/codes-and-policies',
    'CA_SANTA_CLARA': 'https://www.santaclaraca.gov/our-city/departments-a-f/community-development/building-division',
    'CA_MOUNTAIN_VIEW': 'https://www.mountainview.gov/our-city/departments/community-development/planning/regulations',
    'CA_MILPITAS': 'https://www.milpitas.gov/187/Adopted-Building-Municipal-Codes',
    'CA_CUPERTINO': 'https://www.cupertino.gov/Your-City/Departments/Community-Development/Building',
    'CA_PALO_ALTO': 'https://www.cityofpaloalto.org/Departments/Planning-Development-Services/Development-Services/Building',
    'CA_GILROY': 'https://www.cityofgilroy.org/209/Building-Division',
    'CA_MORGAN_HILL': 'https://www.morganhill.ca.gov/150/Building-Fire-Prevention',

    // Bay Area - San Mateo County Cities
    'CA_REDWOOD_CITY': 'https://www.redwoodcity.org/departments/community-development-department/building-inspection-code-enforcement',
    'CA_SAN_MATEO': 'https://www.cityofsanmateo.org/479/Building-Permits',
    'CA_DALY_CITY': 'https://www.dalycity.org/164/Building',
    'CA_SOUTH_SAN_FRANCISCO': 'https://www.ssf.net/departments/economic-community-development/building-division/building-codes',

    // Bay Area - Contra Costa County Cities
    'CA_CONCORD': 'https://www.cityofconcord.org/188/Current-Building-Codes',
    'CA_WALNUT_CREEK': 'https://www.walnutcreekca.gov/government/community-development-department/permits/building-permits',
    'CA_RICHMOND': 'https://www.ci.richmond.ca.us/2774/Building-Codes',

    // Sacramento Area Cities
    'CA_SACRAMENTO': 'https://www.cityofsacramento.gov/community-development/building/building-codes',
    'CA_ELK_GROVE': 'https://elkgrove.gov/departments-and-divisions/building-safety-inspection-and-permits',
    'CA_ROSEVILLE': 'https://www.roseville.ca.us/government/departments/development_services/building',
    'CA_FOLSOM': 'https://www.folsom.ca.us/government/community-development/building-services',
    'CA_ROCKLIN': 'https://www.rocklin.ca.us/building-services',
    'CA_CITRUS_HEIGHTS': 'https://www.citrusheights.net/134/Building-Safety-Division',
    'CA_RANCHO_CORDOVA': 'https://www.cityofranchocordova.org/departments/community-development/building-and-safety',
    'CA_WEST_SACRAMENTO': 'https://www.cityofwestsacramento.org/government/departments/community-development/building-division',
    'CA_WOODLAND': 'https://www.cityofwoodland.gov/259/Building-Division',
    'CA_DAVIS': 'https://www.cityofdavis.org/city-hall/community-development-and-sustainability/building',

    // Solano County Cities
    'CA_VACAVILLE': 'https://www.cityofvacaville.gov/government/community-development/building',
    'CA_FAIRFIELD': 'https://www.fairfield.ca.gov/government/city-departments/community-development/building-safety',
    'CA_VALLEJO': 'https://www.vallejo.gov/our_city/departments_divisions/planning_development_services/building_division',

    // Central Valley Cities
    'CA_FRESNO': 'https://www.fresno.gov/planning/building-and-safety/',
    'CA_BAKERSFIELD': 'https://www.bakersfieldcity.us/184/Building-Division',
    'CA_STOCKTON': 'https://www.stocktonca.gov/government/city_clerk/smc,_city_charter,_civil_service_rules.php',
    'CA_MODESTO': 'https://www.modestogov.com/564/Building-Safety-Division',
    'CA_VISALIA': 'https://www.visalia.city/depts/community_development/building_safety/default.asp',
    'CA_CLOVIS': 'https://www.clovisca.gov/services/planning_development/building/index.php',
    'CA_MERCED': 'https://www.cityofmerced.org/departments/development-services/building-division',

    // Ventura County Cities
    'CA_VENTURA': 'https://www.cityofventura.ca.gov/228/Building-Safety',
    'CA_OXNARD': 'https://www.oxnard.org/city-department/development-services/building-and-engineering-services/',
    'CA_THOUSAND_OAKS': 'https://toaks.gov/building',
    'CA_SIMI_VALLEY': 'https://www.simivalley.org/departments/environmental-services/building-safety-division',
    'CA_CAMARILLO': 'https://www.cityofcamarillo.org/departments/building___safety/index.php',
    'CA_MOORPARK': 'https://www.moorparkca.gov/164/Building-Safety',

    // Santa Barbara County Cities
    'CA_SANTA_BARBARA': 'https://santabarbaraca.gov/government/departments/community-development/building-safety',
    'CA_GOLETA': 'https://www.cityofgoleta.org/your-city/planning-and-environmental-review/building-planning/building-and-safety-division',
    'CA_SANTA_MARIA': 'https://www.cityofsantamaria.org/services/departments/community-development/building-division-homepage',
    'CA_LOMPOC': 'https://www.cityoflompoc.com/government/departments/building-safety-services',

    // San Luis Obispo County Cities
    'CA_SAN_LUIS_OBISPO': 'https://www.slocity.org/government/department-directory/community-development/building-safety',
    'CA_PASO_ROBLES': 'https://www.prcity.com/189/Building',
    'CA_ATASCADERO': 'https://www.atascadero.org/building-division',

    // Monterey County Cities
    'CA_MONTEREY': 'https://monterey.org/your_city_hall/departments/community_development/building_and_safety_services/',
    'CA_SALINAS': 'https://www.salinas.gov/Residents/Permit-Center',

    // Santa Cruz County Cities
    'CA_SANTA_CRUZ': 'https://www.santacruzca.gov/Government/City-Departments/Planning-and-Community-Development/Building-Safety',
    'CA_WATSONVILLE': 'https://www.watsonville.gov/150/Building-Division',

    // San Benito County
    'CA_HOLLISTER': 'https://hollister.ca.gov/government/development_services/building.php',
  }

  // Known water utility URLs
  const utilityUrls: Record<string, string> = {
    // Major SoCal Utilities
    'LADWP': 'https://www.ladwp.com/ladwp/faces/ladwp/residential/r-savemoney/r-sm-rebatesandprograms',
    'Los Angeles DWP': 'https://www.ladwp.com/ladwp/faces/ladwp/residential/r-savemoney/r-sm-rebatesandprograms',
    'MWD': 'https://www.bewaterwise.com/',
    'Metropolitan Water District': 'https://www.bewaterwise.com/',
    'Long Beach Water': 'https://lbwater.org/save/rebates/',
    'Las Virgenes MWD': 'https://www.lvmwd.com/conservation/',
    'LVMWD': 'https://www.lvmwd.com/conservation/',
    'West Basin MWD': 'https://westbasin.org/conservation/',
    'Calleguas MWD': 'https://www.calleguas.com/',

    // San Diego Area
    'San Diego County Water Authority': 'https://www.sdcwa.org/your-water/conservation/',
    'SDCWA': 'https://www.sdcwa.org/your-water/conservation/',
    'Helix Water District': 'https://www.hwd.com/200/Conservation-Rebates',
    'Otay Water District': 'https://www.otaywater.gov/conservation-programs/',
    'Padre Dam MWD': 'https://www.padredam.org/110/Conservation',
    'Sweetwater Authority': 'https://www.sweetwater.org/213/Rebates',
    'Rincon del Diablo MWD': 'https://rinconwater.org/departments/conservation/',

    // Inland Empire / Riverside / San Bernardino
    'Eastern MWD': 'https://www.emwd.org/',
    'EMWD': 'https://www.emwd.org/',
    'Inland Empire Utilities': 'https://www.ieua.org/water-use-efficiency/',
    'IEUA': 'https://www.ieua.org/water-use-efficiency/',
    'Western MWD': 'https://www.wmwd.com/288/Rebates-Incentives',
    'Elsinore Valley MWD': 'https://evmwd.com/who-we-are/conservation/rebates/',
    'Rancho California Water District': 'https://www.ranchowater.com/234/Rebates-Programs',

    // Orange County
    'IRWD': 'https://www.irwd.com/save-water/rebates',
    'Irvine Ranch Water District': 'https://www.irwd.com/save-water/rebates',

    // Bay Area Utilities
    'EBMUD': 'https://www.ebmud.com/water/conservation-and-rebates/',
    'East Bay MUD': 'https://www.ebmud.com/water/conservation-and-rebates/',
    'SFPUC': 'https://sfpuc.org/programs/rebates',
    'San Francisco PUC': 'https://sfpuc.org/programs/rebates',
    'Santa Clara Valley Water': 'https://www.valleywater.org/rebates',
    'Valley Water': 'https://www.valleywater.org/rebates',
    'Marin Water': 'https://www.marinwater.org/rebates',
    'MMWD': 'https://www.marinwater.org/rebates',
    'Marin Municipal Water District': 'https://www.marinwater.org/rebates',
    'Contra Costa Water': 'https://www.ccwater.com/290/Rebates-Programs',
    'Zone 7 Water Agency': 'https://www.zone7water.com/',
    'ACWD': 'https://www.acwd.org/rebates',
    'Alameda County Water': 'https://www.acwd.org/rebates',
    'Sonoma County Water Agency': 'https://www.sonomawater.org/rebates',

    // Sacramento Area
    'Sacramento County Water Agency': 'https://waterresources.saccounty.gov/Pages/Sacramento-County-Water-Agency---Rebate-Programs.aspx',
    'Placer County Water Agency': 'https://www.pcwa.net/smart-water-use/rebate-programs',
    'PCWA': 'https://www.pcwa.net/smart-water-use/rebate-programs',

    // Central Valley / Desert
    'Coachella Valley Water District': 'https://www.cvwd.org/378/Rebates',
    'CVWD': 'https://www.cvwd.org/378/Rebates',
    'Desert Water Agency': 'https://dwa.org/conservation/rebates-incentives/',
    'Kern County Water Agency': 'https://www.kcwa.com/waterconservation/',
    'Solano Irrigation District': 'https://www.sidwater.org/106/Water-Management',

    // Private Water Companies (serve multiple areas)
    'Golden State Water Company': 'https://www.gswater.com/conservation',
    'Golden State Water': 'https://www.gswater.com/conservation',
    'San Jose Water Company': 'https://www.sjwater.com/customer-care/help-information/rebates-incentives',
    'San Jose Water': 'https://www.sjwater.com/customer-care/help-information/rebates-incentives',
    'Cal Water': 'https://www.calwater.com/conservation-rebates/',
    'California Water Service': 'https://www.calwater.com/conservation-rebates/',

    // SoCal Special Districts & MWDs
    'Municipal Water District of Orange County': 'https://www.mwdoc.com/save-water/rebates/',
    'MWDOC': 'https://www.mwdoc.com/save-water/rebates/',
    'Orange County Water District': 'https://www.ocwd.com/',
    'OCWD': 'https://www.ocwd.com/',
    'San Gabriel Valley MWD': 'https://sgvmwd.com/water-conservation/',
    'Three Valleys MWD': 'https://www.threevalleys.com/',
    'Upper San Gabriel Valley MWD': 'https://upperwater.org/',
    'Central Basin MWD': 'https://www.centralbasin.org/',
    'Water Replenishment District': 'https://www.wrd.org/',
    'WRD': 'https://www.wrd.org/',
    'Santa Clarita Valley Water Agency': 'https://yourscvwater.com/rebates/',
    'SCV Water': 'https://yourscvwater.com/rebates/',
    'Santa Ana Watershed Project Authority': 'https://sawpa.gov/',
    'SAWPA': 'https://sawpa.gov/',

    // Bay Area Special Districts
    'BAWSCA': 'https://bawsca.org/',
    'Bay Area Water Supply and Conservation Agency': 'https://bawsca.org/',
    'Dublin San Ramon Services District': 'https://www.dsrsd.com/',
    'DSRSD': 'https://www.dsrsd.com/',
    'Contra Costa Water District': 'https://www.ccwater.com/',
    'CCWD': 'https://www.ccwater.com/',
    'Solano County Water Agency': 'https://scwa2.com/',
    'SCWA': 'https://scwa2.com/',
    'North Marin Water District': 'https://nmwd.com/',
    'Sonoma-Marin Saving Water Partnership': 'https://www.savingwaterpartnership.org/',
    'Monterey One Water': 'https://www.montereyonewater.org/',
    'Pajaro Valley Water Management Agency': 'https://www.pvwater.org/',

    // State & Regional Programs
    'SoCal Water$mart': 'https://socalwatersmart.com/',
    'SoCalWaterSmart': 'https://socalwatersmart.com/',
    'BeWaterWise': 'https://www.bewaterwise.com/',
    'Save Our Water': 'https://saveourwater.com/',
    'California Department of Water Resources': 'https://water.ca.gov/',
    'DWR': 'https://water.ca.gov/',
    'California State Water Resources Control Board': 'https://www.waterboards.ca.gov/',
    'State Water Board': 'https://www.waterboards.ca.gov/',
    'Regional Water Authority': 'https://rwah2o.org/',

    // Regional Water Quality Control Boards
    'Los Angeles RWQCB': 'https://www.waterboards.ca.gov/losangeles/',
    'San Diego RWQCB': 'https://www.waterboards.ca.gov/sandiego/',
    'Central Valley RWQCB': 'https://www.waterboards.ca.gov/centralvalley/',
    'San Francisco Bay RWQCB': 'https://www.waterboards.ca.gov/sanfranciscobay/',
    'North Coast RWQCB': 'https://www.waterboards.ca.gov/northcoast/',

    // Energy Utilities (water heater rebates)
    'SoCalGas': 'https://www.socalgas.com/savings/rebates-and-incentives',
    'PG&E': 'https://www.pge.com/en/save-energy-and-money/rebates-and-incentives.html',
    'SDG&E': 'https://www.sdge.com/rebates',
    'Southern California Edison': 'https://www.sce.com/save-money/rebates-financial-assistance',
    'SCE': 'https://www.sce.com/save-money/rebates-financial-assistance',
    'Golden State Rebates': 'https://goldenstaterebates.com/',

    // Greywater & Water Efficiency Organizations
    'Greywater Action': 'https://greywateraction.org/',
    'ReWater Systems': 'https://rewater.com/',
    'Alliance for Water Efficiency': 'https://allianceforwaterefficiency.org/',
    'WaterNow Alliance': 'https://waternow.org/',
    'California Water Efficiency Partnership': 'https://calwep.org/',
    'CalWEP': 'https://calwep.org/',
    'EPA WaterSense': 'https://www.epa.gov/watersense',
    'WaterSense': 'https://www.epa.gov/watersense',

    // Air Quality Districts (with water-related rebates)
    'South Coast AQMD': 'https://www.aqmd.gov/home/programs',
    'SCAQMD': 'https://www.aqmd.gov/home/programs',
    'Bay Area AQMD': 'https://www.baaqmd.gov/funding-and-incentives',
    'BAAQMD': 'https://www.baaqmd.gov/funding-and-incentives',
  }

  // Helper to normalize names for key lookup
  const normalize = (name: string) => name?.toUpperCase().replace(/[^A-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || ''

  const stateUrl = stateUrls[stateCode] || undefined
  const countyKey = countyName ? `${stateCode}_${normalize(countyName)}` : ''
  const countyUrl = countyUrls[countyKey] || undefined
  const cityKey = cityName ? `${stateCode}_${normalize(cityName)}` : ''
  const cityUrl = cityUrls[cityKey] || undefined

  return {
    stateUrl,
    countyUrl,
    cityUrl,
    getUtilityUrl: (utilityName: string) => utilityUrls[utilityName] || utilityUrls[normalize(utilityName)] || undefined
  }
}

const DataConfidenceBadge = ({ confidence }: { confidence: DataConfidence }) => {
  const config = {
    verified: {
      icon: CheckCircle2,
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: 'Verified',
      tooltip: 'Regulation data confirmed with official sources'
    },
    partial: {
      icon: AlertCircle,
      className: 'bg-amber-50 text-amber-700 border-amber-200',
      label: 'Partial Data',
      tooltip: 'Some regulation details may be incomplete - contact your local authority to confirm'
    },
    unknown: {
      icon: HelpCircle,
      className: 'bg-gray-100 text-gray-600 border-gray-200',
      label: 'Not Verified',
      tooltip: 'Regulation data pending verification - contact your local building department for current rules'
    }
  }
  const { icon: Icon, className, label, tooltip } = config[confidence]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border cursor-help ${className}`}
      title={tooltip}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}

const ResourceTypeBadge = ({ type }: { type: 'greywater' | 'rainwater' | 'conservation' }) => {
  const config = {
    greywater: { icon: Droplets, label: 'Greywater', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    rainwater: { icon: CloudRain, label: 'Rainwater', className: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    conservation: { icon: Leaf, label: 'Conservation', className: 'bg-teal-50 text-teal-700 border-teal-200' }
  }
  const { icon: Icon, label, className } = config[type]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}

type ProgramType = 'rebate' | 'loan' | 'tax_credit' | 'tax_exemption' | 'subsidy' | 'free_installation' | 'permit_waiver' | 'education' | 'various'

const ProgramTypeBadge = ({ type }: { type: ProgramType }) => {
  const config: Record<ProgramType, { label: string; className: string }> = {
    rebate: { label: 'Rebate', className: 'bg-green-100 text-green-800' },
    loan: { label: 'Low-Interest Loan', className: 'bg-blue-100 text-blue-800' },
    tax_credit: { label: 'Tax Credit', className: 'bg-indigo-100 text-indigo-800' },
    tax_exemption: { label: 'Tax Exemption', className: 'bg-indigo-100 text-indigo-800' },
    subsidy: { label: 'Subsidy', className: 'bg-amber-100 text-amber-800' },
    free_installation: { label: 'Free Install', className: 'bg-pink-100 text-pink-800' },
    permit_waiver: { label: 'Permit Waiver', className: 'bg-gray-100 text-gray-800' },
    education: { label: 'Education', className: 'bg-sky-100 text-sky-800' },
    various: { label: 'Multiple', className: 'bg-gray-100 text-gray-700' }
  }
  const { label, className } = config[type] || { label: type, className: 'bg-gray-100 text-gray-700' }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${className}`}>
      {label}
    </span>
  )
}

const EligibilityBadges = ({ residential, commercial }: { residential?: boolean | string; commercial?: boolean | string }) => {
  const isResidential = residential === true || residential === 'true'
  const isCommercial = commercial === true || commercial === 'true'

  if (!isResidential && !isCommercial) return null

  return (
    <div className="flex gap-1">
      {isResidential && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
          Residential
        </span>
      )}
      {isCommercial && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-50 text-orange-700 border border-orange-200">
          Commercial
        </span>
      )}
    </div>
  )
}

const JurisdictionLevelBadge = ({ level }: {
  level?: 'state' | 'county' | 'city' | 'other'
  stateName?: string
  countyName?: string
  cityName?: string
}) => {
  if (!level) return null

  const config: Record<string, { label: string; className: string }> = {
    state: {
      label: 'State',
      className: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    county: {
      label: 'County',
      className: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    city: {
      label: 'City',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    other: {
      label: 'District',
      className: 'bg-blue-50 text-blue-700 border-blue-200'
    }
  }

  const { label, className } = config[level] || config.other

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border whitespace-nowrap ${className}`}>
      {label}
    </span>
  )
}

const getProgramAmountLabel = (type?: string): string => {
  const typeMap: Record<string, string> = {
    rebate: 'max rebate',
    grant: 'max grant',
    loan: 'loan amount',
    tax_credit: 'tax credit',
    tax_exemption: 'exemption value',
    subsidy: 'max subsidy',
    free_installation: 'value',
    various: 'max amount'
  }
  return typeMap[type || 'rebate'] || 'max amount'
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function LocationHubView({
  level,
  stateName,
  stateCode,
  cityName,
  countyName,
  greywater,
  rainwater,
  agency,
  incentives,
  cities = [],
  lastUpdated,
  preplumbing,
  localRegulation,
  waterUtilities = [],
  permitData
}: LocationHubViewProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllCities, setShowAllCities] = useState(false)
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())
  const INITIAL_CITIES = 30

  const toggleProgram = (programId: string) => {
    setExpandedPrograms(prev => {
      const next = new Set(prev)
      if (next.has(programId)) {
        next.delete(programId)
      } else {
        next.add(programId)
      }
      return next
    })
  }

  const locationName = level === 'city' ? cityName : stateName
  const basePath = level === 'city'
    ? `/${stateCode.toLowerCase()}/${cityName?.toLowerCase().replace(/\s+/g, '-')}`
    : `/${stateCode.toLowerCase()}`

  // Get jurisdiction URLs for linking to official code documentation
  const jurisdictionUrls = getJurisdictionUrls(stateCode, stateName, countyName, cityName)

  // Filter cities
  const filteredCities = cities.filter(c =>
    c.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => (a.city_name || '').localeCompare(b.city_name || ''))

  // Filter function to exclude grants
  const isNotGrant = (i: IncentiveProgram) => {
    const type = (i.incentive_type || '').toLowerCase()
    return type !== 'grant' && !type.includes('grant')
  }

  // Count incentives by resource type (excluding grants)
  const incentiveCounts = {
    greywater: incentives.filter(i => i.resource_type === 'greywater' && isNotGrant(i)).length,
    rainwater: incentives.filter(i => i.resource_type === 'rainwater' && isNotGrant(i)).length,
    conservation: incentives.filter(i => (i.resource_type === 'conservation' || !i.resource_type) && isNotGrant(i)).length,
    total: incentives.filter(isNotGrant).length
  }

  // Filter out grants - only show rebates for homeowners and small businesses
  const relevantIncentives = incentives.filter(isNotGrant)

  // Max rebate amount (excluding grants)
  const maxRebate = Math.max(...relevantIncentives.map(i => i.incentive_amount_max || 0), 0)

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-emerald-600">Home</Link>
          {level === 'city' && (
            <>
              <ChevronRight className="h-3 w-3 text-gray-300" />
              <Link href={`/${stateCode.toLowerCase()}`} className="text-gray-500 hover:text-emerald-600">
                {stateName}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-900 font-medium">{locationName}</span>
        </nav>

        {/* Hero Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {level === 'city'
                ? `Water Conservation in ${cityName}, ${stateCode}`
                : `${stateName} Water Regulations`
              }
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-4">
            {level === 'city'
              ? `Complete guide to greywater, rainwater harvesting, and rebates in ${cityName}`
              : `Greywater laws, rainwater harvesting rules, and water conservation programs across ${stateName}`
            }
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <DataConfidenceBadge confidence={getDataConfidence(greywater)} />
            {lastUpdated && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-gray-500 bg-gray-100 border border-gray-200">
                <Clock className="h-3 w-3" />
                Updated {new Date(lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>

        </div>

        {/* Location Context Card - Rebates, Local Regulations, Hierarchy, Utilities */}
        <div className="mb-6">
          <LocationContextCard
            level={level}
            stateName={stateName}
            stateCode={stateCode}
            cityName={cityName}
            countyName={countyName}
            incentives={incentives}
            localRegulation={localRegulation}
            waterUtilities={waterUtilities}
            showRebateBanner={true}
          />
        </div>

        {/* Detailed Regulations Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Greywater Regulations */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 px-5 py-4 border-b border-emerald-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Greywater Regulations</h2>
                    <p className="text-xs text-gray-500">{stateName} state law {level === 'city' ? '+ local rules' : ''}</p>
                  </div>
                </div>
                <Link
                  href={`${basePath}/greywater`}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  Full details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="p-5">
              {/* Status & Key Info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Legal Status</p>
                  <p className={`font-semibold ${greywater?.legalStatus?.toLowerCase().includes('legal') ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {greywater?.legalStatus || 'Varies by jurisdiction'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Permit Required</p>
                  <p className="font-semibold text-gray-700">
                    {greywater?.permitThresholdGpd && greywater.permitThresholdGpd > 0
                      ? `Over ${greywater.permitThresholdGpd} GPD`
                      : greywater?.permitRequired || 'Varies'
                    }
                  </p>
                </div>
              </div>

              {/* Summary */}
              {greywater?.summary ? (
                <p className="text-sm text-gray-600 mb-4">{greywater.summary}</p>
              ) : (
                <p className="text-sm text-gray-500 mb-4 italic">
                  {level === 'city' && stateName === 'California'
                    ? 'California allows greywater systems under the Plumbing Code Chapter 15. Simple laundry-to-landscape systems under 250 GPD typically don\'t require a permit.'
                    : `Contact your local building department for specific greywater regulations in ${locationName}.`
                  }
                </p>
              )}

              {/* Allowed Uses */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-help ${greywater?.outdoorUseAllowed !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                  title={greywater?.outdoorUseAllowed !== false
                    ? "Greywater can be used for subsurface landscape irrigation. Most jurisdictions allow laundry-to-landscape systems without a permit when following state guidelines."
                    : "Outdoor greywater irrigation is restricted or prohibited in this jurisdiction. Check local regulations for specific requirements."
                  }
                >
                  {greywater?.outdoorUseAllowed !== false ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                  Outdoor Irrigation
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-help ${greywater?.indoorUseAllowed ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                  title={greywater?.indoorUseAllowed
                    ? "Treated greywater can be used for toilet flushing and other indoor non-potable uses. Requires filtration, disinfection, and permits."
                    : "Indoor greywater reuse (toilet flushing) is not permitted in this jurisdiction. Only subsurface irrigation is allowed for untreated greywater."
                  }
                >
                  {greywater?.indoorUseAllowed ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                  Indoor Use (Toilet Flushing)
                </span>
              </div>

              {/* Governing Code */}
              {greywater?.governingCode && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Governing Code
                  </p>
                  {jurisdictionUrls.stateUrl ? (
                    <a
                      href={jurisdictionUrls.stateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
                    >
                      {greywater.governingCode}
                      <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-700">{greywater.governingCode}</p>
                  )}
                </div>
              )}

              {/* Approved Uses List */}
              {greywater?.approvedUses && greywater.approvedUses.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Approved Uses</p>
                  <div className="flex flex-wrap gap-1">
                    {greywater.approvedUses.slice(0, 4).map((use, idx) => (
                      <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                        {use}
                      </span>
                    ))}
                    {greywater.approvedUses.length > 4 && (
                      <span className="text-xs text-gray-500">+{greywater.approvedUses.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Key Restrictions */}
              {greywater?.keyRestrictions && greywater.keyRestrictions.length > 0 && (
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Key Restrictions
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {greywater.keyRestrictions.slice(0, 3).map((restriction, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pre-Plumbing Mandate */}
              {preplumbing?.hasMandate && (
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-1">Pre-Plumbing Mandate</p>
                        <p className="text-xs text-purple-600 mb-2">
                          {preplumbing.details || 'New construction must include greywater-ready plumbing.'}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-purple-500">
                          {preplumbing.buildingTypes && (
                            <span><strong>Applies to:</strong> {preplumbing.buildingTypes}</span>
                          )}
                          {preplumbing.thresholdSqft && (
                            <span><strong>Threshold:</strong> {preplumbing.thresholdSqft.toLocaleString()}+ sqft</span>
                          )}
                        </div>
                        {preplumbing.codeReference && (
                          <p className="text-xs text-purple-400 mt-1">{preplumbing.codeReference}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Rainwater Regulations */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100/50 px-5 py-4 border-b border-cyan-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center">
                    <CloudRain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Rainwater Harvesting</h2>
                    <p className="text-xs text-gray-500">{stateName} state law {level === 'city' ? '+ local rules' : ''}</p>
                  </div>
                </div>
                <Link
                  href={`${basePath}/rainwater`}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1"
                >
                  Full details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="p-5">
              {/* Status & Key Info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Legal Status</p>
                  <p className={`font-semibold ${rainwater?.legalStatus?.toLowerCase().includes('legal') ? 'text-cyan-700' : 'text-gray-700'}`}>
                    {rainwater?.legalStatus || 'Legal in most areas'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Collection Limit</p>
                  <p className="font-semibold text-gray-700">
                    {rainwater?.collectionLimitGallons && rainwater.collectionLimitGallons > 0
                      ? `${rainwater.collectionLimitGallons.toLocaleString()} gallons`
                      : 'No limit'
                    }
                  </p>
                </div>
              </div>

              {/* Summary */}
              {rainwater?.summary ? (
                <p className="text-sm text-gray-600 mb-4">{rainwater.summary}</p>
              ) : (
                <p className="text-sm text-gray-500 mb-4 italic">
                  {level === 'city' && stateName === 'California'
                    ? 'California encourages rainwater harvesting with no permit required for residential collection. Rain barrels and cisterns are allowed without restriction on collection volume.'
                    : `Rainwater harvesting is generally encouraged in ${locationName}. Check local regulations for specific requirements.`
                  }
                </p>
              )}

              {/* Allowed Uses */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-help bg-cyan-100 text-cyan-700"
                  title="Rainwater can be used for landscape irrigation without treatment. Systems under 360 gallons have no water quality requirements for outdoor use."
                >
                  <CheckCircle2 className="h-3 w-3" />
                  Outdoor Irrigation
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-help ${rainwater?.potableUseAllowed ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'}`}
                  title={rainwater?.potableUseAllowed
                    ? "Rainwater can be treated and used as drinking water with proper filtration, disinfection, and permits from local health authorities."
                    : "Rainwater cannot be used for drinking water in this jurisdiction. Only non-potable uses (irrigation, toilet flushing) are permitted."
                  }
                >
                  {rainwater?.potableUseAllowed ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                  Potable Use {rainwater?.potableUseAllowed ? '(with treatment)' : '(not allowed)'}
                </span>
              </div>

              {/* Governing Code */}
              {rainwater?.governingCode && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Governing Code
                  </p>
                  {jurisdictionUrls.stateUrl ? (
                    <a
                      href={jurisdictionUrls.stateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group"
                    >
                      {rainwater.governingCode}
                      <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-700">{rainwater.governingCode}</p>
                  )}
                </div>
              )}

              {/* Tax Incentives */}
              {rainwater?.taxIncentives && (
                <div className="bg-cyan-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-cyan-600 mb-1 flex items-center gap-1">
                    <DollarSign className="h-3 w-3" /> Tax Incentives
                  </p>
                  <p className="text-sm text-cyan-700">{rainwater.taxIncentives}</p>
                </div>
              )}

              {/* Approved Uses List */}
              {rainwater?.approvedUses && rainwater.approvedUses.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Approved Uses</p>
                  <div className="flex flex-wrap gap-1">
                    {rainwater.approvedUses.slice(0, 4).map((use, idx) => (
                      <span key={idx} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded">
                        {use}
                      </span>
                    ))}
                    {rainwater.approvedUses.length > 4 && (
                      <span className="text-xs text-gray-500">+{rainwater.approvedUses.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Key Restrictions */}
              {rainwater?.keyRestrictions && rainwater.keyRestrictions.length > 0 && (
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Key Restrictions
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {rainwater.keyRestrictions.slice(0, 3).map((restriction, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Permit Requirements Section */}
        {(permitData || greywater?.permitThresholdGpd) && (
          <div id="permits" className="mb-8 scroll-mt-4">
            <PermitSection
              level={level}
              locationName={level === 'city' ? (cityName || '') : stateName}
              stateCode={stateCode}
              stateName={stateName}
              permitData={permitData || null}
              stateBaseline={greywater ? {
                thresholdGpd: greywater.permitThresholdGpd || undefined,
                permitFramework: greywater.governingCode,
                diyAllowed: true,
                exemptions: greywater.permitThresholdGpd
                  ? [`Simple systems under ${greywater.permitThresholdGpd} GPD typically exempt`]
                  : undefined
              } : null}
            />
          </div>
        )}

        {/* Incentives Section */}
        {incentives.length > 0 && (
          <div id="rebates" className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8 scroll-mt-4">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  Available Rebates & Incentives
                </h2>
                <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  {relevantIncentives.length} programs
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {level === 'city'
                  ? `Programs available to ${locationName} residents from state, ${countyName ? 'county, ' : ''}and city governments`
                  : `Rebates, tax credits, and other incentives for ${locationName} homeowners and small businesses`
                }
              </p>
            </div>

            {/* Mobile Cards - Visible only on small screens */}
            <div className="md:hidden p-4 space-y-3">
              {relevantIncentives.map((program, idx) => {
                const programId = `mobile-${idx}-${program.program_name}`
                const isExpanded = expandedPrograms.has(programId)
                const hasDetails = !!(
                  program.program_description ||
                  program.eligibility_details ||
                  program.how_to_apply ||
                  program.steps_to_apply ||
                  program.documentation_required ||
                  program.installation_requirements ||
                  program.contractor_requirements ||
                  program.property_requirements ||
                  program.reimbursement_process ||
                  program.restrictions ||
                  program.stacking_details ||
                  program.contact_email ||
                  program.contact_phone
                )

                return (
                  <div
                    key={idx}
                    className={`bg-white rounded-xl border ${isExpanded ? 'border-emerald-300 shadow-sm' : 'border-gray-200'} overflow-hidden`}
                  >
                    {/* Card Header */}
                    <div
                      className={`p-4 ${hasDetails ? 'cursor-pointer' : ''} ${isExpanded ? 'bg-emerald-50' : ''}`}
                      onClick={() => hasDetails && toggleProgram(programId)}
                    >
                      {/* Top row: badges */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <JurisdictionLevelBadge
                          level={program.jurisdiction_level}
                          stateName={stateName}
                          countyName={countyName}
                          cityName={cityName}
                        />
                        <ProgramTypeBadge type={(program.incentive_type as ProgramType) || 'rebate'} />
                        {hasDetails && (
                          <ChevronDown className={`h-4 w-4 text-gray-400 ml-auto transition-transform ${isExpanded ? 'rotate-180 text-emerald-600' : ''}`} />
                        )}
                      </div>

                      {/* Program name */}
                      <h3 className="font-semibold text-gray-900 mb-1">{program.program_name}</h3>

                      {/* Provider */}
                      {program.water_utility && (
                        <p className="text-xs text-gray-500 mb-2">{program.water_utility}</p>
                      )}

                      {/* Deadline */}
                      {program.deadline_info && (
                        <p className="text-xs text-amber-600 font-medium mb-2">⏰ {program.deadline_info}</p>
                      )}

                      {/* Amount and Apply button row */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div>
                          {program.incentive_amount_max ? (
                            <>
                              <span className="text-lg font-bold text-emerald-600">
                                ${program.incentive_amount_max.toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-400 ml-1">
                                {program.incentive_per_unit?.toLowerCase().includes('per ')
                                  ? 'max'
                                  : program.incentive_per_unit || 'max'}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-400">Amount varies</span>
                          )}
                        </div>
                        {program.incentive_url ? (
                          <a
                            href={program.incentive_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                          >
                            Apply <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">No link</span>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && hasDetails && (
                      <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
                        {program.program_description && (
                          <p className="text-sm text-gray-600 mb-3">{program.program_description}</p>
                        )}

                        <div className="space-y-2">
                          {program.eligibility_details && (
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1">
                                <Users className="h-3.5 w-3.5 text-blue-600" />
                                Who's Eligible
                              </h4>
                              <p className="text-sm text-gray-600">{program.eligibility_details}</p>
                            </div>
                          )}

                          {(program.how_to_apply || program.steps_to_apply) && (
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1">
                                <ClipboardList className="h-3.5 w-3.5 text-emerald-600" />
                                How to Apply
                              </h4>
                              <p className="text-sm text-gray-600">{program.steps_to_apply || program.how_to_apply}</p>
                            </div>
                          )}

                          {program.documentation_required && (
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1">
                                <FileText className="h-3.5 w-3.5 text-indigo-600" />
                                Documentation Required
                              </h4>
                              <p className="text-sm text-gray-600">{program.documentation_required}</p>
                            </div>
                          )}

                          {program.installation_requirements && (
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1">
                                <Wrench className="h-3.5 w-3.5 text-orange-600" />
                                Installation Requirements
                              </h4>
                              <p className="text-sm text-gray-600">{program.installation_requirements}</p>
                            </div>
                          )}

                          {program.restrictions && (
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1">
                                <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                                Restrictions
                              </h4>
                              <p className="text-sm text-gray-600">{program.restrictions}</p>
                            </div>
                          )}
                        </div>

                        {/* Contact & Badges */}
                        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                          {(program.pre_approval_required === true || program.pre_approval_required === 'true') && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                              ⚠️ Pre-approval
                            </span>
                          )}
                          {(program.inspection_required === true || program.inspection_required === 'true') && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                              🔍 Inspection
                            </span>
                          )}
                          {program.contact_phone && (
                            <a href={`tel:${program.contact_phone}`} className="inline-flex items-center gap-1 text-xs text-emerald-600">
                              <Phone className="h-3 w-3" />
                              {program.contact_phone}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Desktop Table - Hidden on small screens */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-8"></th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Level</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Program</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Provider</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {relevantIncentives.map((program, idx) => {
                      const programId = `table-${idx}-${program.program_name}`
                      const isExpanded = expandedPrograms.has(programId)
                      const hasDetails = !!(
                        program.program_description ||
                        program.eligibility_details ||
                        program.how_to_apply ||
                        program.steps_to_apply ||
                        program.documentation_required ||
                        program.installation_requirements ||
                        program.contractor_requirements ||
                        program.property_requirements ||
                        program.reimbursement_process ||
                        program.restrictions ||
                        program.stacking_details ||
                        program.contact_email ||
                        program.contact_phone
                      )

                      return (
                        <React.Fragment key={idx}>
                          {/* Main Row */}
                          <tr
                            className={`${hasDetails ? 'cursor-pointer' : ''} hover:bg-gray-50 transition-colors ${isExpanded ? 'bg-emerald-50' : ''}`}
                            onClick={() => hasDetails && toggleProgram(programId)}
                          >
                            {/* Expand Icon */}
                            <td className="px-4 py-4">
                              {hasDetails && (
                                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180 text-emerald-600' : ''}`} />
                              )}
                            </td>

                            {/* Jurisdiction Level */}
                            <td className="px-4 py-4">
                              <JurisdictionLevelBadge
                                level={program.jurisdiction_level}
                                stateName={stateName}
                                countyName={countyName}
                                cityName={cityName}
                              />
                            </td>

                            {/* Program Name */}
                            <td className="px-4 py-4">
                              <div className="flex flex-col gap-1">
                                <span className="font-medium text-gray-900">{program.program_name}</span>
                                {program.deadline_info && (
                                  <span className="text-xs text-amber-600 font-medium">⏰ {program.deadline_info}</span>
                                )}
                              </div>
                            </td>

                            {/* Program Type (Rebate/Tax Credit) */}
                            <td className="px-4 py-4">
                              <ProgramTypeBadge type={(program.incentive_type as ProgramType) || 'rebate'} />
                            </td>

                            {/* Provider */}
                            <td className="px-4 py-4 hidden lg:table-cell">
                              <span className="text-sm text-gray-600">{program.water_utility || '—'}</span>
                            </td>

                            {/* Amount */}
                            <td className="px-4 py-4 text-right">
                              {program.incentive_amount_max ? (
                                <div>
                                  <span className="font-semibold text-emerald-600">
                                    {program.incentive_per_unit?.toLowerCase().includes('per ') ? 'Up to ' : ''}
                                    ${program.incentive_amount_max.toLocaleString()}
                                  </span>
                                  {program.incentive_per_unit && !program.incentive_per_unit.toLowerCase().includes('per ') && (
                                    <p className="text-xs text-gray-400">{program.incentive_per_unit}</p>
                                  )}
                                  {program.incentive_per_unit?.toLowerCase().includes('per ') && (
                                    <p className="text-xs text-gray-400">max</p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>

                            {/* Apply Button */}
                            <td className="px-4 py-4 text-center">
                              {program.incentive_url ? (
                                <a
                                  href={program.incentive_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                                >
                                  Apply <ExternalLink className="h-3 w-3" />
                                </a>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>
                          </tr>

                          {/* Expanded Details Row */}
                          {isExpanded && hasDetails && (
                            <tr className="bg-gray-50">
                              <td colSpan={7} className="px-4 py-0">
                                <div className="py-4 border-t border-gray-100">
                                  {/* Description */}
                                  {program.program_description && (
                                    <p className="text-sm text-gray-600 mb-4">{program.program_description}</p>
                                  )}
                                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Eligibility Details */}
                                    {program.eligibility_details && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Users className="h-3.5 w-3.5 text-blue-600" />
                                          Who's Eligible
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.eligibility_details}</p>
                                      </div>
                                    )}

                                    {/* How to Apply */}
                                    {(program.how_to_apply || program.steps_to_apply) && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <ClipboardList className="h-3.5 w-3.5 text-emerald-600" />
                                          How to Apply
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.steps_to_apply || program.how_to_apply}</p>
                                      </div>
                                    )}

                                    {/* Documentation */}
                                    {program.documentation_required && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <FileText className="h-3.5 w-3.5 text-indigo-600" />
                                          Documentation Required
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.documentation_required}</p>
                                      </div>
                                    )}

                                    {/* Property Requirements */}
                                    {program.property_requirements && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Home className="h-3.5 w-3.5 text-purple-600" />
                                          Property Requirements
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.property_requirements}</p>
                                      </div>
                                    )}

                                    {/* Installation Requirements */}
                                    {program.installation_requirements && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Wrench className="h-3.5 w-3.5 text-orange-600" />
                                          Installation Requirements
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.installation_requirements}</p>
                                      </div>
                                    )}

                                    {/* Contractor Requirements */}
                                    {program.contractor_requirements && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <BadgeCheck className="h-3.5 w-3.5 text-teal-600" />
                                          Contractor Requirements
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.contractor_requirements}</p>
                                      </div>
                                    )}

                                    {/* Timeline */}
                                    {(program.processing_time || program.timeline_to_complete) && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Timer className="h-3.5 w-3.5 text-amber-600" />
                                          Timeline
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.processing_time || program.timeline_to_complete}</p>
                                      </div>
                                    )}

                                    {/* Reimbursement */}
                                    {program.reimbursement_process && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <DollarSign className="h-3.5 w-3.5 text-green-600" />
                                          Reimbursement Process
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.reimbursement_process}</p>
                                      </div>
                                    )}

                                    {/* Restrictions */}
                                    {program.restrictions && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                                          Restrictions
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.restrictions}</p>
                                      </div>
                                    )}

                                    {/* Stacking */}
                                    {program.stacking_details && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Leaf className="h-3.5 w-3.5 text-emerald-600" />
                                          Stacking Programs
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.stacking_details}</p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Footer with Contact & Badges */}
                                  <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex flex-wrap items-center gap-3">
                                      {(program.pre_approval_required === true || program.pre_approval_required === 'true') && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                                          ⚠️ Pre-approval required
                                        </span>
                                      )}
                                      {(program.inspection_required === true || program.inspection_required === 'true') && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                          🔍 Inspection required
                                        </span>
                                      )}
                                      {program.coverage_area && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                                          📍 {program.coverage_area}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                      {program.contact_phone && (
                                        <a href={`tel:${program.contact_phone}`} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600">
                                          <Phone className="h-4 w-4" />
                                          {program.contact_phone}
                                        </a>
                                      )}
                                      {program.contact_email && (
                                        <a href={`mailto:${program.contact_email}`} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600">
                                          <ExternalLink className="h-4 w-4" />
                                          {program.contact_email}
                                        </a>
                                      )}
                                      {program.incentive_url && (
                                        <a
                                          href={program.incentive_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                        >
                                          Apply Now <ArrowRight className="h-4 w-4" />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </div>
          </div>
        )}

        {/* Agency Contact */}
        {agency?.name && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Regulatory Agency</h3>
                <p className="text-gray-600 mb-3">{agency.name}</p>
                <div className="flex flex-wrap gap-4">
                  {agency.phone && (
                    <a href={`tel:${agency.phone}`} className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
                      <Phone className="h-4 w-4" />
                      {agency.phone}
                    </a>
                  )}
                  {agency.website && (
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
                      <ExternalLink className="h-4 w-4" />
                      Official Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cities Browser (for state-level pages) */}
        {level === 'state' && cities.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Browse by City</h2>
                  <p className="text-sm text-gray-500 mt-1">Find regulations specific to your city</p>
                </div>
                <span className="text-sm text-gray-500">{cities.length} cities</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors text-sm"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {(showAllCities || searchTerm ? filteredCities : filteredCities.slice(0, INITIAL_CITIES)).map((city, idx) => (
                  <Link
                    key={`${city.city_name}-${idx}`}
                    href={`/${stateCode.toLowerCase()}/${city.city_name?.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-lg transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-emerald-700">{city.city_name}</p>
                      {city.county_name && (
                        <p className="text-xs text-gray-400">{city.county_name} County</p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-500" />
                  </Link>
                ))}
              </div>
              {!showAllCities && !searchTerm && filteredCities.length > INITIAL_CITIES && (
                <button
                  onClick={() => setShowAllCities(true)}
                  className="w-full mt-4 py-3 text-center text-emerald-600 hover:text-emerald-700 text-sm font-medium border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors"
                >
                  Show all {filteredCities.length} cities
                </button>
              )}
              {filteredCities.length === 0 && searchTerm && (
                <p className="text-center text-gray-400 py-8 text-sm">No cities found matching "{searchTerm}"</p>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Start Your Water Conservation Project?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our greywater systems can help you save thousands of gallons of water per year.
            {maxRebate > 0 && ` Plus, you may qualify for up to $${maxRebate.toLocaleString()} in rebates.`}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Browse Systems
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Get Expert Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
