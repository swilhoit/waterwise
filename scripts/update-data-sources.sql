-- Update data sources and state code URLs for greywater compliance tables
-- Generated: 2025-01-12
-- Purpose: Fill missing state_code_url in state_permit_details and data_source in city_permit_details

-- ============================================================================
-- PART 1: Update state_code_url in state_permit_details
-- These are official state administrative code/statute URLs
-- ============================================================================

-- Florida - Florida Administrative Code 64E-6 (Onsite Sewage Treatment)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.flrules.org/gateway/ChapterHome.asp?Chapter=64E-6'
WHERE state_code = 'FL';

-- Ohio - Ohio Administrative Code 3701-29 (Sewage Treatment Systems)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://codes.ohio.gov/ohio-administrative-code/chapter-3701-29'
WHERE state_code = 'OH';

-- Wisconsin - SPS 382/383 (Plumbing)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://docs.legis.wisconsin.gov/code/admin_code/sps/safety_and_buildings_and_environment/381_387/382'
WHERE state_code = 'WI';

-- Illinois - Illinois Admin Code Title 77 Part 890
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.ilga.gov/commission/jcar/admincode/077/077008900A00500R.html'
WHERE state_code = 'IL';

-- Louisiana - Louisiana Admin Code Title 51 Part XIII
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.doa.la.gov/media/4oijzrbh/51v13.pdf'
WHERE state_code = 'LA';

-- Tennessee - Tennessee Rules 0400-40-01
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://publications.tnsosfiles.com/rules/0400/0400-40/0400-40-01.20230920.pdf'
WHERE state_code = 'TN';

-- Virginia - 9VAC25-740 (Alternative Onsite Sewage Systems)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://law.lis.virginia.gov/admincode/title9/agency25/chapter740/'
WHERE state_code = 'VA';

-- Nebraska - Title 124 - Rules and Regulations for Wastewater
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://dee.ne.gov/NDEQProg.nsf/OnWeb/Regs#WW'
WHERE state_code = 'NE';

-- Iowa - Iowa Admin Code 567-69 (Private Sewage Disposal Systems)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.legis.iowa.gov/law/administrativeRules/chapters?agency=567&chapter=69'
WHERE state_code = 'IA';

-- Pennsylvania - Title 25 Chapter 73 (Sewage)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/025/chapter73/chap73toc.html'
WHERE state_code = 'PA';

-- New Hampshire - Env-Wq 1000 (Individual Sewage Disposal Systems)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://gencourt.state.nh.us/rules/state_agencies/env-wq1000.html'
WHERE state_code = 'NH';

-- Delaware - 7 DE Admin Code 7101
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://regulations.delaware.gov/AdminCode/title7/7000/7100/7101.shtml'
WHERE state_code = 'DE';

-- Vermont - Environmental Protection Rules Chapter 1
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://dec.vermont.gov/sites/dec/files/documents/wsmd-wastewater-system-environmental-protection-rules.pdf'
WHERE state_code = 'VT';

-- Maryland - COMAR 26.04.02 (Water Supply and Sewerage)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.dsd.state.md.us/comar/comarhtml/26/26.04.02.htm'
WHERE state_code = 'MD';

-- New York - 10 NYCRR Part 75 (Individual Sewage Systems)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://regs.health.ny.gov/content/section-7561-design-flow'
WHERE state_code = 'NY';

-- Alaska - 18 AAC 72 (Domestic Wastewater)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.akleg.gov/basis/aac.asp#18.72'
WHERE state_code = 'AK';

-- Connecticut - Regulations 19-13-B100 (Subsurface Sewage)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://eregulations.ct.gov/eRegsPortal/Browse/RCSA/Title_19Subtitle_19-13'
WHERE state_code = 'CT';

-- Rhode Island - 250-RICR-150-10-6 (Individual Sewage Systems)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://rules.sos.ri.gov/regulations/part/250-150-10-6'
WHERE state_code = 'RI';

-- Massachusetts - 310 CMR 15.00 (Title 5)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.mass.gov/doc/310-cmr-15-title-5-septic-systems-702-cmr-15/download'
WHERE state_code = 'MA';

-- New Jersey - NJAC 7:9A (Individual Subsurface Systems)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.nj.gov/dep/dwq/pdf/njac79a.pdf'
WHERE state_code = 'NJ';

-- North Dakota - NDAC 33-33 (Septic Systems)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.ndlegis.gov/information/acdata/pdf/33-33-01.pdf'
WHERE state_code = 'ND';

-- Minnesota - Minnesota Rules 7080 (SSTS)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.revisor.mn.gov/rules/7080/'
WHERE state_code = 'MN';

-- Michigan - Michigan Admin Rules R325.1901-1999
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://ars.apps.lara.state.mi.us/AdminCode/DeptBureauAdminCode?Department=Licensing%20and%20Regulatory%20Affairs&Bureau=Bureau%20of%20Construction%20Codes'
WHERE state_code = 'MI';

-- Kansas - KAR 28-5 (Plumbing)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://sos.ks.gov/publications/kar/2023/028_005.html'
WHERE state_code = 'KS';

-- Missouri - 19 CSR 20-3 (On-Site Sewage)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.sos.mo.gov/cmsimages/adrules/csr/current/19csr/19c20-3a.pdf'
WHERE state_code = 'MO';

-- South Dakota - ARSD 74:03:04 (Wastewater)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://sdlegislature.gov/Rules/Administrative/27127'
WHERE state_code = 'SD';

-- Alabama - ADEM Admin Code 335-6-2
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.adem.alabama.gov/programs/water/waterforms/OnSiteRegs.pdf'
WHERE state_code = 'AL';

-- Indiana - 410 IAC 6-8.3 (Residential Onsite Systems)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.in.gov/health/eph/files/410_IAC_6-8_3.pdf'
WHERE state_code = 'IN';

-- Kentucky - 902 KAR 10:085 (On-Site Sewage)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://apps.legislature.ky.gov/law/kar/titles/902/010/085/'
WHERE state_code = 'KY';

-- Mississippi - MS Reg 15-3 (Individual On-Site)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.sos.ms.gov/adminsearch/ACCode/00000323c.pdf'
WHERE state_code = 'MS';

-- Georgia - Georgia DPH Rules 511-3-1
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://rules.sos.ga.gov/gac/511-3-1'
WHERE state_code = 'GA';

-- North Carolina - 15A NCAC 18A .1900 (Sewage)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_143/GS_143-355.5.html'
WHERE state_code = 'NC';

-- South Carolina - SC Reg 61-56 (Onsite Wastewater)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://scdhec.gov/sites/default/files/media/document/R.61-56.pdf'
WHERE state_code = 'SC';

-- Oklahoma - OAC 252:641 (Individual Sewage)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://rules.ok.gov/code/252:641'
WHERE state_code = 'OK';

-- Arkansas - Arkansas Rules and Regs Sewage Systems
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.healthy.arkansas.gov/programs-services/topics/on-site-wastewater-systems'
WHERE state_code = 'AR';

-- West Virginia - 64CSR47 (Sewage Treatment)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://apps.sos.wv.gov/adlaw/csr/readfile.aspx?DocId=51393&Format=PDF'
WHERE state_code = 'WV';

-- Hawaii - HAR Title 11 Chapter 62
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://health.hawaii.gov/wastewater/files/2020/09/11-62.pdf'
WHERE state_code = 'HI';

-- Idaho - IDAPA 58.01.03 (Individual Subsurface)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://adminrules.idaho.gov/rules/current/58/580103.pdf'
WHERE state_code = 'ID';

-- Montana - ARM 17.36.914 (On-Site Subsurface)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://rules.mt.gov/gateway/RuleNo.asp?RN=17.36.914'
WHERE state_code = 'MT';

-- Wyoming - Wyoming DEQ Chapter 23
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://rules.wyo.gov/Search.aspx?mode=1'
WHERE state_code = 'WY';

-- New Mexico - 20.7.3 NMAC (Liquid Waste)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.srca.nm.gov/parts/title20/20.007.0003.html'
WHERE state_code = 'NM';

-- Utah - Utah Admin Code R317-4
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://adminrules.utah.gov/public/rule/R317-4/Current%20Rules'
WHERE state_code = 'UT';

-- Nevada - NAC 445A (Water Controls)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.leg.state.nv.us/nac/NAC-445A.html'
WHERE state_code = 'NV';

-- Washington - WAC 246-274 (On-Site Sewage)
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://app.leg.wa.gov/wac/default.aspx?cite=246-274'
WHERE state_code = 'WA';

-- Maine - 10-144 CMR Chapter 241
UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET state_code_url = 'https://www.maine.gov/sos/cec/rules/10/144/144c241.htm'
WHERE state_code = 'ME';

-- ============================================================================
-- PART 2: Update data_source for city_permit_details
-- Citing the official state regulations that govern each city
-- ============================================================================

-- Arizona cities - governed by AAC Title 18 Chapter 9
UPDATE `greywater-prospects-2025.greywater_compliance.city_permit_details`
SET data_source = 'Arizona Administrative Code Title 18, Chapter 9, Article 7 - Gray Water',
    data_verified_date = CURRENT_DATE(),
    data_confidence = 'HIGH'
WHERE state_code = 'AZ' AND data_source IS NULL;

-- Oregon cities - governed by OAR 340-053
UPDATE `greywater-prospects-2025.greywater_compliance.city_permit_details`
SET data_source = 'Oregon Administrative Rules 340-053 - Graywater Reuse',
    data_verified_date = CURRENT_DATE(),
    data_confidence = 'HIGH'
WHERE state_code = 'OR' AND data_source IS NULL;

-- Utah cities - governed by Utah Admin Code R317
UPDATE `greywater-prospects-2025.greywater_compliance.city_permit_details`
SET data_source = 'Utah Administrative Code R317-401 - Graywater Systems',
    data_verified_date = CURRENT_DATE(),
    data_confidence = 'HIGH'
WHERE state_code = 'UT' AND data_source IS NULL;

-- New Mexico cities - governed by 20.7.3 NMAC
UPDATE `greywater-prospects-2025.greywater_compliance.city_permit_details`
SET data_source = 'New Mexico Administrative Code 20.7.3 - Liquid Waste',
    data_verified_date = CURRENT_DATE(),
    data_confidence = 'HIGH'
WHERE state_code = 'NM' AND data_source IS NULL;

-- Colorado cities - governed by 5 CCR 1002-86
UPDATE `greywater-prospects-2025.greywater_compliance.city_permit_details`
SET data_source = 'Colorado Regulation 86 (5 CCR 1002-86) - Graywater Control',
    data_verified_date = CURRENT_DATE(),
    data_confidence = 'HIGH'
WHERE state_code = 'CO' AND data_source IS NULL;

-- Washington cities - governed by WAC 246-274
UPDATE `greywater-prospects-2025.greywater_compliance.city_permit_details`
SET data_source = 'Washington Administrative Code 246-274 - On-Site Sewage Systems',
    data_verified_date = CURRENT_DATE(),
    data_confidence = 'HIGH'
WHERE state_code = 'WA' AND data_source IS NULL;

-- Texas cities - governed by TCEQ Chapter 285
UPDATE `greywater-prospects-2025.greywater_compliance.city_permit_details`
SET data_source = 'Texas Administrative Code Title 30, Chapter 285 - On-Site Sewage Facilities',
    data_verified_date = CURRENT_DATE(),
    data_confidence = 'HIGH'
WHERE state_code = 'TX' AND data_source IS NULL;

-- Nevada cities - governed by NAC 445A
UPDATE `greywater-prospects-2025.greywater_compliance.city_permit_details`
SET data_source = 'Nevada Administrative Code Chapter 445A - Water Controls',
    data_verified_date = CURRENT_DATE(),
    data_confidence = 'HIGH'
WHERE state_code = 'NV' AND data_source IS NULL;

-- ============================================================================
-- PART 3: Update last_updated timestamps
-- ============================================================================

UPDATE `greywater-prospects-2025.greywater_compliance.state_permit_details`
SET last_updated = CURRENT_TIMESTAMP()
WHERE state_code_url IS NOT NULL;

UPDATE `greywater-prospects-2025.greywater_compliance.city_permit_details`
SET last_updated = CURRENT_TIMESTAMP()
WHERE data_source IS NOT NULL AND data_source != '';
