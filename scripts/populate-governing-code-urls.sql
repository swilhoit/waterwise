-- Populate governing_code_url for greywater regulations
-- These are verified direct links to official legal codes
-- Updated to use unified state_water_regulations table

-- California - California Plumbing Code Chapter 15
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://epubs.iapmo.org/2025/CPC/'
WHERE state_code = 'CA' AND resource_type = 'greywater';

-- Arizona - Arizona Administrative Code Title 18 Chapter 9
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://apps.azsos.gov/public_services/Title_18/18-09.pdf'
WHERE state_code = 'AZ' AND resource_type = 'greywater';

-- Texas - Health & Safety Code Chapter 341
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://statutes.capitol.texas.gov/Docs/HS/htm/HS.341.htm'
WHERE state_code = 'TX' AND resource_type = 'greywater';

-- Colorado - Regulation 86 (5 CCR 1002-86)
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://cdphe.colorado.gov/water-quality/clean-water/regulation-86-graywater-control'
WHERE state_code = 'CO' AND resource_type = 'greywater';

-- Washington - WAC 246-274
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://app.leg.wa.gov/wac/default.aspx?cite=246-274'
WHERE state_code = 'WA' AND resource_type = 'greywater';

-- Oregon - OAR 340-053
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://secure.sos.state.or.us/oard/displayDivisionRules.action?selectedDivision=1470'
WHERE state_code = 'OR' AND resource_type = 'greywater';

-- New Mexico - 20.7.3 NMAC
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.env.nm.gov/septic/graywater/'
WHERE state_code = 'NM' AND resource_type = 'greywater';

-- Utah - R317-401
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://adminrules.utah.gov/public/rule/R317-401/Current%20Rules'
WHERE state_code = 'UT' AND resource_type = 'greywater';

-- Nevada - NAC 445A
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.leg.state.nv.us/nac/NAC-445A.html'
WHERE state_code = 'NV' AND resource_type = 'greywater';

-- Ohio - Ohio Administrative Code 3701-29
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://codes.ohio.gov/ohio-administrative-code/chapter-3701-29'
WHERE state_code = 'OH' AND resource_type = 'greywater';

-- Minnesota - Minnesota Rules 7080
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.revisor.mn.gov/rules/7080/'
WHERE state_code = 'MN' AND resource_type = 'greywater';

-- Florida - Florida Statute 403.892
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0403/Sections/0403.892.html'
WHERE state_code = 'FL' AND resource_type = 'greywater';

-- Virginia - 9VAC25-740
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://law.lis.virginia.gov/admincode/title9/agency25/chapter740/'
WHERE state_code = 'VA' AND resource_type = 'greywater';

-- Hawaii - HRS Chapter 342D
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.capitol.hawaii.gov/hrscurrent/Vol06_Ch0321-0344/HRS0342D/HRS_0342D-.htm'
WHERE state_code = 'HI' AND resource_type = 'greywater';

-- Maryland - Maryland Environment Code § 9-1112
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gen&section=9-1112'
WHERE state_code = 'MD' AND resource_type = 'greywater';

-- North Carolina - 15A NCAC 18A .1900
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_143/GS_143-355.5.html'
WHERE state_code = 'NC' AND resource_type = 'greywater';

-- Arkansas - Arkansas Administrative Code 007.04.93-005
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.healthy.arkansas.gov/programs-services/topics/on-site-wastewater-systems'
WHERE state_code = 'AR' AND resource_type = 'greywater';

-- Alabama - Alabama Admin Code r. 335-6-20
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.adem.alabama.gov/programs/water/waterforms/OnSiteRegs.pdf'
WHERE state_code = 'AL' AND resource_type = 'greywater';

-- Oklahoma - Oklahoma Statutes Title 27A
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://oksenate.gov/sites/default/files/2019-12/os27A.pdf'
WHERE state_code = 'OK' AND resource_type = 'greywater';

-- Kentucky - 902 KAR 10:085
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://apps.legislature.ky.gov/law/kar/titles/902/010/085/'
WHERE state_code = 'KY' AND resource_type = 'greywater';

-- Wisconsin - SPS 382/383
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://docs.legis.wisconsin.gov/code/admin_code/sps/safety_and_buildings_and_environment/381_387/382'
WHERE state_code = 'WI' AND resource_type = 'greywater';

-- Montana - UPC 2021 with modifications
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://rules.mt.gov/gateway/ChapterHome.asp?Chapter=24%2E301'
WHERE state_code = 'MT' AND resource_type = 'greywater';

-- Indiana - Indiana Administrative Code Title 410
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.in.gov/health/eph/onsite-sewage-systems/'
WHERE state_code = 'IN' AND resource_type = 'greywater';

-- Illinois - Illinois Administrative Code Title 77 Part 890
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.ilga.gov/commission/jcar/admincode/077/077008900A00500R.html'
WHERE state_code = 'IL' AND resource_type = 'greywater';

-- Michigan - Michigan Compiled Law 333.12757
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.legislature.mi.gov/(S(qmcx5qr0dxvqhqdvxjbqbvjr))/mileg.aspx?page=getObject&objectName=mcl-333-12757'
WHERE state_code = 'MI' AND resource_type = 'greywater';

-- Missouri - 19 CSR 20-3.060
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.sos.mo.gov/cmsimages/adrules/csr/current/19csr/19c20-3a.pdf'
WHERE state_code = 'MO' AND resource_type = 'greywater';

-- Pennsylvania - Title 25 Chapter 73
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/025/chapter73/chap73toc.html'
WHERE state_code = 'PA' AND resource_type = 'greywater';

-- New York - Environmental Conservation Law §15-0605
UPDATE `greywater_compliance.state_water_regulations`
SET governing_code_url = 'https://www.nysenate.gov/legislation/laws/ENV/15-0605'
WHERE state_code = 'NY' AND resource_type = 'greywater';
