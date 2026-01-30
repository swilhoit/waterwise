const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';
const tableId = 'city_county_mapping';

// Remaining US cities by state (Southeast, Northeast, Midwest)
// Organized by region for clarity

const REMAINING_US_CITIES = {
  // ========== SOUTHEAST ==========

  // FLORIDA - Major cities
  FL: {
    // Miami-Dade County
    'MIAMI': 'MIAMI_DADE',
    'MIAMI_BEACH': 'MIAMI_DADE',
    'HIALEAH': 'MIAMI_DADE',
    'CORAL_GABLES': 'MIAMI_DADE',
    'HOMESTEAD': 'MIAMI_DADE',
    'NORTH_MIAMI': 'MIAMI_DADE',
    'DORAL': 'MIAMI_DADE',
    'AVENTURA': 'MIAMI_DADE',
    'SUNNY_ISLES_BEACH': 'MIAMI_DADE',
    // Broward County
    'FORT_LAUDERDALE': 'BROWARD',
    'HOLLYWOOD': 'BROWARD',
    'PEMBROKE_PINES': 'BROWARD',
    'CORAL_SPRINGS': 'BROWARD',
    'MIRAMAR': 'BROWARD',
    'DAVIE': 'BROWARD',
    'PLANTATION': 'BROWARD',
    'SUNRISE': 'BROWARD',
    'POMPANO_BEACH': 'BROWARD',
    'DEERFIELD_BEACH': 'BROWARD',
    'WESTON': 'BROWARD',
    // Palm Beach County
    'WEST_PALM_BEACH': 'PALM_BEACH',
    'BOCA_RATON': 'PALM_BEACH',
    'BOYNTON_BEACH': 'PALM_BEACH',
    'DELRAY_BEACH': 'PALM_BEACH',
    'JUPITER': 'PALM_BEACH',
    'PALM_BEACH_GARDENS': 'PALM_BEACH',
    'WELLINGTON': 'PALM_BEACH',
    // Hillsborough County (Tampa)
    'TAMPA': 'HILLSBOROUGH',
    'BRANDON': 'HILLSBOROUGH',
    'TEMPLE_TERRACE': 'HILLSBOROUGH',
    // Pinellas County
    'ST_PETERSBURG': 'PINELLAS',
    'CLEARWATER': 'PINELLAS',
    'LARGO': 'PINELLAS',
    'DUNEDIN': 'PINELLAS',
    'TARPON_SPRINGS': 'PINELLAS',
    // Orange County (Orlando)
    'ORLANDO': 'ORANGE',
    'WINTER_PARK': 'ORANGE',
    'APOPKA': 'ORANGE',
    'OCOEE': 'ORANGE',
    // Duval County (Jacksonville)
    'JACKSONVILLE': 'DUVAL',
    'JACKSONVILLE_BEACH': 'DUVAL',
    // Other Florida
    'TALLAHASSEE': 'LEON',
    'GAINESVILLE': 'ALACHUA',
    'PENSACOLA': 'ESCAMBIA',
    'SARASOTA': 'SARASOTA',
    'BRADENTON': 'MANATEE',
    'FORT_MYERS': 'LEE',
    'CAPE_CORAL': 'LEE',
    'NAPLES': 'COLLIER',
    'OCALA': 'MARION',
    'DAYTONA_BEACH': 'VOLUSIA',
    'PORT_ST_LUCIE': 'ST_LUCIE',
    'MELBOURNE': 'BREVARD',
    'KISSIMMEE': 'OSCEOLA',
    'LAKELAND': 'POLK',
  },

  // GEORGIA - Major cities
  GA: {
    // Fulton County (Atlanta)
    'ATLANTA': 'FULTON',
    'SANDY_SPRINGS': 'FULTON',
    'ROSWELL': 'FULTON',
    'ALPHARETTA': 'FULTON',
    'JOHNS_CREEK': 'FULTON',
    'MILTON': 'FULTON',
    // DeKalb County
    'DECATUR': 'DEKALB',
    'BROOKHAVEN': 'DEKALB',
    'DUNWOODY': 'DEKALB',
    'STONE_MOUNTAIN': 'DEKALB',
    // Cobb County
    'MARIETTA': 'COBB',
    'SMYRNA': 'COBB',
    'KENNESAW': 'COBB',
    'ACWORTH': 'COBB',
    // Gwinnett County
    'LAWRENCEVILLE': 'GWINNETT',
    'DULUTH': 'GWINNETT',
    'SUWANEE': 'GWINNETT',
    'SNELLVILLE': 'GWINNETT',
    'BUFORD': 'GWINNETT',
    'PEACHTREE_CORNERS': 'GWINNETT',
    // Other Georgia
    'SAVANNAH': 'CHATHAM',
    'AUGUSTA': 'RICHMOND',
    'COLUMBUS': 'MUSCOGEE',
    'MACON': 'BIBB',
    'ATHENS': 'CLARKE',
    'ALBANY': 'DOUGHERTY',
    'WARNER_ROBINS': 'HOUSTON',
    'VALDOSTA': 'LOWNDES',
    'ROME': 'FLOYD',
  },

  // NORTH CAROLINA - Major cities
  NC: {
    // Mecklenburg County (Charlotte)
    'CHARLOTTE': 'MECKLENBURG',
    'HUNTERSVILLE': 'MECKLENBURG',
    'CORNELIUS': 'MECKLENBURG',
    'MATTHEWS': 'MECKLENBURG',
    'MINT_HILL': 'MECKLENBURG',
    'PINEVILLE': 'MECKLENBURG',
    // Wake County (Raleigh)
    'RALEIGH': 'WAKE',
    'CARY': 'WAKE',
    'APEX': 'WAKE',
    'WAKE_FOREST': 'WAKE',
    'HOLLY_SPRINGS': 'WAKE',
    'FUQUAY_VARINA': 'WAKE',
    'MORRISVILLE': 'WAKE',
    // Guilford County
    'GREENSBORO': 'GUILFORD',
    'HIGH_POINT': 'GUILFORD',
    // Durham County
    'DURHAM': 'DURHAM',
    // Forsyth County
    'WINSTON_SALEM': 'FORSYTH',
    'KERNERSVILLE': 'FORSYTH',
    // Other North Carolina
    'FAYETTEVILLE': 'CUMBERLAND',
    'WILMINGTON': 'NEW_HANOVER',
    'ASHEVILLE': 'BUNCOMBE',
    'CONCORD': 'CABARRUS',
    'GASTONIA': 'GASTON',
    'JACKSONVILLE': 'ONSLOW',
    'CHAPEL_HILL': 'ORANGE',
    'ROCKY_MOUNT': 'NASH',
    'GREENVILLE': 'PITT',
    'BURLINGTON': 'ALAMANCE',
    'HICKORY': 'CATAWBA',
    'KANNAPOLIS': 'CABARRUS',
  },

  // SOUTH CAROLINA - Major cities
  SC: {
    // Charleston County
    'CHARLESTON': 'CHARLESTON',
    'NORTH_CHARLESTON': 'CHARLESTON',
    'MOUNT_PLEASANT': 'CHARLESTON',
    // Richland County (Columbia)
    'COLUMBIA': 'RICHLAND',
    'FOREST_ACRES': 'RICHLAND',
    // Greenville County
    'GREENVILLE': 'GREENVILLE',
    'GREER': 'GREENVILLE',
    'MAULDIN': 'GREENVILLE',
    'SIMPSONVILLE': 'GREENVILLE',
    // Spartanburg County
    'SPARTANBURG': 'SPARTANBURG',
    // Other South Carolina
    'MYRTLE_BEACH': 'HORRY',
    'ROCK_HILL': 'YORK',
    'SUMMERVILLE': 'DORCHESTER',
    'HILTON_HEAD': 'BEAUFORT',
    'FLORENCE': 'FLORENCE',
    'ANDERSON': 'ANDERSON',
    'AIKEN': 'AIKEN',
    'SUMTER': 'SUMTER',
  },

  // TENNESSEE - Major cities
  TN: {
    // Davidson County (Nashville)
    'NASHVILLE': 'DAVIDSON',
    // Shelby County (Memphis)
    'MEMPHIS': 'SHELBY',
    'GERMANTOWN': 'SHELBY',
    'COLLIERVILLE': 'SHELBY',
    'BARTLETT': 'SHELBY',
    // Knox County (Knoxville)
    'KNOXVILLE': 'KNOX',
    'FARRAGUT': 'KNOX',
    // Hamilton County (Chattanooga)
    'CHATTANOOGA': 'HAMILTON',
    'EAST_RIDGE': 'HAMILTON',
    // Williamson County
    'FRANKLIN': 'WILLIAMSON',
    'BRENTWOOD': 'WILLIAMSON',
    // Rutherford County
    'MURFREESBORO': 'RUTHERFORD',
    'SMYRNA': 'RUTHERFORD',
    'LA_VERGNE': 'RUTHERFORD',
    // Other Tennessee
    'CLARKSVILLE': 'MONTGOMERY',
    'JACKSON': 'MADISON',
    'JOHNSON_CITY': 'WASHINGTON',
    'KINGSPORT': 'SULLIVAN',
    'HENDERSONVILLE': 'SUMNER',
    'GALLATIN': 'SUMNER',
    'COOKEVILLE': 'PUTNAM',
    'OAK_RIDGE': 'ANDERSON',
    'CLEVELAND': 'BRADLEY',
  },

  // VIRGINIA - Major cities
  VA: {
    // Independent cities (Virginia has many)
    'VIRGINIA_BEACH': 'VIRGINIA_BEACH_CITY',
    'NORFOLK': 'NORFOLK_CITY',
    'CHESAPEAKE': 'CHESAPEAKE_CITY',
    'RICHMOND': 'RICHMOND_CITY',
    'NEWPORT_NEWS': 'NEWPORT_NEWS_CITY',
    'ALEXANDRIA': 'ALEXANDRIA_CITY',
    'HAMPTON': 'HAMPTON_CITY',
    'PORTSMOUTH': 'PORTSMOUTH_CITY',
    'SUFFOLK': 'SUFFOLK_CITY',
    'LYNCHBURG': 'LYNCHBURG_CITY',
    'ROANOKE': 'ROANOKE_CITY',
    'DANVILLE': 'DANVILLE_CITY',
    'CHARLOTTESVILLE': 'CHARLOTTESVILLE_CITY',
    'HARRISONBURG': 'HARRISONBURG_CITY',
    // Fairfax County (DC suburbs)
    'FAIRFAX': 'FAIRFAX',
    'FALLS_CHURCH': 'FALLS_CHURCH_CITY',
    'VIENNA': 'FAIRFAX',
    'HERNDON': 'FAIRFAX',
    'RESTON': 'FAIRFAX',
    'MCLEAN': 'FAIRFAX',
    // Arlington County
    'ARLINGTON': 'ARLINGTON',
    // Prince William County
    'MANASSAS': 'MANASSAS_CITY',
    'WOODBRIDGE': 'PRINCE_WILLIAM',
    // Loudoun County
    'LEESBURG': 'LOUDOUN',
    'ASHBURN': 'LOUDOUN',
    'STERLING': 'LOUDOUN',
  },

  // ALABAMA - Major cities
  AL: {
    // Jefferson County (Birmingham)
    'BIRMINGHAM': 'JEFFERSON',
    'HOOVER': 'JEFFERSON',
    'VESTAVIA_HILLS': 'JEFFERSON',
    'HOMEWOOD': 'JEFFERSON',
    'MOUNTAIN_BROOK': 'JEFFERSON',
    'BESSEMER': 'JEFFERSON',
    // Madison County (Huntsville)
    'HUNTSVILLE': 'MADISON',
    'MADISON': 'MADISON',
    // Mobile County
    'MOBILE': 'MOBILE',
    'PRICHARD': 'MOBILE',
    // Montgomery County
    'MONTGOMERY': 'MONTGOMERY',
    // Other Alabama
    'TUSCALOOSA': 'TUSCALOOSA',
    'AUBURN': 'LEE',
    'OPELIKA': 'LEE',
    'DOTHAN': 'HOUSTON',
    'DECATUR': 'MORGAN',
    'FLORENCE': 'LAUDERDALE',
    'GADSDEN': 'ETOWAH',
    'ANNISTON': 'CALHOUN',
  },

  // LOUISIANA - Major cities
  LA: {
    // Orleans Parish (New Orleans)
    'NEW_ORLEANS': 'ORLEANS',
    // Jefferson Parish
    'METAIRIE': 'JEFFERSON',
    'KENNER': 'JEFFERSON',
    'GRETNA': 'JEFFERSON',
    'MARRERO': 'JEFFERSON',
    // East Baton Rouge Parish
    'BATON_ROUGE': 'EAST_BATON_ROUGE',
    'ZACHARY': 'EAST_BATON_ROUGE',
    // Caddo Parish
    'SHREVEPORT': 'CADDO',
    // Calcasieu Parish
    'LAKE_CHARLES': 'CALCASIEU',
    // Other Louisiana
    'LAFAYETTE': 'LAFAYETTE',
    'BOSSIER_CITY': 'BOSSIER',
    'MONROE': 'OUACHITA',
    'ALEXANDRIA': 'RAPIDES',
    'HOUMA': 'TERREBONNE',
    'NEW_IBERIA': 'IBERIA',
    'SLIDELL': 'ST_TAMMANY',
    'MANDEVILLE': 'ST_TAMMANY',
    'COVINGTON': 'ST_TAMMANY',
  },

  // MISSISSIPPI - Major cities
  MS: {
    // Hinds County (Jackson)
    'JACKSON': 'HINDS',
    'CLINTON': 'HINDS',
    // Harrison County
    'GULFPORT': 'HARRISON',
    'BILOXI': 'HARRISON',
    // DeSoto County (Memphis suburb)
    'SOUTHAVEN': 'DESOTO',
    'OLIVE_BRANCH': 'DESOTO',
    'HORN_LAKE': 'DESOTO',
    // Other Mississippi
    'HATTIESBURG': 'FORREST',
    'MERIDIAN': 'LAUDERDALE',
    'TUPELO': 'LEE',
    'OXFORD': 'LAFAYETTE',
    'STARKVILLE': 'OKTIBBEHA',
    'COLUMBUS': 'LOWNDES',
    'VICKSBURG': 'WARREN',
    'PEARL': 'RANKIN',
    'BRANDON': 'RANKIN',
  },

  // ARKANSAS - Major cities
  AR: {
    // Pulaski County (Little Rock)
    'LITTLE_ROCK': 'PULASKI',
    'NORTH_LITTLE_ROCK': 'PULASKI',
    'MAUMELLE': 'PULASKI',
    'JACKSONVILLE': 'PULASKI',
    'SHERWOOD': 'PULASKI',
    // Washington County
    'FAYETTEVILLE': 'WASHINGTON',
    'SPRINGDALE': 'WASHINGTON',
    // Benton County
    'BENTONVILLE': 'BENTON',
    'ROGERS': 'BENTON',
    // Other Arkansas
    'FORT_SMITH': 'SEBASTIAN',
    'JONESBORO': 'CRAIGHEAD',
    'CONWAY': 'FAULKNER',
    'PINE_BLUFF': 'JEFFERSON',
    'HOT_SPRINGS': 'GARLAND',
    'TEXARKANA': 'MILLER',
    'CABOT': 'LONOKE',
  },

  // KENTUCKY - Major cities
  KY: {
    // Jefferson County (Louisville)
    'LOUISVILLE': 'JEFFERSON',
    'JEFFERSONTOWN': 'JEFFERSON',
    'ST_MATTHEWS': 'JEFFERSON',
    'SHIVELY': 'JEFFERSON',
    // Fayette County (Lexington)
    'LEXINGTON': 'FAYETTE',
    // Kenton County (Cincinnati suburb)
    'COVINGTON': 'KENTON',
    // Campbell County
    'NEWPORT': 'CAMPBELL',
    // Other Kentucky
    'BOWLING_GREEN': 'WARREN',
    'OWENSBORO': 'DAVIESS',
    'FRANKFORT': 'FRANKLIN',
    'RICHMOND': 'MADISON',
    'FLORENCE': 'BOONE',
    'GEORGETOWN': 'SCOTT',
    'ELIZABETHTOWN': 'HARDIN',
    'PADUCAH': 'MCCRACKEN',
    'ASHLAND': 'BOYD',
    'HOPKINSVILLE': 'CHRISTIAN',
  },

  // ========== NORTHEAST ==========

  // NEW YORK - Major cities
  NY: {
    // New York City (5 boroughs)
    'NEW_YORK': 'NEW_YORK',
    'BROOKLYN': 'KINGS',
    'QUEENS': 'QUEENS',
    'BRONX': 'BRONX',
    'STATEN_ISLAND': 'RICHMOND',
    // Nassau County (Long Island)
    'HEMPSTEAD': 'NASSAU',
    'LONG_BEACH': 'NASSAU',
    'FREEPORT': 'NASSAU',
    'VALLEY_STREAM': 'NASSAU',
    'GARDEN_CITY': 'NASSAU',
    // Suffolk County (Long Island)
    'HUNTINGTON': 'SUFFOLK',
    'SMITHTOWN': 'SUFFOLK',
    'BABYLON': 'SUFFOLK',
    'BROOKHAVEN': 'SUFFOLK',
    // Westchester County
    'YONKERS': 'WESTCHESTER',
    'NEW_ROCHELLE': 'WESTCHESTER',
    'MOUNT_VERNON': 'WESTCHESTER',
    'WHITE_PLAINS': 'WESTCHESTER',
    // Erie County (Buffalo)
    'BUFFALO': 'ERIE',
    'CHEEKTOWAGA': 'ERIE',
    'AMHERST': 'ERIE',
    'TONAWANDA': 'ERIE',
    // Monroe County (Rochester)
    'ROCHESTER': 'MONROE',
    'GREECE': 'MONROE',
    'IRONDEQUOIT': 'MONROE',
    // Onondaga County (Syracuse)
    'SYRACUSE': 'ONONDAGA',
    // Albany County
    'ALBANY': 'ALBANY',
    'COLONIE': 'ALBANY',
    // Other New York
    'SCHENECTADY': 'SCHENECTADY',
    'UTICA': 'ONEIDA',
    'BINGHAMTON': 'BROOME',
    'TROY': 'RENSSELAER',
    'NIAGARA_FALLS': 'NIAGARA',
    'POUGHKEEPSIE': 'DUTCHESS',
    'ITHACA': 'TOMPKINS',
    'SARATOGA_SPRINGS': 'SARATOGA',
  },

  // PENNSYLVANIA - Major cities
  PA: {
    // Philadelphia County
    'PHILADELPHIA': 'PHILADELPHIA',
    // Allegheny County (Pittsburgh)
    'PITTSBURGH': 'ALLEGHENY',
    'PENN_HILLS': 'ALLEGHENY',
    'MCKEESPORT': 'ALLEGHENY',
    'BETHEL_PARK': 'ALLEGHENY',
    'MOUNT_LEBANON': 'ALLEGHENY',
    // Delaware County
    'UPPER_DARBY': 'DELAWARE',
    'DREXEL_HILL': 'DELAWARE',
    'CHESTER': 'DELAWARE',
    // Montgomery County
    'NORRISTOWN': 'MONTGOMERY',
    'KING_OF_PRUSSIA': 'MONTGOMERY',
    'LANSDALE': 'MONTGOMERY',
    'ABINGTON': 'MONTGOMERY',
    // Bucks County
    'LEVITTOWN': 'BUCKS',
    'BRISTOL': 'BUCKS',
    'BENSALEM': 'BUCKS',
    // Other Pennsylvania
    'ALLENTOWN': 'LEHIGH',
    'ERIE': 'ERIE',
    'READING': 'BERKS',
    'SCRANTON': 'LACKAWANNA',
    'BETHLEHEM': 'NORTHAMPTON',
    'LANCASTER': 'LANCASTER',
    'HARRISBURG': 'DAUPHIN',
    'YORK': 'YORK',
    'WILKES_BARRE': 'LUZERNE',
    'STATE_COLLEGE': 'CENTRE',
    'EASTON': 'NORTHAMPTON',
  },

  // NEW JERSEY - Major cities
  NJ: {
    // Essex County (Newark)
    'NEWARK': 'ESSEX',
    'EAST_ORANGE': 'ESSEX',
    'ORANGE': 'ESSEX',
    'IRVINGTON': 'ESSEX',
    'BLOOMFIELD': 'ESSEX',
    'MONTCLAIR': 'ESSEX',
    // Hudson County (Jersey City)
    'JERSEY_CITY': 'HUDSON',
    'BAYONNE': 'HUDSON',
    'HOBOKEN': 'HUDSON',
    'UNION_CITY': 'HUDSON',
    'NORTH_BERGEN': 'HUDSON',
    'WEST_NEW_YORK': 'HUDSON',
    // Bergen County
    'HACKENSACK': 'BERGEN',
    'PARAMUS': 'BERGEN',
    'FORT_LEE': 'BERGEN',
    'TEANECK': 'BERGEN',
    // Passaic County
    'PATERSON': 'PASSAIC',
    'CLIFTON': 'PASSAIC',
    'PASSAIC': 'PASSAIC',
    // Middlesex County
    'EDISON': 'MIDDLESEX',
    'NEW_BRUNSWICK': 'MIDDLESEX',
    'PERTH_AMBOY': 'MIDDLESEX',
    'OLD_BRIDGE': 'MIDDLESEX',
    'WOODBRIDGE': 'MIDDLESEX',
    // Other New Jersey
    'TRENTON': 'MERCER',
    'PRINCETON': 'MERCER',
    'CAMDEN': 'CAMDEN',
    'CHERRY_HILL': 'CAMDEN',
    'ATLANTIC_CITY': 'ATLANTIC',
    'VINELAND': 'CUMBERLAND',
    'TOMS_RIVER': 'OCEAN',
    'LAKEWOOD': 'OCEAN',
  },

  // MASSACHUSETTS - Major cities
  MA: {
    // Suffolk County (Boston)
    'BOSTON': 'SUFFOLK',
    'REVERE': 'SUFFOLK',
    'CHELSEA': 'SUFFOLK',
    'WINTHROP': 'SUFFOLK',
    // Middlesex County
    'CAMBRIDGE': 'MIDDLESEX',
    'LOWELL': 'MIDDLESEX',
    'SOMERVILLE': 'MIDDLESEX',
    'NEWTON': 'MIDDLESEX',
    'MEDFORD': 'MIDDLESEX',
    'MALDEN': 'MIDDLESEX',
    'WALTHAM': 'MIDDLESEX',
    'FRAMINGHAM': 'MIDDLESEX',
    'ARLINGTON': 'MIDDLESEX',
    'WOBURN': 'MIDDLESEX',
    'BURLINGTON': 'MIDDLESEX',
    'LEXINGTON': 'MIDDLESEX',
    'BILLERICA': 'MIDDLESEX',
    // Essex County
    'LYNN': 'ESSEX',
    'LAWRENCE': 'ESSEX',
    'HAVERHILL': 'ESSEX',
    'PEABODY': 'ESSEX',
    'SALEM': 'ESSEX',
    'BEVERLY': 'ESSEX',
    'GLOUCESTER': 'ESSEX',
    // Norfolk County
    'QUINCY': 'NORFOLK',
    'BRAINTREE': 'NORFOLK',
    'WEYMOUTH': 'NORFOLK',
    'BROOKLINE': 'NORFOLK',
    // Other Massachusetts
    'WORCESTER': 'WORCESTER',
    'SPRINGFIELD': 'HAMPDEN',
    'NEW_BEDFORD': 'BRISTOL',
    'FALL_RIVER': 'BRISTOL',
    'BROCKTON': 'PLYMOUTH',
    'PLYMOUTH': 'PLYMOUTH',
    'CAPE_COD': 'BARNSTABLE',
    'PITTSFIELD': 'BERKSHIRE',
    'NORTHAMPTON': 'HAMPSHIRE',
  },

  // CONNECTICUT - Major cities
  CT: {
    // Fairfield County
    'BRIDGEPORT': 'FAIRFIELD',
    'STAMFORD': 'FAIRFIELD',
    'NORWALK': 'FAIRFIELD',
    'DANBURY': 'FAIRFIELD',
    'FAIRFIELD': 'FAIRFIELD',
    'WESTPORT': 'FAIRFIELD',
    'GREENWICH': 'FAIRFIELD',
    // New Haven County
    'NEW_HAVEN': 'NEW_HAVEN',
    'WATERBURY': 'NEW_HAVEN',
    'HAMDEN': 'NEW_HAVEN',
    'MERIDEN': 'NEW_HAVEN',
    'MILFORD': 'NEW_HAVEN',
    'WEST_HAVEN': 'NEW_HAVEN',
    'CHESHIRE': 'NEW_HAVEN',
    // Hartford County
    'HARTFORD': 'HARTFORD',
    'NEW_BRITAIN': 'HARTFORD',
    'WEST_HARTFORD': 'HARTFORD',
    'BRISTOL': 'HARTFORD',
    'MANCHESTER': 'HARTFORD',
    'EAST_HARTFORD': 'HARTFORD',
    // Other Connecticut
    'NEW_LONDON': 'NEW_LONDON',
    'GROTON': 'NEW_LONDON',
    'NORWICH': 'NEW_LONDON',
    'MIDDLETOWN': 'MIDDLESEX',
  },

  // RHODE ISLAND - Major cities
  RI: {
    // Providence County
    'PROVIDENCE': 'PROVIDENCE',
    'CRANSTON': 'PROVIDENCE',
    'PAWTUCKET': 'PROVIDENCE',
    'WARWICK': 'KENT',
    'EAST_PROVIDENCE': 'PROVIDENCE',
    'WOONSOCKET': 'PROVIDENCE',
    'CUMBERLAND': 'PROVIDENCE',
    'NORTH_PROVIDENCE': 'PROVIDENCE',
    // Other Rhode Island
    'NEWPORT': 'NEWPORT',
    'WESTERLY': 'WASHINGTON',
  },

  // NEW HAMPSHIRE - Major cities
  NH: {
    // Hillsborough County
    'MANCHESTER': 'HILLSBOROUGH',
    'NASHUA': 'HILLSBOROUGH',
    // Other New Hampshire
    'CONCORD': 'MERRIMACK',
    'DERRY': 'ROCKINGHAM',
    'PORTSMOUTH': 'ROCKINGHAM',
    'ROCHESTER': 'STRAFFORD',
    'DOVER': 'STRAFFORD',
    'KEENE': 'CHESHIRE',
    'LACONIA': 'BELKNAP',
    'LEBANON': 'GRAFTON',
    'HANOVER': 'GRAFTON',
  },

  // VERMONT - Major cities
  VT: {
    'BURLINGTON': 'CHITTENDEN',
    'SOUTH_BURLINGTON': 'CHITTENDEN',
    'ESSEX': 'CHITTENDEN',
    'COLCHESTER': 'CHITTENDEN',
    'RUTLAND': 'RUTLAND',
    'MONTPELIER': 'WASHINGTON',
    'BARRE': 'WASHINGTON',
    'BRATTLEBORO': 'WINDHAM',
    'ST_JOHNSBURY': 'CALEDONIA',
    'BENNINGTON': 'BENNINGTON',
  },

  // MAINE - Major cities
  ME: {
    // Cumberland County (Portland)
    'PORTLAND': 'CUMBERLAND',
    'SOUTH_PORTLAND': 'CUMBERLAND',
    'WESTBROOK': 'CUMBERLAND',
    'SCARBOROUGH': 'CUMBERLAND',
    // Other Maine
    'LEWISTON': 'ANDROSCOGGIN',
    'AUBURN': 'ANDROSCOGGIN',
    'BANGOR': 'PENOBSCOT',
    'AUGUSTA': 'KENNEBEC',
    'BIDDEFORD': 'YORK',
    'SANFORD': 'YORK',
    'WATERVILLE': 'KENNEBEC',
  },

  // ========== MIDWEST ==========

  // OHIO - Major cities
  OH: {
    // Franklin County (Columbus)
    'COLUMBUS': 'FRANKLIN',
    'DUBLIN': 'FRANKLIN',
    'WESTERVILLE': 'FRANKLIN',
    'GROVE_CITY': 'FRANKLIN',
    'REYNOLDSBURG': 'FRANKLIN',
    'GAHANNA': 'FRANKLIN',
    'UPPER_ARLINGTON': 'FRANKLIN',
    'HILLIARD': 'FRANKLIN',
    // Cuyahoga County (Cleveland)
    'CLEVELAND': 'CUYAHOGA',
    'PARMA': 'CUYAHOGA',
    'LAKEWOOD': 'CUYAHOGA',
    'EUCLID': 'CUYAHOGA',
    'CLEVELAND_HEIGHTS': 'CUYAHOGA',
    'STRONGSVILLE': 'CUYAHOGA',
    'WESTLAKE': 'CUYAHOGA',
    // Hamilton County (Cincinnati)
    'CINCINNATI': 'HAMILTON',
    'NORWOOD': 'HAMILTON',
    'FOREST_PARK': 'HAMILTON',
    // Summit County (Akron)
    'AKRON': 'SUMMIT',
    'CUYAHOGA_FALLS': 'SUMMIT',
    'STOW': 'SUMMIT',
    // Other Ohio
    'TOLEDO': 'LUCAS',
    'DAYTON': 'MONTGOMERY',
    'YOUNGSTOWN': 'MAHONING',
    'CANTON': 'STARK',
    'LORAIN': 'LORAIN',
    'HAMILTON': 'BUTLER',
    'SPRINGFIELD': 'CLARK',
    'MANSFIELD': 'RICHLAND',
    'NEWARK': 'LICKING',
    'KETTERING': 'MONTGOMERY',
    'ELYRIA': 'LORAIN',
    'MENTOR': 'LAKE',
  },

  // MICHIGAN - Major cities
  MI: {
    // Wayne County (Detroit)
    'DETROIT': 'WAYNE',
    'DEARBORN': 'WAYNE',
    'LIVONIA': 'WAYNE',
    'WESTLAND': 'WAYNE',
    'TAYLOR': 'WAYNE',
    'DEARBORN_HEIGHTS': 'WAYNE',
    'REDFORD': 'WAYNE',
    'INKSTER': 'WAYNE',
    // Oakland County
    'TROY': 'OAKLAND',
    'FARMINGTON_HILLS': 'OAKLAND',
    'SOUTHFIELD': 'OAKLAND',
    'ROYAL_OAK': 'OAKLAND',
    'NOVI': 'OAKLAND',
    'PONTIAC': 'OAKLAND',
    'ROCHESTER_HILLS': 'OAKLAND',
    'OAK_PARK': 'OAKLAND',
    'BIRMINGHAM': 'OAKLAND',
    // Macomb County
    'WARREN': 'MACOMB',
    'STERLING_HEIGHTS': 'MACOMB',
    'ST_CLAIR_SHORES': 'MACOMB',
    'CLINTON_TOWNSHIP': 'MACOMB',
    'ROSEVILLE': 'MACOMB',
    // Kent County (Grand Rapids)
    'GRAND_RAPIDS': 'KENT',
    'WYOMING': 'KENT',
    'KENTWOOD': 'KENT',
    // Other Michigan
    'ANN_ARBOR': 'WASHTENAW',
    'YPSILANTI': 'WASHTENAW',
    'FLINT': 'GENESEE',
    'LANSING': 'INGHAM',
    'EAST_LANSING': 'INGHAM',
    'KALAMAZOO': 'KALAMAZOO',
    'MUSKEGON': 'MUSKEGON',
    'SAGINAW': 'SAGINAW',
    'BATTLE_CREEK': 'CALHOUN',
    'PORT_HURON': 'ST_CLAIR',
    'TRAVERSE_CITY': 'GRAND_TRAVERSE',
    'HOLLAND': 'OTTAWA',
    'JACKSON': 'JACKSON',
    'BAY_CITY': 'BAY',
    'MIDLAND': 'MIDLAND',
  },

  // ILLINOIS - Major cities
  IL: {
    // Cook County (Chicago)
    'CHICAGO': 'COOK',
    'EVANSTON': 'COOK',
    'SKOKIE': 'COOK',
    'CICERO': 'COOK',
    'OAK_LAWN': 'COOK',
    'SCHAUMBURG': 'COOK',
    'ARLINGTON_HEIGHTS': 'COOK',
    'PALATINE': 'COOK',
    'DES_PLAINES': 'COOK',
    'ORLAND_PARK': 'COOK',
    'TINLEY_PARK': 'COOK',
    'OAK_PARK': 'COOK',
    'BERWYN': 'COOK',
    // DuPage County
    'NAPERVILLE': 'DUPAGE',
    'AURORA': 'DUPAGE',
    'BOLINGBROOK': 'DUPAGE',
    'WHEATON': 'DUPAGE',
    'DOWNERS_GROVE': 'DUPAGE',
    'ELMHURST': 'DUPAGE',
    'LOMBARD': 'DUPAGE',
    // Lake County
    'WAUKEGAN': 'LAKE',
    'NORTH_CHICAGO': 'LAKE',
    'HIGHLAND_PARK': 'LAKE',
    'GURNEE': 'LAKE',
    // Will County
    'JOLIET': 'WILL',
    'PLAINFIELD': 'WILL',
    'ROMEOVILLE': 'WILL',
    // Other Illinois
    'ROCKFORD': 'WINNEBAGO',
    'SPRINGFIELD': 'SANGAMON',
    'PEORIA': 'PEORIA',
    'CHAMPAIGN': 'CHAMPAIGN',
    'URBANA': 'CHAMPAIGN',
    'BLOOMINGTON': 'MCLEAN',
    'NORMAL': 'MCLEAN',
    'DECATUR': 'MACON',
    'ELGIN': 'KANE',
    'BELLEVILLE': 'ST_CLAIR',
    'QUINCY': 'ADAMS',
    'MOLINE': 'ROCK_ISLAND',
    'ROCK_ISLAND': 'ROCK_ISLAND',
  },

  // INDIANA - Major cities
  IN: {
    // Marion County (Indianapolis)
    'INDIANAPOLIS': 'MARION',
    'LAWRENCE': 'MARION',
    'BEECH_GROVE': 'MARION',
    'SPEEDWAY': 'MARION',
    // Lake County (Gary)
    'GARY': 'LAKE',
    'HAMMOND': 'LAKE',
    'EAST_CHICAGO': 'LAKE',
    'MERRILLVILLE': 'LAKE',
    'SCHERERVILLE': 'LAKE',
    'CROWN_POINT': 'LAKE',
    // Allen County (Fort Wayne)
    'FORT_WAYNE': 'ALLEN',
    // St. Joseph County (South Bend)
    'SOUTH_BEND': 'ST_JOSEPH',
    'MISHAWAKA': 'ST_JOSEPH',
    // Hamilton County
    'CARMEL': 'HAMILTON',
    'FISHERS': 'HAMILTON',
    'NOBLESVILLE': 'HAMILTON',
    'WESTFIELD': 'HAMILTON',
    // Other Indiana
    'EVANSVILLE': 'VANDERBURGH',
    'BLOOMINGTON': 'MONROE',
    'LAFAYETTE': 'TIPPECANOE',
    'WEST_LAFAYETTE': 'TIPPECANOE',
    'MUNCIE': 'DELAWARE',
    'KOKOMO': 'HOWARD',
    'TERRE_HAUTE': 'VIGO',
    'ANDERSON': 'MADISON',
    'ELKHART': 'ELKHART',
    'COLUMBUS': 'BARTHOLOMEW',
    'JEFFERSONVILLE': 'CLARK',
    'NEW_ALBANY': 'FLOYD',
    'RICHMOND': 'WAYNE',
    'GREENWOOD': 'JOHNSON',
  },

  // WISCONSIN - Major cities
  WI: {
    // Milwaukee County
    'MILWAUKEE': 'MILWAUKEE',
    'WEST_ALLIS': 'MILWAUKEE',
    'WAUWATOSA': 'MILWAUKEE',
    'GREENFIELD': 'MILWAUKEE',
    'SOUTH_MILWAUKEE': 'MILWAUKEE',
    'CUDAHY': 'MILWAUKEE',
    // Dane County (Madison)
    'MADISON': 'DANE',
    'SUN_PRAIRIE': 'DANE',
    'FITCHBURG': 'DANE',
    'MIDDLETON': 'DANE',
    // Waukesha County
    'WAUKESHA': 'WAUKESHA',
    'BROOKFIELD': 'WAUKESHA',
    'NEW_BERLIN': 'WAUKESHA',
    'MENOMONEE_FALLS': 'WAUKESHA',
    // Other Wisconsin
    'GREEN_BAY': 'BROWN',
    'KENOSHA': 'KENOSHA',
    'RACINE': 'RACINE',
    'APPLETON': 'OUTAGAMIE',
    'OSHKOSH': 'WINNEBAGO',
    'EAU_CLAIRE': 'EAU_CLAIRE',
    'JANESVILLE': 'ROCK',
    'LA_CROSSE': 'LA_CROSSE',
    'SHEBOYGAN': 'SHEBOYGAN',
    'FOND_DU_LAC': 'FOND_DU_LAC',
    'WAUSAU': 'MARATHON',
    'MANITOWOC': 'MANITOWOC',
    'WEST_BEND': 'WASHINGTON',
    'SUPERIOR': 'DOUGLAS',
    'STEVENS_POINT': 'PORTAGE',
  },

  // MINNESOTA - Major cities
  MN: {
    // Hennepin County (Minneapolis)
    'MINNEAPOLIS': 'HENNEPIN',
    'BLOOMINGTON': 'HENNEPIN',
    'BROOKLYN_PARK': 'HENNEPIN',
    'PLYMOUTH': 'HENNEPIN',
    'MAPLE_GROVE': 'HENNEPIN',
    'EDEN_PRAIRIE': 'HENNEPIN',
    'MINNETONKA': 'HENNEPIN',
    'EDINA': 'HENNEPIN',
    'ST_LOUIS_PARK': 'HENNEPIN',
    'RICHFIELD': 'HENNEPIN',
    'HOPKINS': 'HENNEPIN',
    // Ramsey County (St. Paul)
    'ST_PAUL': 'RAMSEY',
    'ROSEVILLE': 'RAMSEY',
    'MAPLEWOOD': 'RAMSEY',
    'SHOREVIEW': 'RAMSEY',
    // Dakota County
    'EAGAN': 'DAKOTA',
    'BURNSVILLE': 'DAKOTA',
    'APPLE_VALLEY': 'DAKOTA',
    'LAKEVILLE': 'DAKOTA',
    'INVER_GROVE_HEIGHTS': 'DAKOTA',
    // Other Minnesota
    'ROCHESTER': 'OLMSTED',
    'DULUTH': 'ST_LOUIS',
    'ST_CLOUD': 'STEARNS',
    'WOODBURY': 'WASHINGTON',
    'BLAINE': 'ANOKA',
    'COON_RAPIDS': 'ANOKA',
    'ANDOVER': 'ANOKA',
    'FRIDLEY': 'ANOKA',
    'MANKATO': 'BLUE_EARTH',
    'MOORHEAD': 'CLAY',
    'WINONA': 'WINONA',
    'OWATONNA': 'STEELE',
  },

  // IOWA - Major cities
  IA: {
    // Polk County (Des Moines)
    'DES_MOINES': 'POLK',
    'WEST_DES_MOINES': 'POLK',
    'ANKENY': 'POLK',
    'URBANDALE': 'POLK',
    'CLIVE': 'POLK',
    'JOHNSTON': 'POLK',
    // Other Iowa
    'CEDAR_RAPIDS': 'LINN',
    'DAVENPORT': 'SCOTT',
    'SIOUX_CITY': 'WOODBURY',
    'IOWA_CITY': 'JOHNSON',
    'WATERLOO': 'BLACK_HAWK',
    'CEDAR_FALLS': 'BLACK_HAWK',
    'AMES': 'STORY',
    'COUNCIL_BLUFFS': 'POTTAWATTAMIE',
    'DUBUQUE': 'DUBUQUE',
    'BETTENDORF': 'SCOTT',
    'MASON_CITY': 'CERRO_GORDO',
    'BURLINGTON': 'DES_MOINES',
    'MARSHALLTOWN': 'MARSHALL',
    'CLINTON': 'CLINTON',
    'OTTUMWA': 'WAPELLO',
    'FORT_DODGE': 'WEBSTER',
  },

  // MISSOURI - Major cities (additional to existing)
  MO: {
    // St. Louis area
    'ST_LOUIS': 'ST_LOUIS_CITY',
    'FLORISSANT': 'ST_LOUIS',
    'CHESTERFIELD': 'ST_LOUIS',
    'UNIVERSITY_CITY': 'ST_LOUIS',
    'KIRKWOOD': 'ST_LOUIS',
    'WEBSTER_GROVES': 'ST_LOUIS',
    'CLAYTON': 'ST_LOUIS',
    'CREVE_COEUR': 'ST_LOUIS',
    'BALLWIN': 'ST_LOUIS',
    'MARYLAND_HEIGHTS': 'ST_LOUIS',
    // Jackson County (Kansas City)
    'KANSAS_CITY': 'JACKSON',
    'INDEPENDENCE': 'JACKSON',
    'LEES_SUMMIT': 'JACKSON',
    'BLUE_SPRINGS': 'JACKSON',
    // Other Missouri
    'SPRINGFIELD': 'GREENE',
    'COLUMBIA': 'BOONE',
    'JEFFERSON_CITY': 'COLE',
    'ST_JOSEPH': 'BUCHANAN',
    'ST_CHARLES': 'ST_CHARLES',
    'OFALLON': 'ST_CHARLES',
    'JOPLIN': 'JASPER',
    'CAPE_GIRARDEAU': 'CAPE_GIRARDEAU',
  },

  // KANSAS - Major cities (additional to existing)
  KS: {
    // Johnson County (Kansas City suburbs)
    'OVERLAND_PARK': 'JOHNSON',
    'OLATHE': 'JOHNSON',
    'SHAWNEE': 'JOHNSON',
    'LENEXA': 'JOHNSON',
    'LEAWOOD': 'JOHNSON',
    'PRAIRIE_VILLAGE': 'JOHNSON',
    // Wyandotte County
    'KANSAS_CITY': 'WYANDOTTE',
    // Sedgwick County (Wichita)
    'WICHITA': 'SEDGWICK',
    'DERBY': 'SEDGWICK',
    // Other Kansas
    'TOPEKA': 'SHAWNEE',
    'LAWRENCE': 'DOUGLAS',
    'MANHATTAN': 'RILEY',
    'SALINA': 'SALINE',
    'HUTCHINSON': 'RENO',
    'LEAVENWORTH': 'LEAVENWORTH',
    'GARDEN_CITY': 'FINNEY',
    'DODGE_CITY': 'FORD',
    'EMPORIA': 'LYON',
    'LIBERAL': 'SEWARD',
  },

  // NEBRASKA - Major cities
  NE: {
    // Douglas County (Omaha)
    'OMAHA': 'DOUGLAS',
    // Lancaster County (Lincoln)
    'LINCOLN': 'LANCASTER',
    // Sarpy County
    'BELLEVUE': 'SARPY',
    'PAPILLION': 'SARPY',
    'LA_VISTA': 'SARPY',
    // Other Nebraska
    'GRAND_ISLAND': 'HALL',
    'KEARNEY': 'BUFFALO',
    'FREMONT': 'DODGE',
    'HASTINGS': 'ADAMS',
    'NORFOLK': 'MADISON',
    'NORTH_PLATTE': 'LINCOLN',
    'COLUMBUS': 'PLATTE',
    'SCOTTSBLUFF': 'SCOTTS_BLUFF',
  },

  // SOUTH DAKOTA - Major cities
  SD: {
    'SIOUX_FALLS': 'MINNEHAHA',
    'RAPID_CITY': 'PENNINGTON',
    'ABERDEEN': 'BROWN',
    'BROOKINGS': 'BROOKINGS',
    'WATERTOWN': 'CODINGTON',
    'MITCHELL': 'DAVISON',
    'PIERRE': 'HUGHES',
    'YANKTON': 'YANKTON',
    'HURON': 'BEADLE',
    'VERMILLION': 'CLAY',
    'SPEARFISH': 'LAWRENCE',
  },

  // NORTH DAKOTA - Major cities
  ND: {
    'FARGO': 'CASS',
    'BISMARCK': 'BURLEIGH',
    'GRAND_FORKS': 'GRAND_FORKS',
    'MINOT': 'WARD',
    'WEST_FARGO': 'CASS',
    'MANDAN': 'MORTON',
    'DICKINSON': 'STARK',
    'WILLISTON': 'WILLIAMS',
    'JAMESTOWN': 'STUTSMAN',
    'WAHPETON': 'RICHLAND',
    'DEVILS_LAKE': 'RAMSEY',
  },
};

function formatCityName(name) {
  return name.replace(/_/g, ' ').toLowerCase().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatCountyName(name) {
  return name.replace(/_/g, ' ').toLowerCase().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function addRemainingUSCities() {
  console.log('🏙️  Adding remaining US cities (Southeast, Northeast, Midwest)...\n');

  try {
    // First, check current state counts
    console.log('📊 Fetching current city counts...');
    const [currentCounts] = await bigquery.query({
      query: `
        SELECT state_code, COUNT(*) as city_count
        FROM \`greywater-prospects-2025.${datasetId}.${tableId}\`
        GROUP BY state_code
        ORDER BY state_code
      `,
      location: 'US'
    });

    const existingCounts = {};
    currentCounts.forEach(row => {
      existingCounts[row.state_code] = parseInt(row.city_count);
    });

    // Build rows to insert
    const rows = [];
    const statesAdded = {};

    for (const [stateCode, cities] of Object.entries(REMAINING_US_CITIES)) {
      // Skip states that already have significant coverage
      const existingCount = existingCounts[stateCode] || 0;

      statesAdded[stateCode] = { before: existingCount, added: 0 };

      for (const [cityName, countyName] of Object.entries(cities)) {
        const cityJurisdictionId = `${stateCode}_CITY_${cityName}`;
        const countyJurisdictionId = `${stateCode}_COUNTY_${countyName}`;

        rows.push({
          state_code: stateCode,
          city_jurisdiction_id: cityJurisdictionId,
          city_name: formatCityName(cityName),
          county_jurisdiction_id: countyJurisdictionId,
          county_name: formatCountyName(countyName)
        });
        statesAdded[stateCode].added++;
      }
    }

    console.log(`\n📤 Inserting ${rows.length} total rows across ${Object.keys(REMAINING_US_CITIES).length} states...`);

    if (rows.length === 0) {
      console.log('No new rows to insert');
      return;
    }

    // Insert rows in batches
    const batchSize = 500;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      await bigquery
        .dataset(datasetId)
        .table(tableId)
        .insert(batch, {
          skipInvalidRows: false,
          ignoreUnknownValues: true
        });
      console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(rows.length / batchSize)}`);
    }

    console.log(`✅ Successfully inserted ${rows.length} cities`);

    // Summary by region
    const southeast = ['FL', 'GA', 'NC', 'SC', 'TN', 'VA', 'AL', 'LA', 'MS', 'AR', 'KY'];
    const northeast = ['NY', 'PA', 'NJ', 'MA', 'CT', 'RI', 'NH', 'VT', 'ME'];
    const midwest = ['OH', 'MI', 'IL', 'IN', 'WI', 'MN', 'IA', 'MO', 'KS', 'NE', 'SD', 'ND'];

    console.log('\n📋 Cities added by region:');

    console.log('\n  SOUTHEAST:');
    southeast.forEach(s => {
      if (statesAdded[s]) {
        console.log(`    ${s}: ${statesAdded[s].before} → ${statesAdded[s].before + statesAdded[s].added} (+${statesAdded[s].added})`);
      }
    });

    console.log('\n  NORTHEAST:');
    northeast.forEach(s => {
      if (statesAdded[s]) {
        console.log(`    ${s}: ${statesAdded[s].before} → ${statesAdded[s].before + statesAdded[s].added} (+${statesAdded[s].added})`);
      }
    });

    console.log('\n  MIDWEST:');
    midwest.forEach(s => {
      if (statesAdded[s]) {
        console.log(`    ${s}: ${statesAdded[s].before} → ${statesAdded[s].before + statesAdded[s].added} (+${statesAdded[s].added})`);
      }
    });

    console.log('\n✅ All remaining US cities added successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    if (error.errors) {
      console.error('Insert errors:', JSON.stringify(error.errors, null, 2));
    }
    throw error;
  }
}

addRemainingUSCities();
