const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

async function addResourceTypeToLaws() {
  console.log('📊 Adding resource_type column to greywater_laws table...\n');

  try {
    // Step 1: Add resource_type column
    console.log('1️⃣ Adding resource_type column...');
    try {
      await bigquery.query({
        query: `
          ALTER TABLE \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
          ADD COLUMN IF NOT EXISTS resource_type STRING
        `,
        location: 'US'
      });
      console.log('   ✅ resource_type column added');
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log('   ℹ️  resource_type column already exists');
      } else {
        throw e;
      }
    }

    // Step 2: Update all existing laws to have resource_type = 'greywater'
    console.log('\n2️⃣ Setting resource_type = "greywater" for all existing laws...');
    await bigquery.query({
      query: `
        UPDATE \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
        SET resource_type = 'greywater'
        WHERE resource_type IS NULL
      `,
      location: 'US'
    });
    console.log('   ✅ Existing laws updated with resource_type = "greywater"');

    // Step 3: Verify the changes
    console.log('\n3️⃣ Verifying changes...');
    const [rows] = await bigquery.query({
      query: `
        SELECT
          resource_type,
          COUNT(*) as count
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.greywater_laws\`
        GROUP BY resource_type
      `,
      location: 'US'
    });

    console.log('\n📋 Laws by resource_type:');
    rows.forEach(row => {
      console.log(`   ${row.resource_type || 'NULL'}: ${row.count} state laws`);
    });

    console.log('\n✅ greywater_laws schema migration complete!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

addResourceTypeToLaws();
