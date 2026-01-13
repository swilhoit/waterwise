-- Populate state_permit_details for all 50 states
-- Based on research of each state's greywater regulations

-- First, let's see what's already there
-- SELECT state_code FROM `greywater-prospects-2025.greywater_compliance.state_permit_details`;

-- Insert data for remaining states
-- Format: state_code, state_name, permit_authority, permit_framework, statewide_threshold_gpd,
--         laundry_to_landscape_allowed, branched_drain_allowed, surge_tank_allowed, indoor_reuse_allowed,
--         permit_exemptions, statewide_requirements, typical_permit_type, typical_fee_range,
--         typical_processing_days, diy_generally_allowed, state_guidance_url, state_code_url, notes, tips_for_residents

-- Already have: AZ, CA, CO, OR, TX
-- Need to add: AL, AK, AR, CT, DE, FL, GA, HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY, NC, ND, OH, OK, PA, RI, SC, SD, TN, UT, VT, VA, WA, WV, WI, WY

INSERT INTO `greywater-prospects-2025.greywater_compliance.state_permit_details`
(state_code, state_name, permit_authority, permit_framework, statewide_threshold_gpd,
 laundry_to_landscape_allowed, branched_drain_allowed, surge_tank_allowed, indoor_reuse_allowed,
 permit_exemptions, statewide_requirements, typical_permit_type, typical_fee_range,
 typical_processing_days, diy_generally_allowed, state_guidance_url, notes, tips_for_residents)
VALUES
-- ALABAMA - Very restrictive, requires septic discharge
('AL', 'Alabama', 'Local Health Departments', 'State plumbing code with local enforcement', NULL,
 false, false, false, false,
 [], ['Must discharge to septic system', 'No surface irrigation', 'Health department approval required'],
 'Plumbing permit', '$50-200', '2-4 weeks', false,
 'https://publichealth.alabama.gov/programs-services/environmental/',
 'Alabama requires greywater discharge to septic systems. Standalone greywater systems for irrigation are not explicitly permitted under state code.',
 'Contact local health department before planning any greywater project. Most systems must connect to septic.'),

-- ALASKA - Cold climate, limited regulations
('AK', 'Alaska', 'Department of Environmental Conservation', 'State wastewater regulations', NULL,
 false, false, true, false,
 [], ['Cold climate considerations', 'Must not contaminate groundwater'],
 'Wastewater permit', '$100-500', '4-8 weeks', false,
 'https://dec.alaska.gov/water/wastewater/',
 'Alaska has limited greywater-specific regulations due to climate. Systems must meet wastewater discharge standards.',
 'Cold climate makes outdoor greywater use seasonal. Consider indoor reuse with treatment systems.'),

-- ARKANSAS - Requires septic connection
('AR', 'Arkansas', 'Department of Health', 'On-site wastewater regulations', NULL,
 false, false, false, false,
 [], ['Must discharge to approved on-site system', 'Health department permit required'],
 'On-site system permit', '$75-300', '2-4 weeks', false,
 'https://www.healthy.arkansas.gov/programs-services/topics/on-site-wastewater',
 'Arkansas greywater must be discharged to approved on-site wastewater systems (septic). Standalone irrigation not explicitly allowed.',
 'Work with licensed installer. Greywater typically treated as part of septic system.'),

-- CONNECTICUT - Restrictive, health department oversight
('CT', 'Connecticut', 'Department of Public Health', 'Public Health Code', NULL,
 false, false, false, false,
 [], ['Health department approval', 'Professional installation required', 'Soil testing may be required'],
 'Subsurface disposal permit', '$200-500', '4-8 weeks', false,
 'https://portal.ct.gov/dph/Environmental-Health/Private-Well-and-Subsurface-Sewage',
 'Connecticut has strict oversight of subsurface wastewater disposal. Greywater systems require health department approval.',
 'Contact local health department early in planning process. Professional design typically required.'),

-- DELAWARE - Department of Natural Resources oversight
('DE', 'Delaware', 'DNREC', 'On-site wastewater regulations', NULL,
 false, false, true, false,
 [], ['Permit required', 'Must meet effluent standards'],
 'On-site system permit', '$100-400', '3-6 weeks', false,
 'https://dnrec.delaware.gov/waste-hazardous-substances/septic/',
 'Delaware regulates greywater under on-site wastewater programs. Contact DNREC for specific requirements.',
 'DNREC is primary contact. Systems typically must meet on-site wastewater standards.'),

-- FLORIDA - Emerging regulations, generally restrictive
('FL', 'Florida', 'Department of Health / DEP', 'Florida Administrative Code Chapter 64E-6', NULL,
 true, false, false, false,
 [], ['Health department permit', 'Subsurface disposal only', 'No spray irrigation'],
 'Plumbing/health permit', '$100-300', '2-4 weeks', false,
 'https://www.floridahealth.gov/environmental-health/onsite-sewage/index.html',
 'Florida allows some greywater reuse but with restrictions. Laundry water to subsurface irrigation may be permitted.',
 'Contact county health department. Requirements vary significantly by county.'),

-- GEORGIA - Local jurisdiction control
('GA', 'Georgia', 'Local Health Departments', 'Georgia Rules Chapter 511-3-1', NULL,
 true, true, false, false,
 [], ['Local health department approval', 'Subsurface only', 'No food crop application'],
 'Local permit', '$50-200', '2-4 weeks', true,
 'https://dph.georgia.gov/environmental-health/onsite-sewage',
 'Georgia allows greywater with local health department approval. Requirements vary by county.',
 'Start with county health department. Simple laundry-to-landscape often approved.'),

-- HAWAII - Water-conscious, increasingly supportive
('HI', 'Hawaii', 'Department of Health', 'Hawaii Administrative Rules Title 11 Chapter 62', NULL,
 true, true, true, false,
 ['Simple laundry-to-landscape under 400 GPD'], ['No spray irrigation', 'Subsurface only', 'Licensed installer for permitted systems'],
 'Plumbing permit', '$100-400', '2-6 weeks', true,
 'https://health.hawaii.gov/wastewater/',
 'Hawaii has adopted greywater-friendly regulations. Simple systems may be exempt from permits.',
 'Water is precious in Hawaii. Many utilities offer rebates for water conservation.'),

-- IDAHO - Follows plumbing code
('ID', 'Idaho', 'Division of Building Safety', 'Idaho Plumbing Code', NULL,
 true, true, false, false,
 [], ['Plumbing permit required', 'Must meet code requirements'],
 'Plumbing permit', '$50-150', '1-3 weeks', true,
 'https://dbs.idaho.gov/programs/plumbing/',
 'Idaho regulates greywater through plumbing code. Permits typically required.',
 'Work with local building department. Code follows Uniform Plumbing Code appendix.'),

-- ILLINOIS - Health department oversight
('IL', 'Illinois', 'Department of Public Health', 'Private Sewage Disposal Code', NULL,
 false, false, false, false,
 [], ['Health department permit', 'Must connect to approved system'],
 'Private sewage permit', '$100-300', '3-6 weeks', false,
 'https://dph.illinois.gov/topics-services/environmental-health-protection/private-sewage-disposal.html',
 'Illinois requires greywater to be treated as sewage and disposed through approved systems.',
 'Contact local health department. Greywater typically must go to septic or sewer.'),

-- INDIANA - State plumbing code
('IN', 'Indiana', 'State Department of Health', 'Indiana Plumbing Code', NULL,
 false, false, false, false,
 [], ['Local health approval', 'Connection to sewage system typically required'],
 'Plumbing permit', '$50-200', '2-4 weeks', false,
 'https://www.in.gov/health/eph/',
 'Indiana regulates greywater under plumbing code. Separate greywater systems not explicitly authorized statewide.',
 'Check with local health department. Some counties may allow simple laundry systems.'),

-- IOWA - Restrictive
('IA', 'Iowa', 'Department of Natural Resources', 'On-site wastewater regulations', NULL,
 false, false, false, false,
 [], ['Must discharge to approved system', 'DNR approval required'],
 'On-site system permit', '$100-400', '4-8 weeks', false,
 'https://www.iowadnr.gov/Environmental-Protection/Water-Quality/Wastewater',
 'Iowa requires greywater disposal through approved on-site systems.',
 'Contact county sanitarian or DNR for guidance on what is permitted locally.'),

-- KANSAS - Local control
('KS', 'Kansas', 'Department of Health and Environment', 'Kansas Administrative Regulations', NULL,
 false, false, false, false,
 [], ['Local health department approval', 'Must meet wastewater standards'],
 'Local permit', '$50-200', '2-4 weeks', false,
 'https://www.kdhe.ks.gov/175/Wastewater',
 'Kansas regulates through local health departments. Greywater reuse not explicitly authorized statewide.',
 'Contact county or city health department for local requirements.'),

-- KENTUCKY - Health department control
('KY', 'Kentucky', 'Division of Water / Local Health', 'Kentucky Administrative Regulations', NULL,
 false, false, false, false,
 [], ['Health department permit', 'Must meet on-site disposal standards'],
 'Health department permit', '$75-250', '3-6 weeks', false,
 'https://eec.ky.gov/Environmental-Protection/Water/Pages/default.aspx',
 'Kentucky regulates greywater disposal through local health departments.',
 'Contact local health department. Greywater typically treated as wastewater.'),

-- LOUISIANA - Health department
('LA', 'Louisiana', 'Department of Health', 'Louisiana Sanitary Code', NULL,
 false, false, false, false,
 [], ['State health code compliance', 'Approved disposal system required'],
 'Sanitary permit', '$100-300', '3-6 weeks', false,
 'https://ldh.la.gov/page/634',
 'Louisiana Sanitary Code governs greywater disposal. Reuse systems require approval.',
 'Contact parish health unit for requirements. High water table areas have additional restrictions.'),

-- MAINE - Progressive for Northeast
('ME', 'Maine', 'Department of Environmental Protection', 'Subsurface Wastewater Disposal Rules', NULL,
 true, true, false, false,
 ['Laundry-to-landscape under specific conditions'], ['Subsurface disposal', 'DEP or local approval'],
 'Plumbing/disposal permit', '$50-200', '2-4 weeks', true,
 'https://www.maine.gov/dep/water/wwtreatment/',
 'Maine allows greywater with appropriate disposal methods. Some simple systems may be exempt.',
 'Maine is relatively greywater-friendly for the Northeast. Contact DEP for guidance.'),

-- MARYLAND - Health department oversight
('MD', 'Maryland', 'Department of Environment / Health', 'COMAR regulations', NULL,
 false, false, false, false,
 [], ['Local health approval', 'Must meet on-site disposal standards'],
 'Health permit', '$100-400', '4-8 weeks', false,
 'https://mde.maryland.gov/programs/Water/Pages/index.aspx',
 'Maryland requires health department approval for non-standard wastewater disposal.',
 'Contact county health department. Water reuse programs are expanding.'),

-- MASSACHUSETTS - Strict regulations
('MA', 'Massachusetts', 'Department of Environmental Protection', 'Title 5', NULL,
 false, false, false, false,
 [], ['Title 5 compliance', 'DEP or local approval', 'Professional design'],
 'Title 5 variance', '$200-500', '4-8 weeks', false,
 'https://www.mass.gov/info-details/title-5-septic-systems-702-cmr-15-regulations',
 'Massachusetts Title 5 governs wastewater disposal. Greywater systems may require variance.',
 'Work with licensed Title 5 engineer. DEP has pilot programs for water reuse.'),

-- MICHIGAN - Environmental quality oversight
('MI', 'Michigan', 'EGLE', 'Michigan plumbing code', NULL,
 false, false, false, false,
 [], ['Plumbing code compliance', 'Local approval required'],
 'Plumbing permit', '$50-200', '2-4 weeks', false,
 'https://www.michigan.gov/egle/about/organization/drinking-water-and-environmental-health/onsite-wastewater',
 'Michigan regulates through plumbing code and local health departments.',
 'Contact county or city building department. Requirements vary locally.'),

-- MINNESOTA - State plumbing code
('MN', 'Minnesota', 'Department of Labor and Industry', 'Minnesota Plumbing Code', NULL,
 false, false, false, false,
 [], ['Plumbing code compliance', 'Disposal to approved system'],
 'Plumbing permit', '$50-150', '1-3 weeks', false,
 'https://www.dli.mn.gov/workers/plumbing',
 'Minnesota plumbing code requires greywater to drain to approved disposal systems.',
 'Contact local building department. Cold climate limits outdoor reuse season.'),

-- MISSISSIPPI - Health department
('MS', 'Mississippi', 'Department of Health', 'On-site wastewater regulations', NULL,
 false, false, false, false,
 [], ['Health department permit', 'Approved disposal system'],
 'Health permit', '$75-250', '3-6 weeks', false,
 'https://msdh.ms.gov/page/30,0,82.html',
 'Mississippi requires greywater disposal through approved on-site systems.',
 'Contact county health department for requirements.'),

-- MISSOURI - Local control
('MO', 'Missouri', 'Department of Health and Senior Services', 'State regulations with local enforcement', NULL,
 false, false, false, false,
 [], ['Local health approval', 'Must meet disposal standards'],
 'Local permit', '$50-200', '2-4 weeks', false,
 'https://health.mo.gov/living/environment/onsitefacilities/',
 'Missouri regulates through local health departments. Requirements vary.',
 'Contact county health department for local requirements and interpretation.'),

-- MONTANA - Rural-friendly
('MT', 'Montana', 'Department of Environmental Quality', 'Montana plumbing code', NULL,
 true, true, false, false,
 [], ['DEQ approval for larger systems', 'Plumbing code compliance'],
 'Plumbing permit', '$50-150', '1-3 weeks', true,
 'https://deq.mt.gov/Water/Programs/wqinfo',
 'Montana allows some greywater reuse. Contact DEQ for guidance on specific systems.',
 'Rural properties have more flexibility. Urban areas follow stricter plumbing code.'),

-- NEBRASKA - State environmental quality
('NE', 'Nebraska', 'Department of Environment and Energy', 'Title 124', NULL,
 false, false, false, false,
 [], ['NDEE regulations', 'Approved disposal system'],
 'Environmental permit', '$100-300', '3-6 weeks', false,
 'https://dee.ne.gov/NDEQProg.nsf/OnWeb/WW',
 'Nebraska regulates wastewater disposal under Title 124. Greywater systems require review.',
 'Contact NDEE for guidance. On-site disposal must meet state standards.'),

-- NEVADA - Water-scarce, increasingly supportive
('NV', 'Nevada', 'Division of Environmental Protection', 'NAC 445A', NULL,
 true, true, true, false,
 ['Simple laundry systems under certain conditions'], ['Subsurface irrigation only', 'No food crops', 'DEP approval for larger systems'],
 'Plumbing/environmental permit', '$50-200', '2-4 weeks', true,
 'https://ndep.nv.gov/water',
 'Nevada supports greywater reuse due to water scarcity. Simple systems may be exempt from permits.',
 'Water is precious in Nevada. Check for utility rebates. Southern Nevada Water Authority has resources.'),

-- NEW HAMPSHIRE - Environmental services
('NH', 'New Hampshire', 'Department of Environmental Services', 'Env-Wq 1000', NULL,
 false, false, false, false,
 [], ['DES approval', 'On-site system compliance'],
 'Subsurface disposal permit', '$100-400', '4-8 weeks', false,
 'https://www.des.nh.gov/water/wastewater',
 'New Hampshire requires approval for non-standard wastewater disposal.',
 'Contact DES for guidance. Septic system rules typically apply.'),

-- NEW JERSEY - Health department
('NJ', 'New Jersey', 'Department of Environmental Protection', 'N.J.A.C. 7:9A', NULL,
 false, false, false, false,
 [], ['DEP standards', 'Local health approval'],
 'On-site permit', '$200-500', '4-8 weeks', false,
 'https://www.nj.gov/dep/dwq/owm.htm',
 'New Jersey has strict wastewater regulations. Alternative systems require approval.',
 'Work with licensed engineer. DEP has pilot programs for water reuse.'),

-- NEW MEXICO - Very progressive
('NM', 'New Mexico', 'Environment Department', 'NMAC 20.7.3', 250,
 true, true, true, false,
 ['Simple laundry-to-landscape under 250 GPD exempt'], ['No spray irrigation', 'Subsurface only', 'No connection to potable'],
 'Plumbing permit for larger systems', '$50-200', '1-3 weeks', true,
 'https://www.env.nm.gov/liquid_waste/',
 'New Mexico has progressive greywater regulations. Simple systems under 250 GPD are exempt from permits.',
 'Water-scarce state with good greywater support. Check local utility rebate programs.'),

-- NEW YORK - Health department control
('NY', 'New York', 'Department of Health / DEC', '10 NYCRR Appendix 75-A', NULL,
 false, false, false, false,
 [], ['Health department approval', 'DEC standards for larger systems'],
 'Health/environmental permit', '$100-500', '4-8 weeks', false,
 'https://www.health.ny.gov/environmental/water/drinking/',
 'New York requires health department approval for greywater systems. Comprehensive standards under development.',
 'Contact county health department. NYC and other cities have additional requirements.'),

-- NORTH CAROLINA - Environmental quality
('NC', 'North Carolina', 'Department of Environmental Quality', 'NC Administrative Code', NULL,
 true, true, false, false,
 [], ['DEQ approval', 'Local health department coordination'],
 'Environmental permit', '$100-300', '3-6 weeks', false,
 'https://deq.nc.gov/about/divisions/water-resources/water-resources-permits/wastewater-branch',
 'North Carolina allows some greywater reuse with proper approval.',
 'Contact DEQ and local health department. Requirements vary by county.'),

-- NORTH DAKOTA - Environmental quality
('ND', 'North Dakota', 'Department of Environmental Quality', 'State plumbing code', NULL,
 false, false, false, false,
 [], ['Plumbing code compliance', 'Approved disposal'],
 'Plumbing permit', '$50-150', '1-3 weeks', false,
 'https://deq.nd.gov/wq/',
 'North Dakota regulates through plumbing code. Cold climate limits reuse options.',
 'Contact local building department. Seasonal use only practical.'),

-- OHIO - Health department
('OH', 'Ohio', 'Department of Health', 'Ohio Administrative Code 3701-29', NULL,
 false, false, false, false,
 [], ['Health department approval', 'Sewage treatment standards'],
 'Health permit', '$100-300', '3-6 weeks', false,
 'https://odh.ohio.gov/know-our-programs/sewage-treatment-systems/welcome',
 'Ohio treats greywater as sewage requiring approved treatment systems.',
 'Contact local health department. Systems must meet sewage treatment standards.'),

-- OKLAHOMA - Environmental quality
('OK', 'Oklahoma', 'Department of Environmental Quality', 'OAC 252:641', NULL,
 true, true, false, false,
 [], ['DEQ standards', 'Subsurface disposal'],
 'Environmental permit', '$75-250', '2-4 weeks', true,
 'https://www.deq.ok.gov/water-quality-division/',
 'Oklahoma allows greywater with DEQ approval. Subsurface irrigation permitted.',
 'Contact DEQ for guidance. Water conservation incentives available in some areas.'),

-- PENNSYLVANIA - Environmental protection
('PA', 'Pennsylvania', 'Department of Environmental Protection', '25 Pa. Code Chapter 73', NULL,
 false, false, false, false,
 [], ['DEP approval', 'Sewage facilities planning'],
 'Sewage permit', '$100-400', '4-8 weeks', false,
 'https://www.dep.pa.gov/Business/Water/CleanWater/WastewaterMgmt/Pages/default.aspx',
 'Pennsylvania requires sewage facilities planning approval for alternative systems.',
 'Work with SEO. Alternative systems require significant documentation.'),

-- RHODE ISLAND - Environmental management
('RI', 'Rhode Island', 'Department of Environmental Management', 'OWTS regulations', NULL,
 false, false, false, false,
 [], ['DEM approval', 'OWTS standards'],
 'OWTS permit', '$200-500', '4-8 weeks', false,
 'https://dem.ri.gov/environmental-management-programs/water-resources/owts-septic-systems',
 'Rhode Island regulates under OWTS rules. Alternative systems require variance.',
 'Contact DEM for guidance on what may be approved.'),

-- SOUTH CAROLINA - Health and environmental
('SC', 'South Carolina', 'DHEC', 'R.61-56', NULL,
 true, true, false, false,
 [], ['DHEC approval', 'Subsurface disposal'],
 'DHEC permit', '$75-250', '2-4 weeks', false,
 'https://scdhec.gov/environment/your-water-coast/septic-tanks-wastewater',
 'South Carolina allows some greywater with DHEC approval.',
 'Contact DHEC regional office for requirements.'),

-- SOUTH DAKOTA - Environmental and natural resources
('SD', 'South Dakota', 'DENR', 'ARSD 74:53', NULL,
 false, false, false, false,
 [], ['DENR standards', 'Approved disposal'],
 'On-site permit', '$50-200', '2-4 weeks', false,
 'https://denr.sd.gov/des/ww/wwhome.aspx',
 'South Dakota regulates through DENR. Cold climate limits outdoor reuse.',
 'Contact DENR for guidance. Seasonal use considerations.'),

-- TENNESSEE - Environment and conservation
('TN', 'Tennessee', 'Department of Environment and Conservation', 'TCA 68-221', NULL,
 false, false, false, false,
 [], ['TDEC approval', 'Subsurface system standards'],
 'Subsurface permit', '$100-300', '3-6 weeks', false,
 'https://www.tn.gov/environment/program-areas/wr-water-resources/water-quality.html',
 'Tennessee regulates subsurface disposal through TDEC.',
 'Contact county or TDEC for local requirements.'),

-- UTAH - Progressive water-scarce state
('UT', 'Utah', 'Department of Environmental Quality', 'R317-401', 400,
 true, true, true, false,
 ['Simple laundry systems under 400 GPD'], ['Subsurface irrigation', 'No food crops', 'DEQ notification for permitted systems'],
 'Plumbing permit', '$50-150', '1-3 weeks', true,
 'https://deq.utah.gov/water-quality',
 'Utah supports greywater due to water scarcity. Simple laundry systems may be exempt.',
 'Water conservation is important in Utah. Check for utility rebates and incentives.'),

-- VERMONT - Environmental conservation
('VT', 'Vermont', 'Department of Environmental Conservation', 'Environmental Protection Rules', NULL,
 false, false, false, false,
 [], ['DEC approval', 'Wastewater system standards'],
 'Wastewater permit', '$100-400', '4-8 weeks', false,
 'https://dec.vermont.gov/water/wastewater-management',
 'Vermont regulates under wastewater system rules. Alternative systems require DEC approval.',
 'Contact DEC regional office. Cold climate limits outdoor use season.'),

-- VIRGINIA - Health department
('VA', 'Virginia', 'Department of Health', 'Virginia Administrative Code', NULL,
 false, false, false, false,
 [], ['VDH approval', 'On-site sewage disposal standards'],
 'VDH permit', '$100-300', '3-6 weeks', false,
 'https://www.vdh.virginia.gov/environmental-health/onsite-sewage-water-services-updated/',
 'Virginia requires VDH approval for alternative wastewater systems.',
 'Contact local health department. Professional engineer may be required.'),

-- WASHINGTON - Progressive
('WA', 'Washington', 'Department of Health', 'WAC 246-272A', NULL,
 true, true, true, false,
 ['Certain laundry-to-landscape systems'], ['DOH guidelines', 'Local health jurisdiction approval'],
 'On-site permit', '$100-400', '2-6 weeks', true,
 'https://doh.wa.gov/community-and-environment/wastewater-management/greywater-reuse',
 'Washington has specific greywater guidelines. DOH provides technical guidance.',
 'Check DOH greywater guidance document. Local health jurisdiction has final say.'),

-- WEST VIRGINIA - Environmental protection
('WV', 'West Virginia', 'Department of Environmental Protection', 'Title 64 Series 9', NULL,
 false, false, false, false,
 [], ['DEP approval', 'On-site wastewater standards'],
 'On-site permit', '$75-250', '3-6 weeks', false,
 'https://dep.wv.gov/WWE/Programs/septic/Pages/default.aspx',
 'West Virginia regulates through DEP on-site wastewater program.',
 'Contact county sanitarian or DEP for requirements.'),

-- WISCONSIN - Natural resources
('WI', 'Wisconsin', 'Department of Safety and Professional Services', 'Wisconsin Plumbing Code', NULL,
 false, false, false, false,
 [], ['Plumbing code compliance', 'POWTS regulations'],
 'Plumbing/POWTS permit', '$100-300', '2-4 weeks', false,
 'https://dsps.wi.gov/Pages/Programs/Plumbing/Default.aspx',
 'Wisconsin regulates through plumbing code and POWTS rules.',
 'Contact local building department. Cold climate limits outdoor use.'),

-- WYOMING - Environmental quality
('WY', 'Wyoming', 'Department of Environmental Quality', 'DEQ regulations', NULL,
 true, true, false, false,
 [], ['DEQ approval for larger systems', 'Subsurface disposal'],
 'Plumbing/DEQ permit', '$50-150', '1-3 weeks', true,
 'https://deq.wyoming.gov/water-quality/',
 'Wyoming allows some greywater with proper approval. Rural properties have more flexibility.',
 'Contact DEQ for guidance. Water scarcity makes reuse attractive.');
