# Verified Programs Policy

**CRITICAL: No fake, placeholder, or unverified data is permitted in this codebase or database.**

## Background

On January 2026, a major data integrity audit discovered that 74+ water conservation programs had been added to the database with fabricated URLs and unverified program details. These were removed, along with the scripts that created them.

## Verified Greywater Rebate Programs (Confirmed January 2026)

The following greywater/laundry-to-landscape rebate programs have been manually verified to exist:

### California

| Utility | Program | Rebate Amount | Verified URL |
|---------|---------|---------------|--------------|
| EBMUD | Graywater Rebate | Up to $100 | https://www.ebmud.com/water/conservation-and-rebates/rebates/graywater-rebates |
| SFPUC | Laundry-to-Landscape Rebate | Up to $100 | https://www.sfpuc.gov/learning/conserve-water/save-water-outdoors |
| Santa Clara Valley Water | Graywater Rebate | $200-$400 | https://www.valleywater.org/saving-water/rebates-surveys/graywater-rebate |

### Nevada

| Utility | Program | Rebate Amount | Verified URL |
|---------|---------|---------------|--------------|
| SNWA | Water Smart Landscapes | $5/sq ft (up to 10k sq ft) | https://www.snwa.com/rebates/wsl/index.html |

### Texas (Verified January 2026)

| Utility | Program | Rebate Amount | Verified URL |
|---------|---------|---------------|--------------|
| Austin Water | Laundry-to-Landscape Rebate | Up to $150 | https://www.austintexas.gov/department/water-conservation-rebates |
| Austin Water | Rainwater Harvesting Rebate | Up to $5,000 | https://www.austintexas.gov/department/water-conservation-rebates |

### Arizona (Verified January 2026)

| Utility | Program | Rebate Amount | Verified URL |
|---------|---------|---------------|--------------|
| Tucson Water | Greywater Harvesting Rebate | Up to $1,000 | https://www.tucsonaz.gov/water/rebates |
| Tucson Water | Rainwater Harvesting Rebate | Up to $2,000 | https://www.tucsonaz.gov/Departments/Water/Conservation/Residential-Customer-Rebates |

## Programs That Do NOT Exist

The following utilities were verified to NOT have greywater rebate programs (as of January 2026):

- **Denver Water** - Offers toilet and sprinkler rebates only, NO greywater
- **LADWP** - Offers turf replacement, NO greywater rebate
- **San Diego** - Rain barrels, turf, NO greywater rebate (incorrectly listed in database - REMOVED)
- **Phoenix Water** - NO greywater rebate found
- **Portland Water** - NO greywater rebate found (has stormwater programs)
- **Tampa Water** - NO greywater rebate found
- **SAWS (San Antonio)** - Has rainwater program, NO greywater rebate

## IMPORTANT: Expired Tax Credits

- **Arizona State Tax Credit (ARS 43-1090.01)** - This 25% tax credit (up to $1,000) EXPIRED around 2017 and is NO LONGER AVAILABLE. Do NOT promote this to users.

## Requirements for Adding New Programs

Before adding ANY program to the database:

### 1. Manual URL Verification

- Navigate to the URL in a browser
- Confirm the page loads successfully (not 404, not redirect to different domain)
- Verify the program details match what you're entering

### 2. Required Documentation

For each program, document:
- Date verified
- Who verified it
- Screenshot or archived link (optional but recommended)

### 3. Database Entry Checklist

- [ ] URL manually tested and working
- [ ] Program name matches official source
- [ ] Rebate amounts match official source
- [ ] Eligibility requirements match official source
- [ ] Contact information (if any) is accurate

## Prohibited Practices

**NEVER:**
- Guess URLs based on patterns (e.g., assuming `/greywater-rebate` exists)
- Copy program details from AI-generated content without verification
- Use placeholder data with intent to "verify later"
- Assume a program exists because similar programs exist elsewhere
- Add "comprehensive" program lists without individual verification

## Scripts That Were Deleted

The following scripts contained fabricated data and were removed:

- `scripts/populate-comprehensive-programs.js`
- `scripts/add-rainwater-conservation-programs.js`
- `scripts/add-major-city-programs.js`
- `scripts/add-state-programs-comprehensive.js`
- `scripts/complete-program-urls.js`
- `scripts/add-more-california-cities.js`
- `scripts/enrich-program-data.js`

## How to Add a Verified Program

1. Research the program on the utility's official website
2. Verify the URL returns a valid page
3. Create a new script with ONLY verified programs
4. Include verification date in comments
5. Have another person review before running

Example:

```javascript
// Verified: 2026-01-12 by [your name]
// Source: https://www.example-utility.com/rebates
const verifiedProgram = {
  program_id: 'CA_EXAMPLE_GREYWATER_2026',
  program_name: 'Example Utility Greywater Rebate',
  application_url: 'https://www.example-utility.com/rebates/greywater',
  // ... verified details
};
```

## Audit Schedule

Programs should be re-verified quarterly to ensure:
- URLs are still working
- Program details haven't changed
- Programs haven't been discontinued
