const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery client
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025';
const bigquery = new BigQuery({ projectId });
const datasetId = 'greywater_compliance';

// Comprehensive city/county mapping for target states
const jurisdictionData = {
  TX: {
    counties: [
      'Harris', 'Dallas', 'Tarrant', 'Bexar', 'Travis', 'Collin', 'Denton',
      'El Paso', 'Fort Bend', 'Montgomery', 'Williamson', 'Hidalgo', 'Cameron',
      'Nueces', 'Brazoria', 'Bell', 'Galveston', 'Lubbock', 'Webb', 'Jefferson'
    ],
    cities: [
      { name: 'Houston', county: 'Harris' },
      { name: 'San Antonio', county: 'Bexar' },
      { name: 'Dallas', county: 'Dallas' },
      { name: 'Austin', county: 'Travis' },
      { name: 'Fort Worth', county: 'Tarrant' },
      { name: 'El Paso', county: 'El Paso' },
      { name: 'Arlington', county: 'Tarrant' },
      { name: 'Corpus Christi', county: 'Nueces' },
      { name: 'Plano', county: 'Collin' },
      { name: 'Laredo', county: 'Webb' },
      { name: 'Lubbock', county: 'Lubbock' },
      { name: 'Irving', county: 'Dallas' },
      { name: 'Garland', county: 'Dallas' },
      { name: 'Frisco', county: 'Collin' },
      { name: 'McKinney', county: 'Collin' },
      { name: 'Amarillo', county: 'Potter' },
      { name: 'Grand Prairie', county: 'Dallas' },
      { name: 'Brownsville', county: 'Cameron' },
      { name: 'Pasadena', county: 'Harris' },
      { name: 'Mesquite', county: 'Dallas' },
      { name: 'Killeen', county: 'Bell' },
      { name: 'McAllen', county: 'Hidalgo' },
      { name: 'Waco', county: 'McLennan' },
      { name: 'Denton', county: 'Denton' },
      { name: 'Midland', county: 'Midland' }
    ]
  },
  AZ: {
    counties: [
      'Maricopa', 'Pima', 'Pinal', 'Yavapai', 'Mohave', 'Coconino',
      'Yuma', 'Cochise', 'Navajo', 'Apache'
    ],
    cities: [
      { name: 'Phoenix', county: 'Maricopa' },
      { name: 'Tucson', county: 'Pima' },
      { name: 'Mesa', county: 'Maricopa' },
      { name: 'Chandler', county: 'Maricopa' },
      { name: 'Scottsdale', county: 'Maricopa' },
      { name: 'Glendale', county: 'Maricopa' },
      { name: 'Gilbert', county: 'Maricopa' },
      { name: 'Tempe', county: 'Maricopa' },
      { name: 'Peoria', county: 'Maricopa' },
      { name: 'Surprise', county: 'Maricopa' },
      { name: 'Yuma', county: 'Yuma' },
      { name: 'Flagstaff', county: 'Coconino' },
      { name: 'Goodyear', county: 'Maricopa' },
      { name: 'Lake Havasu City', county: 'Mohave' },
      { name: 'Buckeye', county: 'Maricopa' },
      { name: 'Casa Grande', county: 'Pinal' },
      { name: 'Sierra Vista', county: 'Cochise' },
      { name: 'Prescott', county: 'Yavapai' }
    ]
  },
  CO: {
    counties: [
      'Denver', 'El Paso', 'Arapahoe', 'Jefferson', 'Adams', 'Larimer',
      'Boulder', 'Weld', 'Pueblo', 'Mesa', 'Douglas', 'Eagle', 'Garfield'
    ],
    cities: [
      { name: 'Denver', county: 'Denver' },
      { name: 'Colorado Springs', county: 'El Paso' },
      { name: 'Aurora', county: 'Arapahoe' },
      { name: 'Fort Collins', county: 'Larimer' },
      { name: 'Lakewood', county: 'Jefferson' },
      { name: 'Thornton', county: 'Adams' },
      { name: 'Arvada', county: 'Jefferson' },
      { name: 'Westminster', county: 'Adams' },
      { name: 'Pueblo', county: 'Pueblo' },
      { name: 'Centennial', county: 'Arapahoe' },
      { name: 'Boulder', county: 'Boulder' },
      { name: 'Greeley', county: 'Weld' },
      { name: 'Longmont', county: 'Boulder' },
      { name: 'Loveland', county: 'Larimer' },
      { name: 'Grand Junction', county: 'Mesa' },
      { name: 'Broomfield', county: 'Broomfield' },
      { name: 'Castle Rock', county: 'Douglas' }
    ]
  },
  OR: {
    counties: [
      'Multnomah', 'Washington', 'Clackamas', 'Lane', 'Marion', 'Jackson',
      'Deschutes', 'Linn', 'Douglas', 'Yamhill', 'Benton'
    ],
    cities: [
      { name: 'Portland', county: 'Multnomah' },
      { name: 'Eugene', county: 'Lane' },
      { name: 'Salem', county: 'Marion' },
      { name: 'Gresham', county: 'Multnomah' },
      { name: 'Hillsboro', county: 'Washington' },
      { name: 'Beaverton', county: 'Washington' },
      { name: 'Bend', county: 'Deschutes' },
      { name: 'Medford', county: 'Jackson' },
      { name: 'Springfield', county: 'Lane' },
      { name: 'Corvallis', county: 'Benton' },
      { name: 'Albany', county: 'Linn' },
      { name: 'Tigard', county: 'Washington' },
      { name: 'Lake Oswego', county: 'Clackamas' },
      { name: 'Keizer', county: 'Marion' },
      { name: 'Grants Pass', county: 'Josephine' }
    ]
  },
  WA: {
    counties: [
      'King', 'Pierce', 'Snohomish', 'Spokane', 'Clark', 'Thurston',
      'Kitsap', 'Yakima', 'Whatcom', 'Benton', 'Cowlitz', 'Grant'
    ],
    cities: [
      { name: 'Seattle', county: 'King' },
      { name: 'Spokane', county: 'Spokane' },
      { name: 'Tacoma', county: 'Pierce' },
      { name: 'Vancouver', county: 'Clark' },
      { name: 'Bellevue', county: 'King' },
      { name: 'Kent', county: 'King' },
      { name: 'Everett', county: 'Snohomish' },
      { name: 'Renton', county: 'King' },
      { name: 'Spokane Valley', county: 'Spokane' },
      { name: 'Federal Way', county: 'King' },
      { name: 'Yakima', county: 'Yakima' },
      { name: 'Bellingham', county: 'Whatcom' },
      { name: 'Kennewick', county: 'Benton' },
      { name: 'Auburn', county: 'King' },
      { name: 'Pasco', county: 'Franklin' },
      { name: 'Marysville', county: 'Snohomish' },
      { name: 'Lakewood', county: 'Pierce' },
      { name: 'Redmond', county: 'King' },
      { name: 'Shoreline', county: 'King' },
      { name: 'Richland', county: 'Benton' }
    ]
  },
  FL: {
    counties: [
      'Miami-Dade', 'Broward', 'Palm Beach', 'Hillsborough', 'Orange',
      'Pinellas', 'Duval', 'Lee', 'Polk', 'Brevard', 'Volusia', 'Pasco',
      'Seminole', 'Sarasota', 'Manatee', 'Lake', 'Collier', 'Osceola'
    ],
    cities: [
      { name: 'Jacksonville', county: 'Duval' },
      { name: 'Miami', county: 'Miami-Dade' },
      { name: 'Tampa', county: 'Hillsborough' },
      { name: 'Orlando', county: 'Orange' },
      { name: 'St. Petersburg', county: 'Pinellas' },
      { name: 'Hialeah', county: 'Miami-Dade' },
      { name: 'Port St. Lucie', county: 'St. Lucie' },
      { name: 'Cape Coral', county: 'Lee' },
      { name: 'Tallahassee', county: 'Leon' },
      { name: 'Fort Lauderdale', county: 'Broward' },
      { name: 'Pembroke Pines', county: 'Broward' },
      { name: 'Hollywood', county: 'Broward' },
      { name: 'Miramar', county: 'Broward' },
      { name: 'Coral Springs', county: 'Broward' },
      { name: 'Clearwater', county: 'Pinellas' },
      { name: 'Miami Gardens', county: 'Miami-Dade' },
      { name: 'Palm Bay', county: 'Brevard' },
      { name: 'West Palm Beach', county: 'Palm Beach' },
      { name: 'Pompano Beach', county: 'Broward' },
      { name: 'Lakeland', county: 'Polk' },
      { name: 'Davie', county: 'Broward' },
      { name: 'Miami Beach', county: 'Miami-Dade' },
      { name: 'Deltona', county: 'Volusia' },
      { name: 'Boca Raton', county: 'Palm Beach' },
      { name: 'Sunrise', county: 'Broward' }
    ]
  }
};

// Function to normalize names for jurisdiction IDs
function normalizeForId(name) {
  return name
    .toUpperCase()
    .replace(/\./g, '')
    .replace(/\s+/g, '_')
    .replace(/[^A-Z0-9_]/g, '');
}

async function populateJurisdictions() {
  console.log('Starting jurisdiction population for TX, AZ, CO, OR, WA, FL...\n');

  const rows = [];

  // Process each state
  for (const [stateCode, data] of Object.entries(jurisdictionData)) {
    console.log(`Processing ${stateCode}...`);

    // Create a set of all counties (from explicit list + cities)
    const allCounties = new Set(data.counties || []);
    data.cities.forEach(city => allCounties.add(city.county));

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
    }

    console.log(`  - Added ${data.cities.length} cities across ${allCounties.size} counties`);
  }

  console.log(`\nTotal entries to insert: ${rows.length}`);

  // Insert into BigQuery
  try {
    await bigquery
      .dataset(datasetId)
      .table('city_county_mapping')
      .insert(rows);

    console.log('\n✓ Successfully inserted all jurisdiction data!');

    // Show summary
    console.log('\nSummary by state:');
    for (const [stateCode, data] of Object.entries(jurisdictionData)) {
      const counties = new Set(data.cities.map(c => c.county));
      console.log(`  ${stateCode}: ${data.cities.length} cities, ${counties.size} counties`);
    }
  } catch (error) {
    if (error.name === 'PartialFailureError') {
      console.error('Some rows failed to insert:');
      error.errors.forEach((err, idx) => {
        console.error(`  Row ${idx}:`, err.errors);
      });
    } else {
      console.error('Error inserting data:', error);
    }
  }
}

// Run the population
populateJurisdictions().catch(console.error);
