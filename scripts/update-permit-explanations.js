const { BigQuery } = require('@google-cloud/bigquery');

const PROJECT_ID = 'greywater-prospects-2025';
const bigquery = new BigQuery({ projectId: PROJECT_ID });

// Clearer, more actionable permit explanations
// Format: Quick answer first, then details
const betterExplanations = {
  "AL": {
    permit_explanation: "NO STANDARD PERMIT AVAILABLE. Alabama evaluates greywater systems case-by-case through ADEM. Expect a lengthy approval process with no guaranteed outcome. Most homeowners will find it difficult to get approval.",
    permit_process: "1. Contact ADEM before buying equipment. 2. Submit detailed system plans. 3. Wait for individual review (can take months). 4. Approval not guaranteed."
  },
  "AK": {
    permit_explanation: "PERMIT REQUIRED for all systems. Good news: fees are only $1.50-$10. Must use licensed plumber. Only subsurface irrigation allowed - no sprinklers or indoor reuse.",
    permit_process: "1. Get plumbing permit from local building dept. 2. Hire licensed plumber. 3. Install per 2018 UPC Chapter 16. 4. Schedule inspection before use."
  },
  "AZ": {
    permit_explanation: "NO PERMIT NEEDED for systems under 400 GPD (covers most homes with 1-2 washing machines). Just follow the 13 best practices. Larger systems need permits. Tax credit available: 25% up to $1,000.",
    permit_process: "Under 400 GPD: No paperwork - just follow Arizona's 13 best management practices. Over 400 GPD: Apply through Arizona DEQ."
  },
  "AR": {
    permit_explanation: "NO CLEAR PATH TO APPROVAL. Arkansas has no greywater regulations. If within 300 feet of sewer, you must connect. Greywater diversion is effectively not permitted.",
    permit_process: "Contact Arkansas Dept of Health for guidance, but expect significant challenges. No standard approval process exists."
  },
  "CA": {
    permit_explanation: "NO PERMIT NEEDED for simple laundry-to-landscape systems if you meet all 13 conditions (single-family home, washing machine only, subsurface/mulch basin irrigation). Complex systems and indoor reuse require permits ($50-$200).",
    permit_process: "Simple systems: Follow CA Plumbing Code Chapter 15 conditions - no permit needed. Complex systems: Get plumbing permit from your local building department."
  },
  "CO": {
    permit_explanation: "TRANSITIONING - Currently only legal if your city/county has opted in. After Jan 1, 2026, greywater will be legal statewide unless your jurisdiction opts out. Check with your local government first.",
    permit_process: "1. Verify your jurisdiction allows greywater. 2. If yes, apply through local building dept. 3. Must comply with water rights laws."
  },
  "CT": {
    permit_explanation: "PERMIT REQUIRED for all systems. Can be used for toilet flushing or subsurface irrigation. Must use blue/green dye to mark greywater pipes. Professional installation required.",
    permit_process: "1. Apply for building permit. 2. Submit plans per 2012 IPC Chapter 13. 3. Professional installation required. 4. Inspection before operation."
  },
  "DE": {
    permit_explanation: "CASE-BY-CASE APPROVAL only. No standard permit - each system evaluated individually by DNREC. Process is lengthy and approval uncertain.",
    permit_process: "Submit innovative technology application to DNREC with full system design and site assessment. Expect extended review period."
  },
  "FL": {
    permit_explanation: "HIGHLY RESTRICTED. Outdoor irrigation is PROHIBITED. Only indoor toilet/urinal flushing allowed, and requires expensive NSF/ANSI 350 certified system ($5,000-$15,000+).",
    permit_process: "Indoor reuse only: Get plumbing permit with NSF/ANSI 350 certified treatment system plans. No outdoor use permitted."
  },
  "GA": {
    permit_explanation: "PERMIT REQUIRED. Allows both toilet flushing and subsurface irrigation. Manual bucketing has fewer requirements. Treatment must meet turbidity standard (≤10 NTU).",
    permit_process: "Apply for plumbing permit through local building dept. Follow Georgia's 2009 Gray Water Recycling Guidelines."
  },
  "HI": {
    permit_explanation: "PERMIT REQUIRED. Authority depends on location: Dept of Health (not on sewer) or county (on sewer). Subsurface irrigation only - no surface application or indoor reuse. Kitchen water excluded.",
    permit_process: "Not on sewer: Apply through Dept of Health. On sewer: Apply through county. Include site evaluation and system design."
  },
  "ID": {
    permit_explanation: "PERMIT REQUIRED through local health district. Requirements vary by district. Kitchen sink water cannot be used. Contact your local health district before planning.",
    permit_process: "Contact your local health district for specific requirements - they vary across Idaho's 7 districts."
  },
  "IL": {
    permit_explanation: "NOT PERMITTED. Illinois prohibits greywater systems. All household wastewater must go to sewer or septic. No exceptions currently available.",
    permit_process: "No permit pathway exists. All greywater must flow to sewer/septic systems."
  },
  "IN": {
    permit_explanation: "NOT PERMITTED. Indiana prohibits standalone greywater systems. All wastewater must go to septic or municipal sewer. No variance process available.",
    permit_process: "No permit pathway exists. Greywater diversion is not allowed."
  },
  "IA": {
    permit_explanation: "NO REGULATIONS EXIST. Iowa has no residential greywater framework, effectively prohibiting systems. No permit process available.",
    permit_process: "No permit pathway exists. Iowa lacks greywater regulations."
  },
  "KS": {
    permit_explanation: "LOCAL DISCRETION ONLY. No state regulations - approval depends on your county health officer's willingness to grant a variance. Results vary widely.",
    permit_process: "Contact county health department to request variance. Approval is at local discretion and not guaranteed."
  },
  "KY": {
    permit_explanation: "PERMIT REQUIRED. Recent 2023 regulations allow subsurface irrigation. Systems sized at 55 GPD per bedroom. Laundry-only systems have simpler approval.",
    permit_process: "Apply through local health dept. System must meet Kentucky sizing standards (55 GPD/bedroom)."
  },
  "LA": {
    permit_explanation: "NO REGULATIONS EXIST. Louisiana has no greywater framework. No permit process available for residential systems.",
    permit_process: "No permit pathway exists. Louisiana lacks greywater regulations."
  },
  "ME": {
    permit_explanation: "PERMIT REQUIRED - must integrate with septic. Standalone greywater systems not allowed. Greywater must flow through septic tank and leaching system.",
    permit_process: "Work with licensed site evaluator. Apply through local plumbing inspector. Must include septic integration."
  },
  "MD": {
    permit_explanation: "LAW EXISTS BUT NO PERMITS YET. Maryland authorized greywater in 2018 but implementation regulations are still being developed. Check with MDE for current status.",
    permit_process: "Regulations still pending. Contact MD Dept of Environment (410-537-3000) for timeline on permit availability."
  },
  "MA": {
    permit_explanation: "PERMIT REQUIRED through local board of health. Subsurface irrigation only. Must be designed by certified Title 5 professional.",
    permit_process: "1. Hire Title 5 designer. 2. Apply through local board of health. 3. Schedule required inspections."
  },
  "MI": {
    permit_explanation: "LOCAL DISCRETION. Requirements vary across Michigan's 45 local health departments. Contact yours to verify if greywater is permitted in your area.",
    permit_process: "Contact local health department to verify availability and requirements - they vary significantly."
  },
  "MN": {
    permit_explanation: "PERMIT REQUIRED with treatment standards. Must meet water quality requirements before reuse. Kitchen water excluded. Can be used for irrigation or toilet flushing.",
    permit_process: "Apply through local building/plumbing authority. System must meet Minnesota's water quality treatment standards."
  },
  "MS": {
    permit_explanation: "NO REGULATIONS EXIST. Mississippi has no residential greywater framework. Approval unlikely without established rules.",
    permit_process: "Contact Mississippi DEQ to discuss possibilities, but no standard pathway exists."
  },
  "MO": {
    permit_explanation: "PERMIT REQUIRED under onsite wastewater rules. Subsurface application only - no surface irrigation or indoor reuse.",
    permit_process: "Apply through local authority for onsite wastewater systems."
  },
  "MT": {
    permit_explanation: "PERMIT REQUIRED through local health authority. Kitchen and dishwasher water excluded. Requirements may vary by county.",
    permit_process: "Contact local health department for permit requirements. Exclude kitchen water from system."
  },
  "NE": {
    permit_explanation: "LOCAL DISCRETION. Limited regulations - approval possible through local health department depending on your area.",
    permit_process: "Contact local health department to verify if greywater is approved in your area."
  },
  "NV": {
    permit_explanation: "PERMIT REQUIRED. Subsurface irrigation allowed. Urban areas (Las Vegas, etc.) may have additional requirements. Check with local health district.",
    permit_process: "Apply through county health district or building department."
  },
  "NH": {
    permit_explanation: "PERMIT REQUIRED through DES or local authority. Professional design required. Subsurface outdoor irrigation only.",
    permit_process: "Apply through NH Dept of Environmental Services or local authority with professional system design."
  },
  "NJ": {
    permit_explanation: "PERMIT REQUIRED through local health dept with DEP oversight. Subsurface irrigation typically approved. Treatment may be required.",
    permit_process: "Apply through local health department. System design must meet DEP standards."
  },
  "NM": {
    permit_explanation: "PERMIT REQUIRED. Allows landscape irrigation. Permit requirements scale with system size. Kitchen water typically excluded.",
    permit_process: "Apply through local building dept or county. Larger systems need more detailed plans."
  },
  "NY": {
    permit_explanation: "PERMIT REQUIRED. NYC has different requirements than rest of state. Professional design required. Check with local authority.",
    permit_process: "NYC: Apply through Dept of Buildings. Rest of state: Apply through local health department."
  },
  "NC": {
    permit_explanation: "PERMIT REQUIRED through local health dept. Subsurface irrigation allowed. Kitchen water excluded. Must protect groundwater.",
    permit_process: "Apply through local health department with soil evaluation."
  },
  "ND": {
    permit_explanation: "LIMITED REGULATIONS. Case-by-case approval through local health units. Short growing season limits practical benefits.",
    permit_process: "Contact local health unit to discuss approval possibilities."
  },
  "OH": {
    permit_explanation: "PERMIT REQUIRED through local health dept. Subsurface irrigation under household sewage rules. Requirements vary by county.",
    permit_process: "Apply through local health department. Requirements vary by county."
  },
  "OK": {
    permit_explanation: "PERMIT REQUIRED through DEQ or local authority. Subsurface irrigation allowed. Must protect groundwater.",
    permit_process: "Apply through Oklahoma DEQ or local authority."
  },
  "OR": {
    permit_explanation: "NO PERMIT NEEDED for simple laundry systems meeting state conditions. Complex systems require permits. Check Oregon's specific requirements.",
    permit_process: "Simple laundry: May be exempt - check Oregon's conditions. Complex: Apply through local building dept."
  },
  "PA": {
    permit_explanation: "PERMIT REQUIRED through local sewage enforcement officer. Must demonstrate groundwater protection. Requirements vary by municipality.",
    permit_process: "Apply through local sewage enforcement officer with site evaluation."
  },
  "RI": {
    permit_explanation: "PERMIT REQUIRED through DEM or local authority. Professional design required. Subsurface irrigation only.",
    permit_process: "Apply through DEM or local authority with professional plans."
  },
  "SC": {
    permit_explanation: "PERMIT REQUIRED through local health dept under DHEC rules. Subsurface irrigation allowed. Kitchen water excluded.",
    permit_process: "Apply through local health department."
  },
  "SD": {
    permit_explanation: "MINIMAL REGULATIONS. Case-by-case approval possible. Short growing season limits practical use.",
    permit_process: "Contact DANR or local authority for guidance."
  },
  "TN": {
    permit_explanation: "PERMIT REQUIRED through local health dept. Subsurface irrigation allowed. Kitchen water typically excluded.",
    permit_process: "Apply through local health department."
  },
  "TX": {
    permit_explanation: "NO PERMIT NEEDED for systems under 400 GPD in many jurisdictions. Check with your local authority - some areas have stricter rules. Austin and other cities offer rebates.",
    permit_process: "Under 400 GPD: Check if permit exempt in your area. Over 400 GPD: Apply through local building/health dept."
  },
  "UT": {
    permit_explanation: "PERMIT REQUIRED through local health dept. Subsurface irrigation allowed. State has established residential standards.",
    permit_process: "Apply through local health department."
  },
  "VT": {
    permit_explanation: "PERMIT REQUIRED. Must be designed by licensed wastewater professional. Short growing season limits benefits.",
    permit_process: "Work with licensed wastewater designer. Apply through local authority."
  },
  "VA": {
    permit_explanation: "PERMIT REQUIRED through local health dept. Subsurface irrigation allowed. Professional design may be required for larger systems.",
    permit_process: "Apply through local health department."
  },
  "WA": {
    permit_explanation: "NO PERMIT NEEDED for simple laundry systems in many areas. Complex systems require permits. Requirements vary by county.",
    permit_process: "Simple laundry: Check if exempt. Complex: Apply through local building/health dept."
  },
  "WV": {
    permit_explanation: "LIMITED REGULATIONS. Case-by-case approval through local health dept may be possible.",
    permit_process: "Contact local health department to explore possibilities."
  },
  "WI": {
    permit_explanation: "PERMIT REQUIRED under state plumbing codes. Subsurface irrigation allowed.",
    permit_process: "Apply through local plumbing inspector or building department."
  },
  "WY": {
    permit_explanation: "PERMIT REQUIRED through DEQ or local authority. Requirements may be less formal in rural areas.",
    permit_process: "Contact Wyoming DEQ or local authority for requirements."
  },
  "DC": {
    permit_explanation: "PERMIT REQUIRED through DCRA. Urban density means strict standards. Professional design and installation required.",
    permit_process: "Apply through DCRA with professional plans."
  }
};

async function updatePermitExplanations() {
  console.log('Updating permit explanations in BigQuery...\n');

  let updated = 0;
  let errors = 0;

  for (const [stateCode, data] of Object.entries(betterExplanations)) {
    try {
      const explanation = data.permit_explanation.replace(/'/g, "\\'");
      const process = data.permit_process.replace(/'/g, "\\'");

      const query = `
        UPDATE \`${PROJECT_ID}.greywater_compliance.greywater_laws\`
        SET
          permit_explanation = '${explanation}',
          permit_process = '${process}'
        WHERE state_code = '${stateCode}'
      `;

      const [job] = await bigquery.createQueryJob({ query, location: 'US' });
      await job.getQueryResults();
      console.log(`✓ ${stateCode}`);
      updated++;
    } catch (error) {
      console.log(`✗ ${stateCode}: ${error.message}`);
      errors++;
    }
  }

  console.log(`\nDone! Updated: ${updated}, Errors: ${errors}`);
}

updatePermitExplanations().catch(console.error);
