"use client"

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

// ============================================================================
// PAGE LAYOUT - Consistent structure for all directory pages
// ============================================================================

export type PageTheme = 'ocean' | 'terra' | 'sand'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageLayoutProps {
  children: React.ReactNode
  breadcrumbs: BreadcrumbItem[]
  maxWidth?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
}

export function PageLayout({
  children,
  breadcrumbs,
  maxWidth = '5xl'
}: PageLayoutProps) {
  const maxWidthClass = {
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl'
  }[maxWidth]

  return (
    <div className="bg-white min-h-screen">
      <div className={`${maxWidthClass} mx-auto px-4 py-8`}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          {breadcrumbs.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="h-3 w-3 text-sand-300" />}
              {item.href ? (
                <Link href={item.href} className="text-sand-500 hover:text-ocean-600">
                  {item.label}
                </Link>
              ) : (
                <span className="text-sand-900 font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {children}
      </div>
    </div>
  )
}

// ============================================================================
// THEME COLORS - Consistent color mapping
// ============================================================================

export const themeColors = {
  ocean: {
    bg: 'bg-ocean-50',
    bgGradient: 'bg-gradient-to-br from-ocean-50 to-ocean-100/50',
    border: 'border-ocean-200',
    icon: 'bg-ocean-600 text-white',
    iconText: 'text-ocean-600',
    text: 'text-ocean-700',
    textDark: 'text-ocean-800',
    badge: 'bg-ocean-100 text-ocean-700',
    button: 'bg-ocean-600 hover:bg-ocean-700 text-white',
    buttonOutline: 'border-ocean-200 text-ocean-700 hover:bg-ocean-50'
  },
  terra: {
    bg: 'bg-terra-50',
    bgGradient: 'bg-gradient-to-br from-terra-50 to-terra-100/50',
    border: 'border-terra-200',
    icon: 'bg-terra-600 text-white',
    iconText: 'text-terra-600',
    text: 'text-terra-700',
    textDark: 'text-terra-800',
    badge: 'bg-terra-100 text-terra-700',
    button: 'bg-terra-600 hover:bg-terra-700 text-white',
    buttonOutline: 'border-terra-200 text-terra-700 hover:bg-terra-50'
  },
  sand: {
    bg: 'bg-sand-50',
    bgGradient: 'bg-gradient-to-br from-sand-50 to-sand-100/50',
    border: 'border-sand-200',
    icon: 'bg-sand-600 text-white',
    iconText: 'text-sand-600',
    text: 'text-sand-700',
    textDark: 'text-sand-800',
    badge: 'bg-sand-100 text-sand-700',
    button: 'bg-sand-800 hover:bg-sand-900 text-white',
    buttonOutline: 'border-sand-200 text-sand-700 hover:bg-sand-50'
  }
}

export function getThemeColors(theme: PageTheme) {
  return themeColors[theme]
}
