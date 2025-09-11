const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery client
const bigquery = new BigQuery({
  projectId: 'greywater-prospects-2025',
});

// All 50 US States with their abbreviations and FIPS codes
const US_STATES = [
  { state_name: 'Alabama', state_code: 'AL', fips_code: '01', capital: 'Montgomery', region: 'South' },
  { state_name: 'Alaska', state_code: 'AK', fips_code: '02', capital: 'Juneau', region: 'West' },
  { state_name: 'Arizona', state_code: 'AZ', fips_code: '04', capital: 'Phoenix', region: 'West' },
  { state_name: 'Arkansas', state_code: 'AR', fips_code: '05', capital: 'Little Rock', region: 'South' },
  { state_name: 'California', state_code: 'CA', fips_code: '06', capital: 'Sacramento', region: 'West' },
  { state_name: 'Colorado', state_code: 'CO', fips_code: '08', capital: 'Denver', region: 'West' },
  { state_name: 'Connecticut', state_code: 'CT', fips_code: '09', capital: 'Hartford', region: 'Northeast' },
  { state_name: 'Delaware', state_code: 'DE', fips_code: '10', capital: 'Dover', region: 'South' },
  { state_name: 'Florida', state_code: 'FL', fips_code: '12', capital: 'Tallahassee', region: 'South' },
  { state_name: 'Georgia', state_code: 'GA', fips_code: '13', capital: 'Atlanta', region: 'South' },
  { state_name: 'Hawaii', state_code: 'HI', fips_code: '15', capital: 'Honolulu', region: 'West' },
  { state_name: 'Idaho', state_code: 'ID', fips_code: '16', capital: 'Boise', region: 'West' },
  { state_name: 'Illinois', state_code: 'IL', fips_code: '17', capital: 'Springfield', region: 'Midwest' },
  { state_name: 'Indiana', state_code: 'IN', fips_code: '18', capital: 'Indianapolis', region: 'Midwest' },
  { state_name: 'Iowa', state_code: 'IA', fips_code: '19', capital: 'Des Moines', region: 'Midwest' },
  { state_name: 'Kansas', state_code: 'KS', fips_code: '20', capital: 'Topeka', region: 'Midwest' },
  { state_name: 'Kentucky', state_code: 'KY', fips_code: '21', capital: 'Frankfort', region: 'South' },
  { state_name: 'Louisiana', state_code: 'LA', fips_code: '22', capital: 'Baton Rouge', region: 'South' },
  { state_name: 'Maine', state_code: 'ME', fips_code: '23', capital: 'Augusta', region: 'Northeast' },
  { state_name: 'Maryland', state_code: 'MD', fips_code: '24', capital: 'Annapolis', region: 'South' },
  { state_name: 'Massachusetts', state_code: 'MA', fips_code: '25', capital: 'Boston', region: 'Northeast' },
  { state_name: 'Michigan', state_code: 'MI', fips_code: '26', capital: 'Lansing', region: 'Midwest' },
  { state_name: 'Minnesota', state_code: 'MN', fips_code: '27', capital: 'St. Paul', region: 'Midwest' },
  { state_name: 'Mississippi', state_code: 'MS', fips_code: '28', capital: 'Jackson', region: 'South' },
  { state_name: 'Missouri', state_code: 'MO', fips_code: '29', capital: 'Jefferson City', region: 'Midwest' },
  { state_name: 'Montana', state_code: 'MT', fips_code: '30', capital: 'Helena', region: 'West' },
  { state_name: 'Nebraska', state_code: 'NE', fips_code: '31', capital: 'Lincoln', region: 'Midwest' },
  { state_name: 'Nevada', state_code: 'NV', fips_code: '32', capital: 'Carson City', region: 'West' },
  { state_name: 'New Hampshire', state_code: 'NH', fips_code: '33', capital: 'Concord', region: 'Northeast' },
  { state_name: 'New Jersey', state_code: 'NJ', fips_code: '34', capital: 'Trenton', region: 'Northeast' },
  { state_name: 'New Mexico', state_code: 'NM', fips_code: '35', capital: 'Santa Fe', region: 'West' },
  { state_name: 'New York', state_code: 'NY', fips_code: '36', capital: 'Albany', region: 'Northeast' },
  { state_name: 'North Carolina', state_code: 'NC', fips_code: '37', capital: 'Raleigh', region: 'South' },
  { state_name: 'North Dakota', state_code: 'ND', fips_code: '38', capital: 'Bismarck', region: 'Midwest' },
  { state_name: 'Ohio', state_code: 'OH', fips_code: '39', capital: 'Columbus', region: 'Midwest' },
  { state_name: 'Oklahoma', state_code: 'OK', fips_code: '40', capital: 'Oklahoma City', region: 'South' },
  { state_name: 'Oregon', state_code: 'OR', fips_code: '41', capital: 'Salem', region: 'West' },
  { state_name: 'Pennsylvania', state_code: 'PA', fips_code: '42', capital: 'Harrisburg', region: 'Northeast' },
  { state_name: 'Rhode Island', state_code: 'RI', fips_code: '44', capital: 'Providence', region: 'Northeast' },
  { state_name: 'South Carolina', state_code: 'SC', fips_code: '45', capital: 'Columbia', region: 'South' },
  { state_name: 'South Dakota', state_code: 'SD', fips_code: '46', capital: 'Pierre', region: 'Midwest' },
  { state_name: 'Tennessee', state_code: 'TN', fips_code: '47', capital: 'Nashville', region: 'South' },
  { state_name: 'Texas', state_code: 'TX', fips_code: '48', capital: 'Austin', region: 'South' },
  { state_name: 'Utah', state_code: 'UT', fips_code: '49', capital: 'Salt Lake City', region: 'West' },
  { state_name: 'Vermont', state_code: 'VT', fips_code: '50', capital: 'Montpelier', region: 'Northeast' },
  { state_name: 'Virginia', state_code: 'VA', fips_code: '51', capital: 'Richmond', region: 'South' },
  { state_name: 'Washington', state_code: 'WA', fips_code: '53', capital: 'Olympia', region: 'West' },
  { state_name: 'West Virginia', state_code: 'WV', fips_code: '54', capital: 'Charleston', region: 'South' },
  { state_name: 'Wisconsin', state_code: 'WI', fips_code: '55', capital: 'Madison', region: 'Midwest' },
  { state_name: 'Wyoming', state_code: 'WY', fips_code: '56', capital: 'Cheyenne', region: 'West' }
];

async function createStatesTable() {
  try {
    // Build the VALUES clause for CREATE TABLE AS SELECT
    const values = US_STATES.map((s, i) => {
      if (i === 0) {
        return `SELECT '${s.state_name}' as state_name, '${s.state_code}' as state_code, '${s.fips_code}' as fips_code, '${s.capital}' as capital, '${s.region}' as region`;
      }
      return `UNION ALL SELECT '${s.state_name}', '${s.state_code}', '${s.fips_code}', '${s.capital}', '${s.region}'`;
    }).join('\n      ');
    
    const createTableQuery = `
      CREATE OR REPLACE TABLE \`greywater-prospects-2025.us_geography.states\` AS
      ${values}
    `;
    
    console.log('Creating states table with all 50 states...');
    const [job] = await bigquery.createQueryJob({ query: createTableQuery });
    await job.getQueryResults();
    console.log(`Successfully created states table with ${US_STATES.length} states`);
  } catch (error) {
    console.error('Error creating states table:', error);
  }
}

async function createCountiesTable() {
  const dataset = bigquery.dataset('us_geography');
  const table = dataset.table('counties');
  
  const schema = [
    { name: 'county_name', type: 'STRING', mode: 'REQUIRED' },
    { name: 'state_code', type: 'STRING', mode: 'REQUIRED' },
    { name: 'state_name', type: 'STRING', mode: 'REQUIRED' },
    { name: 'county_fips', type: 'STRING', mode: 'REQUIRED' },
    { name: 'state_fips', type: 'STRING', mode: 'REQUIRED' },
  ];

  try {
    // Check if table exists
    const [exists] = await table.exists();
    
    if (!exists) {
      // Create table
      await table.create({ schema });
      console.log('Counties table created');
    } else {
      console.log('Counties table already exists');
    }

    // We'll load counties from a public dataset
    // For now, let's create the table structure
    console.log('Counties table ready for data import');
  } catch (error) {
    console.error('Error with counties table:', error);
  }
}

async function loadCountiesFromPublicDataset() {
  try {
    // Query to copy county data from BigQuery public dataset with state mapping
    const query = `
      CREATE OR REPLACE TABLE \`greywater-prospects-2025.us_geography.counties\` AS
      WITH state_mapping AS (
        SELECT * FROM \`greywater-prospects-2025.us_geography.states\`
      )
      SELECT 
        c.county_name,
        c.state_fips_code as state_fips,
        c.county_fips_code as county_fips,
        s.state_name,
        s.state_code,
        c.geo_id,
        c.area_land_meters,
        c.area_water_meters,
        c.county_geom as geometry
      FROM \`bigquery-public-data.geo_us_boundaries.counties\` c
      LEFT JOIN state_mapping s ON c.state_fips_code = s.fips_code
      WHERE c.state_fips_code IS NOT NULL
        AND c.state_fips_code NOT IN ('72', '78', '66', '69', '60') -- Exclude territories
    `;

    const options = {
      query: query,
      location: 'US',
    };

    console.log('Loading counties from public dataset...');
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    console.log('Counties data loaded successfully');
  } catch (error) {
    console.error('Error loading counties from public dataset:', error);
  }
}

async function main() {
  console.log('Starting US Geography data load...');
  
  // Create and load states table
  await createStatesTable();
  
  // Create counties table structure
  await createCountiesTable();
  
  // Load counties from public dataset
  await loadCountiesFromPublicDataset();
  
  console.log('Done!');
}

main().catch(console.error);