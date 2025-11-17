const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

/**
 * UNIFIED WATER CONSERVATION SYSTEM
 *
 * Instead of separate greywater and rainwater program tables,
 * we'll use a unified system with a "water_types" link table.
 * This allows one program to support multiple water conservation types.
 *
 * Example: "LA DWP Water Conservation Rebate" can support:
 * - Greywater systems
 * - Rainwater harvesting
 * - Both together
 */

// Lookup table for water conservation types
const waterTypesSchema = [
  { name: 'water_type_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'water_type_name', type: 'STRING', mode: 'REQUIRED' },
  { name: 'description', type: 'STRING', mode: 'NULLABLE' }
];

const waterTypesData = [
  {
    water_type_id: 'GREYWATER',
    water_type_name: 'Greywater',
    description: 'Wastewater from showers, sinks, washing machines (excludes toilet water)'
  },
  {
    water_type_id: 'RAINWATER',
    water_type_name: 'Rainwater Harvesting',
    description: 'Collection and storage of rainwater for reuse'
  },
  {
    water_type_id: 'STORMWATER',
    water_type_name: 'Stormwater Management',
    description: 'On-site stormwater capture and infiltration'
  },
  {
    water_type_id: 'LAUNDRY_TO_LANDSCAPE',
    water_type_name: 'Laundry to Landscape',
    description: 'Simple greywater system using washing machine discharge'
  },
  {
    water_type_id: 'GENERAL_CONSERVATION',
    water_type_name: 'General Water Conservation',
    description: 'Programs supporting multiple water conservation methods'
  }
];

// Link table: program_water_type_link
const programWaterTypeLinkSchema = [
  { name: 'program_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'water_type_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'specific_requirements', type: 'STRING', mode: 'NULLABLE' },
  { name: 'incentive_multiplier', type: 'FLOAT', mode: 'NULLABLE' } // Some programs pay more for certain types
];

// Enhanced unified laws table that covers ALL water types
const waterLawsSchema = [
  { name: 'jurisdiction_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'water_type_id', type: 'STRING', mode: 'REQUIRED' },
  { name: 'legal_status', type: 'STRING', mode: 'NULLABLE' },
  { name: 'governing_code', type: 'STRING', mode: 'NULLABLE' },
  { name: 'permit_required', type: 'BOOLEAN', mode: 'NULLABLE' },
  { name: 'permit_threshold', type: 'STRING', mode: 'NULLABLE' },
  { name: 'approved_uses', type: 'STRING', mode: 'REPEATED' },
  { name: 'key_restrictions', type: 'STRING', mode: 'REPEATED' },
  { name: 'summary', type: 'STRING', mode: 'NULLABLE' },
  { name: 'regulatory_classification', type: 'STRING', mode: 'NULLABLE' },
  { name: 'updated_at', type: 'TIMESTAMP', mode: 'NULLABLE' }
];

async function createUnifiedSystem() {
  console.log('🔄 Creating Unified Water Conservation System\n');
  console.log('This approach eliminates duplication by:');
  console.log('1. Using lookup_water_types to define water conservation categories');
  console.log('2. Using program_water_type_link to show which programs support which types');
  console.log('3. Using water_regulations to store laws for each type by jurisdiction\n');

  try {
    // 1. Create lookup_water_types table
    console.log('1️⃣  Creating lookup_water_types...');
    try {
      await bigquery.dataset(datasetId).table('lookup_water_types').delete();
      console.log('   Deleted existing table');
    } catch (e) {
      console.log('   No existing table');
    }

    const [waterTypesTable] = await bigquery
      .dataset(datasetId)
      .createTable('lookup_water_types', { schema: waterTypesSchema });

    await bigquery
      .dataset(datasetId)
      .table('lookup_water_types')
      .insert(waterTypesData);

    console.log(`   ✅ Created and populated with ${waterTypesData.length} water types\n`);

    // 2. Create program_water_type_link table
    console.log('2️⃣  Creating program_water_type_link...');
    try {
      await bigquery.dataset(datasetId).table('program_water_type_link').delete();
      console.log('   Deleted existing table');
    } catch (e) {
      console.log('   No existing table');
    }

    const [linkTable] = await bigquery
      .dataset(datasetId)
      .createTable('program_water_type_link', { schema: programWaterTypeLinkSchema });

    console.log('   ✅ Created program_water_type_link\n');

    // 3. Create water_regulations table (replaces separate greywater_laws and rainwater_laws)
    console.log('3️⃣  Creating water_regulations (unified laws table)...');
    try {
      await bigquery.dataset(datasetId).table('water_regulations').delete();
      console.log('   Deleted existing table');
    } catch (e) {
      console.log('   No existing table');
    }

    const [lawsTable] = await bigquery
      .dataset(datasetId)
      .createTable('water_regulations', { schema: waterLawsSchema });

    console.log('   ✅ Created water_regulations\n');

    console.log('✅ UNIFIED SYSTEM CREATED!\n');
    console.log('📊 New Table Structure:');
    console.log('   • lookup_water_types (5 types)');
    console.log('   • program_water_type_link (links programs to water types)');
    console.log('   • water_regulations (unified laws for all types)\n');

    console.log('🔄 Migration Steps:');
    console.log('   1. Migrate greywater_laws to water_regulations (water_type_id = GREYWATER)');
    console.log('   2. Migrate rainwater_laws to water_regulations (water_type_id = RAINWATER)');
    console.log('   3. Tag existing programs in program_water_type_link');
    console.log('   4. Update APIs to filter by water_type_id\n');

    console.log('💡 Benefits:');
    console.log('   ✓ One program can support multiple water types');
    console.log('   ✓ No data duplication');
    console.log('   ✓ Easy to add new water conservation types');
    console.log('   ✓ Clear separation: programs vs regulations');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

// Show example queries
console.log('📖 Example Query Patterns:\n');
console.log('-- Get all programs supporting rainwater harvesting in CA:');
console.log(`SELECT p.program_id, p.jurisdiction_id, wt.water_type_name
FROM program_jurisdiction_link p
JOIN program_water_type_link pwt ON p.program_id = pwt.program_id
JOIN lookup_water_types wt ON pwt.water_type_id = wt.water_type_id
WHERE p.jurisdiction_id LIKE 'CA_%' AND wt.water_type_id = 'RAINWATER';\n`);

console.log('-- Get programs supporting BOTH greywater AND rainwater:');
console.log(`SELECT program_id, COUNT(DISTINCT water_type_id) as water_types_count
FROM program_water_type_link
WHERE water_type_id IN ('GREYWATER', 'RAINWATER')
GROUP BY program_id
HAVING water_types_count = 2;\n`);

createUnifiedSystem();
