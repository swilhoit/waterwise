const { BigQuery } = require('@google-cloud/bigquery');

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025';
const bigquery = new BigQuery({ projectId });
const datasetId = 'greywater_compliance';

// Comprehensive state-level water conservation programs
const statePrograms = {
  CA: {
    programs: [
      {
        program_id: 'CA_STATE_WATER_EFFICIENCY_GRANT_2025',
        program_name: 'California Department of Water Resources Water Efficiency Grant',
        program_type: 'grant',
        incentive_amount_max: 1000000,
        application_url: 'https://water.ca.gov/Work-With-Us/Grants-And-Loans/Water-Use-Efficiency-Grant-Program',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Statewide grants for water efficiency projects',
        residential_eligibility: true,
        commercial_eligibility: true
      }
    ]
  },
  AZ: {
    programs: [
      {
        program_id: 'AZ_STATE_WATER_CONSERVATION_GRANT_2025',
        program_name: 'Arizona Water Infrastructure Finance Authority Grant',
        program_type: 'grant',
        incentive_amount_max: 5000000,
        application_url: 'https://www.azwifa.gov/grants',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'State funding for water conservation infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  NY: {
    programs: [
      {
        program_id: 'NY_STATE_GREEN_INNOVATION_GRANT_2025',
        program_name: 'New York Green Innovation Grant Program',
        program_type: 'grant',
        incentive_amount_max: 250000,
        application_url: 'https://www.nyserda.ny.gov/All-Programs/Green-Innovation-Grant-Program',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Funding for innovative green infrastructure projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  PA: {
    programs: [
      {
        program_id: 'PA_STATE_GROWING_GREENER_2025',
        program_name: 'Pennsylvania Growing Greener Grant',
        program_type: 'grant',
        incentive_amount_max: 500000,
        application_url: 'https://www.dep.pa.gov/Citizens/GrantsLoansRebates/Growing-Greener/Pages/default.aspx',
        water_types: ['RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'State grants for watershed protection and stormwater management',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  IL: {
    programs: [
      {
        program_id: 'IL_STATE_WATER_REVOLVING_LOAN_2025',
        program_name: 'Illinois Water Revolving Loan Program',
        program_type: 'loan',
        incentive_amount_max: 10000000,
        application_url: 'https://www2.illinois.gov/epa/topics/grants-loans/state-revolving-fund/Pages/default.aspx',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water infrastructure improvements',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  OH: {
    programs: [
      {
        program_id: 'OH_STATE_H2OHIO_2025',
        program_name: 'H2Ohio Water Quality Initiative',
        program_type: 'grant',
        incentive_amount_max: 1000000,
        application_url: 'https://h2.ohio.gov/',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'State program for water quality and conservation',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  NC: {
    programs: [
      {
        program_id: 'NC_STATE_WATER_RESOURCES_GRANT_2025',
        program_name: 'North Carolina Water Resources Development Grant',
        program_type: 'grant',
        incentive_amount_max: 500000,
        application_url: 'https://www.ncwater.org/WUDG/',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'State grants for water conservation and infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  GA: {
    programs: [
      {
        program_id: 'GA_STATE_WATER_STEWARDSHIP_2025',
        program_name: 'Georgia Water Stewardship Grant',
        program_type: 'grant',
        incentive_amount_max: 150000,
        application_url: 'https://epd.georgia.gov/water-conservation',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Grants for water conservation projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  MI: {
    programs: [
      {
        program_id: 'MI_STATE_CLEAN_WATER_FUND_2025',
        program_name: 'Michigan Clean Water State Revolving Fund',
        program_type: 'loan',
        incentive_amount_max: 5000000,
        application_url: 'https://www.michigan.gov/egle/about/organization/water-resources/financial-assistance/state-revolving-fund',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  NJ: {
    programs: [
      {
        program_id: 'NJ_STATE_WATER_BANK_2025',
        program_name: 'New Jersey Water Bank Financing',
        program_type: 'loan',
        incentive_amount_max: 20000000,
        application_url: 'https://www.nj.gov/dep/dwq/njeifp.htm',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Low-interest financing for water infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  VA: {
    programs: [
      {
        program_id: 'VA_STATE_WATER_QUALITY_GRANT_2025',
        program_name: 'Virginia Water Quality Improvement Fund',
        program_type: 'grant',
        incentive_amount_max: 300000,
        application_url: 'https://www.deq.virginia.gov/water/water-quality/nonpoint-source/grants',
        water_types: ['RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'State grants for stormwater best management practices',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  MA: {
    programs: [
      {
        program_id: 'MA_STATE_GREEN_COMMUNITIES_2025',
        program_name: 'Massachusetts Green Communities Grant',
        program_type: 'grant',
        incentive_amount_max: 400000,
        application_url: 'https://www.mass.gov/green-communities-division',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Grants for municipalities implementing water and energy efficiency',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  IN: {
    programs: [
      {
        program_id: 'IN_STATE_SRF_LOAN_2025',
        program_name: 'Indiana State Revolving Fund Loan',
        program_type: 'loan',
        incentive_amount_max: 10000000,
        application_url: 'https://www.in.gov/ifa/srf/',
        water_types: ['GREYWATER', 'GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water infrastructure improvements',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  TN: {
    programs: [
      {
        program_id: 'TN_STATE_WATER_RESOURCES_GRANT_2025',
        program_name: 'Tennessee Water Resources Grant',
        program_type: 'grant',
        incentive_amount_max: 350000,
        application_url: 'https://www.tn.gov/environment/permit-permits/water-permits/water-quality-programs/wastewater-programs/grants.html',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'State grants for water quality and conservation',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  MO: {
    programs: [
      {
        program_id: 'MO_STATE_SRF_LOAN_2025',
        program_name: 'Missouri State Revolving Fund',
        program_type: 'loan',
        incentive_amount_max: 5000000,
        application_url: 'https://dnr.mo.gov/water/business-industry-other-entities/financial-assistance',
        water_types: ['GREYWATER', 'GENERAL_CONSERVATION'],
        notes: 'Low-interest financing for water infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  MD: {
    programs: [
      {
        program_id: 'MD_STATE_WATER_QUALITY_GRANT_2025',
        program_name: 'Maryland Water Quality Revolving Loan Fund',
        program_type: 'loan',
        incentive_amount_max: 15000000,
        application_url: 'https://mde.maryland.gov/programs/water/Pages/wqfa.aspx',
        water_types: ['RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for stormwater management',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  WI: {
    programs: [
      {
        program_id: 'WI_STATE_CLEAN_WATER_FUND_2025',
        program_name: 'Wisconsin Clean Water Fund',
        program_type: 'loan',
        incentive_amount_max: 10000000,
        application_url: 'https://dnr.wisconsin.gov/Aid/cleanwaterfund.html',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water quality improvements',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  MN: {
    programs: [
      {
        program_id: 'MN_STATE_WATER_INFRASTRUCTURE_2025',
        program_name: 'Minnesota Public Facilities Authority Grant',
        program_type: 'grant',
        incentive_amount_max: 2000000,
        application_url: 'https://mn.gov/deed/pfa/funds-programs/',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'State grants for public water infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  SC: {
    programs: [
      {
        program_id: 'SC_STATE_SRF_LOAN_2025',
        program_name: 'South Carolina State Revolving Fund',
        program_type: 'loan',
        incentive_amount_max: 8000000,
        application_url: 'https://scdhec.gov/environment/your-water-coast/grants-loans/state-revolving-fund-loan-program',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  AL: {
    programs: [
      {
        program_id: 'AL_STATE_WATER_REVOLVING_2025',
        program_name: 'Alabama Water Pollution Control Revolving Fund',
        program_type: 'loan',
        incentive_amount_max: 5000000,
        application_url: 'https://www.ala bama.gov/adem/programs/water/wpcrlf.html',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water quality projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  LA: {
    programs: [
      {
        program_id: 'LA_STATE_CLEAN_WATER_SRF_2025',
        program_name: 'Louisiana Clean Water State Revolving Fund',
        program_type: 'loan',
        incentive_amount_max: 10000000,
        application_url: 'https://www.deq.louisiana.gov/page/cwsrf',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  KY: {
    programs: [
      {
        program_id: 'KY_STATE_WATER_FINANCE_2025',
        program_name: 'Kentucky Infrastructure Authority Water Loan',
        program_type: 'loan',
        incentive_amount_max: 7000000,
        application_url: 'https://kia.ky.gov/Programs/Pages/default.aspx',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Low-interest financing for water projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  OK: {
    programs: [
      {
        program_id: 'OK_STATE_WATER_RESOURCES_2025',
        program_name: 'Oklahoma Water Resources Board Financial Assistance',
        program_type: 'loan',
        incentive_amount_max: 5000000,
        application_url: 'https://www.owrb.ok.gov/financing/fin_assist.php',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  NV: {
    programs: [
      {
        program_id: 'NV_STATE_WATER_CONSERVATION_2025',
        program_name: 'Nevada Division of Water Resources Grant',
        program_type: 'grant',
        incentive_amount_max: 200000,
        application_url: 'http://water.nv.gov/programs/planning/stateplan/conservation.aspx',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'State grants for water conservation planning',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  NM: {
    programs: [
      {
        program_id: 'NM_STATE_WATER_TRUST_2025',
        program_name: 'New Mexico Water Trust Board Grant',
        program_type: 'grant',
        incentive_amount_max: 1000000,
        application_url: 'https://www.ose.state.nm.us/WTB/',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'State grants for water conservation projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  UT: {
    programs: [
      {
        program_id: 'UT_STATE_WATER_CONSERVATION_2025',
        program_name: 'Utah Water Conservation Grant',
        program_type: 'grant',
        incentive_amount_max: 50000,
        application_url: 'https://water.utah.gov/conservation/',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'State grants for water conservation projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  AR: {
    programs: [
      {
        program_id: 'AR_STATE_WATER_PLAN_GRANT_2025',
        program_name: 'Arkansas Water Plan Grant',
        program_type: 'grant',
        incentive_amount_max: 300000,
        application_url: 'https://www.agriculture.arkansas.gov/natural-resources-division/water-resources/',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'State grants for water resource planning',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  IA: {
    programs: [
      {
        program_id: 'IA_STATE_SRF_LOAN_2025',
        program_name: 'Iowa State Revolving Fund',
        program_type: 'loan',
        incentive_amount_max: 10000000,
        application_url: 'https://www.iowasrf.com/',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  KS: {
    programs: [
      {
        program_id: 'KS_STATE_WATER_OFFICE_GRANT_2025',
        program_name: 'Kansas Water Office Grant',
        program_type: 'grant',
        incentive_amount_max: 250000,
        application_url: 'https://kwo.ks.gov/projects-programs/state-water-plan-fund',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'State grants for water conservation',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  NE: {
    programs: [
      {
        program_id: 'NE_STATE_WATER_SUSTAINABILITY_2025',
        program_name: 'Nebraska Water Sustainability Fund',
        program_type: 'grant',
        incentive_amount_max: 2000000,
        application_url: 'https://dnr.nebraska.gov/water-programs/water-sustainability-fund',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'State grants for water sustainability projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  ID: {
    programs: [
      {
        program_id: 'ID_STATE_WATER_RESOURCES_2025',
        program_name: 'Idaho Water Resources Board Grant',
        program_type: 'grant',
        incentive_amount_max: 500000,
        application_url: 'https://idwr.idaho.gov/iwrb/programs/',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'State grants for water resource projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },
  CT: {
    programs: [
      {
        program_id: 'CT_STATE_CLEAN_WATER_FUND_2025',
        program_name: 'Connecticut Clean Water Fund',
        program_type: 'loan',
        incentive_amount_max: 10000000,
        application_url: 'https://portal.ct.gov/DEEP/Water/Grants-and-Loans/Clean-Water-Fund',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Low-interest loans for water quality projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  }
};

async function addStatePrograms() {
  console.log('🏛️  Adding comprehensive state-level water conservation programs...\n');

  const programRows = [];
  const linkRows = [];
  const waterTypeRows = [];
  let totalPrograms = 0;

  for (const [stateCode, data] of Object.entries(statePrograms)) {
    for (const program of data.programs) {
      programRows.push({
        program_id: program.program_id,
        program_name: program.program_name,
        program_type: program.program_type,
        incentive_amount_min: program.incentive_amount_min || null,
        incentive_amount_max: program.incentive_amount_max || null,
        incentive_per_unit: program.incentive_per_unit || null,
        eligible_system_types: program.water_types?.join(', '),
        application_url: program.application_url,
        program_status: 'active',
        notes: program.notes,
        contact_email: program.contact_email || null,
        contact_phone: program.contact_phone || null
      });

      linkRows.push({
        program_id: program.program_id,
        jurisdiction_id: `${stateCode}_STATE`
      });

      if (program.water_types) {
        program.water_types.forEach(waterType => {
          waterTypeRows.push({
            program_id: program.program_id,
            water_type_id: waterType
          });
        });
      }

      totalPrograms++;
    }
  }

  console.log(`📊 States covered: ${Object.keys(statePrograms).length}`);
  console.log(`🎯 Programs to insert: ${totalPrograms}`);
  console.log(`🔗 Jurisdiction links: ${linkRows.length}`);
  console.log(`💧 Water type links: ${waterTypeRows.length}\n`);

  try {
    if (programRows.length > 0) {
      await bigquery.dataset(datasetId).table('programs_master').insert(programRows);
      console.log('✅ Programs inserted');
    }

    if (linkRows.length > 0) {
      await bigquery.dataset(datasetId).table('program_jurisdiction_link').insert(linkRows);
      console.log('✅ Jurisdiction links inserted');
    }

    if (waterTypeRows.length > 0) {
      await bigquery.dataset(datasetId).table('program_water_type_link').insert(waterTypeRows);
      console.log('✅ Water type links inserted');
    }

    console.log('\n🎉 All state programs successfully added!');

  } catch (error) {
    if (error.name === 'PartialFailureError') {
      console.error('⚠️  Some rows failed:', error.errors?.length, 'errors');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

addStatePrograms().catch(console.error);
