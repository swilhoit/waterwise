"use client"

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { PageTheme, getThemeColors } from './PageLayout'

// ============================================================================
// HERO SECTION - Consistent hero for all directory pages
// ============================================================================

interface HeroSectionProps {
  title: string
  subtitle: string
  theme?: PageTheme
  icon?: LucideIcon
  badges?: React.ReactNode
  compact?: boolean
}

export function HeroSection({
  title,
  subtitle,
  theme = 'sand',
  icon: Icon,
  badges,
  compact = false
}: HeroSectionProps) {
  const colors = getThemeColors(theme)

  if (compact) {
    // Compact hero for hub pages - no background, just title
    return (
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-sand-900 mb-2">
          {title}
        </h1>
        <p className="text-sand-500 text-sm">{subtitle}</p>
        {badges && <div className="flex flex-wrap gap-2 mt-3">{badges}</div>}
      </div>
    )
  }

  // Rich hero for spoke pages - gradient background with icon
  return (
    <div className={`${colors.bgGradient} border ${colors.border} rounded-2xl p-6 lg:p-8 mb-8`}>
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={`w-12 h-12 lg:w-14 lg:h-14 ${colors.icon} rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <Icon className="h-6 w-6 lg:h-7 lg:w-7" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-sand-900 mb-2">
            {title}
          </h1>
          <p className="text-sand-600">{subtitle}</p>
          {badges && (
            <div className="flex flex-wrap gap-2 mt-4">
              {badges}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// HERO BADGES - Consistent badge styling for hero section
// ============================================================================

interface HeroBadgeProps {
  icon?: LucideIcon
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'info' | 'neutral'
  className?: string
}

export function HeroBadge({ icon: Icon, children, variant = 'neutral', className }: HeroBadgeProps) {
  const variantClasses = {
    success: 'bg-ocean-100 text-ocean-700 border-ocean-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    info: 'bg-ocean-100 text-ocean-700 border-ocean-200',
    neutral: 'bg-sand-100 text-sand-700 border-sand-200'
  }

  // If className is provided, use it instead of variant classes
  const badgeClasses = className || variantClasses[variant]

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${badgeClasses}`}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  )
}
