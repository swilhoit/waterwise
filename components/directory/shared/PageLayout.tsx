"use client"

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

// ============================================================================
// PAGE LAYOUT - Consistent structure for all directory pages
// ============================================================================

export type PageTheme = 'emerald' | 'cyan' | 'neutral'

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
              {idx > 0 && <ChevronRight className="h-3 w-3 text-gray-300" />}
              {item.href ? (
                <Link href={item.href} className="text-gray-500 hover:text-emerald-600">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
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
  emerald: {
    bg: 'bg-emerald-50',
    bgGradient: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
    border: 'border-emerald-200',
    icon: 'bg-emerald-600 text-white',
    iconText: 'text-emerald-600',
    text: 'text-emerald-700',
    textDark: 'text-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    buttonOutline: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
  },
  cyan: {
    bg: 'bg-cyan-50',
    bgGradient: 'bg-gradient-to-br from-cyan-50 to-blue-100/50',
    border: 'border-cyan-200',
    icon: 'bg-cyan-600 text-white',
    iconText: 'text-cyan-600',
    text: 'text-cyan-700',
    textDark: 'text-cyan-800',
    badge: 'bg-cyan-100 text-cyan-700',
    button: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    buttonOutline: 'border-cyan-200 text-cyan-700 hover:bg-cyan-50'
  },
  neutral: {
    bg: 'bg-gray-50',
    bgGradient: 'bg-gradient-to-br from-gray-50 to-gray-100/50',
    border: 'border-gray-200',
    icon: 'bg-gray-600 text-white',
    iconText: 'text-gray-600',
    text: 'text-gray-700',
    textDark: 'text-gray-800',
    badge: 'bg-gray-100 text-gray-700',
    button: 'bg-gray-800 hover:bg-gray-900 text-white',
    buttonOutline: 'border-gray-200 text-gray-700 hover:bg-gray-50'
  }
}

export function getThemeColors(theme: PageTheme) {
  return themeColors[theme]
}
