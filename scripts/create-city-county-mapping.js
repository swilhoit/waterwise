const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';
const tableId = 'city_county_mapping';

// California city-to-county mapping based on real geography
const cityCountyMapping = {
  // Los Angeles County
  'AGOURA_HILLS': 'LOS_ANGELES',
  'ALHAMBRA': 'LOS_ANGELES',
  'ALTADENA': 'LOS_ANGELES',
  'ARCADIA': 'LOS_ANGELES',
  'ARTESIA': 'LOS_ANGELES',
  'AVOCADO_HEIGHTS': 'LOS_ANGELES',
  'AZUSA': 'LOS_ANGELES',
  'BALDWIN_PARK': 'LOS_ANGELES',
  'BELL': 'LOS_ANGELES',
  'BELLFLOWER': 'LOS_ANGELES',
  'BELL_GARDENS': 'LOS_ANGELES',
  'BEVERLY_HILLS': 'LOS_ANGELES',
  'BURBANK': 'LOS_ANGELES',
  'CALABASAS': 'LOS_ANGELES',
  'CARSON': 'LOS_ANGELES',
  'CASTAIC': 'LOS_ANGELES',
  'CERRITOS': 'LOS_ANGELES',
  'CLAREMONT': 'LOS_ANGELES',
  'COMMERCE': 'LOS_ANGELES',
  'COMPTON': 'LOS_ANGELES',
  'CORONA': 'LOS_ANGELES',
  'COVINA': 'LOS_ANGELES',
  'CUDAHY': 'LOS_ANGELES',
  'CULVER_CITY': 'LOS_ANGELES',
  'DIAMOND_BAR': 'LOS_ANGELES',
  'DOWNEY': 'LOS_ANGELES',
  'DUARTE': 'LOS_ANGELES',
  'EL_MONTE': 'LOS_ANGELES',
  'EL_SEGUNDO': 'LOS_ANGELES',
  'GARDENA': 'LOS_ANGELES',
  'GLENDALE': 'LOS_ANGELES',
  'GLENDORA': 'LOS_ANGELES',
  'HAWAIIAN_GARDENS': 'LOS_ANGELES',
  'HAWTHORNE': 'LOS_ANGELES',
  'HERMOSA_BEACH': 'LOS_ANGELES',
  'HUNTINGTON_PARK': 'LOS_ANGELES',
  'INGLEWOOD': 'LOS_ANGELES',
  'IRWINDALE': 'LOS_ANGELES',
  'LA_CANADA_FLINTRIDGE': 'LOS_ANGELES',
  'LA_HABRA_HEIGHTS': 'LOS_ANGELES',
  'LAKEWOOD': 'LOS_ANGELES',
  'LA_MIRADA': 'LOS_ANGELES',
  'LANCASTER': 'LOS_ANGELES',
  'LA_PUENTE': 'LOS_ANGELES',
  'LA_VERNE': 'LOS_ANGELES',
  'LAWNDALE': 'LOS_ANGELES',
  'LOMITA': 'LOS_ANGELES',
  'LONG_BEACH': 'LOS_ANGELES',
  'LOS_ANGELES': 'LOS_ANGELES',
  'LYNWOOD': 'LOS_ANGELES',
  'MALIBU': 'LOS_ANGELES',
  'MANHATTAN_BEACH': 'LOS_ANGELES',
  'MAYWOOD': 'LOS_ANGELES',
  'MONROVIA': 'LOS_ANGELES',
  'MONTEBELLO': 'LOS_ANGELES',
  'MONTEREY_PARK': 'LOS_ANGELES',
  'NORWALK': 'LOS_ANGELES',
  'PALMDALE': 'LOS_ANGELES',
  'PALOS_VERDES_ESTATES': 'LOS_ANGELES',
  'PARAMOUNT': 'LOS_ANGELES',
  'PASADENA': 'LOS_ANGELES',
  'PICO_RIVERA': 'LOS_ANGELES',
  'POMONA': 'LOS_ANGELES',
  'RANCHO_PALOS_VERDES': 'LOS_ANGELES',
  'REDONDO_BEACH': 'LOS_ANGELES',
  'ROLLING_HILLS': 'LOS_ANGELES',
  'ROLLING_HILLS_ESTATES': 'LOS_ANGELES',
  'ROSEMEAD': 'LOS_ANGELES',
  'SAN_DIMAS': 'LOS_ANGELES',
  'SAN_FERNANDO': 'LOS_ANGELES',
  'SAN_GABRIEL': 'LOS_ANGELES',
  'SAN_MARINO': 'LOS_ANGELES',
  'SANTA_CLARITA': 'LOS_ANGELES',
  'SANTA_FE_SPRINGS': 'LOS_ANGELES',
  'SANTA_MONICA': 'LOS_ANGELES',
  'SIERRA_MADRE': 'LOS_ANGELES',
  'SIGNAL_HILL': 'LOS_ANGELES',
  'SOUTH_EL_MONTE': 'LOS_ANGELES',
  'SOUTH_GATE': 'LOS_ANGELES',
  'SOUTH_PASADENA': 'LOS_ANGELES',
  'TEMPLE_CITY': 'LOS_ANGELES',
  'TORRANCE': 'LOS_ANGELES',
  'VERNON': 'LOS_ANGELES',
  'WALNUT': 'LOS_ANGELES',
  'WEST_COVINA': 'LOS_ANGELES',
  'WEST_HOLLYWOOD': 'LOS_ANGELES',
  'WESTLAKE_VILLAGE': 'LOS_ANGELES',
  'WHITTIER': 'LOS_ANGELES',

  // Orange County
  'ALISO_VIEJO': 'ORANGE',
  'ANAHEIM': 'ORANGE',
  'BREA': 'ORANGE',
  'BUENA_PARK': 'ORANGE',
  'COSTA_MESA': 'ORANGE',
  'CYPRESS': 'ORANGE',
  'DANA_POINT': 'ORANGE',
  'FOUNTAIN_VALLEY': 'ORANGE',
  'FULLERTON': 'ORANGE',
  'GARDEN_GROVE': 'ORANGE',
  'HUNTINGTON_BEACH': 'ORANGE',
  'IRVINE': 'ORANGE',
  'LA_HABRA': 'ORANGE',
  'LA_PALMA': 'ORANGE',
  'LAGUNA_BEACH': 'ORANGE',
  'LAGUNA_HILLS': 'ORANGE',
  'LAGUNA_NIGUEL': 'ORANGE',
  'LAGUNA_WOODS': 'ORANGE',
  'LAKE_FOREST': 'ORANGE',
  'LOS_ALAMITOS': 'ORANGE',
  'MISSION_VIEJO': 'ORANGE',
  'NEWPORT_BEACH': 'ORANGE',
  'ORANGE': 'ORANGE',
  'PLACENTIA': 'ORANGE',
  'RANCHO_SANTA_MARGARITA': 'ORANGE',
  'SAN_CLEMENTE': 'ORANGE',
  'SAN_JUAN_CAPISTRANO': 'ORANGE',
  'SANTA_ANA': 'ORANGE',
  'SEAL_BEACH': 'ORANGE',
  'STANTON': 'ORANGE',
  'TUSTIN': 'ORANGE',
  'VILLA_PARK': 'ORANGE',
  'WESTMINSTER': 'ORANGE',
  'YORBA_LINDA': 'ORANGE',

  // Alameda County
  'ALAMEDA': 'ALAMEDA',
  'ALBANY': 'ALAMEDA',
  'BERKELEY': 'ALAMEDA',
  'DUBLIN': 'ALAMEDA',
  'EMERYVILLE': 'ALAMEDA',
  'FREMONT': 'ALAMEDA',
  'HAYWARD': 'ALAMEDA',
  'LIVERMORE': 'ALAMEDA',
  'NEWARK': 'ALAMEDA',
  'OAKLAND': 'ALAMEDA',
  'PIEDMONT': 'ALAMEDA',
  'PLEASANTON': 'ALAMEDA',
  'SAN_LEANDRO': 'ALAMEDA',
  'UNION_CITY': 'ALAMEDA',

  // Contra Costa County
  'ANTIOCH': 'CONTRA_COSTA',
  'BRENTWOOD': 'CONTRA_COSTA',
  'CLAYTON': 'CONTRA_COSTA',
  'CONCORD': 'CONTRA_COSTA',
  'DANVILLE': 'CONTRA_COSTA',
  'EL_CERRITO': 'CONTRA_COSTA',
  'HERCULES': 'CONTRA_COSTA',
  'LAFAYETTE': 'CONTRA_COSTA',
  'MARTINEZ': 'CONTRA_COSTA',
  'MORAGA': 'CONTRA_COSTA',
  'OAKLEY': 'CONTRA_COSTA',
  'ORINDA': 'CONTRA_COSTA',
  'PINOLE': 'CONTRA_COSTA',
  'PITTSBURG': 'CONTRA_COSTA',
  'PLEASANT_HILL': 'CONTRA_COSTA',
  'RICHMOND': 'CONTRA_COSTA',
  'SAN_PABLO': 'CONTRA_COSTA',
  'SAN_RAMON': 'CONTRA_COSTA',
  'WALNUT_CREEK': 'CONTRA_COSTA',

  // Santa Clara County
  'CAMPBELL': 'SANTA_CLARA',
  'CUPERTINO': 'SANTA_CLARA',
  'GILROY': 'SANTA_CLARA',
  'LOS_ALTOS': 'SANTA_CLARA',
  'LOS_ALTOS_HILLS': 'SANTA_CLARA',
  'LOS_GATOS': 'SANTA_CLARA',
  'MILPITAS': 'SANTA_CLARA',
  'MONTE_SERENO': 'SANTA_CLARA',
  'MORGAN_HILL': 'SANTA_CLARA',
  'MOUNTAIN_VIEW': 'SANTA_CLARA',
  'PALO_ALTO': 'SANTA_CLARA',
  'SAN_JOSE': 'SANTA_CLARA',
  'SANTA_CLARA': 'SANTA_CLARA',
  'SARATOGA': 'SANTA_CLARA',
  'SUNNYVALE': 'SANTA_CLARA',

  // Marin County
  'BELVEDERE': 'MARIN',
  'CORTE_MADERA': 'MARIN',
  'FAIRFAX': 'MARIN',
  'LARKSPUR': 'MARIN',
  'MILL_VALLEY': 'MARIN',
  'NOVATO': 'MARIN',
  'ROSS': 'MARIN',
  'SAN_ANSELMO': 'MARIN',
  'SAN_RAFAEL': 'MARIN',
  'SAUSALITO': 'MARIN',
  'TIBURON': 'MARIN',

  // Santa Cruz County
  'CAPITOLA': 'SANTA_CRUZ',
  'SANTA_CRUZ': 'SANTA_CRUZ',
  'SCOTTS_VALLEY': 'SANTA_CRUZ',
  'WATSONVILLE': 'SANTA_CRUZ',

  // Kern County (Bakersfield)
  'BAKERSFIELD': 'KERN',

  // Riverside County
  'CORONA': 'RIVERSIDE',

  // Fresno County
  'FRESNO': 'FRESNO'
};

// Create rows for the mapping table
const rows = [];
Object.entries(cityCountyMapping).forEach(([cityName, countyName]) => {
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

// Define the schema
const schema = [
  { name: 'state_code', type: 'STRING', mode: 'REQUIRED' },
  { name: 'city_jurisdiction_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'city_name', type: 'STRING', mode: 'REQUIRED' },
  { name: 'county_jurisdiction_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'county_name', type: 'STRING', mode: 'REQUIRED' }
];

async function uploadMapping() {
  try {
    console.log(`Creating table ${datasetId}.${tableId}...`);

    // Check if table exists and delete it
    try {
      await bigquery.dataset(datasetId).table(tableId).delete();
      console.log('Existing table deleted');
    } catch (error) {
      console.log('No existing table to delete');
    }

    // Create the table with schema
    const [table] = await bigquery
      .dataset(datasetId)
      .createTable(tableId, { schema });

    console.log(`Table ${table.id} created.`);

    // Insert the data
    console.log(`Inserting ${rows.length} rows...`);
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(rows);

    console.log(`Successfully inserted ${rows.length} rows into ${datasetId}.${tableId}`);

    // Verify the data
    const query = `SELECT county_name, COUNT(*) as city_count FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${datasetId}.${tableId}\` GROUP BY county_name ORDER BY city_count DESC`;
    const [queryRows] = await bigquery.query(query);

    console.log('\nCities per county:');
    console.table(queryRows);

  } catch (error) {
    console.error('Error uploading data:', error);
    throw error;
  }
}

uploadMapping();
