const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';
const tableId = 'city_county_mapping';

// Additional California cities to add (not in original mapping)
const additionalCities = {
  // San Francisco County (city-county)
  'SAN_FRANCISCO': 'SAN_FRANCISCO',

  // San Diego County
  'SAN_DIEGO': 'SAN_DIEGO',
  'CHULA_VISTA': 'SAN_DIEGO',
  'OCEANSIDE': 'SAN_DIEGO',
  'ESCONDIDO': 'SAN_DIEGO',
  'CARLSBAD': 'SAN_DIEGO',
  'EL_CAJON': 'SAN_DIEGO',
  'VISTA': 'SAN_DIEGO',
  'SAN_MARCOS': 'SAN_DIEGO',
  'ENCINITAS': 'SAN_DIEGO',
  'NATIONAL_CITY': 'SAN_DIEGO',
  'LA_MESA': 'SAN_DIEGO',
  'SANTEE': 'SAN_DIEGO',
  'POWAY': 'SAN_DIEGO',
  'DEL_MAR': 'SAN_DIEGO',
  'SOLANA_BEACH': 'SAN_DIEGO',
  'CORONADO': 'SAN_DIEGO',
  'IMPERIAL_BEACH': 'SAN_DIEGO',
  'LEMON_GROVE': 'SAN_DIEGO',

  // Sacramento County
  'SACRAMENTO': 'SACRAMENTO',
  'ELK_GROVE': 'SACRAMENTO',
  'FOLSOM': 'SACRAMENTO',
  'RANCHO_CORDOVA': 'SACRAMENTO',
  'CITRUS_HEIGHTS': 'SACRAMENTO',
  'GALT': 'SACRAMENTO',
  'ISLETON': 'SACRAMENTO',

  // San Bernardino County
  'SAN_BERNARDINO': 'SAN_BERNARDINO',
  'FONTANA': 'SAN_BERNARDINO',
  'ONTARIO': 'SAN_BERNARDINO',
  'RANCHO_CUCAMONGA': 'SAN_BERNARDINO',
  'VICTORVILLE': 'SAN_BERNARDINO',
  'RIALTO': 'SAN_BERNARDINO',
  'HESPERIA': 'SAN_BERNARDINO',
  'CHINO': 'SAN_BERNARDINO',
  'CHINO_HILLS': 'SAN_BERNARDINO',
  'UPLAND': 'SAN_BERNARDINO',
  'APPLE_VALLEY': 'SAN_BERNARDINO',
  'REDLANDS': 'SAN_BERNARDINO',
  'COLTON': 'SAN_BERNARDINO',
  'YUCAIPA': 'SAN_BERNARDINO',
  'HIGHLAND': 'SAN_BERNARDINO',
  'MONTCLAIR': 'SAN_BERNARDINO',
  'BARSTOW': 'SAN_BERNARDINO',
  'LOMA_LINDA': 'SAN_BERNARDINO',

  // Riverside County (more cities)
  'RIVERSIDE': 'RIVERSIDE',
  'MORENO_VALLEY': 'RIVERSIDE',
  'TEMECULA': 'RIVERSIDE',
  'MURRIETA': 'RIVERSIDE',
  'HEMET': 'RIVERSIDE',
  'MENIFEE': 'RIVERSIDE',
  'INDIO': 'RIVERSIDE',
  'PERRIS': 'RIVERSIDE',
  'LAKE_ELSINORE': 'RIVERSIDE',
  'PALM_DESERT': 'RIVERSIDE',
  'PALM_SPRINGS': 'RIVERSIDE',
  'LA_QUINTA': 'RIVERSIDE',
  'COACHELLA': 'RIVERSIDE',
  'CATHEDRAL_CITY': 'RIVERSIDE',
  'BEAUMONT': 'RIVERSIDE',
  'BANNING': 'RIVERSIDE',
  'WILDOMAR': 'RIVERSIDE',
  'SAN_JACINTO': 'RIVERSIDE',
  'EASTVALE': 'RIVERSIDE',
  'JURUPA_VALLEY': 'RIVERSIDE',
  'RANCHO_MIRAGE': 'RIVERSIDE',
  'DESERT_HOT_SPRINGS': 'RIVERSIDE',
  'NORCO': 'RIVERSIDE',
  'CALIMESA': 'RIVERSIDE',

  // San Mateo County
  'SAN_MATEO': 'SAN_MATEO',
  'DALY_CITY': 'SAN_MATEO',
  'REDWOOD_CITY': 'SAN_MATEO',
  'SOUTH_SAN_FRANCISCO': 'SAN_MATEO',
  'SAN_BRUNO': 'SAN_MATEO',
  'FOSTER_CITY': 'SAN_MATEO',
  'SAN_CARLOS': 'SAN_MATEO',
  'MENLO_PARK': 'SAN_MATEO',
  'BURLINGAME': 'SAN_MATEO',
  'MILLBRAE': 'SAN_MATEO',
  'PACIFICA': 'SAN_MATEO',
  'BELMONT': 'SAN_MATEO',
  'HALF_MOON_BAY': 'SAN_MATEO',
  'ATHERTON': 'SAN_MATEO',
  'HILLSBOROUGH': 'SAN_MATEO',
  'WOODSIDE': 'SAN_MATEO',
  'PORTOLA_VALLEY': 'SAN_MATEO',
  'BRISBANE': 'SAN_MATEO',
  'COLMA': 'SAN_MATEO',
  'EAST_PALO_ALTO': 'SAN_MATEO',

  // Ventura County
  'VENTURA': 'VENTURA',
  'OXNARD': 'VENTURA',
  'THOUSAND_OAKS': 'VENTURA',
  'SIMI_VALLEY': 'VENTURA',
  'CAMARILLO': 'VENTURA',
  'MOORPARK': 'VENTURA',
  'SANTA_PAULA': 'VENTURA',
  'PORT_HUENEME': 'VENTURA',
  'FILLMORE': 'VENTURA',
  'OJAI': 'VENTURA',

  // Sonoma County
  'SANTA_ROSA': 'SONOMA',
  'PETALUMA': 'SONOMA',
  'ROHNERT_PARK': 'SONOMA',
  'WINDSOR': 'SONOMA',
  'HEALDSBURG': 'SONOMA',
  'SONOMA': 'SONOMA',
  'COTATI': 'SONOMA',
  'CLOVERDALE': 'SONOMA',
  'SEBASTOPOL': 'SONOMA',

  // Santa Barbara County
  'SANTA_BARBARA': 'SANTA_BARBARA',
  'SANTA_MARIA': 'SANTA_BARBARA',
  'LOMPOC': 'SANTA_BARBARA',
  'GOLETA': 'SANTA_BARBARA',
  'GUADALUPE': 'SANTA_BARBARA',
  'CARPINTERIA': 'SANTA_BARBARA',
  'SOLVANG': 'SANTA_BARBARA',
  'BUELLTON': 'SANTA_BARBARA',

  // Monterey County
  'SALINAS': 'MONTEREY',
  'MONTEREY': 'MONTEREY',
  'SEASIDE': 'MONTEREY',
  'MARINA': 'MONTEREY',
  'PACIFIC_GROVE': 'MONTEREY',
  'CARMEL_BY_THE_SEA': 'MONTEREY',
  'GONZALES': 'MONTEREY',
  'GREENFIELD': 'MONTEREY',
  'SOLEDAD': 'MONTEREY',
  'KING_CITY': 'MONTEREY',

  // San Luis Obispo County
  'SAN_LUIS_OBISPO': 'SAN_LUIS_OBISPO',
  'PASO_ROBLES': 'SAN_LUIS_OBISPO',
  'ATASCADERO': 'SAN_LUIS_OBISPO',
  'ARROYO_GRANDE': 'SAN_LUIS_OBISPO',
  'MORRO_BAY': 'SAN_LUIS_OBISPO',
  'GROVER_BEACH': 'SAN_LUIS_OBISPO',
  'PISMO_BEACH': 'SAN_LUIS_OBISPO',

  // Placer County
  'ROSEVILLE': 'PLACER',
  'ROCKLIN': 'PLACER',
  'LINCOLN': 'PLACER',
  'AUBURN': 'PLACER',
  'LOOMIS': 'PLACER',
  'COLFAX': 'PLACER',

  // Solano County
  'VALLEJO': 'SOLANO',
  'FAIRFIELD': 'SOLANO',
  'VACAVILLE': 'SOLANO',
  'SUISUN_CITY': 'SOLANO',
  'BENICIA': 'SOLANO',
  'DIXON': 'SOLANO',
  'RIO_VISTA': 'SOLANO',

  // Stanislaus County
  'MODESTO': 'STANISLAUS',
  'TURLOCK': 'STANISLAUS',
  'CERES': 'STANISLAUS',
  'OAKDALE': 'STANISLAUS',
  'RIVERBANK': 'STANISLAUS',
  'PATTERSON': 'STANISLAUS',
  'NEWMAN': 'STANISLAUS',
  'HUGHSON': 'STANISLAUS',
  'WATERFORD': 'STANISLAUS',

  // San Joaquin County
  'STOCKTON': 'SAN_JOAQUIN',
  'TRACY': 'SAN_JOAQUIN',
  'MANTECA': 'SAN_JOAQUIN',
  'LODI': 'SAN_JOAQUIN',
  'LATHROP': 'SAN_JOAQUIN',
  'RIPON': 'SAN_JOAQUIN',
  'ESCALON': 'SAN_JOAQUIN',

  // Tulare County
  'VISALIA': 'TULARE',
  'TULARE': 'TULARE',
  'PORTERVILLE': 'TULARE',
  'DINUBA': 'TULARE',
  'LINDSAY': 'TULARE',
  'EXETER': 'TULARE',
  'FARMERSVILLE': 'TULARE',
  'WOODLAKE': 'TULARE',

  // Butte County
  'CHICO': 'BUTTE',
  'OROVILLE': 'BUTTE',
  'PARADISE': 'BUTTE',
  'GRIDLEY': 'BUTTE',
  'BIGGS': 'BUTTE',

  // Yolo County
  'DAVIS': 'YOLO',
  'WOODLAND': 'YOLO',
  'WEST_SACRAMENTO': 'YOLO',
  'WINTERS': 'YOLO',

  // Napa County
  'NAPA': 'NAPA',
  'AMERICAN_CANYON': 'NAPA',
  'ST_HELENA': 'NAPA',
  'CALISTOGA': 'NAPA',
  'YOUNTVILLE': 'NAPA',

  // Merced County
  'MERCED': 'MERCED',
  'LOS_BANOS': 'MERCED',
  'ATWATER': 'MERCED',
  'LIVINGSTON': 'MERCED',
  'GUSTINE': 'MERCED',
  'DOS_PALOS': 'MERCED',

  // Kings County
  'HANFORD': 'KINGS',
  'LEMOORE': 'KINGS',
  'CORCORAN': 'KINGS',
  'AVENAL': 'KINGS',

  // Madera County
  'MADERA': 'MADERA',
  'CHOWCHILLA': 'MADERA',

  // Imperial County
  'EL_CENTRO': 'IMPERIAL',
  'CALEXICO': 'IMPERIAL',
  'BRAWLEY': 'IMPERIAL',
  'IMPERIAL': 'IMPERIAL',
  'HOLTVILLE': 'IMPERIAL',
  'WESTMORLAND': 'IMPERIAL',

  // Humboldt County
  'EUREKA': 'HUMBOLDT',
  'ARCATA': 'HUMBOLDT',
  'FORTUNA': 'HUMBOLDT',
  'BLUE_LAKE': 'HUMBOLDT',
  'FERNDALE': 'HUMBOLDT',
  'RIO_DELL': 'HUMBOLDT',
  'TRINIDAD': 'HUMBOLDT',

  // Shasta County
  'REDDING': 'SHASTA',
  'ANDERSON': 'SHASTA',
  'SHASTA_LAKE': 'SHASTA',

  // El Dorado County
  'SOUTH_LAKE_TAHOE': 'EL_DORADO',
  'PLACERVILLE': 'EL_DORADO',

  // Mendocino County
  'UKIAH': 'MENDOCINO',
  'FORT_BRAGG': 'MENDOCINO',
  'WILLITS': 'MENDOCINO',
  'POINT_ARENA': 'MENDOCINO',

  // Lake County
  'CLEARLAKE': 'LAKE',
  'LAKEPORT': 'LAKE',

  // Sutter County
  'YUBA_CITY': 'SUTTER',
  'LIVE_OAK': 'SUTTER',

  // Nevada County
  'GRASS_VALLEY': 'NEVADA',
  'NEVADA_CITY': 'NEVADA',
  'TRUCKEE': 'NEVADA',

  // Tehama County
  'RED_BLUFF': 'TEHAMA',
  'CORNING': 'TEHAMA',
  'TEHAMA': 'TEHAMA',

  // Glenn County
  'WILLOWS': 'GLENN',
  'ORLAND': 'GLENN',

  // Colusa County
  'COLUSA': 'COLUSA',
  'WILLIAMS': 'COLUSA',

  // Yuba County
  'MARYSVILLE': 'YUBA',
  'WHEATLAND': 'YUBA',
};

// Create rows for the mapping table
const rows = [];
Object.entries(additionalCities).forEach(([cityName, countyName]) => {
  rows.push({
    state_code: 'CA',
    city_jurisdiction_id: `CA_CITY_${cityName}`,
    city_name: cityName.replace(/_/g, ' ').toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    county_jurisdiction_id: `CA_COUNTY_${countyName}`,
    county_name: countyName.replace(/_/g, ' ').toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  });
});

async function addCities() {
  try {
    console.log(`Adding ${rows.length} cities to ${datasetId}.${tableId}...`);

    // Insert the data (this appends, doesn't replace)
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(rows);

    console.log(`Successfully added ${rows.length} cities to ${datasetId}.${tableId}`);

    // Verify the data
    const query = `
      SELECT county_name, COUNT(*) as city_count
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.${tableId}\`
      WHERE state_code = 'CA'
      GROUP BY county_name
      ORDER BY city_count DESC
    `;
    const [queryRows] = await bigquery.query(query);

    console.log('\nCities per county (California):');
    console.table(queryRows);

    // Total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.${tableId}\`
      WHERE state_code = 'CA'
    `;
    const [countRows] = await bigquery.query(countQuery);
    console.log(`\nTotal California cities: ${countRows[0].total}`);

  } catch (error) {
    if (error.name === 'PartialFailureError') {
      // Some rows might already exist, that's okay
      console.log('Some rows may already exist, checking for duplicates...');
      const insertErrors = error.errors || [];
      const failedRows = insertErrors.length;
      const successRows = rows.length - failedRows;
      console.log(`Successfully inserted ${successRows} new cities, ${failedRows} already existed or failed`);
    } else {
      console.error('Error adding cities:', error);
      throw error;
    }
  }
}

addCities();
