# Reusable Component Library

This document explains how to use the reusable section components to build pages quickly and consistently.

## 📦 Available Components

### 1. **PageHero** - Hero/Header Sections

Creates consistent page headers with title, description, and optional content.

```tsx
import { PageHero } from '@/components/sections'

<PageHero
  title="Your Page Title"
  description="Optional subtitle or description"
  variant="gradient" // 'default' | 'gradient' | 'white' | 'blue'
  size="lg" // 'sm' | 'md' | 'lg'
  centered={true}
>
  {/* Optional: Add buttons or other content */}
</PageHero>
```

**Variants:**
- `gradient`: Blue gradient background (default)
- `blue`: Solid blue background with white text
- `white`: Plain white background
- `default`: White background

---

### 2. **CTASection** - Call-to-Action Blocks

Reusable CTA sections with title, description, stats, and buttons.

```tsx
import { CTASection } from '@/components/sections'
import { commonCTAButtons } from '@/lib/section-utils'

<CTASection
  title="Ready to Start Saving Water?"
  description="Get a personalized quote for your greywater system today"
  buttons={[
    commonCTAButtons.getQuote,
    commonCTAButtons.viewProducts
  ]}
  stats={[
    { value: '50%', label: 'Average Savings' },
    { value: '$500+', label: 'Annual Savings' },
  ]}
  variant="blue" // 'blue' | 'gradient'
/>
```

---

### 3. **FeatureGrid** - Icon + Text Grids

Display features or benefits in a clean grid layout.

```tsx
import { FeatureGrid } from '@/components/sections'
import { Droplets, DollarSign, Leaf } from 'lucide-react'

<FeatureGrid
  title="Why Choose Us?"
  subtitle="Benefits of our greywater systems"
  columns={3} // 2 | 3 | 4
  variant="default" // 'default' | 'cards'
  features={[
    {
      icon: Droplets,
      title: "Save Water",
      description: "Reduce usage by up to 50%",
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100"
    },
    {
      icon: DollarSign,
      title: "Save Money",
      description: "Lower your water bills",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Help the environment",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"
    }
  ]}
/>
```

---

### 4. **StatsSection** - Metrics Display

Show key metrics and statistics.

```tsx
import { StatsSection } from '@/components/sections'

<StatsSection
  title="Our Impact"
  subtitle="Real numbers from real customers"
  stats={[
    { value: '50%', label: 'Water Savings', color: 'blue' },
    { value: '10K+', label: 'Systems Installed', color: 'green' },
    { value: '2-4', label: 'Year Payback', color: 'purple' }
  ]}
  bgColor="gray" // 'white' | 'gray'
/>
```

---

### 5. **ContentBlock** - Two-Column Layouts

Image and text side-by-side sections.

```tsx
import { ContentBlock } from '@/components/sections'

<ContentBlock
  title="What Makes Us Different?"
  description="Unlike simple systems, our technology provides comprehensive filtration."
  features={[
    "Progressive Filtration: 3-stage system removes impurities",
    "Automatic Operation: Works 24/7 without intervention",
    "Multiple Sources: Handles showers, sinks, and washing machines"
  ]}
  image={{
    src: "/images/system.png",
    alt: "Greywater System",
    width: 600,
    height: 400
  }}
  imagePosition="right" // 'left' | 'right'
  variant="featured" // 'default' | 'featured'
  bgColor="white" // 'white' | 'gray'
/>
```

---

### 6. **ProcessSteps** - Numbered Steps

Show processes or workflows with numbered steps.

```tsx
import { ProcessSteps } from '@/components/sections'
import { Droplets, Filter, Leaf } from 'lucide-react'

<ProcessSteps
  title="The Simple 3-Step Process"
  subtitle="From collection to irrigation"
  variant="large" // 'default' | 'large'
  steps={[
    {
      number: 1,
      title: "Collect",
      description: "Water flows automatically to the system",
      icon: Droplets,
      color: "blue"
    },
    {
      number: 2,
      title: "Filter",
      description: "Progressive filtration removes impurities",
      icon: Filter,
      color: "green"
    },
    {
      number: 3,
      title: "Irrigate",
      description: "Clean water is distributed to landscape",
      icon: Leaf,
      color: "purple"
    }
  ]}
/>
```

---

### 7. **SectionCard** & **SectionCardGrid** - Card Layouts

Flexible card components for various content types.

```tsx
import { SectionCard, SectionCardGrid } from '@/components/sections'
import { Home, Building, TreePine } from 'lucide-react'

// Single Card
<SectionCard
  title="Residential Systems"
  description="Perfect for single-family homes"
  icon={Home}
  variant="icon" // 'icon' | 'image' | 'simple'
  features={[
    "Easy installation",
    "40-60% water savings",
    "Perfect for existing homes"
  ]}
  href="/solutions/homes"
/>

// Grid of Cards
<SectionCardGrid
  columns={3}
  cards={[
    {
      title: "Homes",
      description: "Single-family solutions",
      icon: Home,
      variant: "image",
      image: "/images/homes.jpg",
      features: ["DIY friendly", "Save 40-60%"],
      href: "/solutions/homes"
    },
    // ... more cards
  ]}
/>
```

---

## 🎨 Utility Helpers

### Pre-configured Data

Import common configurations from `lib/section-utils.ts`:

```tsx
import { 
  commonCTAButtons, 
  commonStats, 
  commonFeatures,
  iconMap,
  colorSchemes
} from '@/lib/section-utils'

// Use pre-configured buttons
buttons={[commonCTAButtons.getQuote, commonCTAButtons.viewProducts]}

// Use pre-configured stats
stats={commonStats.waterSavings}

// Use pre-configured features
features={commonFeatures.systemBenefits}
```

---

## 📖 Example: Building a Complete Page

```tsx
import {
  PageHero,
  CTASection,
  FeatureGrid,
  StatsSection,
  ContentBlock,
  ProcessSteps
} from '@/components/sections'
import { commonCTAButtons, commonStats } from '@/lib/section-utils'
import { Droplets, DollarSign, Leaf } from 'lucide-react'

export default function ExamplePage() {
  return (
    <div>
      {/* Hero Section */}
      <PageHero
        title={<>Transform Your <span className="text-gradient">Water Usage</span></>}
        description="Save water, money, and the environment with our systems"
        variant="gradient"
        size="lg"
      />

      {/* Features */}
      <FeatureGrid
        title="Why Choose Us"
        subtitle="Benefits that matter"
        columns={3}
        features={[
          {
            icon: Droplets,
            title: "Save Water",
            description: "Reduce usage by 50%",
            iconColor: "text-blue-600",
            iconBgColor: "bg-blue-100"
          },
          // ... more features
        ]}
      />

      {/* Stats */}
      <StatsSection
        title="Our Impact"
        stats={commonStats.waterSavings}
        bgColor="gray"
      />

      {/* Content Block */}
      <ContentBlock
        title="How It Works"
        description="Simple, efficient, automatic"
        features={[
          "Progressive Filtration",
          "Automatic Operation",
          "Multiple Sources"
        ]}
        image={{
          src: "/images/system.png",
          alt: "System"
        }}
      />

      {/* CTA */}
      <CTASection
        title="Ready to Get Started?"
        description="Join thousands of satisfied customers"
        buttons={[
          commonCTAButtons.getQuote,
          commonCTAButtons.viewProducts
        ]}
      />
    </div>
  )
}
```

---

## 🔧 Customization Tips

1. **Mix and Match**: Combine components as needed
2. **Override Styles**: All components accept className props
3. **Add Custom Content**: Use children prop for custom elements
4. **Consistent Spacing**: All sections have built-in py-16 lg:py-20 spacing
5. **Responsive**: All components are mobile-first responsive

---

## ✅ Benefits

- ⚡ **Faster Development**: Build pages in minutes, not hours
- 🎨 **Consistent Design**: Same look and feel across all pages
- 🔄 **Easy Updates**: Change once, update everywhere
- 📱 **Mobile-First**: All components are fully responsive
- ♿ **Accessible**: Built with semantic HTML and ARIA labels
- 🧪 **Tested**: Components follow React best practices

---

## 🚀 Next Steps

1. Replace existing page sections with these components
2. Add new pages using the component library
3. Customize components as needed for specific use cases
4. Create additional variants when patterns emerge

Happy building! 🎉

