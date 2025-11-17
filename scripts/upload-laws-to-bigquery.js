const fs = require('fs');
const { BigQuery } = require('@google-cloud/bigquery');

// Read the JSON file
const stateData = JSON.parse(
  fs.readFileSync('./greywater-state-directory.json', 'utf8')
);

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';
const tableId = 'greywater_laws';

// Transform the JSON data into rows
const rows = [];

Object.entries(stateData.states).forEach(([stateName, stateInfo]) => {
  // Get state code from state name
  const stateCodes = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
    'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
    'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
    'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
    'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
    'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
    'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
    'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
    'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
    'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
    'Wisconsin': 'WI', 'Wyoming': 'WY'
  };

  const stateCode = stateCodes[stateName];

  rows.push({
    state_code: stateCode,
    state_name: stateName,
    jurisdiction_id: `${stateCode}_STATE`,
    legal_status: stateInfo.legalStatus,
    governing_code: stateInfo.governingCode,
    permit_threshold_gpd: stateInfo.permitThresholdGpd,
    permit_required: stateInfo.permitRequired,
    indoor_use_allowed: stateInfo.indoorUseAllowed,
    outdoor_use_allowed: stateInfo.outdoorUseAllowed,
    approved_uses: stateInfo.approvedUses,
    key_restrictions: stateInfo.keyRestrictions,
    recent_changes: stateInfo.recentChanges,
    primary_agency: stateInfo.primaryAgency,
    agency_contact: stateInfo.agencyContact,
    agency_phone: stateInfo.agencyPhone,
    government_website: stateInfo.governmentWebsite,
    regulatory_classification: stateInfo.regulatoryClassification,
    summary: stateInfo.summary
  });
});

// Define the schema
const schema = [
  { name: 'state_code', type: 'STRING', mode: 'REQUIRED' },
  { name: 'state_name', type: 'STRING', mode: 'REQUIRED' },
  { name: 'jurisdiction_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'legal_status', type: 'STRING', mode: 'NULLABLE' },
  { name: 'governing_code', type: 'STRING', mode: 'NULLABLE' },
  { name: 'permit_threshold_gpd', type: 'INTEGER', mode: 'NULLABLE' },
  { name: 'permit_required', type: 'STRING', mode: 'NULLABLE' },
  { name: 'indoor_use_allowed', type: 'BOOLEAN', mode: 'NULLABLE' },
  { name: 'outdoor_use_allowed', type: 'BOOLEAN', mode: 'NULLABLE' },
  { name: 'approved_uses', type: 'STRING', mode: 'REPEATED' },
  { name: 'key_restrictions', type: 'STRING', mode: 'REPEATED' },
  { name: 'recent_changes', type: 'STRING', mode: 'NULLABLE' },
  { name: 'primary_agency', type: 'STRING', mode: 'NULLABLE' },
  { name: 'agency_contact', type: 'STRING', mode: 'NULLABLE' },
  { name: 'agency_phone', type: 'STRING', mode: 'NULLABLE' },
  { name: 'government_website', type: 'STRING', mode: 'NULLABLE' },
  { name: 'regulatory_classification', type: 'STRING', mode: 'NULLABLE' },
  { name: 'summary', type: 'STRING', mode: 'NULLABLE' }
];

async function uploadData() {
  try {
    console.log(`Creating table ${datasetId}.${tableId}...`);

    // Check if table exists and delete it
    try {
      await bigquery.dataset(datasetId).table(tableId).delete();
      console.log('Existing table deleted');
    } catch (error) {
      // Table doesn't exist, that's fine
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
    const query = `SELECT state_code, state_name, legal_status FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${datasetId}.${tableId}\` ORDER BY state_name LIMIT 5`;
    const [queryRows] = await bigquery.query(query);

    console.log('\nSample data:');
    console.table(queryRows);

  } catch (error) {
    console.error('Error uploading data:', error);
    throw error;
  }
}

uploadData();
