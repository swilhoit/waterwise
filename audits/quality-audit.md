# Data Quality Audit Report
## Water Conservation Directory - Water Wise Group Website

**Audit Date:** January 12, 2026
**Auditor:** Data Quality Auditor
**Scope:** BigQuery data, JSON source files, display components

---

## Executive Summary

This audit identified significant data quality issues across the water conservation directory. The primary concerns are:
1. **Inconsistent enum values** for legal status and permit types across 22+ variations
2. **High null rates** in critical date fields (last_updated, data_verified_date)
3. **Hardcoded fallbacks** that mask missing data from the database
4. **Stale date fields** with values dating back to 2024-2025 metadata
5. **Format inconsistencies** in boolean/string fields and jurisdiction IDs

---

## 1. Inconsistent Enum Values

### 1.1 Legal Status Field

The `legal_status` field has **22+ distinct values** across the codebase and database. This causes inconsistent styling and categorization.

| Issue Type | Examples Found | Location |
|------------|----------------|----------|
| Full-word vs Abbreviation | `L`, `R` vs `Legal`, `Regulated` | `lib/directory-data.ts:194` |
| Compound Statuses | `Legal and Regulated`, `Regulated and Permitted` | `greywater-state-directory.json` |
| With Qualifiers | `Legal with Incentives`, `Legal (as of 2016)`, `Legal (verify local regulations)` | `scripts/populate-rainwater-laws.js` |
| Descriptive Phrases | `Limited/Unclear`, `No Formal Regulations`, `Effectively Prohibited` | `greywater-state-directory.json` |
| Non-Standard | `Comprehensive Regulations`, `Limited Information`, `Highly Restricted` | `greywater-state-directory.json` |
| Lowercase Snake Case | `permitted_with_conditions`, `legal_conditional` | `scripts/insert-bay-area-counties.ts` |

**Discovered Values (non-exhaustive):**
- `L`, `R` (abbreviations in database)
- `Legal`, `Regulated`, `Prohibited`
- `Legal with Incentives`, `Legal with Strong Support`
- `Legal (as of 2016)`, `Legal (verify local regulations)`
- `Limited/Unclear`, `Limited Allowance`, `Limited Guidance`, `Limited`, `Limited Information`, `Limited Regulations`
- `No Formal Regulations`, `No Specific Regulations`, `No Current Formal Regulations`
- `Effectively Prohibited`, `Highly Restricted`, `Highly Regulated`
- `Regulated with Limitations`, `Regulated and Permitted`
- `Comprehensive Regulations`, `Permitted`
- `permitted_with_conditions` (lowercase with underscores)

**Impact:** Display code handles only 4-5 values properly:
```typescript
// From DirectoryView.tsx:436-440
item.legalStatus === 'Legal' ? 'bg-green-100 text-green-800' :
item.legalStatus === 'Regulated' ? 'bg-blue-100 text-blue-800' :
item.legalStatus === 'Highly Regulated' ? 'bg-orange-100 text-orange-800' :
item.legalStatus === 'Limited/Unclear' ? 'bg-yellow-100 text-yellow-800' :
'bg-gray-100 text-gray-800'  // Fallback catches 15+ other values
```

**Recommendation:** Standardize to a closed enum:
- `Legal` - Explicitly allowed
- `Regulated` - Allowed with conditions
- `Restricted` - Limited allowance
- `Prohibited` - Not permitted
- `Unknown` - No clear regulations

### 1.2 Permit Required Field

The `permit_required` field has **25+ distinct values** with no standardization.

**Discovered Values:**
- `Yes`, `No`
- `Case-by-case`, `Conditional`, `Tiered`, `Tiered System`
- `Local discretion`, `Local discretion until 2026`, `Local health department approval`
- `Not Available`, `Unknown`, `No specific permits`
- `Above threshold only`, `Over [X] GPD`
- `Yes - three-tier system`, `Yes - SEO permit`, `Yes - tiered fees`
- `Yes - risk-based tiers`, `Yes - wastewater system permit`, `Yes - POWTS permit`
- `Currently requires composting toilets`, `Must meet plumbing standards`
- `Notification required`, `Based on system type`, `Pending regulation development`

**Impact:** The UI uses complex fallback logic:
```typescript
// From LocationHubView.tsx:873-876
{greywater?.permitThresholdGpd && greywater.permitThresholdGpd > 0
  ? `Over ${greywater.permitThresholdGpd} GPD`
  : greywater?.permitRequired || 'Varies'}
```

**Recommendation:** Standardize to:
- `Yes` - Always required
- `No` - Never required
- `Tiered` - Based on system size/GPD threshold
- `Conditional` - Based on location/type
- `Unknown` - Not determined

### 1.3 Incentive/Program Type Field

The `incentive_type` / `program_type` field mapping is inconsistent.

**Database Column:** `program_type`
**Frontend Interface:** `incentive_type`

This requires aliasing in every query:
```sql
p.program_type as incentive_type
```

**Discovered Values:**
- `rebate`, `grant`, `tax_credit`, `tax_exemption`
- `loan`, `subsidy`, `free_installation`
- `permit_waiver`, `education`, `various`

**Issue:** The TypeScript type `ProgramType` is defined identically in 3 separate files:
- `components/directory/LocationHubView.tsx:611`
- `components/directory/GreywaterSpokeView.tsx:73`
- `components/directory/RainwaterSpokeView.tsx:73`

---

## 2. Fields with High Null Rates

### 2.1 Date Fields

| Field | Expected | Actual Issue |
|-------|----------|--------------|
| `last_updated` | Should exist on all records | Many records have NULL |
| `data_verified_date` | Should validate accuracy | Rarely populated |
| `updated_at` | Timestamp tracking | Inconsistent across tables |

**Evidence of Missing Dates:**
```typescript
// From lib/directory-data.ts:276 - fallback when no last_updated
lastUpdated: undefined
```

```typescript
// From LocationHubView.tsx:813-817 - conditional display
{lastUpdated && (
  <span>Updated {new Date(lastUpdated).toLocaleDateString(...)}</span>
)}
```

### 2.2 Contact Information

Many agency records are missing contact details:

```typescript
// From greywater-state-directory.json - multiple states with null phone
"agencyPhone": null  // Found in Alabama, Colorado, Connecticut, etc.
```

### 2.3 Threshold Fields

```typescript
// From directory-data.ts - permitThresholdGpd often null
permitThresholdGpd: row.greywater_permit_threshold  // Frequently NULL
```

---

## 3. Hardcoded Fallbacks Masking Bad Data

The codebase contains **50+ hardcoded fallback values** that mask missing database data:

### 3.1 Legal Status Fallbacks
```typescript
// lib/directory-data.ts:194
legalStatus: row.greywater_legal_status === 'L' ? 'Legal'
  : row.greywater_legal_status === 'R' ? 'Regulated'
  : row.greywater_legal_status || 'Varies'

// lib/directory-data.ts:205
legalStatus: row.rainwater_legal_status || 'Legal'  // Defaults to Legal!
```

### 3.2 Permit Fallbacks
```typescript
// lib/directory-data.ts:208
permitRequired: row.rainwater_permit_required || 'No'  // Defaults to No!

// lib/directory-data.ts:268
permitRequired: 'No'  // Hardcoded in fallback path
```

### 3.3 Content Fallbacks
```typescript
// LocationHubView.tsx:885-889 - California-specific hardcoded content
{level === 'city' && stateName === 'California'
  ? 'California allows greywater systems under the Plumbing Code Chapter 15...'
  : `Contact your local building department...`}

// GreywaterSpokeView.tsx:362
{preplumbing.details || 'New construction must include greywater-ready plumbing.'}
```

### 3.4 Author Fallbacks
```typescript
// lib/shopify.ts:340
author: article.authorV2?.name || 'Water Wise Team'

// blog pages
author: post.author || "Water Wise Team"
```

---

## 4. Stale Date Fields

### 4.1 Metadata Shows Old Dates
```json
// greywater-state-directory.json:4
"lastUpdated": "2024-2025"

// rainwater-state-directory.json:4
"lastUpdated": "2025"
```

### 4.2 Script Hardcoded Future Dates
Several migration scripts have hardcoded dates:
```javascript
// scripts/add-california-city-regulations.js
last_updated: '2026-01-10'  // Hardcoded, not dynamic
```

### 4.3 Missing Recent Changes
Many states have `"recentChanges": null` even when legislation has changed recently (e.g., Colorado's HB 24-1362).

---

## 5. Format Inconsistencies

### 5.1 Boolean vs String Fields
```typescript
// IncentiveProgram interface - boolean OR string allowed
residential_eligible?: boolean | string
commercial_eligible?: boolean | string
pre_approval_required?: boolean | string
inspection_required?: boolean | string
```

This requires defensive coding everywhere:
```typescript
// GreywaterSpokeView.tsx:119-121
const isResidential = residential === true || residential === 'true'
const isCommercial = commercial === true || commercial === 'true'
```

### 5.2 Jurisdiction ID Formats

Multiple formats exist:
```
CA_STATE                     // State level
CA_COUNTY_LOS_ANGELES        // County level
CA_CITY_LOS_ANGELES          // City level
CA_LOS_ANGELES               // Ambiguous (city or county?)
```

### 5.3 Phone Number Formats
No standardization:
```json
"agency_phone": "602-771-2300"     // Dashes
"agencyContact": "907-269-4925"    // Dashes
"agency_phone": null               // Missing
```

### 5.4 Website URL Formats
```json
"agencyContact": "adem.alabama.gov"                    // No protocol
"governmentWebsite": "https://www.adem.alabama.gov/"  // Full URL
```

---

## 6. Data Transformation Issues

### 6.1 L/R to Legal/Regulated Mapping

The database stores abbreviations that require transformation:
```typescript
// lib/directory-data.ts:194
legalStatus: row.greywater_legal_status === 'L' ? 'Legal'
  : row.greywater_legal_status === 'R' ? 'Regulated'
```

**Recommendation:** Store full values in database, not abbreviations.

### 6.2 Comma-Separated Arrays

Arrays stored as comma-separated strings:
```typescript
// lib/directory-data.ts:200-201
approvedUses: row.greywater_approved_uses
  ? row.greywater_approved_uses.split(',').map((s: string) => s.trim())
  : []
```

**Recommendation:** Use proper array columns in BigQuery or JSON storage.

---

## 7. Missing Schema Validation

No validation exists for:
- Required fields before insert
- Enum values against allowed lists
- Date format consistency
- URL format validation
- Phone number format

---

## Recommendations Summary

| Priority | Issue | Action |
|----------|-------|--------|
| High | Legal status enum | Standardize to 5 values, migrate existing data |
| High | Permit required enum | Standardize to 5 values, migrate existing data |
| High | Hardcoded fallbacks | Log missing data instead of silent defaults |
| Medium | Date field population | Add data pipeline validation, require last_updated |
| Medium | Boolean/string mixing | Standardize to boolean in database, convert on ingest |
| Medium | Duplicate type definitions | Create shared types file |
| Low | Phone/URL formats | Add validation on data entry |
| Low | Jurisdiction ID format | Document standard, add validation |

---

## Files Analyzed

- `/lib/bigquery.ts` - BigQuery client initialization
- `/lib/directory-data.ts` - Main data fetching functions
- `/lib/greywater-laws.ts` - State law data fetching
- `/components/directory/LocationHubView.tsx` - Hub page display
- `/components/directory/GreywaterSpokeView.tsx` - Greywater detail display
- `/components/directory/RainwaterSpokeView.tsx` - Rainwater detail display
- `/components/directory/DirectoryView.tsx` - Directory listing
- `/greywater-state-directory.json` - Greywater source data
- `/rainwater-state-directory.json` - Rainwater source data
- `/scripts/insert-bay-area-counties.ts` - Data migration script
- `/scripts/add-california-city-regulations.js` - City data migration
- `/app/(locations)/[state]/page.tsx` - State page data fetching
- `/app/(locations)/[state]/[city]/page.tsx` - City page data fetching

---

*Report generated: January 12, 2026*
