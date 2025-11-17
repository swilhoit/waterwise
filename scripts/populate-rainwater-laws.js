const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';
const tableId = 'rainwater_laws';

// State codes mapping
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

// Sample rainwater harvesting laws for key states
// This is initial data - expand with more detailed state-by-state research
const rainwaterLaws = {
  'California': {
    legal_status: 'Legal with Incentives',
    governing_code: 'California Plumbing Code, Assembly Bill 1750',
    permit_threshold_gallons: null,
    permit_required: 'Varies by jurisdiction',
    potable_use_allowed: true,
    non_potable_use_allowed: true,
    approved_uses: ['Irrigation', 'Toilet flushing', 'Laundry', 'Cooling systems', 'Emergency water supply'],
    key_restrictions: ['Must meet plumbing code requirements', 'Proper filtration for indoor use', 'Cross-connection prevention', 'Mosquito control measures'],
    treatment_requirements: 'Filtration and disinfection required for indoor non-potable use',
    storage_requirements: 'Covered tanks, overflow provisions, mosquito-proof screens',
    primary_agency: 'California Department of Water Resources',
    government_website: 'https://water.ca.gov',
    regulatory_classification: 'Progressive',
    summary: 'California actively encourages rainwater harvesting with supportive regulations and incentives. Both potable and non-potable uses are allowed with proper treatment.',
    tax_incentives_available: true,
    building_code_requirements: 'New construction in some jurisdictions must include rainwater collection capability'
  },
  'Texas': {
    legal_status: 'Legal with Strong Support',
    governing_code: 'Texas Water Code, House Bill 3391',
    permit_threshold_gallons: null,
    permit_required: 'No',
    potable_use_allowed: true,
    non_potable_use_allowed: true,
    approved_uses: ['Irrigation', 'Drinking water (with treatment)', 'Toilet flushing', 'Laundry', 'Livestock'],
    key_restrictions: ['Treatment required for potable use', 'Property tax exemptions available for systems'],
    treatment_requirements: 'NSF certified treatment for potable use',
    storage_requirements: 'Tanks must be covered and screened',
    primary_agency: 'Texas Water Development Board',
    government_website: 'https://www.twdb.texas.gov',
    regulatory_classification: 'Very Progressive',
    summary: 'Texas is a leader in rainwater harvesting with strong regulatory support, tax incentives, and no permits required for most systems.',
    tax_incentives_available: true,
    building_code_requirements: 'Some jurisdictions require rainwater collection for new commercial buildings'
  },
  'Arizona': {
    legal_status: 'Legal',
    governing_code: 'Arizona Revised Statutes',
    permit_threshold_gallons: null,
    permit_required: 'No',
    potable_use_allowed: true,
    non_potable_use_allowed: true,
    approved_uses: ['Irrigation', 'Livestock', 'Groundwater recharge', 'Indoor non-potable'],
    key_restrictions: ['Cannot use for drinking without proper treatment', 'Must not interfere with existing water rights'],
    treatment_requirements: 'Treatment required for potable use',
    storage_requirements: 'Covered storage recommended',
    primary_agency: 'Arizona Department of Water Resources',
    government_website: 'https://www.azwater.gov',
    regulatory_classification: 'Progressive',
    summary: 'Arizona encourages rainwater harvesting, especially for outdoor irrigation and groundwater recharge. No permits required.',
    tax_incentives_available: true,
    building_code_requirements: null
  },
  'Colorado': {
    legal_status: 'Legal (as of 2016)',
    governing_code: 'Senate Bill 16-080, House Bill 16-1005',
    permit_threshold_gallons: null,
    permit_required: 'No',
    potable_use_allowed: false,
    non_potable_use_allowed: true,
    approved_uses: ['Outdoor irrigation', 'Outdoor watering'],
    key_restrictions: ['Limited to 2 rain barrels up to 110 gallons total', 'Only for residential properties', 'Outdoor use only'],
    treatment_requirements: 'Not applicable (outdoor use only)',
    storage_requirements: 'Maximum 110 gallons total storage',
    primary_agency: 'Colorado Division of Water Resources',
    government_website: 'https://dwr.colorado.gov',
    regulatory_classification: 'Restrictive',
    summary: 'Colorado has strict limitations on rainwater harvesting due to water rights laws. Residential use limited to two rain barrels.',
    tax_incentives_available: false,
    building_code_requirements: null
  },
  'Oregon': {
    legal_status: 'Legal',
    governing_code: 'Oregon Revised Statutes 537.145',
    permit_threshold_gallons: null,
    permit_required: 'No',
    potable_use_allowed: true,
    non_potable_use_allowed: true,
    approved_uses: ['Irrigation', 'Toilet flushing', 'Washing', 'Drinking (with treatment)'],
    key_restrictions: ['Must be from rooftop', 'Cannot interfere with existing water rights'],
    treatment_requirements: 'Treatment required for potable use per OHA standards',
    storage_requirements: 'Covered and screened tanks',
    primary_agency: 'Oregon Water Resources Department',
    government_website: 'https://www.oregon.gov/owrd',
    regulatory_classification: 'Progressive',
    summary: 'Oregon supports rainwater harvesting for both potable and non-potable uses with minimal restrictions.',
    tax_incentives_available: false,
    building_code_requirements: null
  },
  'Washington': {
    legal_status: 'Legal',
    governing_code: 'Washington Administrative Code',
    permit_threshold_gallons: null,
    permit_required: 'Varies by jurisdiction',
    potable_use_allowed: true,
    non_potable_use_allowed: true,
    approved_uses: ['Irrigation', 'Indoor non-potable', 'Emergency supply', 'Drinking (with treatment)'],
    key_restrictions: ['Treatment required for potable use', 'Local permits may be required'],
    treatment_requirements: 'Must meet Department of Health standards for potable use',
    storage_requirements: 'Covered tanks with overflow',
    primary_agency: 'Washington Department of Ecology',
    government_website: 'https://ecology.wa.gov',
    regulatory_classification: 'Progressive',
    summary: 'Washington encourages rainwater harvesting with supportive regulations for both residential and commercial use.',
    tax_incentives_available: true,
    building_code_requirements: 'Some local jurisdictions require rainwater collection for new construction'
  },
  'Florida': {
    legal_status: 'Legal',
    governing_code: 'Florida Statutes',
    permit_threshold_gallons: null,
    permit_required: 'No',
    potable_use_allowed: false,
    non_potable_use_allowed: true,
    approved_uses: ['Irrigation', 'Toilet flushing', 'Washing'],
    key_restrictions: ['Not approved for drinking water', 'Must meet plumbing code'],
    treatment_requirements: 'Filtration for indoor non-potable use',
    storage_requirements: 'Covered and screened',
    primary_agency: 'Florida Department of Environmental Protection',
    government_website: 'https://floridadep.gov',
    regulatory_classification: 'Moderate',
    summary: 'Florida allows rainwater harvesting for non-potable uses. Growing interest due to water conservation needs.',
    tax_incentives_available: false,
    building_code_requirements: null
  }
};

// Add default data for remaining states
const defaultStates = Object.keys(stateCodes).filter(state => !rainwaterLaws[state]);

defaultStates.forEach(stateName => {
  rainwaterLaws[stateName] = {
    legal_status: 'Legal (verify local regulations)',
    governing_code: 'State and local building codes',
    permit_threshold_gallons: null,
    permit_required: 'Check with local jurisdiction',
    potable_use_allowed: false,
    non_potable_use_allowed: true,
    approved_uses: ['Irrigation', 'Outdoor use'],
    key_restrictions: ['Verify local ordinances', 'May require permits'],
    treatment_requirements: 'Check local requirements',
    storage_requirements: 'Covered tanks recommended',
    primary_agency: `${stateName} Department of Environmental Quality`,
    government_website: null,
    regulatory_classification: 'Unknown - Verify Locally',
    summary: `Rainwater harvesting regulations in ${stateName} vary by locality. Contact local building department for specific requirements.`,
    tax_incentives_available: false,
    building_code_requirements: null
  };
});

async function uploadData() {
  try {
    const rows = [];

    Object.entries(rainwaterLaws).forEach(([stateName, laws]) => {
      const stateCode = stateCodes[stateName];

      rows.push({
        state_code: stateCode,
        state_name: stateName,
        jurisdiction_id: `${stateCode}_STATE`,
        legal_status: laws.legal_status,
        governing_code: laws.governing_code,
        permit_threshold_gallons: laws.permit_threshold_gallons,
        permit_required: laws.permit_required,
        potable_use_allowed: laws.potable_use_allowed,
        non_potable_use_allowed: laws.non_potable_use_allowed,
        approved_uses: laws.approved_uses,
        key_restrictions: laws.key_restrictions,
        treatment_requirements: laws.treatment_requirements,
        storage_requirements: laws.storage_requirements,
        recent_changes: null,
        primary_agency: laws.primary_agency,
        agency_contact: null,
        agency_phone: null,
        government_website: laws.government_website,
        regulatory_classification: laws.regulatory_classification,
        summary: laws.summary,
        tax_incentives_available: laws.tax_incentives_available,
        building_code_requirements: laws.building_code_requirements
      });
    });

    console.log(`Inserting ${rows.length} state rainwater laws...`);
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(rows);

    console.log(`✅ Successfully inserted ${rows.length} rows into ${datasetId}.${tableId}`);

    // Verify the data
    const query = `
      SELECT state_name, legal_status, regulatory_classification
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${datasetId}.${tableId}\`
      ORDER BY state_name
      LIMIT 10
    `;
    const [queryRows] = await bigquery.query(query);

    console.log('\nSample data:');
    console.table(queryRows);

    // Summary by classification
    const summaryQuery = `
      SELECT
        regulatory_classification,
        COUNT(*) as state_count
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${datasetId}.${tableId}\`
      GROUP BY regulatory_classification
      ORDER BY state_count DESC
    `;
    const [summaryRows] = await bigquery.query(summaryQuery);

    console.log('\nStates by regulatory classification:');
    console.table(summaryRows);

  } catch (error) {
    console.error('Error uploading data:', error);
    throw error;
  }
}

uploadData();
