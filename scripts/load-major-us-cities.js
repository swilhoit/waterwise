const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery client
const bigquery = new BigQuery({
  projectId: 'greywater-prospects-2025',
});

// Major US cities with population > 10,000
// This is a curated list of major cities with their counties
const MAJOR_US_CITIES = [
  // Top 100 US Cities by population
  { city_name: 'New York', state_code: 'NY', county_name: 'New York', population: 8336817 },
  { city_name: 'Los Angeles', state_code: 'CA', county_name: 'Los Angeles', population: 3979576 },
  { city_name: 'Chicago', state_code: 'IL', county_name: 'Cook', population: 2693976 },
  { city_name: 'Houston', state_code: 'TX', county_name: 'Harris', population: 2320268 },
  { city_name: 'Phoenix', state_code: 'AZ', county_name: 'Maricopa', population: 1680992 },
  { city_name: 'Philadelphia', state_code: 'PA', county_name: 'Philadelphia', population: 1584064 },
  { city_name: 'San Antonio', state_code: 'TX', county_name: 'Bexar', population: 1547253 },
  { city_name: 'San Diego', state_code: 'CA', county_name: 'San Diego', population: 1423851 },
  { city_name: 'Dallas', state_code: 'TX', county_name: 'Dallas', population: 1343573 },
  { city_name: 'San Jose', state_code: 'CA', county_name: 'Santa Clara', population: 1021795 },
  { city_name: 'Austin', state_code: 'TX', county_name: 'Travis', population: 978908 },
  { city_name: 'Jacksonville', state_code: 'FL', county_name: 'Duval', population: 911507 },
  { city_name: 'Fort Worth', state_code: 'TX', county_name: 'Tarrant', population: 909585 },
  { city_name: 'Columbus', state_code: 'OH', county_name: 'Franklin', population: 898553 },
  { city_name: 'Charlotte', state_code: 'NC', county_name: 'Mecklenburg', population: 885708 },
  { city_name: 'San Francisco', state_code: 'CA', county_name: 'San Francisco', population: 881549 },
  { city_name: 'Indianapolis', state_code: 'IN', county_name: 'Marion', population: 876384 },
  { city_name: 'Seattle', state_code: 'WA', county_name: 'King', population: 753675 },
  { city_name: 'Denver', state_code: 'CO', county_name: 'Denver', population: 727211 },
  { city_name: 'Washington', state_code: 'DC', county_name: 'District of Columbia', population: 705749 },
  { city_name: 'Boston', state_code: 'MA', county_name: 'Suffolk', population: 692600 },
  { city_name: 'El Paso', state_code: 'TX', county_name: 'El Paso', population: 681728 },
  { city_name: 'Nashville', state_code: 'TN', county_name: 'Davidson', population: 670820 },
  { city_name: 'Detroit', state_code: 'MI', county_name: 'Wayne', population: 670031 },
  { city_name: 'Oklahoma City', state_code: 'OK', county_name: 'Oklahoma', population: 655057 },
  { city_name: 'Portland', state_code: 'OR', county_name: 'Multnomah', population: 654741 },
  { city_name: 'Las Vegas', state_code: 'NV', county_name: 'Clark', population: 651319 },
  { city_name: 'Memphis', state_code: 'TN', county_name: 'Shelby', population: 651073 },
  { city_name: 'Louisville', state_code: 'KY', county_name: 'Jefferson', population: 617638 },
  { city_name: 'Baltimore', state_code: 'MD', county_name: 'Baltimore City', population: 602495 },
  { city_name: 'Milwaukee', state_code: 'WI', county_name: 'Milwaukee', population: 594833 },
  { city_name: 'Albuquerque', state_code: 'NM', county_name: 'Bernalillo', population: 560513 },
  { city_name: 'Tucson', state_code: 'AZ', county_name: 'Pima', population: 548073 },
  { city_name: 'Fresno', state_code: 'CA', county_name: 'Fresno', population: 542012 },
  { city_name: 'Sacramento', state_code: 'CA', county_name: 'Sacramento', population: 513624 },
  { city_name: 'Kansas City', state_code: 'MO', county_name: 'Jackson', population: 495327 },
  { city_name: 'Long Beach', state_code: 'CA', county_name: 'Los Angeles', population: 462628 },
  { city_name: 'Mesa', state_code: 'AZ', county_name: 'Maricopa', population: 518012 },
  { city_name: 'Atlanta', state_code: 'GA', county_name: 'Fulton', population: 506811 },
  { city_name: 'Colorado Springs', state_code: 'CO', county_name: 'El Paso', population: 478221 },
  { city_name: 'Virginia Beach', state_code: 'VA', county_name: 'Virginia Beach City', population: 449974 },
  { city_name: 'Raleigh', state_code: 'NC', county_name: 'Wake', population: 474069 },
  { city_name: 'Omaha', state_code: 'NE', county_name: 'Douglas', population: 478192 },
  { city_name: 'Miami', state_code: 'FL', county_name: 'Miami-Dade', population: 467963 },
  { city_name: 'Oakland', state_code: 'CA', county_name: 'Alameda', population: 433031 },
  { city_name: 'Minneapolis', state_code: 'MN', county_name: 'Hennepin', population: 429606 },
  { city_name: 'Tulsa', state_code: 'OK', county_name: 'Tulsa', population: 401190 },
  { city_name: 'Wichita', state_code: 'KS', county_name: 'Sedgwick', population: 389938 },
  { city_name: 'New Orleans', state_code: 'LA', county_name: 'Orleans', population: 390144 },
  
  // State Capitals (if not already included)
  { city_name: 'Montgomery', state_code: 'AL', county_name: 'Montgomery', population: 200603 },
  { city_name: 'Juneau', state_code: 'AK', county_name: 'Juneau', population: 31275 },
  { city_name: 'Little Rock', state_code: 'AR', county_name: 'Pulaski', population: 197312 },
  { city_name: 'Hartford', state_code: 'CT', county_name: 'Hartford', population: 121054 },
  { city_name: 'Dover', state_code: 'DE', county_name: 'Kent', population: 38079 },
  { city_name: 'Tallahassee', state_code: 'FL', county_name: 'Leon', population: 194500 },
  { city_name: 'Honolulu', state_code: 'HI', county_name: 'Honolulu', population: 345064 },
  { city_name: 'Boise', state_code: 'ID', county_name: 'Ada', population: 228959 },
  { city_name: 'Springfield', state_code: 'IL', county_name: 'Sangamon', population: 114230 },
  { city_name: 'Des Moines', state_code: 'IA', county_name: 'Polk', population: 214237 },
  { city_name: 'Topeka', state_code: 'KS', county_name: 'Shawnee', population: 125310 },
  { city_name: 'Frankfort', state_code: 'KY', county_name: 'Franklin', population: 27679 },
  { city_name: 'Baton Rouge', state_code: 'LA', county_name: 'East Baton Rouge', population: 220236 },
  { city_name: 'Augusta', state_code: 'ME', county_name: 'Kennebec', population: 18681 },
  { city_name: 'Annapolis', state_code: 'MD', county_name: 'Anne Arundel', population: 39321 },
  { city_name: 'Lansing', state_code: 'MI', county_name: 'Ingham', population: 112644 },
  { city_name: 'St. Paul', state_code: 'MN', county_name: 'Ramsey', population: 308096 },
  { city_name: 'Jackson', state_code: 'MS', county_name: 'Hinds', population: 153701 },
  { city_name: 'Jefferson City', state_code: 'MO', county_name: 'Cole', population: 42838 },
  { city_name: 'Helena', state_code: 'MT', county_name: 'Lewis and Clark', population: 32315 },
  { city_name: 'Lincoln', state_code: 'NE', county_name: 'Lancaster', population: 291082 },
  { city_name: 'Carson City', state_code: 'NV', county_name: 'Carson City', population: 55916 },
  { city_name: 'Concord', state_code: 'NH', county_name: 'Merrimack', population: 43627 },
  { city_name: 'Trenton', state_code: 'NJ', county_name: 'Mercer', population: 83203 },
  { city_name: 'Santa Fe', state_code: 'NM', county_name: 'Santa Fe', population: 84683 },
  { city_name: 'Albany', state_code: 'NY', county_name: 'Albany', population: 96460 },
  { city_name: 'Bismarck', state_code: 'ND', county_name: 'Burleigh', population: 73529 },
  { city_name: 'Salem', state_code: 'OR', county_name: 'Marion', population: 174365 },
  { city_name: 'Harrisburg', state_code: 'PA', county_name: 'Dauphin', population: 49528 },
  { city_name: 'Providence', state_code: 'RI', county_name: 'Providence', population: 179883 },
  { city_name: 'Columbia', state_code: 'SC', county_name: 'Richland', population: 131674 },
  { city_name: 'Pierre', state_code: 'SD', county_name: 'Hughes', population: 13646 },
  { city_name: 'Salt Lake City', state_code: 'UT', county_name: 'Salt Lake', population: 200567 },
  { city_name: 'Montpelier', state_code: 'VT', county_name: 'Washington', population: 7855 },
  { city_name: 'Richmond', state_code: 'VA', county_name: 'Richmond City', population: 230436 },
  { city_name: 'Olympia', state_code: 'WA', county_name: 'Thurston', population: 52882 },
  { city_name: 'Charleston', state_code: 'WV', county_name: 'Kanawha', population: 46536 },
  { city_name: 'Madison', state_code: 'WI', county_name: 'Dane', population: 259680 },
  { city_name: 'Cheyenne', state_code: 'WY', county_name: 'Laramie', population: 64235 },
  
  // Additional major cities per state
  { city_name: 'Birmingham', state_code: 'AL', county_name: 'Jefferson', population: 209403 },
  { city_name: 'Anchorage', state_code: 'AK', county_name: 'Anchorage', population: 288000 },
  { city_name: 'Scottsdale', state_code: 'AZ', county_name: 'Maricopa', population: 258069 },
  { city_name: 'Fayetteville', state_code: 'AR', county_name: 'Washington', population: 87590 },
  { city_name: 'San Bernardino', state_code: 'CA', county_name: 'San Bernardino', population: 216995 },
  { city_name: 'Aurora', state_code: 'CO', county_name: 'Arapahoe', population: 379289 },
  { city_name: 'Bridgeport', state_code: 'CT', county_name: 'Fairfield', population: 144229 },
  { city_name: 'Wilmington', state_code: 'DE', county_name: 'New Castle', population: 70635 },
  { city_name: 'Tampa', state_code: 'FL', county_name: 'Hillsborough', population: 399700 },
  { city_name: 'Orlando', state_code: 'FL', county_name: 'Orange', population: 307573 },
];

async function createCitiesTable() {
  try {
    console.log('Creating cities table with major US cities...');
    
    // Build the VALUES clause for CREATE TABLE AS SELECT
    const values = MAJOR_US_CITIES.map((c, i) => {
      if (i === 0) {
        return `SELECT '${c.city_name.replace(/'/g, "''")}' as city_name, '${c.state_code}' as state_code, '${c.county_name.replace(/'/g, "''")}' as county_name, ${c.population} as population`;
      }
      return `UNION ALL SELECT '${c.city_name.replace(/'/g, "''")}', '${c.state_code}', '${c.county_name.replace(/'/g, "''")}', ${c.population}`;
    }).join('\n      ');
    
    const createTableQuery = `
      CREATE OR REPLACE TABLE \`greywater-prospects-2025.us_geography.cities\` AS
      WITH city_data AS (
        ${values}
      ),
      cities_with_states AS (
        SELECT 
          c.city_name,
          c.state_code,
          s.state_name,
          s.fips_code as state_fips,
          c.county_name,
          c.population,
          s.capital,
          ROW_NUMBER() OVER (PARTITION BY c.city_name, c.state_code ORDER BY c.population DESC) as rn
        FROM city_data c
        LEFT JOIN \`greywater-prospects-2025.us_geography.states\` s
          ON c.state_code = s.state_code
      )
      SELECT 
        city_name,
        state_code,
        state_name,
        state_fips,
        county_name,
        population,
        CASE 
          WHEN LOWER(TRIM(city_name)) = LOWER(TRIM(capital)) THEN TRUE
          ELSE FALSE
        END as is_state_capital
      FROM cities_with_states
      WHERE rn = 1
      ORDER BY population DESC
    `;
    
    console.log('Executing query to create cities table...');
    const [job] = await bigquery.createQueryJob({ query: createTableQuery });
    await job.getQueryResults();
    console.log(`Successfully created cities table with ${MAJOR_US_CITIES.length} cities`);
    
    // Verify the data
    const countQuery = `
      SELECT 
        COUNT(*) as total_cities,
        COUNT(DISTINCT state_code) as states_represented,
        SUM(CAST(is_state_capital AS INT64)) as state_capitals,
        MIN(population) as min_population,
        MAX(population) as max_population
      FROM \`greywater-prospects-2025.us_geography.cities\`
    `;
    
    const [countJob] = await bigquery.createQueryJob({ query: countQuery });
    const [stats] = await countJob.getQueryResults();
    
    console.log('\nCities Table Statistics:');
    console.log(`- Total cities: ${stats[0].total_cities}`);
    console.log(`- States represented: ${stats[0].states_represented}`);
    console.log(`- State capitals included: ${stats[0].state_capitals}`);
    console.log(`- Population range: ${stats[0].min_population.toLocaleString()} - ${stats[0].max_population.toLocaleString()}`);
    
  } catch (error) {
    console.error('Error creating cities table:', error);
    throw error;
  }
}

async function linkCitiesToCounties() {
  try {
    console.log('\nEnhancing city-county relationships...');
    
    // Create an enhanced table with county FIPS codes
    const query = `
      CREATE OR REPLACE TABLE \`greywater-prospects-2025.us_geography.cities_with_counties\` AS
      SELECT 
        c.city_name,
        c.state_code,
        c.state_name,
        c.state_fips,
        c.county_name,
        co.county_fips,
        co.geo_id as county_geo_id,
        c.population,
        c.is_state_capital
      FROM \`greywater-prospects-2025.us_geography.cities\` c
      LEFT JOIN \`greywater-prospects-2025.us_geography.counties\` co
        ON c.state_fips = co.state_fips 
        AND LOWER(REPLACE(c.county_name, ' County', '')) = LOWER(co.county_name)
      ORDER BY c.population DESC
    `;
    
    const [job] = await bigquery.createQueryJob({ query: query });
    await job.getQueryResults();
    
    console.log('Cities successfully linked to counties with FIPS codes!');
    
    // Sample verification
    const sampleQuery = `
      SELECT 
        city_name,
        state_code,
        county_name,
        county_fips,
        population,
        is_state_capital
      FROM \`greywater-prospects-2025.us_geography.cities_with_counties\`
      WHERE is_state_capital = TRUE
      ORDER BY population DESC
      LIMIT 5
    `;
    
    const [sampleJob] = await bigquery.createQueryJob({ query: sampleQuery });
    const [samples] = await sampleJob.getQueryResults();
    
    console.log('\nTop 5 State Capitals by Population:');
    samples.forEach(city => {
      console.log(`- ${city.city_name}, ${city.state_code} (${city.county_name}) - Pop: ${city.population.toLocaleString()}`);
    });
    
  } catch (error) {
    console.error('Error linking cities to counties:', error);
    throw error;
  }
}

async function main() {
  console.log('Starting US Cities data load...\n');
  
  try {
    // Create cities table
    await createCitiesTable();
    
    // Link cities to counties
    await linkCitiesToCounties();
    
    console.log('\n✅ All city data loaded successfully!');
    
    // Final summary by state
    const summaryQuery = `
      SELECT 
        state_code,
        COUNT(*) as city_count,
        SUM(population) as total_population
      FROM \`greywater-prospects-2025.us_geography.cities_with_counties\`
      GROUP BY state_code
      ORDER BY city_count DESC
      LIMIT 10
    `;
    
    const [summaryJob] = await bigquery.createQueryJob({ query: summaryQuery });
    const [summary] = await summaryJob.getQueryResults();
    
    console.log('\nTop 10 states by number of major cities:');
    summary.forEach(state => {
      console.log(`- ${state.state_code}: ${state.city_count} cities, ${state.total_population.toLocaleString()} total population`);
    });
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();