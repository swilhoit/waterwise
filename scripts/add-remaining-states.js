const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery client
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025';
const bigquery = new BigQuery({ projectId });
const datasetId = 'greywater_compliance';

// Comprehensive city/county mapping for remaining states
const jurisdictionData = {
  NY: {
    cities: [
      { name: 'New York City', county: 'New York' },
      { name: 'Brooklyn', county: 'Kings' },
      { name: 'Queens', county: 'Queens' },
      { name: 'Manhattan', county: 'New York' },
      { name: 'Bronx', county: 'Bronx' },
      { name: 'Staten Island', county: 'Richmond' },
      { name: 'Buffalo', county: 'Erie' },
      { name: 'Rochester', county: 'Monroe' },
      { name: 'Yonkers', county: 'Westchester' },
      { name: 'Syracuse', county: 'Onondaga' },
      { name: 'Albany', county: 'Albany' },
      { name: 'New Rochelle', county: 'Westchester' },
      { name: 'Mount Vernon', county: 'Westchester' },
      { name: 'Schenectady', county: 'Schenectady' },
      { name: 'Utica', county: 'Oneida' }
    ]
  },
  PA: {
    cities: [
      { name: 'Philadelphia', county: 'Philadelphia' },
      { name: 'Pittsburgh', county: 'Allegheny' },
      { name: 'Allentown', county: 'Lehigh' },
      { name: 'Erie', county: 'Erie' },
      { name: 'Reading', county: 'Berks' },
      { name: 'Scranton', county: 'Lackawanna' },
      { name: 'Bethlehem', county: 'Northampton' },
      { name: 'Lancaster', county: 'Lancaster' },
      { name: 'Harrisburg', county: 'Dauphin' },
      { name: 'Altoona', county: 'Blair' },
      { name: 'York', county: 'York' }
    ]
  },
  IL: {
    cities: [
      { name: 'Chicago', county: 'Cook' },
      { name: 'Aurora', county: 'Kane' },
      { name: 'Naperville', county: 'DuPage' },
      { name: 'Joliet', county: 'Will' },
      { name: 'Rockford', county: 'Winnebago' },
      { name: 'Springfield', county: 'Sangamon' },
      { name: 'Peoria', county: 'Peoria' },
      { name: 'Elgin', county: 'Kane' },
      { name: 'Waukegan', county: 'Lake' },
      { name: 'Champaign', county: 'Champaign' },
      { name: 'Bloomington', county: 'McLean' }
    ]
  },
  OH: {
    cities: [
      { name: 'Columbus', county: 'Franklin' },
      { name: 'Cleveland', county: 'Cuyahoga' },
      { name: 'Cincinnati', county: 'Hamilton' },
      { name: 'Toledo', county: 'Lucas' },
      { name: 'Akron', county: 'Summit' },
      { name: 'Dayton', county: 'Montgomery' },
      { name: 'Parma', county: 'Cuyahoga' },
      { name: 'Canton', county: 'Stark' },
      { name: 'Youngstown', county: 'Mahoning' },
      { name: 'Lorain', county: 'Lorain' }
    ]
  },
  NC: {
    cities: [
      { name: 'Charlotte', county: 'Mecklenburg' },
      { name: 'Raleigh', county: 'Wake' },
      { name: 'Greensboro', county: 'Guilford' },
      { name: 'Durham', county: 'Durham' },
      { name: 'Winston-Salem', county: 'Forsyth' },
      { name: 'Fayetteville', county: 'Cumberland' },
      { name: 'Cary', county: 'Wake' },
      { name: 'Wilmington', county: 'New Hanover' },
      { name: 'High Point', county: 'Guilford' },
      { name: 'Asheville', county: 'Buncombe' }
    ]
  },
  GA: {
    cities: [
      { name: 'Atlanta', county: 'Fulton' },
      { name: 'Augusta', county: 'Richmond' },
      { name: 'Columbus', county: 'Muscogee' },
      { name: 'Savannah', county: 'Chatham' },
      { name: 'Athens', county: 'Clarke' },
      { name: 'Sandy Springs', county: 'Fulton' },
      { name: 'Macon', county: 'Bibb' },
      { name: 'Roswell', county: 'Fulton' },
      { name: 'Albany', county: 'Dougherty' },
      { name: 'Johns Creek', county: 'Fulton' }
    ]
  },
  MI: {
    cities: [
      { name: 'Detroit', county: 'Wayne' },
      { name: 'Grand Rapids', county: 'Kent' },
      { name: 'Warren', county: 'Macomb' },
      { name: 'Sterling Heights', county: 'Macomb' },
      { name: 'Ann Arbor', county: 'Washtenaw' },
      { name: 'Lansing', county: 'Ingham' },
      { name: 'Flint', county: 'Genesee' },
      { name: 'Dearborn', county: 'Wayne' },
      { name: 'Livonia', county: 'Wayne' },
      { name: 'Westland', county: 'Wayne' }
    ]
  },
  NJ: {
    cities: [
      { name: 'Newark', county: 'Essex' },
      { name: 'Jersey City', county: 'Hudson' },
      { name: 'Paterson', county: 'Passaic' },
      { name: 'Elizabeth', county: 'Union' },
      { name: 'Edison', county: 'Middlesex' },
      { name: 'Woodbridge', county: 'Middlesex' },
      { name: 'Lakewood', county: 'Ocean' },
      { name: 'Toms River', county: 'Ocean' },
      { name: 'Hamilton', county: 'Mercer' },
      { name: 'Trenton', county: 'Mercer' }
    ]
  },
  VA: {
    cities: [
      { name: 'Virginia Beach', county: 'Virginia Beach City' },
      { name: 'Norfolk', county: 'Norfolk City' },
      { name: 'Chesapeake', county: 'Chesapeake City' },
      { name: 'Richmond', county: 'Richmond City' },
      { name: 'Newport News', county: 'Newport News City' },
      { name: 'Alexandria', county: 'Alexandria City' },
      { name: 'Hampton', county: 'Hampton City' },
      { name: 'Roanoke', county: 'Roanoke City' },
      { name: 'Portsmouth', county: 'Portsmouth City' },
      { name: 'Suffolk', county: 'Suffolk City' }
    ]
  },
  MA: {
    cities: [
      { name: 'Boston', county: 'Suffolk' },
      { name: 'Worcester', county: 'Worcester' },
      { name: 'Springfield', county: 'Hampden' },
      { name: 'Cambridge', county: 'Middlesex' },
      { name: 'Lowell', county: 'Middlesex' },
      { name: 'Brockton', county: 'Plymouth' },
      { name: 'Quincy', county: 'Norfolk' },
      { name: 'Lynn', county: 'Essex' },
      { name: 'New Bedford', county: 'Bristol' },
      { name: 'Somerville', county: 'Middlesex' }
    ]
  },
  IN: {
    cities: [
      { name: 'Indianapolis', county: 'Marion' },
      { name: 'Fort Wayne', county: 'Allen' },
      { name: 'Evansville', county: 'Vanderburgh' },
      { name: 'South Bend', county: 'St. Joseph' },
      { name: 'Carmel', county: 'Hamilton' },
      { name: 'Bloomington', county: 'Monroe' },
      { name: 'Fishers', county: 'Hamilton' },
      { name: 'Hammond', county: 'Lake' },
      { name: 'Gary', county: 'Lake' }
    ]
  },
  TN: {
    cities: [
      { name: 'Nashville', county: 'Davidson' },
      { name: 'Memphis', county: 'Shelby' },
      { name: 'Knoxville', county: 'Knox' },
      { name: 'Chattanooga', county: 'Hamilton' },
      { name: 'Clarksville', county: 'Montgomery' },
      { name: 'Murfreesboro', county: 'Rutherford' },
      { name: 'Franklin', county: 'Williamson' },
      { name: 'Jackson', county: 'Madison' }
    ]
  },
  MO: {
    cities: [
      { name: 'Kansas City', county: 'Jackson' },
      { name: 'St. Louis', county: 'St. Louis City' },
      { name: 'Springfield', county: 'Greene' },
      { name: 'Columbia', county: 'Boone' },
      { name: 'Independence', county: 'Jackson' },
      { name: 'Lee\'s Summit', county: 'Jackson' },
      { name: 'O\'Fallon', county: 'St. Charles' },
      { name: 'St. Joseph', county: 'Buchanan' }
    ]
  },
  MD: {
    cities: [
      { name: 'Baltimore', county: 'Baltimore City' },
      { name: 'Frederick', county: 'Frederick' },
      { name: 'Rockville', county: 'Montgomery' },
      { name: 'Gaithersburg', county: 'Montgomery' },
      { name: 'Bowie', county: 'Prince George\'s' },
      { name: 'Hagerstown', county: 'Washington' },
      { name: 'Annapolis', county: 'Anne Arundel' }
    ]
  },
  WI: {
    cities: [
      { name: 'Milwaukee', county: 'Milwaukee' },
      { name: 'Madison', county: 'Dane' },
      { name: 'Green Bay', county: 'Brown' },
      { name: 'Kenosha', county: 'Kenosha' },
      { name: 'Racine', county: 'Racine' },
      { name: 'Appleton', county: 'Outagamie' },
      { name: 'Waukesha', county: 'Waukesha' },
      { name: 'Eau Claire', county: 'Eau Claire' }
    ]
  },
  MN: {
    cities: [
      { name: 'Minneapolis', county: 'Hennepin' },
      { name: 'St. Paul', county: 'Ramsey' },
      { name: 'Rochester', county: 'Olmsted' },
      { name: 'Duluth', county: 'St. Louis' },
      { name: 'Bloomington', county: 'Hennepin' },
      { name: 'Brooklyn Park', county: 'Hennepin' },
      { name: 'Plymouth', county: 'Hennepin' },
      { name: 'St. Cloud', county: 'Stearns' }
    ]
  },
  SC: {
    cities: [
      { name: 'Charleston', county: 'Charleston' },
      { name: 'Columbia', county: 'Richland' },
      { name: 'North Charleston', county: 'Charleston' },
      { name: 'Mount Pleasant', county: 'Charleston' },
      { name: 'Rock Hill', county: 'York' },
      { name: 'Greenville', county: 'Greenville' },
      { name: 'Summerville', county: 'Dorchester' },
      { name: 'Spartanburg', county: 'Spartanburg' }
    ]
  },
  AL: {
    cities: [
      { name: 'Birmingham', county: 'Jefferson' },
      { name: 'Montgomery', county: 'Montgomery' },
      { name: 'Mobile', county: 'Mobile' },
      { name: 'Huntsville', county: 'Madison' },
      { name: 'Tuscaloosa', county: 'Tuscaloosa' },
      { name: 'Hoover', county: 'Jefferson' },
      { name: 'Dothan', county: 'Houston' },
      { name: 'Auburn', county: 'Lee' }
    ]
  },
  LA: {
    cities: [
      { name: 'New Orleans', county: 'Orleans' },
      { name: 'Baton Rouge', county: 'East Baton Rouge' },
      { name: 'Shreveport', county: 'Caddo' },
      { name: 'Lafayette', county: 'Lafayette' },
      { name: 'Lake Charles', county: 'Calcasieu' },
      { name: 'Kenner', county: 'Jefferson' },
      { name: 'Bossier City', county: 'Bossier' },
      { name: 'Monroe', county: 'Ouachita' }
    ]
  },
  KY: {
    cities: [
      { name: 'Louisville', county: 'Jefferson' },
      { name: 'Lexington', county: 'Fayette' },
      { name: 'Bowling Green', county: 'Warren' },
      { name: 'Owensboro', county: 'Daviess' },
      { name: 'Covington', county: 'Kenton' },
      { name: 'Richmond', county: 'Madison' }
    ]
  },
  OK: {
    cities: [
      { name: 'Oklahoma City', county: 'Oklahoma' },
      { name: 'Tulsa', county: 'Tulsa' },
      { name: 'Norman', county: 'Cleveland' },
      { name: 'Broken Arrow', county: 'Tulsa' },
      { name: 'Edmond', county: 'Oklahoma' },
      { name: 'Lawton', county: 'Comanche' },
      { name: 'Moore', county: 'Cleveland' }
    ]
  },
  NV: {
    cities: [
      { name: 'Las Vegas', county: 'Clark' },
      { name: 'Henderson', county: 'Clark' },
      { name: 'Reno', county: 'Washoe' },
      { name: 'North Las Vegas', county: 'Clark' },
      { name: 'Sparks', county: 'Washoe' },
      { name: 'Carson City', county: 'Carson City' }
    ]
  },
  NM: {
    cities: [
      { name: 'Albuquerque', county: 'Bernalillo' },
      { name: 'Las Cruces', county: 'Doña Ana' },
      { name: 'Rio Rancho', county: 'Sandoval' },
      { name: 'Santa Fe', county: 'Santa Fe' },
      { name: 'Roswell', county: 'Chaves' },
      { name: 'Farmington', county: 'San Juan' }
    ]
  },
  UT: {
    cities: [
      { name: 'Salt Lake City', county: 'Salt Lake' },
      { name: 'West Valley City', county: 'Salt Lake' },
      { name: 'Provo', county: 'Utah' },
      { name: 'West Jordan', county: 'Salt Lake' },
      { name: 'Orem', county: 'Utah' },
      { name: 'Sandy', county: 'Salt Lake' },
      { name: 'Ogden', county: 'Weber' }
    ]
  },
  AR: {
    cities: [
      { name: 'Little Rock', county: 'Pulaski' },
      { name: 'Fort Smith', county: 'Sebastian' },
      { name: 'Fayetteville', county: 'Washington' },
      { name: 'Springdale', county: 'Washington' },
      { name: 'Jonesboro', county: 'Craighead' },
      { name: 'North Little Rock', county: 'Pulaski' }
    ]
  },
  IA: {
    cities: [
      { name: 'Des Moines', county: 'Polk' },
      { name: 'Cedar Rapids', county: 'Linn' },
      { name: 'Davenport', county: 'Scott' },
      { name: 'Sioux City', county: 'Woodbury' },
      { name: 'Iowa City', county: 'Johnson' },
      { name: 'Waterloo', county: 'Black Hawk' }
    ]
  },
  KS: {
    cities: [
      { name: 'Wichita', county: 'Sedgwick' },
      { name: 'Overland Park', county: 'Johnson' },
      { name: 'Kansas City', county: 'Wyandotte' },
      { name: 'Olathe', county: 'Johnson' },
      { name: 'Topeka', county: 'Shawnee' },
      { name: 'Lawrence', county: 'Douglas' }
    ]
  },
  NE: {
    cities: [
      { name: 'Omaha', county: 'Douglas' },
      { name: 'Lincoln', county: 'Lancaster' },
      { name: 'Bellevue', county: 'Sarpy' },
      { name: 'Grand Island', county: 'Hall' }
    ]
  },
  ID: {
    cities: [
      { name: 'Boise', county: 'Ada' },
      { name: 'Meridian', county: 'Ada' },
      { name: 'Nampa', county: 'Canyon' },
      { name: 'Idaho Falls', county: 'Bonneville' },
      { name: 'Pocatello', county: 'Bannock' },
      { name: 'Caldwell', county: 'Canyon' }
    ]
  },
  CT: {
    cities: [
      { name: 'Bridgeport', county: 'Fairfield' },
      { name: 'New Haven', county: 'New Haven' },
      { name: 'Stamford', county: 'Fairfield' },
      { name: 'Hartford', county: 'Hartford' },
      { name: 'Waterbury', county: 'New Haven' },
      { name: 'Norwalk', county: 'Fairfield' }
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
  console.log('Starting jurisdiction population for remaining US states...\n');

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
    console.log(`  - Added ${data.cities.length} cities across ${stateCounties.size} counties`);
  }

  console.log(`\nTotal entries to insert: ${rows.length} cities across ${totalCounties.size} counties`);
  console.log(`States covered: ${Object.keys(jurisdictionData).length}`);

  // Insert into BigQuery
  try {
    await bigquery
      .dataset(datasetId)
      .table('city_county_mapping')
      .insert(rows);

    console.log('\n✅ Successfully inserted all jurisdiction data!');

    // Show summary
    console.log('\n📊 Summary by state:');
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
