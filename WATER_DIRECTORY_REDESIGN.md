# Water Sustainability Directory - Comprehensive Redesign

## Current Problems

### Database Issues
1. **Misleading table name**: `greywater_laws` now contains both greywater AND rainwater entries
2. **Mixed fields**: Table has greywater-specific fields (`permit_threshold_gpd`, `indoor_use_allowed`) alongside rainwater-specific fields (`collection_limit_gallons`, `potable_use_allowed`)
3. **No unified view**: Data is stored by resource type but UI treats greywater as "default"

### UI Issues
1. **Greywater-centric**: Header, summary, permit info all default to greywater
2. **Rainwater as secondary**: Appears as a separate "also available" section
3. **Conservation orphaned**: Only appears in incentives, no regulations section
4. **Inconsistent hierarchy**: Resource type filter on incentives but not regulations

---

## Proposed Solution

### Database Changes

#### 1. Rename Table
```sql
-- Rename to be resource-agnostic
ALTER TABLE `greywater_compliance.greywater_laws`
RENAME TO `greywater_compliance.state_water_regulations`
```

#### 2. Schema Documentation
The table stores regulations for multiple water resource types:

| Field | Applies To | Description |
|-------|-----------|-------------|
| `state_code` | All | Two-letter state code |
| `state_name` | All | Full state name |
| `resource_type` | All | 'greywater' \| 'rainwater' |
| `legal_status` | All | Legal, Regulated, Limited, Prohibited |
| `governing_code` | All | Legal code reference |
| `summary` | All | Plain-language summary |
| `permit_required` | All | Yes/No/Conditional |
| `permit_explanation` | All | What permits mean for users |
| `permit_process` | All | How to get started |
| `primary_agency` | All | Regulatory body name |
| `agency_phone` | All | Contact phone |
| `government_website` | All | Official URL |
| `approved_uses` | All | Array of allowed uses |
| `key_restrictions` | All | Array of restrictions |
| `recent_changes` | All | Recent regulatory updates |
| `permit_threshold_gpd` | Greywater | No-permit threshold in GPD |
| `indoor_use_allowed` | Greywater | Boolean |
| `outdoor_use_allowed` | Greywater | Boolean |
| `collection_limit_gallons` | Rainwater | Max collection (0 = unlimited) |
| `potable_use_allowed` | Rainwater | Can treat for drinking |
| `tax_incentives` | Rainwater | Tax credit/exemption description |

#### 3. Conservation Note
Conservation has NO state regulations - only incentive programs. This is intentional and should be reflected in the UI.

---

### UI Redesign - State Page

#### New Layout (All Info Visible)

```
┌─────────────────────────────────────────────────────────────────────┐
│ California                                                          │
│ Water Sustainability Regulations & Incentives                       │
│                                                                     │
│ [💧 Greywater: Legal]  [🌧️ Rainwater: Legal]  [🌿 12 Incentives]   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     State Regulations Overview                       │
├────────────────────────────────┬────────────────────────────────────┤
│ 💧 GREYWATER REUSE             │ 🌧️ RAINWATER HARVESTING            │
│                                │                                    │
│ Status: Legal                  │ Status: Legal                      │
│ Classification: Tier System    │ Collection: Unlimited              │
│                                │                                    │
│ ✓ Outdoor irrigation allowed   │ ✓ Outdoor use allowed              │
│ ✓ Indoor toilet flushing       │ ✗ Potable use (non-potable only)   │
│                                │                                    │
│ PERMITS                        │ PERMITS                            │
│ • Under 250 GPD: No permit     │ • Residential: No permit           │
│ • Over 250 GPD: Required       │ • Large systems: May vary          │
│                                │                                    │
│ Governing Code:                │ Governing Code:                    │
│ CA Plumbing Code Ch. 16A       │ CA Water Code §10570               │
│                                │                                    │
│ [View full details ↓]          │ [View full details ↓]              │
├────────────────────────────────┴────────────────────────────────────┤
│ 🌿 WATER CONSERVATION                                               │
│                                                                     │
│ No state regulations - conservation is encouraged through           │
│ incentive programs. See rebates below.                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 📋 What This Means For You                                          │
│                                                                     │
│ California has some of the most progressive water reuse policies.   │
│ Simple greywater systems under 250 GPD need no permit...           │
│ Rainwater collection is legal and encouraged...                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 🏛️ Regulatory Agency                                                │
│                                                                     │
│ California State Water Resources Control Board                      │
│ 📞 (916) 341-5250                                                   │
│ 🔗 waterboards.ca.gov                                               │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 💰 Available Incentives & Rebates (15)                              │
│                                                                     │
│ Filter: [All] [Greywater] [Rainwater] [Conservation]                │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 💧 Greywater System Rebate          Up to $400                  │ │
│ │ LADWP • Residential                                             │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 🌧️ Rain Barrel Rebate               Up to $75                   │ │
│ │ MWD Service Area • Residential                                  │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 🌿 Turf Replacement Program         $2/sq ft                    │ │
│ │ Statewide • Residential & Commercial                            │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 🏙️ Find Your City                                                   │
│ [Search cities...]                                                  │
│                                                                     │
│ Los Angeles • San Diego • San Francisco • San Jose • ...           │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Key Design Principles

1. **Equal Treatment**: Greywater and rainwater shown side-by-side, neither is "default"
2. **All Visible**: No tabs hiding information - everything on one scroll
3. **Conservation Context**: Explicitly states "no regulations, see incentives"
4. **Unified Summary**: Single "What This Means For You" that covers all types
5. **Single Agency**: Most states have one agency for all water - show once
6. **Filterable Incentives**: Keep resource type filter on incentives only

---

### Implementation Plan

#### Phase 1: Database Cleanup
1. Rename `greywater_laws` → `state_water_regulations`
2. Update all API routes to use new table name
3. Add migration script for table rename

#### Phase 2: API Updates
1. Create new endpoint `/api/directory/state-regulations?state=CA`
   - Returns both greywater AND rainwater in one call
   - Structured as `{ greywater: {...}, rainwater: {...} }`
2. Update compliance endpoint to handle unified response

#### Phase 3: UI Redesign
1. Redesign state header with status badges for each type
2. Create side-by-side regulations comparison component
3. Add conservation "no regulations" message
4. Consolidate permit explanation to cover all types
5. Keep incentives section with resource type filter

#### Phase 4: Cleanup
1. Update breadcrumbs and navigation
2. Update SEO/meta descriptions
3. Remove old greywater-centric copy
4. Test all state pages

---

### API Response Structure

```typescript
// GET /api/directory/state-regulations?state=CA
{
  state_code: "CA",
  state_name: "California",

  greywater: {
    legal_status: "Legal",
    regulatory_classification: "Tier System",
    permit_required: "Conditional",
    permit_threshold_gpd: 250,
    indoor_use_allowed: true,
    outdoor_use_allowed: true,
    governing_code: "CA Plumbing Code Chapter 16A",
    approved_uses: ["Subsurface irrigation", "Toilet flushing"],
    key_restrictions: ["No cross-connections", "Must use within 24 hours"],
    summary: "California allows greywater reuse...",
    permit_explanation: "Simple systems under 250 GPD...",
    permit_process: "Contact your local building department..."
  },

  rainwater: {
    legal_status: "Legal",
    collection_limit_gallons: null, // null = unlimited
    potable_use_allowed: false,
    permit_required: "No",
    governing_code: "CA Water Code Section 10570",
    approved_uses: ["Irrigation", "Toilet flushing", "Laundry"],
    key_restrictions: ["Non-potable uses only"],
    tax_incentives: null,
    summary: "Rainwater harvesting is legal and encouraged...",
    permit_explanation: "No permits required for residential...",
  },

  conservation: {
    has_regulations: false,
    message: "Conservation programs are incentive-based. See available rebates below.",
    incentive_count: 5
  },

  agency: {
    name: "California State Water Resources Control Board",
    phone: "(916) 341-5250",
    website: "https://waterboards.ca.gov",
    contact_email: null
  },

  incentive_summary: {
    total_count: 15,
    greywater_count: 4,
    rainwater_count: 3,
    conservation_count: 8,
    max_rebate: 2500
  }
}
```

---

### File Changes Required

1. **Database**: Rename table via BigQuery Console or migration script
2. **`/lib/bigquery.ts`**: Update any hardcoded table references
3. **`/api/greywater-directory/state-data/route.ts`**: Fetch both resource types, return unified response
4. **`/api/greywater-directory/all-states/route.ts`**: Return summary for both types per state
5. **`/components/directory/SimpleDirectoryView.tsx`**: Complete redesign of state page section
6. **New component**: `StateRegulationsComparison.tsx` for side-by-side view
