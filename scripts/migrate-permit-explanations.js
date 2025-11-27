const { BigQuery } = require('@google-cloud/bigquery');

const PROJECT_ID = 'greywater-prospects-2025';

const bigquery = new BigQuery({
  projectId: PROJECT_ID,
});

const datasetId = 'greywater_compliance';
const tableId = 'greywater_laws';

// Permit explanations for each state - plain language descriptions
const permitExplanations = {
  "AL": {
    permit_explanation: "Greywater systems in Alabama are evaluated individually by the Department of Environmental Management. There's no standard permit process - you'll need to submit an application and work with ADEM staff to determine if your proposed system can be approved. This case-by-case approach means the process may take several months and approval is not guaranteed.",
    permit_process: "Contact ADEM to discuss your project before purchasing equipment. Submit a detailed plan showing your proposed system design and intended use. Be prepared for site inspection and ongoing monitoring requirements."
  },
  "AK": {
    permit_explanation: "Alaska requires plumbing permits for all greywater systems, regardless of size. The good news: permit fees are very affordable ($1.50-$10.00). Your system must be installed by a licensed plumber and inspected before use. Only subsurface irrigation is allowed - no surface application or indoor reuse.",
    permit_process: "Apply for a plumbing permit through your local building department. Submit your system design showing compliance with the 2018 Uniform Plumbing Code Chapter 16. Schedule inspection after installation before using the system."
  },
  "AZ": {
    permit_explanation: "Arizona has the most homeowner-friendly permit system in the country. Simple systems under 400 gallons per day (typical for 1-2 washing machines) require NO permit - just follow the 13 best management practices. This means most residential laundry-to-landscape systems can be installed immediately without paperwork. Larger systems (400-3,000 gpd) need a general permit, and very large systems (3,000+ gpd) require individual permits. You may also qualify for a 25% tax credit up to $1,000.",
    permit_process: "For systems under 400 gpd: No permit needed - just follow the state's 13 best management practices. For larger systems: Apply through Arizona DEQ with system design plans and site evaluation."
  },
  "AR": {
    permit_explanation: "Arkansas has no clear permit pathway for residential greywater systems. State regulations only address greywater in the context of composting toilets, requiring it still go through conventional septic treatment. If you're within 300 feet of a sewer line, you must connect to municipal sewer - no greywater diversion allowed. Contact your local health department, but expect significant challenges getting approval.",
    permit_process: "Limited options available. Contact Arkansas Department of Health for guidance on whether any variance might be available for your specific situation."
  },
  "CA": {
    permit_explanation: "California allows simple laundry-to-landscape systems WITHOUT a permit when you meet 13 conditions: single-family home, washing machine discharge only, subsurface or mulch-basin irrigation, and following safety guidelines. This makes it easy for most homeowners to install a basic greywater system themselves. More complex systems (multiple fixtures, indoor reuse, or larger capacity) require a plumbing permit - typically $50-$200 depending on your jurisdiction. Treatment systems that recycle water for toilet flushing need more extensive permits.",
    permit_process: "For laundry-to-landscape: No permit needed if you meet all 13 conditions in California Plumbing Code Chapter 15. Keep documentation of compliance. For complex systems: Apply for a plumbing permit through your local building department with system design plans."
  },
  "CO": {
    permit_explanation: "Colorado is in a major transition period. Until January 1, 2026, greywater is only legal if your local government has specifically opted-in to allow it. After January 2026, greywater will be legal statewide unless your local government opts-out. Check with your city/county to see if greywater is currently allowed in your area. Where permitted, systems require local permits and must comply with water rights laws.",
    permit_process: "First, verify your jurisdiction allows greywater systems. If permitted, apply through your local building department. Include proof of compliance with Colorado's water rights requirements."
  },
  "CT": {
    permit_explanation: "Connecticut requires building permits for all greywater systems under the state building code. Your system can be used for toilet/urinal flushing or subsurface landscape irrigation, but must use blue/green dye to identify non-potable water. Professional installation and inspection are required. Expect a more involved permit process than western states.",
    permit_process: "Apply for a building permit through your local building department. Submit plans prepared by a licensed designer showing compliance with 2012 IPC Chapter 13. Schedule inspection before system operation."
  },
  "DE": {
    permit_explanation: "Delaware treats greywater as an \"innovative wastewater technology\" requiring case-by-case approval from DNREC. This means there's no standard permit - each application is evaluated individually. You'll need to demonstrate your system won't pollute groundwater or create health hazards. This process can be lengthy and approval is not guaranteed.",
    permit_process: "Submit an innovative technology application to DNREC with detailed system design, site assessment, and water quality protection plan. Expect extended review timeline and possible site inspections."
  },
  "FL": {
    permit_explanation: "Florida is one of the most restrictive states for greywater. All outdoor irrigation with greywater is PROHIBITED - only indoor toilet/urinal flushing is allowed, and that requires a permit and an NSF/ANSI 350 certified treatment system. These systems are expensive ($5,000-$15,000+). Florida's restrictions stem from public health concerns in the humid subtropical climate. However, you may qualify for tax credits for certified systems.",
    permit_process: "Indoor-only systems: Apply for plumbing permit with plans showing NSF/ANSI 350 certified treatment system. Outdoor irrigation: Not available in Florida regardless of treatment level."
  },
  "GA": {
    permit_explanation: "Georgia permits both indoor toilet flushing and outdoor subsurface irrigation, but requires permits and specific treatment standards (turbidity ≤10 NTU). Simple manual collection systems (like bucketing bath water) have fewer requirements than automated systems. Your local building department handles permits, and system design should follow the state's 2009 Gray Water Recycling Systems Guidelines.",
    permit_process: "Apply for a plumbing permit through your local building department. Provide system design meeting Georgia's treatment standards. More complex automated systems may require professional engineering design."
  },
  "HI": {
    permit_explanation: "Hawaii requires permits for all greywater systems, with the permit authority depending on your location. If you're NOT connected to municipal sewer, apply through the Department of Health. If you ARE connected to sewer, apply through your county authority. Only subsurface landscape irrigation is allowed - no surface application or indoor reuse. Kitchen and dishwasher water cannot be used. Hawaii recently approved its first condo greywater system (2024), showing increasing acceptance.",
    permit_process: "Non-sewer areas: Apply through Hawaii Department of Health Wastewater Branch. Sewer areas: Apply through your county authority. Include site evaluation and system design meeting state guidelines."
  },
  "ID": {
    permit_explanation: "Idaho allows greywater for lawn and landscape irrigation through local health district permits. Your local health district (not the state) has authority, so requirements may vary. Kitchen sink water cannot be included in your greywater system. Contact your local health district early to understand their specific requirements before planning your system.",
    permit_process: "Contact your local health district to understand requirements. Submit permit application with system design excluding kitchen water sources. Requirements may vary between Idaho's 7 health districts."
  },
  "IL": {
    permit_explanation: "Illinois effectively PROHIBITS residential greywater systems. All household wastewater - including washing machine and bath water - must go to municipal sewer or septic systems. There is no permit available for greywater diversion or reuse. Proposed plumbing code updates are pending, but currently no legal pathway exists for homeowners wanting to install greywater systems.",
    permit_process: "No permit pathway available. All greywater must be treated as wastewater and routed to sewer or septic systems."
  },
  "IN": {
    permit_explanation: "Indiana PROHIBITS standalone greywater systems. All household wastewater, including greywater from washing machines and showers, must flow to conventional septic systems or municipal sewer connections. There is no variance or permit process available for residential greywater reuse.",
    permit_process: "No permit pathway available. Greywater diversion is not permitted under Indiana regulations."
  },
  "IA": {
    permit_explanation: "Iowa has NO residential greywater regulations, which effectively means greywater systems are not permitted. The state's water reuse rules only cover treated municipal effluent for commercial applications like golf courses. Without a regulatory framework, homeowners cannot legally install greywater systems, and no permit process exists.",
    permit_process: "No permit pathway available. Iowa lacks residential greywater regulations."
  },
  "KS": {
    permit_explanation: "Kansas has minimal greywater guidance (from 2014), and any approval requires a special variance through your local health department. This means approval depends entirely on your local health officer's discretion - some may approve systems while others won't. There's no standardized process or guarantee of approval.",
    permit_process: "Contact your county health department to request a variance. Provide detailed system plans. Approval is at local discretion and not guaranteed."
  },
  "KY": {
    permit_explanation: "Kentucky has comprehensive, recently updated (2023) regulations that permit greywater for subsurface irrigation. Systems are sized at 55 gallons per day per bedroom and require 12-inch separation from groundwater. Laundry-only systems have a simpler path to approval. Permits are required through local health departments.",
    permit_process: "Apply through your local health department. System must be designed to Kentucky's sizing standards (55 gpd per bedroom). Include soil evaluation and groundwater separation documentation."
  },
  "LA": {
    permit_explanation: "Louisiana has NO specific greywater regulations, leaving residents without a legal pathway for water reuse. The state's environmental regulations focus on industrial activities, not residential conservation. Without regulations, no permit process exists for greywater systems.",
    permit_process: "No permit pathway available. Louisiana lacks residential greywater regulations."
  },
  "ME": {
    permit_explanation: "Maine allows greywater but requires integration with your septic system - standalone greywater-only systems are not permitted. Your greywater must flow through a septic tank and leaching system, which provides treatment but limits the water conservation benefits. Permits are required and systems must be designed by licensed site evaluators.",
    permit_process: "Work with a licensed site evaluator to design an integrated system. Apply through your local plumbing inspector. System must include septic tank and leaching components."
  },
  "MD": {
    permit_explanation: "Maryland passed legislation in 2018 authorizing greywater for gardening, composting, lawn watering, and toilet flushing - but implementation regulations are STILL being developed. This means the law exists but the permit process isn't yet established. Contact the Maryland Department of Environment for current status on when permits will be available.",
    permit_process: "Regulations pending development. Contact Maryland Department of Environment at 410-537-3000 for current status and timeline for permit availability."
  },
  "MA": {
    permit_explanation: "Massachusetts requires permits for all greywater systems through Title 5 (310 CMR 15.000), administered by local boards of health. Only subsurface irrigation is allowed - no surface application. Systems must be designed by certified professionals, adding cost but ensuring proper installation. Your local board of health issues permits and conducts inspections.",
    permit_process: "Hire a Title 5 designer to create system plans. Apply through your local board of health. Schedule required inspections during and after installation."
  },
  "MI": {
    permit_explanation: "Michigan allows greywater systems under local health department jurisdiction, meaning requirements vary across the state's 45 local health departments. You'll need to contact your local health department to understand their specific permit requirements and whether greywater is approved in your area. Some areas may be more receptive than others.",
    permit_process: "Contact your local health department to verify greywater is permitted in your jurisdiction and understand local requirements. Submit application with system design meeting local standards."
  },
  "MN": {
    permit_explanation: "Minnesota treats greywater as \"graywater reuse\" and requires treatment to specific water quality standards before any reuse. All systems require permits through local authorities. Kitchen sink water is excluded. The treatment requirements add significant cost but ensure safe water quality for both subsurface irrigation and indoor toilet flushing applications.",
    permit_process: "Apply through your local building or plumbing authority. System design must meet Minnesota's water quality treatment standards. Professional design typically required."
  },
  "MS": {
    permit_explanation: "Mississippi has NO formal residential greywater regulations, creating a regulatory void for homeowners. Without established rules, there's no clear permit pathway for greywater systems. Contact the Mississippi Department of Environmental Quality for guidance, but expect uncertainty about approval possibilities.",
    permit_process: "No established permit pathway. Contact Mississippi DEQ to discuss whether individual system approval might be possible."
  },
  "MO": {
    permit_explanation: "Missouri allows greywater under onsite wastewater regulations administered by the Department of Health and Senior Services. Systems require permits and must typically be part of an overall wastewater management plan. Only subsurface application is permitted - no surface irrigation or indoor reuse.",
    permit_process: "Apply through your local authority having jurisdiction for onsite wastewater systems. Include system design meeting Missouri Department of Health standards."
  },
  "MT": {
    permit_explanation: "Montana allows greywater for subsurface irrigation with permits issued through local health authorities. Kitchen sink and dishwasher water are excluded. The state takes a practical approach appropriate for its rural character, but requirements may vary by county. Contact your local health department for specific requirements in your area.",
    permit_process: "Contact your local health department for permit requirements. Submit system design excluding kitchen sources. Requirements may vary by jurisdiction."
  },
  "NE": {
    permit_explanation: "Nebraska has limited greywater regulations, with systems potentially approvable through local health department discretion. This means some areas may allow greywater while others don't, depending on local officials' interpretation. Contact your local health department before planning a system to understand if approval is possible.",
    permit_process: "Contact your local health department to verify greywater viability in your area. If permitted, submit application with system design for local review."
  },
  "NV": {
    permit_explanation: "Nevada permits greywater for subsurface irrigation, recognizing water conservation needs in the desert climate. Permits are required through local authorities, typically the county health district. Las Vegas and other urban areas have specific requirements, so check with your local jurisdiction. Systems must protect groundwater and public health while enabling water reuse.",
    permit_process: "Apply through your county health district or building department. Submit system design meeting Nevada's subsurface irrigation requirements. Urban areas may have additional local requirements."
  },
  "NH": {
    permit_explanation: "New Hampshire allows greywater under state subsurface disposal regulations. All systems require permits through the Department of Environmental Services or local authorities. Professional design is typically required, with systems needing to meet soil and groundwater protection standards. Only outdoor subsurface irrigation is permitted.",
    permit_process: "Apply through NH Department of Environmental Services or designated local authority. Include professional system design meeting subsurface disposal requirements."
  },
  "NJ": {
    permit_explanation: "New Jersey requires permits for greywater systems through local health departments, with oversight from the Department of Environmental Protection. The state's relatively dense population and environmental concerns result in careful scrutiny of applications. Only subsurface irrigation is typically approved, and treatment may be required.",
    permit_process: "Apply through your local health department. Provide system design meeting DEP standards. Expect review by both local and potentially state authorities for larger systems."
  },
  "NM": {
    permit_explanation: "New Mexico, with its arid climate, permits greywater for landscape irrigation with appropriate permits. The state allows both simple laundry systems and more complex multi-fixture setups, with permit requirements scaling to system complexity. Kitchen wastewater is typically excluded. Contact the New Mexico Environment Department for specific requirements.",
    permit_process: "Apply through your local building department or county. Submit system design appropriate for your water volume and intended use. Larger systems require more detailed plans."
  },
  "NY": {
    permit_explanation: "New York allows greywater systems under state building codes and local health department oversight. New York City has specific requirements different from the rest of the state. Permits are required in all cases, with system design needing to meet water quality and public health standards. Professional design is typically required.",
    permit_process: "NYC: Apply through NYC Department of Buildings. Rest of state: Apply through local health department. Professional design required meeting applicable building codes."
  },
  "NC": {
    permit_explanation: "North Carolina permits greywater for subsurface irrigation under state environmental rules. Local health departments issue permits and requirements may vary somewhat across the state. Systems must protect groundwater and cannot include kitchen wastewater. Treatment levels depend on intended use.",
    permit_process: "Apply through your local health department. Submit system design meeting NC DEQ standards. Include soil evaluation for subsurface application."
  },
  "ND": {
    permit_explanation: "North Dakota has limited formal greywater regulations, with approval possible through local health units on a case-by-case basis. The state's shorter growing season limits irrigation benefits, but water reuse may still be valuable. Contact your local health unit to understand if greywater systems are approved in your area.",
    permit_process: "Contact your local health unit to discuss approval possibilities. If permitted, submit application with system design for individual review."
  },
  "OH": {
    permit_explanation: "Ohio permits greywater systems for subsurface irrigation under local health department jurisdiction. The state's household sewage treatment regulations provide a framework for approval, but specific requirements vary by county. Kitchen wastewater is typically excluded. Contact your local health department for area-specific requirements.",
    permit_process: "Apply through your local health department. System must meet Ohio's household sewage treatment standards. Requirements may vary by county."
  },
  "OK": {
    permit_explanation: "Oklahoma allows greywater systems with permits from the Department of Environmental Quality or local authorities. The state's water scarcity in western regions makes greywater valuable for conservation. Only subsurface irrigation is typically permitted, and systems must protect groundwater resources.",
    permit_process: "Apply through Oklahoma DEQ or your local authority. Include system design meeting state subsurface application standards."
  },
  "OR": {
    permit_explanation: "Oregon has relatively progressive greywater rules, allowing simple laundry-to-landscape systems without permits in many cases when meeting specific conditions. More complex systems require permits through local building departments or DEQ. The state recognizes greywater's value for water conservation, particularly in water-stressed regions.",
    permit_process: "Simple laundry systems: May not require permit if meeting Oregon's conditions. Complex systems: Apply through local building department. Include system design meeting Oregon plumbing code requirements."
  },
  "PA": {
    permit_explanation: "Pennsylvania allows greywater under state sewage facilities regulations administered by local sewage enforcement officers. Permits are required for all systems. The state's approach focuses on groundwater protection, so systems must demonstrate they won't contaminate water supplies. Requirements may vary by municipality.",
    permit_process: "Apply through your local sewage enforcement officer. Submit system design meeting Pennsylvania DEP regulations. Include site evaluation for groundwater protection."
  },
  "RI": {
    permit_explanation: "Rhode Island permits greywater systems under state wastewater regulations with oversight from the Department of Environmental Management and local authorities. The small state has consistent statewide requirements, but all systems need permits and professional design. Only subsurface irrigation is typically approved.",
    permit_process: "Apply through DEM or local authority. Submit professionally designed plans meeting state wastewater treatment standards."
  },
  "SC": {
    permit_explanation: "South Carolina allows greywater for subsurface irrigation under DHEC regulations. Permits are required through local health departments. The state takes a balanced approach allowing water conservation while protecting public health. Kitchen wastewater is excluded, and systems must prevent surface exposure.",
    permit_process: "Apply through your local health department. Submit system design meeting DHEC subsurface application requirements."
  },
  "SD": {
    permit_explanation: "South Dakota has minimal formal greywater regulations, with systems potentially approvable through local discretion. The state's short growing season limits irrigation value in many areas. Contact the Department of Agriculture and Natural Resources for guidance on whether systems are approvable in your location.",
    permit_process: "Contact local authorities or DANR for guidance on approval possibilities. If permitted, submit application for case-by-case review."
  },
  "TN": {
    permit_explanation: "Tennessee permits greywater for subsurface irrigation under state environmental regulations. Local health departments issue permits, and requirements may vary across the state's diverse geography. Systems must protect groundwater and public health. Kitchen wastewater is typically excluded.",
    permit_process: "Apply through your local health department. Submit system design meeting Tennessee Department of Environment and Conservation standards."
  },
  "TX": {
    permit_explanation: "Texas allows greywater with one of the more flexible approaches in the South. Simple systems under 400 gallons per day for private residential irrigation may not require a permit in some jurisdictions. Larger systems and those in stricter jurisdictions need permits through local authorities. Austin and other cities offer rebate programs encouraging adoption.",
    permit_process: "Check with your local authority - simple residential systems may not require permits. Larger systems: Apply through local building or health department. Include system design meeting TCEQ standards."
  },
  "UT": {
    permit_explanation: "Utah permits greywater for subsurface irrigation, recognizing water conservation importance in the arid West. All systems require permits through local health departments. The state has established standards for residential systems that allow practical water reuse while protecting public health and groundwater.",
    permit_process: "Apply through your local health department. Submit system design meeting Utah Department of Environmental Quality standards for subsurface irrigation."
  },
  "VT": {
    permit_explanation: "Vermont allows greywater under its wastewater system regulations, requiring permits for all installations. Systems must be designed by licensed designers and meet state environmental protection standards. The short growing season limits irrigation value, but water reuse remains an option for environmentally conscious homeowners.",
    permit_process: "Work with a licensed wastewater designer. Apply through local authorities with professionally prepared plans meeting Vermont DEC standards."
  },
  "VA": {
    permit_explanation: "Virginia permits greywater for subsurface irrigation under state health department regulations. Local health departments issue permits and conduct inspections. Systems must meet treatment and application standards that protect groundwater. Professional design is typically required for larger installations.",
    permit_process: "Apply through your local health department. Submit system design meeting Virginia Department of Health standards. Schedule required inspections."
  },
  "WA": {
    permit_explanation: "Washington has progressive greywater rules, particularly in water-stressed areas. Simple laundry systems may be exempt from permits when meeting specific conditions. More complex systems require permits through local authorities. The state encourages water conservation while maintaining health protections, with requirements varying by county.",
    permit_process: "Simple laundry systems: Check if exempt from permit requirements. Complex systems: Apply through local building or health department meeting Washington State standards."
  },
  "WV": {
    permit_explanation: "West Virginia has limited greywater regulations, with systems potentially approvable through local health departments on a case-by-case basis. The state's focus on coal country environmental issues has left residential water reuse less developed. Contact your local health department to explore possibilities.",
    permit_process: "Contact your local health department for guidance. If interested in approval, submit system proposal for individual consideration."
  },
  "WI": {
    permit_explanation: "Wisconsin permits greywater for subsurface irrigation under state plumbing codes. All systems require permits through local authorities, typically the plumbing inspector or health department. The state's approach balances water conservation with groundwater protection standards appropriate for Wisconsin's geology.",
    permit_process: "Apply through your local plumbing inspector or building department. Submit system design meeting Wisconsin plumbing code requirements."
  },
  "WY": {
    permit_explanation: "Wyoming allows greywater systems with permits from local authorities or the Department of Environmental Quality. The state's arid climate makes water conservation valuable, though rural character means requirements may be less formalized in some areas. Contact DEQ or your local authority for specific requirements.",
    permit_process: "Contact Wyoming DEQ or local authority for permit requirements. Submit system design meeting applicable standards."
  },
  "DC": {
    permit_explanation: "Washington D.C. allows greywater systems under city building and plumbing codes. Permits are required through the Department of Consumer and Regulatory Affairs. Urban density means systems must meet strict standards to protect public health and infrastructure. Professional design and installation are required.",
    permit_process: "Apply through DCRA. Submit professionally designed plans meeting D.C. plumbing codes. Schedule required inspections."
  }
};

async function migratePermitExplanations() {
  console.log('Starting permit explanation migration to BigQuery...\n');

  let updatedCount = 0;
  let errorCount = 0;

  for (const [stateCode, data] of Object.entries(permitExplanations)) {
    try {
      // Escape single quotes in the text
      const explanation = data.permit_explanation.replace(/'/g, "\\'");
      const permitProcess = data.permit_process.replace(/'/g, "\\'");

      const query = `
        UPDATE \`${PROJECT_ID}.${datasetId}.${tableId}\`
        SET
          permit_explanation = '${explanation}',
          permit_process = '${permitProcess}'
        WHERE state_code = '${stateCode}'
      `;

      const [job] = await bigquery.createQueryJob({
        query,
        location: 'US'
      });

      await job.getQueryResults();
      console.log(`✓ Updated: ${stateCode}`);
      updatedCount++;
    } catch (error) {
      console.log(`✗ Error updating ${stateCode}: ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Migration complete!`);
  console.log(`Updated: ${updatedCount} states`);
  console.log(`Errors: ${errorCount} states`);
  console.log(`========================================\n`);

  // Verify the results
  const verifyQuery = `
    SELECT
      state_code,
      state_name,
      SUBSTR(permit_explanation, 1, 50) as explanation_preview,
      SUBSTR(permit_process, 1, 50) as process_preview
    FROM \`${PROJECT_ID}.${datasetId}.${tableId}\`
    WHERE permit_explanation IS NOT NULL
    ORDER BY state_code
    LIMIT 10
  `;

  try {
    const [rows] = await bigquery.query(verifyQuery);
    console.log('Sample of updated states:\n');
    console.table(rows.map(r => ({
      state: r.state_code,
      name: r.state_name,
      explanation: r.explanation_preview + '...',
      process: r.process_preview + '...'
    })));
  } catch (error) {
    console.error('Error verifying results:', error.message);
  }
}

migratePermitExplanations().catch(console.error);
