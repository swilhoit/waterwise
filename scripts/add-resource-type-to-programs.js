const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

async function addResourceTypeColumn() {
  console.log('📊 Adding resource_type and program_subtype columns to programs_master...\n');

  try {
    // Step 1: Add resource_type column
    console.log('1️⃣ Adding resource_type column...');
    try {
      await bigquery.query({
        query: `
          ALTER TABLE \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.programs_master\`
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

    // Step 2: Add program_subtype column (for conservation categories)
    console.log('\n2️⃣ Adding program_subtype column...');
    try {
      await bigquery.query({
        query: `
          ALTER TABLE \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.programs_master\`
          ADD COLUMN IF NOT EXISTS program_subtype STRING
        `,
        location: 'US'
      });
      console.log('   ✅ program_subtype column added');
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log('   ℹ️  program_subtype column already exists');
      } else {
        throw e;
      }
    }

    // Step 3: Add water_utility column (for conservation programs)
    console.log('\n3️⃣ Adding water_utility column...');
    try {
      await bigquery.query({
        query: `
          ALTER TABLE \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.programs_master\`
          ADD COLUMN IF NOT EXISTS water_utility STRING
        `,
        location: 'US'
      });
      console.log('   ✅ water_utility column added');
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log('   ℹ️  water_utility column already exists');
      } else {
        throw e;
      }
    }

    // Step 4: Update all existing programs to have resource_type = 'greywater'
    console.log('\n4️⃣ Setting resource_type = "greywater" for all existing programs...');
    const [updateResult] = await bigquery.query({
      query: `
        UPDATE \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.programs_master\`
        SET resource_type = 'greywater'
        WHERE resource_type IS NULL
      `,
      location: 'US'
    });
    console.log('   ✅ Existing programs updated with resource_type = "greywater"');

    // Step 5: Verify the changes
    console.log('\n5️⃣ Verifying changes...');
    const [rows] = await bigquery.query({
      query: `
        SELECT
          resource_type,
          COUNT(*) as count
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.programs_master\`
        GROUP BY resource_type
      `,
      location: 'US'
    });

    console.log('\n📋 Programs by resource_type:');
    rows.forEach(row => {
      console.log(`   ${row.resource_type || 'NULL'}: ${row.count} programs`);
    });

    console.log('\n✅ Schema migration complete!');
    console.log('\nNew columns added:');
    console.log('   - resource_type: greywater | rainwater | conservation');
    console.log('   - program_subtype: turf_removal | smart_irrigation | efficient_fixtures | etc.');
    console.log('   - water_utility: Sponsoring utility name');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

addResourceTypeColumn();
