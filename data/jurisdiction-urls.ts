/**
 * Centralized URL mappings for jurisdiction websites (states, counties, cities, utilities)
 * Used by LocationHubView.tsx and LocationContextCard.tsx
 */

// State water regulation URLs
export const stateUrls: Record<string, string> = {
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
export const countyUrls: Record<string, string> = {
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
export const cityUrls: Record<string, string> = {
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
export const utilityUrls: Record<string, string> = {
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
export const normalizeJurisdictionName = (name: string): string =>
  name?.toUpperCase().replace(/[^A-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || ''

/**
 * Get official regulation website URLs for jurisdictions
 */
export function getJurisdictionUrls(stateCode: string, countyName?: string, cityName?: string) {
  const stateUrl = stateUrls[stateCode] || undefined
  const countyKey = countyName ? `${stateCode}_${normalizeJurisdictionName(countyName)}` : ''
  const countyUrl = countyUrls[countyKey] || undefined
  const cityKey = cityName ? `${stateCode}_${normalizeJurisdictionName(cityName)}` : ''
  const cityUrl = cityUrls[cityKey] || undefined

  return { stateUrl, countyUrl, cityUrl }
}

/**
 * Get URL for a water utility by name
 */
export function getUtilityUrl(utilityName: string): string | undefined {
  return utilityUrls[utilityName] || utilityUrls[normalizeJurisdictionName(utilityName)] || undefined
}
