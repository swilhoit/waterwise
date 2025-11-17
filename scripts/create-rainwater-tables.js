const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

// Schema for rainwater_laws table (mirrors greywater_laws)
const rainwaterLawsSchema = [
  { name: 'state_code', type: 'STRING', mode: 'REQUIRED' },
  { name: 'state_name', type: 'STRING', mode: 'REQUIRED' },
  { name: 'jurisdiction_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'legal_status', type: 'STRING', mode: 'NULLABLE' }, // Legal, Regulated, Prohibited, etc.
  { name: 'governing_code', type: 'STRING', mode: 'NULLABLE' },
  { name: 'permit_threshold_gallons', type: 'INTEGER', mode: 'NULLABLE' }, // Storage capacity threshold
  { name: 'permit_required', type: 'STRING', mode: 'NULLABLE' },
  { name: 'potable_use_allowed', type: 'BOOLEAN', mode: 'NULLABLE' }, // Can it be used for drinking after treatment
  { name: 'non_potable_use_allowed', type: 'BOOLEAN', mode: 'NULLABLE' }, // Irrigation, toilets, etc.
  { name: 'approved_uses', type: 'STRING', mode: 'REPEATED' }, // Irrigation, toilet flushing, laundry, etc.
  { name: 'key_restrictions', type: 'STRING', mode: 'REPEATED' },
  { name: 'treatment_requirements', type: 'STRING', mode: 'NULLABLE' }, // Filtration, UV, etc.
  { name: 'storage_requirements', type: 'STRING', mode: 'NULLABLE' }, // Tank specs, mosquito control, etc.
  { name: 'recent_changes', type: 'STRING', mode: 'NULLABLE' },
  { name: 'primary_agency', type: 'STRING', mode: 'NULLABLE' },
  { name: 'agency_contact', type: 'STRING', mode: 'NULLABLE' },
  { name: 'agency_phone', type: 'STRING', mode: 'NULLABLE' },
  { name: 'government_website', type: 'STRING', mode: 'NULLABLE' },
  { name: 'regulatory_classification', type: 'STRING', mode: 'NULLABLE' },
  { name: 'summary', type: 'STRING', mode: 'NULLABLE' },
  { name: 'tax_incentives_available', type: 'BOOLEAN', mode: 'NULLABLE' },
  { name: 'building_code_requirements', type: 'STRING', mode: 'NULLABLE' }
];

// Schema for rainwater_programs table (similar to incentive programs)
const rainwaterProgramsSchema = [
  { name: 'program_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'jurisdiction_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'program_name', type: 'STRING', mode: 'REQUIRED' },
  { name: 'program_type', type: 'STRING', mode: 'NULLABLE' }, // rebate, tax_credit, grant, etc.
  { name: 'incentive_amount_min', type: 'FLOAT', mode: 'NULLABLE' },
  { name: 'incentive_amount_max', type: 'FLOAT', mode: 'NULLABLE' },
  { name: 'incentive_per_unit', type: 'STRING', mode: 'NULLABLE' }, // per gallon, per sqft, flat rate
  { name: 'sector_applicability', type: 'STRING', mode: 'NULLABLE' }, // residential, commercial, both
  { name: 'residential_eligibility', type: 'BOOLEAN', mode: 'NULLABLE' },
  { name: 'commercial_eligibility', type: 'BOOLEAN', mode: 'NULLABLE' },
  { name: 'eligible_system_types', type: 'STRING', mode: 'NULLABLE' },
  { name: 'min_storage_capacity_gallons', type: 'INTEGER', mode: 'NULLABLE' },
  { name: 'max_storage_capacity_gallons', type: 'INTEGER', mode: 'NULLABLE' },
  { name: 'installation_requirements', type: 'STRING', mode: 'NULLABLE' },
  { name: 'application_url', type: 'STRING', mode: 'NULLABLE' },
  { name: 'application_deadline', type: 'DATE', mode: 'NULLABLE' },
  { name: 'program_status', type: 'STRING', mode: 'NULLABLE' }, // active, expired, pending
  { name: 'program_start_date', type: 'DATE', mode: 'NULLABLE' },
  { name: 'program_end_date', type: 'DATE', mode: 'NULLABLE' },
  { name: 'funding_available', type: 'FLOAT', mode: 'NULLABLE' },
  { name: 'notes', type: 'STRING', mode: 'NULLABLE' },
  { name: 'contact_email', type: 'STRING', mode: 'NULLABLE' },
  { name: 'contact_phone', type: 'STRING', mode: 'NULLABLE' },
  { name: 'created_at', type: 'TIMESTAMP', mode: 'NULLABLE' },
  { name: 'updated_at', type: 'TIMESTAMP', mode: 'NULLABLE' }
];

// Schema for rainwater_program_jurisdiction_link
const rainwaterProgramJurisdictionLinkSchema = [
  { name: 'program_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'jurisdiction_id', type: 'STRING', mode: 'REQUIRED' }
];

async function createTables() {
  try {
    console.log('Creating rainwater harvesting tables...\n');

    // Create rainwater_laws table
    console.log('1. Creating rainwater_laws table...');
    try {
      await bigquery.dataset(datasetId).table('rainwater_laws').delete();
      console.log('   Deleted existing rainwater_laws table');
    } catch (error) {
      console.log('   No existing rainwater_laws table to delete');
    }

    const [lawsTable] = await bigquery
      .dataset(datasetId)
      .createTable('rainwater_laws', { schema: rainwaterLawsSchema });
    console.log(`   ✓ Created rainwater_laws table`);

    // Create rainwater_programs table
    console.log('\n2. Creating rainwater_programs table...');
    try {
      await bigquery.dataset(datasetId).table('rainwater_programs').delete();
      console.log('   Deleted existing rainwater_programs table');
    } catch (error) {
      console.log('   No existing rainwater_programs table to delete');
    }

    const [programsTable] = await bigquery
      .dataset(datasetId)
      .createTable('rainwater_programs', { schema: rainwaterProgramsSchema });
    console.log(`   ✓ Created rainwater_programs table`);

    // Create rainwater_program_jurisdiction_link table
    console.log('\n3. Creating rainwater_program_jurisdiction_link table...');
    try {
      await bigquery.dataset(datasetId).table('rainwater_program_jurisdiction_link').delete();
      console.log('   Deleted existing rainwater_program_jurisdiction_link table');
    } catch (error) {
      console.log('   No existing rainwater_program_jurisdiction_link table to delete');
    }

    const [linkTable] = await bigquery
      .dataset(datasetId)
      .createTable('rainwater_program_jurisdiction_link', {
        schema: rainwaterProgramJurisdictionLinkSchema
      });
    console.log(`   ✓ Created rainwater_program_jurisdiction_link table`);

    console.log('\n✅ All rainwater harvesting tables created successfully!');
    console.log('\nNext steps:');
    console.log('1. Populate rainwater_laws with state-level regulations');
    console.log('2. Add rainwater harvesting programs to rainwater_programs');
    console.log('3. Link programs to jurisdictions in rainwater_program_jurisdiction_link');

  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

createTables();
