const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

// Master programs table with all program details
const programsMasterSchema = [
  { name: 'program_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'program_name', type: 'STRING', mode: 'REQUIRED' },
  { name: 'program_type', type: 'STRING', mode: 'NULLABLE' }, // rebate, grant, tax_credit, etc.
  { name: 'incentive_amount_min', type: 'FLOAT', mode: 'NULLABLE' },
  { name: 'incentive_amount_max', type: 'FLOAT', mode: 'NULLABLE' },
  { name: 'incentive_per_unit', type: 'STRING', mode: 'NULLABLE' }, // e.g. "$3 per sq ft"
  { name: 'eligible_system_types', type: 'STRING', mode: 'NULLABLE' },
  { name: 'application_url', type: 'STRING', mode: 'NULLABLE' },
  { name: 'program_status', type: 'STRING', mode: 'NULLABLE' }, // active, expired, pending
  { name: 'program_start_date', type: 'DATE', mode: 'NULLABLE' },
  { name: 'program_end_date', type: 'DATE', mode: 'NULLABLE' },
  { name: 'notes', type: 'STRING', mode: 'NULLABLE' },
  { name: 'contact_email', type: 'STRING', mode: 'NULLABLE' },
  { name: 'contact_phone', type: 'STRING', mode: 'NULLABLE' },
  { name: 'installation_requirements', type: 'STRING', mode: 'NULLABLE' },
  { name: 'application_deadline', type: 'DATE', mode: 'NULLABLE' },
  { name: 'funding_available', type: 'FLOAT', mode: 'NULLABLE' },
  { name: 'created_at', type: 'TIMESTAMP', mode: 'NULLABLE' },
  { name: 'updated_at', type: 'TIMESTAMP', mode: 'NULLABLE' }
];

async function createProgramsMasterTable() {
  console.log('📊 Creating programs_master table...\n');

  try {
    // Try to delete existing table
    try {
      await bigquery.dataset(datasetId).table('programs_master').delete();
      console.log('   Deleted existing programs_master table');
    } catch (e) {
      console.log('   No existing programs_master table');
    }

    // Create new table
    const [table] = await bigquery
      .dataset(datasetId)
      .createTable('programs_master', { schema: programsMasterSchema });

    console.log('   ✅ Created programs_master table\n');
    console.log('📋 Table Structure:');
    console.log('   - program_id: Unique identifier');
    console.log('   - program_name: Display name');
    console.log('   - program_type: rebate, grant, tax_credit, etc.');
    console.log('   - incentive_amount_min/max: Dollar amounts');
    console.log('   - application_url: Link for more info (REQUIRED FOR ALL)');
    console.log('   - contact_email/phone: Program contacts');
    console.log('   - notes: Additional details\n');

    console.log('✅ programs_master table created successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

createProgramsMasterTable();
