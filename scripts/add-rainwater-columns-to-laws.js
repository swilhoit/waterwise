const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

async function addRainwaterColumns() {
  console.log('📊 Adding rainwater-specific columns to greywater_laws table...\n');

  const columnsToAdd = [
    { name: 'collection_limit_gallons', type: 'INTEGER' },
    { name: 'potable_use_allowed', type: 'BOOLEAN' },
    { name: 'tax_incentives', type: 'STRING' }
  ];

  for (const col of columnsToAdd) {
    console.log(`➕ Adding ${col.name} column...`);
    try {
      await bigquery.query({
        query: `
          ALTER TABLE \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
          ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}
        `,
        location: 'US'
      });
      console.log(`   ✅ ${col.name} column added`);
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log(`   ℹ️  ${col.name} column already exists`);
      } else {
        console.error(`   ❌ Error adding ${col.name}:`, e.message);
      }
    }
  }

  console.log('\n✅ Schema update complete!');
}

addRainwaterColumns();
