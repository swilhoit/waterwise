"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageTheme, getThemeColors } from './PageLayout'

// ============================================================================
// CTA SECTION - Consistent call-to-action section
// ============================================================================

interface CTASectionProps {
  title: string
  description: string
  primaryButton: {
    label: string
    href: string
  }
  secondaryButton?: {
    label: string
    href: string
  }
  theme?: PageTheme
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  theme = 'neutral'
}: CTASectionProps) {
  const bgClass = {
    emerald: 'bg-gradient-to-br from-emerald-600 to-teal-600',
    cyan: 'bg-gradient-to-br from-cyan-600 to-blue-600',
    neutral: 'bg-gradient-to-br from-gray-800 to-gray-900'
  }[theme]

  return (
    <div className={`${bgClass} rounded-2xl p-8 text-center mt-8`}>
      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
        {title}
      </h3>
      <p className="text-white/80 mb-6 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href={primaryButton.href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
        >
          {primaryButton.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {secondaryButton && (
          <Link
            href={secondaryButton.href}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
          >
            {secondaryButton.label}
          </Link>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// AGENCY SIDEBAR - Consistent agency contact card
// ============================================================================

interface AgencySidebarProps {
  name?: string
  phone?: string
  website?: string
  theme?: PageTheme
}

export function AgencySidebar({ name, phone, website, theme = 'neutral' }: AgencySidebarProps) {
  const colors = getThemeColors(theme)

  if (!name && !phone && !website) return null

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-xl p-5`}>
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Regulatory Agency</h3>
      <div className="space-y-3">
        {name && (
          <p className="text-sm font-medium text-gray-900">{name}</p>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className={`text-sm ${colors.text} hover:underline flex items-center gap-2`}
          >
            {phone}
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${colors.text} hover:underline flex items-center gap-1`}
          >
            Official Website
            <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// RELATED LINKS - Consistent related links section
// ============================================================================

interface RelatedLink {
  label: string
  href: string
  external?: boolean
}

interface RelatedLinksProps {
  title?: string
  links: RelatedLink[]
  theme?: PageTheme
}

export function RelatedLinks({ title = 'Related Resources', links, theme = 'neutral' }: RelatedLinksProps) {
  const colors = getThemeColors(theme)

  if (!links || links.length === 0) return null

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-xl p-5`}>
      <h3 className="text-sm font-semibold text-gray-800 mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, idx) => (
          <li key={idx}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm ${colors.text} hover:underline flex items-center gap-1`}
              >
                {link.label}
                <ArrowRight className="h-3 w-3" />
              </a>
            ) : (
              <Link
                href={link.href}
                className={`text-sm ${colors.text} hover:underline flex items-center gap-1`}
              >
                {link.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
