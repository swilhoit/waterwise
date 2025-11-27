const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';
const tableId = 'programs_master';

// Enriched program data - researched from official sources
const programEnrichment = {
  // ============================================================================
  // GREYWATER-SPECIFIC PROGRAMS
  // ============================================================================

  'CA_LADWP_GREYWATER_2024': {
    program_description: 'LADWP offers rebates for residential greywater systems that divert sink, shower, and laundry water for outdoor irrigation. This program helps Los Angeles residents reduce potable water use while maintaining healthy landscapes during drought conditions.',
    eligibility_details: 'Must be an LADWP residential water customer. Property must be single-family or multi-family (up to 4 units). System must divert greywater to subsurface irrigation. Professional installation recommended but DIY is eligible with proper documentation.',
    how_to_apply: '1. Review program guidelines on LADWP website. 2. Submit pre-approval application online. 3. Wait for approval before installation. 4. Install greywater system per code. 5. Submit completion documents and photos. 6. Receive rebate check within 6-8 weeks.',
    documentation_required: 'Proof of LADWP account, photos before/after installation, receipts for materials/labor, system schematic, permit if required for branched drain systems.',
    coverage_area: 'Los Angeles Department of Water and Power service area',
    deadline_info: 'Program available while funding lasts. Apply early as funds are allocated first-come, first-served.'
  },

  'CA_EBMUD_GREYWATER_2024': {
    program_description: 'EBMUD\'s greywater rebate program encourages East Bay residents to install laundry-to-landscape systems. These simple systems redirect washing machine water directly to landscape plants, reducing potable water use by up to 20 gallons per load.',
    eligibility_details: 'Must be an EBMUD residential customer. System must be laundry-to-landscape type (no permit required under CA code). Property must have appropriate outdoor space for greywater irrigation. Both DIY and professional installations qualify.',
    how_to_apply: '1. Attend free EBMUD greywater workshop (recommended). 2. Complete online rebate application. 3. Install laundry-to-landscape system. 4. Submit post-installation photos and receipts. 5. EBMUD may conduct site verification. 6. Receive rebate within 4-6 weeks.',
    documentation_required: 'Itemized receipts for materials, photos showing system components (3-way valve, tubing, mulch basins), signed declaration of installation completion.',
    coverage_area: 'East Bay Municipal Utility District service area (Alameda and Contra Costa counties)',
    deadline_info: 'Ongoing program - funding available year-round while supplies last.'
  },

  'CA_EBMUD_GREYWATER_IQ_2024': {
    program_description: 'Enhanced rebate for professionally installed greywater systems through EBMUD\'s Irrigation Quote program. Higher rebate amounts available when using EBMUD-qualified greywater contractors who ensure proper installation and code compliance.',
    eligibility_details: 'Must be EBMUD residential customer. Must use an EBMUD-qualified greywater installation contractor. System can include laundry-to-landscape or more complex branched drain systems. Contractor handles permit process if needed.',
    how_to_apply: '1. Request quotes from EBMUD-qualified contractors. 2. Select contractor and schedule installation. 3. Contractor submits rebate paperwork on your behalf. 4. Rebate applied directly to your installation cost.',
    documentation_required: 'Contractor handles all documentation. Customer provides proof of EBMUD account.',
    coverage_area: 'East Bay Municipal Utility District service area',
    deadline_info: 'Contact EBMUD for current contractor availability and wait times.'
  },

  'CA_EMWD_GREYWATER_2024': {
    program_description: 'Eastern Municipal Water District offers greywater rebates to help Riverside County residents reduce outdoor water use. Rebates cover both simple laundry-to-landscape and more complex whole-house greywater systems.',
    eligibility_details: 'Must be an EMWD water customer (residential or commercial). Property must have appropriate landscape area for greywater irrigation. Systems must meet California plumbing code requirements. Pre-approval required before installation.',
    how_to_apply: '1. Apply online through EMWD rebate portal. 2. Receive pre-approval email. 3. Complete installation within 90 days. 4. Submit completion documents online. 5. Schedule inspection if required. 6. Receive rebate after approval.',
    documentation_required: 'Pre/post installation photos, itemized receipts, system diagram, permit documentation (for branched drain systems), contractor license info if professionally installed.',
    coverage_area: 'Eastern Municipal Water District service area (western Riverside County)',
    deadline_info: 'Pre-approval valid for 90 days. Program continues while funding is available.'
  },

  'CA_SD_GREYWATER_REBATE_2024': {
    program_description: 'The City of San Diego\'s greywater rebate program helps residents install systems that capture sink, shower, and laundry water for landscape irrigation. Part of the city\'s comprehensive water conservation strategy to reduce reliance on imported water.',
    eligibility_details: 'Must be City of San Diego Water Department customer. Single-family residential properties only. Must install qualifying greywater system per California plumbing code. Pre-inspection may be required for larger systems.',
    how_to_apply: '1. Review program requirements online. 2. Submit application through WaterSmart portal. 3. Receive approval before starting work. 4. Complete installation. 5. Submit photos and receipts. 6. Receive rebate within 6-8 weeks.',
    documentation_required: 'Water bill showing account number, before/after photos, itemized material receipts, permit if applicable, contractor information if used.',
    coverage_area: 'City of San Diego Water Department customers only',
    deadline_info: 'Apply early - funding allocated first-come, first-served basis.'
  },

  'CA_SFPUC_GREYWATER_2024': {
    program_description: 'San Francisco Public Utilities Commission offers rebates for greywater systems as part of their water conservation program. Helps San Francisco residents reduce potable water use for landscape irrigation in the dense urban environment.',
    eligibility_details: 'Must be SFPUC water customer. Residential and commercial properties eligible. System must comply with SF building and plumbing codes. Properties with existing efficient irrigation may receive additional incentives.',
    how_to_apply: '1. Check eligibility on SFPUC website. 2. Submit pre-approval application. 3. Attend free greywater workshop (optional but recommended). 4. Complete installation per code. 5. Submit final documentation. 6. Receive rebate after verification.',
    documentation_required: 'SFPUC account information, installation receipts, photos of completed system, permit documentation, contractor license if applicable.',
    coverage_area: 'San Francisco Public Utilities Commission service area',
    deadline_info: 'Ongoing program - check website for current funding status.'
  },

  'CA_SCVWD_GREYWATER_2024': {
    program_description: 'Santa Clara Valley Water District\'s greywater rebate supports Silicon Valley residents in reducing landscape water use. The program recognizes greywater as a valuable resource for drought-resistant landscaping in the South Bay.',
    eligibility_details: 'Must receive water from a retailer within SCVWD service area. Residential and commercial properties eligible. System must meet California greywater standards. Pre-approval required.',
    how_to_apply: '1. Verify eligibility with your water retailer. 2. Apply through SCVWD landscape rebate portal. 3. Receive approval. 4. Install system within approved timeframe. 5. Submit completion documentation. 6. Receive rebate.',
    documentation_required: 'Water account proof, installation receipts, system photos, landscape plan showing irrigation areas, permit if required.',
    coverage_area: 'Santa Clara Valley Water District service area (Santa Clara County)',
    deadline_info: 'Program runs annually - check website for current cycle dates and funding availability.'
  },

  'CA_GLENDALE_GREYWATER_2024': {
    program_description: 'Glendale Water & Power\'s greywater rebate program helps residents reduce outdoor water use by installing systems that capture and reuse household water for irrigation. Supports the city\'s water conservation and sustainability goals.',
    eligibility_details: 'Must be Glendale Water & Power residential customer. Single-family homes primary focus. System must meet California code requirements. Both DIY and professional installations accepted.',
    how_to_apply: '1. Download application from GWP website. 2. Submit completed application with required documents. 3. Receive pre-approval. 4. Install greywater system. 5. Request final inspection. 6. Receive rebate check.',
    documentation_required: 'GWP account number, detailed system description, material receipts, before/after photos, completed installation checklist.',
    coverage_area: 'Glendale Water & Power service area',
    deadline_info: 'Limited annual funding - apply early in the fiscal year (July).'
  },

  'CA_CITY_GLENDALE_L2L_2025': {
    program_description: 'Glendale\'s dedicated laundry-to-landscape rebate provides a streamlined incentive for the simplest form of greywater reuse. These no-permit systems are ideal for homeowners new to greywater who want to start with an easy, low-cost installation.',
    eligibility_details: 'GWP residential customers. Laundry-to-landscape systems only (no permit required). Must have appropriate outdoor area for greywater irrigation. Washing machine must be compatible with greywater diversion.',
    how_to_apply: '1. Review L2L requirements online. 2. Submit simplified application. 3. Purchase materials and install system. 4. Submit photos and receipts. 5. Receive rebate.',
    documentation_required: 'Water account verification, material receipts, photos showing 3-way valve installation, tubing, and mulch basins.',
    coverage_area: 'Glendale Water & Power residential customers',
    deadline_info: 'Ongoing while funding available.'
  },

  'CA_SMGWA_GREYWATER_2024': {
    program_description: 'Santa Margarita Groundwater Agency\'s greywater rebate supports groundwater sustainability in south Orange County. By reducing outdoor potable water use, the program helps protect local aquifers while promoting water-wise landscaping.',
    eligibility_details: 'Must be located within SMGWA boundaries. Residential properties. System must divert approved greywater sources to subsurface irrigation. Property must have suitable landscape area.',
    how_to_apply: '1. Verify you\'re in SMGWA service area. 2. Complete online application. 3. Receive approval notification. 4. Install qualified system. 5. Submit documentation. 6. Receive rebate.',
    documentation_required: 'Proof of address within SMGWA area, water account info, installation photos, receipts.',
    coverage_area: 'Santa Margarita Groundwater Agency area (south Orange County)',
    deadline_info: 'Check SMGWA website for current program status and funding.'
  },

  // ============================================================================
  // WATER DISTRICT PROGRAMS (Non-Greywater)
  // ============================================================================

  'CA_LADWP_TURF_2024': {
    program_description: 'LADWP\'s popular turf replacement program offers substantial rebates for removing water-hungry grass lawns and replacing them with drought-tolerant California-friendly landscaping. One of the highest-paying turf rebate programs in the state.',
    eligibility_details: 'LADWP residential or commercial customers. Turf must be living grass that has been irrigated. Minimum 250 sq ft removal required. Replacement must be permeable, drought-tolerant landscape. Artificial turf is NOT eligible.',
    how_to_apply: '1. Apply online through LADWP rebate portal. 2. Schedule pre-inspection (within 30 days). 3. Wait for approval before removing turf. 4. Complete transformation within 180 days. 5. Schedule post-inspection. 6. Receive rebate.',
    documentation_required: 'Pre-inspection verifying existing turf, photos documenting transformation, plant list for new landscape, irrigation plan showing drip/low-flow system.',
    coverage_area: 'LADWP service area (Los Angeles)',
    deadline_info: 'High demand program - wait times may apply. Apply early.'
  },

  'CA_LADWP_TURF_ENHANCED_2024': {
    program_description: 'Enhanced turf replacement rebate tier for larger residential conversions. Higher per-square-foot rebate available for projects meeting additional sustainability criteria like rainwater capture integration.',
    eligibility_details: 'Same as standard turf program with additional requirements: must include rainwater capture element, minimum 400 sq ft, and use at least 50% native California plants.',
    how_to_apply: 'Same process as standard turf program. Select enhanced tier during application. Additional documentation required for enhanced features.',
    documentation_required: 'All standard turf program documents plus rainwater capture system documentation, native plant certification.',
    coverage_area: 'LADWP service area',
    deadline_info: 'Limited enhanced funding - standard rebate available if enhanced funds depleted.'
  },

  'CA_MWD_TURF_REPLACEMENT_2024': {
    program_description: 'Metropolitan Water District\'s regional turf replacement program available to customers throughout the MWD service area (most of Southern California). Provides base-level funding that may stack with local utility rebates.',
    eligibility_details: 'Must be within MWD member agency service area. Residential or commercial. Functional irrigated turf required. Minimum project size applies. Cannot combine with certain local rebates.',
    how_to_apply: '1. Check if your water provider participates. 2. Apply through bewaterwise.com. 3. Complete required steps. 4. Submit documentation. 5. Receive rebate.',
    documentation_required: 'Varies by participating agency - check bewaterwise.com for specific requirements.',
    coverage_area: 'Metropolitan Water District service area (most of Southern California)',
    deadline_info: 'Funding varies by fiscal year. Check bewaterwise.com for current availability.'
  },

  'CA_MWD_ROTATING_NOZZLES_2024': {
    program_description: 'Rebate for upgrading standard spray irrigation heads to high-efficiency rotating nozzles. These nozzles reduce water use by 20-30% by applying water more slowly and evenly, reducing runoff and evaporation.',
    eligibility_details: 'MWD service area customers. Residential and commercial. Must replace existing pop-up spray heads with qualifying rotating nozzles. Minimum number of nozzles may apply.',
    how_to_apply: '1. Purchase qualifying rotating nozzles. 2. Install on existing spray irrigation system. 3. Submit rebate application with receipts. 4. Receive rebate.',
    documentation_required: 'Receipts showing nozzle brand/model (must be on approved list), photo of installed nozzles, property address verification.',
    coverage_area: 'Metropolitan Water District service area',
    deadline_info: 'Ongoing program while supplies last.'
  },

  // ============================================================================
  // STATE-LEVEL PROGRAMS
  // ============================================================================

  'CA_WATER_EFFICIENCY_TAX_CREDIT_2025': {
    program_description: 'California state income tax credit for qualifying water efficiency improvements. Allows taxpayers to claim a credit for installing water-saving devices, appliances, and systems including greywater, rainwater harvesting, and WaterSense products.',
    eligibility_details: 'California taxpayers (individuals and businesses). Improvements must be made to property located in California. Products must meet specified efficiency standards. Credit available for primary residence or business property.',
    how_to_apply: '1. Purchase and install qualifying water efficiency products. 2. Keep all receipts and documentation. 3. Claim credit when filing California state taxes using Form 3506. 4. Attach required documentation.',
    documentation_required: 'Product receipts showing purchase date and specifications, manufacturer certification of WaterSense or equivalent rating, installation documentation.',
    coverage_area: 'Statewide - all California taxpayers',
    deadline_info: 'Claim on annual tax return. Keep records for 4 years in case of audit.'
  },

  'CA_CPUC_WATER_CONSERVATION_2025': {
    program_description: 'California Public Utilities Commission program providing water conservation assistance to income-qualified households. Helps low-income families reduce water bills while improving water efficiency through free or subsidized upgrades.',
    eligibility_details: 'Must meet income qualifications (typically 200% of federal poverty level or below). Must be customer of participating utility. Program focuses on high-efficiency toilets, showerheads, and faucet aerators.',
    how_to_apply: '1. Contact your water utility about low-income programs. 2. Submit income verification. 3. Schedule home assessment. 4. Receive free installations or rebate vouchers.',
    documentation_required: 'Proof of income, utility account information, ID verification.',
    coverage_area: 'California residents in participating utility areas',
    deadline_info: 'Ongoing program based on funding availability.'
  },

  'CA_SAVE_OUR_WATER_2025': {
    program_description: 'California\'s statewide water conservation awareness and incentive program. Provides resources, rebate information, and sometimes direct incentives for water-saving actions. Central hub for finding local water conservation programs.',
    eligibility_details: 'All California residents. Access to resources is free. Specific incentives vary by partner programs.',
    how_to_apply: '1. Visit saveourwater.com. 2. Enter zip code to find local rebates. 3. Follow links to apply for specific programs. 4. Access free water-saving tips and resources.',
    documentation_required: 'Varies by specific program accessed through the portal.',
    coverage_area: 'Statewide',
    deadline_info: 'Resource portal always available. Individual programs have their own timelines.'
  },

  // ============================================================================
  // CITY-SPECIFIC PROGRAMS
  // ============================================================================

  'CA_BAKERSFIELD_TURF_2024': {
    program_description: 'City of Bakersfield turf replacement rebate to help residents in one of California\'s hottest regions reduce outdoor water use. Replacing turf in Bakersfield\'s climate can save thousands of gallons annually.',
    eligibility_details: 'City of Bakersfield water customers. Residential properties. Must be living irrigated turf. Replacement must be drought-tolerant landscape.',
    how_to_apply: '1. Apply through city water conservation portal. 2. Schedule pre-inspection. 3. Complete turf removal and new landscaping. 4. Request final inspection. 5. Receive rebate.',
    documentation_required: 'Water account proof, pre/post photos, plant receipts, irrigation plan.',
    coverage_area: 'City of Bakersfield municipal water customers',
    deadline_info: 'Annual program - check city website for current cycle.'
  },

  'CA_CORONA_DWP_2024': {
    program_description: 'City of Corona Department of Water and Power offers various water conservation rebates including smart controllers, high-efficiency toilets, and landscape transformation incentives.',
    eligibility_details: 'Corona DWP water customers. Residential and commercial. Specific requirements vary by rebate type.',
    how_to_apply: '1. Visit Corona DWP rebates page. 2. Select desired rebate program. 3. Follow specific application instructions. 4. Submit required documentation. 5. Receive rebate.',
    documentation_required: 'Varies by rebate type - generally includes receipts, photos, and account verification.',
    coverage_area: 'City of Corona Department of Water and Power service area',
    deadline_info: 'Multiple programs with different timelines - check website.'
  },

  'CA_FRESNO_MICRO_IRRIGATION_2024': {
    program_description: 'City of Fresno rebate for converting spray irrigation to efficient drip or micro-spray systems. Drip irrigation can reduce water use by 30-50% compared to traditional spray systems.',
    eligibility_details: 'Fresno city water customers. Residential and commercial. Must convert from spray to drip/micro-spray. Minimum coverage area applies.',
    how_to_apply: '1. Apply online through Fresno water conservation. 2. Receive approval. 3. Install drip system. 4. Submit completion photos and receipts. 5. Receive rebate.',
    documentation_required: 'Water account info, irrigation layout, receipts for drip components, before/after photos.',
    coverage_area: 'City of Fresno water service area',
    deadline_info: 'Ongoing program while funding available.'
  },

  'CA_FRESNO_RAIN_SENSOR_2024': {
    program_description: 'Simple rebate for installing rain sensors that automatically shut off irrigation systems during and after rainfall. Prevents wasteful watering during wet weather.',
    eligibility_details: 'Fresno city water customers. Must have automatic irrigation system. Sensor must be weather-based shutoff type.',
    how_to_apply: '1. Purchase qualifying rain sensor. 2. Install on irrigation system. 3. Submit rebate form with receipt. 4. Receive rebate.',
    documentation_required: 'Product receipt, photo of installed sensor, water account number.',
    coverage_area: 'City of Fresno water customers',
    deadline_info: 'Quick processing - typically 2-4 weeks.'
  },

  'CA_FRESNO_SMART_CONTROLLER_2024': {
    program_description: 'Rebate for WaterSense-certified smart irrigation controllers that automatically adjust watering schedules based on weather, soil conditions, and plant needs. Can reduce outdoor water use by 15-30%.',
    eligibility_details: 'Fresno city water customers. Controller must be WaterSense certified. Must replace existing automatic controller or be new installation.',
    how_to_apply: '1. Purchase WaterSense smart controller. 2. Install and program for your landscape. 3. Submit application with receipt. 4. Receive rebate.',
    documentation_required: 'Receipt showing WaterSense model, photo of installed controller, water account verification.',
    coverage_area: 'City of Fresno water customers',
    deadline_info: 'Ongoing while funding lasts.'
  }
};

async function enrichPrograms() {
  console.log('Starting program data enrichment...\\n');
  console.log(`Enriching ${Object.keys(programEnrichment).length} programs...\\n`);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const [programId, enrichment] of Object.entries(programEnrichment)) {
    try {
      // Build SET clause dynamically
      const setClauses = [];
      const params = [];

      if (enrichment.program_description) {
        setClauses.push('program_description = ?');
        params.push(enrichment.program_description);
      }
      if (enrichment.eligibility_details) {
        setClauses.push('eligibility_details = ?');
        params.push(enrichment.eligibility_details);
      }
      if (enrichment.how_to_apply) {
        setClauses.push('how_to_apply = ?');
        params.push(enrichment.how_to_apply);
      }
      if (enrichment.documentation_required) {
        setClauses.push('documentation_required = ?');
        params.push(enrichment.documentation_required);
      }
      if (enrichment.coverage_area) {
        setClauses.push('coverage_area = ?');
        params.push(enrichment.coverage_area);
      }
      if (enrichment.deadline_info) {
        setClauses.push('deadline_info = ?');
        params.push(enrichment.deadline_info);
      }

      params.push(programId);

      const query = `
        UPDATE \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.${tableId}\`
        SET ${setClauses.join(', ')}
        WHERE program_id = ?
      `;

      const [job] = await bigquery.createQueryJob({
        query,
        params,
        parameterMode: 'POSITIONAL',
        location: 'US'
      });

      await job.getQueryResults();
      console.log(`✓ Enriched: ${programId}`);
      updatedCount++;

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.log(`✗ Skipped ${programId}: ${error.message}`);
      skippedCount++;
    }
  }

  console.log(`\\n========================================`);
  console.log(`Enrichment complete!`);
  console.log(`Updated: ${updatedCount} programs`);
  console.log(`Skipped: ${skippedCount} programs`);
  console.log(`========================================\\n`);

  // Show sample of enriched data
  const verifyQuery = `
    SELECT
      program_name,
      SUBSTR(program_description, 1, 60) as description_preview,
      CASE WHEN eligibility_details IS NOT NULL THEN '✓' ELSE '' END as has_eligibility,
      CASE WHEN how_to_apply IS NOT NULL THEN '✓' ELSE '' END as has_how_to,
      CASE WHEN documentation_required IS NOT NULL THEN '✓' ELSE '' END as has_docs,
      CASE WHEN coverage_area IS NOT NULL THEN '✓' ELSE '' END as has_coverage
    FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.${tableId}\`
    WHERE program_description IS NOT NULL
    ORDER BY program_name
    LIMIT 15
  `;

  const [rows] = await bigquery.query(verifyQuery);
  console.log('Sample of enriched programs:\\n');
  console.table(rows);
}

enrichPrograms().catch(console.error);
