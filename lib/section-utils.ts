// Utility functions and common configurations for sections

import { 
  Droplets, 
  DollarSign, 
  Leaf, 
  TreePine, 
  Home, 
  Users,
  Shield,
  Award,
  CheckCircle,
  Filter,
  Wrench,
  Building
} from 'lucide-react'

// Common icon mappings
export const iconMap = {
  droplets: Droplets,
  dollar: DollarSign,
  leaf: Leaf,
  tree: TreePine,
  home: Home,
  users: Users,
  shield: Shield,
  award: Award,
  check: CheckCircle,
  filter: Filter,
  wrench: Wrench,
  building: Building,
}

// Common color schemes
export const colorSchemes = {
  blue: {
    icon: 'text-blue-600',
    bg: 'bg-blue-100',
    border: 'border-blue-500',
  },
  green: {
    icon: 'text-green-600',
    bg: 'bg-green-100',
    border: 'border-green-500',
  },
  purple: {
    icon: 'text-purple-600',
    bg: 'bg-purple-100',
    border: 'border-purple-500',
  },
  orange: {
    icon: 'text-orange-600',
    bg: 'bg-orange-100',
    border: 'border-orange-500',
  },
}

// Pre-configured feature sets
export const commonFeatures = {
  waterSavings: [
    'Save 50% on Water Usage: Recycle water from showers, washing machines, and sinks',
    'Lower Your Water Bills: Reduce monthly water costs by reusing greywater',
    'Eco-Friendly Solution: Reduce strain on water treatment facilities',
    'Local Code Compliance: Engineered to meet state and city codes',
  ],
  systemBenefits: [
    'Progressive Filtration: 3-stage system removes particles and impurities',
    'Multiple Source Compatibility: Processes water from showers, sinks, and washing machines',
    'Automatic Operation: No manual intervention required - works 24/7',
    'Weather Responsive: Built-in surge tank handles varying water flows',
  ],
}

// Pre-configured CTA buttons
export const commonCTAButtons = {
  getQuote: {
    label: 'Get Your Free Quote',
    href: '/contact',
    variant: 'primary' as const,
  },
  viewProducts: {
    label: 'View Products',
    href: '/products',
    variant: 'secondary' as const,
  },
  howItWorks: {
    label: 'How It Works',
    href: '/how-it-works',
    variant: 'secondary' as const,
  },
  learnMore: {
    label: 'Learn More',
    href: '/about',
    variant: 'secondary' as const,
  },
}

// Common stats configurations
export const commonStats = {
  waterSavings: [
    { value: '50%', label: 'Water Savings', sublabel: 'Average reduction in usage', color: 'blue' as const },
    { value: '40K', label: 'Gallons/Year', sublabel: 'Water saved annually', color: 'green' as const },
    { value: '$500+', label: 'Annual Savings', sublabel: 'Typical cost reduction', color: 'purple' as const },
    { value: '2-4', label: 'Year Payback', sublabel: 'Return on investment', color: 'orange' as const },
  ],
  companyStats: [
    { value: '10K+', label: 'Systems Installed', sublabel: 'Since 2010', color: 'blue' as const },
    { value: '5', label: 'Year Warranty', sublabel: 'Industry leading', color: 'green' as const },
    { value: '24/7', label: 'Automatic', sublabel: 'Set and forget', color: 'purple' as const },
  ],
}

