const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';
const tableId = 'city_county_mapping';

// Western US cities by state with their counties
// Priority: Arizona, Texas, Nevada, Colorado, New Mexico, Utah, Oregon, Washington, Idaho, Montana, Wyoming

const WESTERN_US_CITIES = {
  // ARIZONA - Major cities
  AZ: {
    // Maricopa County (Phoenix metro)
    'PHOENIX': 'MARICOPA',
    'MESA': 'MARICOPA',
    'SCOTTSDALE': 'MARICOPA',
    'TEMPE': 'MARICOPA',
    'CHANDLER': 'MARICOPA',
    'GLENDALE': 'MARICOPA',
    'GILBERT': 'MARICOPA',
    'PEORIA': 'MARICOPA',
    'SURPRISE': 'MARICOPA',
    'AVONDALE': 'MARICOPA',
    'GOODYEAR': 'MARICOPA',
    'BUCKEYE': 'MARICOPA',
    'CASA_GRANDE': 'MARICOPA',
    'QUEEN_CREEK': 'MARICOPA',
    'PARADISE_VALLEY': 'MARICOPA',
    'FOUNTAIN_HILLS': 'MARICOPA',
    'CAVE_CREEK': 'MARICOPA',
    'CAREFREE': 'MARICOPA',
    'LITCHFIELD_PARK': 'MARICOPA',
    'EL_MIRAGE': 'MARICOPA',
    // Pima County (Tucson metro)
    'TUCSON': 'PIMA',
    'ORO_VALLEY': 'PIMA',
    'MARANA': 'PIMA',
    'SOUTH_TUCSON': 'PIMA',
    'SAHUARITA': 'PIMA',
    // Other Arizona counties
    'FLAGSTAFF': 'COCONINO',
    'SEDONA': 'YAVAPAI',
    'PRESCOTT': 'YAVAPAI',
    'PRESCOTT_VALLEY': 'YAVAPAI',
    'COTTONWOOD': 'YAVAPAI',
    'YUMA': 'YUMA',
    'LAKE_HAVASU_CITY': 'MOHAVE',
    'KINGMAN': 'MOHAVE',
    'BULLHEAD_CITY': 'MOHAVE',
    'SIERRA_VISTA': 'COCHISE',
    'NOGALES': 'SANTA_CRUZ',
    'PAYSON': 'GILA',
    'SHOW_LOW': 'NAVAJO',
  },

  // TEXAS - Major cities
  TX: {
    // Harris County (Houston metro)
    'HOUSTON': 'HARRIS',
    'PASADENA': 'HARRIS',
    'PEARLAND': 'HARRIS',
    'SUGAR_LAND': 'FORT_BEND',
    'MISSOURI_CITY': 'FORT_BEND',
    'KATY': 'HARRIS',
    'THE_WOODLANDS': 'MONTGOMERY',
    'CONROE': 'MONTGOMERY',
    'BAYTOWN': 'HARRIS',
    'LEAGUE_CITY': 'GALVESTON',
    'GALVESTON': 'GALVESTON',
    // Dallas County (Dallas metro)
    'DALLAS': 'DALLAS',
    'IRVING': 'DALLAS',
    'GARLAND': 'DALLAS',
    'GRAND_PRAIRIE': 'DALLAS',
    'MESQUITE': 'DALLAS',
    'CARROLLTON': 'DALLAS',
    'RICHARDSON': 'DALLAS',
    'PLANO': 'COLLIN',
    'FRISCO': 'COLLIN',
    'MCKINNEY': 'COLLIN',
    'ALLEN': 'COLLIN',
    // Tarrant County (Fort Worth metro)
    'FORT_WORTH': 'TARRANT',
    'ARLINGTON': 'TARRANT',
    'MANSFIELD': 'TARRANT',
    'EULESS': 'TARRANT',
    'BEDFORD': 'TARRANT',
    'HURST': 'TARRANT',
    'NORTH_RICHLAND_HILLS': 'TARRANT',
    'GRAPEVINE': 'TARRANT',
    'SOUTHLAKE': 'TARRANT',
    'COLLEYVILLE': 'TARRANT',
    // Bexar County (San Antonio metro)
    'SAN_ANTONIO': 'BEXAR',
    'NEW_BRAUNFELS': 'COMAL',
    'SAN_MARCOS': 'HAYS',
    // Travis County (Austin metro)
    'AUSTIN': 'TRAVIS',
    'ROUND_ROCK': 'WILLIAMSON',
    'CEDAR_PARK': 'WILLIAMSON',
    'PFLUGERVILLE': 'TRAVIS',
    'GEORGETOWN': 'WILLIAMSON',
    'LEANDER': 'WILLIAMSON',
    // El Paso County
    'EL_PASO': 'EL_PASO',
    'LAS_CRUCES': 'EL_PASO', // Actually NM but metro area
    // Other Texas cities
    'CORPUS_CHRISTI': 'NUECES',
    'LUBBOCK': 'LUBBOCK',
    'AMARILLO': 'POTTER',
    'MIDLAND': 'MIDLAND',
    'ODESSA': 'ECTOR',
    'LAREDO': 'WEBB',
    'MCALLEN': 'HIDALGO',
    'BROWNSVILLE': 'CAMERON',
    'WACO': 'MCLENNAN',
    'ABILENE': 'TAYLOR',
    'BEAUMONT': 'JEFFERSON',
    'TYLER': 'SMITH',
    'DENTON': 'DENTON',
    'COLLEGE_STATION': 'BRAZOS',
    'KILLEEN': 'BELL',
    'WICHITA_FALLS': 'WICHITA',
  },

  // NEVADA - Major cities
  NV: {
    // Clark County (Las Vegas metro)
    'LAS_VEGAS': 'CLARK',
    'HENDERSON': 'CLARK',
    'NORTH_LAS_VEGAS': 'CLARK',
    'PARADISE': 'CLARK',
    'SPRING_VALLEY': 'CLARK',
    'SUNRISE_MANOR': 'CLARK',
    'ENTERPRISE': 'CLARK',
    'SUMMERLIN_SOUTH': 'CLARK',
    'BOULDER_CITY': 'CLARK',
    'MESQUITE': 'CLARK',
    // Washoe County (Reno metro)
    'RENO': 'WASHOE',
    'SPARKS': 'WASHOE',
    'SUN_VALLEY': 'WASHOE',
    // Other Nevada
    'CARSON_CITY': 'CARSON_CITY',
    'ELKO': 'ELKO',
    'FERNLEY': 'LYON',
    'PAHRUMP': 'NYE',
  },

  // COLORADO - Major cities
  CO: {
    // Denver metro
    'DENVER': 'DENVER',
    'AURORA': 'ARAPAHOE',
    'LAKEWOOD': 'JEFFERSON',
    'THORNTON': 'ADAMS',
    'ARVADA': 'JEFFERSON',
    'WESTMINSTER': 'ADAMS',
    'CENTENNIAL': 'ARAPAHOE',
    'LITTLETON': 'ARAPAHOE',
    'ENGLEWOOD': 'ARAPAHOE',
    'BROOMFIELD': 'BROOMFIELD',
    'COMMERCE_CITY': 'ADAMS',
    'PARKER': 'DOUGLAS',
    'CASTLE_ROCK': 'DOUGLAS',
    'HIGHLANDS_RANCH': 'DOUGLAS',
    'LONE_TREE': 'DOUGLAS',
    'GOLDEN': 'JEFFERSON',
    // Boulder County
    'BOULDER': 'BOULDER',
    'LONGMONT': 'BOULDER',
    'LOUISVILLE': 'BOULDER',
    'LAFAYETTE': 'BOULDER',
    'ERIE': 'BOULDER',
    // El Paso County (Colorado Springs)
    'COLORADO_SPRINGS': 'EL_PASO',
    'FOUNTAIN': 'EL_PASO',
    'MANITOU_SPRINGS': 'EL_PASO',
    // Other Colorado
    'FORT_COLLINS': 'LARIMER',
    'LOVELAND': 'LARIMER',
    'GREELEY': 'WELD',
    'PUEBLO': 'PUEBLO',
    'GRAND_JUNCTION': 'MESA',
    'DURANGO': 'LA_PLATA',
    'ASPEN': 'PITKIN',
    'VAIL': 'EAGLE',
    'STEAMBOAT_SPRINGS': 'ROUTT',
    'TELLURIDE': 'SAN_MIGUEL',
  },

  // NEW MEXICO - Major cities
  NM: {
    // Bernalillo County (Albuquerque metro)
    'ALBUQUERQUE': 'BERNALILLO',
    'RIO_RANCHO': 'SANDOVAL',
    'LOS_RANCHOS_DE_ALBUQUERQUE': 'BERNALILLO',
    // Santa Fe County
    'SANTA_FE': 'SANTA_FE',
    // Other New Mexico
    'LAS_CRUCES': 'DONA_ANA',
    'ROSWELL': 'CHAVES',
    'FARMINGTON': 'SAN_JUAN',
    'CLOVIS': 'CURRY',
    'HOBBS': 'LEA',
    'ALAMOGORDO': 'OTERO',
    'CARLSBAD': 'EDDY',
    'GALLUP': 'MCKINLEY',
    'LOS_ALAMOS': 'LOS_ALAMOS',
    'TAOS': 'TAOS',
    'SILVER_CITY': 'GRANT',
    'RUIDOSO': 'LINCOLN',
  },

  // UTAH - Major cities
  UT: {
    // Salt Lake County
    'SALT_LAKE_CITY': 'SALT_LAKE',
    'WEST_VALLEY_CITY': 'SALT_LAKE',
    'WEST_JORDAN': 'SALT_LAKE',
    'SANDY': 'SALT_LAKE',
    'SOUTH_JORDAN': 'SALT_LAKE',
    'MURRAY': 'SALT_LAKE',
    'TAYLORSVILLE': 'SALT_LAKE',
    'DRAPER': 'SALT_LAKE',
    'COTTONWOOD_HEIGHTS': 'SALT_LAKE',
    'MIDVALE': 'SALT_LAKE',
    'HOLLADAY': 'SALT_LAKE',
    // Utah County
    'PROVO': 'UTAH',
    'OREM': 'UTAH',
    'LEHI': 'UTAH',
    'SPANISH_FORK': 'UTAH',
    'PLEASANT_GROVE': 'UTAH',
    'AMERICAN_FORK': 'UTAH',
    'SPRINGVILLE': 'UTAH',
    'EAGLE_MOUNTAIN': 'UTAH',
    'SARATOGA_SPRINGS': 'UTAH',
    // Davis County
    'LAYTON': 'DAVIS',
    'BOUNTIFUL': 'DAVIS',
    'CLEARFIELD': 'DAVIS',
    'KAYSVILLE': 'DAVIS',
    'FARMINGTON': 'DAVIS',
    'SYRACUSE': 'DAVIS',
    // Weber County
    'OGDEN': 'WEBER',
    'ROY': 'WEBER',
    // Other Utah
    'ST_GEORGE': 'WASHINGTON',
    'LOGAN': 'CACHE',
    'PARK_CITY': 'SUMMIT',
    'MOAB': 'GRAND',
  },

  // OREGON - Major cities
  OR: {
    // Multnomah County (Portland metro)
    'PORTLAND': 'MULTNOMAH',
    'GRESHAM': 'MULTNOMAH',
    'TROUTDALE': 'MULTNOMAH',
    'WOOD_VILLAGE': 'MULTNOMAH',
    'FAIRVIEW': 'MULTNOMAH',
    // Washington County
    'HILLSBORO': 'WASHINGTON',
    'BEAVERTON': 'WASHINGTON',
    'TIGARD': 'WASHINGTON',
    'LAKE_OSWEGO': 'CLACKAMAS',
    'TUALATIN': 'WASHINGTON',
    'SHERWOOD': 'WASHINGTON',
    // Clackamas County
    'OREGON_CITY': 'CLACKAMAS',
    'MILWAUKIE': 'CLACKAMAS',
    'WEST_LINN': 'CLACKAMAS',
    'WILSONVILLE': 'CLACKAMAS',
    // Marion County (Salem)
    'SALEM': 'MARION',
    'KEIZER': 'MARION',
    'WOODBURN': 'MARION',
    // Lane County (Eugene)
    'EUGENE': 'LANE',
    'SPRINGFIELD': 'LANE',
    // Other Oregon
    'BEND': 'DESCHUTES',
    'MEDFORD': 'JACKSON',
    'ASHLAND': 'JACKSON',
    'CORVALLIS': 'BENTON',
    'ALBANY': 'LINN',
    'GRANTS_PASS': 'JOSEPHINE',
    'REDMOND': 'DESCHUTES',
    'KLAMATH_FALLS': 'KLAMATH',
    'PENDLETON': 'UMATILLA',
    'THE_DALLES': 'WASCO',
    'ASTORIA': 'CLATSOP',
    'NEWPORT': 'LINCOLN',
    'HOOD_RIVER': 'HOOD_RIVER',
  },

  // WASHINGTON - Major cities
  WA: {
    // King County (Seattle metro)
    'SEATTLE': 'KING',
    'BELLEVUE': 'KING',
    'KENT': 'KING',
    'RENTON': 'KING',
    'KIRKLAND': 'KING',
    'REDMOND': 'KING',
    'AUBURN': 'KING',
    'FEDERAL_WAY': 'KING',
    'SAMMAMISH': 'KING',
    'BURIEN': 'KING',
    'ISSAQUAH': 'KING',
    'SHORELINE': 'KING',
    'BOTHELL': 'KING',
    'MERCER_ISLAND': 'KING',
    'SEATAC': 'KING',
    'TUKWILA': 'KING',
    // Pierce County (Tacoma)
    'TACOMA': 'PIERCE',
    'LAKEWOOD': 'PIERCE',
    'PUYALLUP': 'PIERCE',
    'UNIVERSITY_PLACE': 'PIERCE',
    'BONNEY_LAKE': 'PIERCE',
    // Snohomish County
    'EVERETT': 'SNOHOMISH',
    'MARYSVILLE': 'SNOHOMISH',
    'EDMONDS': 'SNOHOMISH',
    'LYNNWOOD': 'SNOHOMISH',
    'LAKE_STEVENS': 'SNOHOMISH',
    'MOUNTLAKE_TERRACE': 'SNOHOMISH',
    // Spokane County
    'SPOKANE': 'SPOKANE',
    'SPOKANE_VALLEY': 'SPOKANE',
    // Other Washington
    'VANCOUVER': 'CLARK',
    'CAMAS': 'CLARK',
    'OLYMPIA': 'THURSTON',
    'LACEY': 'THURSTON',
    'TUMWATER': 'THURSTON',
    'BELLINGHAM': 'WHATCOM',
    'KENNEWICK': 'BENTON',
    'RICHLAND': 'BENTON',
    'PASCO': 'FRANKLIN',
    'YAKIMA': 'YAKIMA',
    'WENATCHEE': 'CHELAN',
    'WALLA_WALLA': 'WALLA_WALLA',
    'PULLMAN': 'WHITMAN',
    'MOSES_LAKE': 'GRANT',
    'ELLENSBURG': 'KITTITAS',
    'BREMERTON': 'KITSAP',
    'SILVERDALE': 'KITSAP',
  },

  // IDAHO - Major cities
  ID: {
    // Ada County (Boise metro)
    'BOISE': 'ADA',
    'MERIDIAN': 'ADA',
    'EAGLE': 'ADA',
    'GARDEN_CITY': 'ADA',
    'STAR': 'ADA',
    // Canyon County
    'NAMPA': 'CANYON',
    'CALDWELL': 'CANYON',
    'MIDDLETON': 'CANYON',
    // Other Idaho
    'IDAHO_FALLS': 'BONNEVILLE',
    'POCATELLO': 'BANNOCK',
    'TWIN_FALLS': 'TWIN_FALLS',
    'LEWISTON': 'NEZ_PERCE',
    'COEUR_DALENE': 'KOOTENAI',
    'POST_FALLS': 'KOOTENAI',
    'MOSCOW': 'LATAH',
    'REXBURG': 'MADISON',
    'SANDPOINT': 'BONNER',
    'SUN_VALLEY': 'BLAINE',
    'KETCHUM': 'BLAINE',
  },

  // MONTANA - Major cities
  MT: {
    'BILLINGS': 'YELLOWSTONE',
    'MISSOULA': 'MISSOULA',
    'GREAT_FALLS': 'CASCADE',
    'BOZEMAN': 'GALLATIN',
    'BUTTE': 'SILVER_BOW',
    'HELENA': 'LEWIS_AND_CLARK',
    'KALISPELL': 'FLATHEAD',
    'WHITEFISH': 'FLATHEAD',
    'HAVRE': 'HILL',
    'MILES_CITY': 'CUSTER',
    'LIVINGSTON': 'PARK',
    'ANACONDA': 'DEER_LODGE',
    'DILLON': 'BEAVERHEAD',
    'LEWISTOWN': 'FERGUS',
    'WEST_YELLOWSTONE': 'GALLATIN',
    'BIG_SKY': 'GALLATIN',
  },

  // WYOMING - Major cities
  WY: {
    'CHEYENNE': 'LARAMIE',
    'CASPER': 'NATRONA',
    'LARAMIE': 'ALBANY',
    'GILLETTE': 'CAMPBELL',
    'ROCK_SPRINGS': 'SWEETWATER',
    'SHERIDAN': 'SHERIDAN',
    'GREEN_RIVER': 'SWEETWATER',
    'EVANSTON': 'UINTA',
    'RIVERTON': 'FREMONT',
    'CODY': 'PARK',
    'JACKSON': 'TETON',
    'LANDER': 'FREMONT',
    'RAWLINS': 'CARBON',
    'THERMOPOLIS': 'HOT_SPRINGS',
    'POWELL': 'PARK',
    'DOUGLAS': 'CONVERSE',
    'TORRINGTON': 'GOSHEN',
    'WORLAND': 'WASHAKIE',
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

async function addWesternUSCities() {
  console.log('🏙️  Adding Western US cities to city_county_mapping...\n');

  try {
    // First, check current state counts
    console.log('📊 Current city counts by state:');
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
      existingCounts[row.state_code] = row.city_count;
      console.log(`  ${row.state_code}: ${row.city_count} cities`);
    });

    // Build rows to insert
    const rows = [];
    let skipped = 0;

    for (const [stateCode, cities] of Object.entries(WESTERN_US_CITIES)) {
      // Skip California since it already has data
      if (stateCode === 'CA') {
        console.log(`\n⏭️  Skipping CA (already has ${existingCounts['CA'] || 0} cities)`);
        continue;
      }

      console.log(`\n📍 Processing ${stateCode}...`);

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
      }
      console.log(`  Added ${Object.keys(cities).length} cities for ${stateCode}`);
    }

    console.log(`\n📤 Inserting ${rows.length} total rows...`);

    if (rows.length === 0) {
      console.log('No new rows to insert');
      return;
    }

    // Insert rows in batches to avoid timeouts
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

    // Verify the new counts
    console.log('\n📋 Updated city counts by state:');
    const [newCounts] = await bigquery.query({
      query: `
        SELECT state_code, COUNT(*) as city_count
        FROM \`greywater-prospects-2025.${datasetId}.${tableId}\`
        GROUP BY state_code
        ORDER BY city_count DESC
      `,
      location: 'US'
    });

    newCounts.forEach(row => {
      const added = (existingCounts[row.state_code] || 0) < row.city_count
        ? ` (+${row.city_count - (existingCounts[row.state_code] || 0)})`
        : '';
      console.log(`  ${row.state_code}: ${row.city_count} cities${added}`);
    });

    // Sample verification for key states
    console.log('\n🔍 Sample cities for priority states:');
    for (const state of ['AZ', 'TX', 'NV', 'CO']) {
      const [samples] = await bigquery.query({
        query: `
          SELECT city_name, county_name
          FROM \`greywater-prospects-2025.${datasetId}.${tableId}\`
          WHERE state_code = '${state}'
          ORDER BY city_name
          LIMIT 5
        `,
        location: 'US'
      });
      console.log(`\n  ${state}:`);
      samples.forEach(row => {
        console.log(`    - ${row.city_name} (${row.county_name} County)`);
      });
    }

    console.log('\n✅ Western US cities added successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    if (error.errors) {
      console.error('Insert errors:', JSON.stringify(error.errors, null, 2));
    }
    throw error;
  }
}

addWesternUSCities();
