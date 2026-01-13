"use client"

import React from 'react'
import Link from 'next/link'
import { LucideIcon, ArrowRight, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { PageTheme, getThemeColors } from './PageLayout'

// ============================================================================
// REGULATION CARD - Consistent card for displaying regulation information
// ============================================================================

interface InfoBoxProps {
  label: string
  value: string
  highlight?: boolean
}

interface UseBadgeProps {
  label: string
  allowed: boolean
  tooltip?: string
}

interface RegulationCardProps {
  title: string
  subtitle?: string
  icon: LucideIcon
  theme?: PageTheme
  detailsLink?: string
  detailsLinkText?: string
  infoBoxes?: InfoBoxProps[]
  summary?: string
  useBadges?: UseBadgeProps[]
  governingCode?: string
  children?: React.ReactNode
}

export function RegulationCard({
  title,
  subtitle,
  icon: Icon,
  theme = 'emerald',
  detailsLink,
  detailsLinkText = 'Full details',
  infoBoxes,
  summary,
  useBadges,
  governingCode,
  children
}: RegulationCardProps) {
  const colors = getThemeColors(theme)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`${colors.bgGradient} px-5 py-4 border-b ${colors.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${colors.icon} rounded-xl flex items-center justify-center`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
          </div>
          {detailsLink && (
            <Link
              href={detailsLink}
              className={`text-xs ${colors.text} hover:${colors.textDark} font-medium flex items-center gap-1`}
            >
              {detailsLinkText} <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Info Boxes */}
        {infoBoxes && infoBoxes.length > 0 && (
          <div className={`grid grid-cols-${Math.min(infoBoxes.length, 2)} gap-3 mb-4`}>
            {infoBoxes.map((box, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{box.label}</p>
                <p className={`font-semibold ${box.highlight ? colors.text : 'text-gray-700'}`}>
                  {box.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {summary && (
          <p className="text-sm text-gray-600 mb-4">{summary}</p>
        )}

        {/* Use Badges */}
        {useBadges && useBadges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {useBadges.map((badge, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-help ${
                  badge.allowed
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
                title={badge.tooltip}
              >
                {badge.allowed ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                {badge.label}
              </span>
            ))}
          </div>
        )}

        {/* Governing Code */}
        {governingCode && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-500 mb-1">Governing Code</p>
            <p className="text-sm text-gray-700 font-medium">{governingCode}</p>
          </div>
        )}

        {/* Custom children */}
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// LIST SECTION - Consistent list rendering for uses/restrictions
// ============================================================================

interface ListSectionProps {
  title: string
  icon?: LucideIcon
  items: string[]
  variant?: 'check' | 'bullet' | 'number' | 'x'
  theme?: PageTheme
  className?: string
}

export function ListSection({
  title,
  icon: Icon,
  items,
  variant = 'check',
  theme = 'emerald',
  className = ''
}: ListSectionProps) {
  const colors = getThemeColors(theme)

  if (!items || items.length === 0) return null

  const renderIcon = (idx: number) => {
    switch (variant) {
      case 'check':
        return <CheckCircle2 className={`h-4 w-4 ${colors.iconText} flex-shrink-0`} />
      case 'x':
        return <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
      case 'number':
        return (
          <span className={`w-5 h-5 rounded-full ${colors.badge} text-xs font-bold flex items-center justify-center flex-shrink-0`}>
            {idx + 1}
          </span>
        )
      case 'bullet':
      default:
        return <span className={`w-1.5 h-1.5 rounded-full ${colors.icon} flex-shrink-0 mt-2`} />
    }
  }

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        {Icon && <Icon className={`h-4 w-4 ${colors.iconText}`} />}
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
            {renderIcon(idx)}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================================================
// SIDEBAR CARD - Consistent sidebar component styling
// ============================================================================

interface SidebarCardProps {
  title: string
  icon?: LucideIcon
  theme?: PageTheme
  children: React.ReactNode
  className?: string
}

export function SidebarCard({
  title,
  icon: Icon,
  theme = 'neutral',
  children,
  className = ''
}: SidebarCardProps) {
  const colors = getThemeColors(theme)

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-xl p-5 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        {Icon && <Icon className={`h-4 w-4 ${colors.iconText}`} />}
        {title}
      </h3>
      {children}
    </div>
  )
}
