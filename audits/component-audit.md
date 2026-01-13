# UI Component Audit Report

**Date:** January 12, 2026
**Scope:** Directory view components for water conservation directory

---

## Executive Summary

The directory components suffer from significant code duplication, oversized files, and UI clutter. The main `LocationHubView.tsx` at 1,774 lines is doing far too much, and there is substantial code repetition between the hub and spoke views.

---

## 1. Component Size Analysis

| Component | Lines | Assessment |
|-----------|-------|------------|
| **LocationHubView.tsx** | 1,774 | CRITICAL - Far too large, multiple responsibilities |
| **GreywaterSpokeView.tsx** | 985 | HIGH - Contains duplicated incentives table |
| **RainwaterSpokeView.tsx** | 874 | HIGH - Contains duplicated incentives table |
| **DirectoryView.tsx** | 993 | MEDIUM - Could be modularized |
| **DetailedComplianceView.tsx** | 959 | MEDIUM - Legacy component, may be deprecated |
| **PermitSection.tsx** | 579 | OK - Focused on permit requirements |
| **StateDetailView.tsx** | 578 | OK - But may duplicate LocationHubView |
| **CountyDetailView.tsx** | 438 | OK |
| **LocationContextCard.tsx** | 336 | OK - Reusable context component |
| **CollapsibleSection.tsx** | 170 | GOOD - Simple utility component |
| **EffectivePolicyView.tsx** | 108 | GOOD - Focused component |

**Total Lines in Directory Components:** 7,794

---

## 2. LocationHubView.tsx - Detailed Analysis

### 2.1 Responsibilities (Too Many!)

The component handles ALL of the following:

1. **URL Mapping Data** (Lines 197-561) - ~365 lines of hardcoded URL mappings for:
   - State regulation URLs (10 states)
   - County building code URLs (40+ counties)
   - City municipal code URLs (130+ cities)
   - Water utility URLs (80+ utilities)

2. **Badge Components** (Lines 563-703) - ~140 lines of badge rendering:
   - `DataConfidenceBadge`
   - `ResourceTypeBadge`
   - `ProgramTypeBadge`
   - `EligibilityBadges`
   - `JurisdictionLevelBadge`

3. **Main Component Logic** (Lines 709-776) - ~67 lines of state management

4. **Hero Section** (Lines 777-821) - ~44 lines

5. **Location Context Integration** (Lines 823-836) - ~13 lines

6. **Greywater Regulations Card** (Lines 838-1001) - ~163 lines

7. **Rainwater Regulations Card** (Lines 1003-1146) - ~143 lines

8. **Permit Section** (Lines 1148-1167) - ~19 lines (delegates to PermitSection)

9. **Incentives Table with Mobile/Desktop views** (Lines 1169-1659) - ~490 lines

10. **Agency Contact Section** (Lines 1662-1689) - ~27 lines

11. **Cities Browser** (Lines 1691-1744) - ~53 lines

12. **CTA Section** (Lines 1746-1770) - ~24 lines

### 2.2 Major Issues

**Issue 1: Massive URL Mapping Tables (365 lines)**
- Hardcoded data that should be in a separate data file or database
- Makes component difficult to read and maintain

**Issue 2: Duplicated Badge Components**
- `ProgramTypeBadge`, `JurisdictionLevelBadge`, `EligibilityBadges` are defined identically in:
  - `LocationHubView.tsx`
  - `GreywaterSpokeView.tsx`
  - `RainwaterSpokeView.tsx`

**Issue 3: Duplicated Incentives Table (~300+ lines each)**
- Nearly identical incentive table rendering in all three view files
- Mobile card view + Desktop table view duplicated

**Issue 4: Duplicated Expanded Program Details (~200 lines each)**
- The expandable row showing program eligibility, how to apply, documentation, etc.
- Identical structure in all three files

---

## 3. Section Inventory for City Hub Pages

A city page (e.g., `/ca/los-angeles`) displays the following sections in order:

| Order | Section | Content | Visual Clutter Assessment |
|-------|---------|---------|---------------------------|
| 1 | Breadcrumb | Home > California > Los Angeles | LOW |
| 2 | Hero Header | Title + description + badges | MEDIUM - Multiple badges |
| 3 | Location Context Card | Rebate banner, local regulations, regulatory hierarchy (3 cards), water utilities | HIGH - Dense information |
| 4 | Greywater Regulations Card | Status, permit info, summary, use badges, governing code, approved uses, restrictions, pre-plumbing mandate | HIGH - Many subsections |
| 5 | Rainwater Regulations Card | Status, collection limit, summary, use badges, governing code, tax incentives, approved uses, restrictions | HIGH - Many subsections |
| 6 | Permit Section | Full permit guide with 4-step process, documents, system types, installation requirements | MEDIUM - Good organization |
| 7 | Incentives Table | Expandable rows with 10+ detail fields each | HIGH - Very dense when expanded |
| 8 | Agency Contact | Name, phone, website | LOW |
| 9 | CTA Section | Call to action for products | LOW |

**Total Distinct Sections:** 9 major sections
**Nested Subsections in Regulation Cards:** 8-10 each
**Potential Information Overload Points:** Sections 3, 4, 5, 7

---

## 4. Identified Clutter Sources

### 4.1 Badge Overload

On a single city page, users may see:
- Data confidence badge (Verified/Partial/Unknown)
- Last updated badge
- Legal status badges (Greywater Legal, Rainwater Legal)
- Permit requirement badges
- Use badges (Outdoor Irrigation, Indoor Use)
- Jurisdiction level badges (State, County, City)
- Program type badges (Rebate, Tax Credit, Loan, etc.)
- Eligibility badges (Residential, Commercial)
- Pre-approval/Inspection badges

**Count:** 15+ badge types, potentially 30+ badge instances per page

### 4.2 Card Proliferation

Each regulation card contains:
- Header with icon and link
- 2-column stat grid
- Summary paragraph
- Use badges row
- Governing code box
- Approved uses list
- Key restrictions list
- Pre-plumbing mandate box (conditional)

**Result:** Vertical scrolling required to see all information

### 4.3 Incentives Table Complexity

When expanded, each program row shows up to 10 detail cards:
1. Who's Eligible
2. How to Apply
3. Documentation Required
4. Property Requirements
5. Installation Requirements
6. Contractor Requirements
7. Timeline
8. Reimbursement Process
9. Restrictions
10. Stacking Programs

Plus footer with contact info and badges.

---

## 5. Repeated Patterns for Extraction

### 5.1 IncentiveProgram Type Definition

Defined identically in 3 files (72 lines each):
- `LocationHubView.tsx` (lines 50-94)
- `GreywaterSpokeView.tsx` (lines 34-71)
- `RainwaterSpokeView.tsx` (lines 34-71)

**Action:** Extract to `types/incentive.ts`

### 5.2 Badge Components

`ProgramTypeBadge` defined identically in 3 files (~20 lines each):
- `LocationHubView.tsx` (lines 613-631)
- `GreywaterSpokeView.tsx` (lines 75-93)
- `RainwaterSpokeView.tsx` (lines 75-93)

`JurisdictionLevelBadge` defined identically in 3 files (~35 lines each):
- `LocationHubView.tsx` (lines 655-689)
- `GreywaterSpokeView.tsx` (lines 95-117)
- `RainwaterSpokeView.tsx` (lines 95-117)

`EligibilityBadges` defined identically in 3 files (~20 lines each)

**Action:** Extract to `components/directory/badges/index.tsx`

### 5.3 URL Mapping Data

365 lines of hardcoded URLs in LocationHubView.tsx and 80+ lines in LocationContextCard.tsx

**Action:** Extract to `data/jurisdiction-urls.ts`

### 5.4 Incentives Table Component

~490 lines in LocationHubView, ~300 lines each in spoke views

**Action:** Extract to `components/directory/IncentivesTable.tsx`

### 5.5 Expanded Program Details

~150 lines duplicated across all three views

**Action:** Extract to `components/directory/ProgramDetails.tsx`

### 5.6 State Regulation URL Lookup

Duplicated in 4 files:
- `LocationHubView.tsx`
- `GreywaterSpokeView.tsx`
- `RainwaterSpokeView.tsx`
- `LocationContextCard.tsx`

**Action:** Extract to shared utility

---

## 6. Recommendations for Progressive Disclosure

### 6.1 Regulations Cards - Collapse by Default

**Current:** All information visible immediately
**Proposed:** Show summary + status only; hide details behind "Show Details" toggle

```
+-------------------------------------------+
| [Icon] Greywater Regulations              |
|                                           |
| Status: Legal | Permit: Tiered            |
| California allows greywater systems...    |
|                                           |
| [Show Details v]                          |
+-------------------------------------------+
```

**Hidden behind toggle:**
- Governing code reference
- Approved uses list
- Key restrictions
- Pre-plumbing mandate

### 6.2 Incentives Table - Limit Initial Display

**Current:** All programs visible with expand/collapse
**Proposed:** Show top 3-5 programs; "View All X Programs" button for rest

### 6.3 Location Context Card - Simplify

**Current:** Shows rebate banner + local regulations + regulatory hierarchy + water utilities
**Proposed:** Show only rebate banner initially; move hierarchy and utilities to side panel or footer

### 6.4 Permit Section - Tabbed Interface

**Current:** All permit info displayed vertically
**Proposed:** Tabs for "Quick Start" | "Documents" | "Contact"

---

## 7. Proposed Component Extraction

### New Files to Create:

```
components/directory/
  badges/
    index.tsx           # All badge components
    ProgramTypeBadge.tsx
    JurisdictionBadge.tsx
    EligibilityBadge.tsx
    DataConfidenceBadge.tsx

  incentives/
    IncentivesTable.tsx      # Main table component
    IncentiveCard.tsx        # Mobile card view
    IncentiveRow.tsx         # Desktop table row
    ProgramDetails.tsx       # Expanded details

  regulations/
    RegulationCard.tsx       # Shared greywater/rainwater card
    RegulationSummary.tsx    # Collapsed view
    RegulationDetails.tsx    # Expanded view

data/
  jurisdiction-urls.ts       # All URL mappings

types/
  incentive.ts              # IncentiveProgram interface
  regulation.ts             # Regulation-related types
```

### Estimated Line Reduction:

| File | Current Lines | After Refactor | Reduction |
|------|---------------|----------------|-----------|
| LocationHubView.tsx | 1,774 | ~600 | 66% |
| GreywaterSpokeView.tsx | 985 | ~350 | 64% |
| RainwaterSpokeView.tsx | 874 | ~300 | 66% |
| **Total Saved** | - | - | ~2,383 lines |

---

## 8. Priority Actions

### P0 - Critical (Do First)

1. **Extract URL mappings** to `data/jurisdiction-urls.ts`
   - Immediate 365+ line reduction
   - Makes data maintainable separately from UI

2. **Extract badge components** to shared module
   - Removes ~200 lines of duplication
   - Single source of truth for styling

3. **Extract IncentivesTable component**
   - Removes ~800 lines of duplication
   - Enables consistent incentive display across views

### P1 - High Priority

4. **Extract type definitions** to shared types file
   - Removes ~200 lines of duplication
   - Enables TypeScript reuse

5. **Implement progressive disclosure** for regulation cards
   - Reduces initial page visual weight
   - Improves mobile experience

### P2 - Medium Priority

6. **Extract ProgramDetails component**
   - Removes ~450 lines of duplication
   - Consistent program detail display

7. **Simplify LocationContextCard**
   - Move less-critical info to expandable section
   - Reduce initial page load visual complexity

---

## 9. File Locations Summary

All analyzed files are located at:
- `/Volumes/LaCie/WEBDEV/greywater-website/components/directory/`

Files requiring most attention:
1. `/Volumes/LaCie/WEBDEV/greywater-website/components/directory/LocationHubView.tsx` (1,774 lines)
2. `/Volumes/LaCie/WEBDEV/greywater-website/components/directory/GreywaterSpokeView.tsx` (985 lines)
3. `/Volumes/LaCie/WEBDEV/greywater-website/components/directory/RainwaterSpokeView.tsx` (874 lines)

---

## Appendix: Type Duplication Examples

### IncentiveProgram Interface (duplicated 3x)

```typescript
interface IncentiveProgram {
  program_name: string
  incentive_type?: string
  resource_type?: string
  program_subtype?: string
  incentive_amount_min?: number
  incentive_amount_max?: number
  incentive_per_unit?: string
  incentive_url?: string
  program_description?: string
  water_utility?: string
  residential_eligible?: boolean | string
  commercial_eligible?: boolean | string
  eligibility_details?: string
  property_requirements?: string
  income_requirements?: string
  how_to_apply?: string
  steps_to_apply?: string
  documentation_required?: string
  pre_approval_required?: boolean | string
  processing_time?: string
  installation_requirements?: string
  contractor_requirements?: string
  product_requirements?: string
  inspection_required?: boolean | string
  timeline_to_complete?: string
  reimbursement_process?: string
  restrictions?: string
  stacking_allowed?: boolean | string
  stacking_details?: string
  contact_email?: string
  contact_phone?: string
  coverage_area?: string
  deadline_info?: string
  program_end_date?: string
  jurisdiction_id?: string
  jurisdiction_level?: 'state' | 'county' | 'city' | 'other'
}
```

This 40+ line interface is copied verbatim in 3 files = 120+ lines of redundancy.
