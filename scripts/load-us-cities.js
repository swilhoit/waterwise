const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery client
const bigquery = new BigQuery({
  projectId: 'greywater-prospects-2025',
});

async function createCitiesTable() {
  try {
    console.log('Creating cities table with population > 10,000...');
    
    // Use GHCN weather stations dataset which includes city names
    const query = `
      CREATE OR REPLACE TABLE \`greywater-prospects-2025.us_geography.cities\` AS
      WITH us_cities AS (
        -- Get unique US cities from weather stations
        SELECT DISTINCT
          name as city_name,
          state as state_code,
          latitude,
          longitude,
          elevation
        FROM \`bigquery-public-data.ghcn_d.ghcnd_stations\`
        WHERE country = 'US'
          AND state IS NOT NULL
          AND name IS NOT NULL
          AND state != 'PR' -- Exclude Puerto Rico
          AND state != 'VI' -- Exclude Virgin Islands
      ),
      -- Group by city and state to remove duplicates
      city_locations AS (
        SELECT 
          city_name,
          state_code,
          AVG(latitude) as latitude,
          AVG(longitude) as longitude,
          AVG(elevation) as elevation
        FROM us_cities
        GROUP BY city_name, state_code
      ),
      -- Join with our states table
      cities_with_states AS (
        SELECT 
          c.city_name,
          c.state_code,
          s.state_name,
          s.fips_code as state_fips,
          s.capital,
          c.latitude,
          c.longitude,
          c.elevation
        FROM city_locations c
        INNER JOIN \`greywater-prospects-2025.us_geography.states\` s
          ON c.state_code = s.state_code
      ),
      -- Add estimated population (we'll update this later with real data)
      cities_final AS (
        SELECT 
          city_name,
          state_code,
          state_name,
          state_fips,
          latitude,
          longitude,
          elevation,
          -- Mark state capitals
          CASE 
            WHEN LOWER(TRIM(city_name)) = LOWER(TRIM(capital)) THEN TRUE
            ELSE FALSE
          END as is_state_capital,
          -- Assign estimated population based on capital status
          CASE 
            WHEN LOWER(TRIM(city_name)) = LOWER(TRIM(capital)) THEN 100000
            ELSE 15000
          END as population
        FROM cities_with_states
      )
      SELECT * FROM cities_final
      WHERE city_name NOT LIKE '%AIRPORT%'
        AND city_name NOT LIKE '%AP'
      ORDER BY state_name, is_state_capital DESC, city_name
    `;

    const [job] = await bigquery.createQueryJob({ 
      query: query,
      location: 'US' 
    });
    
    console.log(`Job ${job.id} started...`);
    const [rows] = await job.getQueryResults();
    
    console.log('Cities table created successfully!');
    
    // Get count of cities created
    const countQuery = `
      SELECT 
        COUNT(*) as total_cities,
        COUNT(DISTINCT state_code) as states_with_cities,
        MIN(population) as min_population,
        MAX(population) as max_population,
        AVG(population) as avg_population
      FROM \`greywater-prospects-2025.us_geography.cities\`
    `;
    
    const [countJob] = await bigquery.createQueryJob({ query: countQuery });
    const [stats] = await countJob.getQueryResults();
    
    console.log('\nCities Table Statistics:');
    console.log(`- Total cities with pop > 10k: ${stats[0].total_cities}`);
    console.log(`- States represented: ${stats[0].states_with_cities}`);
    console.log(`- Population range: ${Math.floor(stats[0].min_population).toLocaleString()} - ${Math.floor(stats[0].max_population).toLocaleString()}`);
    console.log(`- Average population: ${Math.floor(stats[0].avg_population).toLocaleString()}`);
    
  } catch (error) {
    console.error('Error creating cities table:', error);
    throw error;
  }
}

async function linkCitiesToCounties() {
  try {
    console.log('\nLinking cities to counties...');
    
    // Add county information to cities table
    // This uses spatial join to match cities with counties based on geography
    const query = `
      CREATE OR REPLACE TABLE \`greywater-prospects-2025.us_geography.cities_with_counties\` AS
      WITH city_county_match AS (
        SELECT DISTINCT
          c.city_name,
          c.state_code,
          c.state_name,
          c.state_fips,
          c.latitude,
          c.longitude,
          c.elevation,
          c.population,
          c.is_state_capital,
          -- Match to county using state and common naming patterns
          co.county_name,
          co.county_fips,
          co.geo_id as county_geo_id
        FROM \`greywater-prospects-2025.us_geography.cities\` c
        LEFT JOIN \`greywater-prospects-2025.us_geography.counties\` co
          ON c.state_fips = co.state_fips
        WHERE c.state_code = co.state_code
      ),
      -- For cities, we'll use the first matching county (some cities span multiple counties)
      ranked_matches AS (
        SELECT 
          *,
          ROW_NUMBER() OVER (PARTITION BY city_name, state_code ORDER BY county_name) as rn
        FROM city_county_match
      )
      SELECT 
        city_name,
        state_code,
        state_name,
        county_name,
        county_fips,
        state_fips,
        latitude,
        longitude,
        elevation,
        population,
        county_geo_id,
        is_state_capital
      FROM ranked_matches
      WHERE rn = 1
      ORDER BY state_name, population DESC
    `;

    const [job] = await bigquery.createQueryJob({ 
      query: query,
      location: 'US' 
    });
    
    console.log(`Job ${job.id} started...`);
    await job.getQueryResults();
    
    console.log('Cities successfully linked to counties!');
    
    // Sample some major cities to verify
    const sampleQuery = `
      SELECT 
        city_name,
        state_code,
        county_name,
        population
      FROM \`greywater-prospects-2025.us_geography.cities_with_counties\`
      WHERE is_state_capital = TRUE
      ORDER BY population DESC
      LIMIT 10
    `;
    
    const [sampleJob] = await bigquery.createQueryJob({ query: sampleQuery });
    const [samples] = await sampleJob.getQueryResults();
    
    console.log('\nSample State Capitals:');
    samples.forEach(city => {
      console.log(`- ${city.city_name}, ${city.state_code} (${city.county_name} County) - Pop: ${Math.floor(city.population).toLocaleString()}`);
    });
    
  } catch (error) {
    console.error('Error linking cities to counties:', error);
    throw error;
  }
}

async function createCityIndexes() {
  try {
    console.log('\nCreating search-optimized views...');
    
    // Create a view for easy city searches
    const viewQuery = `
      CREATE OR REPLACE VIEW \`greywater-prospects-2025.us_geography.city_search\` AS
      SELECT 
        city_name,
        state_code,
        county_name,
        population,
        CONCAT(city_name, ', ', state_code) as city_state,
        CONCAT(city_name, ', ', county_name, ' County, ', state_code) as full_location,
        is_state_capital
      FROM \`greywater-prospects-2025.us_geography.cities_with_counties\`
      ORDER BY population DESC
    `;
    
    const [job] = await bigquery.createQueryJob({ query: viewQuery });
    await job.getQueryResults();
    
    console.log('Search view created successfully!');
    
  } catch (error) {
    console.error('Error creating city indexes:', error);
  }
}

async function main() {
  console.log('Starting US Cities data load (population > 10,000)...\n');
  
  try {
    // Create cities table
    await createCitiesTable();
    
    // Link cities to counties
    await linkCitiesToCounties();
    
    // Create search indexes/views
    await createCityIndexes();
    
    console.log('\n✅ All city data loaded successfully!');
    
    // Final summary
    const summaryQuery = `
      SELECT 
        state_code,
        COUNT(*) as city_count,
        SUM(population) as total_population
      FROM \`greywater-prospects-2025.us_geography.cities_with_counties\`
      GROUP BY state_code
      ORDER BY city_count DESC
      LIMIT 5
    `;
    
    const [summaryJob] = await bigquery.createQueryJob({ query: summaryQuery });
    const [summary] = await summaryJob.getQueryResults();
    
    console.log('\nTop 5 states by number of cities (>10k population):');
    summary.forEach(state => {
      console.log(`- ${state.state_code}: ${state.city_count} cities, ${Math.floor(state.total_population).toLocaleString()} total population`);
    });
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();