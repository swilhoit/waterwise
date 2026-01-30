const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

async function fixCaliforniaRainwater() {
  console.log('🔧 Fixing California rainwater data in BigQuery...\n');

  try {
    // First, check current state
    console.log('📊 Checking current California entries...');
    const [currentRows] = await bigquery.query({
      query: `
        SELECT state_code, state_name, resource_type, legal_status
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
        WHERE state_code = 'CA'
        ORDER BY resource_type
      `,
      location: 'US'
    });

    console.log('Current CA entries:');
    currentRows.forEach(row => {
      console.log(`  - ${row.resource_type}: ${row.legal_status}`);
    });

    // Check if there's a duplicate greywater entry
    const greyWaterCount = currentRows.filter(r => r.resource_type === 'greywater').length;
    const rainwaterCount = currentRows.filter(r => r.resource_type === 'rainwater').length;

    console.log(`\nGreywater entries: ${greyWaterCount}, Rainwater entries: ${rainwaterCount}`);

    if (greyWaterCount > 1) {
      console.log('\n🗑️  Removing duplicate greywater entry...');
      // Delete one of the duplicates by keeping only distinct rows
      await bigquery.query({
        query: `
          DELETE FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
          WHERE state_code = 'CA' AND resource_type = 'greywater'
          AND jurisdiction_id NOT IN (
            SELECT MIN(jurisdiction_id)
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
            WHERE state_code = 'CA' AND resource_type = 'greywater'
          )
        `,
        location: 'US'
      });
      console.log('   ✅ Duplicate removed');
    }

    if (rainwaterCount === 0) {
      console.log('\n📤 Inserting California rainwater data...');

      // California rainwater data from research
      const californiaRainwater = {
        state_code: 'CA',
        state_name: 'California',
        jurisdiction_id: 'CA_STATE_RAINWATER',
        resource_type: 'rainwater',
        legal_status: 'Legal',
        governing_code: 'Rainwater Capture Act of 2012, California Water Code §10570-10574, California Plumbing Code Chapter 16',
        permit_threshold_gpd: null,
        collection_limit_gallons: null,
        permit_required: 'Tiered',
        permit_explanation: 'NO PERMIT NEEDED for most residential systems. Rain barrels and cisterns under 5,000 gallons for outdoor use require no permit. Systems over 2,500 gallons may need Division of Drinking Water permits. Indoor non-potable use requires plumbing permits.',
        permit_process: '1. Small outdoor systems (under 5,000 gal): No permit required. 2. Larger systems: Contact local building department. 3. Potable use: Apply to Division of Drinking Water.',
        indoor_use_allowed: true,
        outdoor_use_allowed: true,
        potable_use_allowed: true,
        approved_uses: ['Landscape irrigation', 'Garden watering', 'Toilet flushing', 'Laundry', 'Car washing', 'Ornamental water features', 'Potable with DDW approval'],
        key_restrictions: [
          'Systems under 5,000 gallons for non-spray outdoor use - no permit',
          'Spray irrigation systems up to 360 gallons - no permit',
          'Indoor non-potable requires 100-micron filter and debris excluder',
          'Potable use requires DDW permit and treatment',
          'Property tax exempt for systems built after Jan 1, 2019 (Prop 72)'
        ],
        recent_changes: 'SB-558 (2018) exempted rainwater systems from property taxes. Prop 72 codified this exemption.',
        primary_agency: 'State Water Resources Control Board',
        agency_contact: 'waterboards.ca.gov',
        agency_phone: '916-341-5250',
        government_website: 'https://www.waterboards.ca.gov/',
        regulatory_classification: 'Comprehensive Framework',
        tax_incentives: 'Property tax exemption for rainwater systems (Prop 72). Many local water agencies offer rebates $50-$500 for rain barrels.',
        summary: 'California strongly encourages rainwater harvesting through the Rainwater Capture Act of 2012. Most residential systems require no permit - rain barrels and cisterns under 5,000 gallons for outdoor non-potable use are permit-free. Indoor non-potable use (toilets, laundry) is allowed with proper filtration per Plumbing Code Chapter 16. Potable use is allowed but requires Division of Drinking Water approval. Prop 72 provides property tax exemption for rainwater systems installed after 2019. Many local water districts offer rebates.'
      };

      const table = bigquery.dataset(datasetId).table('greywater_laws');
      await table.insert([californiaRainwater], {
        skipInvalidRows: false,
        ignoreUnknownValues: true
      });

      console.log('   ✅ California rainwater data inserted');
    } else {
      console.log('\n✅ California rainwater entry already exists');
    }

    // Verify final state
    console.log('\n📋 Final verification:');
    const [finalRows] = await bigquery.query({
      query: `
        SELECT state_code, resource_type, legal_status, LEFT(summary, 80) as summary_preview
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
        WHERE state_code = 'CA'
        ORDER BY resource_type
      `,
      location: 'US'
    });

    finalRows.forEach(row => {
      console.log(`  ${row.resource_type}: ${row.legal_status}`);
      console.log(`    "${row.summary_preview}..."`);
    });

    console.log('\n✅ California rainwater fix complete!');

  } catch (error) {
    console.error('❌ Error:', error);
    if (error.errors) {
      console.error('Insert errors:', JSON.stringify(error.errors, null, 2));
    }
    throw error;
  }
}

fixCaliforniaRainwater();
