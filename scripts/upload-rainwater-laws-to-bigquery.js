const { BigQuery } = require('@google-cloud/bigquery');
const fs = require('fs');
const path = require('path');

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

// State code mapping
const stateNameToCode = {
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

async function uploadRainwaterLaws() {
  console.log('📊 Uploading rainwater laws to BigQuery...\n');

  try {
    // Read the JSON file
    const jsonPath = path.join(__dirname, '..', 'rainwater-state-directory.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(rawData);

    console.log(`📄 Loaded ${Object.keys(data.states).length} states from rainwater-state-directory.json\n`);

    // Transform data for BigQuery
    const rows = Object.entries(data.states).map(([stateName, stateData]) => {
      const stateCode = stateNameToCode[stateName];
      return {
        state_code: stateCode,
        state_name: stateName,
        jurisdiction_id: `${stateCode}_STATE`,
        resource_type: 'rainwater',
        legal_status: stateData.legalStatus,
        governing_code: stateData.governingCode,
        permit_threshold_gpd: null, // Not applicable for rainwater in same way
        collection_limit_gallons: stateData.collectionLimit,
        permit_required: stateData.permitRequired,
        potable_use_allowed: stateData.potableUseAllowed,
        indoor_use_allowed: stateData.nonPotableUseAllowed, // Map to existing field
        outdoor_use_allowed: stateData.nonPotableUseAllowed,
        approved_uses: stateData.approvedUses || [],
        key_restrictions: stateData.keyRestrictions || [],
        recent_changes: stateData.recentChanges,
        primary_agency: stateData.primaryAgency,
        agency_contact: stateData.agencyContact,
        agency_phone: stateData.agencyPhone,
        government_website: stateData.governmentWebsite,
        regulatory_classification: stateData.regulatoryClassification,
        tax_incentives: stateData.taxIncentives,
        summary: stateData.summary,
        permit_explanation: null, // To be added later
        permit_process: null // To be added later
      };
    });

    console.log(`🔄 Transformed ${rows.length} rows for upload\n`);

    // Insert into greywater_laws table (it now supports multiple resource types)
    const table = bigquery.dataset(datasetId).table('greywater_laws');

    // First, delete any existing rainwater entries
    console.log('🗑️  Removing any existing rainwater entries...');
    try {
      await bigquery.query({
        query: `DELETE FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\` WHERE resource_type = 'rainwater'`,
        location: 'US'
      });
      console.log('   ✅ Existing rainwater entries removed\n');
    } catch (e) {
      console.log('   ℹ️  No existing rainwater entries to remove\n');
    }

    // Insert new rows
    console.log('📤 Inserting rainwater laws...');

    // BigQuery streaming insert
    const insertResult = await table.insert(rows, {
      skipInvalidRows: false,
      ignoreUnknownValues: true
    });

    console.log(`   ✅ Inserted ${rows.length} rainwater law entries\n`);

    // Verify the upload
    console.log('🔍 Verifying upload...');
    const [verifyRows] = await bigquery.query({
      query: `
        SELECT resource_type, COUNT(*) as count
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
        GROUP BY resource_type
        ORDER BY resource_type
      `,
      location: 'US'
    });

    console.log('\n📋 Laws by resource_type:');
    verifyRows.forEach(row => {
      console.log(`   ${row.resource_type}: ${row.count} entries`);
    });

    // Show sample data
    console.log('\n📋 Sample rainwater entries:');
    const [sampleRows] = await bigquery.query({
      query: `
        SELECT state_name, legal_status, regulatory_classification, collection_limit_gallons, tax_incentives
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
        WHERE resource_type = 'rainwater'
        ORDER BY state_name
        LIMIT 10
      `,
      location: 'US'
    });

    sampleRows.forEach(row => {
      const incentive = row.tax_incentives ? '💰' : '';
      const limit = row.collection_limit_gallons ? `(${row.collection_limit_gallons} gal limit)` : '';
      console.log(`   ${row.state_name}: ${row.legal_status} - ${row.regulatory_classification} ${limit} ${incentive}`);
    });

    console.log('\n✅ Rainwater laws upload complete!');

  } catch (error) {
    console.error('❌ Error:', error);
    if (error.errors) {
      console.error('Insert errors:', JSON.stringify(error.errors, null, 2));
    }
    throw error;
  }
}

uploadRainwaterLaws();
