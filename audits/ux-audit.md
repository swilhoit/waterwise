# UX/Visual Design Audit: Water Wise Group Directory

**Audit Date:** January 12, 2026
**Auditor:** UX/Visual Design Analysis
**Scope:** City pages, directory pages, and homepage visual patterns

---

## Executive Summary

The Water Wise Group website has strong content but suffers from **visual complexity and information overload**, particularly on city/location pages. The primary user goals (finding if greywater is legal + how to get rebates) are buried under layers of UI elements, multiple badge types, and competing visual hierarchies.

**Key Finding:** Users must parse 15+ different badge types and 12+ colors before finding the answer to their primary question: "Is greywater legal in my city?"

---

## 1. Color Palette Analysis

### Current Colors in Use (Counted from Components)

| Color Family | Shades Used | Primary Purpose |
|--------------|-------------|-----------------|
| **Emerald** | 50, 100, 200, 300, 400, 500, 600, 700, 800 | Primary brand, greywater, CTAs, success states |
| **Teal** | 50, 100, 200, 300, 400, 600, 700 | Secondary accent, "How it Works" section |
| **Cyan** | 50, 100, 200, 300, 400, 500, 600, 700 | Rainwater, water themes |
| **Blue** | 50, 100, 200, 500, 600, 700, 800 | High volume badge, navigation, links |
| **Purple** | 50, 100, 200, 600, 700 | State-level jurisdiction, pre-plumbing mandates |
| **Amber** | 100, 200, 500, 600, 700, 800 | Warnings, partial data, regulated status |
| **Orange** | 50, 100, 700 | Commercial eligibility, decorative |
| **Pink** | 100, 800 | Free installation badge |
| **Indigo** | 100, 800 | Tax credit/exemption badges |
| **Sky** | 100, 800 | Education program badges |
| **Green** | 100, 800 | Generic rebate badges |
| **Gray** | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 | Text, borders, backgrounds |

### Assessment: TOO MANY COLORS

**Problem:** The site uses **12 distinct color families** with multiple shades each. This creates:
- Cognitive overload for users
- No clear color hierarchy
- Confusion about what colors mean
- Competing visual signals

**Recommendation:** Consolidate to a **3-color primary palette**:
1. **Emerald** - Primary brand / Greywater / Success
2. **Cyan/Blue** - Rainwater / Secondary actions
3. **Gray** - Neutral / Text / Borders

Use amber sparingly for warnings only. Eliminate purple, pink, indigo, sky, orange, and teal from badge/UI use.

---

## 2. Badge/Tag Inventory

### Current Badge Types (15+ Distinct Styles)

| Badge Category | Badge Types | Visual Style |
|----------------|-------------|--------------|
| **Legal Status** | Legal, Regulated, Varies | green/amber/gray + icons |
| **Data Confidence** | Verified, Partial Data, Not Verified | emerald/amber/gray + icons |
| **Resource Type** | Greywater, Rainwater, Conservation | emerald/cyan/teal + icons |
| **Program Type** | Rebate, Loan, Tax Credit, Tax Exemption, Subsidy, Free Install, Permit Waiver, Education, Various | 8 different colors |
| **Eligibility** | Residential, Commercial | blue/orange |
| **Jurisdiction Level** | State, County, City, District | purple/amber/emerald/blue |
| **System Type** | Outdoor Irrigation, Indoor Use | emerald/gray + icons |
| **Product Badges** | No Power Needed, Most Versatile, High Volume | gray/emerald/blue |
| **Feature Pills** | Various states, rebate counts | Multiple colors |

### Assessment: BADGE OVERLOAD

**Problem:** Users encounter 15+ visually distinct badge types on a single city page. Each badge has:
- Its own color scheme
- Its own icon
- Its own semantic meaning
- Hover states with tooltips

This creates **decision fatigue** and obscures the information users actually need.

**Recommendation:** Reduce to **4 essential badge types**:
1. **Status Badge** - Legal (green), Restricted (amber), Varies (gray)
2. **Type Badge** - Greywater (emerald), Rainwater (cyan)
3. **Action Badge** - Permit Required, No Permit Needed
4. **Money Badge** - "$X rebates available"

---

## 3. Card Style Inventory

### Current Card Types (8+ Distinct Styles)

| Card Type | Location | Visual Treatment |
|-----------|----------|------------------|
| **Hero Card** | Homepage | gradient bg, rounded-3xl, decorative blobs |
| **Product Card** | Products section | white, border, aspect-square image |
| **Testimonial Card** | Testimonials | white, rounded-2xl, avatar circle |
| **State Card** | Directory | white, border, hover effects |
| **Regulation Card** | City pages | gradient header, rounded-2xl, 2-column grid |
| **Incentive Card** | Rebates section | expandable, nested content |
| **Context Card** | City pages | emerald bg, border, nested hierarchy |
| **Permit Card** | Permit section | blue gradient header, complex nested structure |

### Assessment: INCONSISTENT CARD PATTERNS

**Problem:** Each section uses a different card style, creating visual discontinuity:
- Some cards have gradient headers, others don't
- Inconsistent border-radius (xl, 2xl, 3xl)
- Inconsistent padding and spacing
- Some cards expand, others don't

**Recommendation:** Establish **2 card patterns**:
1. **Info Card** - White, consistent border-radius, simple header
2. **Action Card** - Subtle gradient, clear CTA, hover state

---

## 4. Information Hierarchy Assessment

### Primary User Goals (In Order of Importance)

1. **"Is greywater legal in my city?"** - THE #1 question
2. **"What rebates are available?"** - Money motivator
3. **"Do I need a permit?"** - Implementation barrier
4. **"What system do I need?"** - Purchase decision

### Current Hierarchy Analysis

**Homepage:** Well-structured. Hero answers "what is this" quickly. Clear CTAs.

**City Pages:** POOR HIERARCHY

Current above-the-fold content (first 800px):
1. Breadcrumb
2. Page title + data confidence badge
3. Last updated badge
4. Location Context Card (rebates summary)
5. Regulatory Hierarchy (State/County/City links)
6. Water Utilities section

**The answer to "Is greywater legal?" is NOT visible above the fold.**

Users must scroll past:
- Data confidence indicators
- Location context cards
- Regulatory hierarchy explainers
- Water utility lists

...before seeing the actual greywater regulations.

### Assessment: CRITICAL HIERARCHY FAILURE

**Problem:** The most important information (legal status, permit requirements) is buried below administrative/contextual information that most users don't need.

---

## 5. Visual Noise Sources

### Identified Noise Elements

1. **Decorative blobs/circles** - Homepage uses multiple gradient blobs that add no information
2. **Animated floating dots** - CSS animations that distract from content
3. **Excessive iconography** - Every badge, section, and card has icons
4. **Nested hierarchy indicators** - Purple/amber/emerald jurisdiction levels
5. **Tooltip-heavy badges** - Every badge has hover state adding complexity
6. **Multiple external link styles** - Different icons and colors for external links
7. **Duplicate information** - Same data shown in cards AND in tables
8. **Expandable sections** - Hidden content requiring clicks to reveal

### Noise Quantification (City Page)

- **31 unique icons** per city page
- **45+ interactive elements** (links, buttons, expandables)
- **12+ sections** users must parse
- **3+ data tables** with overlapping information

---

## 6. Recommendations for Simplification

### Immediate Actions (High Impact)

1. **Move legal status ABOVE THE FOLD**
   - First thing user sees: "Greywater is LEGAL in [City]"
   - Large, clear, unambiguous

2. **Consolidate badge palette**
   - Max 4 badge types
   - Max 3 colors (emerald, cyan, gray)
   - Remove icons from most badges

3. **Flatten the card hierarchy**
   - Remove nested cards-within-cards
   - One information level per section

4. **Eliminate decorative animations**
   - Remove floating dots
   - Remove gradient blobs
   - Keep only functional transitions

### Medium-Term Actions

5. **Redesign city page template**
   - Hero: Legal status + rebate amount (2 seconds to answer)
   - Body: Permit details + how to apply
   - Footer: Related resources

6. **Create a unified badge component**
   - Single component with variants
   - Consistent sizing and spacing
   - Reduced color palette

7. **Simplify regulation cards**
   - Remove gradient headers
   - Reduce from 2-column to single-column
   - Progressive disclosure for details

---

## 7. Suggested "Above the Fold" Content for City Pages

### Current (Too Complex)

```
[Breadcrumb]
[Title: Water Conservation in City, ST]
[Data Confidence Badge] [Last Updated Badge]
[Location Context Card with nested hierarchy]
[Regulatory Hierarchy: State | County | City links]
[Water Utilities section]
--- FOLD ---
[Greywater Regulations Card]
[Rainwater Regulations Card]
```

### Recommended (User-Focused)

```
[Breadcrumb]

# Greywater in [City], [State]

[LEGAL] [No Permit Under 250 GPD]

Up to $[X,XXX] in rebates available from [Y] programs.

[Get Started Button] [See All Rebates]

--- FOLD ---

## Regulations
[Simplified greywater rules]
[Simplified rainwater rules]

## Available Rebates
[List of programs]

## Permit Details
[How to apply]
```

### Key Changes

1. **Lead with status** - Legal/Regulated/Varies in giant text
2. **Money motivation** - Rebate amount prominent
3. **Clear CTA** - "Get Started" or "See Rebates"
4. **Defer details** - Regulations, permits, hierarchy below fold

---

## 8. Metrics to Track

After implementing changes, track:

1. **Time to answer** - How quickly can users determine legal status?
2. **Bounce rate** - Are city pages retaining users?
3. **Scroll depth** - Are users engaging with below-fold content?
4. **Click-through to products** - Are users converting?
5. **Rebate section engagement** - Are users finding rebates?

---

## Appendix: Color Consolidation Guide

### Recommended Primary Palette

| Purpose | Color | Tailwind Classes |
|---------|-------|------------------|
| Primary / Success / Greywater | Emerald | emerald-600 (primary), emerald-50/100 (bg) |
| Secondary / Rainwater | Cyan | cyan-600 (primary), cyan-50/100 (bg) |
| Warning / Attention | Amber | amber-500 (primary), amber-50 (bg) |
| Neutral | Gray | gray-900 (text), gray-600 (secondary), gray-200 (borders) |

### Colors to Remove

- **Purple** - Merge with gray for administrative info
- **Pink** - Use emerald for "free" programs
- **Indigo** - Use cyan for tax incentives
- **Sky** - Use cyan for education
- **Orange** - Use amber for commercial
- **Teal** - Merge with cyan
- **Blue** (most uses) - Merge with cyan

---

## Summary

The Water Wise Group website has excellent content but is undermined by visual complexity. The primary user questions ("Is greywater legal?" and "What rebates exist?") are buried under administrative UI patterns, excessive badge types, and a fragmented color palette.

**Priority Actions:**
1. Put legal status above the fold in large, clear text
2. Reduce badge types from 15+ to 4
3. Consolidate from 12 colors to 4
4. Simplify city page card structure
5. Remove decorative visual noise

These changes would dramatically improve the user experience and likely increase conversion to product pages.
