# Water Wise Group Design System

A refined, professional design system for water conservation products and services.

## Brand Philosophy

**Tone**: Clean, trustworthy, environmentally conscious
**Aesthetic**: Modern minimalist with warm, natural undertones — not cold/clinical, not playful/cartoonish
**Key Values**: Sustainability, reliability, expertise

---

## Color Palette

### Primary: Ocean (Teal)
Deep, sophisticated teal representing water and trust.

| Token | Hex | Usage |
|-------|-----|-------|
| `ocean-50` | `#f0fafa` | Subtle backgrounds |
| `ocean-100` | `#d4f1f1` | Light backgrounds, hover states |
| `ocean-200` | `#aae4e4` | Borders, dividers |
| `ocean-300` | `#72d0d0` | Decorative elements |
| `ocean-400` | `#3fb5b5` | Secondary actions |
| `ocean-500` | `#1f9696` | **Primary brand color** |
| `ocean-600` | `#167878` | Primary buttons, CTAs |
| `ocean-700` | `#145f5f` | Button hover states |
| `ocean-800` | `#154c4c` | Dark accents |
| `ocean-900` | `#163f3f` | Dark text on light |
| `ocean-950` | `#062525` | Maximum contrast |

### Accent: Terra (Terracotta)
Warm coral/terracotta for attention and warmth.

| Token | Hex | Usage |
|-------|-----|-------|
| `terra-50` | `#fef5f2` | Subtle warning backgrounds |
| `terra-100` | `#fee9e2` | Light accent backgrounds |
| `terra-200` | `#fed7ca` | Accent borders |
| `terra-300` | `#fcbba5` | Decorative elements |
| `terra-400` | `#f89470` | Secondary accent |
| `terra-500` | `#ef6c43` | **Primary accent color** |
| `terra-600` | `#dc5228` | Accent buttons |
| `terra-700` | `#b8411f` | Accent hover states |
| `terra-800` | `#98391e` | Dark accent |
| `terra-900` | `#7e331f` | Very dark accent |
| `terra-950` | `#44170b` | Maximum contrast |

### Neutral: Sand (Warm Gray)
Warm, earthy neutrals for text and backgrounds.

| Token | Hex | Usage |
|-------|-----|-------|
| `sand-50` | `#faf9f7` | Page backgrounds |
| `sand-100` | `#f3f1ed` | Card backgrounds, sections |
| `sand-200` | `#e7e3db` | Borders, dividers |
| `sand-300` | `#d6cfc2` | Disabled states |
| `sand-400` | `#c1b6a3` | Placeholder text |
| `sand-500` | `#a99b83` | Secondary text |
| `sand-600` | `#9a8a71` | Icons, labels |
| `sand-700` | `#80725f` | Body text |
| `sand-800` | `#6a5e50` | Headings |
| `sand-900` | `#574e43` | **Primary text color** |
| `sand-950` | `#2e2922` | Maximum contrast |

---

## Typography

### Font Families

```css
--font-body: 'DM Sans', system-ui, sans-serif;
--font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
```

**Body Font**: DM Sans — clean, modern, excellent readability for long-form content
**Display Font**: Plus Jakarta Sans — geometric, bold, impactful for headlines

### Font Usage

| Element | Font | Weight | Size | Class |
|---------|------|--------|------|-------|
| H1 | Display | 700-800 | 3rem-4.5rem | `font-display font-bold` |
| H2 | Display | 700 | 2.25rem-3rem | `font-display font-bold` |
| H3 | Display | 600-700 | 1.5rem-1.875rem | `font-display font-semibold` |
| Body | Body | 400-500 | 1rem | `font-sans` |
| Small | Body | 400-500 | 0.875rem | `text-sm` |
| Caption | Body | 500 | 0.75rem | `text-xs font-medium` |

### Display Sizes (Custom)

```css
.text-display-sm: 2.25rem (line-height: 1.1, letter-spacing: -0.02em)
.text-display-md: 3rem (line-height: 1.05, letter-spacing: -0.02em)
.text-display-lg: 3.75rem (line-height: 1, letter-spacing: -0.03em)
.text-display-xl: 4.5rem (line-height: 0.95, letter-spacing: -0.03em)
```

---

## Component Classes

### Buttons

```css
/* Primary - Ocean teal */
.btn-primary
  → bg-ocean-600 hover:bg-ocean-700 text-white rounded-xl px-6 py-3

/* Secondary - Outlined */
.btn-secondary
  → bg-white border-2 border-ocean-200 text-ocean-700 hover:bg-ocean-50 rounded-xl

/* Accent - Terra coral */
.btn-accent
  → bg-terra-500 hover:bg-terra-600 text-white rounded-xl px-6 py-3
```

### Cards

```css
/* Standard card */
.card-premium
  → bg-white border border-sand-200 rounded-2xl hover:border-sand-300

/* Featured/elevated card */
.card-elevated
  → bg-white border-2 border-ocean-200 rounded-3xl hover:border-ocean-300
```

### Badges

```css
/* Ocean badge */
.badge-ocean
  → bg-ocean-100 text-ocean-700 border border-ocean-200 rounded-full px-3 py-1.5

/* Terra badge */
.badge-terra
  → bg-terra-100 text-terra-700 border border-terra-200 rounded-full px-3 py-1.5

/* Sand badge */
.badge-sand
  → bg-sand-100 text-sand-700 border border-sand-200 rounded-full px-3 py-1.5
```

### Section Spacing

```css
.section-padding → py-20 lg:py-28
.section-padding-sm → py-12 lg:py-16
```

---

## Visual Effects

### Shadows
**Design principle**: Minimal/no drop shadows. Depth is created through:
- Border color changes on hover
- Subtle background color shifts
- Layered backgrounds with transparency

### Gradients

```css
/* Ocean gradient background */
bg-gradient-to-br from-ocean-50 to-ocean-100/50

/* Terra gradient background */
bg-gradient-to-br from-terra-50 to-terra-100/50

/* Neutral gradient background */
bg-gradient-to-br from-sand-50 to-sand-100

/* Accent line gradient */
bg-gradient-to-r from-ocean-500 to-terra-500
```

### Background Patterns

```css
/* Grid pattern */
.bg-pattern-grid → subtle 32px grid lines at 3% opacity

/* Dots pattern */
.bg-pattern-dots → 20px dot grid at 8% opacity

/* Waves pattern */
.bg-pattern-waves → flowing wave SVG pattern
```

### Animations

```css
/* Staggered fade-up for content reveals */
.animate-fade-up → 0.6s ease-out, translateY(24px) to 0
.animate-stagger-1 through .animate-stagger-6 → 0.1s incremental delays

/* Soft pulsing */
.animate-pulse-soft → 2s opacity pulse (1 → 0.7 → 1)

/* Water-themed ripple */
.animate-water-ripple → 2s scale(0.8) to scale(2) with fade

/* Floating elements */
.animate-float → 6s translateY bounce
```

---

## Layout Guidelines

### Container Width
- Max content width: `max-w-6xl` (72rem)
- Text content: `max-w-3xl` (48rem)
- Narrow text: `max-w-xl` (36rem)

### Spacing Scale
- Section gaps: `gap-16` (4rem) to `gap-24` (6rem)
- Card gaps: `gap-6` (1.5rem) to `gap-8` (2rem)
- Element gaps: `gap-2` (0.5rem) to `gap-4` (1rem)

### Border Radius
- Small elements: `rounded-lg` (0.5rem)
- Cards: `rounded-2xl` (1rem)
- Large containers: `rounded-3xl` (1.5rem)
- Buttons/badges: `rounded-xl` (0.75rem) or `rounded-full`

---

## Theme Configuration

### Page Themes (for directory pages)

```typescript
type PageTheme = 'ocean' | 'terra' | 'sand'

// Ocean theme - water conservation, greywater
themeColors.ocean = {
  bg: 'bg-ocean-50',
  bgGradient: 'bg-gradient-to-br from-ocean-50 to-ocean-100/50',
  border: 'border-ocean-200',
  icon: 'bg-ocean-600 text-white',
  text: 'text-ocean-700',
  badge: 'bg-ocean-100 text-ocean-700',
  button: 'bg-ocean-600 hover:bg-ocean-700 text-white'
}

// Terra theme - accent pages, CTAs
themeColors.terra = {
  bg: 'bg-terra-50',
  bgGradient: 'bg-gradient-to-br from-terra-50 to-terra-100/50',
  border: 'border-terra-200',
  icon: 'bg-terra-600 text-white',
  text: 'text-terra-700',
  badge: 'bg-terra-100 text-terra-700',
  button: 'bg-terra-600 hover:bg-terra-700 text-white'
}

// Sand theme - neutral, informational
themeColors.sand = {
  bg: 'bg-sand-50',
  bgGradient: 'bg-gradient-to-br from-sand-50 to-sand-100',
  border: 'border-sand-200',
  icon: 'bg-sand-600 text-white',
  text: 'text-sand-700',
  badge: 'bg-sand-100 text-sand-700',
  button: 'bg-sand-600 hover:bg-sand-700 text-white'
}
```

---

## Usage Examples

### Hero Section
```jsx
<section className="bg-gradient-to-br from-ocean-50 via-white to-sand-50">
  <div className="badge-ocean">
    <Leaf className="h-4 w-4" />
    Sustainable Water Solutions
  </div>
  <h1 className="font-display text-display-lg text-sand-900">
    Reuse Water From Your Home
    <span className="text-ocean-600">For Irrigation</span>
  </h1>
  <p className="text-sand-600 text-xl">...</p>
  <Button className="btn-primary">Get Started</Button>
</section>
```

### Product Card
```jsx
<div className="card-premium p-6">
  <h3 className="font-display font-bold text-sand-900">Product Name</h3>
  <p className="text-3xl font-bold text-ocean-600">$625</p>
  <ul className="text-sand-600">...</ul>
  <Button className="btn-primary w-full">View Details</Button>
</div>
```

### Status Badge
```jsx
<span className="badge-ocean">
  <CheckCircle className="h-4 w-4" />
  Greywater Allowed
</span>
```

---

## Migration Notes

### Color Mapping (Legacy → Current)
| Legacy | Current |
|--------|---------|
| `emerald-*` | `ocean-*` |
| `teal-*` | `ocean-*` |
| `cyan-*` | `ocean-*` |
| `gray-*` | `sand-*` |
| `slate-*` | `sand-*` |
| `neutral-*` | `sand-*` |

### Do's and Don'ts

**DO:**
- Use `ocean` for primary actions and water-related content
- Use `terra` sparingly for high-emphasis CTAs and alerts
- Use `sand` for text, backgrounds, and neutral elements
- Create depth through borders and backgrounds, not shadows

**DON'T:**
- Use drop shadows for elevation
- Mix old color names (emerald, cyan, gray) with new (ocean, terra, sand)
- Use pure black (`#000`) for text — use `sand-900` or `sand-950`
- Use pure white backgrounds everywhere — add subtle warmth with `sand-50`
