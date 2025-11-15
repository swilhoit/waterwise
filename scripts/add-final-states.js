const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery client
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025';
const bigquery = new BigQuery({ projectId });
const datasetId = 'greywater_compliance';

// Final states to complete all 50
const jurisdictionData = {
  HI: {
    cities: [
      { name: 'Honolulu', county: 'Honolulu' },
      { name: 'Pearl City', county: 'Honolulu' },
      { name: 'Hilo', county: 'Hawaii' },
      { name: 'Kailua', county: 'Honolulu' },
      { name: 'Waipahu', county: 'Honolulu' },
      { name: 'Kaneohe', county: 'Honolulu' }
    ]
  },
  AK: {
    cities: [
      { name: 'Anchorage', county: 'Anchorage' },
      { name: 'Fairbanks', county: 'Fairbanks North Star' },
      { name: 'Juneau', county: 'Juneau' },
      { name: 'Sitka', county: 'Sitka' },
      { name: 'Ketchikan', county: 'Ketchikan Gateway' }
    ]
  },
  ME: {
    cities: [
      { name: 'Portland', county: 'Cumberland' },
      { name: 'Lewiston', county: 'Androscoggin' },
      { name: 'Bangor', county: 'Penobscot' },
      { name: 'South Portland', county: 'Cumberland' },
      { name: 'Auburn', county: 'Androscoggin' }
    ]
  },
  NH: {
    cities: [
      { name: 'Manchester', county: 'Hillsborough' },
      { name: 'Nashua', county: 'Hillsborough' },
      { name: 'Concord', county: 'Merrimack' },
      { name: 'Derry', county: 'Rockingham' },
      { name: 'Rochester', county: 'Strafford' }
    ]
  },
  VT: {
    cities: [
      { name: 'Burlington', county: 'Chittenden' },
      { name: 'South Burlington', county: 'Chittenden' },
      { name: 'Rutland', county: 'Rutland' },
      { name: 'Barre', county: 'Washington' },
      { name: 'Montpelier', county: 'Washington' }
    ]
  },
  RI: {
    cities: [
      { name: 'Providence', county: 'Providence' },
      { name: 'Warwick', county: 'Kent' },
      { name: 'Cranston', county: 'Providence' },
      { name: 'Pawtucket', county: 'Providence' },
      { name: 'East Providence', county: 'Providence' }
    ]
  },
  DE: {
    cities: [
      { name: 'Wilmington', county: 'New Castle' },
      { name: 'Dover', county: 'Kent' },
      { name: 'Newark', county: 'New Castle' },
      { name: 'Middletown', county: 'New Castle' },
      { name: 'Smyrna', county: 'Kent' }
    ]
  },
  WV: {
    cities: [
      { name: 'Charleston', county: 'Kanawha' },
      { name: 'Huntington', county: 'Cabell' },
      { name: 'Morgantown', county: 'Monongalia' },
      { name: 'Parkersburg', county: 'Wood' },
      { name: 'Wheeling', county: 'Ohio' }
    ]
  },
  MT: {
    cities: [
      { name: 'Billings', county: 'Yellowstone' },
      { name: 'Missoula', county: 'Missoula' },
      { name: 'Great Falls', county: 'Cascade' },
      { name: 'Bozeman', county: 'Gallatin' },
      { name: 'Butte', county: 'Silver Bow' }
    ]
  },
  WY: {
    cities: [
      { name: 'Cheyenne', county: 'Laramie' },
      { name: 'Casper', county: 'Natrona' },
      { name: 'Laramie', county: 'Albany' },
      { name: 'Gillette', county: 'Campbell' },
      { name: 'Rock Springs', county: 'Sweetwater' }
    ]
  },
  SD: {
    cities: [
      { name: 'Sioux Falls', county: 'Minnehaha' },
      { name: 'Rapid City', county: 'Pennington' },
      { name: 'Aberdeen', county: 'Brown' },
      { name: 'Brookings', county: 'Brookings' },
      { name: 'Watertown', county: 'Codington' }
    ]
  },
  ND: {
    cities: [
      { name: 'Fargo', county: 'Cass' },
      { name: 'Bismarck', county: 'Burleigh' },
      { name: 'Grand Forks', county: 'Grand Forks' },
      { name: 'Minot', county: 'Ward' },
      { name: 'West Fargo', county: 'Cass' }
    ]
  },
  MS: {
    cities: [
      { name: 'Jackson', county: 'Hinds' },
      { name: 'Gulfport', county: 'Harrison' },
      { name: 'Southaven', county: 'DeSoto' },
      { name: 'Hattiesburg', county: 'Forrest' },
      { name: 'Biloxi', county: 'Harrison' },
      { name: 'Meridian', county: 'Lauderdale' }
    ]
  }
};

// Function to normalize names for jurisdiction IDs
function normalizeForId(name) {
  return name
    .toUpperCase()
    .replace(/\./g, '')
    .replace(/\'/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^A-Z0-9_]/g, '');
}

async function populateJurisdictions() {
  console.log('🎯 Adding final 13 states to complete all 50 US states!\n');

  const rows = [];
  let totalCities = 0;
  let totalCounties = new Set();

  // Process each state
  for (const [stateCode, data] of Object.entries(jurisdictionData)) {
    console.log(`Processing ${stateCode}...`);

    // Process each city
    for (const city of data.cities) {
      const cityId = `${stateCode}_CITY_${normalizeForId(city.name)}`;
      const countyId = `${stateCode}_COUNTY_${normalizeForId(city.county)}`;

      rows.push({
        state_code: stateCode,
        city_jurisdiction_id: cityId,
        city_name: city.name,
        county_jurisdiction_id: countyId,
        county_name: city.county
      });

      totalCounties.add(`${stateCode}_${city.county}`);
    }

    totalCities += data.cities.length;
    const stateCounties = new Set(data.cities.map(c => c.county));
    console.log(`  ✓ Added ${data.cities.length} cities across ${stateCounties.size} counties`);
  }

  console.log(`\n📦 Total entries to insert: ${rows.length} cities across ${totalCounties.size} counties`);
  console.log(`🗺️  Final states covered: ${Object.keys(jurisdictionData).length}`);

  // Insert into BigQuery
  try {
    await bigquery
      .dataset(datasetId)
      .table('city_county_mapping')
      .insert(rows);

    console.log('\n✅ Successfully inserted all jurisdiction data!');
    console.log('🎉 ALL 50 US STATES NOW HAVE COVERAGE!\n');

    // Show summary
    console.log('📊 Summary of final batch:');
    for (const [stateCode, data] of Object.entries(jurisdictionData)) {
      const counties = new Set(data.cities.map(c => c.county));
      console.log(`  ${stateCode}: ${data.cities.length} cities, ${counties.size} counties`);
    }
  } catch (error) {
    if (error.name === 'PartialFailureError') {
      console.error('⚠️  Some rows failed to insert:');
      error.errors.forEach((err, idx) => {
        console.error(`  Row ${idx}:`, err.errors);
      });
    } else {
      console.error('❌ Error inserting data:', error);
    }
  }
}

// Run the population
populateJurisdictions().catch(console.error);
